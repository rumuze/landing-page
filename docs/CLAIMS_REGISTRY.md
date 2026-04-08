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
