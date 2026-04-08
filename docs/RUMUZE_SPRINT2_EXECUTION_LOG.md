# Rumuze Sprint 2 Execution Log

Date started: 2026-04-08  
Date completed: 2026-04-08  
Sprint title: Technical Integrity + SEO Layer + Claim Classification System

## 1. Summary of Work

Sprint 2 focused on technical SEO integrity, indexing consistency, and documentation governance.

Completed outcomes:

1. Corrected locale detection so English routes beginning with `ar` are no longer misclassified as Arabic.
2. Limited public locale handling to supported locales only: `en`, `ar`.
3. Refactored hreflang generation to produce canonical EN/AR alternates with clean Arabic root handling (`/ar`, not `/ar/`).
4. Reworked the sitemap generator to include the real public route inventory:
   - service detail pages
   - case study detail pages
   - comparison pages
   - blog posts
   - authority/content pages
   - manifesto and QR tool routes now exposed intentionally
5. Enabled `overrideMeta` as a supported metadata path in the shared SEO component rather than leaving it as dead API surface.
6. Consolidated schema output into a single JSON-LD `@graph` injection path inside the shared SEO component.
7. Removed duplicate alternate-link injection from page-level Helmet fragments where the shared SEO component already owns the output.
8. Removed build-time dependency on crawler prerendering and converted prerendering into an explicit manual command.
9. Added a formal claims registry document for future proof classification and investor/client-safe messaging governance.
10. Added this execution log to document actual scope, decisions, and remaining limits.

## 2. Files Modified

### Application / SEO layer

- `src/seo/linking.ts`
- `src/seo/linking.test.ts`
- `src/components/SEO.jsx`
- `src/config/siteCoreConfig.ts`
- `src/utils/MetaConfig.js`
- `src/utils/MetaConfig.test.js`
- `src/App.jsx`
- `src/components/Navbar.jsx`
- `src/components/ProtectedRoute.jsx`
- `src/pages/NotFound.jsx`
- `src/pages/BlogPost.jsx`
- `src/pages/CaseStudyDetailPage.jsx`
- `src/pages/ComparisonPage.jsx`
- `src/pages/WhyRumuzePage.jsx`
- `src/pages/EnterpriseFrameworkPage.jsx`
- `src/pages/SaudiArabiaPage.jsx`

### Build / indexing pipeline

- `scripts/generate-sitemap.js`
- `scripts/lib/publicRouteManifest.js`
- `package.json`

### Edge metadata / server logic

- `functions/services/MetadataService.js`
- `functions/services/MetadataService.test.js`

### Documentation

- `docs/CLAIMS_REGISTRY.md`
- `docs/RUMUZE_SPRINT2_EXECUTION_LOG.md`

## 3. Before / After Notes

### A. Hreflang and locale detection

Before:

- Locale detection used naive `startsWith('/ar')` logic.
- English routes such as `/architecture-principles` could be treated as Arabic.
- Client-side and server-side alternate generation could produce misleading locale assumptions.
- Arabic root alternates could resolve to `/ar/` instead of the cleaner `/ar`.

After:

- Locale detection now checks the first path segment only.
- Supported locales are constrained to `en` and `ar`.
- Canonical and hreflang generation use normalized path helpers.
- All public pages now emit consistent `en`, `ar`, and `x-default` alternates through the shared SEO component.

Implementation logic:

```ts
normalizePath(path)
hasLocalePrefix(path, 'ar')
stripLocalePrefix(path, ['en', 'ar'])
localizePath(path, locale)
generateHreflangsFromLocales(baseUrl, path, ['en', 'ar'])
```

Effective rule:

- English route: `/services/software-engineering`
- Arabic alternate: `/ar/services/software-engineering`
- English alternate: `/services/software-engineering`
- Default alternate: English route

### B. Sitemap coverage

Before:

- Sitemap generation was hardcoded to a narrow route subset.
- Critical public routes were absent:
  - service detail pages
  - case study detail pages
  - comparison pages
  - blog posts
  - several authority pages

After:

- Sitemap generation now uses a route manifest that reflects the actual public content model.
- Dynamic slugs are extracted from the live source files for:
  - `services.ts`
  - `caseStudies.ts`
  - `comparison.ts`
  - `blogPosts.js`
- Final output includes 48 public route entries, localized into 96 sitemap URLs.

### C. Metadata layer

Before:

- `overrideMeta` was passed from pages but ignored by the shared SEO component.
- Open Graph and Twitter descriptions could fall back to generic site copy even when page-specific descriptions existed.
- Page-level metadata behavior was inconsistent between configuration-driven pages and override-driven pages.

After:

- Decision: keep `overrideMeta` and fully support it.
- The shared SEO component now merges metadata in this order:

```text
route config -> overrideMeta -> explicit props
```

- Article metadata fields such as:
  - `author`
  - `publishedTime`
  - `modifiedTime`
  - `section`
  - `tags`

  are now recognized and emitted when the page type is `article`.

Refactored structure:

```text
SEO component
  -> route config lookup
  -> overrideMeta merge
  -> canonical + hreflang generation
  -> single JSON-LD graph generation
  -> Helmet output
```

### D. Schema injection

Before:

- Schema was injected twice:
  - once through Helmet
  - once through manual `useEffect`
- Several pages also depended on `window.rumuzeContextGraph`, creating a second schema transport path.
- Page-level alternate tags were duplicated in several routes.

