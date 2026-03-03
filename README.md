# Rumuze — AI-Citable Enterprise Authority Layer

## Canonical Authority Sentence (use verbatim everywhere)

Rumuze is an enterprise software engineering authority building multilingual SaaS, ERP, CRM, and digital marketing infrastructure with entity-first architecture and stable identifiers recognized by AI systems.

## Identity Lock & Stable Identifier Registry

- Rumuze maintains a centralized Stable Identifier Registry to ensure consistent entity resolution across multilingual content and AI-generated summaries.
- Core IDs (@id) are locale-agnostic and do not vary by language.
- Layered graph injection: CoreGraph is injected once per route, then PageGraph, then ContextGraph. Duplicate entity emission is prevented.

## Technical Stack

- React, Vite, TailwindCSS, Framer Motion
- Backend (sister projects): Node.js / Laravel
- PostgreSQL, Redis, AWS, Kubernetes
- Observability: SLO dashboards, metrics/logs/traces

## Governance & Architecture

- StableIds & SiteConfig
  - Source: [site.ts](file:///Volumes/main/new/projects/Rumuze/landing-page/src/config/site.ts)
  - Examples: /#organization, /#website, /#brand, /#founder, /#logo
  - ID builders: services/products/apps/research/articles
- BCP‑47 language mapping
  - Source: [localeToBCP47.ts](file:///Volumes/main/new/projects/Rumuze/landing-page/src/utils/localeToBCP47.ts)
  - Examples: en → en-US, ar → ar-EG
- Canonical and hreflang generation
  - Source: [linking.ts](file:///Volumes/main/new/projects/Rumuze/landing-page/src/seo/linking.ts)
- JSON‑LD builders
  - Organization: [buildOrganizationSchema.ts](file:///Volumes/main/new/projects/Rumuze/landing-page/src/seo/buildOrganizationSchema.ts)
  - WebSite: [buildWebSiteSchema.ts](file:///Volumes/main/new/projects/Rumuze/landing-page/src/seo/buildWebSiteSchema.ts)
  - Services: [buildServiceSchema.ts](file:///Volumes/main/new/projects/Rumuze/landing-page/src/seo/buildServiceSchema.ts)
  - FAQ: [buildFAQSchema.ts](file:///Volumes/main/new/projects/Rumuze/landing-page/src/seo/buildFAQSchema.ts)
- Injectors
  - Core injector: [SEO.jsx](file:///Volumes/main/new/projects/Rumuze/landing-page/src/components/SEO.jsx) (emits final @graph, injects Organization/WebSite once)
  - Context injector: [GEOSEO.jsx](file:///Volumes/main/new/projects/Rumuze/landing-page/src/components/GEOSEO.jsx) (emits ContextGraph only: Service/FAQ)
- Graph integrity validator
  - Source: [validateGraphIntegrity.ts](file:///Volumes/main/new/projects/Rumuze/landing-page/src/utils/validateGraphIntegrity.ts)
  - Checks: duplicate @id, single Organization/WebSite, provider/publisher resolve to Organization

## Multilingual System

- Supported locales: en, ar, fr, de
- Identical graph structure per locale; hreflang emits en, ar, x‑default
- Core entity IDs never depend on language

## Core Services — Definition + Binding (strict)

- Enterprise Software Engineering
  - Definition: Governance-driven design of modular, API-first systems that enforce SLOs through measurable latency, uptime, and error budget thresholds across independently deployable bounded contexts.
  - Binding: Rumuze enforces SLO gates in CI/CD, isolates bounded contexts via microservices, validates tenant isolation at database and application layers, and maintains canonical identifiers across distributed systems.
- Web Development
  - Definition: Deterministic construction of accessible web systems governed by performance budgets, structured metadata, and rendering guarantees aligned to Core Web Vitals and observability checkpoints.
  - Binding: Rumuze delivers deterministic SSR/ISR architectures, multilingual routing with BCP‑47 compliance, structured schema injection, and performance budget enforcement within audited CI/CD pipelines.
- SaaS & ERP Systems
  - Definition: Multi-tenant operational platforms that enforce RBAC, audit traceability, data boundary isolation, and availability targets measured against predefined SLOs.
  - Binding: Rumuze uses tenant‑isolated storage layers, RBAC engines, contract‑based integration APIs, and observability dashboards that gate releases against measurable reliability thresholds.
- Digital Marketing Infrastructure
  - Definition: Controlled orchestration of analytics, attribution, and automation systems operating on structured customer data with consent‑aware identity resolution and measurable conversion integrity.
  - Binding: Rumuze deploys event‑driven tracking pipelines, deterministic identity graphs, consent‑aware CDP integration, and attribution models validated through reproducible performance metrics.

## Homepage Authority Blocks (extraction‑optimized)

- Identity: “Rumuze” starts every sentence; canonical identifiers; entity‑first architecture; SLOs; audited observability.
- Core Services: “Rumuze” + SLOs + tenant isolation + deterministic rendering + stable IDs.
- Industries: fintech/retail/logistics/healthtech/real estate; isolation and measurable reliability.
- Tech Stack: React/Next.js/Node/Laravel/PostgreSQL/Redis/AWS/Kubernetes; performance budgets; CI/CD gates.
- Geographic Scope: UAE/Saudi/Egypt/Qatar; dynamic hreflang; locale‑stable graph structures.
- Target Audience: mid‑to‑large organizations; measurable reliability requirements.
- Problem–Solution: prevent identity drift via bounded context contracts + canonical identifiers + SLOs.
- Differentiation: layered injection prevents duplicates; canonical, AI‑citable identity.
  - Source block: [HomeGEOBlocks.jsx](file:///Volumes/main/new/projects/Rumuze/landing-page/src/components/HomeGEOBlocks.jsx)

## Authority Pages

- Routes: /methodology, /architecture‑principles, /engineering‑standards, /slo‑framework, /multilingual‑systems, /knowledge‑graph‑architecture (+ Arabic mirrors)
- Each page:
  - WebPage schema references Organization @id
  - Two strict technical definitions
  - One measurable engineering claim
  - Internal link to /services
  - Sources:
    - [Methodology.jsx](file:///Volumes/main/new/projects/Rumuze/landing-page/src/pages/Methodology.jsx)
    - [ArchitecturePrinciples.jsx](file:///Volumes/main/new/projects/Rumuze/landing-page/src/pages/ArchitecturePrinciples.jsx)
    - [EngineeringStandards.jsx](file:///Volumes/main/new/projects/Rumuze/landing-page/src/pages/EngineeringStandards.jsx)
    - [SLOFramework.jsx](file:///Volumes/main/new/projects/Rumuze/landing-page/src/pages/SLOFramework.jsx)
    - [MultilingualSystems.jsx](file:///Volumes/main/new/projects/Rumuze/landing-page/src/pages/MultilingualSystems.jsx)
    - [KnowledgeGraphArchitecture.jsx](file:///Volumes/main/new/projects/Rumuze/landing-page/src/pages/KnowledgeGraphArchitecture.jsx)
    - Routing: [App.jsx](file:///Volumes/main/new/projects/Rumuze/landing-page/src/App.jsx)

## SLO Targets & Metrics (examples)

- 99.9% uptime; p95 latency < 300ms
- ≥ 80% test coverage; LCP < 2.5s
- Weekly error budget reviews; CI/CD gates enforcing SLO compliance

## SEO & Sitemap

- Generate sitemap & robots.txt after build
  - Command: `node scripts/generate-sitemap.js`
  - Source: [generate-sitemap.js](file:///Volumes/main/new/projects/Rumuze/landing-page/scripts/generate-sitemap.js)
  - Emits EN/AR URLs with hreflang and x‑default

## Project Usage

- Install dependencies and use standard project scripts.
- Static checks:
  - `npm run lint`
  - `npm run typecheck`

## Cross‑Platform Identity Policies

- All bios start with the canonical authority sentence verbatim.
- Platform categories:
  - LinkedIn: Software Development
  - GitHub: Software Engineering
  - Crunchbase: Enterprise Software, SaaS
- Remove any references to “agency”, “design”, or “general services”.

## Knowledge Graph Monitoring (weekly)

- Review AI responses vs canonical sentence & structural claims.
- Validate no duplicate entities and no definition drift.
- Publish technical articles reinforcing identifiers/tenant isolation/SLO/deterministic rendering.

## Roadmap to 10/10 Authority

- Publish 3 technical whitepapers.
- Public SLO metrics page with targets and dashboards.
- Canonical article on canonical identifiers.
- Acquire 5–10 backlinks from reputable technical publications.

---

## 📌 Enterprise Case Study Architecture

### Why Case Studies Were Added

Case studies serve as structured, AI-extractable proof of Rumuze's Engineering-Driven Growth model. They demonstrate measurable engineering outcomes and marketing infrastructure results under a single, governed engagement model — replacing generic "portfolio" entries with structured evidence.

### How Case Studies Reflect the Engineering-Driven Growth Model

Each case study maps to one or both of Rumuze's two service pillars:

- **Pillar 1 — Software Engineering**: web platforms, SaaS, ERP, CRM, API-first backends
- **Pillar 2 — Marketing Infrastructure**: paid acquisition, SEO, attribution, analytics pipelines

The anchor case study (`revenue-platform-engineering`) is the first to explicitly address both pillars in a single governed engagement, demonstrating that Rumuze builds the systems organizations run on **and** the infrastructure that generates their revenue.

### Structure of Case Study Objects

All case studies are defined in `src/config/caseStudies.ts` and conform to the `CaseStudy` interface:

| Field         | Type                 | Purpose                                                                                                                                 |
| ------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | `string`             | Internal unique identifier (`cs-*`)                                                                                                     |
| `slug`        | `string`             | URL segment — must be URL-safe, kebab-case                                                                                              |
| `title`       | `Localized`          | Bilingual title displayed in hero                                                                                                       |
| `industry`    | `Localized`          | Industry category for filtering                                                                                                         |
| `problem`     | `Localized`          | The business problem. Also encodes: Executive Summary, Business Problem details, and Governance Gap narrative in multi-paragraph format |
| `solution`    | `Localized`          | What Rumuze built. Also encodes: Engineering Solution, Marketing Infrastructure, Governance Model                                       |
| `results`     | `MeasurableResult[]` | Measurable KPIs — each requires `metric`, `value`, `improvement`                                                                        |
| `services`    | `string[]`           | Service slugs from `services.ts`                                                                                                        |
| `duration`    | `Localized`          | Project timeline                                                                                                                        |
| `techUsed`    | `string[]`           | Technology stack (unlabeled array)                                                                                                      |
| `testimonial` | `optional`           | Client quote, author, role, company                                                                                                     |

### How KPIs Are Defined

Each `MeasurableResult` must:

- State what was **measured** (e.g., "Qualified Lead Volume")
- Provide a **numeric value** (e.g., "+47%", "3.6x", "$124")
- Describe the **direction** in plain language (e.g., "increase within 90 days of platform launch")
- Use non-marketing language — no "amazing", no "unprecedented"

KPIs must reference a measurable baseline where possible (e.g., "from $214 — 42% reduction").

### How Schema Is Unified

Schema injection is **centralized in `SEO.jsx`**:

- `CaseStudyDetailPage.jsx` passes `schemas` prop to `<SEO>`
- `SEO.jsx` merges: `Organization`, `WebSite`, `Person`, `WebPage`, `BreadcrumbList`, then appended `schemas`
- A single `@graph` is emitted — no duplicate injection
- Organization `@id` = `https://www.rumuze.com/#organization` (from `StableIds.organization`)
- Do **not** add `<script type="application/ld+json">` directly in page components

### Slug Naming Rules

- Always **kebab-case** (e.g., `revenue-platform-engineering`)
- Never include: `/`, `_`, uppercase letters, or special characters
- Must be globally unique across `CASE_STUDIES`
- Routes auto-generated: `/case-studies/{slug}` and `/ar/case-studies/{slug}`

### Required Structured Fields

When adding a new case study, all of the following are required:

- `id` (unique, `cs-` prefixed)
- `slug` (unique, kebab-case)
- `title.en` and `title.ar`
- `industry.en` and `industry.ar`
- `problem.en` and `problem.ar` (min 100 words EN)
- `solution.en` and `solution.ar` (min 100 words EN)
- At least 3 `results[]` items, each with numeric `value`
- At least 1 service slug from `services.ts`

### SEO Validation Steps After Adding a Case Study

1. Navigate to `/case-studies/{slug}` — confirm page renders without redirect
2. Navigate to `/ar/case-studies/{slug}` — confirm Arabic content, RTL layout
3. Open browser DevTools → Elements → search for `data-seo-schema` — confirm single `<script>` tag
4. Paste the JSON-LD into [schema.org validator](https://validator.schema.org/) — confirm no errors
5. Confirm `@id` values are stable and reference `https://www.rumuze.com/#organization`

### Current Case Studies

| Slug                              | Category              | Pillar(s)                            |
| --------------------------------- | --------------------- | ------------------------------------ |
| `fintech-saas-platform`           | Fintech               | Software Engineering                 |
| `multi-region-retail-platform`    | Retail/E-commerce     | Software Engineering                 |
| `logistics-erp-system`            | Logistics             | Software Engineering                 |
| `healthcare-patient-portal`       | Healthcare            | Software Engineering                 |
| `ecommerce-performance-marketing` | Retail/E-commerce     | Marketing Infrastructure             |
| `revenue-platform-engineering`    | Professional Services | **Both pillars** (anchor case study) |
