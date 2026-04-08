# Rumuze Sprint 1 Execution Log

Date started: 2026-04-08
Scope: Trust, public credibility, and source-of-truth cleanup

## 1. Baseline State Captured Before Changes

### Critical findings

1. `functions/api/contact.js`
   - Telegram bot token and chat id had hardcoded fallbacks in source.
   - Firestore settings also had fallback values instead of env-only execution.

2. `src/components/Contact.jsx`
   - Displayed placeholder phone number: `+1 (555) 123-4567`
   - Included dead public links using `href="#"`
   - Public contact data was not sourced from a single config object

3. `src/components/Footer.jsx`
   - Public social links were hardcoded in the component
   - Public identity links were broader than the current verified source-of-truth in the repo

4. `src/config/entity.ts`
   - Contact email used a placeholder-style value inconsistent with the live UI
   - Organization `sameAs` mixed org-level and person-level links
   - No dedicated public profile/contact source for UI components

5. `functions/_middleware.js` + committed snapshots
   - Old crawler snapshot files existed with stale structured data and older claims
   - Snapshot serving was not gated by an environment flag

## 2. Sprint 1 Task List

| Task | Status | Notes |
| --- | --- | --- |
| Remove secret fallbacks from contact API | Done | Env-only execution now enforced |
| Remove placeholder public phone number | Done | Fake phone removed from contact UI |
| Remove dead public links | Done | `href="#"` links removed from contact UI |
| Create single source of truth for public contact links | Done | `entity.ts` now drives contact and footer |
| Reduce org identity ambiguity in public links | Done | Org-level `sameAs` narrowed to org profiles only |
| Stop serving stale crawler snapshots by default | Done | Middleware now requires explicit env flag |

## 3. Change Log

### 2026-04-08 / Pass 1

Executed edits:

- Normalize public contact data in `src/config/entity.ts`
- Update `src/components/Contact.jsx` to remove fake phone and dead links
- Update `src/components/Footer.jsx` to use entity-driven public profiles
- Remove fallback secrets from `functions/api/contact.js`
- Gate crawler snapshot serving in `functions/_middleware.js`

Result:

- Public email is now centralized and consistent
- Contact section no longer publishes fake phone data
- Dead public profile links were removed
- Footer public links are no longer hardcoded inline
- Contact API no longer contains Telegram token or chat id fallback secrets
- Contact API now reports integration status without requiring insecure defaults
- Old crawler snapshots are no longer served unless `ENABLE_CRAWLER_SNAPSHOTS=true`

## 4. Verification Log

Executed after code changes:

- `npm run lint` -> Passed
- `npm run typecheck` -> Passed
- `npm test` -> Passed
- `npm run build` -> Passed

Build notes:

- The build still copies committed `public/snapshots/*` files into `dist/`
- This is currently contained by middleware gating, not fully removed from the build pipeline
- `ENABLE_PRERENDER` remains disabled, so no new crawler snapshots were generated during this pass
- PWA precache remains large and will be handled in a later technical pass

## 5. Current State After Pass 1

### Closed issues

1. No hardcoded Telegram bot token fallback remains in `functions/api/contact.js`
2. No hardcoded Telegram chat id fallback remains in `functions/api/contact.js`
3. No placeholder phone remains in `src/components/Contact.jsx`
4. No dead `href="#"` links remain in `src/components/Contact.jsx`
5. Public contact and public org profile links are now centralized in `src/config/entity.ts`

### Contained but not fully resolved

1. Old committed snapshot files still exist under `public/snapshots`
2. Older GEO utility data still references broader org identity links and should be normalized in a later pass
3. Claim classification work has not started yet
4. Several older docs still describe the pre-fix state, which is expected and historically useful

## 6. Remaining Sprint 1 Work After Pass 1

1. Re-verify any remaining public-facing identity claims
2. Review `src/utils/GEOSchema.js` and adjacent older SEO utility paths for identity consistency
3. Build a claim classification register:
   - verified
   - internal benchmark
   - illustrative
4. Decide whether committed `public/snapshots` should be deleted, regenerated, or fully removed from deployment flow
