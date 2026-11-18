# Farm website experience

User instruction: build an attractive, usable website now; interfaces can work locally and do not need a connected backend. Continue in the existing Next.js repository. No publishing, commits, or push requested in this turn.

## Direction

Preserve the existing stack and generic Family Durian Farm name. Replace the introductory scaffold with a complete photo-led orchard experience. Palette: forest #214d35, leaf #687b58, honey #e7c36b, white #ffffff, pale foliage #f4f6ef, ink #21372b. Use a locally bundled modern sans family, with oversized medium-weight headings and generous space. A full-width orchard photograph is the homepage's main visual; quieter product imagery, useful details, and a visitor journey support it.

Do not invent real farm locations, founding dates, certifications, testimonials, prices, or harvest guarantees. Stock imagery is illustrative; catalogue and management data are clearly marked as demonstrations. Sample form actions explicitly say nothing was sent. Do not store customer names or phone numbers in local storage.

## Scope

- [x] Home: immersive hero, featured varieties, family story, harvest journey, FAQ, and contact invitation.
- [x] Public layout: responsive navigation, mobile menu, clear active links, footer, accessibility, consistent error states.
- [x] Catalogue: search, taste/category filters, sorting, reset and empty states, wish-list style enquiry selection, links to individual detail pages.
- [x] Product details: meaningful visual and draft tasting information, quantity selection, add-to-enquiry action, related varieties.
- [x] Contact: selected variety summary, local form validation, explicit preview receipt rather than a fake delivery confirmation; no backend connection in this step.
- [x] Management preview: locally editable catalogue availability and a sample enquiry board, reset option, clearly no real authentication or customer data.
- [x] Tests for real filtering, quantity/selection updates, and persistence normalisation; preserve existing server tests.
- [x] Format, test, type-check, production build, and HTTP smoke checks. Browser host unavailable; visual QA limitation documented. Changes remain uncommitted.

## Implementation boundaries

Keep business/API code under `src/lib` and `src/app/api` intact. Add a typed frontend catalogue model derived from existing products, reusable icons and image components, a client-side enquiry selection provider, and small client components for catalogue controls, form flow, and management preview. Local catalogue edits are demo-only and never affect server-side stock. Images must be copied into `public/images` and documented in `docs/ASSETS.md`.

## Quality checks

Product routes and labels stay stable, all visible actions have meaningful behaviour, unknown product URLs return 404, mobile content never overflows, keyboard controls retain focus indicators, images have suitable text alternatives, motion respects reduced-motion settings, and API failures are never presented as successful real submissions.

## Results

37 tests passed, including DOM interaction regressions. Type checking and the production build passed. HTTP checks confirmed all public and management-demo routes, unknown-route 404s, both local images and image optimization, stylesheet delivery, and preserved API rejection behaviour.

A fresh read-only code review identified stale receipt text after selection edits, missing focus feedback, a detail-page quantity reset, long-name wrapping, and inaccessible tasting-rating semantics. These were fixed; interaction regressions were reproduced before the fixes and the complete suite passed afterward. No review findings were deferred.

Ruling: new public pages intentionally use local sample data even if a database environment variable exists, because the user explicitly asked for frontend interfaces without backend integration. Existing server code is preserved for later wiring.

Ruling: keep the existing test runner rather than apply an unrelated forced downgrade for an unpatched development-only dependency advisory. The runtime dependency audit is clean; the limitation is documented in the preview guide.

Images were generated with the built-in image tool, optimized into the project, and documented with their prompt set in `docs/ASSETS.md`. No real farm location, contact number, pricing, or customer records were invented.