After:

- Decision: one schema owner, the shared `SEO` component.
- JSON-LD is emitted as one `@graph`.
- Page-provided schemas are passed directly through props.
- `window.rumuzeContextGraph` was removed from the active page flow for:
  - `SaudiArabiaPage`
  - `EnterpriseFrameworkPage`
- Duplicate alternate-link injection was removed from:
  - `CaseStudyDetailPage`
  - `ComparisonPage`
  - `WhyRumuzePage`

Schema strategy:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://www.rumuze.com/#organization" },
    { "@type": "WebSite", "@id": "https://www.rumuze.com/#website" },
    { "@type": "Person", "@id": "https://www.rumuze.com/#founder" },
    { "@type": "WebPage", "@id": "https://www.rumuze.com/services#webpage" },
    { "@type": "BreadcrumbList", "@id": "https://www.rumuze.com/services#breadcrumb" },
    { "@type": "Service", "@id": "https://www.rumuze.com/services/software-engineering#service" }
  ]
}
```

### E. Prerender strategy

Before:

- Build ran a prerender script even though prerendering was disabled by environment flag.
- Legacy snapshots remained in the repository.
- Snapshot presence created ambiguity about whether crawler HTML was current or stale.

After:

- Final decision: disable prerender as part of the default production build.
- `npm run build` no longer depends on snapshot generation.
- Prerendering remains available only as an explicit manual command:

```bash
npm run prerender:crawler
```

Justification:

- The existing snapshot set was not trustworthy as an always-current indexing layer.
- Running a disabled prerender step in every production build added operational ambiguity without SEO gain.
- Canonical URLs, hreflang, sitemap coverage, and stable metadata provide a cleaner baseline than stale snapshot distribution.

## 4. Final Sitemap Structure

Each route exists in English and Arabic unless otherwise noted.

### Core / commercial routes

- `/`
- `/services`
- `/case-studies`
- `/blog`
- `/why-rumuze`
- `/contact`
- `/about`
- `/portfolio`

### Authority / strategy pages

- `/saudi-arabia`
- `/enterprise-framework`
- `/methodology`
- `/architecture-principles`
- `/engineering-standards`
- `/slo-framework`
- `/multilingual-systems`
- `/knowledge-graph-architecture`
- `/enterprise-web-development`
- `/saas-architecture`
- `/marketing-infrastructure`
- `/seo-revenue-systems`
- `/custom-software-development`
- `/enterprise-application-development`
- `/api-integration-architecture`
- `/manifesto`

### Tools / public utility pages

- `/labs`
- `/qr-generator`

### Legal

- `/privacy`
- `/terms`

### Service detail pages

- `/services/software-engineering`
- `/services/web-development`
- `/services/saas-erp`
- `/services/marketing-infrastructure`
- `/services/performance-marketing`
- `/services/seo-services`
- `/services/social-media`

### Case study detail pages

- `/case-studies/fintech-saas-platform`
- `/case-studies/multi-region-retail-platform`
- `/case-studies/logistics-erp-system`
- `/case-studies/healthcare-patient-portal`
- `/case-studies/ecommerce-performance-marketing`
- `/case-studies/revenue-platform-engineering`

### Comparison pages

- `/comparison/traditional-agencies`
- `/comparison/software-agencies`
- `/comparison/marketing-agencies`
- `/comparison/seo-agencies`

### Blog posts

- `/blog/modular-monolith-architecture`
- `/blog/retention-is-king`
- `/blog/deterministic-ai-engineering`

## 5. Decisions Made

1. Supported locales are restricted to `en` and `ar` only.
2. `overrideMeta` is retained and treated as supported API surface.
3. Schema generation is centralized in the shared SEO component.
4. Page-level duplicate alternate-link output was removed where redundant.
5. Blog post routes were made explicit in the router because they existed as content but were not actually routable.
6. `ManifestoPage` was exposed as a real route because the page existed but was not part of the active route surface.
7. Default production build no longer runs prerender.
8. Claim governance is now documented as a formal registry, not an ad hoc note.

## 6. Known Limitations

1. Legacy snapshot files still exist under `public/snapshots`; they are no longer part of the default build path, but they remain in the repository.
2. The Cloudflare metadata service remains a separate server-side registry from the client SEO component. Sprint 2 aligned path logic and alternate generation, but a future pass should consolidate server/client metadata sources further.
3. Homepage/case-study aggregate metrics still require proof classification cleanup before being treated as investor-grade evidence.
4. The PWA precache remains large and was not reduced in this sprint.

## 7. Verification Log

Executed after changes:

- `npm run lint` -> passed
- `npm test` -> passed
- `npm run typecheck` -> passed
- `npm run build` -> passed

Build note:

- Generated sitemap now reports `96 URLs` from the localized public route inventory.
- Prerender is no longer invoked during the default production build.

## 8. Next Steps

1. Expand server-side metadata parity so the Cloudflare metadata layer matches the client SEO registry for every public route family.
2. Add explicit proof labels to case studies:
   - verified
   - composite
   - illustrative
3. Audit aggregate metrics in homepage and comparison content against the new claims registry.
4. Decide whether legacy snapshot files should be archived, regenerated under a manual workflow, or removed entirely from the repository.
5. Run a dedicated PWA caching and precache-weight pass in Sprint 3 or a separate technical debt sprint.
