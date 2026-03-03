export type LanguageCode = 'en' | 'ar';

export interface Localized {
  en: string;
  ar: string;
}

export interface LocalizedArray {
  en: string[];
  ar: string[];
}

export interface ServiceFAQ {
  question: Localized;
  answer: Localized;
}

export interface ServiceItem {
  slug: string;
  title: Localized;
  shortDescription: Localized;
  summary: Localized;
  keywords: string[];
  geoScope: string[];
  industries?: string[];
  definitions?: {
    short: Localized;   // ~25 words
    medium: Localized;  // ~50 words
    long: Localized;    // ~100 words
    bullets: {
      en: string[];
      ar: string[];
    };
  };
  // ── Extended fields (Phase 1 expansion) ──────────────────────────
  /** Service category for grouping */
  category?: 'software' | 'marketing';
  /** What problem this service solves */
  problemSolved?: Localized;
  /** Who this service is for */
  targetAudience?: Localized;
  /** Why Rumuze is different for this service */
  differentiators?: LocalizedArray;
  /** Per-service FAQs for ServiceDetailPage */
  faqs?: ServiceFAQ[];
  // ── Authority & GCC fields (Phase 2 expansion) ───────────────────
  /** 5 AI-extractable declarative H2 headings */
  h2Sections?: Localized[];
  /** Slugs of related services for internal linking */
  relatedServices?: string[];
  /** GCC/regulatory executive context paragraph */
  saudiContext?: Localized;
}

