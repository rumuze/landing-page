# Rumuze Claims Registry

Date: 2026-04-08  
Owner: Product Documentation + Technical SEO + Delivery Governance  
Status: Active working registry

## 1. Purpose

This registry classifies every public-facing commercial, technical, and proof-oriented claim before it is used in:

- website copy
- metadata and structured data
- case studies
- comparison pages
- investor or client-facing collateral

No claim should be promoted as factual unless it has a classification, a status, and an owner for validation.

## 2. Classification Model

### Claim Type

- `verified`: backed by an external source, signed deliverable, contract artifact, analytics export, production telemetry, or client-approved proof
- `internal benchmark`: derived from internal delivery data, controlled experiments, or internal performance reporting; publish only with clear scope
- `illustrative`: used to explain a scenario, architecture pattern, or hypothetical outcome; must never be presented as a verified client result

### Claim Status

- `confirmed`: reviewed and approved for public use in its current wording
- `unverified`: currently used or proposed without sufficient evidence
- `needs validation`: likely supportable, but missing documentary proof, source linking, or wording review

## 3. Operating Rules

1. Every numeric claim must name its measurement scope.
2. Every client-result claim must state whether it is verified, internal benchmark, or illustrative.
3. Any claim marked `illustrative` must be labeled as scenario/example content in the page copy or surrounding context.
4. Claims used in JSON-LD, metadata, comparison pages, or hero sections require stricter review than long-form blog commentary.
5. When a claim changes wording, the registry entry must be updated rather than duplicated.

## 4. Registry Table

| ID | Claim Text | Type | Source | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| CR-001 | Rumuze builds bilingual Arabic-English platforms from a single codebase. | verified | Current application architecture, i18n implementation, route structure | confirmed | Supported by `react-i18next`, locale routes, and RTL/LTR switching in production code. |
| CR-002 | Rumuze supports Arabic RTL and English LTR rendering across public-facing pages. | verified | Frontend implementation review, route rendering behavior | confirmed | Safe technical claim; can be used in product copy and authority pages. |
| CR-003 | Rumuze implements Organization, Person, WebSite, Breadcrumb, Article, FAQ, and Service schema markup. | verified | Current SEO component and page-specific schema injection paths | confirmed | Wording should reflect implementation scope, not imply third-party validation. |
| CR-004 | Rumuze delivers structured technical SEO covering canonical URLs, hreflang, sitemap generation, and JSON-LD. | verified | Sprint 2 implementation | confirmed | Safe operational claim after Sprint 2 changes. |
| CR-005 | Rumuze can connect software delivery with revenue attribution infrastructure. | verified | Service architecture and public service pages | confirmed | Use as capability claim, not as guaranteed business outcome claim. |
| CR-006 | Rumuze reduces long-term maintenance cost by up to 60% over 3 years. | illustrative | Comparison-page marketing content only | unverified | Do not use as factual proof until backed by project portfolio evidence or benchmark study. |
| CR-007 | Rumuze captures 30–40% more conversion data through server-side tracking than client-side pixels alone. | internal benchmark | Internal marketing infrastructure hypothesis / benchmark framing | needs validation | Needs documented methodology, sample size, and measurement conditions before public proof use. |
| CR-008 | Rumuze operates under SLO-governed delivery with measurable uptime targets. | verified | Public service framework, technical positioning, delivery language | needs validation | Capability is real; public wording should avoid explicit uptime guarantees unless contract templates and monitored SLAs exist. |
| CR-009 | Rumuze has delivered 47+ projects. | internal benchmark | Aggregate metrics in case-study config | unverified | Remove from proof-heavy placement until backed by delivery ledger or CRM/project history. |
| CR-010 | Rumuze has served clients in 12+ countries. | internal benchmark | Aggregate metrics in case-study config | unverified | Needs client/account records and definition of “served” before use in public trust blocks. |
| CR-011 | Rumuze achieved 99.97% uptime in a fintech platform engagement. | illustrative | Case study content in `src/config/caseStudies.ts` | needs validation | Can remain only if the case study is labeled illustrative or composite. |
| CR-012 | Rumuze improved ecommerce ROAS from 1.8x to 4.6x in three months. | illustrative | Case study content in `src/config/caseStudies.ts` | needs validation | Requires client-approved analytics exports or should remain explicitly illustrative/composite. |
| CR-013 | Rumuze builds enterprise web platforms with API-first backends and multilingual SEO readiness. | verified | Service pages and engineering content | confirmed | Safe capability claim grounded in product/service positioning and code structure. |
| CR-014 | Rumuze provides structured delivery governance with sprint reviews, weekly reporting, and scope control. | verified | Public methodology and enterprise framework content | needs validation | Confirm against actual operating process before presenting as universal delivery standard. |
| CR-036 | Rumuze builds delivery and multi-vendor marketplace platforms (customer, vendor, courier apps, admin panel, zones, wallets). | verified | Repository README of the Wasal delivery platform and the Rveta delivery app | needs validation | Capability claim only. Does not state that any platform is live or that it has users; no market-share or client claims. |
| CR-037 | Rumuze builds self-hosted messaging and WebRTC calling apps (Flutter, web, admin, Node.js). Traffic is encrypted in transit; end-to-end encryption is not included. | verified | Repository README of the Chix platform | needs validation | The service page states E2E encryption is separate work. Re-check wording if E2E ships. |
| CR-038 | Rumuze builds industry-specific multi-tenant SaaS (school-transport example on Laravel, GraphQL/REST, Redis queues, Firebase push). | verified | Repository README of the Busaty platform | needs validation | Capability claim only. No customer counts or school names. |
| CR-039 | Hosting inside Saudi Arabia and ZATCA e-invoicing compliance are NOT claimed. | verified | Owner confirmed neither exists (session, 2026-10-07) | confirmed | Do not add either claim until evidenced. Service pages say only that hosting location is documented and chosen by the client. |

