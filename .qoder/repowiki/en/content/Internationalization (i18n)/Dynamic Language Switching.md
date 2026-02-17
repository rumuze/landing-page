# Dynamic Language Switching

<cite>
**Referenced Files in This Document**
- [src/i18n.js](file://src/i18n.js)
- [src/locales/en.json](file://src/locales/en.json)
- [src/locales/ar.json](file://src/locales/ar.json)
- [src/App.jsx](file://src/App.jsx)
- [src/components/Navbar.jsx](file://src/components/Navbar.jsx)
- [src/components/ThemeToggle.jsx](file://src/components/ThemeToggle.jsx)
- [src/context/ThemeContext.jsx](file://src/context/ThemeContext.jsx)
- [src/components/SEO.jsx](file://src/components/SEO.jsx)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js)
- [src/pages/HomePage.jsx](file://src/pages/HomePage.jsx)
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

## Introduction
This document explains how dynamic language switching is implemented in the project, focusing on triggers, state management, component re-rendering, integration with theme switching, URL parameter handling, and persistent language preferences. It also covers SEO implications, loading states, and UX optimization strategies for smooth language transitions.

## Project Structure
The language switching system spans initialization, routing, UI components, and SEO metadata management:
- Initialization: i18n setup with detection, fallback, and persistence
- Routing: URL-based language synchronization and route mapping
- UI: Language selector in the navbar and theme toggle integration
- SEO: Dynamic metadata generation and hreflang tags

```mermaid
graph TB
subgraph "Initialization"
I18N["src/i18n.js"]
EN["src/locales/en.json"]
AR["src/locales/ar.json"]
end
subgraph "Routing & App Shell"
APP["src/App.jsx"]
HOME["src/pages/HomePage.jsx"]
end
subgraph "UI"
NAV["src/components/Navbar.jsx"]
THEMECTX["src/context/ThemeContext.jsx"]
THMETOGGLE["src/components/ThemeToggle.jsx"]
end
subgraph "SEO"
SEOCOMP["src/components/SEO.jsx"]
METACFG["src/utils/MetaConfig.js"]
end
I18N --> APP
EN --> I18N
AR --> I18N
APP --> NAV
APP --> SEOCOMP
NAV --> APP
THEMECTX --> THMETOGGLE
APP --> HOME
SEOCOMP --> METACFG
```

**Diagram sources**
- [src/i18n.js](file://src/i18n.js#L1-L45)
- [src/locales/en.json](file://src/locales/en.json#L1-L414)
- [src/locales/ar.json](file://src/locales/ar.json#L1-L414)
- [src/App.jsx](file://src/App.jsx#L74-L309)
- [src/pages/HomePage.jsx](file://src/pages/HomePage.jsx#L25-L43)
- [src/components/Navbar.jsx](file://src/components/Navbar.jsx#L9-L337)
- [src/context/ThemeContext.jsx](file://src/context/ThemeContext.jsx#L1-L46)
- [src/components/ThemeToggle.jsx](file://src/components/ThemeToggle.jsx#L1-L51)
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L7-L278)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js#L19-L295)

**Section sources**
- [src/i18n.js](file://src/i18n.js#L1-L45)
- [src/App.jsx](file://src/App.jsx#L74-L309)
- [src/components/Navbar.jsx](file://src/components/Navbar.jsx#L9-L337)
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L7-L278)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js#L19-L295)

## Core Components
- i18n initialization and detection: Initializes i18next with resources, detection order, and persistence to localStorage
- App-level language sync: Watches route changes and synchronizes i18n language and document direction
- Navbar language selector: Provides UI to switch languages and navigates accordingly
- Theme integration: Theme context persists and toggles theme independently of language
- SEO metadata: Generates bilingual metadata and hreflang tags based on current language and path

**Section sources**
- [src/i18n.js](file://src/i18n.js#L14-L40)
- [src/App.jsx](file://src/App.jsx#L117-L143)
- [src/components/Navbar.jsx](file://src/components/Navbar.jsx#L39-L57)
- [src/context/ThemeContext.jsx](file://src/context/ThemeContext.jsx#L5-L36)
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L234-L239)

## Architecture Overview
The language switching pipeline integrates initialization, routing, UI, and SEO:

```mermaid
sequenceDiagram
participant User as "User"
participant Navbar as "Navbar"
participant Router as "React Router"
participant App as "App.jsx"
participant I18N as "i18n.js"
participant SEO as "SEO.jsx"
User->>Navbar : Click language switch
Navbar->>Router : navigate(newPath)
Router-->>App : Route change
App->>I18N : changeLanguage(targetLang)
App->>App : Update html dir/lang attributes
App->>SEO : Render SEO with current language
SEO-->>User : Update meta tags and hreflangs
```

**Diagram sources**
- [src/components/Navbar.jsx](file://src/components/Navbar.jsx#L39-L57)
- [src/App.jsx](file://src/App.jsx#L117-L143)
- [src/i18n.js](file://src/i18n.js#L14-L40)
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L225-L278)

## Detailed Component Analysis

### i18n Initialization and Persistence
- Detection order prioritizes localStorage, then browser language detection, HTML tag, and cookie
- Resources loaded from JSON files for English and Arabic
- On first load, detects Arabic preference based on browser locales and sets language accordingly
- Uses localStorage to persist language preference across sessions

```mermaid
flowchart TD
Start(["Init i18n"]) --> DetectOrder["Set detection order<br/>localStorage → navigator → htmlTag → cookie"]
DetectOrder --> LoadRes["Load resources en/ar"]
LoadRes --> Fallback["Set fallbackLng to 'en'"]
Fallback --> FirstLoad{"localStorage has 'i18nextLng'?"}
FirstLoad --> |No| BrowserCheck["Check browser locales for Arabic"]
BrowserCheck --> IsAr{"Arabic preferred?"}
IsAr --> |Yes| ChangeAr["i18n.changeLanguage('ar')"]
IsAr --> |No| KeepEn["Keep default 'en'"]
FirstLoad --> |Yes| UseSaved["Use saved language"]
ChangeAr --> End(["Ready"])
KeepEn --> End
UseSaved --> End
```

**Diagram sources**
- [src/i18n.js](file://src/i18n.js#L14-L40)

**Section sources**
- [src/i18n.js](file://src/i18n.js#L14-L40)

### App-Level Language Synchronization
- Watches route changes and determines target language from path prefix
- Calls i18n.changeLanguage when mismatched
- Updates document.documentElement.lang and dir attributes for proper RTL/LTR rendering
- Ensures theme color meta updates for mobile browsers

```mermaid
flowchart TD
RouteChange["Route changed"] --> CheckPrefix{"Path startsWith '/ar'?"}
CheckPrefix --> |Yes| TargetAr["targetLang = 'ar'"]
CheckPrefix --> |No| TargetEn["targetLang = 'en'"]
TargetAr --> SyncI18N{"i18n.language == targetLang?"}
TargetEn --> SyncI18N
SyncI18N --> |No| ChangeLang["i18n.changeLanguage(targetLang)"]
SyncI18N --> |Yes| SkipChange["Skip change"]
ChangeLang --> UpdateDir["Set html dir/lang attributes"]
SkipChange --> UpdateDir
UpdateDir --> ThemeColor["Update theme-color meta"]
ThemeColor --> Done(["Render routes with new language"])
```

**Diagram sources**
- [src/App.jsx](file://src/App.jsx#L117-L143)

**Section sources**
- [src/App.jsx](file://src/App.jsx#L117-L143)

### Navbar Language Selector
- Displays current language and flags
- Computes new path based on current location and desired language
- Navigates to synchronized path; App.jsx handles i18n change and document attributes
- Closes dropdown menus after selection

```mermaid
sequenceDiagram
participant User as "User"
participant Nav as "Navbar"
participant Router as "React Router"
participant App as "App.jsx"
User->>Nav : Click language option
Nav->>Nav : Compute newPath from currentPath and lng
Nav->>Router : navigate(newPath)
Router-->>App : Route activates
App->>App : Sync i18n and html attributes
App-->>User : Render with new language
```

**Diagram sources**
- [src/components/Navbar.jsx](file://src/components/Navbar.jsx#L39-L57)
- [src/App.jsx](file://src/App.jsx#L117-L143)

**Section sources**
- [src/components/Navbar.jsx](file://src/components/Navbar.jsx#L39-L57)

### Theme Integration
- ThemeContext persists theme in localStorage and applies dark/light class to document root
- ThemeToggle toggles between themes and is integrated in both desktop and mobile navigation
- Theme switching is independent of language switching and does not trigger i18n changes

```mermaid
classDiagram
class ThemeContext {
+string theme
+toggleTheme() void
}
class ThemeProvider {
+useState(initialize from localStorage/system)
+useEffect(update document root class)
}
class ThemeToggle {
+onClick(toggleTheme)
}
ThemeProvider --> ThemeContext : "provides"
ThemeToggle --> ThemeContext : "consumes"
```

**Diagram sources**
- [src/context/ThemeContext.jsx](file://src/context/ThemeContext.jsx#L5-L36)
- [src/components/ThemeToggle.jsx](file://src/components/ThemeToggle.jsx#L6-L47)

**Section sources**
- [src/context/ThemeContext.jsx](file://src/context/ThemeContext.jsx#L5-L36)
- [src/components/ThemeToggle.jsx](file://src/components/ThemeToggle.jsx#L6-L47)

### SEO and Multilingual Metadata
- SEO component reads current language and path to select appropriate metadata
- Generates canonical URLs and hreflang links for both languages
- Emits structured data with inLanguage set to ar_EG or en_US
- Falls back gracefully if metadata is missing

```mermaid
flowchart TD
Start(["Render SEO"]) --> GetLang["Get i18n.language"]
GetLang --> GetPath["Get current path"]
GetPath --> Config["getMetaForRoute(path, lang)"]
Config --> Meta["Resolve title/description/image/url"]
Meta --> Hreflang["Generate hreflang tags"]
Meta --> Structured["Build JSON-LD with inLanguage"]
Hreflang --> Emit["Inject meta tags and schemas"]
Structured --> Emit
Emit --> End(["SEO rendered"])
```

**Diagram sources**
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L7-L278)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js#L250-L295)

**Section sources**
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L7-L278)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js#L19-L295)

### Route Mapping and Language Prefixes
- Routes are defined for both English and Arabic prefixes
- HomePage accepts an isAr prop to adjust SEO path
- All major pages have corresponding /ar routes

```mermaid
graph LR
Root["/"] --> ENHome["English Home"]
Root --> ARHome["/ar (Arabic Home)"]
Services["/services"] --> ENServices["English Services"]
Services --> ARServices["/ar/services (Arabic Services)"]
Portfolio["/portfolio"] --> ENPortfolio["English Portfolio"]
Portfolio --> ARPortfolio["/ar/portfolio (Arabic Portfolio)"]
Labs["/labs"] --> ENLabs["English Labs"]
Labs --> ARLabs["/ar/labs (Arabic Labs)"]
Legal["/privacy & /terms"] --> ENLegal["English Legal"]
Legal --> ARLegal["/ar/privacy & /ar/terms (Arabic Legal)"]
Contact["/contact"] --> ENContact["English Contact"]
Contact --> ARContact["/ar/contact (Arabic Contact)"]
```

**Diagram sources**
- [src/App.jsx](file://src/App.jsx#L182-L290)
- [src/pages/HomePage.jsx](file://src/pages/HomePage.jsx#L25-L43)

**Section sources**
- [src/App.jsx](file://src/App.jsx#L182-L290)
- [src/pages/HomePage.jsx](file://src/pages/HomePage.jsx#L25-L43)

## Dependency Analysis
- i18n depends on resource JSON files for translations
- App.jsx depends on i18n for language state and on SEO for metadata
- Navbar depends on i18n for current language and on router for navigation
- SEO depends on MetaConfig for metadata and on i18n for language
- ThemeContext and ThemeToggle are independent of i18n

```mermaid
graph TB
I18N["i18n.js"] --> APP["App.jsx"]
I18N --> NAV["Navbar.jsx"]
I18N --> SEO["SEO.jsx"]
EN["en.json"] --> I18N
AR["ar.json"] --> I18N
SEO --> METACFG["MetaConfig.js"]
THEMECTX["ThemeContext.jsx"] --> THMETOGGLE["ThemeToggle.jsx"]
APP --> SEO
APP --> NAV
```

**Diagram sources**
- [src/i18n.js](file://src/i18n.js#L1-L45)
- [src/locales/en.json](file://src/locales/en.json#L1-L414)
- [src/locales/ar.json](file://src/locales/ar.json#L1-L414)
- [src/App.jsx](file://src/App.jsx#L74-L309)
- [src/components/Navbar.jsx](file://src/components/Navbar.jsx#L9-L337)
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L7-L278)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js#L19-L295)
- [src/context/ThemeContext.jsx](file://src/context/ThemeContext.jsx#L1-L46)
- [src/components/ThemeToggle.jsx](file://src/components/ThemeToggle.jsx#L1-L51)

**Section sources**
- [src/i18n.js](file://src/i18n.js#L1-L45)
- [src/App.jsx](file://src/App.jsx#L74-L309)
- [src/components/Navbar.jsx](file://src/components/Navbar.jsx#L9-L337)
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L7-L278)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js#L19-L295)
- [src/context/ThemeContext.jsx](file://src/context/ThemeContext.jsx#L1-L46)
- [src/components/ThemeToggle.jsx](file://src/components/ThemeToggle.jsx#L1-L51)

## Performance Considerations
- Lazy loading: Pages and components are lazy-loaded to reduce initial bundle size
- Suspense fallback: Skeleton loaders improve perceived performance during transitions
- Minimal re-renders: App.jsx updates only document attributes and triggers i18n change when needed
- SEO caching: MetaConfig centralizes metadata to avoid repeated computations
- Theme persistence: ThemeContext avoids unnecessary DOM manipulations by reading from localStorage

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
Common issues and resolutions:
- Language not sticking after reload
  - Ensure localStorage key 'i18nextLng' is present and correctly set
  - Verify detection order and whitelist checks in i18n initialization
- Wrong direction on page load
  - Confirm App.jsx route effect runs before rendering and sets html dir/lang
- Hreflang or metadata incorrect
  - Check MetaConfig normalization and canonical URL generation
  - Ensure SEO component receives current path and language
- Theme conflicts with language
  - ThemeContext operates independently; verify ThemeToggle and ThemeProvider wrapping

**Section sources**
- [src/i18n.js](file://src/i18n.js#L26-L33)
- [src/App.jsx](file://src/App.jsx#L117-L143)
- [src/utils/MetaConfig.js](file://src/utils/MetaConfig.js#L206-L295)
- [src/components/SEO.jsx](file://src/components/SEO.jsx#L225-L278)
- [src/context/ThemeContext.jsx](file://src/context/ThemeContext.jsx#L5-L36)

## Conclusion
The project implements robust dynamic language switching by combining i18n initialization with URL-based synchronization, a user-friendly language selector, and comprehensive SEO metadata management. Theme switching is cleanly separated for predictable behavior. The system balances performance with user experience through lazy loading, skeleton loaders, and efficient state updates.