# How this app works

```text
Browser -> Next.js page -> catalogue service -> Prisma -> PostgreSQL
Browser -> POST /api/enquiries -> validate -> product check -> save enquiry
```

Pages in `src/app` are server components unless marked `"use client"`. They read the catalogue on the server without calling the app's own HTTP API. The enquiry form is a client component because it handles interactive submission.

| Location                     | Responsibility                                              |
| ---------------------------- | ----------------------------------------------------------- |
| `src/app`                    | URL routes, layouts, pages, styles, and API endpoints       |
| `src/components`             | Navigation, illustration, cards, and form                   |
| `src/lib/site.ts`            | Draft farm name and story to replace with real information  |
| `src/lib/sample-products.ts` | Clearly labelled example catalogue                          |
| `src/lib/catalogue.ts`       | Server-only catalogue reads                                 |
| `src/lib/db.ts`              | Server-only PostgreSQL client, reused across requests       |
| `src/lib/validation.ts`      | Server input validation and inferred TypeScript type        |
| `src/lib/enquiries.ts`       | Size limits, validation, product checks, response behaviour |
| `src/types`                  | Public product types                                        |
| `prisma/schema.prisma`       | Database models and enums                                   |
| `prisma/migrations`          | Versioned SQL schema changes                                |
| `prisma/seed.ts`             | Optional sample data; rerunning does not overwrite edits    |
| `tests`                      | Enquiry validation and HTTP behaviour tests                 |
| `.github/workflows/ci.yml`   | GitHub checks                                               |

With an empty `DATABASE_URL`, catalogue pages use sample products and the enquiry form is disabled. Direct submissions return HTTP 503, never a pretend success.

With `DATABASE_URL` configured, the app uses PostgreSQL. Database failures surface as errors rather than silently showing sample availability. Seeded examples retain a sample flag.

One `Product` has many `Enquiry` records. Prices and quantities use decimal columns. Product deletion is restricted when enquiries refer to it; archive a product instead. No public endpoint reads customer contact information.

Admin management is a later milestone. Add maintained authentication before creating admin reads or writes. Before accepting public enquiries, add hosting-appropriate spam/rate-limit protection and decide the privacy notice and retention policy.
