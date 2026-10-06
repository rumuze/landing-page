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
