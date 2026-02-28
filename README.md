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
