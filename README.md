# Rumuze website

The public website for [Rumuze](https://www.rumuze.com), a software and digital marketing company based in Cairo, Egypt that builds custom platforms, mobile apps, and backend systems, and runs SEO, advertising, and content, for businesses in the Gulf and MENA region. The site is bilingual (English LTR, Arabic RTL) and served from one codebase.

## Stack

- React 19, Vite 7, Tailwind CSS 3, React Router 7
- `react-i18next` for language state, with routes under `/` (English) and `/ar` (Arabic)
- `react-helmet-async` for per-route metadata, plus JSON-LD generated in `src/seo`
- Firebase (Auth, Firestore, Functions) for sign-in, messaging, and consent-gated visit tracking
- Progressive web app via `vite-plugin-pwa`

## Scripts

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm test             # vitest
npm run build        # client build, SSR build, prerender, sitemap, robots
npm run test:e2e       # browser tests against dist/ (run the build first)
npm run preview
```

## Environment

Copy `.env.example` to `.env` and fill in the Firebase and Google client values.

## Structure

```text
src/
  components/      shared UI, including the homepage sections in conversion/
  config/          entity, services, and site-wide configuration
  content/         homepage copy (homeContent.js) and intake form copy
  pages/           route pages (services, work, about, tools, legal, admin)
  seo/             JSON-LD builders and hreflang/canonical helpers
  locales/         navigation, footer, blog, and legal strings
firebase-functions/ Firebase Cloud Functions (notifications, visit tracking)
scripts/           build helpers (prerender, sitemap, build verification, Open Graph image generation)
public/            static assets, robots.txt, llms.txt
docs/              deployment notes and CLAIMS_REGISTRY.md
```

## Content rules

Every public claim must be traceable to code or documentation. `docs/CLAIMS_REGISTRY.md` lists what is published and where it comes from. Do not add client names, revenue figures, uptime numbers, compliance certifications, or years of experience until they can be evidenced.

## Privacy and consent

Visit tracking is off until the visitor accepts the banner (`src/components/ConsentBanner.jsx`, `src/utils/consent.js`). The choice is stored under `rumuze.consent.analytics`, and the footer's "Analytics preferences" button reopens it. Declining removes any stored visitor and session identifiers. Keep the privacy text in `src/locales/*.json` in step with what the code collects.

## Fonts

Inter, Sora, and Cairo are self-hosted through `@fontsource` (`src/fonts.js`); there are no requests to Google Fonts and the CSP does not allow them. `scripts/prerender.js` adds per-language font preloads.

## Continuous integration

`.github/workflows/ci.yml` runs lint, typecheck, tests, and the full build (including prerender) on every push and pull request. Run the same four commands before pushing.

## SEO, GEO, and AEO

- Each language has its own URL, canonical tag, `hreflang` alternates, and sitemap entry.
- Every public route is prerendered to static HTML at build time (`src/entry-server.jsx` + `scripts/prerender.js`), so crawlers and answer engines that do not run JavaScript see the full page. The browser then hydrates it. `dist/200.html` is the unrendered app shell used as the fallback for account pages and unknown paths. Set `PRERENDER=false` to skip the step.
- JSON-LD is emitted from `src/components/SEO.jsx`. FAQ markup is generated from the FAQ shown on the homepage (`src/content/homeContent.js`), so it always matches the visible page.
- `public/robots.txt` and the generated robots file address search and answer-engine crawlers, and `public/llms.txt` summarises the company for language models.
- Retired pages are redirected in `public/_redirects` and in the router.

## Deployment

Production runs on Cloudflare Workers (`wrangler.jsonc`, headers in `public/_headers`, redirects in `public/_redirects`). Vercel Git deployments are disabled in `vercel.json`. See `docs/DEPLOYMENT.md`.
