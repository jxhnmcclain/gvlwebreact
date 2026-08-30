# Directus production (Dokploy)

## Direct editor bridge

`cms.mjs` is the direct, restricted connection used by Codex and Hermes. It never uses the admin password and does not put a production secret in Git or chat.

Create an ignored `tools/directus-production/.env` from `.env.example`. It needs:

- the existing restricted `DIRECTUS_HERMES_TOKEN` from Proton Pass;
- a dedicated Cloudflare Access service token named `gvl-codex-cms` (do not reuse the Vercel credential).

The Cloudflare token must be included in a non-identity allow policy for the existing **GVL CMS** Access application. The bridge permits reading, updating a known ID, archiving, creating a non-duplicate draft, and publishing only after the publication gate validates the post.

Examples:

```powershell
node tools/directus-production/cms.mjs health posts
node tools/directus-production/cms.mjs list posts
node tools/directus-production/cms.mjs publish posts 1
```

Deploy this Compose file as a Dokploy Compose application from GitHub. Configure every value from `.env.example` as a Dokploy secret; do not commit a production `.env`.

## One-time setup

1. Create R2 buckets: `gvl-cms-assets` for editorial files and `gvl-cms-backups` for backups. Bind `assets.growthvideolab.com` to the assets bucket.
2. Create an R2 API token scoped only to these buckets. Use the assets credentials in Dokploy.
3. Point `cms.growthvideolab.com` to the Dokploy application and protect it with Cloudflare Access. Create a Cloudflare Access service token for Vercel builds.
4. Deploy Directus, then run the existing bootstrap and provisioning scripts against the production URL from a trusted admin shell. Create the restricted Hermes and build tokens there.
5. Configure a Dokploy scheduled job that uploads a consistent SQLite backup to `gvl-cms-backups` daily, retains 30 days, and alerts on failure. Restore one backup before accepting production traffic.

## Vercel values

Set `DIRECTUS_PROD_URL`, `DIRECTUS_BUILD_TOKEN`, `DIRECTUS_ACCESS_CLIENT_ID`, `DIRECTUS_ACCESS_CLIENT_SECRET`, and `DIRECTUS_ASSET_BASE_URL=https://assets.growthvideolab.com` in Vercel Production. The build intentionally fails if Directus credentials are missing.

## Publication automation

Create a Directus Flow triggered when `posts.status` changes to `published`. Its final operation is an authenticated POST to the Vercel Deploy Hook URL, stored only as a Directus environment variable. Record the attempt in `publication_runs`.