## 5. Recommended Labeling Policy

### Allowed in trust-critical surfaces

- verified + confirmed

Examples:

- homepage hero supporting text
- metadata descriptions
- JSON-LD claims
- footer/company identity
- sales deck executive summary

### Allowed with scoped wording

- internal benchmark + confirmed
- verified + needs validation

Examples:

- methodology pages
- service pages with qualification context
- capability comparison tables

### Must be explicitly labeled

- illustrative
- unverified
- needs validation when numeric or outcome-driven

Examples:

- synthetic case studies
- hypothetical ROI examples
- benchmark scenarios

Recommended label text:

- `Illustrative scenario`
- `Internal benchmark`
- `Composite example pending validation`

## 6. Review Workflow

1. Draft claim
2. Assign type
3. Attach source or note why source is missing
4. Approve status
5. Record page/component usage
6. Re-review on wording changes

## 7. Next Registry Actions

1. Audit all aggregate metrics in case studies and homepage metrics bar.
2. Mark each case study as `verified`, `composite`, or `illustrative` in the page UI.
3. Create a proof artifact folder or source index for validated client outcomes.
4. Link future ADRs or marketing approval records back to claim IDs.

## 6. Update 2026-09-29: repositioning as a software engineering company

The homepage, portfolio page, navigation, intake form, and page metadata were rewritten around claims that can be traced to code in Rumuze's own repositories.

### Removed from public pages

| ID | Change |
| --- | --- |
| CR-006 to CR-012 | The `/case-studies` pages, aggregate metrics (47+ projects, 12+ countries, average ROAS), the fabricated testimonial, and the "internal benchmark / confidence" badges are gone. `/case-studies/*` redirects to `/portfolio`. |

### Added (source: repository READMEs and code)

