# GVL content environments

## Projects

- Editorial/dev: `jxhnmcclain's Project` (`xzkmsgzuwnvxwlohivgk`)
- Production: `gvl-production` (`ejpnhchqaldmglqovqxc`)

The Supabase MCP is used only with editorial/dev. Do not execute migrations or content writes against production through MCP.

## Editorial state

The shared schema and editorial security migration are applied. Editorial currently contains:

- 3 published posts migrated from `content/blog` with their original slugs.
- 5 CSV articles imported as drafts.
- 7 portfolio candidates imported as drafts without invented metrics or outcomes.

Anonymous and authenticated browser roles have no grants on the GVL editorial tables. Studio, MCP and n8n service credentials remain the management interfaces.

## Production bootstrap

Run `npm run supabase:production-bootstrap`, then execute `.generated/production-bootstrap.sql` once in the SQL editor of `gvl-production`. This deliberate manual boundary preserves the rule that MCP never writes to production.

After the bootstrap:

1. Store the production service-role credential only in n8n and Vercel's encrypted environment variables.
2. Add `SUPABASE_PROD_URL` and `SUPABASE_PROD_SERVICE_ROLE_KEY` to Vercel Production and Preview builds. Never prefix them with `VITE_`.
3. Use n8n to promote only `approved` rows from editorial.
4. Trigger a Vercel Deploy Hook only after the production upsert succeeds.

The website's prebuild downloads only `published` rows. A failed sync fails the new deployment, leaving the previous Vercel production deployment active.
