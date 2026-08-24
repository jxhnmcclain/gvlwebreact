import path from 'path';
import fs from 'fs';
import os from 'os';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from '@prerenderer/rollup-plugin';
import puppeteerRenderer from '@prerenderer/renderer-puppeteer';

const contentSnapshot = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'content/generated-content.json'), 'utf8'),
);
const blogRoutes = contentSnapshot.posts.map((post: { slug: string }) => `/blog/${post.slug}`);
const portfolioRoutes = contentSnapshot.portfolio.map((project: { slug: string }) => `/portafolio/${project.slug}`);

// Routes to pre-render for SEO
const routes = [
  '/',
  '/servicios',
  '/contacto',
  '/asesoria',
  '/contenido',
  '/reels',
  '/websites',
  '/branding',
  '/cotizacion-web',
  '/web-portfolio',
  '/b2b-ebook-generacion-sistema',
  // '/ebooks-creadores',
  '/blog',
  ...blogRoutes,
  ...(contentSnapshot.portfolio.length >= 3 ? ['/portafolio'] : []),
  ...portfolioRoutes,
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const shouldPrerender = mode !== 'development';

  return {
    server: {
      port: 1234,
      host: '0.0.0.0',
      proxy: {
        '/api/n8n': {
          target: 'https://n8n.jxhnmcclain.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/n8n/, '/webhook'),
        },
      },
    },
    plugins: [
      react(),
      ...(shouldPrerender ? [prerender({
        routes,
        renderer: new puppeteerRenderer({
          renderAfterDocumentEvent: 'gvl-content-ready',
          timeout: 60000,
          navigationOptions: {
            timeout: 60000,
          },
          skipThirdPartyRequests: true,
          maxConcurrentRoutes: 1,
          headless: true,
          launchOptions: {
            userDataDir: path.join(os.tmpdir(), `gvl-prerender-${process.pid}`),
          },
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }),
        postProcess(renderedRoute) {
          // Optional: You can minify or modify HTML here
          renderedRoute.html = renderedRoute.html.replace(
            'id="root"',
            'id="root" data-prerendered="true"'
          );
        },
      })] : []),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion', 'gsap'],
            markdown: ['react-markdown', 'remark-gfm', 'rehype-slug'],
            pdf: ['@react-pdf/renderer'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
