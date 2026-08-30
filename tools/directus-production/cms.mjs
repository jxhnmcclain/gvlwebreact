import fs from 'node:fs/promises';
import path from 'node:path';

const [operation, collection, idOrFile, file] = process.argv.slice(2);
const allowedCollections = new Set(['posts', 'content_topics', 'lead_magnets', 'publication_runs']);
const writableCollections = new Set(['posts', 'content_topics', 'lead_magnets', 'publication_runs']);
const directory = import.meta.dirname;

if (!allowedCollections.has(collection)) throw new Error('Unknown collection.');
if (!writableCollections.has(collection) && operation !== 'list' && operation !== 'get') throw new Error('Collection is read-only.');

const env = Object.fromEntries(
  (await fs.readFile(path.join(directory, '.env'), 'utf8'))
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .map((line) => { const index = line.indexOf('='); return [line.slice(0, index), line.slice(index + 1)]; }),
);

for (const key of ['DIRECTUS_PROD_URL', 'DIRECTUS_HERMES_TOKEN', 'DIRECTUS_ACCESS_CLIENT_ID', 'DIRECTUS_ACCESS_CLIENT_SECRET']) {
  if (!env[key]) throw new Error(`Missing ${key} in tools/directus-production/.env`);
}

const headers = {
  Authorization: `Bearer ${env.DIRECTUS_HERMES_TOKEN}`,
  'Content-Type': 'application/json',
  'CF-Access-Client-Id': env.DIRECTUS_ACCESS_CLIENT_ID,
  'CF-Access-Client-Secret': env.DIRECTUS_ACCESS_CLIENT_SECRET,
};

async function request(method, endpoint, body) {
  const response = await fetch(`${env.DIRECTUS_PROD_URL.replace(/\/$/, '')}${endpoint}`, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!response.ok) throw new Error(`Directus ${response.status}: ${await response.text()}`);
  return response.status === 204 ? null : response.json();
}

const readJson = async (filename) => JSON.parse(await fs.readFile(path.resolve(filename), 'utf8'));

function validatePost(post, { publishing = false } = {}) {
  const required = ['slug', 'title', 'description', 'excerpt', 'content_markdown', 'category', 'cover_alt', 'target_keyword', 'search_intent', 'cta_type', 'cta_title', 'cta_body', 'cta_label', 'cta_url'];
  const missing = required.filter((field) => !post[field]);
  if (missing.length) throw new Error(`Missing post fields: ${missing.join(', ')}`);
  if (!post.content_markdown.trim().startsWith('# ')) throw new Error('Post requires one H1.');
  if (!Array.isArray(post.sources) || !post.sources.length || post.sources.some((source) => !/^https:\/\//.test(source.url ?? ''))) throw new Error('Sources must contain plain HTTPS URLs.');
  if (!Array.isArray(post.internal_links) || post.internal_links.some((link) => !link.startsWith('/'))) throw new Error('Internal links must be site-relative paths.');
  if (publishing && post.content_markdown.trim().split(/\s+/).length < 800) throw new Error('Published post needs at least 800 words.');
}

if (operation === 'health') {
  await request('GET', '/server/health');
  console.log('Production CMS connection is healthy.');
} else if (operation === 'list') {
  console.log(JSON.stringify((await request('GET', `/items/${collection}?sort=-id&limit=100&fields=id,status,slug,title,published_at`)).data, null, 2));
} else if (operation === 'get') {
  console.log(JSON.stringify((await request('GET', `/items/${collection}/${idOrFile}`)).data, null, 2));
} else if (operation === 'create-draft' && collection === 'posts') {
  const post = await readJson(idOrFile);
  post.status = 'draft';
  post.published_at = null;
  validatePost(post);
  const existing = await request('GET', `/items/posts?filter[slug][_eq]=${encodeURIComponent(post.slug)}&fields=id&limit=1`);
  if (existing.data?.length) throw new Error(`Post slug already exists (ID ${existing.data[0].id}). Use update or apply-package; never create a repair duplicate.`);
  console.log(JSON.stringify((await request('POST', '/items/posts', post)).data, null, 2));
} else if ((operation === 'update' || operation === 'apply-package') && collection === 'posts') {
  const raw = await readJson(file);
  const post = operation === 'apply-package' ? raw.post : raw;
  validatePost(post, { publishing: post.status === 'published' });
  console.log(JSON.stringify((await request('PATCH', `/items/posts/${idOrFile}`, post)).data, null, 2));
} else if (operation === 'publish' && collection === 'posts') {
  const current = (await request('GET', `/items/posts/${idOrFile}`)).data;
  const post = { ...current, status: 'published', published_at: current.published_at ?? new Date().toISOString() };
  validatePost(post, { publishing: true });
  const saved = (await request('PATCH', `/items/posts/${idOrFile}`, { status: post.status, published_at: post.published_at })).data;
  await request('POST', '/items/publication_runs', {
    post_id: saved.id,
    status: 'published',
    deployment_url: `https://growthvideolab.com/blog/${saved.slug}`,
    metadata: { publisher: 'Codex production bridge', word_count: post.content_markdown.trim().split(/\s+/).length, quality_score: post.quality_score },
  });
  console.log(JSON.stringify(saved, null, 2));
} else if (operation === 'archive' && collection === 'posts') {
  console.log(JSON.stringify((await request('PATCH', `/items/posts/${idOrFile}`, { status: 'archived' })).data, null, 2));
} else {
  throw new Error('Use: health posts | list|get <collection> [id] | create-draft posts <payload.json> | update posts <id> <payload.json> | apply-package posts <id> <package.json> | publish posts <id> | archive posts <id>');
}
