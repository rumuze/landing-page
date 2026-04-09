# Rumuze Proof Layer and Case Study System

Date: 2026-04-09  
Owner: Proof Strategy, Conversion, Product Marketing  
Status: Sprint 4 working document

## 1. Objective

Sprint 4 turns Rumuze from a company with positioning and conversion structure into a company with a usable proof system.

The goal is not to sound established before the evidence exists.

The goal is to make every proof statement:

- legible to a serious B2B buyer
- commercially relevant
- technically specific
- clearly classified
- defensible if challenged in a sales call

This document defines:

1. the Rumuze proof framework
2. the first publishable case study
3. homepage-ready proof blocks
4. weak-claim replacements
5. proof placement strategy

This document should be used together with [`docs/CLAIMS_REGISTRY.md`](./CLAIMS_REGISTRY.md).

---

## 2. Proof Framework

## 2.1 Proof Principles

Every proof item must do five jobs:

1. show what kind of system was involved
2. explain the business problem clearly
3. show what Rumuze actually built or changed
4. state the outcome without hype
5. disclose the proof classification honestly

If a proof item cannot survive those five checks, it should not be published.

## 2.2 Proof Item Fields

Every Rumuze proof item must include:

- `title`
- `context`
- `problem`
- `what_was_built`
- `outcome`
- `proof_type`
- `confidence_level`
- `evidence_source`
- `claim_registry_reference`

## 2.3 Proof Types

### `verified`

Use when the item is backed by one or more of the following:

- signed client approval
- production analytics export
- CRM export
- contract deliverable
- telemetry or monitoring evidence
- client-approved written testimonial

### `internal benchmark`

Use when the system and observed result are real, but the evidence is internal rather than client-approved.

Examples:

- internal commercial systems
- internal performance comparison before and after implementation
- controlled operational measurements
- internal workflow or delivery benchmarks

### `illustrative`

Use when the item explains a plausible architecture or delivery pattern but should not be read as a confirmed client result.

This type is allowed only when it is clearly labeled in the UI and never framed as live proof.

## 2.4 Confidence Levels

Use a plain-language confidence scale:

- `High`
  - Evidence exists and could be shown privately if required.
  - Recommended range: 0.85 to 1.00
- `Medium`
  - Evidence is real but partial, internal, or not yet client-approved for public publication.
  - Recommended range: 0.60 to 0.84
- `Low`
  - Scenario is useful for explanation but not yet evidence-backed enough for trust-critical surfaces.
  - Recommended range: 0.35 to 0.59

For public-facing website copy, show the label in words, not as a numeric score.

## 2.5 Reusable Proof Item Template

Use this template for every future proof item:

```md
### Proof Item: [Title]

- Proof ID: PROOF-[###]
- Claim Registry Reference: CR-[###] or pending
- Proof Type: verified | internal benchmark | illustrative
- Confidence Level: High | Medium | Low
- Context: [company type, geography, system type, delivery situation]
- Problem: [what was commercially or operationally broken]
- What Was Built: [specific system, workflow, architecture, reporting layer, or process]
- Outcome: [measurable or observable result with scope]
- Evidence Source: [analytics export, internal logs, signed deliverable, CRM thread history, monitoring, client confirmation]
- Publication Rule: [homepage-safe, case-study-only, or internal-only]
```

## 2.6 Proof Writing Rules

Use these rules in every proof artifact:

1. Prefer operational outcomes over vanity outcomes.
2. Prefer observed changes over broad promises.
3. If the result is not numeric, make it observable.
4. Never imply a client name when no client name is approved.
5. Never publish an internal benchmark as if it were client-verified proof.
6. Every homepage proof block must trace back to a proof item or claims registry entry.

---

## 3. First Case Study

## 3.1 Case Study Summary

This case study should be published first because it is real, inspectable, and aligned with the current Rumuze offer system.

It is not a substitute for future client case studies.

It is a credible first proof asset that demonstrates how Rumuze thinks, scopes, and implements commercial systems.

## 3.2 Case Study Title

### Internal Commercial Intake and Lead Qualification System for a B2B Revenue Workflow

## 3.3 Client Context

- Client context: internal Rumuze commercial system
- Company type: bilingual B2B systems company serving GCC and wider MENA buyers
- System type: homepage conversion path, structured intake, submission handling, and inquiry routing
- Disclosure: this is an internal benchmark, not a client-result case study

