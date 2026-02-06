# Font Files Setup Instructions

## Download Required Fonts

Use [google-webfonts-helper](https://gwfh.mranftl.com/fonts) to download the following fonts:

### Inter (Latin)

- Weights: 400, 500, 600, 700
- Format: woff2
- Character set: latin
- Files needed:
  - `inter-v13-latin-regular.woff2` (400)
  - `inter-v13-latin-500.woff2` (500)
  - `inter-v13-latin-600.woff2` (600)
  - `inter-v13-latin-700.woff2` (700)

### Montserrat (Latin)

- Weights: 700, 800
- Format: woff2
- Character set: latin
- Files needed:
  - `montserrat-v26-latin-700.woff2` (700)
  - `montserrat-v26-latin-800.woff2` (800)

### Cairo (Arabic)

- Weights: 400, 600, 700, 900
- Format: woff2
- Character set: arabic
- Files needed:
  - `cairo-v28-arabic-regular.woff2` (400)
  - `cairo-v28-arabic-600.woff2` (600)
  - `cairo-v28-arabic-700.woff2` (700)
  - `cairo-v28-arabic-900.woff2` (900)

## Alternative: Use @fontsource

Install via npm for automatic optimization:

```bash
npm install @fontsource/inter @fontsource/montserrat @fontsource/cairo
```

Then import in `src/index.css`:

```css
/* Import specific weights */
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/inter/600.css";
@import "@fontsource/inter/700.css";
@import "@fontsource/montserrat/700.css";
@import "@fontsource/montserrat/800.css";
@import "@fontsource/cairo/400.css";
@import "@fontsource/cairo/600.css";
@import "@fontsource/cairo/700.css";
@import "@fontsource/cairo/900.css";
```

## Expected File Sizes

- Inter: ~15-20KB per weight
- Montserrat: ~12-15KB per weight
- Cairo: ~18-25KB per weight
- **Total**: ~120KB (vs 180KB from Google Fonts CDN)

## Performance Impact

- **Eliminates**: 2 DNS lookups + 2 HTTPS connections
- **Reduces FCP**: ~400-800ms
- **Enables**: font-display: swap (no FOIT)
