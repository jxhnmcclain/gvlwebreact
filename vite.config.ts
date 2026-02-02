import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from '@prerenderer/rollup-plugin';
import puppeteerRenderer from '@prerenderer/renderer-puppeteer';

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
  // '/ebooks-creadores',
  '/blog',
  '/blog/2026-01-30-content-creation-tips',
  '/blog/2026-01-28-website-conversion',
  '/blog/2026-01-25-social-media-strategy',
  '/blog/2026-01-20-branding-mistakes',
  '/blog/2026-01-15-video-marketing-trends',
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
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
      prerender({
        routes,
        renderer: new puppeteerRenderer({
          renderAfterTime: 2000, // Wait for animations
          maxConcurrentRoutes: 1,
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }),
        postProcess(renderedRoute) {
          // Optional: You can minify or modify HTML here
          renderedRoute.html = renderedRoute.html.replace(
            'id="root"',
            'id="root" data-prerendered="true"'
          );
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
