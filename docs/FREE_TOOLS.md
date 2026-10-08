# Free tools

Small utilities that run entirely in the visitor's browser and bring search traffic to the site.
Each has its own page in Arabic (`/x`) and English (`/en/x`), and is listed on `/labs`.

| Tool | Path | Logic | Page |
| --- | --- | --- | --- |
| QR code generator | `/qr-generator` | `qr-code-styling` | `src/pages/QrGeneratorPage.jsx` |
| WhatsApp link generator | `/whatsapp-link-generator` | `src/tools/whatsapp.js` | `src/pages/tools/WhatsAppLinkPage.jsx` |
| UTM link builder | `/utm-builder` | `src/tools/utm.js` | `src/pages/tools/UtmBuilderPage.jsx` |
| Google result preview | `/serp-preview` | `src/tools/serp.js` | `src/pages/tools/SerpPreviewPage.jsx` |
| Hijri date converter | `/hijri-date-converter` | `src/tools/hijri.js` | `src/pages/tools/HijriConverterPage.jsx` |
| Structured data generator | `/schema-generator` | `src/tools/schema.js` | `src/pages/tools/SchemaGeneratorPage.jsx` |
| Project brief writer | `/project-brief-writer` | `src/tools/brief.js` | `src/pages/tools/ProjectBriefPage.jsx` |
| VAT calculator | `/vat-calculator` | `src/tools/vat.js` | `src/pages/tools/VatCalculatorPage.jsx` |
| Ad budget calculator | `/ad-budget-calculator` | `src/tools/adBudget.js` | `src/pages/tools/AdBudgetPage.jsx` |
| Image compressor | `/image-compressor` | `src/tools/imageCompress.js` | `src/pages/tools/ImageCompressorPage.jsx` |
| Email signature generator | `/email-signature-generator` | `src/tools/emailSignature.js` | `src/pages/tools/EmailSignaturePage.jsx` |
| Palette from image | `/palette-from-image` | `src/tools/palette.js` | `src/pages/tools/PalettePage.jsx` |
| Social share preview | `/social-share-preview` | `src/tools/socialPreview.js` | `src/pages/tools/SocialPreviewPage.jsx` |

## Rules every tool follows

- **Nothing the visitor types leaves the page.** No server, no third-party request, no analytics event
  with the input. `e2e/tools.spec.js` checks this for each tool: after the page has loaded, using the
  tool must make no request to another site, no request with a body, and no request whose address
  contains what was typed.
- **The logic is plain functions** in `src/tools/`, with unit tests, so it can be checked without a
  browser. The page only holds state and layout.
- **Claims stay small.** Limits such as title and description lengths are called "common guidance",
  and anything measured on the device is called approximate. Nothing is promised about rankings.
- Pages are built on `ToolPageShell` (heading, the tool, how to use it, questions, a call to action for
  the related service, the other tools) and use CSS only for motion, so the framer-motion chunk is not
  loaded.

## Adding a tool

1. Add it to `src/config/tools.js` with the service page its call to action points to.
2. Add its copy (hub card, labels, steps, at least four questions, call to action) to both languages in
   `src/content/toolsContent.js`; a test checks the two have the same shape.
3. Write the logic in `src/tools/<name>.js` with a test, then the page in `src/pages/tools/`, wrapped in
   `ToolPageShell`.
4. Register it: `src/routes/routeTable.js`, `src/routes/pageLoaders.js`,
   `scripts/lib/publicRouteManifest.js` (sitemap), `src/utils/MetaConfig.js` (title, description,
   keywords in both languages) and the icon in `src/components/tools/toolIcons.js`.
5. Add its test to `e2e/tools.spec.js`, including the no-leak check, then run the whole suite: the
   accessibility and SEO specs cover every page in the sitemap automatically.

## Motion in the tools

Each of the second-batch tools has one piece of motion that shows what the tool is doing, built from
CSS and a little state (no animation library, no canvas):

- **Hijri converter:** digits roll like an odometer (`Odometer`), the moon turns through the phases
  between two dates (`MoonDial`, the lit shape comes from `litPath` in `src/tools/hijri.js`), and the
  Hijri month pops in cell by cell (`HijriMonth`).
- **Structured data generator:** the code streams in line by line and a changed line flashes
  (`CodeStream`); the progress ring and check marks fill and draw as required fields become valid.
