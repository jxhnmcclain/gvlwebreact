import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const siteUrl = 'https://growthvideolab.com';
const prodUrl = process.env.SUPABASE_PROD_URL;
const serviceKey = process.env.SUPABASE_PROD_SERVICE_ROLE_KEY;
const useLocalDirectus = process.argv.includes('--directus-local');
const useProductionDirectus = process.argv.includes('--directus-prod');

function readLocalDirectusEnv() {
  const envPath = path.join(root, 'tools', 'directus-local', '.env');
  if (!fs.existsSync(envPath)) throw new Error('Missing tools/directus-local/.env. Start and configure Directus first.');
  return Object.fromEntries(
    fs.readFileSync(envPath, 'utf8')
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const index = line.indexOf('=');
        return [line.slice(0, index), line.slice(index + 1)];
      }),
  );
}

function localPosts() {
  return fs.readdirSync(path.join(root, 'content', 'blog'))
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const { data, content } = matter(fs.readFileSync(path.join(root, 'content', 'blog', filename), 'utf8'));
      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title,
        date: data.date,
        author: data.author ?? 'Growth Video Lab',
        description: data.description,
        excerpt: data.excerpt,
        category: data.category,
        tags: data.tags ?? [],
        image: data.image ?? '/og-blog.jpg',
        readTime: data.readTime ?? Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
        featured: Boolean(data.featured),
        content,
      };
    });
}

async function supabaseRows(table, select, order) {
  const url = new URL(`/rest/v1/${table}`, prodUrl);
  url.searchParams.set('select', select);
  url.searchParams.set('status', 'eq.published');
  url.searchParams.set('published_at', `lte.${new Date().toISOString()}`);
  if (order) url.searchParams.set('order', order);

  const response = await fetch(url, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase content sync failed for ${table}: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function productionContent() {
  const postRows = await supabaseRows(
    'posts',
    'slug,title,seo_title,description,excerpt,content_markdown,category,tags,author,cover_path,cover_alt,read_time,featured,published_at,updated_at',
    'published_at.desc',
  );
  const projectRows = await supabaseRows(
    'portfolio_projects',
    'id,slug,title,client,summary,challenge,approach,outcome,services,industry,project_year,cover_path,cover_alt,featured,sort_order,published_at,updated_at',
    'sort_order.asc,published_at.desc',
  );

  let assets = [];
  if (projectRows.length) {
    const assetUrl = new URL('/rest/v1/portfolio_assets', prodUrl);
    assetUrl.searchParams.set('select', 'id,project_id,storage_path,external_url,media_type,alt_text,caption,width,height,sort_order');
    assetUrl.searchParams.set('project_id', `in.(${projectRows.map(({ id }) => id).join(',')})`);
    assetUrl.searchParams.set('order', 'sort_order.asc');
    const response = await fetch(assetUrl, {
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
    });
    if (!response.ok) throw new Error(`Supabase asset sync failed: ${response.status} ${await response.text()}`);
    assets = await response.json();
  }

  const storageUrl = (bucket, storagePath) => storagePath
    ? `${prodUrl}/storage/v1/object/public/${bucket}/${storagePath}`
    : null;

  return {
    posts: postRows.map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.published_at,
      updatedAt: post.updated_at,
      author: post.author,
      description: post.description,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags ?? [],
      image: storageUrl('blog', post.cover_path) ?? post.cover_path ?? '/og-blog.jpg',
      imageAlt: post.cover_alt ?? post.title,
      readTime: post.read_time,
      featured: post.featured,
      content: post.content_markdown,
    })),
    portfolio: projectRows.map((project) => ({
      slug: project.slug,
      title: project.title,
      client: project.client,
      summary: project.summary,
      challenge: project.challenge,
      approach: project.approach,
      outcome: project.outcome,
      services: project.services ?? [],
      industry: project.industry,
      year: project.project_year,
      cover: storageUrl('portfolio', project.cover_path) ?? project.cover_path,
      coverAlt: project.cover_alt ?? project.title,
      featured: project.featured,
      sortOrder: project.sort_order,
      publishedAt: project.published_at,
      updatedAt: project.updated_at,
      assets: assets.filter((asset) => asset.project_id === project.id).map((asset) => ({
        type: asset.media_type,
        url: storageUrl('portfolio', asset.storage_path) ?? asset.external_url,
        alt: asset.alt_text,
        caption: asset.caption,
        width: asset.width,
        height: asset.height,
        sortOrder: asset.sort_order,
      })),
    })),
  };
}

async function localDirectusContent() {
  const env = readLocalDirectusEnv();
  const url = new URL('/items/posts', 'http://localhost:8055');
  url.searchParams.set('filter[status][_eq]', 'published');
  url.searchParams.set('filter[published_at][_nnull]', 'true');
  url.searchParams.set('sort', '-published_at');
  url.searchParams.set('limit', '-1');
  url.searchParams.set('fields', 'slug,title,seo_title,description,excerpt,content_markdown,category,tags,author,cover_image.id,cover_image.filename_disk,cover_alt,published_at,cta_type,cta_title,cta_body,cta_label,cta_url,internal_links,linkable_asset');

  const response = await fetch(url, { headers: { Authorization: `Bearer ${env.DIRECTUS_BUILD_TOKEN}` } });
  if (!response.ok) throw new Error(`Directus local content sync failed: ${response.status} ${await response.text()}`);

  const { data } = await response.json();
  return {
    posts: data.map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.published_at,
      updatedAt: post.published_at,
      author: post.author,
      description: post.description,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags ?? [],
      image: post.cover_image?.filename_disk ? `${process.env.DIRECTUS_ASSET_BASE_URL ?? 'http://localhost:8055/assets'}/${post.cover_image.filename_disk}` : '/og-blog.jpg',
      imageAlt: post.cover_alt ?? post.title,
      readTime: Math.max(1, Math.ceil(post.content_markdown.trim().split(/\s+/).length / 200)),
      featured: false,
      content: post.content_markdown,
      cta: post.cta_title && post.cta_label && post.cta_url ? {
        type: post.cta_type ?? 'contact',
        title: post.cta_title,
        body: post.cta_body ?? '',
        label: post.cta_label,
        url: post.cta_url,
      } : undefined,
      internalLinks: post.internal_links ?? [],
      linkableAsset: post.linkable_asset ?? undefined,
    })),
    portfolio: [],
  };
}

