# Home page performance notes

Measured with Lighthouse (mobile preset, simulated slow 4G) against `node scripts/serve-dist.mjs`
after `npm run build`. Numbers move a little between runs, so each change was run three times.

## Where it stands (2026-10)

| Metric | Value |
| --- | --- |
| Performance score | 0.87 to 0.91 |
| First contentful paint | 2.2 s |
| Largest contentful paint | 2.9 s (follows first paint) |
| Total blocking time | 140 to 290 ms |
| Layout shift | 0 |

## Done: framer-motion is off the first load

The navbar theme toggle, update and offline toasts, share button, loading screen, error screen, offline
page and custom cursor used framer-motion, so every page downloaded it (41 KB compressed) before painting.
They now use small CSS animations (`.anim-*` in `src/index.css`) and a requestAnimationFrame cursor.
Measured on the home page, three runs each: first paint 2.5 s to 2.2 s, largest paint 3.2 s to 2.9 s,
unused JavaScript 65 KiB to 37 KiB. Blog, legal, 404 and service pages still use it for section
animation and load it only when opened. `scripts/verify-build.js` and `e2e/startup.spec.js` fail if the
home, contact, services, about, process or portfolio pages fetch it again.

## Tried and measured

- **Inlining the stylesheet into the home pages' HTML** (saves one request): score 0.87 to 0.88-0.89,
  first and largest paint unchanged at 2.5 s and 3.2 s. The gain is inside the noise and the HTML grows
  from 23 KB to 258 KB before compression, so it was not kept.
- **Preloading only two of the six font files**: first paint 2.6 s, largest paint 3.9 s, score 0.76-0.79.
  The six preloads in `index.html` pay for themselves; keep them.

## Known and left alone

- `style-*.css` is render blocking (about 150 ms estimated) and about 78% of it is not used by the home page.
  Splitting it per route would save bytes but needs a per-route CSS pipeline.
- `react-core` has about 37 KiB the home page does not run; that is the framework itself.
- The Firebase SDK is deliberately not loaded at startup; `scripts/verify-build.js` fails the build if it
  becomes a preload of the home page.

Re-measure before changing any of this: cheap tuning (inlining CSS, fewer preloads) did not move first
paint, while removing a library from the first load did.

## Motion visuals on the home page (2026-10)

The home page now has five canvas or DOM visuals in `src/components/motion/`: a hero weave
(geometric ornament with travelling light pulses), a one-time "decode" of the headline, an
x-ray lens in the engineering section, a morphing blob in capabilities, an isometric product
city in work, and a letter tunnel behind the closing call to action.

How they are kept cheap, and what was measured (4x CPU throttle, three runs, same machine as the
numbers above):

| | Before | After |
| --- | --- | --- |
| Largest contentful paint | 216-252 ms | 236-344 ms (inside the run-to-run noise) |
| Long-task blocking | 281-386 ms | 380-391 ms |
| Layout shift | 0 | 0 |
| `HomePage` chunk (gzip) | 11.5 kB | 15.4 kB, plus four lazy chunks of 1.4-2.7 kB |

- Only the hero weave is in the home chunk. The other four load when they are within 600 px of the
  viewport (`Deferred.jsx`) into a box that already has its final size.
- Nothing is measured or built until a canvas is on screen. Every loop stops when the canvas
  leaves the screen or the tab is hidden. The weave and the city draw at 30 frames per second.
- With `prefers-reduced-motion` every visual paints one still frame and nothing animates.
- The decode intro rewrites only the value of each word's existing text node, so server-rendered
  text is what first paints and is what search engines and screen readers get. It holds each word
  at its measured size and pins it to the left edge while it scrambles (a right-to-left word grows
  from its left edge, and that counts as a layout shift). It runs once per page load.
- While the hero is on screen, a headless browser without a GPU spends about 90-140 ms of main
  thread per second on it, of which about 20-30 ms is script; the rest is software painting of the
  canvas. Re-measure on a real device before adding more canvases above the fold.
- `e2e/install-prompt.spec.js` runs with reduced motion: it simulates 31 seconds with a fake clock,
  which would otherwise paint about 1,900 frames of the weave and take 20+ seconds.
