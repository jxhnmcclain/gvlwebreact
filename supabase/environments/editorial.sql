-- Apply after the shared migrations in the editorial project only.
-- Drafts are managed through Supabase Studio/MCP and n8n's service credentials.
-- Browser users receive no table or Storage privileges in this environment.

revoke all on public.posts, public.portfolio_projects, public.portfolio_assets,
  public.content_topics, public.publication_runs from anon, authenticated;

update storage.buckets
set public = false
where id in ('blog', 'portfolio');