export const SERVICES: ServiceItem[] = [
  {
    slug: 'software-engineering',
    title: {
      en: 'Modular Platform & Systems Engineering',
      ar: 'هندسة المنصات والأنظمة المعيارية',
    },
    shortDescription: {
      en: 'Modular platform systems with defined reliability governance, domain-driven architecture, and structured delivery accountability.',
      ar: 'أنظمة منصات معيارية بحوكمة موثوقية محددة ومعمارية موجهة بالمجال ومساءلة تسليم منظمة.',
    },
    summary: {
      en: 'Rumuze engineers modular platform systems using domain-driven architecture, microservices, and API-first contracts — with defined reliability governance, fault tolerance, and structured delivery for growth-focused organizations globally.',
      ar: 'تهندس روموز أنظمة منصات معيارية بمعمارية موجهة بالمجال وميكروسيرفيس وعقود API أولاً — بحوكمة موثوقية محددة وتحمل أعطال وتسليم منظم للمؤسسات الموجهة نحو النمو عالمياً.',
    },
    keywords: ['microservices', 'API-first', 'reliability', 'scalability'],
    geoScope: ['Global', 'Regulated Markets'],
    industries: ['Fintech', 'Retail', 'Logistics', 'Healthcare', 'Real Estate'],
    definitions: {
      short: {
        en: 'Designs and delivers modular, microservices-based systems with API-first contracts, predictable performance, and strict reliability governance.',
        ar: 'تصميم وتنفيذ أنظمة معيارية تعتمد الميكروسيرفيس وعقود API، بأداء متوقع وحوكمة موثوقية صارمة.',
      },
      medium: {
        en: 'We engineer modular platforms using microservices and API-first contracts, optimizing throughput, latency, error budgets, and resilience. Pipelines emphasize observability, change isolation, and predictable deployments for multi-team environments.',
        ar: 'نهندس منصات معيارية بميكروسيرفيس وعقود API أولاً، ونحسن الإنتاجية والزمن وميزانيات الأخطاء والمرونة. خطوطنا تركز على المراقبة وعزل التغييرات ونشر متوقع لبيئات متعددة الفرق.',
      },
      long: {
        en: 'Platform engineering at Rumuze applies modular design, domain boundaries, and microservices with API-first contracts. We enforce latency budgets, capacity planning, and chaos resilience to protect core flows. CI/CD pipelines standardize verification and rollback safety. Systems integrate secure identity, data consistency, and auditability across services, enabling stable evolution under changing load and compliance constraints.',
        ar: 'هندسة المنصات في روموز تعتمد التصميم المعياري وحدود النطاق والميكروسيرفيس مع عقود API أولاً. نفرض ميزانيات زمن الاستجابة وتخطيط السعة ومرونة الفوضى لحماية التدفقات الأساسية. خطوط CI/CD توحّد التحقق وأمان العودة. الأنظمة تدمج هوية آمنة واتساق البيانات وقدرة التدقيق عبر الخدمات.',
      },
      bullets: {
        en: [
          'Domain-driven modularization',
          'Microservices and API-first contracts',
          'Observability and reliability governance',
          'Resilience testing and rollback safety',
          'Secure identity and audit trails',
        ],
        ar: [
          'تجزئة موجهة بالمجال',
          'ميكروسيرفيس وعقود API أولاً',
          'قابليات المراقبة وحوكمة الموثوقية',
          'اختبارات المرونة وأمان العودة',
          'هوية آمنة وسجلات تدقيق',
        ],
      },
    },
    category: 'software',
    problemSolved: {
      en: 'Organizations operating on monolithic legacy systems that cannot scale, evolve, or integrate with modern infrastructure — causing downtime, slow releases, and blocked growth.',
      ar: 'المؤسسات التي تعمل على أنظمة قديمة أحادية لا تستطيع التوسع أو التطور أو التكامل مع البنية الحديثة — مما يسبب توقفاً وإصدارات بطيئة ونمواً معطلاً.',
    },
    targetAudience: {
      en: 'Growth-focused mid-to-large organizations undergoing digital transformation, fintech companies building scalable platforms, and enterprises needing reliable, modular systems.',
      ar: 'المؤسسات المتوسطة والكبيرة الموجهة نحو النمو التي تمر بتحول رقمي وشركات التكنولوجيا المالية التي تبني منصات قابلة للتوسع والمنظمات التي تحتاج أنظمة موثوقة ومعيارية.',
    },
    differentiators: {
      en: ['Custom architecture — never templates', 'Reliability governance from day one', 'Domain-driven design with bounded contexts', 'Full observability and automated rollback'],
      ar: ['بنية مخصصة — ليست قوالب أبداً', 'حوكمة موثوقية من اليوم الأول', 'تصميم موجه بالمجال مع حدود سياقية', 'مراقبة كاملة واسترجاع آلي'],
    },
    faqs: [
      {
        question: { en: 'How does Rumuze approach system architecture?', ar: 'كيف تتعامل روموز مع البنية المعمارية؟' },
        answer: { en: 'Rumuze uses domain-driven design to decompose systems into bounded contexts, then implements each as independent microservices with API-first contracts, automated testing, and observability pipelines.', ar: 'تستخدم روموز التصميم الموجه بالمجال لتقسيم الأنظمة إلى حدود سياقية ثم تنفذ كلاً منها كميكروسيرفيس مستقل بعقود API أولاً واختبارات آلية وخطوط مراقبة.' },
      },
    ],
    h2Sections: [
      { en: 'Infrastructure Context: Why Modular Platform Systems Require Defined Boundaries', ar: 'سياق البنية التحتية: لماذا تتطلب أنظمة المنصات المعيارية حدوداً محددة' },
      { en: 'Governance & Accountability in Distributed System Operations', ar: 'الحوكمة والمساءلة في عمليات الأنظمة الموزعة' },
      { en: 'System Integration & Architecture Across Multi-Service Environments', ar: 'تكامل الأنظمة والمعمارية عبر بيئات متعددة الخدمات' },
      { en: 'Revenue & Business Alignment Through API Contract Governance', ar: 'المواءمة مع الإيرادات والأعمال عبر حوكمة عقود API' },
      { en: 'Execution & Delivery Framework for Platform Engineering', ar: 'إطار التنفيذ والتسليم لهندسة المنصات' },
    ],
    relatedServices: ['saas-erp', 'web-development'],
    saudiContext: {
      en: 'Platform systems deployed in regulated markets operate under data governance frameworks and classification requirements. Rumuze architects systems with data locality, auditability, and multi-entity isolation built into the core design — not appended as compliance afterthoughts.',
      ar: 'تعمل أنظمة المنصات المنشورة في الأسواق المنظمة ضمن أطر حوكمة بيانات ومتطلبات تصنيف. تهندس روموز الأنظمة مع تحديد موقع البيانات وقابلية التدقيق وعزل متعدد الكيانات مدمجة في صميم التصميم.',
    },
  },
  {
    slug: 'web-development',
    title: {
      en: 'Multilingual Application Infrastructure',
      ar: 'بنية التطبيقات متعددة اللغات',
    },
    shortDescription: {
      en: 'Bilingual web application infrastructure with RTL/LTR parity, governed performance architecture, and production-grade delivery.',
      ar: 'بنية تطبيقات ويب ثنائية اللغة بتكافؤ RTL/LTR ومعمارية أداء محكومة وتسليم بجودة إنتاجية.',
    },
    summary: {
      en: 'Rumuze engineers web application infrastructure with native RTL/LTR bilingual parity, SSR/ISR performance architecture, and secure Node/Laravel backends — structured for predictable rendering, governed deployment, and production stability from the first sprint.',
      ar: 'تهندس روموز بنية تطبيقات ويب بتكافؤ ثنائي اللغة أصلي ومعمارية أداء SSR/ISR وخوادم Node/Laravel آمنة — منظمة لعرض متوقع ونشر محكوم واستقرار إنتاجي من أول سبرينت.',
    },
    keywords: ['React', 'Next.js', 'Node', 'Laravel', 'CI/CD'],
    geoScope: ['Global', 'Regulated Markets'],
    industries: ['Retail', 'Media', 'Education', 'B2B SaaS'],
    definitions: {
      short: {
        en: 'Builds accessible, performant React/Next.js frontends with secure backends, deterministic rendering, and bilingual UX under governed CI/CD.',
        ar: 'نبني واجهات React/Next.js عالية الأداء وقابلة للوصول، بخوادم آمنة، وعرض حتمي وتجربة ثنائية اللغة تحت CI/CD محكوم.',
      },
      medium: {
        en: 'We deliver predictable, accessible web applications using React/Next.js and secure Node/Laravel backends. We enforce performance budgets, accessibility rules, and caching strategies with SSR/ISR for reliable UX across locales.',
        ar: 'نقدم تطبيقات ويب متوقعة وقابلة للوصول باستخدام React/Next.js وخوادم Node/Laravel آمنة. نفرض ميزانيات الأداء وقواعد الوصول واستراتيجيات التخزين المؤقت مع SSR/ISR لتجربة موثوقة عبر اللغات.',
      },
      long: {
        en: 'Application infrastructure at Rumuze emphasizes deterministic rendering, accessibility compliance, and multilingual scalability. We use React/Next.js, Node or Laravel, and governed caching with SSR/ISR. Build pipelines enforce performance budgets and security headers. Layout systems and design tokens maintain UX consistency across right-to-left and left-to-right contexts.',
        ar: 'بنية التطبيقات في روموز تركز على عرض حتمي وامتثال الوصول وقابلية التوسع متعدد اللغات. نستخدم React/Next.js وNode أو Laravel مع تخزين مؤقت محكوم وSSR/ISR. تفرض خطوط البناء ميزانيات الأداء ورؤوس الأمان.',
      },
      bullets: {
        en: [
          'React/Next.js with SSR/ISR',
          'Performance and accessibility governance',
          'Secure Node/Laravel backends',
          'RTL/LTR design tokens',
          'Caching and CDN strategies',
        ],
        ar: [
          'React/Next.js مع SSR/ISR',
          'حوكمة الأداء والوصول',
          'خوادم Node/Laravel آمنة',
          'رموز تصميم RTL/LTR',
          'استراتيجيات التخزين المؤقت وCDN',
        ],
      },
    },
    category: 'software',
    problemSolved: {
      en: 'Organizations with web platforms that are slow, inaccessible, or lack bilingual support — resulting in reduced engagement and diminished search visibility.',
      ar: 'المؤسسات التي لديها منصات ويب بطيئة أو غير قابلة للوصول أو تفتقر لدعم ثنائي اللغة — مما يقلل التفاعل ويضعف الظهور في البحث.',
    },
    targetAudience: {
      en: 'Organizations launching web products, growth-stage companies needing production-ready applications, and enterprises requiring bilingual application infrastructure.',
      ar: 'المؤسسات التي تطلق منتجات ويب والشركات في مرحلة النمو التي تحتاج تطبيقات جاهزة للإنتاج والمؤسسات التي تتطلب بنية تطبيقات ثنائية اللغة.',
    },
    differentiators: {
      en: ['SSR/ISR for governed performance', 'Native RTL/LTR bilingual support', 'Performance budgets enforced in CI/CD', 'Production-grade from day one'],
      ar: ['SSR/ISR لأداء محكوم', 'دعم ثنائي اللغة RTL/LTR أصلي', 'ميزانيات أداء مفروضة في CI/CD', 'جودة إنتاج من اليوم الأول'],
    },
    faqs: [
      {
        question: { en: 'Does Rumuze build mobile apps?', ar: 'هل تبني روموز تطبيقات جوال؟' },
        answer: { en: 'Rumuze builds cross-platform mobile applications using React Native, sharing code with web applications for consistent UX across platforms while maintaining native performance.', ar: 'تبني روموز تطبيقات جوال متعددة المنصات باستخدام React Native، مع مشاركة الكود مع تطبيقات الويب لتجربة مستخدم متسقة عبر المنصات مع الحفاظ على أداء أصلي.' },
      },
    ],
    h2Sections: [
      { en: 'Infrastructure Context: Why Multilingual Platforms Require Governed Architecture', ar: 'سياق البنية التحتية: لماذا تتطلب المنصات متعددة اللغات معمارية محكومة' },
      { en: 'Governance & Accountability in Multilingual Platform Operations', ar: 'الحوكمة والمساءلة في عمليات المنصات متعددة اللغات' },
      { en: 'System Integration & Architecture for Cross-Locale Delivery', ar: 'تكامل الأنظمة والمعمارية للتسليم عبر اللغات' },
      { en: 'Revenue & Business Alignment Through Performance Infrastructure', ar: 'المواءمة مع الإيرادات والأعمال عبر بنية الأداء' },
      { en: 'Execution & Delivery Framework for Application Infrastructure', ar: 'إطار التنفيذ والتسليم لبنية التطبيقات' },
    ],
    relatedServices: ['software-engineering', 'saas-erp'],
    saudiContext: {
      en: 'Application platforms serving regulated markets require native multilingual support, layout fidelity across text directions, and performance characteristics suited to regional infrastructure. Rumuze builds bilingual platforms where each language operates as a first-class system — not a translation layer.',
      ar: 'تتطلب منصات التطبيقات التي تخدم الأسواق المنظمة دعماً أصلياً متعدد اللغات وأمانة تخطيط عبر اتجاهات النص وخصائص أداء مناسبة للبنية التحتية. تبني روموز منصات ثنائية اللغة حيث تعمل كل لغة كنظام أساسي.',
    },
  },
  {
    slug: 'saas-erp',
    title: {
      en: 'Multi-Tenant Operational Systems Engineering',
      ar: 'هندسة الأنظمة التشغيلية متعددة المستأجرين',
    },
    shortDescription: {
      en: 'Multi-tenant operational platforms with strict data isolation, module governance, and compliance-aware architecture.',
      ar: 'منصات تشغيلية متعددة المستأجرين بعزل بيانات صارم وحوكمة وحدات ومعمارية واعية بالامتثال.',
    },
    summary: {
      en: 'Rumuze engineers multi-tenant operational platforms with enforced data isolation, governed module delivery, and compliance-aware integrations — designed for organizations operating in regulated and competitive markets globally.',
      ar: 'تهندس روموز منصات تشغيلية متعددة المستأجرين بعزل بيانات مفروض وتسليم وحدات محكوم وتكاملات واعية بالامتثال — مصممة للمؤسسات العاملة في أسواق منظمة وتنافسية عالمياً.',
    },
    keywords: ['SaaS', 'ERP', 'tenant isolation', 'integration'],
    geoScope: ['Global', 'Regulated Markets'],
    industries: ['Fintech', 'Supply Chain', 'Manufacturing', 'Government'],
    definitions: {
      short: {
        en: 'Multi-tenant SaaS and ERP modules with strict tenant isolation, financial/HR/inventory workflows, and compliance-focused integrations.',
        ar: 'منصات SaaS متعددة المستأجرين ووحدات ERP بعزل صارم، وتدفقات مالية/موارد/مخزون، وتكاملات محكومة بالامتثال.',
      },
      medium: {
        en: 'We build multi-tenant SaaS with enforced isolation and custom ERP modules (finance, HR, inventory). We migrate legacy data, orchestrate integrations, and maintain role-based access and auditability.',
        ar: 'نبني SaaS متعدد المستأجرين بعزل مُنفّذ ووحدات ERP مخصصة (مالية، موارد، مخزون). نرحّل البيانات وننسّق التكاملات ونحافظ على صلاحيات الدور وقدرة التدقيق.',
      },
      long: {
        en: 'Our SaaS and ERP engineering combines tenant isolation, secure data boundaries, and modular workflows. We implement finance, HR, and inventory modules with robust permissions, audit logs, and migration utilities. Integrations follow domain contracts and stability guarantees under regional compliance constraints.',
        ar: 'تجمع هندسة SaaS وERP لدينا بين عزل المستأجرين وحدود بيانات آمنة وتدفقات معيارية. ننفذ وحدات المالية والموارد والمخزون بصلاحيات قوية وسجلات تدقيق وأدوات ترحيل. تتبع التكاملات عقود المجال وضمانات الاستقرار ضمن قيود الامتثال الإقليمية.',
      },
      bullets: {
        en: [
          'Tenant isolation and data boundaries',
          'Finance, HR, inventory modules',
          'RBAC and audit logging',
          'Legacy migration tooling',
          'Contract-based integrations',
        ],
        ar: [
          'عزل المستأجرين وحدود البيانات',
          'وحدات المالية والموارد والمخزون',
          'صلاحيات أدوار وسجلات تدقيق',
          'أدوات ترحيل الأنظمة القديمة',
          'تكاملات قائمة على العقود',
        ],
      },
    },
    category: 'software',
    problemSolved: {
      en: 'Organizations running critical operations on fragmented spreadsheets, disconnected tools, or generic SaaS that cannot handle multi-tenant requirements, compliance standards, or custom workflows.',
      ar: 'المؤسسات التي تدير عمليات حرجة على جداول بيانات مجزأة أو أدوات منفصلة أو SaaS عام لا يتعامل مع متطلبات تعدد المستأجرين أو معايير الامتثال أو أعمال مخصصة.',
    },
    targetAudience: {
      en: 'Organizations needing custom operational platforms, SaaS founders building multi-tenant systems, and enterprises migrating from legacy or off-the-shelf solutions.',
      ar: 'المؤسسات التي تحتاج منصات تشغيلية مخصصة ومؤسسو SaaS الذين يبنون أنظمة متعددة المستأجرين والمنظمات التي تنتقل من حلول قديمة أو جاهزة.',
    },
    differentiators: {
      en: ['True multi-tenancy with data isolation', 'Custom modules — not plugin workarounds', 'Legacy system migration expertise', 'Compliance governance built in'],
      ar: ['تعدد مستأجرين حقيقي بعزل بيانات', 'وحدات مخصصة — ليست حلول إضافات', 'خبرة ترحيل الأنظمة القديمة', 'حوكمة امتثال مدمجة'],
    },
    faqs: [
      {
        question: { en: 'Can Rumuze migrate our existing systems?', ar: 'هل تستطيع روموز ترحيل أنظمتنا الحالية؟' },
        answer: { en: 'Yes, Rumuze performs legacy system migrations with data mapping, validation, parallel running, and phased cutover to minimize business disruption during the transition.', ar: 'نعم، تجري روموز ترحيلات الأنظمة القديمة مع ربط البيانات والتحقق والتشغيل المتوازي والانتقال المرحلي لتقليل تعطيل الأعمال أثناء الانتقال.' },
      },
    ],
    h2Sections: [
      { en: 'Infrastructure Context: Why Multi-Tenant Platforms Require Isolated Data Architecture', ar: 'سياق البنية التحتية: لماذا تتطلب المنصات المتعددة عزل البيانات' },
      { en: 'Governance & Accountability in Operational System Implementations', ar: 'الحوكمة والمساءلة في تطبيقات الأنظمة التشغيلية' },
      { en: 'System Integration & Architecture for Multi-Entity Operations', ar: 'تكامل الأنظمة والمعمارية للعمليات متعددة الكيانات' },
      { en: 'Revenue & Business Alignment Through Operational System Integration', ar: 'المواءمة مع الإيرادات والأعمال عبر تكامل الأنظمة التشغيلية' },
      { en: 'Execution & Delivery Framework for Operational Platform Engineering', ar: 'إطار التنفيذ والتسليم لهندسة المنصات التشغيلية' },
    ],
    relatedServices: ['software-engineering', 'performance-marketing', 'marketing-infrastructure'],
    saudiContext: {
      en: 'Operational platforms deployed in regulated markets operate under sector-specific reporting structures and compliance requirements. Rumuze engineers operational modules with regulatory boundaries defined in the architecture — not handled through workarounds after delivery.',
      ar: 'تعمل المنصات التشغيلية المنشورة في الأسواق المنظمة ضمن هياكل تقارير خاصة بالقطاع ومتطلبات امتثال. تهندس روموز الوحدات التشغيلية مع حدود تنظيمية محددة في البنية.',
    },
  },
  {
    slug: 'marketing-infrastructure',
    title: {
      en: 'Marketing Automation & Data Pipeline Engineering',
      ar: 'هندسة أتمتة التسويق وخطوط البيانات',
    },
    shortDescription: {
      en: 'Governed marketing technology infrastructure with attribution modeling, CDP integration, and consent-compliant data pipelines.',
      ar: 'بنية تقنية تسويقية محكومة بنمذجة إسناد وتكامل CDP وخطوط بيانات متوافقة مع الموافقات',
    },
    summary: {
      en: 'Rumuze implements marketing technology infrastructure with governed data flows, multi-touch attribution modeling, CDP integration, and consent-compliant pipelines — structured for measurable acquisition outcomes and audit-ready operations.',
      ar: 'تنفذ روموز بنية تقنية تسويقية بتدفقات بيانات محكومة ونمذجة إسناد متعدد اللمس وتكامل CDP وخطوط متوافقة مع الموافقات — منظمة لنتائج اكتساب قابلة للقياس وعمليات جاهزة للتدقيق.',
    },
    keywords: ['Martech', 'analytics', 'attribution', 'CDP', 'automation'],
    geoScope: ['Global', 'Regulated Markets'],
    industries: ['Retail', 'Media', 'E-commerce', 'B2C'],
    definitions: {
      short: {
        en: 'Martech stacks integrating analytics, attribution, automation, and CDP with data quality, privacy controls, and measurable growth outcomes.',
        ar: 'طبقات Martech تدمج التحليلات والإسناد والأتمتة وCDP مع جودة البيانات وضوابط الخصوصية ونتائج نمو قابلة للقياس.',
      },
      medium: {
        en: 'We implement analytics, attribution modeling, automation workflows, and CDP integration. We maintain data deduplication, consent tracking, and pipeline observability for reliable marketing operations.',
        ar: 'ننّفذ التحليلات ونمذجة الإسناد وأتمتة العمليات وتكامل CDP. نحافظ على إزالة التكرار وتتبع الموافقات وقابليات المراقبة لضمان تشغيل تسويقي موثوق.',
      },
      long: {
        en: 'Our marketing infrastructure focuses on governed data flows, attribution confidence, and automation orchestration. We integrate CDP, analytics, and consent systems, ensuring identity resolution, deduplication, and policy compliance. Dashboards drive measurable growth with transparent metrics.',
        ar: 'تركّز بنية التسويق لدينا على تدفقات بيانات محكومة وثقة الإسناد وتنسيق الأتمتة. ندمج CDP والتحليلات وأنظمة الموافقات، مع حل الهوية وإزالة التكرار والامتثال للسياسات. تدفع لوحات القياس نموًا قابلاً للقياس بمؤشرات شفافة.',
      },
      bullets: {
        en: [
          'Analytics and attribution',
          'Automation orchestration',
          'CDP integration and identity resolution',
          'Consent and privacy controls',
          'Growth dashboards and KPIs',
        ],
        ar: [
          'تحليلات وإسناد',
          'تنسيق الأتمتة',
          'تكامل CDP وحل الهوية',
          'ضوابط الموافقات والخصوصية',
          'لوحات نمو ومؤشرات الأداء',
        ],
      },
    },
    category: 'marketing',
    problemSolved: {
      en: 'Organizations wasting marketing budgets due to fragmented analytics, broken attribution, and manual workflows that prevent data-driven decision making.',
      ar: 'المؤسسات التي تهدر ميزانيات التسويق بسبب التحليلات المجزأة والإسناد المعطل وأعمال يدوية تمنع اتخاذ قرارات قائمة على البيانات.',
    },
    targetAudience: {
      en: 'Marketing teams in mid-to-large organizations that need unified analytics, automated workflows, and reliable attribution to scale performance marketing.',
      ar: 'فرق التسويق في المؤسسات المتوسطة والكبيرة التي تحتاج تحليلات موحدة وأعمال مؤتمتة وإسناد موثوق لتوسيع التسويق الأدائي.',
    },
    differentiators: {
      en: [
        'Full-stack martech implementation — not just tool selection',
        'Server-side tracking for accurate attribution despite ad blockers',
        'Data deduplication and identity resolution across platforms',
        'Privacy-compliant architecture with consent management built in',
      ],
      ar: [
        'تنفيذ مارتيك متكامل — ليس مجرد اختيار أدوات',
        'تتبع من جانب الخادم لإسناد دقيق رغم حاصرات الإعلانات',
        'إزالة تكرار البيانات وحل الهوية عبر المنصات',
        'بنية متوافقة مع الخصوصية بإدارة موافقات مدمجة',
      ],
    },
    faqs: [
      {
        question: { en: 'What marketing platforms does Rumuze integrate?', ar: 'ما منصات التسويق التي تدمجها روموز؟' },
        answer: { en: 'Rumuze integrates Google Analytics 4, Meta Ads, Google Ads, HubSpot, Segment, and custom CDP solutions with server-side tracking and unified dashboards.', ar: 'تدمج روموز Google Analytics 4 وMeta Ads وGoogle Ads وHubSpot وSegment وحلول CDP مخصصة مع تتبع خادم ولوحات موحدة.' },
      },
    ],
    h2Sections: [
      { en: 'Infrastructure Context: Why Marketing Requires Governed Data Architecture', ar: 'سياق البنية التحتية: لماذا يتطلب التسويق معمارية بيانات محكومة' },
      { en: 'Governance & Accountability in Multi-Channel Marketing Operations', ar: 'الحوكمة والمساءلة في عمليات التسويق متعددة القنوات' },
      { en: 'System Integration & Architecture for Multilingual Marketing Infrastructure', ar: 'تكامل الأنظمة والمعمارية لبنية التسويق متعددة اللغات' },
      { en: 'Revenue & Business Alignment Through Attribution Integration', ar: 'المواءمة مع الإيرادات والأعمال عبر تكامل الإسناد' },
      { en: 'Execution & Delivery Framework with Defined KPI Governance', ar: 'إطار التنفيذ والتسليم بحوكمة مؤشرات أداء محددة' },
    ],
    relatedServices: ['performance-marketing', 'seo-services'],
    saudiContext: {
      en: 'Marketing data infrastructure in regulated markets must account for data residency requirements and platform-specific consent obligations. Rumuze structures marketing technology stacks with privacy controls built into the data collection layer — not applied as tag configurations after deployment.',
      ar: 'يجب أن تأخذ بنية بيانات التسويق في الأسواق المنظمة في الاعتبار متطلبات إقامة البيانات والتزامات الموافقة. تهيكل روموز طبقات التقنية التسويقية بضوابط خصوصية مدمجة في طبقة جمع البيانات.',
    },
  },
  // ── Performance Marketing ──────────────────────────────────────────────
  {
    slug: 'performance-marketing',
    title: {
      en: 'Customer Acquisition Systems Engineering',
      ar: 'هندسة أنظمة اكتساب العملاء',
    },
    shortDescription: {
      en: 'Revenue-attributed paid acquisition with server-side tracking, multi-touch attribution, and defined ROAS governance.',
      ar: 'اكتساب مدفوع منسوب للإيرادات مع تتبع خادم وإسناد متعدد اللمس وحوكمة عائد إعلاني محددة.',
    },
    summary: {
      en: 'Rumuze engineers customer acquisition campaigns across Google Ads, Meta Ads, and LinkedIn with server-side tracking infrastructure, multi-touch attribution modeling, and documented ROAS governance — structured for measurable revenue outcomes, not impressions.',
      ar: 'تهندس روموز حملات اكتساب العملاء عبر Google Ads وMeta Ads وLinkedIn ببنية تتبع خادم ونمذجة إسناد متعدد اللمس وحوكمة عائد إعلاني موثقة — منظمة لنتائج إيرادات قابلة للقياس.',
    },
    keywords: ['PPC', 'Google Ads', 'Meta Ads', 'ROAS', 'CPA', 'attribution'],
    geoScope: ['Global', 'Regulated Markets'],
    industries: ['E-commerce', 'SaaS', 'Real Estate', 'Healthcare', 'Education'],
    definitions: {
      short: {
        en: 'Manages paid campaigns with server-side tracking, attribution modeling, and ROAS optimization across Google, Meta, and LinkedIn ad platforms.',
        ar: 'إدارة حملات مدفوعة مع تتبع خادم ونمذجة إسناد وتحسين العائد الإعلاني عبر منصات Google وMeta وLinkedIn.',
      },
      medium: {
        en: 'Rumuze runs acquisition campaigns with measurement infrastructure first. We implement server-side tracking (Meta CAPI, GA4), build multi-touch attribution models, run systematic creative testing, and optimize toward revenue metrics — not vanity metrics like impressions.',
        ar: 'تدير روموز حملات الاكتساب ببنية قياس أولاً. ننفذ تتبع خادم ونبني نماذج إسناد متعدد اللمس ونجري اختبارات إبداعية منهجية ونحسّن نحو مقاييس الإيرادات.',
      },
      long: {
        en: 'Customer acquisition at Rumuze starts with measurement infrastructure — server-side tracking, conversion APIs, and clean data pipelines. We build campaigns on verified data with multi-touch attribution, behavioral audience segmentation, systematic A/B creative rotation, and ROAS-governed bidding strategies. Every campaign ties back to revenue impact with transparent dashboards and structured weekly reporting.',
        ar: 'يبدأ اكتساب العملاء في روموز ببنية القياس — تتبع خادم وواجهات تحويل وخطوط بيانات نظيفة. نبني الحملات على بيانات مُحققة مع إسناد متعدد اللمس وتقسيم جمهور سلوكي وتدوير إبداعي A/B منهجي واستراتيجيات مزايدة محكومة بالعائد.',
      },
      bullets: {
        en: ['Google Ads & Meta Ads management', 'Server-side tracking (CAPI + GA4)', 'Multi-touch attribution modeling', 'Creative A/B testing framework', 'ROAS & revenue-focused optimization'],
        ar: ['إدارة Google Ads وMeta Ads', 'تتبع خادم (CAPI + GA4)', 'نمذجة إسناد متعدد اللمس', 'إطار اختبار إبداعي A/B', 'تحسين مركز على العائد والإيرادات'],
      },
    },
    category: 'marketing',
    problemSolved: {
      en: 'Enterprises spending on paid advertising without measurement infrastructure, defined attribution, or documented performance governance — resulting in unaccountable budgets and inability to tie spend to revenue.',
      ar: 'المؤسسات التي تنفق على الإعلانات دون بنية قياس أو إسناد محدد أو حوكمة أداء موثقة — مما يؤدي إلى ميزانيات غير خاضعة للمساءلة.',
    },
    targetAudience: {
      en: 'Enterprises and growth-stage companies with defined acquisition budgets who require documented ROAS governance, attribution clarity, and structured performance reporting.',
      ar: 'المؤسسات وشركات مرحلة النمو التي تمتلك ميزانيات اكتساب محددة وتتطلب حوكمة عائد إعلاني موثقة ووضوح إسناد وتقارير أداء منظمة.',
    },
    differentiators: {
      en: ['Measurement infrastructure before any ad spend', 'Revenue metrics, not vanity metrics', 'Systematic testing instead of guesswork', 'Full-funnel attribution, not last-click'],
      ar: ['بنية قياس قبل أي إنفاق إعلاني', 'مقاييس إيرادات وليس مقاييس شكلية', 'اختبار منهجي بدل التخمين', 'إسناد كامل المسار وليس النقرة الأخيرة'],
    },
    faqs: [
      {
        question: { en: 'What ad platforms does Rumuze manage?', ar: 'ما المنصات الإعلانية التي تديرها روموز؟' },
        answer: { en: 'Rumuze manages Google Ads, Meta Ads (Facebook + Instagram), LinkedIn Ads, TikTok Ads, and programmatic display campaigns, with unified tracking and attribution across all channels.', ar: 'تدير روموز Google Ads وMeta Ads وLinkedIn Ads وTikTok Ads وحملات عرض برمجية، مع تتبع وإسناد موحد عبر القنوات.' },
      },
      {
        question: { en: 'How are ROAS targets established?', ar: 'كيف تُحدد أهداف العائد الإعلاني؟' },
        answer: { en: 'ROAS targets are defined in the Statement of Work before any campaign begins, based on documented industry benchmarks, client margin data, and agreed acquisition costs. Performance is reported weekly against these targets — not adjusted retroactively.', ar: 'تُحدد أهداف العائد الإعلاني في بيان العمل قبل بدء أي حملة، بناءً على معايير الصناعة الموثقة وبيانات هوامش العميل وتكاليف الاكتساب المتفق عليها.' },
      },
    ],
    h2Sections: [
      { en: 'Infrastructure Context: Why Acquisition Requires Measurement Before Launch', ar: 'سياق البنية التحتية: لماذا يتطلب الاكتساب قياساً قبل الإطلاق' },
      { en: 'Governance & Accountability in Multi-Channel Acquisition Systems', ar: 'الحوكمة والمساءلة في أنظمة الاكتساب متعددة القنوات' },
      { en: 'System Integration & Architecture for Multilingual Campaign Delivery', ar: 'تكامل الأنظمة والمعمارية لتسليم حملات متعددة اللغات' },
      { en: 'Revenue & Business Alignment Through Acquisition Data Integration', ar: 'المواءمة مع الإيرادات عبر تكامل بيانات الاكتساب' },
      { en: 'Execution & Delivery Framework with Defined Performance Governance', ar: 'إطار التنفيذ والتسليم بحوكمة أداء محددة' },
    ],
    relatedServices: ['marketing-infrastructure', 'seo-services'],
    saudiContext: {
      en: 'Acquisition campaigns in regulated markets require platform-specific creative standards, multilingual ad copy governance, and compliance with advertising guidelines. Rumuze structures bilingual campaign architecture where each language creative is developed independently — not translated from source material.',
      ar: 'تتطلب حملات الاكتساب في الأسواق المنظمة معايير إبداعية خاصة بالمنصة وحوكمة نصوص إعلانية متعددة اللغات والامتثال لإرشادات الإعلانات. تهيكل روموز بنية حملات ثنائية اللغة حيث يُطور كل محتوى لغوي بشكل مستقل.',
    },
  },
  // ── SEO Services ──────────────────────────────────────────────────────
  {
    slug: 'seo-services',
    title: {
      en: 'Technical SEO & AI Visibility Engineering',
      ar: 'هندسة SEO التقني والظهور أمام الذكاء الاصطناعي',
    },
    shortDescription: {
      en: 'Structured data implementation, semantic architecture, and generative engine optimization for enterprise search presence.',
      ar: 'تنفيذ بيانات مهيكلة وبنية دلالية وتحسين محركات توليدية للحضور المؤسسي في محركات البحث.',
    },
    summary: {
      en: 'Rumuze delivers technical SEO infrastructure, structured data implementation, bilingual semantic content architecture, and GEO/AEO optimization — engineered for enterprise organizations requiring measurable organic authority and AI search presence.',
      ar: 'تقدم روموز بنية SEO تقنية وتنفيذ بيانات مهيكلة وبنية محتوى دلالي ثنائي اللغة وتحسين GEO/AEO — مهندسة للمؤسسات التي تتطلب سلطة عضوية قابلة للقياس وحضوراً في محركات البحث الذكية.',
    },
    keywords: ['SEO', 'technical SEO', 'GEO', 'AEO', 'structured data', 'Core Web Vitals'],
    geoScope: ['Global', 'Regulated Markets'],
    industries: ['E-commerce', 'SaaS', 'Healthcare', 'Real Estate', 'Professional Services'],
    definitions: {
      short: {
        en: 'Technical SEO, semantic content strategy, structured data implementation, and GEO/AEO optimization for traditional and AI-powered search engines.',
        ar: 'SEO تقني واستراتيجية محتوى دلالي وتنفيذ بيانات مهيكلة وتحسين GEO/AEO لمحركات البحث التقليدية والذكية.',
      },
      medium: {
        en: 'Rumuze delivers SEO built on technical infrastructure — Core Web Vitals, crawlability, structured data, and security headers. We create semantic content aligned with search intent, implement JSON-LD schemas for entity clarity, and optimize for AI citation through GEO and AEO engineering.',
        ar: 'تقدم روموز SEO مبني على بنية تحتية تقنية — Core Web Vitals والزحف والبيانات المهيكلة ورؤوس الأمان. ننشئ محتوى دلالياً ونفذ ترميز JSON-LD ونحسّن للاستشهاد الذكي.',
      },
      long: {
        en: 'Technical SEO at Rumuze combines infrastructure optimization, semantic content strategy, and AI visibility engineering. We audit and resolve technical foundations, develop content strategies aligned with enterprise search queries, implement comprehensive schema markup, and optimize for generative AI engines through entity-clear content structure and chunkable information architecture.',
        ar: 'يجمع SEO التقني في روموز بين تحسين البنية التحتية واستراتيجية المحتوى الدلالي وهندسة الظهور أمام الذكاء الاصطناعي. ندقق ونحل الأسس التقنية ونطور استراتيجيات محتوى ونفذ ترميز Schema شامل ونحسّن لمحركات الذكاء الاصطناعي التوليدية.',
      },
      bullets: {
        en: ['Technical SEO audits and optimization', 'Core Web Vitals improvement', 'Structured data (JSON-LD) implementation', 'GEO/AEO for AI search engines', 'Bilingual SEO (Arabic + English)'],
        ar: ['تدقيقات وتحسين SEO التقني', 'تحسين Core Web Vitals', 'تنفيذ البيانات المهيكلة (JSON-LD)', 'GEO/AEO لمحركات البحث الذكية', 'SEO ثنائي اللغة (عربي + إنجليزي)'],
      },
    },
    category: 'marketing',
    problemSolved: {
      en: 'Enterprise websites with low organic visibility, inadequate technical foundations, missing structured data, and no presence in AI-powered search results — failing to capture demand from decision-makers conducting research in both Arabic and English.',
      ar: 'مواقع المؤسسات ذات الظهور العضوي المنخفض والأسس التقنية غير الكافية والبيانات المهيكلة المفقودة وعدم الحضور في نتائج البحث الذكية.',
    },
    targetAudience: {
      en: 'Enterprise organizations that require structured organic search presence, AI citation readiness, and bilingual technical SEO across Arabic and English markets.',
      ar: 'المؤسسات التي تتطلب حضوراً عضوياً منظماً وجاهزية استشهاد الذكاء الاصطناعي وSEO تقني ثنائي اللغة.',
    },
    differentiators: {
      en: ['GEO/AEO optimization for AI-era search', 'Engineering-grade technical SEO infrastructure', 'Native bilingual Arabic-English optimization', 'Comprehensive schema markup for entity authority'],
      ar: ['تحسين GEO/AEO لعصر البحث الذكي', 'بنية SEO تقني بجودة هندسية', 'تحسين ثنائي اللغة عربي-إنجليزي أصلي', 'ترميز Schema شامل لسلطة الكيانات'],
    },
    faqs: [
      {
        question: { en: 'What is GEO/AEO optimization?', ar: 'ما هو تحسين GEO/AEO؟' },
        answer: { en: 'GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) are structured content engineering practices to ensure organizational content is accurately cited by AI-powered search systems including ChatGPT, Perplexity, and Google AI Overviews. Rumuze implements entity-clear content architecture, direct-answer formatting, and JSON-LD schema markup to meet AI citation standards.', ar: 'GEO وAEO هي ممارسات هندسة محتوى منظمة لضمان الاستشهاد بمحتوى المؤسسة بدقة من أنظمة البحث الذكية. تنفذ روموز بنية محتوى واضحة الكيانات وتنسيق إجابات مباشرة وترميز JSON-LD.' },
      },
      {
        question: { en: 'How does Rumuze approach bilingual SEO for Arabic markets?', ar: 'كيف تتعامل روموز مع SEO ثنائي اللغة للأسواق العربية؟' },
        answer: { en: 'Rumuze implements Arabic SEO as a primary technical discipline — not a translation of English SEO. We develop separate Arabic keyword architectures, Arabic-specific structured data, RTL-optimized technical infrastructure, and Arabic entity schemas aligned with how Arabic-speaking audiences conduct enterprise research queries.', ar: 'تنفذ روموز SEO العربي كتخصص تقني أساسي — وليس ترجمة لـ SEO الإنجليزي. نطور بنى كلمات مفتاحية عربية منفصلة وبيانات مهيكلة خاصة بالعربية وبنية تقنية محسّنة لـ RTL.' },
      },
    ],
    h2Sections: [
      { en: 'Infrastructure Context: Why Search Visibility Requires Technical Foundation', ar: 'سياق البنية التحتية: لماذا يتطلب الظهور في البحث أساساً تقنياً' },
      { en: 'Governance & Accountability in Structured Data Architecture', ar: 'الحوكمة والمساءلة في معمارية البيانات المهيكلة' },
      { en: 'System Integration & Architecture for Bilingual Search Presence', ar: 'تكامل الأنظمة والمعمارية للحضور ثنائي اللغة في البحث' },
      { en: 'Revenue & Business Alignment Through AI Citation Readiness', ar: 'المواءمة مع الإيرادات عبر جاهزية استشهاد الذكاء الاصطناعي' },
      { en: 'Execution & Delivery Framework with Measurable Organic Outcomes', ar: 'إطار التنفيذ والتسليم بنتائج عضوية قابلة للقياس' },
    ],
    relatedServices: ['marketing-infrastructure', 'social-media'],
    saudiContext: {
      en: 'Search visibility in regulated markets requires multilingual content architecture, structured data aligned with regional search behavior, and optimization for language-specific query patterns. Rumuze engineers bilingual SEO systems where each language ranking is governed independently.',
      ar: 'يتطلب الظهور في البحث في الأسواق المنظمة بنية محتوى متعددة اللغات وبيانات مهيكلة متوافقة مع سلوك البحث الإقليمي. تهندس روموز أنظمة SEO ثنائية اللغة حيث تُدار تصنيفات كل لغة بشكل مستقل.',
    },
  },
  // ── Social Media Management ────────────────────────────────────────────
  {
    slug: 'social-media',
    title: {
      en: 'Brand Infrastructure & Community Governance',
      ar: 'بنية العلامة التجارية وحوكمة المجتمع',
    },
    shortDescription: {
      en: 'Structured bilingual social media management with revenue attribution and platform-specific content governance.',
      ar: 'إدارة استراتيجية ثنائية اللغة لوسائل التواصل مع إسناد إيرادات وحوكمة محتوى خاصة بكل منصة.',
    },
    summary: {
      en: 'Rumuze delivers structured social media management across Instagram, LinkedIn, X, and TikTok — with bilingual content governance, community accountability, paid social integration, and revenue attribution that ties social activity to measurable enterprise outcomes.',
      ar: 'تقدم روموز إدارة منظمة لوسائل التواصل عبر إنستغرام ولينكدإن وX وتيك توك — بحوكمة محتوى ثنائية اللغة ومساءلة مجتمعية وتكامل إعلانات اجتماعية وإسناد إيرادات.',
    },
    keywords: ['social media', 'content strategy', 'community management', 'paid social'],
    geoScope: ['Global', 'Regulated Markets'],
    industries: ['E-commerce', 'F&B', 'Real Estate', 'Healthcare', 'Education'],
    definitions: {
      short: {
        en: 'Strategic social media management with content creation, community engagement, paid social campaigns, and performance analytics.',
        ar: 'إدارة استراتيجية لوسائل التواصل مع إنشاء محتوى وتفاعل مجتمعي وحملات مدفوعة وتحليلات أداء.',
      },
      medium: {
        en: 'Rumuze manages social media as a growth channel, not just a posting schedule. We develop content strategies aligned with business goals, manage community engagement, run paid social campaigns with proper tracking, and report on metrics that matter — leads, conversions, and brand authority.',
        ar: 'تدير روموز وسائل التواصل كقناة نمو وليس مجرد جدول نشر. نطور استراتيجيات محتوى متوافقة مع أهداف الأعمال وندير التفاعل المجتمعي ونشغل حملات مدفوعة بتتبع سليم ونقدم تقارير عن المقاييس المهمة — العملاء المحتملون والتحويلات وسلطة العلامة.',
      },
      long: {
        en: 'Social media management at Rumuze integrates with the broader marketing and software infrastructure. We create platform-specific content strategies, manage bilingual communities (Arabic + English), run paid social campaigns integrated with server-side tracking, and measure impact through lead generation and revenue attribution — not just likes and followers.',
        ar: 'تتكامل إدارة وسائل التواصل في روموز مع البنية التحتية الأوسع للتسويق والبرمجيات. ننشئ استراتيجيات محتوى خاصة بكل منصة وندير مجتمعات ثنائية اللغة وننفذ حملات مدفوعة متكاملة مع التتبع ونقيس التأثير عبر توليد العملاء وإسناد الإيرادات — وليس مجرد الإعجابات والمتابعين.',
      },
      bullets: {
        en: ['Content strategy and creation', 'Bilingual community management', 'Paid social campaign management', 'Analytics and performance reporting', 'Brand authority building'],
        ar: ['استراتيجية وإنشاء المحتوى', 'إدارة مجتمع ثنائي اللغة', 'إدارة حملات اجتماعية مدفوعة', 'تحليلات وتقارير الأداء', 'بناء سلطة العلامة التجارية'],
      },
    },
    category: 'marketing',
    problemSolved: {
      en: 'Brands with inconsistent social media presence, no content strategy, low engagement, and inability to connect social activity to business outcomes.',
      ar: 'العلامات ذات التواجد غير المنتظم على التواصل وبدون استراتيجية محتوى ومشاركة منخفضة وعدم القدرة على ربط النشاط الاجتماعي بنتائج الأعمال.',
    },
    targetAudience: {
      en: 'B2B and B2C brands that need bilingual social media presence with measurable business impact beyond vanity metrics.',
      ar: 'علامات B2B وB2C التي تحتاج تواجداً ثنائي اللغة على التواصل بتأثير أعمال قابل للقياس يتجاوز المقاييس الشكلية.',
    },
    differentiators: {
      en: ['Bilingual Arabic + English content natively', 'Integrated with paid media and SEO strategy', 'Revenue attribution, not just engagement', 'Data-driven content testing'],
      ar: ['محتوى عربي + إنجليزي أصلي', 'متكامل مع الإعلانات واستراتيجية SEO', 'إسناد إيرادات وليس مجرد تفاعل', 'اختبار محتوى قائم على البيانات'],
    },
    faqs: [
      {
        question: { en: 'Which social media platforms does Rumuze manage?', ar: 'ما منصات التواصل التي تديرها روموز؟' },
        answer: { en: 'Rumuze manages Instagram, LinkedIn, X (Twitter), TikTok, and Facebook with platform-specific content strategies. We also manage YouTube channels for clients with video content needs.', ar: 'تدير روموز إنستغرام ولينكدإن وX (تويتر) وتيك توك وفيسبوك باستراتيجيات محتوى خاصة بكل منصة. كما ندير قنوات يوتيوب للعملاء الذين لديهم احتياجات محتوى فيديو.' },
      },
    ],
    h2Sections: [
      { en: 'Infrastructure Context: Why Brand Presence Requires Content Governance', ar: 'سياق البنية التحتية: لماذا يتطلب حضور العلامة حوكمة المحتوى' },
      { en: 'Governance & Accountability in Community Engagement Operations', ar: 'الحوكمة والمساءلة في عمليات التفاعل المجتمعي' },
      { en: 'System Integration & Architecture for Bilingual Brand Infrastructure', ar: 'تكامل الأنظمة والمعمارية لبنية العلامة ثنائية اللغة' },
      { en: 'Revenue & Business Alignment Through Social Attribution', ar: 'المواءمة مع الإيرادات عبر إسناد التواصل' },
      { en: 'Execution & Delivery Framework with Defined Reporting Cadence', ar: 'إطار التنفيذ والتسليم بإيقاع تقارير محدد' },
    ],
    relatedServices: ['seo-services', 'performance-marketing'],
    saudiContext: {
      en: 'Social media management for organizations in regulated markets requires platform-specific content standards, multilingual community management protocols, and content approval workflows appropriate for compliance-sensitive industries. Rumuze manages multilingual communities as a primary function — not a translated overlay.',
      ar: 'تتطلب إدارة وسائل التواصل للمؤسسات في الأسواق المنظمة معايير محتوى خاصة بكل منصة وبروتوكولات إدارة مجتمع متعددة اللغات. تدير روموز المجتمعات متعددة اللغات كوظيفة أساسية.',
    },
  },
];

