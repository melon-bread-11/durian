# Durian Farm Foundation Implementation Plan

> Execute inline. User requested file creation now and explicitly deferred commits. Do not stage, commit, push, deploy, or create another repository.

**Goal:** Create a runnable, understandable Next.js foundation for the two-week learning project.

**Architecture:** App Router pages share reusable UI and a server-side catalogue service. Public API routes validate enquiries and persist them only when PostgreSQL is configured. Without a database, catalogue pages use explicitly labelled sample data and enquiry submission is unavailable.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Prisma 7, PostgreSQL, Zod, Vitest.

**Spec:** Parent `../README.md` project outline and the user's instruction to create the necessary files first.

## Constraints and decisions

- Work in the user's connected clone at `durian/durian`; preserve its existing Git history.
- No real farm address, phone number, prices, harvest promises, or certifications have been supplied. Use honest sample content.
- Database credentials belong in ignored `.env`, with placeholder names in `.env.example`.
- Admin authentication and management are later milestones. Do not add public write/admin endpoints without authentication.
- No database connection or deployment is available in this step. Document these verification limits.
- Palette: forest #194d35, leaf #78906d, fruit #f2cf65, paper #f9faf5, ink #23372b. Georgia display type, system sans body. Spacious left-aligned pages, one botanical illustration, simple catalogue rows/cards.

## Review focus

- Malformed, oversized, and invalid JSON must not reach database writes.
- Missing database must never produce a fake successful enquiry.
- A product that is missing, archived, or unavailable must not accept an enquiry.
- Mobile navigation, form labels, and keyboard focus must remain usable.
- Sample catalogue content must be clearly identified and never silently replace a failing configured database.

## Tasks

- [x] Configure package scripts, TypeScript, Next.js, Tailwind, environment example, and ignored generated files; install dependencies.
- [x] Write failing tests for enquiry validation and request handling (invalid JSON, invalid fields, unknown product, missing database, success); implement validation and dependency-injected handler; run tests.
- [x] Add Prisma schema, initial SQL migration, idempotent seed script, server-only database client, sample catalogue, and catalogue queries.
- [x] Add layout, navigation, footer, home, about, catalogue, product detail, contact form, loading/error/not-found states, and public APIs.
- [x] Document local startup, database setup, deployment steps, current limitations, and next learning milestones.
- [x] Generate Prisma client, validate schema, run tests, type checking, and production build. Smoke-test pages and API error paths. Leave all application changes uncommitted.

## Verification record

- `npm.cmd test`: 19 tests passed.
- `npm.cmd run typecheck`: passed.
- `npm.cmd run build`: passed.
- `prisma validate`: passed; initial SQL generated without a database connection.
- HTTP smoke checks: public pages returned 200, missing pages/varieties returned 404, sample catalogue was labelled, invalid enquiries returned 400, missing database returned 503, oversized requests returned 413.
- Dependency installation/audit: zero reported vulnerabilities.
- Independent read-only review: no actionable findings within the foundation scope.
- Ruling: moved the loading boundary to the contact route after reproducing an unknown-variety response of 200 caused by streamed not-found rendering. The rebuilt route returned 404.
- Verification limits: no real PostgreSQL integration, browser visual QA, deployment, or admin authentication in this step.
- All application changes remain uncommitted per user instruction.