async function productionDirectusContent() {
  const directusUrl = process.env.DIRECTUS_PROD_URL;
  const token = process.env.DIRECTUS_BUILD_TOKEN;
  if (!directusUrl || !token) throw new Error('Vercel build requires DIRECTUS_PROD_URL and DIRECTUS_BUILD_TOKEN.');
  const url = new URL('/items/posts', directusUrl);
  url.searchParams.set('filter[status][_eq]', 'published');
  url.searchParams.set('filter[published_at][_nnull]', 'true');
  url.searchParams.set('sort', '-published_at');
  url.searchParams.set('limit', '-1');
  url.searchParams.set('fields', 'slug,title,seo_title,description,excerpt,content_markdown,category,tags,author,cover_image.id,cover_image.filename_disk,cover_alt,published_at,cta_type,cta_title,cta_body,cta_label,cta_url,internal_links,linkable_asset');
  const headers = { Authorization: `Bearer ${token}` };
  if (process.env.DIRECTUS_ACCESS_CLIENT_ID && process.env.DIRECTUS_ACCESS_CLIENT_SECRET) {
    headers['CF-Access-Client-Id'] = process.env.DIRECTUS_ACCESS_CLIENT_ID;
    headers['CF-Access-Client-Secret'] = process.env.DIRECTUS_ACCESS_CLIENT_SECRET;
  }
  const response = await fetch(url, { headers });
  if (!response.ok) {
    const accessConfigured = Boolean(
      process.env.DIRECTUS_ACCESS_CLIENT_ID && process.env.DIRECTUS_ACCESS_CLIENT_SECRET,
    );
    throw new Error(
      `Directus production sync failed: ${response.status}; Cloudflare Access credentials configured=${accessConfigured}. ${await response.text()}`,
    );
  }
  const { data } = await response.json();
  const assetBase = (process.env.DIRECTUS_ASSET_BASE_URL || `${directusUrl.replace(/\/$/, '')}/assets`).replace(/\/$/, '');
  return { posts: data.map((post) => ({
    slug: post.slug, title: post.title, date: post.published_at, updatedAt: post.published_at, author: post.author,
    description: post.description, excerpt: post.excerpt, category: post.category, tags: post.tags ?? [],
    image: post.cover_image?.filename_disk ? `${assetBase}/${post.cover_image.filename_disk}` : '/og-blog.jpg', imageAlt: post.cover_alt ?? post.title,
    readTime: Math.max(1, Math.ceil(post.content_markdown.trim().split(/\s+/).length / 200)), featured: false, content: post.content_markdown,
    cta: post.cta_title && post.cta_label && post.cta_url ? { type: post.cta_type ?? 'contact', title: post.cta_title, body: post.cta_body ?? '', label: post.cta_label, url: post.cta_url } : undefined,
    internalLinks: post.internal_links ?? [], linkableAsset: post.linkable_asset ?? undefined,
  })), portfolio: [] };
}

function escapeXml(value = '') {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

function writeDiscoveryFiles(snapshot) {
  const staticPaths = ['/', '/servicios', '/contenido', '/reels', '/websites', '/branding', '/asesoria', '/contacto', '/blog'];
  if (snapshot.portfolio.length >= 3) staticPaths.push('/portafolio');
  const paths = [
    ...staticPaths,
    ...snapshot.posts.map((post) => `/blog/${post.slug}`),
    ...snapshot.portfolio.map((project) => `/portafolio/${project.slug}`),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((pathname) => `  <url><loc>${siteUrl}${pathname}</loc></url>`).join('\n')}\n</urlset>\n`;
  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Growth Video Lab</title><link>${siteUrl}/blog</link><description>Notas sobre crecimiento, marca, contenido y sistemas.</description>${snapshot.posts.map((post) => `<item><title>${escapeXml(post.title)}</title><link>${siteUrl}/blog/${post.slug}</link><guid>${siteUrl}/blog/${post.slug}</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description>${escapeXml(post.description)}</description></item>`).join('')}</channel></rss>\n`;
  fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(root, 'public', 'rss.xml'), rss);
}

const source = useLocalDirectus
  ? 'directus-local'
  : useProductionDirectus
    ? 'directus-production'
  : prodUrl && serviceKey
    ? 'supabase-production'
    : 'local-fallback';
const content = source === 'directus-local'
  ? await localDirectusContent()
  : source === 'directus-production'
    ? await productionDirectusContent()
  : source === 'supabase-production'
    ? await productionContent()
    : { posts: localPosts(), portfolio: [] };
content.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const snapshot = {
  generatedAt: source === 'local-fallback' ? null : new Date().toISOString(),
  source,
  posts: content.posts,
  portfolio: content.portfolio,
};

fs.writeFileSync(path.join(root, 'content', 'generated-content.json'), `${JSON.stringify(snapshot, null, 2)}\n`);
writeDiscoveryFiles(snapshot);
console.log(`Content ready: ${snapshot.posts.length} posts, ${snapshot.portfolio.length} portfolio projects (${snapshot.source}).`);
