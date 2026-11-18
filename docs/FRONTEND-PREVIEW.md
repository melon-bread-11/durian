# Working with the frontend preview

Start the app with `npm.cmd run dev` from this repository and visit `http://localhost:3000`.

## Pages to try

| Page                   | What to try                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| `/`                    | Hero, featured varieties, save-to-enquiry buttons, story, harvest steps, FAQ                       |
| `/about`               | Farm story and values                                                                              |
| `/durians`             | Search, taste filters, sort, reset an empty result                                                 |
| `/durians/musang-king` | Gallery, draft taste guide, quantity, add to enquiry                                               |
| `/contact`             | Add/remove varieties, change quantity, choose an enquiry type, validate details, preview/copy/edit |
| `/admin`               | Demo overview, local variety editing and availability, sample enquiry stages, reset                |

## What stays local

The public pages now intentionally use sample catalogue data, even if `DATABASE_URL` exists. The new enquiry experience never calls the backend: its receipt is a preview, not a confirmation that the farm received anything. Names, phone numbers, and messages stay in React memory and are cleared on reload; they are never saved to local storage.

Local storage holds only the selected product IDs/quantities and the management demo's product edits and fictional enquiry statuses. Storage failures do not prevent in-memory use.

The Farm desk is a public demo, clearly labelled and excluded from indexing. It is not a secured admin application. Its edits do not alter the public catalogue or a database. No real customer enquiries are displayed there.

## Backend code is preserved

The original server files remain in `src/app/api`, `src/lib/db.ts`, `src/lib/catalogue.ts`, `src/lib/enquiries.ts`, and `prisma/`. They are not wired into the new preview interface. The earlier `src/components/enquiry-form.tsx` also remains as a reference for the original connected submission flow.

When adding real integration:

1. Add maintained authentication and server-side authorization before exposing real admin records.
2. Decide the final enquiry API shape for multiple selected varieties and visit/general questions.
3. Replace sample page data with server catalogue reads and wire mutations to validated endpoints.
4. Add appropriate anti-spam protection, privacy information, and retention rules.
5. Confirm all farm details and replace illustrative imagery.

## Main frontend files

- `src/app/globals.css`: responsive design and visual tokens.
- `src/components/farm-provider.tsx`: enquiry selection context and notifications.
- `src/lib/farm-ui.ts`: search, filters, quantities, and safe stored-selection parsing.
- `src/components/catalogue-browser.tsx`: catalogue controls.
- `src/components/variety-detail.tsx`: gallery and quantity selection.
- `src/components/enquiry-experience.tsx`: form and preview receipt.
- `src/components/farm-desk.tsx`: local management demo.
- `src/lib/farm-desk.ts`: safe demo state and fictional fixtures.
- `docs/ASSETS.md`: imagery provenance and generation prompts.

## Verification

Run `npm.cmd test`, `npm.cmd run typecheck`, `npm.cmd run build`, and `npm.cmd run format:check`. Component tests use a DOM simulator; they are not a substitute for visual browser testing on real devices.

The completed preview passed 37 tests, type checking, the production build, and HTTP checks for all eight public/detail/demo pages, both 404 cases, image assets, bundled CSS, and the existing API rejection paths. The browser access host was unavailable, so real-device visual inspection remains to be done.

Runtime dependencies reported zero audit findings with `npm audit --omit=dev`. The development-only Vitest/Vite chain currently reports the [picomatch repeated-extglob ReDoS advisory](https://github.com/advisories/GHSA-fc5q-39xc-vjpf); installed latest picomatch 4.0.7 has no patched release available in the checked registry. No forced toolchain downgrade was applied. Recheck for an upstream patch during the next dependency update.