| ID | Claim Text | Type | Source | Status |
| --- | --- | --- | --- | --- |
| CR-015 | RumuzePMO is a Laravel 12 modular monolith with seven modules (CRM, ERP, HRM, LandingPage, Payment, ProjectManagement, Support) that can be switched on independently. | verified | `rumuze/rumuzePMO` README, `modules_statuses.json` | confirmed |
| CR-016 | RumuzePMO integrates multiple payment gateways and runs on FrankenPHP/Octane with Redis queues. | verified | `rumuze/rumuzePMO` README | confirmed |
| CR-017 | Rveta includes a Flutter driver app with live location tracking, biometric lock, push notifications, customer chat, and Arabic/English localisation, backed by a Laravel API. | verified | `rumuze/rveta-delivery-app` README | confirmed |
| CR-018 | Rumuze Core is a NestJS API with a transactional outbox, webhook engine, Socket.IO realtime, and trace ID propagation, plus a Next.js dashboard. | verified | `rumuze/core` README | confirmed |
| CR-019 | Rveta Connector is a Flutter app with device pairing, token rotation, and a foreground command channel. It is labelled "In development". | verified | `rumuze/connector-app` README | confirmed |
| CR-020 | ~~Every request is reviewed within one business day.~~ | removed 2026-09-29 | The time commitment was unverified; copy now says requests are read and answered by email. | retired |
| CR-021 | RumuzePMO includes tenant-isolation tooling and request tracing (homepage, Our work page, architecture diagram, engineering habits). | verified | `rumuze/rumuzepmo` at 224d619: `Tenant*Command` classes (coverage, enforce, query guard, table classifier), `RequestExecutionTraceMiddleware` (per-request `trace_id`), `/up` health route in `bootstrap/app.php` | confirmed |
| CR-022 | RumuzePMO product page: modules, stack, tenant tooling, `/up` health route, trace id middleware. | verified | `rumuze/rumuzepmo` README and `app/` at 224d619 | confirmed |
| CR-023 | Rveta product page: driver app features, state management, biometric lock, background tracking, Firebase push. | verified | `rumuze/rveta-delivery-app` README and `lib/`; backend edge and workers from `rumuze/rveta.com` `compose.yml` | confirmed |
| CR-024 | Rumuze Core product page: EventBus, outbox, webhook engine, Socket.IO, Nginx and Let's Encrypt, version endpoint. | verified | `rumuze/core` README | confirmed |
| CR-025 | Rveta Connector product page, including the list of what is not built yet. | verified | `rumuze/connector-app` README (Current MVP Status, Not Implemented Yet) | confirmed |
| CR-026 | Blog: RumuzePMO ships architecture and domain scan commands and an installable pre-commit hook. | verified | `rumuzepmo` README (Architecture Governance, Git Hook), `app/Console/Commands` | confirmed |
| CR-027 | Blog: Rveta stack has per-service container checks and a bootstrap that waits for health with a timeout; RumuzePMO deploy order is migrate, optimize, reload, `/up`; Core has a separate version endpoint. | verified | `rveta.com` `compose.yml` and `scripts/prod-bootstrap.sh`; `rumuzepmo` `deploy.sh`; `core` README | confirmed |
| CR-028 | Blog: Rveta Connector token and device states, rotation, local clear, actor and device credentials, 30-second foreground polling limited to ping and refresh_status. | verified | `connector-app` README (Connector Auth Mapping, Actor Auth Boundary, Command Channel Safety) | confirmed |
| CR-029 | How-we-work page: intake paths and recorded fields (contact form), modular-monolith default, boundary scans, fixed release order with per-service health checks, handover documents. No timelines, prices or response times. | verified | `conversionContent.js` intents, `services.ts` handover and differentiators, CR-026 and CR-027 sources | confirmed |
| CR-030 | Rumuze offers digital marketing: SEO, AEO and GEO; paid advertising management on major platforms such as Google and Meta; bilingual content and social media; tracking, CRM and reporting; and idea-to-digital-solution software work. The copy promises no rankings, cost per lead, return on spend, follower growth, or results, and names no clients. | owner-stated | Product owner confirmed the service list on 2026-10-04; the SEO, AEO and GEO practice is also visible on this site (prerender, structured data, llms.txt) | confirmed |
| CR-031 | Marketing articles: what this site itself does for AEO and GEO (static HTML for every public page in both languages, structured data generated from visible content, crawler rules in robots.txt, llms.txt), for Arabic SEO (own URL per language, hreflang in pages and sitemap, Arabic metadata, Arabic font preload), and for lead tracking (contact form records enquiry type, market, systems and source; visit tracking only after consent). General advice, no results claimed. | verified | `scripts/prerender.js`, `public/robots.txt`, `public/llms.txt`, `public/sitemap.xml`, `scripts/lib/publicRouteManifest.js`, `src/utils/consent.js`, `services.ts` intake description | confirmed |

Do not publish: internal architecture scores, "known risks" lists, environment details, or any client name or figure until it has been approved and evidenced.

## 7. Update 2026-09-29 (stage 2): SEO, GEO, AEO and content cleanup

### Removed or corrected

