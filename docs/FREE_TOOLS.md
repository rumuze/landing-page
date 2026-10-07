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

## Linking tools together

A tool can send its result to another with a query string. The WhatsApp generator links to the QR
generator with `?url=…`; `src/components/qr/prefill.js` accepts only http and https addresses and the
generator then makes the code straight away.
