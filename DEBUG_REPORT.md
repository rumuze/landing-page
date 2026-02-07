# 🧾 Technical Debug Report – SPA 404 Issue

## Executive Summary

The deployment suffers from a **"File Masking Directory" routing conflict**. While `_redirects` and `functions/_middleware.js` are correctly configured, the build output directory (`dist/`) contains unexpected HTML files (e.g., `ar.html`) at the root. These files match the first segment of deep routes (e.g., `/ar/services`), causing Cloudflare's asset router to identify `/ar` as a **file** rather than a directory. This halts path traversal, returns a 404 "Not a Directory" error, and prevents the SPA fallback (`_redirects`) from ever triggering.

---

## 1. Current System State

- **Authorization**: `dist/_redirects` exists (58 bytes) and contains the correct SPA rewrite rule: `/* /index.html 200`.
- **Snapshots**: `dist/snapshots/` exists and contains the expected pre-rendered files (e.g., `ar_services.html`, `ar.html`).
- **Middleware**: `functions/_middleware.js` correctly implements crawler detection and snapshot serving logic. It passes browser requests to `next()`.
- **Sitemap**: `dist/sitemap.xml` correctly lists deep routes (e.g., `/ar/services`).

## 2. Observed Failure

- **Symptom**: Direct access to `/ar/services` returns **404 Not Found**.
- **Behavior**: The request does **not** fall back to `index.html` (SPA), nor does it serve a snapshot.

## 3. Root Cause Analysis

**Diagnosis: File System Routing Conflict (File Masking)**

The `dist/` directory currently contains a mix of **snapshots in the root** and the expected SPA assets.

- **observed**: `dist/ar.html` exists.
- **Expected**: `dist/ar` should either be a directory or non-existent (handled by `_redirects`).

When a request for `/ar/services` arrives:

1.  Cloudflare Pages routing attempts to resolve the path.
2.  It encounters `ar` as a **physical file** (`dist/ar.html`).
3.  Since `ar` is a file, it cannot contain `services`.
4.  The router aborts with a **404** (effectively "Path type conflict").
5.  Because the router "found" `ar` (as a file), it does **not** treat this as a "Missing Asset" in the traditional sense that triggers the `/*` fallback check. The existence of `ar.html` masks the route.

### What This Issue Is NOT

- **NOT** a Cloudflare Functions error (Middleware logic is sound).
- **NOT** a missing `_redirects` file (File is present).
- **NOT** a missing snapshot (Snapshots await in `dist/snapshots/`).
- **NOT** a configuration error in `vite.config.js` or `package.json`.

## 4. Middleware Analysis (`_middleware.js`)

- **Execution Order**: Runs before static assets.
- **Fallback Behavior**: Calls `await next()`.
- **Blocking**: Does **not** block static assets for browsers.
- **Hard 404**: It blindly returns the response from `next()`. Because `next()` returns 404 (due to the file masking issue described above), the middleware returns 404.

## 5. Snapshot Serving Logic

- **Existence**: Snapshots exist in `dist/snapshots/`.
- **Logic**: The middleware correctly maps `/ar/services` -> `/snapshots/ar_services.html` for crawlers.
- **Gap**: There is no logic serving these snapshots to **browsers**, which is correct for a SPA (browsers should get `index.html`).

## 6. Request Flow Trace (GET /ar/services)

| Step | Component            | Action                 | Result                                    |
| :--- | :------------------- | :--------------------- | :---------------------------------------- |
| 1    | **Browser**          | Request `/ar/services` | Sends GET request                         |
| 2    | **Cloudflare Pages** | Match Routes           | Matches `functions/_middleware.js` (`/*`) |
| 3    | **Middleware**       | `onRequest`            | Starts execution                          |
| 4    | **Middleware**       | `isCrawler` check      | `false` (Browser)                         |
| 5    | **Middleware**       | Call `next()`          | Handover to Asset Router                  |
| 6    | **Asset Router**     | Path Traversal         | Checks `/ar`                              |
| 7    | **Asset Router**     | **CRITICAL FAILURE**   | **Found `dist/ar.html` (File)**           |
| 8    | **Asset Router**     | Traversal Check        | Cannot traverse `/services` inside a file |
| 9    | **Asset Router**     | Error                  | Returns **404** (Conflict)                |
| 10   | **Middleware**       | Receive Response       | Receives 404 Response                     |
| 11   | **Middleware**       | Return                 | Returns 404 to Browser                    |

_Note: The `_redirects` fallback (Step 12) is skipped because the router hit a filesystem conflict (Step 7) rather than a "Path Not Found"._

## 7. Conclusions & Recommendations

### Technical Conclusion

The presence of **stale or misplaced HTML files** (`ar.html`, `services.html`) in the root of the `dist/` directory is physically blocking the router from processing deep paths. These files likely originate from a previous build configuration or a script that wrote to `dist/` instead of `dist/snapshots/`.

### Risk Assessment

- **High**: As-is, all non-root routes (e.g., `/services`, `/ar/about`) will fail with 404 for users.
- **Correction**: Removing these conflicts will immediately restore SPA routing.

### Recommended Next Action

**Clean the build artifact.**
The deployment pipeline must ensure `dist/` is clean before generating snapshots. The current `vite build` command usually does this, so these files may be persistent locally or generated by a script that was not identified in `package.json`.

**Immediate Fix (Command to run):**

1.  Delete `dist/` entirely.
2.  Run `npm run build` fresh.
3.  Verify `dist/` root contains **only** `index.html` and assets, with **no** other `.html` files (except `offline.html`).
