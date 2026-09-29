# Rumuze website

The public website for [Rumuze](https://www.rumuze.com), a software engineering company based in Cairo, Egypt that builds custom platforms, mobile apps, and backend systems for businesses in the Gulf and MENA region. The site is bilingual (English LTR, Arabic RTL) and served from one codebase.

## Stack

- React 19, Vite 7, Tailwind CSS 3, React Router 7
- `react-i18next` for language state, with routes under `/` (English) and `/ar` (Arabic)
- `react-helmet-async` for per-route metadata, plus JSON-LD generated in `src/seo`
- Firebase (Auth, Firestore, Functions) for sign-in, messaging, and visit tracking
- Cloudflare Pages Functions in `functions/` for crawler-friendly metadata and security headers
- Progressive web app via `vite-plugin-pwa`

## Scripts

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm test             # vitest
npm run build        # client build, SSR build, critical CSS, prerender, sitemap, robots
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
functions/         Cloudflare Pages middleware (metadata injection, security headers)
firebase-functions/ Firebase Cloud Functions (notifications, visit tracking)
scripts/           build helpers (sitemap, critical CSS, /ar entry generation)
public/            static assets, robots.txt, llms.txt
docs/              deployment notes and CLAIMS_REGISTRY.md
```

## Content rules

Every public claim must be traceable to code or documentation. `docs/CLAIMS_REGISTRY.md` lists what is published and where it comes from. Do not add client names, revenue figures, uptime numbers, compliance certifications, or years of experience until they can be evidenced.

## SEO, GEO, and AEO

- Each language has its own URL, canonical tag, `hreflang` alternates, and sitemap entry.
- Every public route is prerendered to static HTML at build time (`src/entry-server.jsx` + `scripts/prerender.js`), so crawlers and answer engines that do not run JavaScript see the full page. The browser then hydrates it. `dist/200.html` is the unrendered app shell used as the fallback for account pages and unknown paths. Set `PRERENDER=false` to skip the step.
- JSON-LD is emitted from `src/components/SEO.jsx`. FAQ markup is generated from the FAQ shown on the homepage (`src/content/homeContent.js`), so it always matches the visible page.
- `public/robots.txt` and the generated robots file address search and answer-engine crawlers, and `public/llms.txt` summarises the company for language models.
- Retired pages are redirected in `public/_redirects`, `vercel.json`, and in the router.

## Deployment

See `docs/DEPLOYMENT.md`. The repository also carries Vercel, Netlify, and Cloudflare configuration; production runs on one of them, so keep the redirect lists in sync if you change routes.
