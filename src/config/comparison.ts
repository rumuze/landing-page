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

// ---------------------------------------------------------------------------
// Types — Comparison Targets (Dynamic Slug Routing)
// ---------------------------------------------------------------------------

export interface ComparisonTargetFAQ {
  question: Localized;
  answer: Localized;
}

export interface ComparisonTarget {
  slug: string;
  name: Localized;
  description: Localized;
  categoryId: string;
  faqs: ComparisonTargetFAQ[];
}

// ---------------------------------------------------------------------------
// Helpers — Comparison Targets
// ---------------------------------------------------------------------------

export function getComparisonTarget(slug: string): ComparisonTarget | undefined {
  return COMPARISON_TARGETS.find((t) => t.slug === slug);
}

export function getComparisonCategoryById(id: string): ComparisonCategory | undefined {
  return COMPARISON_CATEGORIES.find((c) => c.id === id);
}

// ---------------------------------------------------------------------------
// Data — Comparison Targets
// ---------------------------------------------------------------------------

export const COMPARISON_TARGETS: ComparisonTarget[] = [
  {
    slug: 'traditional-agencies',
    name: { en: 'Traditional Digital Agencies', ar: 'الوكالات الرقمية التقليدية' },
    description: {
      en: 'How Rumuze\'s engineering-first model structurally outperforms traditional digital agencies across architecture, reliability, and long-term ROI.',
      ar: 'كيف يتفوق نموذج روموز الهندسي هيكلياً على الوكالات الرقمية التقليدية عبر البنية المعمارية والموثوقية والعائد طويل الأمد.',
    },
    categoryId: 'general',
    faqs: [
      {
        question: { en: 'What is the main difference between Rumuze and traditional agencies?', ar: 'ما الفرق الرئيسي بين روموز والوكالات التقليدية؟' },
        answer: { en: 'Rumuze operates as a software engineering firm with integrated performance marketing — not a creative agency that outsources development. Every system Rumuze builds follows enterprise architecture standards with SLO-governed reliability.', ar: 'تعمل روموز كشركة هندسة برمجيات مع تسويق أدائي متكامل — وليست وكالة إبداعية تستعين بمصادر خارجية للتطوير. كل نظام تبنيه روموز يتبع معايير البنية المؤسسية مع موثوقية محكومة بمؤشرات الخدمة.' },
      },
      {
        question: { en: 'Does Rumuze cost more than traditional agencies?', ar: 'هل تكلفة روموز أعلى من الوكالات التقليدية؟' },
        answer: { en: 'Rumuze\'s initial investment may be comparable, but the total cost of ownership is significantly lower. Traditional agencies produce systems that require expensive rebuilds within 12–18 months. Rumuze builds scalable architecture that reduces long-term maintenance costs by up to 60%.', ar: 'قد يكون الاستثمار الأولي لروموز مماثلاً، لكن التكلفة الإجمالية للملكية أقل بكثير. تنتج الوكالات التقليدية أنظمة تتطلب إعادة بناء مكلفة خلال 12-18 شهراً. تبني روموز بنية قابلة للتوسع تقلل تكاليف الصيانة طويلة الأمد بنسبة تصل إلى 60%.' },
      },
      {
        question: { en: 'Can Rumuze handle both software development and marketing?', ar: 'هل تستطيع روموز التعامل مع تطوير البرمجيات والتسويق معاً؟' },
        answer: { en: 'Yes. Rumuze integrates software engineering and performance marketing under a single architecture. This eliminates the coordination overhead between separate vendors and ensures tracking, attribution, and conversion infrastructure are built into the platform — not bolted on.', ar: 'نعم. تدمج روموز هندسة البرمجيات والتسويق الأدائي تحت بنية واحدة. هذا يلغي تكاليف التنسيق بين موردين منفصلين ويضمن أن التتبع والإسناد وبنية التحويل مبنية في المنصة — وليست مضافة لاحقاً.' },
      },
      {
        question: { en: 'What guarantees does Rumuze offer that agencies don\'t?', ar: 'ما الضمانات التي تقدمها روموز ولا تقدمها الوكالات؟' },
        answer: { en: 'Rumuze operates on SLO-governed contracts with measurable uptime targets (99.9%+), performance budgets, and transparent reporting against defined KPIs. Traditional agencies typically offer best-effort support without quantifiable commitments.', ar: 'تعمل روموز بعقود محكومة بمؤشرات خدمة مع أهداف تشغيل قابلة للقياس (99.9%+) وميزانيات أداء وتقارير شفافة مقابل مؤشرات أداء محددة. تقدم الوكالات التقليدية عادةً دعماً بأفضل جهد بدون التزامات قابلة للقياس.' },
      },
    ],
  },
  {
    slug: 'software-agencies',
    name: { en: 'Software Development Agencies', ar: 'وكالات تطوير البرمجيات' },
    description: {
      en: 'A structured comparison of Rumuze\'s enterprise software engineering against typical software development agencies.',
      ar: 'مقارنة مهيكلة بين هندسة البرمجيات المؤسسية لروموز ووكالات تطوير البرمجيات النموذجية.',
    },
    categoryId: 'software-dev',
    faqs: [
      {
        question: { en: 'How does Rumuze\'s software architecture differ from typical agencies?', ar: 'كيف تختلف بنية روموز البرمجية عن الوكالات النموذجية؟' },
        answer: { en: 'Rumuze uses domain-driven design with bounded contexts, microservices architecture, and container orchestration. Typical agencies ship monolithic MVC applications or WordPress-based solutions that cannot scale horizontally.', ar: 'تستخدم روموز التصميم الموجه بالمجال مع حدود سياقية وبنية ميكروسيرفيس وتنسيق الحاويات. تقوم الوكالات النموذجية بتسليم تطبيقات MVC أحادية أو حلول قائمة على WordPress لا يمكنها التوسع أفقياً.' },
      },
      {
        question: { en: 'Does Rumuze include automated testing?', ar: 'هل تتضمن روموز اختبارات آلية؟' },
        answer: { en: 'Yes. Every Rumuze project includes automated unit, integration, and E2E testing integrated into CI/CD pipelines. This catches regressions before deployment, unlike manual QA workflows used by most agencies.', ar: 'نعم. كل مشروع من روموز يتضمن اختبارات وحدات وتكامل وشاملة آلية مدمجة في خطوط CI/CD. هذا يكتشف الانحدارات قبل النشر، على عكس أساليب الاختبار اليدوي التي تستخدمها معظم الوكالات.' },
      },
      {
        question: { en: 'What deployment model does Rumuze use?', ar: 'ما نموذج النشر الذي تستخدمه روموز؟' },
        answer: { en: 'Rumuze implements zero-downtime deployments with automated rollback capabilities. Traditional agencies typically rely on scheduled maintenance windows with manual deployment processes.', ar: 'تطبق روموز نشراً بدون توقف مع قدرات استرجاع آلية. تعتمد الوكالات التقليدية عادةً على نوافذ صيانة مجدولة مع عمليات نشر يدوية.' },
      },
      {
        question: { en: 'Does Rumuze provide documentation?', ar: 'هل توفر روموز توثيقاً؟' },
        answer: { en: 'Yes. Rumuze delivers API documentation, architecture decision records (ADRs), and operational runbooks with every project. This ensures your team can operate and extend the system independently.', ar: 'نعم. تقدم روموز وثائق API وسجلات قرارات معمارية (ADRs) وأدلة تشغيل مع كل مشروع. هذا يضمن أن فريقك يمكنه تشغيل وتوسيع النظام بشكل مستقل.' },
      },
    ],
  },
  {
    slug: 'marketing-agencies',
    name: { en: 'Marketing Agencies', ar: 'وكالات التسويق' },
    description: {
      en: 'How Rumuze\'s data-driven performance marketing compares to traditional campaign management agencies.',
      ar: 'كيف يقارن التسويق الأدائي القائم على البيانات من روموز بوكالات إدارة الحملات التقليدية.',
    },
    categoryId: 'marketing',
    faqs: [
      {
        question: { en: 'How does Rumuze track ad performance differently?', ar: 'كيف تتبع روموز أداء الإعلانات بشكل مختلف؟' },
        answer: { en: 'Rumuze implements server-side tracking (Meta CAPI + GA4) which captures 30–40% more conversions than client-side pixels blocked by ad blockers. This provides accurate attribution data that typical agencies miss entirely.', ar: 'تطبق روموز تتبعاً من جانب الخادم (Meta CAPI + GA4) الذي يلتقط 30-40% تحويلات أكثر من بكسلات العميل المحظورة بحاصرات الإعلانات. هذا يوفر بيانات إسناد دقيقة تفوتها الوكالات النموذجية تماماً.' },
      },
      {
        question: { en: 'What attribution model does Rumuze use?', ar: 'ما نموذج الإسناد الذي تستخدمه روموز؟' },
        answer: { en: 'Rumuze uses multi-touch attribution with data-driven modeling, tracking the full customer journey across channels. Traditional agencies rely on last-click attribution which misses 60–70% of the conversion path.', ar: 'تستخدم روموز إسناداً متعدد اللمس مع نمذجة مبنية على البيانات، لتتبع رحلة العميل الكاملة عبر القنوات. تعتمد الوكالات التقليدية على إسناد النقرة الأخيرة الذي يفقد 60-70% من مسار التحويل.' },
      },
      {
        question: { en: 'How does Rumuze measure marketing success?', ar: 'كيف تقيس روموز نجاح التسويق؟' },
        answer: { en: 'Rumuze measures ROAS, CPA, and incremental revenue — not vanity metrics. Every dollar spent is attributed to actual business outcomes through custom dashboards with revenue correlation.', ar: 'تقيس روموز عائد الإنفاق الإعلاني وتكلفة الاكتساب والإيرادات الإضافية — وليس المقاييس الشكلية. كل دولار يُنفق يُنسب لنتائج أعمال فعلية عبر لوحات مخصصة بارتباط الإيرادات.' },
      },
      {
        question: { en: 'Does Rumuze handle creative production?', ar: 'هل تتعامل روموز مع الإنتاج الإبداعي؟' },
        answer: { en: 'Yes. Rumuze runs systematic A/B testing with performance-based creative rotation. Instead of running the same ad for weeks, Rumuze continuously tests and optimizes creative assets based on conversion data.', ar: 'نعم. تدير روموز اختبار A/B منهجي بتدوير إبداعي قائم على الأداء. بدلاً من تشغيل نفس الإعلان لأسابيع، تختبر روموز باستمرار وتحسن الأصول الإبداعية بناءً على بيانات التحويل.' },
      },
    ],
  },
  {
    slug: 'seo-agencies',
    name: { en: 'SEO Agencies', ar: 'وكالات SEO' },
    description: {
      en: 'Rumuze\'s technical SEO + AI visibility approach vs. basic on-page optimization offered by traditional SEO agencies.',
      ar: 'نهج روموز في SEO التقني + الظهور أمام الذكاء الاصطناعي مقابل التحسين الأساسي على الصفحة من وكالات SEO التقليدية.',
    },
    categoryId: 'seo',
    faqs: [
      {
        question: { en: 'Does Rumuze optimize for AI search engines?', ar: 'هل تحسّن روموز للظهور في محركات بحث الذكاء الاصطناعي؟' },
        answer: { en: 'Yes. Rumuze implements GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) to ensure visibility in AI-powered search results. Traditional SEO agencies focus only on Google page rankings without addressing AI citation systems.', ar: 'نعم. تطبق روموز تحسين المحركات التوليدية (GEO) وتحسين محركات الإجابة (AEO) لضمان الظهور في نتائج البحث المدعومة بالذكاء الاصطناعي. تركز وكالات SEO التقليدية فقط على ترتيب صفحات Google دون معالجة أنظمة الاستشهاد بالذكاء الاصطناعي.' },
      },
      {
        question: { en: 'What structured data does Rumuze implement?', ar: 'ما البيانات المهيكلة التي تطبقها روموز؟' },
        answer: { en: 'Rumuze implements Organization, Person, Service, FAQ, Article, and BreadcrumbList schemas with proper @id linking across all pages. Traditional agencies typically implement basic Organization schema only.', ar: 'تطبق روموز ترميز Organization وPerson وService وFAQ وArticle وBreadcrumbList مع ربط @id صحيح عبر جميع الصفحات. تطبق الوكالات التقليدية عادةً ترميز Organization أساسي فقط.' },
      },
      {
        question: { en: 'How does Rumuze handle bilingual SEO?', ar: 'كيف تتعامل روموز مع SEO ثنائي اللغة؟' },
        answer: { en: 'Rumuze implements hreflang tags, locale-specific content strategies, and native Arabic RTL optimization — not machine-translated content. Each language version is treated as a first-class experience with proper semantic structure.', ar: 'تطبق روموز علامات hreflang واستراتيجيات محتوى حسب اللغة وتحسين عربي RTL أصلي — وليس محتوى مترجم آلياً. كل نسخة لغوية تُعامل كتجربة من الدرجة الأولى مع بنية دلالية صحيحة.' },
      },
      {
        question: { en: 'What technical SEO does Rumuze cover?', ar: 'ما SEO التقني الذي تغطيه روموز؟' },
        answer: { en: 'Rumuze covers Core Web Vitals optimization, crawl budget management, structured data implementation, and performance auditing. Traditional agencies typically limit technical SEO to meta tags and sitemap submission.', ar: 'تغطي روموز تحسين Core Web Vitals وإدارة ميزانية الزحف وتطبيق البيانات المهيكلة وتدقيق الأداء. تقتصر وكالات SEO التقليدية عادةً على علامات meta وتقديم خريطة الموقع.' },
      },
    ],
  },
];
