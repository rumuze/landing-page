# Security notes

## What is public
The site is static HTML plus a client app. Visitors can create a contact thread (guests included) and, if they accept analytics, send page-view events to the `trackVisit` Cloud Function. Everything else (reading threads, users, visits, notifications) needs a signed-in user and, for staff data, the `admin` role stored in Firestore.

## Controls in place
- **Firestore rules** (`firestore.rules`): every write is validated by field list, type and length; `role` can only be changed by an admin; `visits`, `visitSessions` and `notifications` cannot be written from the client at all.
- **Roles are enforced server-side.** The client hides admin screens for non-admins, but access comes from the rules, not from the UI.
- **Page CSP** (`index.html`, hardened at build): scripts run only from the site, the Google sign-in hosts and hashes of the inline scripts that ship. The build fails if `'unsafe-inline'` or `'unsafe-eval'` reaches a production page. Headers such as HSTS, `X-Frame-Options` and `frame-ancestors` come from `public/_headers`.
- **`trackVisit`**: origin allow-list, per-address rate limit that reads the address Google appended to `X-Forwarded-For` (not the client-supplied first entry), size limits on every field, and an `expireAt` for TTL deletion.
- **Consent**: no visit tracking until the visitor accepts (`src/utils/consent.js`).
- **Dependencies**: `npm audit` is clean; CI runs lint, typecheck, tests and the full build.
- **Reporting**: `public/.well-known/security.txt`.

## Known gaps
1. **Guest threads can be spammed.** Anyone can create a thread without signing in, and the rules cannot rate-limit. Options, strongest first: move thread creation behind an HTTPS function with per-address limits and a bot check (for example Cloudflare Turnstile), or enable Firebase App Check with reCAPTCHA Enterprise and enforce it for Firestore. Both need Firebase Console changes.
2. **The visit rate limit is per function instance** and resets on cold start. App Check is the real fix.
3. **Retention** only takes effect after the TTL policy is enabled (see `docs/DEPLOYMENT.md`).
4. **IP addresses** are stored in full. Truncating them (for example the last octet) would reduce what is kept; it changes what the admin visits page can show.
