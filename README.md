# Family Durian Farm

A full-stack learning project built with Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

## Current frontend preview

The website now includes a photographic home page, searchable catalogue, variety galleries, saved enquiry lists, a local enquiry preview, and an interactive Farm desk demo at `/admin`. Read [the frontend preview guide](docs/FRONTEND-PREVIEW.md) for the current behaviour and [asset notes](docs/ASSETS.md) for the generated imagery.

The new public interface intentionally uses local sample data and does not submit enquiries to the backend. Names and phone numbers are not saved. The server setup described below is preserved for the later integration milestone; configuring a database alone does not connect the new UI. The Farm desk is a public demonstration, not an authenticated admin area.

## Run locally

Use Node.js 22.12+ on the 22 release line (your installed 22.17.1 works), or a supported Node.js 24+ release. Open a terminal in the connected project folder:

```powershell
cd C:\Users\User\zhile\durian\durian
npm.cmd install
npm.cmd run dev
```

Open [localhost:3000](http://localhost:3000). On this Windows machine, use `npm.cmd` and `npx.cmd` to avoid the PowerShell script execution-policy error. On other systems, use `npm` and `npx` normally.

Without a database, the catalogue displays labelled sample varieties and enquiries stay closed. No real farm address, contact number, inventory, or prices have been supplied.

## What is ready

- Home, farm story, catalogue, variety detail, and contact pages.
- Responsive navigation, local durian illustration, and loading/error/not-found states.
- `GET /api/durians`: public catalogue with an `isSample` flag.
- `POST /api/enquiries`: JSON validation, request size limits, product checks, and persistence when PostgreSQL is configured.
- Database schema, initial SQL migration, and optional idempotent sample seed.
- Tests, type checking, production build scripts, and GitHub Actions checks.

Real admin authentication, database-backed management, uploads, confirmed farm details, spam protection, payments, and deployment are future work. `/admin` is a frontend demonstration only; no admin API exposes real records.

## Folder structure

```text
src/
  app/                 Pages, layouts, styles, and API endpoints
    about/
    durians/[slug]/
    contact/
    api/durians/
    api/enquiries/
  components/          Shared UI and enquiry form
  lib/                 Catalogue, database, validation, request handling
  types/               Public product types
  generated/prisma/    Generated locally; ignored by Git
prisma/
  schema.prisma        Product and Enquiry models
  migrations/          Versioned SQL changes
  seed.ts              Optional sample data
tests/                 Enquiry validation and HTTP behaviour
docs/                  Architecture and roadmap
.github/workflows/     Automated checks
.env.example           Placeholder configuration
```

Start with `src/app/page.tsx` for the homepage, `src/lib/site.ts` for farm information, and `src/app/globals.css` for the design. Read [the architecture guide](docs/ARCHITECTURE.md) and [the roadmap](docs/ROADMAP.md).

## Connect PostgreSQL

Create a PostgreSQL database locally or with a provider. Copy `.env.example` to `.env` and set `DATABASE_URL` to its connection string. Never commit `.env`.

```powershell
Copy-Item .env.example .env
# Edit DATABASE_URL in .env before running the next commands.
npm.cmd run db:deploy
npm.cmd run db:seed
npm.cmd run dev
```

The seed adds draft products only when their slug does not already exist. It does not overwrite edits. Seed rows remain marked as samples; replace them with confirmed farm content and clear `isSample` before launch.

For later schema changes, edit `prisma/schema.prisma`, run `npm.cmd run db:migrate -- --name describe_change` against a development database, and review the SQL. `db:deploy` applies existing migrations; it does not create new ones. `npm.cmd run db:studio` opens a local development data viewer.

## Verify changes

```powershell
npm.cmd test
npm.cmd run typecheck
npm.cmd run build
```

Use `npm.cmd run format` to format the source and `npm.cmd run format:check` to check formatting without changing files.

Tests exercise validation and persistence boundaries with a controlled database substitute. They do not prove a real PostgreSQL connection works. Verify migrations, writes, and reads against your own database before launch.

## Deploy later

Import this repository into Vercel with the app folder as the project root. Set `DATABASE_URL` for that environment, apply reviewed migrations with `npm run db:deploy`, and build with `npm run build`. Keep preview deployments on a separate development database. The build generates Prisma's client; it does not migrate or seed production data.

Before publishing: replace sample content, add real photos and contact details, decide a privacy notice, add enquiry spam protection, and verify real database flows. A build without a database proves the scaffold works, not that the site is ready to collect customer information.

## References

- [Next.js documentation](https://nextjs.org/docs/app)
- [Prisma ORM 7 documentation](https://www.prisma.io/docs/orm/v7)
- [Vercel GitHub deployments](https://vercel.com/docs/git/vercel-for-github)
