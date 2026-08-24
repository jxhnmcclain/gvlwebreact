# Backlog

## Content platform

- [ ] Connect the blog to Supabase Postgres and build a simple publishing workflow for two posts per week.
- [ ] Add a portfolio section backed by Supabase, with project metadata in Postgres and media assets in Supabase Storage.
- [ ] Connect the Supabase project through MCP for schema, content, and storage administration.

## Suggested implementation order

1. Define the `posts`, `portfolio_projects`, and `portfolio_assets` data models.
2. Configure Storage buckets, access policies, and image transformations.
3. Migrate the current static blog content without changing existing public URLs.
4. Build the publishing and portfolio-management workflow.
5. Add scheduled editorial tasks for two blog posts per week.