Recommended public label:

`Internal benchmark: Rumuze commercial intake system`

## 3.4 Problem Breakdown

Before the new conversion system, a high-intent buyer could still enter the business through a generic contact path.

That created four commercial problems:

1. request quality was inconsistent because not every inquiry contained role, market, system stack, timeline, or problem definition
2. the first response depended too heavily on manual interpretation rather than structured intent routing
3. audit, build, and infrastructure requests were not separated early enough in the buying flow
4. conversion data was harder to compare because inquiry context was not normalized at the moment of submission

This is a common early-stage trust problem in high-ticket service sales:

the company may be capable, but the intake layer does not yet reflect that capability.

## 3.5 System Design

Rumuze designed the intake flow as a commercial decision system rather than a generic contact form.

The system includes:

- a conversion-focused homepage with explicit offer routing
- structured intent paths for `System Build`, `System Audit`, and `Growth Infrastructure Setup`
- a bilingual lead qualification form
- normalized fields for company, role, website, company size, market, engagement type, timeline, current systems, and commercial bottleneck
- source capture for where the request originated in the site flow
- thread creation logic that converts the submission into a structured internal message thread
- consistent subject/message generation for later review and follow-up

## 3.6 Implementation Steps

### 1. Offer and intent architecture

Rumuze defined three commercial entry points so the buyer is choosing a structured next step rather than asking for unspecified help.

### 2. Qualification form design

The intake form was built to collect the minimum information required to evaluate fit, urgency, and systems complexity without making the process feel like procurement.

### 3. Submission normalization

The form output is normalized before submission so key fields are consistently structured for internal review.

### 4. Internal routing model

Each submission is turned into a thread-based record with a generated subject, a formatted message body, and preserved source context.

### 5. Bilingual support

The system supports Arabic and English commercial paths so regional demand capture is not treated as an afterthought.

## 3.7 Outcome

This case study should not claim close-rate uplift or revenue lift because that evidence is not yet available.

The defensible outcomes are operational:

- Rumuze replaced generic inquiry capture with a structured qualification workflow
- each request now arrives with commercial context, technical context, and declared engagement intent
- internal review can distinguish audit, build, and infrastructure requests without reinterpreting the buyer from scratch
- the system preserves source context, which improves later analysis of which page or CTA generated the request
- the intake experience now matches the company’s high-ticket positioning more closely than a standard contact form

Recommended public outcome wording:

`Observable outcome: inquiry quality and internal review readiness improved because submissions now arrive with explicit engagement intent, business context, and system detail.`

Recommended internal-only outcome wording:

`Internal benchmark: the intake layer now produces normalized, review-ready submissions instead of generic contact messages, reducing ambiguity in first-response handling.`

## 3.8 Lessons Learned

1. trust starts before the call, not after it
2. proof is not only testimonials and logos; it is also the quality of the system a buyer experiences
3. high-ticket buyers respond better to defined operating decisions than vague “let’s talk” language
4. a proof system should begin with what the company can show directly, not with what it hopes to claim later
5. internal benchmark case studies are useful when they are clearly labeled and technically specific

## 3.9 Proof Classification

- Proof Type: `internal benchmark`
- Confidence Level: `Medium`
- Why this classification is correct:
  - the system exists in production code
  - the workflow can be reviewed directly
  - the commercial structure is real
  - revenue or conversion-lift claims are not yet validated

## 3.10 Publication Recommendation

- Homepage summary: allowed with explicit `internal benchmark` labeling
- Case studies page: allowed as the first published case study
- Sales deck: allowed if framed as “how Rumuze structures its own commercial system”
- Hero section: not recommended

## 3.11 Case Study Draft

### Internal Commercial Intake and Lead Qualification System for a B2B Revenue Workflow

Rumuze rebuilt its own inquiry handling around a structured commercial intake model after identifying a mismatch between offer positioning and how requests entered the business.

The original problem was not lead volume. It was request quality. Generic contact capture left too much interpretation to the first review step, making it harder to distinguish between audit-led opportunities, full system builds, and infrastructure setup requests.

