import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (quoted && char === '"' && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') index += 1;
      row.push(field);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  const [headers, ...records] = rows;
  return records.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

function sqlLiteral(value) {
  if (value === null || value === undefined || value === '') return 'null';
  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqlArray(values) {
  if (!values?.length) return "'{}'::text[]";
  return `array[${values.map(sqlLiteral).join(', ')}]::text[]`;
}

function readTime(markdown) {
  return Math.max(1, Math.ceil(markdown.trim().split(/\s+/).length / 200));
}

const published = fs.readdirSync(path.join(root, 'content', 'blog'))
  .filter((filename) => filename.endsWith('.md'))
  .sort()
  .map((filename) => {
    const { data, content } = matter(fs.readFileSync(path.join(root, 'content', 'blog', filename), 'utf8'));
    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title,
      seoTitle: data.title,
      description: data.description,
      excerpt: data.excerpt,
      content,
      category: data.category,
      tags: data.tags ?? [],
      author: data.author ?? 'Growth Video Lab',
      coverPath: data.image ?? null,
      coverAlt: data.title,
      readTime: data.readTime ?? readTime(content),
      featured: filename.includes('2026-03-10'),
      status: 'published',
      publishedAt: `${data.date}T12:00:00-03:00`,
    };
  });

const drafts = parseCsv(fs.readFileSync(path.join(root, 'blog_posts_export.csv'), 'utf8')).map((row) => ({
  slug: row.Filename.replace(/\.md$/, ''),
  title: row.Title,
  seoTitle: row.Title,
  description: row.Description,
  excerpt: row.Description,
  content: row.Content,
  category: 'Borrador editorial',
  tags: row.Tags.split(',').map((tag) => tag.trim()).filter(Boolean),
  author: row.Author || 'Growth Video Lab',
  coverPath: null,
  coverAlt: row.Title,
  readTime: readTime(row.Content),
  featured: false,
  status: 'draft',
  publishedAt: null,
}));

const projects = JSON.parse(fs.readFileSync(path.join(root, 'content', 'portfolio-seed.json'), 'utf8'));

const statements = [...published, ...drafts].map((post) => `
insert into public.posts (
  slug, title, seo_title, description, excerpt, content_markdown, category, tags,
  author, cover_path, cover_alt, read_time, featured, status, published_at
) values (
  ${sqlLiteral(post.slug)}, ${sqlLiteral(post.title)}, ${sqlLiteral(post.seoTitle)},
  ${sqlLiteral(post.description)}, ${sqlLiteral(post.excerpt)}, ${sqlLiteral(post.content)},
  ${sqlLiteral(post.category)}, ${sqlArray(post.tags)}, ${sqlLiteral(post.author)},
  ${sqlLiteral(post.coverPath)}, ${sqlLiteral(post.coverAlt)}, ${post.readTime},
  ${post.featured}, ${sqlLiteral(post.status)}::public.content_status, ${sqlLiteral(post.publishedAt)}::timestamptz
)
on conflict (slug) do update set
  title = excluded.title,
  seo_title = excluded.seo_title,
  description = excluded.description,
  excerpt = excluded.excerpt,
  content_markdown = excluded.content_markdown,
  category = excluded.category,
  tags = excluded.tags,
  author = excluded.author,
  cover_path = excluded.cover_path,
  cover_alt = excluded.cover_alt,
  read_time = excluded.read_time,
  featured = excluded.featured,
  status = excluded.status,
  published_at = excluded.published_at;
`);

for (const [sortOrder, project] of projects.entries()) {
  statements.push(`
insert into public.portfolio_projects (
  slug, title, client, services, cover_path, cover_alt, status, sort_order
) values (
  ${sqlLiteral(project.slug)}, ${sqlLiteral(project.title)}, ${sqlLiteral(project.client)},
  ${sqlArray(project.services)}, ${sqlLiteral(project.cover)}, ${sqlLiteral(project.title)},
  'draft'::public.content_status, ${sortOrder}
)
on conflict (slug) do update set
  title = excluded.title,
  client = excluded.client,
  services = excluded.services,
  cover_path = excluded.cover_path,
  cover_alt = excluded.cover_alt,
  sort_order = excluded.sort_order;
`);
}

fs.mkdirSync(path.join(root, '.generated'), { recursive: true });
fs.writeFileSync(path.join(root, '.generated', 'editorial-seed.sql'), statements.join('\n'));
console.log(`Prepared ${published.length} published posts, ${drafts.length} draft posts, and ${projects.length} draft portfolio projects.`);
