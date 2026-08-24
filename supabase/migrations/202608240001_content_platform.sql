create extension if not exists pgcrypto;

do $$
begin
  create type public.content_status as enum ('draft', 'review', 'approved', 'published', 'archived');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug = lower(slug) and slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  seo_title text,
  description text not null,
  excerpt text not null,
  content_markdown text not null,
  category text not null,
  tags text[] not null default '{}',
  author text not null default 'Growth Video Lab',
  cover_path text,
  cover_alt text,
  read_time integer not null default 1 check (read_time > 0),
  featured boolean not null default false,
  status public.content_status not null default 'draft',
  target_keyword text,
  search_intent text,
  sources jsonb not null default '[]'::jsonb check (jsonb_typeof(sources) = 'array'),
  scheduled_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug = lower(slug) and slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  client text,
  summary text,
  challenge text,
  approach text,
  outcome text,
  services text[] not null default '{}',
  industry text,
  project_year integer,
  cover_path text,
  cover_alt text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_assets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  storage_path text,
  external_url text,
  media_type text not null check (media_type in ('image', 'video', 'embed')),
  alt_text text not null,
  caption text,
  width integer,
  height integer,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  check (storage_path is not null or external_url is not null)
);

create table if not exists public.content_topics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  target_keyword text not null,
  search_intent text not null default 'informational',
  brief text,
  priority integer not null default 0,
  status text not null default 'queued' check (status in ('queued', 'drafted', 'published', 'paused')),
  scheduled_for timestamptz,
  post_id uuid references public.posts(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.publication_runs (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('post', 'portfolio_project')),
  entity_id uuid not null,
  source_project text not null default 'editorial',
  target_project text not null default 'production',
  status text not null check (status in ('started', 'promoted', 'deploying', 'ready', 'failed')),
  deployment_url text,
  error_message text,
  metadata jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = pg_catalog
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at before update on public.posts
for each row execute function public.set_updated_at();

drop trigger if exists portfolio_projects_set_updated_at on public.portfolio_projects;
create trigger portfolio_projects_set_updated_at before update on public.portfolio_projects
for each row execute function public.set_updated_at();

drop trigger if exists content_topics_set_updated_at on public.content_topics;
create trigger content_topics_set_updated_at before update on public.content_topics
for each row execute function public.set_updated_at();

create index if not exists posts_status_published_idx on public.posts(status, published_at desc);
create index if not exists posts_category_idx on public.posts(category);
create index if not exists portfolio_status_order_idx on public.portfolio_projects(status, sort_order, published_at desc);
create index if not exists portfolio_assets_project_idx on public.portfolio_assets(project_id, sort_order);
create index if not exists content_topics_queue_idx on public.content_topics(status, priority desc, scheduled_for);
create index if not exists content_topics_post_idx on public.content_topics(post_id);

alter table public.posts enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_assets enable row level security;
alter table public.content_topics enable row level security;
alter table public.publication_runs enable row level security;

revoke all on public.posts, public.portfolio_projects, public.portfolio_assets, public.content_topics, public.publication_runs from anon, authenticated;
grant all on public.posts, public.portfolio_projects, public.portfolio_assets, public.content_topics, public.publication_runs to service_role;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('blog', 'blog', false, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('portfolio', 'portfolio', false, 52428800, array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'video/webm', 'video/mp4'])
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

comment on table public.posts is 'Editorial and published blog content. Markdown remains the canonical body format.';
comment on table public.portfolio_projects is 'Approved case studies only; outcome fields remain nullable to avoid invented claims.';
comment on table public.publication_runs is 'Append-only audit trail for n8n promotion and Vercel deployment attempts.';
