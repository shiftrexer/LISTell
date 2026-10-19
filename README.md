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

## Automated validation

GitHub Actions currently verifies:
- Vite production build
- all SQL migrations with SQLite plus `PRAGMA foreign_key_check`
- migration application to Wrangler local D1
- local Cloudflare Worker startup
- authentication/recovery E2E: register -> logout -> login -> recovery-code password reset -> login with the new password

These checks validate the local Cloudflare/D1 path. They do not prove production Cloudflare deployment until a real D1 database is created and deployed.

## Current status

The application is still under development and is not production-ready.

Not complete yet:
- Cloudflare D1 production database creation and deployment
- realtime synchronization between members
- actual notification delivery (preference toggles are implemented)
- QR/countdown invite sheet and final sharing UI
- final permission/sharing/account-deletion/device E2E testing
- swipe interactions, animations, haptics, and final screenshot-faithful UI polish

Do not treat incomplete features as complete until their tests pass.

## Current development branch

Work is developed on `rebuild-listell` and reviewed through PR #1 before merging to `main`.
