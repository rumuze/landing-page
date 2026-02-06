# Dynamic OG System - Deployment Guide

## Quick Start

### 1. Install Dependencies (if needed)

```bash
npm install --save-dev vitest
```

### 2. Run Tests

```bash
# Run all tests
npm test

# Run MetadataService tests specifically
npx vitest run functions/services/MetadataService.test.js

# Watch mode for development
npx vitest watch
```

### 3. Deploy to Cloudflare Pages

```bash
# Build the project
npm run build

# Deploy to Cloudflare
npm run deploy
```

---

## Verification Checklist

### ✅ Pre-Deployment

- [ ] All unit tests pass (`npm test`)
- [ ] OG images exist in `/public` (og-image-en.png, og-image-ar.png)
- [ ] Build completes successfully (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)

### ✅ Post-Deployment

#### 1. **Browser DevTools Inspection**

- Open `https://rumuze.com/ar` in Chrome
- Open DevTools → Elements → Inspect `<head>`
- Verify:
  - `<html lang="ar" dir="rtl">`
  - `<meta property="og:locale" content="ar_AR">`
  - `<meta property="og:image" content="https://rumuze.com/og-image-ar.png?v=2026-02">`
  - `<meta property="og:image:width" content="1200">`
  - `<meta property="og:image:height" content="630">`
  - No duplicate meta tags

#### 2. **WhatsApp Preview Testing**

- Open WhatsApp (Web or Mobile)
- Send yourself these URLs:
  - `https://rumuze.com/` (English)
  - `https://rumuze.com/ar` (Arabic)
  - `https://rumuze.com/services`
  - `https://rumuze.com/ar/services`
- **Expected**: Preview card shows correct image, title, description per locale

#### 3. **Facebook Sharing Debugger**

- Go to: https://developers.facebook.com/tools/debug/
- Test URLs:
  - `https://rumuze.com/`
  - `https://rumuze.com/ar`
- Click "Debug" → Verify:
  - ✅ `og:title` matches locale
  - ✅ `og:description` matches locale
  - ✅ `og:image` shows correct bilingual image
  - ✅ `og:image:width` = `1200`
  - ✅ `og:image:height` = `630`
  - ✅ `og:locale` = `ar_AR` or `en_US`
  - ✅ No warnings or errors

#### 4. **LinkedIn Preview Testing**

- Create a new LinkedIn post
- Paste URL: `https://rumuze.com/services`
- **Expected**: Correct title, description, and image display

---

## Cache Busting Strategy

### When to Update Version

Update `OG_IMAGE_VERSION` in `functions/config/metadata.config.js` when:

- OG images change
- Metadata content significantly changes
- Social previews need to be refreshed

### How to Update

1. **Update Config**:

```javascript
// functions/config/metadata.config.js
export const OG_IMAGE_VERSION = "2026-02-patch1"; // Increment version
```

2. **Update SEO Component**:

```javascript
// src/components/SEO.jsx
const ogImageVersion = "2026-02-patch1"; // Match config version
```

3. **Clear WhatsApp Cache**:

- Go to: https://developers.facebook.com/tools/debug/
- Enter each URL
- Click "Scrape Again"
- Verify new image loads

---

## Monitoring

### Cloudflare Analytics

Monitor Worker performance:

- Dashboard → Workers & Pages → rumuze-landing → Metrics
- **Target**: < 10ms CPU time per request
- **Alert**: If errors > 0.1%

### Social Media Crawlers

Check crawler activity in Cloudflare Logs:

- Look for User-Agents: `facebookexternalhit`, `WhatsApp`, `LinkedInBot`
- Verify 200 status codes
- Check response times

---

## Troubleshooting

### Issue: WhatsApp shows old image

**Solution**:

1. Update `OG_IMAGE_VERSION` in config
2. Clear cache via Facebook debugger
3. Wait 5-10 minutes for propagation
4. Test again

### Issue: Arabic text not displaying in OG image

**Solution**:

- Regenerate `og-image-ar.png` with proper RTL rendering
- Ensure font supports Arabic characters
- Update version to force re-fetch

### Issue: Meta tags duplicated

**Solution**:

- Middleware removes existing tags before injection
- Check if React Helmet is running after middleware
- Verify HTMLRewriter selectors are correct

### Issue: Image not loading (404)

**Solution**:

- Verify images exist in `/public` directory
- Check build output includes images
- Ensure Cloudflare Pages serves static assets correctly

---

## Performance Optimization

### Current Performance

- **Middleware Latency**: ~5-10ms
- **Image Size**: ~150KB per OG image
- **Total Page Load**: +minimal overhead

### Future Enhancements

1. **WebP Format**: Convert OG images to WebP for smaller size
2. **CDN Caching**: Add longer cache headers for images
3. **Lazy Loading**: Only inject metadata for social crawlers

---

## Maintenance

### Monthly Tasks

- [ ] Review Cloudflare Worker metrics
- [ ] Check for new social media crawler User-Agents
- [ ] Verify OG images still render correctly
- [ ] Update metadata for new routes

### Quarterly Tasks

- [ ] Audit metadata accuracy across all routes
- [ ] Update OG images if branding changes
- [ ] Review and update cache-busting strategy
- [ ] Run full test suite

---

## Support

For issues or questions:

1. Check Cloudflare Workers logs
2. Review test failures (`npm test`)
3. Verify configuration in `metadata.config.js`
4. Test with Facebook Sharing Debugger