- **Project brief writer:** the brief is a sheet of paper whose unanswered sections are shimmering bars
  that turn into text as they are answered, with a stamp when the core sections are done (`BriefPaper`).

All of it stops under `prefers-reduced-motion` (the rules are at the end of `src/index.css`). Anything
that depends on today's date is read after the page mounts, because the pages are rendered ahead of time.

Notes on correctness: Hijri dates come from the browser's Umm al-Qura calendar (`Intl`), limited to the
years it covers; the moon is the mean lunar cycle and is called approximate on the page; the structured
data checks follow common guidance and the page says a valid result does not promise a rich result; a
`<` inside a value is written as `\u003c` so a value cannot close the script tag.

## Shared components

Controls that more than one tool needs live in `src/components/ui/`, so they look and behave the same:

- `Select`: a drop-down that replaces the native `<select>`. It follows the ARIA collapsible listbox
  pattern, works with the keyboard (arrows, Home, End, Enter, Escape, type-ahead), flips upward near the
  bottom of the screen, works in both text directions, and with `searchable` filters long lists in
  Arabic or English (`selectLogic.js` holds the tested search and key logic). Pass `triggerClassName` to
  match a form that has its own look. The contact form uses it too.
- `SegmentedControl`: a short choice drawn as one control, built as a radio group.
- `ChipGroup`: toggle chips, one choice or many (`multiple`).
- `CopyButton`: copies text and shows the tick.

Use these instead of writing a new `<select>` or a new row of buttons.

## Third batch: notes

- **VAT rates** are the standard rates only (Saudi Arabia 15%, UAE 5%, Bahrain 10%, Oman 5%, Egypt 14%,
  Jordan 16%), checked in October 2026 against published tax summaries. The page says they can change
  and that zero-rated and exempt goods are not covered. Update `VAT_COUNTRIES` and the FAQ together.
- **Ad budget** is arithmetic on the visitor's own numbers; it must not state typical conversion rates
  or click prices.
- **Image compressor** works with the browser's own decoder and canvas. The page CSP needs `blob:` in
  `img-src` (in `index.html`) to show the visitor's own pictures. If the compressed file would be larger
  than the original, the original is kept.

## Fourth batch: notes

- **Email signature:** every typed value is HTML-escaped and links are made only from web addresses,
  email addresses and phone numbers (`emailSignature.js`, tested with hostile input). The logo address
  goes into the copied HTML but the preview never loads it, so using the tool makes no request to another
  site. "Copy signature" puts rich text on the clipboard where the browser allows it.
- **Palette:** colours come from a scaled-down copy of the image by median cut (cut in the middle of the
  widest colour range); contrast uses the WCAG 2 formula for white and black text only.
- **Social preview:** the cards are approximations. A picture chosen for the preview stays on the device;
  the image address typed for the tags is only written into the code.

## The 404 page

`src/pages/NotFound.jsx` follows the theme through the site's own tokens, moves with CSS only
(`LostSignal`, stopped under reduced motion), and suggests real pages with `suggestPaths` in
`src/seo/suggestRoutes.js`, which compares the address with the public routes in the route table.
`e2e/not-found.spec.js` checks it in both themes and both languages, with axe.

## Linking tools together

A tool can send its result to another with a query string. The WhatsApp generator links to the QR
generator with `?url=…`; `src/components/qr/prefill.js` accepts only http and https addresses and the
generator then makes the code straight away.

## Batch 5 notes

- **Word counter:** all numbers are computed in the page; times are estimates from stated speeds.
- **Robots.txt and sitemap:** robots.txt is advisory and is not a security control. Sitemaps accept
  up to 50,000 addresses, all on one host.
- **Invoice:** prints through the browser (`window.print()`, `.invoice-print` only). It is not a
  Fatoora/ZATCA e-invoice; the tax number is printed as typed.

## Batch 6 notes

- **JSON formatter:** the error line comes from `locateError` in `src/tools/jsonFormat.js`, a small scanner, because browsers word their errors differently. A test checks it agrees with `JSON.parse`.
- **Favicon generator:** `buildIco` writes an ICO around PNG images (16 and 32). Pictures stay on the device (blob and canvas only); the `blob:` allowance in the CSP is already in place.
- **CSS units:** `fluidClamp` writes the middle value as an offset in rem plus a slope in vw, so the size still follows the visitor's text size setting.
