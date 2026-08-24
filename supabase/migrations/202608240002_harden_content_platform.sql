alter function public.set_updated_at() set search_path = pg_catalog;

create index if not exists content_topics_post_idx
on public.content_topics(post_id);

revoke execute on function public.set_updated_at() from public, anon, authenticated;
