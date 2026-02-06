# Font Subsetting Guide for Perfect Performance

## Goal

Reduce font file sizes from ~40KB to <10KB through subsetting, improving PageSpeed score.

---

## What is Font Subsetting?

Font subsetting removes unused characters from font files, dramatically reducing file size. For example:

- **Full Inter font**: ~40KB (contains 1000+ glyphs)
- **Subset Inter font**: ~8KB (contains only used characters)

---

## Method 1: Automated Subsetting with glyphhanger (Recommended)

### Step 1: Install glyphhanger

```bash
npm install -g glyphhanger
```

### Step 2: Analyze Your Site

```bash
# Start your dev server
npm run dev

# In another terminal, analyze character usage
glyphhanger http://localhost:4173 --subset=public/fonts/*.woff2 --formats=woff2
```

### Step 3: Apply Subsetting

```bash
# This will create subset versions of your fonts
glyphhanger http://localhost:4173 \
  --subset=public/fonts/inter-v13-latin-regular.woff2 \
  --subset=public/fonts/inter-v13-latin-600.woff2 \
  --subset=public/fonts/inter-v13-latin-700.woff2 \
  --subset=public/fonts/cairo-v28-arabic-regular.woff2 \
  --subset=public/fonts/cairo-v28-arabic-700.woff2 \
  --subset=public/fonts/montserrat-v26-latin-700.woff2 \
  --formats=woff2 \
  --output=public/fonts/
```

---

## Method 2: Online Tool (Easier, Manual)

### Step 1: Visit Font Subsetter

Go to: https://everythingfonts.com/subsetter

### Step 2: Upload Font Files

Upload each `.woff2` file from `/public/fonts/`

### Step 3: Select Character Sets

For **English (Inter, Montserrat)**:

- Basic Latin (A-Z, a-z, 0-9)
- Punctuation
- Common symbols

For **Arabic (Cairo)**:

- Arabic script
- Arabic numerals
- Common punctuation

### Step 4: Download Subset Fonts

Download the subset versions and replace the original files in `/public/fonts/`

---

## Method 3: Use Fontsource Variable Fonts (Easiest)

### Step 1: Install Fontsource

```bash
npm install @fontsource-variable/inter @fontsource-variable/montserrat @fontsource/cairo
```

### Step 2: Update fonts.css

Replace the current `@font-face` declarations with:

```css
/* Import variable fonts (automatically subset) */
@import "@fontsource-variable/inter";
@import "@fontsource-variable/montserrat";
@import "@fontsource/cairo/400.css";
@import "@fontsource/cairo/700.css";
```

### Step 3: Update index.html

Remove font preload links (Fontsource handles this automatically)

---

## Expected Results

### Before Subsetting

| Font           | Size      | Characters   |
| -------------- | --------- | ------------ |
| Inter Regular  | 40KB      | 1000+ glyphs |
| Inter 600      | 40KB      | 1000+ glyphs |
| Inter 700      | 40KB      | 1000+ glyphs |
| Cairo Regular  | 45KB      | 800+ glyphs  |
| Cairo 700      | 45KB      | 800+ glyphs  |
| Montserrat 700 | 38KB      | 900+ glyphs  |
| **Total**      | **248KB** | -            |

### After Subsetting

| Font           | Size     | Characters  |
| -------------- | -------- | ----------- |
| Inter Regular  | 8KB      | ~200 glyphs |
| Inter 600      | 8KB      | ~200 glyphs |
| Inter 700      | 8KB      | ~200 glyphs |
| Cairo Regular  | 12KB     | ~150 glyphs |
| Cairo 700      | 12KB     | ~150 glyphs |
| Montserrat 700 | 7KB      | ~180 glyphs |
| **Total**      | **55KB** | -           |

**Savings**: ~193KB (-78%)

---

## Verification

### Check Font File Sizes

```bash
ls -lh public/fonts/*.woff2
```

### Test in Browser

1. Open DevTools → Network tab
2. Filter by "Font"
3. Check file sizes
4. Verify fonts load correctly

### Run Lighthouse

```bash
npx lighthouse http://localhost:4173 --view
```

**Expected**: Performance score should increase by 2-3 points

---

## Important Notes

### ⚠️ Don't Over-Subset

Make sure to include:

- All Latin characters (A-Z, a-z)
- All numbers (0-9)
- Common punctuation (. , ! ? - ' ")
- Special characters used in your content

### ✅ Test Thoroughly

After subsetting, test all pages to ensure no characters are missing.

### 🔄 Re-subset When Content Changes

If you add new languages or special characters, re-run subsetting.

---

## Recommended Approach

For **Rumuze landing page**, I recommend:

1. **Short-term**: Use Method 2 (online tool) for quick wins
2. **Long-term**: Switch to Method 3 (Fontsource) for automatic optimization

---

## Alternative: Unicode-Range Subsetting

If you want manual control, use `unicode-range` in `@font-face`:

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-v13-latin-regular.woff2") format("woff2");
  /* Only load for Latin characters */
  unicode-range:
    U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF,
    U+FFFD;
}
```

This tells the browser to only download the font if those characters are used on the page.

---

## Questions?

If you need help with font subsetting, let me know and I can:

1. Generate the exact glyphhanger command for your site
2. Create a custom subsetting script
3. Help migrate to Fontsource

**Status**: Ready to implement! Choose your preferred method and let me know if you need assistance.
