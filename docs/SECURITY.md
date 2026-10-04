# Security notes

## What is public
The site is static HTML plus a client app. Visitors can create a contact thread (guests included) and, if they accept analytics, send page-view events to the `trackVisit` Cloud Function. Everything else (reading threads, users, visits, notifications) needs a signed-in user and, for staff data, the `admin` role stored in Firestore.

## Controls in place
- **Firestore rules** (`firestore.rules`): every write is validated by field list, type and length; `role` can only be changed by an admin; `visits`, `visitSessions` and `notifications` cannot be written from the client at all.
- **Roles are enforced server-side.** The client hides admin screens for non-admins, but access comes from the rules, not from the UI.
- **Page CSP** (`index.html`, hardened at build): scripts run only from the site, the Google sign-in hosts and hashes of the inline scripts that ship. The build fails if `'unsafe-inline'` or `'unsafe-eval'` reaches a production page. Headers such as HSTS, `X-Frame-Options` and `frame-ancestors` come from `public/_headers`.
- **`trackVisit`**: origin allow-list, per-address rate limit that reads the address Google appended to `X-Forwarded-For` (not the client-supplied first entry), size limits on every field, and an `expireAt` for TTL deletion.
- **Consent**: no visit tracking until the visitor accepts (`src/utils/consent.js`).
- **Dependencies**: CI runs lint, typecheck, tests, the unused-code check, the full build and the browser tests. `npm audit` reports one open item, described under Known gaps (5).
- **Reporting**: `public/.well-known/security.txt`.

## App Check rollout
The site starts Firebase App Check when `VITE_RECAPTCHA_SITE_KEY` is set at build time, attaches its token to Firestore requests (automatic) and to `trackVisit` (`X-Firebase-AppCheck` header). Turn it on in this order so nothing breaks:

1. Firebase Console, App Check, Apps: register the web app with **reCAPTCHA v3** and copy the site key.
2. Cloudflare, project `landing-page`, Settings, Variables and Secrets (build): add `VITE_RECAPTCHA_SITE_KEY` with that key. Redeploy.
3. Watch App Check, APIs, Cloud Firestore metrics for a day or two: the share of verified requests should be close to 100%.
4. Enforce it: App Check, APIs, Cloud Firestore, Enforce. Guests can still create threads from the site, and requests from scripts are rejected.
5. Deploy the function with `APP_CHECK_ENFORCE=true` (set it as a function environment variable) to make `trackVisit` require a token too. Until then it only logs requests without one.
6. Local development: run `npm run dev`, copy the debug token the SDK prints in the console, and add it under App Check, Apps, Manage debug tokens.

The privacy text discloses reCAPTCHA. If you later switch to reCAPTCHA Enterprise, change `ReCaptchaV3Provider` to `ReCaptchaEnterpriseProvider` in `src/providers/firebase/firebaseApp.js`.

## Known gaps
1. **Guest threads can be spammed until App Check is enforced.** Anyone can create a thread without signing in, and the rules cannot rate-limit. The code for App Check is in place (see below) but does nothing until the steps below are done in the Firebase Console.
2. **The visit rate limit is per function instance** and resets on cold start. Enforcing App Check on `trackVisit` (`APP_CHECK_ENFORCE=true`) is the real fix.
3. **Retention** only takes effect after the TTL policy is enabled (see `docs/DEPLOYMENT.md`).
4. **IP addresses** are stored in full. Truncating them (for example the last octet) would reduce what is kept; it changes what the admin visits page can show.
5. **`npm audit` reports `@grpc/grpc-js` (4 high, all one chain through `firebase`).** The advisories concern gRPC servers and Node transport. This site only uses the browser build of the Firebase SDK, which talks to Firestore over WebChannel and does not load `@grpc/grpc-js` (checked: the string is absent from the built bundle), and `firebase` is already on the latest release. npm's suggested fix downgrades `firebase` to 9.14, which is not an improvement. Re-run `npm audit` after each Firebase release and update when the chain is fixed. The Cloud Functions in `firebase-functions/` have their own dependencies and are audited separately.