| Area | Change |
| --- | --- |
| Uptime and SLO claims | "99.9% uptime", "p95 latency under 300ms", "SLO dashboards" removed (SLO framework page and README). No monitored SLA exists. |
| Technology claims | Kubernetes, AWS, TensorFlow, PyTorch, Three.js and similar removed from the About page, FAQ schema, and person/entity data. Only Laravel, NestJS, Next.js, React, Flutter, PostgreSQL, MySQL, Redis, Docker, Nginx, and Firebase are listed. |
| Compliance claims | "GDPR and CCPA compliant", "military-grade encryption", and Standard Contractual Clauses removed. The privacy policy and terms were rewritten to describe what the site actually collects. Have counsel review them and add jurisdiction and governing law. |
| Founder data | "6+ years of experience", "Digital Marketing Strategist", "Cloud Infrastructure Specialist", and guessed LinkedIn/X/GitHub handles removed. Only the confirmed GitHub profile remains. |
| Company data | `legalName` ("Rumuze Technologies LLC") is no longer published: it has not been verified. `humans.txt` no longer claims Silicon Valley or Lagos. |
| Services | Performance marketing and social media management were retired (no evidence in Rumuze's products or repositories); mobile apps was added. Retired URLs redirect. |
| Pages retired | 17 keyword-cluster and "authority" pages (enterprise frameworks, SLO framework, knowledge graph, comparison pages, manifesto, and others) now redirect to the closest live page. |
| Labs | The fabricated R&D projects (quantum encryption, holographic UI, autonomous DAO, and others) were replaced by a Tools page listing the real QR generator. |
| Blog | Two off-brand posts were unpublished; the remaining post no longer states an unsupported "95%" figure. |
| Structured data | FAQPage markup now mirrors the visible homepage FAQ. Service FAQ no longer duplicates a master FAQ. |

### Still to confirm with the owner

| Item | Why |
| --- | --- |
| Email | Published in JSON-LD and footer from earlier configuration; unverified. |

### Confirmed by the owner (2026-09-29)

| Item | Value |
| --- | --- |
| Company founding year | 2026 |
| Phone / WhatsApp | +20 100 006 1409 |
| Rveta | A Rumuze product (owner statement) |
| Social accounts | LinkedIn company page, Facebook (rumuze), Instagram and TikTok (rumuze_flow), YouTube (@Rumuze), X (@Rumuzeflow), GitHub (rumuze) |
| CR-032 | Work page and Rveta product page show the Rveta logo, taken from the Rveta driver app repository (`assets/image/logo.png`). No screenshots with user data are published. | verified | `public/assets/work/rveta-logo.webp`, `src/data/products.js` | confirmed |
| CR-033 | Home page service wave: nine services shown as tiles (ERP, CRM, Odoo, your project, websites, SEO, mobile apps, ads, automation), each with one general sentence and a small request form (order, explain, consultation). Odoo: owner statement that Rumuze builds apps and solutions on Odoo. The other sentences describe the service in general terms with no result, price, time or client. A phone-only request is stored with an unreachable `.invalid` address and the phone number in the message. | owner statement (Odoo); the rest general | `src/content/serviceWaveContent.js`, `src/utils/serviceWaveRequest.js`, `src/components/home/ServiceWave.jsx` | confirmed |
| CR-034 | The contact and intake forms accept a phone number or an email. A phone-only request is stored under an address that can never receive mail and the number is written in the message; admin screens label such a thread "Phone only". | verified | `src/utils/inboxContact.js`, `src/utils/leadQualification.js` (`buildLeadThread`), tests in `src/utils/leadQualification.test.js` | confirmed |
| CR-035 | Services, service and process pages show decorative isometric illustrations (idea to product, layered software, mobile, web, ERP, ads, SEO, content, automation). They are drawings, not screenshots of any product or client, and carry no numbers, results or names. | not a claim (decorative) | `scripts/illustrations/generate.mjs`, `src/components/illustrations/` | confirmed |

## 8. Update 2026-10-07: free tools

The free tools (QR generator, WhatsApp link, UTM builder, Google result preview, Hijri converter, structured
data generator, project brief writer, VAT calculator, ad budget calculator, image compressor) carry these
claims. Each is scoped on the page itself.

| Claim | Type | Status | Scope on the page |
| --- | --- | --- | --- |
| "Runs in your browser. What you type is not sent anywhere." | verified | confirmed | Checked for every tool by `e2e/tools.spec.js` (no cross-origin request, no request with a body, nothing typed in an address). |
| Standard VAT rates: Saudi Arabia 15%, UAE 5%, Bahrain 10%, Oman 5%, Egypt 14%, Jordan 16% | verified (published tax summaries) | needs validation against each tax authority | Labelled as standard rates checked in October 2026; zero-rated and exempt goods excluded; "confirm with your tax authority". Re-check before each release that touches `src/tools/vat.js`. |
| Hijri dates use the Umm al-Qura calendar, 1901 to 2076 | verified | confirmed | Comes from the browser's own calendar; the page says a month can start a day earlier or later where the crescent is sighted. |
| Moon phase | internal calculation | confirmed | Labelled approximate: mean lunar cycle, up to about half a day from the real new and full moon. |
| Structured data checks | internal | confirmed | Labelled common guidance; the page says valid markup does not promise a rich result. |
| Ad budget results | illustrative | confirmed | Arithmetic on the visitor's own numbers; the page says nothing predicts a campaign and the example numbers are marked as examples. |
| Image compression savings | measured per file on the visitor's device | confirmed | Shown per file; the page says results depend on the picture and that details removed cannot be restored. |
| Email signature | internal | confirmed | Says mail programs differ: some block images and change fonts, so send yourself a test. |
| Palette from image | internal calculation | confirmed | Says colours are close to, not exactly, the colours in the file; contrast is for white and black text only. |
| Social share preview | illustrative | confirmed | Labelled approximate: each platform decides its own card, may change it, and may cache an old one. Image-size advice is worded as a common choice. |
| Word and character counter | internal | confirmed | Counts words by Unicode letters and numbers; reading and speaking times use stated words-per-minute averages and are labelled estimates. Platform limits (title, description, SMS, X, caption) are worded as commonly used limits that platforms may change. |
| Robots.txt and sitemap generator | internal | confirmed | Says robots.txt is a request to well-behaved crawlers, not access control or security, and that blocked pages can still appear in results if linked elsewhere. The path test follows the common longest-rule-wins matching and may differ from a given crawler. |
| Invoice generator | internal | confirmed | Arithmetic in whole minor units with per-line half-up VAT. The page says it is a printable invoice, not an e-invoice registered with ZATCA/Fatoora or any tax authority, and rates are the same standard rates as the VAT calculator. |
| JSON formatter and validator | internal | confirmed | Uses the browser's own JSON parser; the page says very large whole numbers may be rounded (it warns when it sees one), duplicate keys keep the last value, and the error place is where the text first stops being valid. |
| Favicon generator | internal | confirmed | Icons are drawn on a canvas from the visitor's own choices; the page says letters use the fonts on the device, to check at 16 pixels, and that browsers cache favicons for a long time. The file list (ico, 16/32, 180, 192/512, manifest) is a common set, not a promise for every platform. |
| CSS unit converter and fluid type | internal calculation | confirmed | Plain arithmetic on the visitor's numbers; the page says rem follows the root font size and to test zoom and large text on real devices. |

## 9. Update 2026-10-08: market study and claim clean-up

See `docs/market-research/` for the study, the decision and the plan. Claims changed in this update:

| ID | Claim | Type | Status | Note |
| --- | --- | --- | --- | --- |
| CR-040 | ~~"We ship and operate our own SaaS platforms" and "Products we have built and run."~~ Now: "We design and build our own SaaS platforms" and "Products we have designed and built." | removed 2026-10-08 | removed | Repositories show builds and deployment runbooks, not live users, uptime or operating history. The company founding year in this registry is 2026. Restore "operate" only with production evidence (uptime monitor, user counts the owner approves). |
| CR-041 | ~~"Works with clients in Saudi Arabia, the UAE and MENA."~~ Now: "builds for businesses in Saudi Arabia, the UAE and the wider MENA region." | removed 2026-10-08 | removed | No client in those markets is evidenced. The wording states the market served, not clients served. |
| CR-042 | RumuzePMO is described as a "modular business management platform covering operations, CRM and HR", not as an ERP. | verified | confirmed | The README lists finance and inventory modules, but the project has a known boot blocker in its HRM module and no e-invoicing integration. |
| CR-043 | The intake form asks for market and timeline (optional). | verified | confirmed | `src/components/conversion/lead-form/LeadFormStepTwo.jsx`. Used only to qualify and reply to the request. |
| CR-044 | Work page, "Earlier client work": two client landing pages (static HTML/CSS and single-page HTML), no client name, no date. | owner statement (2026-10-10) | confirmed | The owner said both repositories are client projects and chose to publish without names or dates. Repositories (`elbayoumi/shababalmadina`, `elbayoumi/privlorin-landingpage`) show only HTML/CSS pages; commits are from November 2023, before the 2026 founding year recorded here, so the section says "earlier" and does not call them Rumuze products. No consent document is on file. Do not add names, results or dates without evidence. |
