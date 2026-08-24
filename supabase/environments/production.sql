-- Apply after the shared migrations in gvl-production only.
-- The public website reads static build artifacts; anonymous database access is intentionally narrow.

update storage.buckets set public = true where id in ('blog', 'portfolio');

grant select on public.posts, public.portfolio_projects, public.portfolio_assets to anon;

create policy "public published posts"
on public.posts for select to anon
using (status = 'published' and published_at is not null and published_at <= now());

create policy "public published projects"
on public.portfolio_projects for select to anon
using (status = 'published' and published_at is not null and published_at <= now());

create policy "public assets of published projects"
on public.portfolio_assets for select to anon
using (
  exists (
    select 1 from public.portfolio_projects project
    where project.id = portfolio_assets.project_id
      and project.status = 'published'
      and project.published_at is not null
      and project.published_at <= now()
  )
);

create policy "public production media"
on storage.objects for select to anon
using (bucket_id in ('blog', 'portfolio'));
