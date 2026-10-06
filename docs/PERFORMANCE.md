# Home page performance notes

Measured with Lighthouse (mobile preset, simulated slow 4G) against `node scripts/serve-dist.mjs`
after `npm run build`. Numbers move a little between runs, so each change was run three times.

## Where it stands (2026-10)

| Metric | Value |
| --- | --- |
| Performance score | about 0.87 |
| First contentful paint | 2.5 s |
| Largest contentful paint | 3.2 s (follows first paint) |
| Total blocking time | 110 to 190 ms |
| Layout shift | 0 |

## Tried and measured

- **Inlining the stylesheet into the home pages' HTML** (saves one request): score 0.87 to 0.88-0.89,
  first and largest paint unchanged at 2.5 s and 3.2 s. The gain is inside the noise and the HTML grows
  from 23 KB to 258 KB before compression, so it was not kept.
- **Preloading only two of the six font files**: first paint 2.6 s, largest paint 3.9 s, score 0.76-0.79.
  The six preloads in `index.html` pay for themselves; keep them.

## Known and left alone

- `style-*.css` is render blocking (about 150 ms estimated) and about 78% of it is not used by the home page.
  Splitting it per route would save bytes but needs a per-route CSS pipeline.
- `react-core` and `framer` carry about 65 KB of code the home page does not run. Removing it means
  replacing framer-motion on the first screen, which is a design change, not a tuning step.
- The Firebase SDK is deliberately not loaded at startup; `scripts/verify-build.js` fails the build if it
  becomes a preload of the home page.

Re-measure before changing any of this: the first-paint time did not respond to the cheap changes above,
so the next real gain probably comes from shipping less JavaScript on the first screen.
