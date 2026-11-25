# Deployment

The same build is deployed to two hosts:

- **Vercel** serves `rumuze.com` today, because the domain's DNS points there. Every merge to `main` deploys to production and every pull request gets a preview. `vercel.json` is generated from `public/_redirects` and `public/_headers` (`npm run vercel-config`); a test fails when it is stale, so the two hosts answer the same way.
- **Cloudflare Workers** (static assets from `dist/`, configured in `wrangler.jsonc`) builds every merge and every pull request too. Its `*.workers.dev` address is the target if the domain is moved to Cloudflare later (see "The domain must point at Cloudflare").

Between 29 September and the change that restored Vercel, Vercel's Git deployments were switched off while the domain still pointed at Vercel, so the domain served a frozen build.

## Alias domain (rumuz.org)

`worker/index.js` is the Worker entry (`main` in `wrangler.jsonc`, with `assets.run_worker_first`). It answers `rumuz.org` and `www.rumuz.org` with a 301 to the same path and query on `https://www.rumuze.com`, and hands every other request to the static assets. To use it, add `rumuz.org` and `www.rumuz.org` as Custom Domains on the `landing-page` Worker, set SSL/TLS to Full (strict), and delete any Redirect Rules, Page Rules or Bulk Redirects for those hosts, since a second redirect layer is what causes loops. Check with `curl -sIL https://rumuz.org/`: one 301 to `https://www.rumuze.com/`, then 200. Then use Validate fix in Search Console. The redirect only applies to hosts served by Cloudflare; Vercel does not run this Worker.

## Build

```bash
npm run build
```

This runs the client build, an SSR build, the prerender step (44 static pages: every public route in both languages), the sitemap and a build check. `dist/` is what Cloudflare serves.

## What Cloudflare serves

| File | Purpose |
| --- | --- |
| `public/_headers` | Security headers on every response, long cache for `/assets/*` and fonts |
| `public/_redirects` | 301s for retired pages, then `/* /200.html 200` so account routes and unknown paths reach the client router |
| `dist/200.html` | The unrendered app shell (created by the prerender step) |
| `dist/<route>/index.html` | Prerendered pages with per-route title, description, canonical, hreflang and JSON-LD |

Per-route metadata is generated at build time from `src/utils/MetaConfig.js`, `src/config/*` and the page components. There is no runtime middleware.

## Languages and URLs

Arabic is the primary language and lives at the root; English lives under `/en`. Every public page exists in both (`/services` and `/en/services`), `x-default` in hreflang and the sitemap points at the Arabic URL, and a visitor who explicitly chose English is sent from `/` to `/en`. The language of a URL never depends on the browser, so crawlers always see the same page.

Old Arabic URLs under `/ar` are redirected (301) to the same path at the root by the last rules in `public/_redirects`. After a deploy that changes URLs, submit the new sitemap in Search Console and ask for the home pages to be re-crawled.

## Cloudflare Workers Builds

- Build command: `npm run build`. Deploy command: `npx wrangler deploy`.
- The Worker name in `wrangler.jsonc` must equal the Cloudflare project name (`landing-page`).
- Node: Vite 7 needs Node 20.19 or newer. `.node-version` pins 22, which Workers Builds reads. If the build image ignores it, set the `NODE_VERSION` build variable to `22`.
- If a build fails within seconds, open "View logs" in the dashboard; the first error line names the cause.

## Live check

Every build writes `dist/version.json` with the commit it was made from. `.github/workflows/live-check.yml` runs every six hours (and on demand from the Actions tab) and compares the commit the public domain serves with the latest commit on `main`, then checks that `/` is the Arabic page with the security headers and that `/ar/services` redirects permanently (301 on Cloudflare, 308 on Vercel) to `/services`. A merge gets 30 minutes to deploy before the check calls the domain behind. A red run means the build is fine but the site is stale or answering wrongly: it is how a frozen domain gets noticed the same day. Run it by hand with `EXPECTED_SHA=<commit> npm run check-live -- https://www.rumuze.com`.

