# Architecture Overview

<cite>
**Referenced Files in This Document**
- [vite.config.js](file://vite.config.js)
- [wrangler.jsonc](file://wrangler.jsonc)
- [package.json](file://package.json)
- [src/main.jsx](file://src/main.jsx)
- [src/App.jsx](file://src/App.jsx)
- [functions/_middleware.js](file://functions/_middleware.js)
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js)
- [functions/config/metadata.config.js](file://functions/config/metadata.config.js)
- [src/i18n.js](file://src/i18n.js)
- [src/sw.js](file://src/sw.js)
- [src/hooks/useMetadata.js](file://src/hooks/useMetadata.js)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js)
- [src/components/GEOContent.jsx](file://src/components/GEOContent.jsx)
- [src/components/GEOSEO.jsx](file://src/components/GEOSEO.jsx)
- [src/utils/GEOSchema.js](file://src/utils/GEOSchema.js)
- [src/locales/en.geo.json](file://src/locales/en.geo.json)
</cite>

## Update Summary
**Changes Made**
- Added new GEO (Generative Engine Optimization) components to the architecture
- Integrated GEOSchema utilities for AI-optimized structured data
- Enhanced SEO component with GEO capabilities
- Added GEO content components for AI-friendly semantic markup
- Updated metadata configuration to support GEO entities

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [GEO Enhancement Layer](#geo-enhancement-layer)
7. [Dependency Analysis](#dependency-analysis)
8. [Performance Considerations](#performance-considerations)
9. [Troubleshooting Guide](#troubleshooting-guide)
10. [Conclusion](#conclusion)

## Introduction
This document describes the hybrid frontend-backend architecture of the landing page application. It combines a modern React 19 single-page application (SPA) built with Vite and enhanced with a Progressive Web App (PWA) layer, served via Cloudflare Workers middleware. The architecture now includes advanced GEO (Generative Engine Optimization) capabilities that extend traditional SEO with AI-optimized content structures, enabling better recognition by AI search engines and knowledge graphs. The backend middleware injects SEO metadata for social crawlers and search engines, supports snapshot-based pre-rendering, and enforces robust security headers. Cross-cutting concerns include internationalization, offline-first behavior, and performance optimization strategies.

## Project Structure
The project is organized into distinct layers with enhanced GEO capabilities:
- Frontend (React 19 SPA): Client-side routing, components, i18n, PWA service worker, and build configuration
- GEO Enhancement Layer: AI-optimized content components and structured data utilities
- Backend (Cloudflare Workers): Middleware for metadata injection, crawler handling, snapshot serving, and security headers
- Shared configuration: Metadata definitions and helpers for SEO and structured data

```mermaid
graph TB
subgraph "Client (Browser)"
A["React 19 App<br/>Routing, Components, i18n"]
B["Service Worker (Workbox)<br/>Caching, Offline, Background Sync"]
C["GEO Content Components<br/>AI-Optimized Semantic Markup"]
D["GEO SEO Component<br/>Enhanced Structured Data"]
end
subgraph "Edge (Cloudflare Workers)"
E["Middleware (_middleware.js)<br/>Crawler Detection, Snapshot Serving, Metadata Injection"]
F["MetadataService.js<br/>Route & Locale Resolution"]
G["metadata.config.js<br/>Static Metadata Definitions"]
end
subgraph "GEO Utilities"
H["GEOSchema.js<br/>AI-Optimized Structured Data"]
I["en.geo.json<br/>GEO Content Localization"]
end
subgraph "Delivery"
J["Wrangler (Pages)<br/>Static Asset Delivery"]
end
A --> |HTTP Requests| E
C --> |Semantic Markup| A
D --> |Enhanced SEO| A
H --> |Structured Data| D
I --> |Localized Content| C
E --> |Fetch Snapshot| J
E --> |HTMLRewriter + CSP| A
B --> |Cache Strategy| J
F --> G
```

**Diagram sources**
- [src/App.jsx](file://src/App.jsx#L311-L348)
- [src/sw.js](file://src/sw.js#L1-L227)
- [functions/_middleware.js](file://functions/_middleware.js#L76-L264)
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js#L44-L88)
- [functions/config/metadata.config.js](file://functions/config/metadata.config.js#L119-L209)
- [src/components/GEOContent.jsx](file://src/components/GEOContent.jsx#L1-L374)
- [src/components/GEOSEO.jsx](file://src/components/GEOSEO.jsx#L1-L150)
- [src/utils/GEOSchema.js](file://src/utils/GEOSchema.js#L1-L375)
- [src/locales/en.geo.json](file://src/locales/en.geo.json#L1-L247)
- [wrangler.jsonc](file://wrangler.jsonc#L1-L8)

**Section sources**
- [src/main.jsx](file://src/main.jsx#L1-L12)
- [package.json](file://package.json#L6-L15)
- [vite.config.js](file://vite.config.js#L1-L262)
- [wrangler.jsonc](file://wrangler.jsonc#L1-L8)

## Core Components
- React 19 SPA with client-side routing, lazy loading, and animations
- PWA layer powered by Vite PWA and Workbox for caching, offline fallback, and background sync
- Cloudflare Workers middleware for crawler detection, snapshot serving, metadata injection, and security hardening
- Metadata service and configuration for multilingual SEO and structured data
- **NEW**: GEO Content Components for AI-optimized semantic markup
- **NEW**: GEO SEO Component with enhanced structured data for AI engines
- **NEW**: GEOSchema utilities for comprehensive AI entity recognition

**Section sources**
- [src/App.jsx](file://src/App.jsx#L1-L348)
- [src/sw.js](file://src/sw.js#L1-L227)
- [functions/_middleware.js](file://functions/_middleware.js#L1-L383)
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js#L1-L380)
- [functions/config/metadata.config.js](file://functions/config/metadata.config.js#L1-L369)
- [src/components/GEOContent.jsx](file://src/components/GEOContent.jsx#L1-L374)
- [src/components/GEOSEO.jsx](file://src/components/GEOSEO.jsx#L1-L150)
- [src/utils/GEOSchema.js](file://src/utils/GEOSchema.js#L1-L375)

## Architecture Overview
The system operates as follows with enhanced GEO capabilities:
- Client requests reach Cloudflare Workers middleware
- Middleware detects crawlers and either serves pre-rendered snapshots or injects metadata into the HTML response
- Non-crawler requests pass through to static assets delivered by Cloudflare Pages
- The React SPA runs in the browser with client-side routing, PWA caching, and i18n synchronization
- **NEW**: GEO components provide semantic markup for AI recognition and enhanced knowledge graph integration
- **NEW**: GEOSchema utilities generate comprehensive structured data for AI search engines

```mermaid
sequenceDiagram
participant U as "User Agent"
participant W as "Workers Middleware"
participant MS as "MetadataService"
participant CFG as "metadata.config.js"
participant GEO as "GEO Components"
participant P as "Pages Assets"
U->>W : "HTTP Request"
W->>W : "Detect crawler / validate snapshot route"
alt "Snapshot available"
W->>P : "Fetch /snapshots/{path}.html"
P-->>W : "HTML Response"
W-->>U : "200 OK with X-Rumuze-Prerender header"
else "Inject metadata"
W->>MS : "getMetadata(path, locale)"
MS->>CFG : "Resolve route & locale"
CFG-->>MS : "Metadata DTO"
MS-->>W : "Complete metadata"
W->>W : "Build meta tags (prepend head)"
W->>W : "Add security headers"
W->>GEO : "Generate GEO structured data"
GEO-->>W : "AI-optimized schemas"
W-->>U : "HTML with injected meta tags"
end
```

**Diagram sources**
- [functions/_middleware.js](file://functions/_middleware.js#L76-L264)
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js#L70-L88)
- [functions/config/metadata.config.js](file://functions/config/metadata.config.js#L119-L209)
- [src/components/GEOSEO.jsx](file://src/components/GEOSEO.jsx#L52-L68)

## Detailed Component Analysis

### Frontend: React 19 SPA and PWA
- App initialization sets up theme, error boundary, router, and lazy-loaded routes
- Internationalization synchronizes language with URL segments and document direction
- PWA features include automatic service worker registration, periodic background sync, and offline toast handling
- Vite build optimizes chunking, minification, and asset inlining for performance

```mermaid
classDiagram
class App {
+useEffect()
+render()
}
class AppContent {
+useEffect()
+routes
}
class i18n {
+init()
+changeLanguage()
}
class SW {
+precacheAndRoute()
+NavigationRoute()
+BackgroundSyncPlugin()
}
App --> AppContent : "renders"
AppContent --> i18n : "syncs language"
AppContent --> SW : "registers"
```

**Diagram sources**
- [src/App.jsx](file://src/App.jsx#L74-L309)
- [src/i18n.js](file://src/i18n.js#L1-L45)
- [src/sw.js](file://src/sw.js#L14-L32)

**Section sources**
- [src/App.jsx](file://src/App.jsx#L1-L348)
- [src/i18n.js](file://src/i18n.js#L1-L45)
- [src/sw.js](file://src/sw.js#L1-L227)
- [vite.config.js](file://vite.config.js#L19-L202)

### Backend: Cloudflare Workers Middleware
- Detects social and search engine crawlers and normalizes responses to avoid partial content errors
- Attempts to serve pre-rendered snapshots for valid routes; otherwise injects metadata into the HTML head
- Enforces strict security headers and sanitizes meta content
- Passes through PWA assets and static resources to avoid interference

```mermaid
flowchart TD
Start(["Incoming Request"]) --> UA["Read User-Agent"]
UA --> IsCrawler{"Is crawler?"}
IsCrawler --> |Yes| SnapshotCheck["Check snapshot route"]
SnapshotCheck --> HasSnap{"Snapshot exists?"}
HasSnap --> |Yes| ServeSnap["Serve snapshot with 200"]
HasSnap --> |No| Inject["Build & inject meta tags"]
IsCrawler --> |No| Inject
Inject --> SecHeaders["Add security headers"]
ServeSnap --> End(["Response"])
SecHeaders --> End
```

**Diagram sources**
- [functions/_middleware.js](file://functions/_middleware.js#L76-L264)

**Section sources**
- [functions/_middleware.js](file://functions/_middleware.js#L1-L383)

### Metadata Service and Configuration
- Resolves locale and route-specific metadata, with fallbacks and sanitization
- Generates canonical URLs, alternate hreflang links, and image dimensions required by social crawlers
- Blog article metadata supports dynamic slugs with shared and localized fields

```mermaid
classDiagram
class MetadataService {
+detectLocale(path)
+getMetadata(path, locale)
+getCanonicalUrl(path)
+getAlternateUrls(path)
+buildMetadataDTO(...)
}
class MetadataConfig {
+BASE_URL
+OG_IMAGES
+ROUTE_METADATA
+DEFAULT_METADATA
+getBlogArticleMetadata(path, locale)
}
MetadataService --> MetadataConfig : "uses"
```

**Diagram sources**
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js#L44-L347)
- [functions/config/metadata.config.js](file://functions/config/metadata.config.js#L39-L336)

**Section sources**
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js#L1-L380)
- [functions/config/metadata.config.js](file://functions/config/metadata.config.js#L1-L369)

### Client-Side Metadata Utilities
- Provides a hook to manage metadata overrides and helpers for absolute image URLs and default OG images
- Works alongside the server-side middleware to ensure consistency across SPA navigation

**Section sources**
- [src/hooks/useMetadata.js](file://src/hooks/useMetadata.js#L1-L117)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js#L250-L295)

## GEO Enhancement Layer

### GEO Content Components
The GEO enhancement layer introduces specialized components designed for AI recognition and semantic clarity:

- **EntityDefinition**: Clear, AI-readable entity definitions for homepage and about pages with proper semantic structure
- **ServiceCategories**: Four core service categories with structured semantic markup for AI understanding
- **TechnologyStack**: Technology expertise display with semantic organization for AI extraction
- **GEOFAQSection**: Structured FAQ content optimized for AI question-answer recognition
- **IndustriesSection**: Target industries display with semantic relationships
- **ProcessSection**: Engineering process visualization with step-by-step semantic structure

Each component uses appropriate schema.org markup (`itemScope`, `itemType`) and semantic HTML5 elements to enhance AI comprehension.

**Section sources**
- [src/components/GEOContent.jsx](file://src/components/GEOContent.jsx#L1-L374)

### GEO SEO Component
The enhanced SEO component extends traditional SEO with AI-optimized features:

- **Enhanced Structured Data**: Generates comprehensive JSON-LD schemas including Organization, Service, FAQPage, and BreadcrumbList
- **AI Meta Tags**: Includes specialized meta tags for AI search engine recognition
- **Entity Reinforcement**: Adds entity-type, entity-name, and entity-category meta tags
- **Service Schema Integration**: Supports service-specific schemas with configurable service types
- **Breadcrumbs Support**: Dynamic breadcrumb schema generation for navigation context
- **Multi-language Optimization**: AI-optimized content for both English and Arabic locales

**Section sources**
- [src/components/GEOSEO.jsx](file://src/components/GEOSEO.jsx#L1-L150)

### GEOSchema Utilities
Comprehensive structured data generation for AI recognition:

- **Organization Schema**: Complete company entity definition with founding information, services, and global presence
- **Service Schema**: Authority page schemas with service offerings and technical specifications
- **SoftwareApplication Schema**: Product page schemas with feature lists and categorization
- **FAQPage Schema**: Structured FAQ content optimized for AI question-answer extraction
- **WebPage Schema**: Page-level schemas with language and content organization
- **Breadcrumb Schema**: Navigation structure for AI understanding of site hierarchy
- **Complete GEO Schema Graph**: Combined schemas for comprehensive AI entity recognition

**Section sources**
- [src/utils/GEOSchema.js](file://src/utils/GEOSchema.js#L1-L375)

### GEO Localization
Enhanced localization support for AI-optimized content:

- **en.geo.json**: Comprehensive GEO content definitions including entity definitions, service descriptions, and FAQ content
- **AI-Friendly Translations**: Content optimized for AI processing and understanding
- **Bilingual Support**: Complete GEO content in both English and Arabic with semantic consistency

**Section sources**
- [src/locales/en.geo.json](file://src/locales/en.geo.json#L1-L247)

## Dependency Analysis
- Build and deployment pipeline integrates Vite, PWA generation, and Cloudflare Pages
- Runtime dependencies include React 19, React Router, i18n, and PWA-related libraries
- Middleware depends on the metadata service and configuration modules
- **NEW**: GEO components depend on GEOSchema utilities and GEO localization files
- **NEW**: GEO SEO component integrates with both traditional MetaConfig and GEOSchema utilities

```mermaid
graph LR
V["vite.config.js"] --> Pkg["package.json"]
Pkg --> Deps["Runtime Dependencies"]
Deps --> App["src/App.jsx"]
App --> MW["functions/_middleware.js"]
MW --> MSvc["functions/services/MetadataService.js"]
MSvc --> Cfg["functions/config/metadata.config.js"]
App --> SW["src/sw.js"]
App --> GEO["GEO Components"]
GEO --> GEOSchema["GEOSchema Utilities"]
GEO --> GeoLoc["en.geo.json"]
GEOSchema --> MetaCfg["MetaConfig Utilities"]
```

**Diagram sources**
- [vite.config.js](file://vite.config.js#L1-L262)
- [package.json](file://package.json#L16-L48)
- [src/App.jsx](file://src/App.jsx#L1-L348)
- [functions/_middleware.js](file://functions/_middleware.js#L29-L151)
- [functions/services/MetadataService.js](file://functions/services/MetadataService.js#L16-L29)
- [functions/config/metadata.config.js](file://functions/config/metadata.config.js#L1-L369)
- [src/sw.js](file://src/sw.js#L1-L227)
- [src/components/GEOContent.jsx](file://src/components/GEOContent.jsx#L1-L374)
- [src/components/GEOSEO.jsx](file://src/components/GEOSEO.jsx#L1-L150)
- [src/utils/GEOSchema.js](file://src/utils/GEOSchema.js#L1-L375)
- [src/locales/en.geo.json](file://src/locales/en.geo.json#L1-L247)

**Section sources**
- [package.json](file://package.json#L1-L49)
- [vite.config.js](file://vite.config.js#L1-L262)
- [wrangler.jsonc](file://wrangler.jsonc#L1-L8)

## Performance Considerations
- Vite build:
  - Manual chunking separates core libraries, router, animation, i18n, and icons for efficient loading
  - Minification and compression (gzip/brotli) reduce payload sizes
  - CSS inlining for critical path rendering
- PWA caching:
  - Pre-caching of critical assets and offline.html
  - Stale-while-revalidate for JS/CSS, cache-first for images/fonts, network-first for APIs
  - Size limits and quota-aware purging for images
- Middleware:
  - Snapshot-based pre-rendering reduces server-side rendering overhead for crawlers
  - Security headers and response normalization improve reliability and trust signals
- **NEW GEO Performance**:
  - Semantic markup optimization reduces AI processing overhead
  - Structured data caching for frequently accessed schemas
  - GEO component lazy loading to minimize initial bundle size

## Troubleshooting Guide
- Crawler metadata issues:
  - Verify crawler detection patterns and snapshot route validation
  - Ensure meta tags are prepended to the head and absolute URLs are used
- PWA offline behavior:
  - Confirm navigation fallback and offline.html are precached
  - Check background sync queue and periodic sync registration
- Internationalization:
  - Validate language synchronization with URL segments and document direction
- Build and deployment:
  - Review Vite plugin configurations and Wrangler asset directory mapping
- **NEW GEO Troubleshooting**:
  - Verify GEO component semantic markup validity with schema.org guidelines
  - Test GEO schema generation with Google Rich Results Test tool
  - Ensure GEO localization files are properly loaded and accessible
  - Validate AI meta tags are correctly injected in production builds

**Section sources**
- [functions/_middleware.js](file://functions/_middleware.js#L276-L288)
- [src/sw.js](file://src/sw.js#L155-L174)
- [src/i18n.js](file://src/i18n.js#L14-L40)
- [vite.config.js](file://vite.config.js#L19-L202)
- [wrangler.jsonc](file://wrangler.jsonc#L4-L6)
- [src/components/GEOSEO.jsx](file://src/components/GEOSEO.jsx#L52-L68)
- [src/utils/GEOSchema.js](file://src/utils/GEOSchema.js#L264-L313)

## Conclusion
This hybrid architecture leverages a modern React 19 SPA with a robust PWA layer and Cloudflare Workers middleware to deliver fast, SEO-friendly experiences across desktop and mobile. The enhanced GEO capabilities provide AI-optimized content structures that improve recognition by AI search engines and knowledge graphs. The middleware's crawler-aware metadata injection and snapshot serving ensure strong social previews and search visibility, while the PWA guarantees resilient offline behavior. The modular GEO components, metadata service, and configuration enable maintainable, bilingual SEO across all routes with enhanced AI compatibility. This extension positions the application to benefit from emerging AI-driven search capabilities while maintaining traditional SEO best practices.