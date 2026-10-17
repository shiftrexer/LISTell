# LISTell

Shared shopping-list web app for Cloudflare Workers + D1.

## Local frontend build

```bash
cd app
npm install
npm run build
```

## Cloudflare D1 setup

`app/wrangler.jsonc` intentionally contains `REPLACE_WITH_D1_DATABASE_ID` until a D1 database is created in the target Cloudflare account.

After creating the `listell` D1 database, replace that placeholder with the real database ID and apply migrations in numeric order (`0001` onward) before deployment.

The repository itself does not create or deploy Cloudflare account resources automatically.

## Current status

The frontend build is checked by GitHub Actions. The application is still under development and is not production-ready.

Not complete yet:
- Cloudflare D1 production database creation and deployment
- realtime synchronization between members
- actual notification delivery (the preference toggles alone are implemented)
- full end-to-end authentication/recovery test coverage
- Cloudflare/D1 migration validation for all migrations
- final permission, sharing, account-deletion, and device testing

Do not treat these features as complete until their tests pass.

## Current development branch

Work is developed on `rebuild-listell` and reviewed through PR #1 before merging to `main`.