The new system was designed as a commercial operating workflow. Instead of asking a buyer to “get in touch,” the site now routes them into defined engagement paths, captures role and market context, records current systems and bottlenecks, and packages the request into a structured thread for internal follow-up.

Implementation focused on five areas: offer architecture, qualification form design, submission normalization, thread-based routing, and bilingual execution. The result is not a marketing claim about improved conversions. It is a more credible operating layer for handling serious B2B requests.

The observable result is stronger review readiness. Requests now arrive with declared intent, business context, and system detail, which makes the first response more informed and reduces ambiguity in internal handling. This case study should be published as an internal benchmark, not as client-verified outcome proof.

---

## 4. Homepage Proof Blocks

These blocks are written for direct use on the homepage.

Each one is intentionally short, commercially relevant, and label-ready.

## 4.1 Case Study Card

### Version A

- Label: `Internal benchmark`
- Title: `Structured intake replaced generic inquiry capture`
- Summary: `Rumuze rebuilt its own commercial intake layer so audit, build, and infrastructure requests arrive with declared intent, business context, and system detail.`
- Outcome: `Review-ready submissions instead of generic contact messages`
- Footer line: `Internal Rumuze system`

### Version B

- Label: `Illustrative`
- Title: `Bilingual lead qualification for GCC market entry`
- Summary: `Example of how Rumuze structures Arabic-English qualification, routing, and review logic for regional B2B demand capture.`
- Outcome: `Clearer handoff between demand capture and internal review`
- Footer line: `Illustrative system pattern`

Use Version A first. Use Version B only when you need a second card before more live proof exists.

## 4.2 System Proof Card

- Label: `System proof`
- Title: `What was built`
- Body: `A bilingual qualification form, intent-based engagement routing, normalized submission structure, and thread creation logic for internal review.`
- Enablement line: `Enables faster triage, clearer fit assessment, and consistent follow-up context.`

Alternative shorter homepage version:

`Built: structured intake, source capture, and thread-based routing. Enables consistent qualification before sales follow-up starts.`

## 4.3 Commercial Proof Card

- Label: `Commercial proof`
- Title: `What it changed`
- Body: `The commercial team no longer starts from an unstructured message. Each request arrives with role, company context, system stack, market, and declared buying intent.`
- Enablement line: `Improves pipeline clarity before any diagnostic call takes place.`

## 4.4 Recommended Homepage Proof Trio

If the homepage needs three proof blocks now, use this set:

### Proof Block 1

- Type: Case study card
- Label: `Internal benchmark`
- Title: `Structured intake replaced generic inquiry capture`
- Copy: `Rumuze rebuilt its own commercial intake layer so serious requests arrive with intent, system context, and review-ready detail.`

### Proof Block 2

- Type: System proof card
- Label: `System proof`
- Title: `Built around qualification and routing`
- Copy: `The system includes engagement-path logic, bilingual intake, source capture, and normalized submission handling.`

### Proof Block 3

- Type: Commercial proof card
- Label: `Commercial proof`
- Title: `Improves pipeline clarity before the call`
- Copy: `Requests can be reviewed as audit, build, or infrastructure opportunities instead of being reinterpreted from a generic message.`

---

## 5. Weak Claim Replacements

Weak claims should not be removed only because they sound generic.

They should be replaced because they hide the mechanism, the scope, and the evidence standard.

## 5.1 Claim Rewrites

### Weak

`We improve conversions.`

### Stronger

`Rumuze improves the system behind conversion by fixing qualification, routing, tracking, and reporting logic rather than changing page copy alone.`

### Stronger with proof framing

`Rumuze is building proof around how structured qualification and routing improve commercial readiness before a sales call begins.`

---

### Weak

`We build scalable systems.`

### Stronger

`Rumuze builds web platforms, SaaS workflows, CRM-connected routing, and reporting infrastructure that can support higher demand volume without relying on spreadsheet workarounds.`

---

### Weak

`We help businesses grow.`

### Stronger

`Rumuze helps B2B teams remove revenue friction caused by disconnected websites, CRM workflows, and tracking systems.`

---

### Weak

`We build revenue infrastructure.`

### Stronger

`Rumuze implements the measurement and routing layer that connects demand capture, CRM records, lifecycle stages, and executive reporting.`

---

### Weak

`We create better sales pipelines.`

### Stronger

