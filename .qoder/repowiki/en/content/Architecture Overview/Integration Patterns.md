# Integration Patterns

<cite>
**Referenced Files in This Document**
- [src/main.jsx](file://src/main.jsx)
- [src/App.jsx](file://src/App.jsx)
- [src/components/SEO.jsx](file://src/components/SEO.jsx)
- [src/hooks/useMetadata.js](file://src/hooks/useMetadata.js)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js)
- [src/components/Contact.jsx](file://src/components/Contact.jsx)
- [src/components/ErrorBoundary.jsx](file://src/components/ErrorBoundary.jsx)
- [src/pages/OfflineFallback.jsx](file://src/pages/OfflineFallback.jsx)
- [functions/_middleware.js](file://functions/_middleware.js)
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js)
- [functions/config/metadata.config.js](file://functions/config/metadata.config.js)
- [functions/api/contact.js](file://functions/api/contact.js)
- [src/sw.js](file://src/sw.js)
- [dist/sw.js](file://dist/sw.js)
- [vite.config.js](file://vite.config.js)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)
10. [Appendices](#appendices)

## Introduction
This document describes the integration patterns of a hybrid system that combines:
- Frontend React components with Cloudflare Workers middleware for SEO optimization and metadata injection
- A Progressive Web App (PWA) with a service worker and client-side components, including cache strategies, offline functionality, background sync, and periodic updates
- A metadata hook system for dynamic meta tag updates
- Cross-origin resource sharing, caching headers, and progressive enhancement principles

It explains data flow patterns, error handling strategies across the full stack, and performance optimizations.

## Project Structure
The project follows a modern hybrid architecture:
- Client-side React application built with Vite and PWA enabled
- Cloudflare Workers middleware for SEO and security headers
- Static assets and snapshots served via Cloudflare Pages
- Service worker implementing Workbox strategies for caching and offline behavior

```mermaid
graph TB
subgraph "Browser"
A["React App<br/>src/main.jsx → src/App.jsx"]
B["Components<br/>SEO, Contact, ErrorBoundary, OfflineFallback"]
C["Service Worker<br/>src/sw.js"]
end
subgraph "Cloudflare Workers"
D["_middleware.js<br/>SEO + Security Headers"]
E["MetadataService.js<br/>Route + Locale Resolution"]
F["metadata.config.js<br/>Static Metadata Config"]
end
subgraph "Cloudflare Pages"
G["Static Assets<br/>dist/ + public/"]
H["Pre-rendered Snapshots<br/>/snapshots/*.html"]
end
subgraph "External APIs"
I["Telegram Bot API<br/>/api/contact"]
end
A --> B
B --> C
A --> D
D --> E
E --> F
D --> H
B --> I
C --> G
```

**Diagram sources**
- [src/main.jsx](file://src/main.jsx#L1-L12)
- [src/App.jsx](file://src/App.jsx#L1-L348)
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L1-L278)
- [src/components/Contact.jsx](file://src/components/Contact.jsx#L1-L359)
- [src/components/ErrorBoundary.jsx](file://src/components/ErrorBoundary.jsx#L1-L57)
- [src/pages/OfflineFallback.jsx](file://src/pages/OfflineFallback.jsx#L1-L57)
- [src/sw.js](file://src/sw.js#L1-L227)
- [functions/_middleware.js](file://functions/_middleware.js#L1-L383)
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js#L1-L380)
- [functions/config/metadata.config.js](file://functions/config/metadata.config.js#L1-L369)
- [functions/api/contact.js](file://functions/api/contact.js#L1-L62)

**Section sources**
- [src/main.jsx](file://src/main.jsx#L1-L12)
- [src/App.jsx](file://src/App.jsx#L1-L348)
- [vite.config.js](file://vite.config.js#L1-L262)

## Core Components
- React application bootstrap and routing with SEO and PWA integration
- Cloudflare Workers middleware for crawler detection, snapshot serving, metadata injection, and security headers
- Metadata service and configuration for route and locale-aware metadata
- Service worker with Workbox strategies for caching, offline fallback, background sync, and periodic updates
- Contact form submission pipeline with background sync for offline resiliency
- Error boundary and offline fallback UI for graceful degradation

**Section sources**
- [src/App.jsx](file://src/App.jsx#L74-L309)
- [functions/_middleware.js](file://functions/_middleware.js#L68-L264)
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js#L44-L347)
- [functions/config/metadata.config.js](file://functions/config/metadata.config.js#L11-L369)
- [src/sw.js](file://src/sw.js#L14-L227)
- [src/components/Contact.jsx](file://src/components/Contact.jsx#L44-L82)
- [src/components/ErrorBoundary.jsx](file://src/components/ErrorBoundary.jsx#L4-L54)
- [src/pages/OfflineFallback.jsx](file://src/pages/OfflineFallback.jsx#L5-L52)

## Architecture Overview
The hybrid architecture integrates three layers:
- Client-side rendering with React and PWA capabilities
- Cloudflare Workers middleware for SEO and security
- Static assets and snapshots for pre-rendered content

```mermaid
sequenceDiagram
participant U as "User Agent"
participant MW as "_middleware.js"
participant MS as "MetadataService.js"
participant CFG as "metadata.config.js"
participant SNAP as "Snapshots (Cloudflare Pages)"
participant SW as "Service Worker (src/sw.js)"
U->>MW : HTTP Request
MW->>MS : getMetadata(path, locale)
MS->>CFG : Resolve route + locale metadata
CFG-->>MS : Metadata DTO
MS-->>MW : Metadata object
MW->>MW : Detect crawler + snapshot route
alt Snapshot exists
MW->>SNAP : Fetch /snapshots/{path}.html
SNAP-->>MW : HTML body
MW-->>U : 200 OK with injected meta + CSP
else HTML response
MW-->>U : HTML body with injected meta + CSP
end
Note over U,SW : SPA navigation and PWA caching
U->>SW : App shell + assets
SW-->>U : Cached + offline fallback
```

**Diagram sources**
- [functions/_middleware.js](file://functions/_middleware.js#L68-L264)
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js#L70-L88)
- [functions/config/metadata.config.js](file://functions/config/metadata.config.js#L119-L209)
- [src/sw.js](file://src/sw.js#L26-L45)

## Detailed Component Analysis

### SEO Integration Between Client and Workers
- Client-side SEO component renders meta tags and JSON-LD via React Helmet and a centralized metadata configuration.
- Workers middleware injects meta tags and security headers into HTML responses, ensuring crawlers receive complete metadata and that responses are secure.

```mermaid
sequenceDiagram
participant R as "React App"
participant SEO as "SEO.jsx"
participant MC as "MetaConfig.js"
participant MW as "_middleware.js"
participant MS as "MetadataService.js"
R->>SEO : Render page
SEO->>MC : getMetaForRoute(path, lang, search)
MC-->>SEO : Metadata DTO
SEO-->>R : Helmet meta tags + JSON-LD
Note over MW,MS : On server-side requests
MW->>MS : getMetadata(path, locale)
MS-->>MW : Metadata DTO
MW-->>R : Injected meta tags + CSP headers
```

**Diagram sources**
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L7-L44)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js#L250-L295)
- [functions/_middleware.js](file://functions/_middleware.js#L150-L167)
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js#L70-L88)

**Section sources**
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L1-L278)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js#L1-L530)
- [functions/_middleware.js](file://functions/_middleware.js#L1-L383)
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js#L1-L380)
- [functions/config/metadata.config.js](file://functions/config/metadata.config.js#L1-L369)

### Metadata Hook System for Dynamic Updates
- A custom React hook encapsulates metadata utilities for dynamic overrides and image helpers.
- The hook provides a clean API for components to signal metadata changes; the SEO component consumes these signals and updates Helmet accordingly.

```mermaid
flowchart TD
Start(["useMetadata hook"]) --> SetMeta["setMetadata(overrides)"]
SetMeta --> Log["Log override request"]
Start --> GetCurrent["getCurrentMetadata()"]
GetCurrent --> ReturnState["Return { title, lang, path }"]
Start --> AbsUrl["getAbsoluteImageUrl(imagePath)"]
AbsUrl --> BuildUrl["Build absolute URL"]
Start --> DefaultOG["getDefaultOGImage()"]
DefaultOG --> Versioned["Append cache-busting version"]
```

**Diagram sources**
- [src/hooks/useMetadata.js](file://src/hooks/useMetadata.js#L43-L114)

**Section sources**
- [src/hooks/useMetadata.js](file://src/hooks/useMetadata.js#L1-L117)
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L226-L274)

### PWA Integration: Service Worker and Client Components
- The service worker implements Workbox strategies:
  - Pre-caching of critical assets
  - Stale-while-revalidate for scripts/styles
  - Cache-first for images/fonts
  - Network-first for API
  - Background sync for contact form submissions
  - Periodic background sync for labs data
  - Comprehensive offline fallback
- The client app registers the service worker and exposes update/install prompts.

```mermaid
flowchart TD
A["Service Worker Startup"] --> B["Skip Waiting + Claim Clients"]
B --> C["Pre-cache Manifest"]
C --> D["Navigation Route to index.html"]
D --> E["Runtime Strategies"]
E --> E1["Scripts/Styles: Stale-While-Revalidate"]
E --> E2["Images: Cache-First + Expiration"]
E --> E3["Fonts: Cache-First + Expiration"]
E --> E4["API: Network-First + Cacheable Responses"]
E --> F["Background Sync: contactQueue"]
E --> G["Periodic Sync: update-labs-data"]
E --> H["Global Catch Handler: Offline Fallback"]
```

**Diagram sources**
- [src/sw.js](file://src/sw.js#L14-L227)
- [dist/sw.js](file://dist/sw.js#L1-L2)

**Section sources**
- [src/sw.js](file://src/sw.js#L1-L227)
- [dist/sw.js](file://dist/sw.js#L1-L2)
- [src/App.jsx](file://src/App.jsx#L87-L167)

### Background Sync for Contact Forms
- Client submits to /api/contact; on network failure, the service worker queues the request.
- Background sync retries queued submissions when connectivity is restored, adding a unique submission identifier to prevent duplicates.

```mermaid
sequenceDiagram
participant C as "Contact.jsx"
participant API as "Workers /api/contact"
participant BG as "BackgroundSyncPlugin"
participant SW as "Service Worker"
C->>API : POST /api/contact (formData)
alt Network OK
API-->>C : 200 OK
else Network Failure
API-->>BG : Queue request
BG-->>SW : Persist in IndexedDB
SW-->>SW : Wait for sync event
SW->>API : Re-attempt POST with unique ID
API-->>SW : 200 OK
SW-->>BG : Remove from queue
end
```

**Diagram sources**
- [src/components/Contact.jsx](file://src/components/Contact.jsx#L51-L82)
- [functions/api/contact.js](file://functions/api/contact.js#L1-L62)
- [src/sw.js](file://src/sw.js#L118-L153)

**Section sources**
- [src/components/Contact.jsx](file://src/components/Contact.jsx#L1-L359)
- [functions/api/contact.js](file://functions/api/contact.js#L1-L62)
- [src/sw.js](file://src/sw.js#L118-L153)

### State Synchronization Between Client and Server
- Language and direction synchronization between client and server:
  - Client detects language from URL and updates document attributes
  - Workers inject appropriate HTML lang/dir and canonical hreflang tags
- Periodic background sync keeps client data fresh without requiring user interaction

```mermaid
sequenceDiagram
participant CL as "Client App"
participant WR as "Workers Middleware"
participant SW as "Service Worker"
CL->>CL : Detect lang from pathname
CL->>WR : Subsequent requests
WR->>WR : Inject lang/dir + hreflang
SW->>SW : Register periodic sync for labs data
SW-->>CL : Update cached API responses
```

**Diagram sources**
- [src/App.jsx](file://src/App.jsx#L119-L143)
- [functions/_middleware.js](file://functions/_middleware.js#L228-L263)
- [src/sw.js](file://src/sw.js#L183-L203)

**Section sources**
- [src/App.jsx](file://src/App.jsx#L117-L167)
- [functions/_middleware.js](file://functions/_middleware.js#L228-L263)
- [src/sw.js](file://src/sw.js#L183-L203)

### Cross-Origin Resource Sharing and Security Headers
- Workers enforce strict security headers and normalize crawler responses
- API endpoints include CORS headers for external access
- CSP is applied to mitigate XSS risks

```mermaid
flowchart TD
A["Incoming Request"] --> B{"Is crawler?"}
B --> |Yes| C["Force 200 OK if 206"]
B --> |No| D["Proceed normally"]
C --> E["Inject Meta Tags + CSP"]
D --> E
E --> F["Add Security Headers"]
F --> G["Return Response"]
```

**Diagram sources**
- [functions/_middleware.js](file://functions/_middleware.js#L177-L225)

**Section sources**
- [functions/_middleware.js](file://functions/_middleware.js#L196-L225)
- [functions/api/contact.js](file://functions/api/contact.js#L44-L59)

## Dependency Analysis
The integration relies on clear boundaries:
- Client depends on SEO utilities and metadata configuration
- Workers depend on the metadata service and configuration
- Service worker depends on Workbox and IndexedDB for persistence
- Build-time configuration controls PWA behavior and caching limits

```mermaid
graph LR
A["src/App.jsx"] --> B["src/components/SEO.jsx"]
B --> C["src/utils/MetaConfig.js"]
A --> D["src/components/Contact.jsx"]
D --> E["functions/api/contact.js"]
A --> F["src/sw.js"]
F --> G["dist/sw.js"]
H["_middleware.js"] --> I["functions/services/MetadataService.js"]
I --> J["functions/config/metadata.config.js"]
A --> H
K["vite.config.js"] --> F
```

**Diagram sources**
- [src/App.jsx](file://src/App.jsx#L1-L348)
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L1-L278)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js#L1-L530)
- [src/components/Contact.jsx](file://src/components/Contact.jsx#L1-L359)
- [functions/api/contact.js](file://functions/api/contact.js#L1-L62)
- [src/sw.js](file://src/sw.js#L1-L227)
- [dist/sw.js](file://dist/sw.js#L1-L2)
- [functions/_middleware.js](file://functions/_middleware.js#L1-L383)
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js#L1-L380)
- [functions/config/metadata.config.js](file://functions/config/metadata.config.js#L1-L369)
- [vite.config.js](file://vite.config.js#L1-L262)

**Section sources**
- [vite.config.js](file://vite.config.js#L19-L202)

## Performance Considerations
- Compression: gzip and brotli enabled at build time
- Asset inlining: small assets are inlined; larger assets are chunked and hashed
- Code splitting: vendor bundles separated for optimal caching
- Caching strategies:
  - Stale-while-revalidate for JS/CSS
  - Cache-first for images/fonts
  - Network-first for API with short timeouts
  - Precaching critical assets for instant first load
- Offline fallback reduces server load and improves resilience
- CSP and security headers improve trust and reduce attack surface

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
- Error boundary displays a friendly UI and logs errors for diagnosis
- Offline fallback provides clear messaging and a reload action
- Service worker logs and background sync ensure offline submissions are retried
- Workers normalize crawler responses and inject meta tags to avoid 206 partial content issues

**Section sources**
- [src/components/ErrorBoundary.jsx](file://src/components/ErrorBoundary.jsx#L1-L57)
- [src/pages/OfflineFallback.jsx](file://src/pages/OfflineFallback.jsx#L1-L57)
- [src/sw.js](file://src/sw.js#L118-L153)
- [functions/_middleware.js](file://functions/_middleware.js#L177-L187)

## Conclusion
This hybrid architecture delivers:
- SEO-first behavior with crawler-aware middleware and metadata injection
- Progressive enhancement through robust PWA caching and offline fallback
- Resilient form submissions via background sync
- Strong security posture with CSP and normalized responses
- Maintainable metadata configuration and client-side hooks

[No sources needed since this section summarizes without analyzing specific files]

## Appendices

### Data Flow Patterns
- Client-side navigation triggers React rendering and Helmet updates
- Workers intercept HTML responses to inject metadata and security headers
- Service worker manages caching, offline fallback, and background tasks
- API calls leverage network-first with background sync for reliability

**Section sources**
- [src/App.jsx](file://src/App.jsx#L180-L291)
- [functions/_middleware.js](file://functions/_middleware.js#L168-L263)
- [src/sw.js](file://src/sw.js#L47-L174)
- [functions/api/contact.js](file://functions/api/contact.js#L1-L62)