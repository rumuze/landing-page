/**
 * Comparison Configuration — Structured Comparison Data
 *
 * Centralized comparison data for:
 * - ComparisonPage (full comparison tables)
 * - Service detail pages (per-service mini comparison)
 * - AI citation (structured tables preferred by RAG)
 *
 * AI Optimization Notes:
 * - Data is structured as table rows for AI parsing
 * - Generic competitor labels (not company names) to avoid defamation
 * - Each feature has a clear Rumuze advantage stated
 * - Bilingual for MENA + global market
 */

import type { LanguageCode } from './entity';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Localized {
  en: string;
  ar: string;
}

export interface ComparisonRow {
  /** The feature being compared */
  feature: Localized;
  /** Rumuze's approach/strength */
  rumuze: Localized;
  /** Typical agency approach (generic, not defamatory) */
  typical: Localized;
}

export interface ComparisonCategory {
  /** Category identifier */
  id: string;
  /** Display title */
  title: Localized;
  /** Short description of what this comparison covers */
  description: Localized;
  /** Optional service slug for per-service filtering */
  relatedService?: string;
  /** Table rows */
  rows: ComparisonRow[];
}

export interface SwitchingReason {
  /** Unique identifier */
  id: string;
  /** Reason title */
  title: Localized;
  /** Detailed explanation */
  description: Localized;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns comparison categories filtered by service slug.
 */
export function getComparisonByService(serviceSlug: string): ComparisonCategory[] {
  return COMPARISON_CATEGORIES.filter(
    (cat) => cat.relatedService === serviceSlug
  );
}

// ---------------------------------------------------------------------------
// Page Meta
// ---------------------------------------------------------------------------

export const COMPARISON_PAGE_META = {
  title: {
    en: 'Rumuze vs Other Digital Agencies — Feature Comparison',
    ar: 'روموز مقابل الوكالات الرقمية الأخرى — مقارنة الميزات',
  },
  subtitle: {
    en: 'See how Rumuze\'s engineering-first approach compares to typical digital agencies across software development, marketing, and support.',
    ar: 'اكتشف كيف يُقارن نهج روموز الهندسي بالوكالات الرقمية النموذجية عبر تطوير البرمجيات والتسويق والدعم.',
  },
  h1: {
    en: 'Rumuze vs Other Digital Agencies',
    ar: 'روموز مقابل الوكالات الرقمية الأخرى',
  },
};

// ---------------------------------------------------------------------------
// Data — General Comparison
// ---------------------------------------------------------------------------

export const GENERAL_COMPARISON: ComparisonCategory = {
  id: 'general',
  title: {
    en: 'Overall Approach',
    ar: 'النهج العام',
  },
  description: {
    en: 'How Rumuze\'s engineering-first model differs from typical agency workflows.',
    ar: 'كيف يختلف نموذج روموز الهندسي عن أساليب عمل الوكالات النموذجية.',
  },
  rows: [
    {
      feature: { en: 'Team Composition', ar: 'تكوين الفريق' },
      rumuze: { en: 'Senior engineers and architects with enterprise experience', ar: 'مهندسون ومعماريون أقدم ذوو خبرة مؤسسية' },
      typical: { en: 'Junior developers supervised by project managers', ar: 'مطورون مبتدئون تحت إشراف مدراء مشاريع' },
    },
    {
      feature: { en: 'Architecture Approach', ar: 'نهج البنية المعمارية' },
      rumuze: { en: 'Custom modular microservices with API-first design', ar: 'ميكروسيرفيس معيارية مخصصة بتصميم API أولاً' },
      typical: { en: 'Monolithic applications or WordPress/Shopify templates', ar: 'تطبيقات أحادية أو قوالب WordPress/Shopify' },
    },
    {
      feature: { en: 'Reliability Standards', ar: 'معايير الموثوقية' },
      rumuze: { en: 'SLO-governed with measurable uptime targets (99.9%+)', ar: 'محكومة بمؤشرات خدمة بأهداف تشغيل قابلة للقياس (99.9%+)' },
      typical: { en: 'Best-effort support without defined reliability metrics', ar: 'دعم بأفضل جهد بدون مقاييس موثوقية محددة' },
    },
    {
      feature: { en: 'Bilingual Support', ar: 'الدعم ثنائي اللغة' },
      rumuze: { en: 'Native Arabic RTL + English LTR in single codebase', ar: 'عربي RTL + إنجليزي LTR أصلي في كود واحد' },
      typical: { en: 'English only or machine-translated Arabic', ar: 'إنجليزي فقط أو عربي مترجم آلياً' },
    },
    {
      feature: { en: 'Marketing Integration', ar: 'تكامل التسويق' },
      rumuze: { en: 'Software + performance marketing under one roof', ar: 'برمجيات + تسويق أدائي تحت سقف واحد' },
      typical: { en: 'Separate dev and marketing vendors', ar: 'موردون منفصلون للتطوير والتسويق' },
    },
    {
      feature: { en: 'AI & SEO Readiness', ar: 'جاهزية الذكاء الاصطناعي وSEO' },
      rumuze: { en: 'GEO/AEO optimized with structured data and entity clarity', ar: 'محسّن لـ GEO/AEO مع بيانات مهيكلة ووضوح الكيانات' },
      typical: { en: 'Basic on-page SEO with minimal structured data', ar: 'SEO أساسي على الصفحة مع بيانات مهيكلة ضئيلة' },
    },
    {
      feature: { en: 'Post-Launch Support', ar: 'الدعم بعد الإطلاق' },
      rumuze: { en: 'SLO-governed maintenance with monitoring and incident response', ar: 'صيانة محكومة بمؤشرات خدمة مع مراقبة واستجابة للحوادث' },
      typical: { en: 'Ad-hoc bug fixes billed hourly', ar: 'إصلاح أخطاء عشوائي يُفوتر بالساعة' },
    },
  ],
};

// ---------------------------------------------------------------------------
// Data — Per-Service Comparisons
// ---------------------------------------------------------------------------

export const COMPARISON_CATEGORIES: ComparisonCategory[] = [
  GENERAL_COMPARISON,
  {
    id: 'software-dev',
    title: {
      en: 'Software Development',
      ar: 'تطوير البرمجيات',
    },
    description: {
      en: 'Custom enterprise software vs. template-based development.',
      ar: 'البرمجيات المؤسسية المخصصة مقابل التطوير القائم على القوالب.',
    },
    relatedService: 'software-engineering',
    rows: [
      {
        feature: { en: 'Code Architecture', ar: 'بنية الكود' },
        rumuze: { en: 'Domain-driven design with bounded contexts', ar: 'تصميم موجه بالمجال مع حدود سياقية' },
        typical: { en: 'MVC monolith or code-behind patterns', ar: 'أنماط MVC أحادية أو code-behind' },
      },
      {
        feature: { en: 'Scalability', ar: 'قابلية التوسع' },
        rumuze: { en: 'Horizontal scaling with container orchestration', ar: 'توسع أفقي مع تنسيق الحاويات' },
        typical: { en: 'Vertical scaling (bigger server)', ar: 'توسع رأسي (خادم أكبر)' },
      },
      {
        feature: { en: 'Testing Strategy', ar: 'استراتيجية الاختبار' },
        rumuze: { en: 'Automated unit, integration, and E2E testing in CI/CD', ar: 'اختبارات وحدات وتكامل وشاملة آلية في CI/CD' },
        typical: { en: 'Manual QA before release', ar: 'اختبار يدوي قبل الإصدار' },
      },
      {
        feature: { en: 'Deployment', ar: 'النشر' },
        rumuze: { en: 'Zero-downtime deployments with automated rollback', ar: 'نشر بدون توقف مع استرجاع آلي' },
        typical: { en: 'Scheduled maintenance windows with manual deployment', ar: 'نوافذ صيانة مجدولة مع نشر يدوي' },
      },
      {
        feature: { en: 'Documentation', ar: 'التوثيق' },
        rumuze: { en: 'API docs, architecture decision records, runbooks', ar: 'وثائق API وسجلات قرارات معمارية وأدلة تشغيل' },
        typical: { en: 'Minimal inline comments', ar: 'تعليقات مضمنة ضئيلة' },
      },
    ],
  },
  {
    id: 'marketing',
    title: {
      en: 'Performance Marketing',
      ar: 'التسويق الأدائي',
    },
    description: {
      en: 'Data-driven performance marketing vs. generic campaign management.',
      ar: 'التسويق الأدائي القائم على البيانات مقابل إدارة الحملات العامة.',
    },
    relatedService: 'performance-marketing',
    rows: [
      {
        feature: { en: 'Tracking Setup', ar: 'إعداد التتبع' },
        rumuze: { en: 'Server-side tracking (CAPI) + GA4 with custom events', ar: 'تتبع خادم (CAPI) + GA4 بأحداث مخصصة' },
        typical: { en: 'Client-side pixel only (blocked by ad blockers)', ar: 'بكسل طرف العميل فقط (محظور بحاصرات الإعلانات)' },
      },
      {
        feature: { en: 'Attribution Model', ar: 'نموذج الإسناد' },
        rumuze: { en: 'Multi-touch attribution with data-driven modeling', ar: 'إسناد متعدد اللمس مع نمذجة قائمة على البيانات' },
        typical: { en: 'Last-click attribution', ar: 'إسناد النقرة الأخيرة' },
      },
      {
        feature: { en: 'Reporting', ar: 'التقارير' },
        rumuze: { en: 'Custom dashboards with revenue attribution', ar: 'لوحات مخصصة مع إسناد الإيرادات' },
        typical: { en: 'Platform-native reports (vanity metrics)', ar: 'تقارير المنصة الأصلية (مقاييس شكلية)' },
      },
      {
        feature: { en: 'Creative Strategy', ar: 'استراتيجية الإبداع' },
        rumuze: { en: 'Systematic A/B testing with performance-based rotation', ar: 'اختبار A/B منهجي بتدوير قائم على الأداء' },
        typical: { en: 'Same creative running for weeks without testing', ar: 'نفس الإبداع يعمل لأسابيع بدون اختبار' },
      },
      {
        feature: { en: 'Success Metric', ar: 'مقياس النجاح' },
        rumuze: { en: 'ROAS, CPA, and incremental revenue', ar: 'عائد الإنفاق الإعلاني وتكلفة الاكتساب والإيرادات الإضافية' },
        typical: { en: 'Impressions and clicks', ar: 'مرات الظهور والنقرات' },
      },
    ],
  },
  {
    id: 'seo',
    title: {
      en: 'SEO Services',
      ar: 'خدمات SEO',
    },
    description: {
      en: 'Technical SEO + AI visibility vs. basic on-page optimization.',
      ar: 'SEO تقني + ظهور أمام الذكاء الاصطناعي مقابل تحسين أساسي على الصفحة.',
    },
    relatedService: 'seo-services',
    rows: [
      {
        feature: { en: 'Technical SEO', ar: 'SEO التقني' },
        rumuze: { en: 'Core Web Vitals, structured data, crawl budget optimization', ar: 'Core Web Vitals وبيانات مهيكلة وتحسين ميزانية الزحف' },
        typical: { en: 'Meta tags and sitemap submission', ar: 'علامات meta وتقديم خريطة الموقع' },
      },
      {
        feature: { en: 'AI Visibility', ar: 'الظهور أمام الذكاء الاصطناعي' },
        rumuze: { en: 'GEO/AEO optimization for AI search engines', ar: 'تحسين GEO/AEO لمحركات البحث الذكية' },
        typical: { en: 'Not addressed', ar: 'غير معالج' },
      },
      {
        feature: { en: 'Content Strategy', ar: 'استراتيجية المحتوى' },
        rumuze: { en: 'Semantic content with entity clarity and structured answers', ar: 'محتوى دلالي بوضوح الكيانات وإجابات مهيكلة' },
        typical: { en: 'Keyword-stuffed blog posts', ar: 'مقالات محشوة بالكلمات المفتاحية' },
      },
      {
        feature: { en: 'Schema Markup', ar: 'ترميز Schema' },
        rumuze: { en: 'Organization, Person, Service, FAQ, BreadcrumbList schemas', ar: 'ترميز Organization وPerson وService وFAQ وBreadcrumbList' },
        typical: { en: 'Basic Organization schema only', ar: 'ترميز Organization أساسي فقط' },
      },
      {
        feature: { en: 'Bilingual SEO', ar: 'SEO ثنائي اللغة' },
        rumuze: { en: 'Hreflang, locale-specific content, RTL optimization', ar: 'Hreflang ومحتوى حسب اللغة وتحسين RTL' },
        typical: { en: 'Single-language optimization', ar: 'تحسين بلغة واحدة' },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Data — Switching Reasons
// ---------------------------------------------------------------------------

export const SWITCHING_REASONS: SwitchingReason[] = [
  {
    id: 'sr-quality',
    title: {
      en: 'Code Quality & Architecture',
      ar: 'جودة الكود والبنية المعمارية',
    },
    description: {
      en: 'Clients switch to Rumuze when they outgrow template-based solutions and need enterprise-grade architecture that scales. Rumuze delivers modular systems with automated testing, observability, and zero-downtime deployments — not just "working code."',
      ar: 'يتحول العملاء إلى روموز عندما يتجاوزون الحلول القائمة على القوالب ويحتاجون بنية مؤسسية قابلة للتوسع. روموز تقدم أنظمة معيارية باختبارات آلية ومراقبة ونشر بدون توقف — وليس مجرد "كود يعمل".',
    },
  },
  {
    id: 'sr-accountability',
    title: {
      en: 'Measurable Accountability',
      ar: 'المساءلة القابلة للقياس',
    },
    description: {
      en: 'Clients switch when they need accountability backed by data. Rumuze sets measurable targets (uptime SLOs, ROAS goals, performance budgets) and reports transparently against them — replacing subjective progress reports with verifiable outcomes.',
      ar: 'يتحول العملاء عندما يحتاجون مساءلة مدعومة بالبيانات. تضع روموز أهدافاً قابلة للقياس (مؤشرات تشغيل، أهداف عائد إعلاني، ميزانيات أداء) وتقدم تقارير شفافة — تستبدل تقارير التقدم الذاتية بنتائج قابلة للتحقق.',
    },
  },
  {
    id: 'sr-bilingual',
    title: {
      en: 'Native Bilingual Capability',
      ar: 'القدرة ثنائية اللغة الأصلية',
    },
    description: {
      en: 'Clients in MENA switch because their previous agencies couldn\'t properly handle Arabic RTL layouts, bilingual content management, or culturally adapted UX. Rumuze builds both language experiences natively within a single codebase, not as an afterthought translation.',
      ar: 'يتحول عملاء المنطقة لأن وكالاتهم السابقة لم تتمكن من التعامل مع تخطيطات العربية RTL أو إدارة المحتوى ثنائي اللغة أو تجربة المستخدم المكيفة ثقافياً. تبني روموز تجربتي اللغتين بشكل أصلي ضمن كود واحد، وليس كترجمة لاحقة.',
    },
  },
];