`Rumuze improves pipeline clarity by structuring how inquiries are captured, classified, routed, and reported before they become pipeline noise.`

---

### Weak

`We build systems that scale with your business.`

### Stronger

`Rumuze builds systems that reduce manual handoffs as volume increases by making qualification, routing, and reporting part of the product design rather than an afterthought.`

## 5.2 Approved Claim Style

Use claims that follow this pattern:

`Rumuze [builds/fixes/implements] [specific system] so that [specific operational or commercial effect].`

Examples:

- `Rumuze implements CRM-connected lead routing so qualified demand is not trapped in manual follow-up.`
- `Rumuze builds bilingual commercial systems so Arabic-English market execution does not depend on translation-layer patchwork.`
- `Rumuze structures intake and reporting so leadership can review demand quality with more confidence.`

---

## 6. Proof Placement Strategy

## 6.1 Homepage Placement

Proof on the homepage should appear in three layers.

### Layer 1: Early proof preview

Placement:

- after the problem section
- before or inside the main proof section

Purpose:

- show that Rumuze is not asking for trust without structure
- introduce one internal benchmark and two short proof cards

Best content:

- one internal benchmark case-study card
- one system proof card
- one commercial proof card

### Layer 2: Offer-linked proof

Placement:

- beneath each offer or inside each offer card expansion state on deeper pages

Purpose:

- show the buyer what kind of evidence supports each offer

Mapping:

- `System Build` -> system proof + architecture outcome
- `System Audit` -> diagnostic proof + findings structure
- `Growth Infrastructure Setup` -> tracking and reporting proof

### Layer 3: Final CTA trust reinforcement

Placement:

- above the final CTA or immediately adjacent to it

Purpose:

- reduce the feeling that the CTA is unsupported

Best content:

- short line such as:
  - `Every proof item is labeled as verified, internal benchmark, or illustrative.`
  - `No fabricated client logos. No unlabeled performance claims.`

## 6.2 Case Study Page Placement

Deeper case studies should live in:

- `/case-studies`
- filtered case study references inside service detail pages
- offer-aligned supporting proof sections

Each case study page should include:

1. proof classification
2. confidence label
3. client context disclosure
4. system diagram or implementation summary
5. outcome section
6. lessons learned
7. related offer CTA

## 6.3 Proof-to-Offer Connection

Proof should not be isolated from the offer architecture.

Each offer needs its own evidence logic:

### System Build

Buyer concern:

- `Can this team build the right system and govern delivery?`

Best proof:

- architecture proof
- workflow proof
- launch-readiness proof

### System Audit

Buyer concern:

- `Can this team diagnose what is actually broken, not just sell implementation?`

Best proof:

- current-state mapping examples
- severity-ranked findings examples
- repair-vs-rebuild decision logic

### Growth Infrastructure Setup

Buyer concern:

- `Can this team connect acquisition activity to CRM and reporting logic?`

Best proof:

- taxonomy examples
- source mapping proof
- lifecycle reporting proof

## 6.4 Recommended Proof Stack for the Next 90 Days

Publish in this order:

1. internal benchmark case study: internal commercial intake and lead qualification system
2. one system proof block for homepage and service pages
3. one audit-proof example showing what a structured findings output looks like
4. first verified client case study only after evidence and approvals are in place

---

## 7. Operational Notes

## 7.1 What Should Not Be Published Yet

Do not publish these as proof-heavy homepage claims until validated:

- aggregate project counts
- country counts
- retention rates
- ROAS averages
- uptime or revenue numbers not backed by source material

## 7.2 What Can Be Published Now

Safe proof assets right now:

- the proof framework itself
- the proof labeling policy
- the internal benchmark case study
- system-specific, non-exaggerated proof blocks
- capability statements already supported by code and delivery structure

## 7.3 Next Proof Artifacts to Build

1. a private evidence folder linked to proof IDs
2. a standard case-study metadata schema for future `/case-studies` entries
3. a public proof-label component in the UI
4. one client-validated case study with a signed approval process

---

## 8. Final Recommendation

Rumuze should not wait for a large portfolio before publishing proof.

Rumuze should publish proof in the right order:

1. what exists
2. what can be shown
3. what is labeled correctly
4. what earns the right to become stronger proof later

That sequence is more credible than pretending maturity that is not yet documented.