## Moving the domain to Cloudflare (optional)

Building on Cloudflare is not enough on its own: `rumuze.com` has to be attached to the Worker. Check what answers for the domain:

```bash
getent hosts rumuze.com www.rumuze.com        # a Vercel address or a *.vercel-dns-*.com name means Vercel still serves the domain
curl -sI https://www.rumuze.com/ | grep -i -E "^server|x-vercel|cf-ray"
curl -sI https://www.rumuze.com/ar/services | grep -i -E "^HTTP|^location"   # the current build answers 301 (Cloudflare) or 308 (Vercel) to /services
```

If Vercel answers, visitors get Vercel's latest production deployment. To move to Cloudflare: in Cloudflare, add the `rumuze.com` zone (change the nameservers at the registrar), then Workers & Pages, `landing-page`, Settings, Domains & Routes, Add Custom Domain for `rumuze.com` and `www.rumuze.com`; remove the old Vercel A and CNAME records, and remove the domain from the Vercel project. The Worker's own `*.workers.dev` address always shows the newest build, so it is the quickest way to tell a code problem from a domain problem.

While Vercel serves the domain, keep its Git deployments on (do not set `git.deploymentEnabled` to false in `vercel.json`), otherwise the domain stops updating.

## Disconnecting Vercel (only after the domain has moved to Cloudflare)

Vercel dashboard, project `landing-page`, Settings, Git, Disconnect (or delete the project), then remove the Vercel GitHub App from the repository.

## After a deploy

```bash
curl -sI https://www.rumuze.com/ | grep -i -E "x-frame-options|strict-transport|content-security"
curl -sI https://www.rumuze.com/assets/<any-hashed-file>.js | grep -i cache-control
```

Then open the home page, `/en`, a service page and a path that does not exist (it should show the 404 page).

## Social previews and the OG image version

Open Graph images live in `public/og-image-en.png` and `public/og-image-ar.png` and are generated by `scripts/og/generate.mjs` (see the header of that file). When the images or the page copy change enough that link previews should refresh:

1. Bump `OG_IMAGE_VERSION` in `src/utils/MetaConfig.js` and the `?v=` value in `index.html`.
2. Rebuild and deploy.
3. Re-scrape the URLs: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/), LinkedIn Post Inspector, and WhatsApp (send the link in a chat; WhatsApp caches for a long time, which the version parameter avoids).

## Content Security Policy

`index.html` keeps `'unsafe-inline'` and `'unsafe-eval'` for the dev server (Vite injects inline scripts). `scripts/prerender.js` replaces them with hashes of the inline scripts in the built page, and fails the build if either keyword is still present in a production page's `script-src`. If you add an inline script, it is picked up automatically.

## Firebase

Build variables (Cloudflare, Settings, Variables and Secrets): the `VITE_FIREBASE_*` values, `VITE_VISIT_TRACKING_ENDPOINT` (optional) and `VITE_RECAPTCHA_SITE_KEY` (App Check; see `docs/SECURITY.md`).

Sign-in, Firestore and the Cloud Functions in `firebase-functions/` (chat notifications, consent-gated visit tracking) are deployed separately with the Firebase CLI. Rules are in `firestore.rules`. The page CSP in `index.html` must allow the function origin (`*.cloudfunctions.net`, `*.run.app`).

### Retention of usage data

`trackVisit` writes an `expireAt` timestamp (180 days ahead) on every `visits` and `visitSessions` document. Firestore only deletes on it once a TTL policy exists; enable it once per collection group:

```bash
gcloud firestore fields ttls update expireAt --collection-group=visits --enable-ttl
gcloud firestore fields ttls update expireAt --collection-group=visitSessions --enable-ttl
```

Documents written before this change have no `expireAt` and are not deleted by the policy. When the policy is on, state the retention period in the privacy text (`legal.privacy` in `src/locales/*.json`).
