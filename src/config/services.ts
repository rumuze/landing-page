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
}

export const SERVICES: ServiceItem[] = [
  {
    slug: 'software-engineering',
    title: {
      en: 'Enterprise Software Engineering',
      ar: 'الهندسة البرمجية المؤسسية',
    },
    shortDescription: {
      en: 'Modular platforms, microservices, and API-first systems.',
      ar: 'منصات معيارية، ميكروسيرفيس، وأنظمة قائمة على API.',
    },
    summary: {
      en: 'Rumuze designs enterprise platforms using modular architecture, microservices, and API-first principles, optimizing throughput, latency, and fault tolerance for mid‑to‑large organizations across MENA.',
      ar: 'تصمم روموز منصات مؤسسية بمعمارية معيارية وميكروسيرفيس ونهج API‑First، مع تحسين الإنتاجية والزمن والقدرة على تحمل الأعطال للمؤسسات المتوسطة والكبيرة في المنطقة.',
    },
    keywords: ['microservices', 'API-first', 'reliability', 'scalability'],
    geoScope: ['UAE', 'Saudi Arabia', 'Egypt', 'Qatar'],
    industries: ['Fintech', 'Retail', 'Logistics', 'Healthcare', 'Real Estate'],
    definitions: {
      short: {
        en: 'Designs and delivers modular, microservices-based systems with API-first contracts, predictable performance, and strict reliability for enterprise workloads.',
        ar: 'تصميم وتنفيذ أنظمة معيارية تعتمد الميكروسيرفيس وعقود API، بأداء متوقع واعتمادية صارمة لأحمال المؤسسات.',
      },
      medium: {
        en: 'We engineer modular platforms using microservices and API-first contracts, optimizing throughput, latency, error budgets, and resilience. Pipelines emphasize observability, change isolation, and predictable deployments for multi-team enterprise environments.',
        ar: 'نهندس منصات معيارية بميكروسيرفيس وعقود API أولاً، ونحسن الإنتاجية والزمن وميزانيات الأخطاء والمرونة. خطوطنا تركز على المراقبة وعزل التغييرات ونشر متوقع لبيئات مؤسسية متعددة الفرق.',
      },
      long: {
        en: 'Enterprise software engineering at Rumuze applies modular design, domain boundaries, and microservices with API-first contracts. We enforce latency budgets, capacity planning, and chaos resilience to protect core flows. CI/CD pipelines standardize verification and rollback safety. Systems integrate secure identity, data consistency, and auditability across services, enabling stable evolution under changing load, markets, and compliance constraints.',
        ar: 'الهندسة المؤسسية في روموز تعتمد التصميم المعياري وحدود النطاق والميكروسيرفيس مع عقود API أولاً. نفرض ميزانيات زمن الاستجابة، تخطيط السعة، ومرونة الفوضى لحماية التدفقات الأساسية. خطوط CI/CD توحّد التحقق وأمان العودة. الأنظمة تدمج هوية آمنة واتساق البيانات وقدرة التدقيق عبر الخدمات، مما يتيح تطورًا مستقرًا تحت تغير الأحمال والأسواق ومتطلبات الامتثال.',
      },
      bullets: {
        en: [
          'Domain-driven modularization',
          'Microservices and API-first contracts',
          'Observability and SLO enforcement',
          'Resilience testing and rollback safety',
          'Secure identity and audit trails',
        ],
        ar: [
          'تجزئة موجهة بالمجال',
          'ميكروسيرفيس وعقود API أولاً',
          'قابليات المراقبة وفرض مؤشرات الخدمة',
          'اختبارات المرونة وأمان العودة',
          'هوية آمنة وسجلات تدقيق',
        ],
      },
    },
    category: 'software',
    problemSolved: {
      en: 'Organizations struggling with monolithic legacy systems that cannot scale, evolve, or integrate with modern infrastructure — causing downtime, slow releases, and blocked growth.',
      ar: 'المؤسسات التي تعاني من أنظمة قديمة أحادية لا تستطيع التوسع أو التطور أو التكامل مع البنية الحديثة — مما يسبب توقفاً وإصدارات بطيئة ونمواً معطلاً.',
    },
    targetAudience: {
      en: 'Mid-to-large enterprises undergoing digital transformation, fintech companies building scalable platforms, and organizations with 100+ employees needing reliable, modular systems.',
      ar: 'المؤسسات المتوسطة والكبيرة التي تمر بتحول رقمي وشركات التكنولوجيا المالية التي تبني منصات قابلة للتوسع والمنظمات ذات 100+ موظف التي تحتاج أنظمة موثوقة ومعيارية.',
    },
    differentiators: {
      en: ['Custom architecture — never templates', 'SLO-governed reliability from day one', 'Domain-driven design with bounded contexts', 'Full observability and automated rollback'],
      ar: ['بنية مخصصة — ليست قوالب أبداً', 'موثوقية محكومة بمؤشرات خدمة من اليوم الأول', 'تصميم موجه بالمجال مع حدود سياقية', 'مراقبة كاملة واسترجاع آلي'],
    },
    faqs: [
      {
        question: { en: 'How does Rumuze approach system architecture?', ar: 'كيف تتعامل روموز مع البنية المعمارية؟' },
        answer: { en: 'Rumuze uses domain-driven design to decompose systems into bounded contexts, then implements each as independent microservices with API-first contracts, automated testing, and observability pipelines.', ar: 'تستخدم روموز التصميم الموجه بالمجال لتقسيم الأنظمة إلى حدود سياقية ثم تنفذ كلاً منها كميكروسيرفيس مستقل بعقود API أولاً واختبارات آلية وخطوط مراقبة.' },
      },
    ],
  },
  {
    slug: 'web-development',
    title: {
      en: 'Web Development',
      ar: 'تطوير الويب',
    },
    shortDescription: {
      en: 'Accessible, performant React/Next.js applications.',
      ar: 'تطبيقات React/Next.js قابلة للوصول وعالية الأداء.',
    },
    summary: {
      en: 'We develop accessible, performant web applications using React/Next.js and secure backends in Node or Laravel with CI/CD and cloud deployment, emphasizing predictable rendering and bilingual support.',
      ar: 'نبني تطبيقات ويب قابلة للوصول وعالية الأداء باستخدام React/Next.js وخوادم آمنة بـ Node أو Laravel مع CI/CD ونشر سحابي، مع عرض حتمي ودعم ثنائي اللغة.',
    },
    keywords: ['React', 'Next.js', 'Node', 'Laravel', 'CI/CD'],
    geoScope: ['UAE', 'Saudi Arabia', 'Egypt', 'Qatar'],
    industries: ['Retail', 'Media', 'Education', 'B2B SaaS'],
    definitions: {
      short: {
        en: 'Builds accessible, performant React/Next.js frontends with secure backends, deterministic rendering, and bilingual UX under robust CI/CD.',
        ar: 'نبني واجهات React/Next.js عالية الأداء وقابلة للوصول، بخوادم آمنة، وعرض حتمي وتجربة ثنائية اللغة تحت CI/CD قوي.',
      },
      medium: {
        en: 'We deliver predictable, accessible web applications using React/Next.js and secure Node/Laravel backends. We enforce performance budgets, a11y rules, and caching strategies with SSR/ISR for reliable UX across locales.',
        ar: 'نقدم تطبيقات ويب متوقعة وقابلة للوصول باستخدام React/Next.js وخوادم Node/Laravel آمنة. نفرض ميزانيات الأداء وقواعد الوصول واستراتيجيات التخزين المؤقت مع SSR/ISR لتجربة موثوقة عبر اللغات.',
      },
      long: {
        en: 'Our web development emphasizes deterministic rendering, accessibility compliance, and multilingual scalability. We use React/Next.js, Node or Laravel, and strong caching with SSR/ISR. Build pipelines enforce lighthouse budgets and security headers. Layout systems and design tokens keep UX consistent across right-to-left and left-to-right contexts.',
        ar: 'يركّز تطوير الويب لدينا على عرض حتمي، امتثال الوصول، وقابلية التوسع متعدد اللغات. نستخدم React/Next.js وNode أو Laravel مع تخزين مؤقت قوي وSSR/ISR. تفرض خطوط البناء ميزانيات الأداء ورؤوس الأمان. تحافظ أنظمة التخطيط ورموز التصميم على الاتساق عبر اتجاهات الكتابة.',
      },
      bullets: {
        en: [
          'React/Next.js with SSR/ISR',
          'Performance and a11y budgets',
          'Secure Node/Laravel backends',
          'RTL/LTR design tokens',
          'Caching and CDN strategies',
        ],
        ar: [
          'React/Next.js مع SSR/ISR',
          'ميزانيات الأداء والوصول',
          'خوادم Node/Laravel آمنة',
          'رموز تصميم RTL/LTR',
          'استراتيجيات التخزين المؤقت وCDN',
        ],
      },
    },
    category: 'software',
    problemSolved: {
      en: 'Businesses with websites that are slow, inaccessible, not mobile-responsive, or lack bilingual support — costing them customers and search engine visibility.',
      ar: 'الأعمال التي لديها مواقع بطيئة أو غير قابلة للوصول أو غير متجاوبة أو تفتقر لدعم ثنائي اللغة — مما يكلفها عملاء وظهور في محركات البحث.',
    },
    targetAudience: {
      en: 'Companies launching new web products, startups needing production-ready applications, and businesses requiring bilingual web presence for MENA markets.',
      ar: 'الشركات التي تطلق منتجات ويب جديدة والشركات الناشئة التي تحتاج تطبيقات جاهزة للإنتاج والأعمال التي تتطلب تواجداً ثنائي اللغة لأسواق المنطقة.',
    },
    differentiators: {
      en: ['SSR/ISR for optimal performance and SEO', 'Native RTL/LTR bilingual support', 'Performance budgets enforced in CI/CD', 'Production-grade from day one'],
      ar: ['SSR/ISR لأداء وSEO مثالي', 'دعم ثنائي اللغة RTL/LTR أصلي', 'ميزانيات أداء مفروضة في CI/CD', 'جودة إنتاج من اليوم الأول'],
    },
    faqs: [
      {
        question: { en: 'Does Rumuze build mobile apps?', ar: 'هل تبني روموز تطبيقات جوال؟' },
        answer: { en: 'Rumuze builds cross-platform mobile applications using React Native, sharing code with web applications for consistent UX across platforms while maintaining native performance.', ar: 'تبني روموز تطبيقات جوال متعددة المنصات باستخدام React Native، مع مشاركة الكود مع تطبيقات الويب لتجربة مستخدم متسقة عبر المنصات مع الحفاظ على أداء أصلي.' },
      },
    ],
  },
  {
    slug: 'saas-erp',
    title: {
      en: 'SaaS & ERP Systems',
      ar: 'منصات SaaS وأنظمة ERP',
    },
    shortDescription: {
      en: 'Multi-tenant SaaS and custom ERP modules.',
      ar: 'منصات SaaS متعددة المستأجرين ووحدات ERP مخصصة.',
    },
    summary: {
      en: 'We engineer multi-tenant SaaS and ERP systems with strict tenant isolation, implement finance, HR, and inventory modules, and perform legacy migrations and integrations under regional compliance.',
      ar: 'نهندس منصات SaaS وERP متعددة المستأجرين مع عزل صارم، وننفذ وحدات مالية وموارد بشرية ومخزون، ونجري ترحيلات وتكاملات وفق الامتثال الإقليمي.',
    },
    keywords: ['SaaS', 'ERP', 'tenant isolation', 'integration'],
    geoScope: ['UAE', 'Saudi Arabia', 'Egypt', 'Qatar'],
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
      en: 'Organizations running critical operations on fragmented spreadsheets, disconnected tools, or off-the-shelf SaaS that cannot handle multi-tenant requirements, regional compliance, or custom workflows.',
      ar: 'المؤسسات التي تدير عمليات حرجة على جداول بيانات مجزأة أو أدوات منفصلة أو SaaS جاهز لا يتعامل مع متطلبات تعدد المستأجرين أو الامتثال الإقليمي أو أعمال مخصصة.',
    },
    targetAudience: {
      en: 'Enterprises needing custom ERP/CRM systems, SaaS founders building multi-tenant platforms, and organizations migrating from legacy or off-the-shelf systems.',
      ar: 'المؤسسات التي تحتاج أنظمة ERP/CRM مخصصة ومؤسسو SaaS الذين يبنون منصات متعددة المستأجرين والمنظمات التي تنتقل من أنظمة قديمة أو جاهزة.',
    },
    differentiators: {
      en: ['True multi-tenancy with data isolation', 'Custom modules — not plugin workarounds', 'Legacy system migration expertise', 'Regional compliance built in'],
      ar: ['تعدد مستأجرين حقيقي بعزل بيانات', 'وحدات مخصصة — ليست حلول إضافات', 'خبرة ترحيل الأنظمة القديمة', 'امتثال إقليمي مدمج'],
    },
    faqs: [
      {
        question: { en: 'Can Rumuze migrate our existing ERP?', ar: 'هل تستطيع روموز ترحيل نظام ERP الحالي؟' },
        answer: { en: 'Yes, Rumuze performs legacy ERP migrations with data mapping, validation, parallel running, and phased cutover to minimize business disruption during the transition.', ar: 'نعم، تجري روموز ترحيلات ERP القديمة مع ربط البيانات والتحقق والتشغيل المتوازي والانتقال المرحلي لتقليل تعطيل الأعمال أثناء الانتقال.' },
      },
    ],
  },
  {
    slug: 'marketing-infrastructure',
    title: {
      en: 'Digital Marketing Infrastructure',
      ar: 'بنية التسويق الرقمي',
    },
    shortDescription: {
      en: 'Martech, analytics, attribution, CDP, automation.',
      ar: 'مارتيك، تحليلات، إسناد، منصات بيانات، أتمتة.',
    },
    summary: {
      en: 'We implement marketing technology stacks with analytics, attribution modeling, automation workflows, and CDP integrations, maintaining data quality, deduplication, and privacy for measurable growth.',
      ar: 'ننفيذ طبقات Martech مع التحليلات، نماذج الإسناد، أتمتة العمليات، وتكامل منصات بيانات العملاء، مع جودة البيانات وإزالة التكرار والخصوصية للنمو القابل للقياس.',
    },
    keywords: ['Martech', 'analytics', 'attribution', 'CDP', 'automation'],
    geoScope: ['UAE', 'Saudi Arabia', 'Egypt', 'Qatar'],
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
  },
  // ── NEW: Performance Marketing ────────────────────────────────────────
  {
    slug: 'performance-marketing',
    title: {
      en: 'Performance Marketing',
      ar: 'التسويق الأدائي',
    },
    shortDescription: {
      en: 'Data-driven paid campaigns with measurable ROAS.',
      ar: 'حملات مدفوعة قائمة على البيانات بعائد إعلاني قابل للقياس.',
    },
    summary: {
      en: 'Rumuze manages performance marketing campaigns across Google Ads, Meta Ads, and LinkedIn Ads with server-side tracking, multi-touch attribution, systematic A/B testing, and ROAS-focused optimization to deliver measurable revenue growth.',
      ar: 'تدير روموز حملات التسويق الأدائي عبر Google Ads وMeta Ads وLinkedIn Ads مع تتبع خادم وإسناد متعدد اللمس واختبار A/B منهجي وتحسين مركز على العائد الإعلاني لتحقيق نمو إيرادات قابل للقياس.',
    },
    keywords: ['PPC', 'Google Ads', 'Meta Ads', 'ROAS', 'CPA', 'attribution'],
    geoScope: ['UAE', 'Saudi Arabia', 'Egypt', 'Qatar'],
    industries: ['E-commerce', 'SaaS', 'Real Estate', 'Healthcare', 'Education'],
    definitions: {
      short: {
        en: 'Manages paid campaigns with server-side tracking, attribution modeling, and ROAS optimization across Google, Meta, and LinkedIn ad platforms.',
        ar: 'إدارة حملات مدفوعة مع تتبع خادم ونمذجة إسناد وتحسين العائد الإعلاني عبر منصات Google وMeta وLinkedIn.',
      },
      medium: {
        en: 'Rumuze runs performance marketing with proper tracking infrastructure first. We implement server-side tracking (Meta CAPI, GA4), build multi-touch attribution models, run systematic creative testing, and optimize toward revenue metrics — not vanity metrics like impressions.',
        ar: 'تدير روموز التسويق الأدائي ببنية تتبع سليمة أولاً. ننفذ تتبع خادم (Meta CAPI، GA4) ونبني نماذج إسناد متعدد اللمس ونجري اختبارات إبداعية منهجية ونحسّن نحو مقاييس الإيرادات — وليس المقاييس الشكلية كمرات الظهور.',
      },
      long: {
        en: 'Performance marketing at Rumuze starts with measurement infrastructure — server-side tracking, conversion APIs, and clean data pipelines. We then build campaigns on verified data with multi-touch attribution, behavioral audience segmentation, systematic A/B creative rotation, and ROAS-optimized bidding strategies. Every campaign ties back to revenue impact with transparent dashboards and weekly reporting.',
        ar: 'يبدأ التسويق الأدائي في روموز ببنية القياس — تتبع خادم وواجهات تحويل وخطوط بيانات نظيفة. ثم نبني الحملات على بيانات مُحققة مع إسناد متعدد اللمس وتقسيم جمهور سلوكي وتدوير إبداعي A/B منهجي واستراتيجيات مزايدة محسّنة للعائد. كل حملة مرتبطة بتأثير الإيرادات مع لوحات شفافة وتقارير أسبوعية.',
      },
      bullets: {
        en: ['Google Ads & Meta Ads management', 'Server-side tracking (CAPI + GA4)', 'Multi-touch attribution modeling', 'Creative A/B testing framework', 'ROAS & revenue-focused optimization'],
        ar: ['إدارة Google Ads وMeta Ads', 'تتبع خادم (CAPI + GA4)', 'نمذجة إسناد متعدد اللمس', 'إطار اختبار إبداعي A/B', 'تحسين مركز على العائد والإيرادات'],
      },
    },
    category: 'marketing',
    problemSolved: {
      en: 'Businesses spending on paid advertising without proper tracking, attribution, or optimization — resulting in wasted budgets and inability to identify what actually drives revenue.',
      ar: 'الأعمال التي تنفق على الإعلانات المدفوعة دون تتبع أو إسناد أو تحسين مناسب — مما يؤدي إلى هدر الميزانيات وعدم القدرة على تحديد ما يدفع الإيرادات فعلاً.',
    },
    targetAudience: {
      en: 'E-commerce brands, SaaS companies, and service businesses spending $5K+/month on paid advertising who need measurable ROAS improvement.',
      ar: 'علامات التجارة الإلكترونية وشركات SaaS والأعمال الخدمية التي تنفق 5 آلاف دولار+ شهرياً على إعلانات مدفوعة وتحتاج تحسين عائد إعلاني قابل للقياس.',
    },
    differentiators: {
      en: ['We fix tracking before touching ads', 'Revenue metrics, not vanity metrics', 'Systematic testing instead of guesswork', 'Full-funnel attribution, not last-click'],
      ar: ['نصلح التتبع قبل لمس الإعلانات', 'مقاييس إيرادات وليس مقاييس شكلية', 'اختبار منهجي بدل التخمين', 'إسناد كامل المسار وليس النقرة الأخيرة'],
    },
    faqs: [
      {
        question: { en: 'What ad platforms does Rumuze manage?', ar: 'ما المنصات الإعلانية التي تديرها روموز؟' },
        answer: { en: 'Rumuze manages Google Ads, Meta Ads (Facebook + Instagram), LinkedIn Ads, TikTok Ads, and programmatic display campaigns, with unified tracking and attribution across all channels.', ar: 'تدير روموز Google Ads وMeta Ads (فيسبوك + إنستغرام) وLinkedIn Ads وTikTok Ads وحملات عرض برمجية، مع تتبع وإسناد موحد عبر القنوات.' },
      },
      {
        question: { en: 'What ROAS can I expect?', ar: 'ما العائد الإعلاني المتوقع؟' },
        answer: { en: 'ROAS depends on industry, margins, and starting point. Rumuze clients typically see 2x-5x ROAS after 3 months of optimization. We set transparent ROAS targets in the SOW and report against them weekly.', ar: 'يعتمد العائد على الصناعة والهوامش ونقطة البداية. عملاء روموز يحققون عادة 2x-5x عائد بعد 3 أشهر. نحدد أهدافاً شفافة في بيان العمل ونقدم تقارير أسبوعية.' },
      },
    ],
  },
  // ── NEW: SEO Services ─────────────────────────────────────────────────
  {
    slug: 'seo-services',
    title: {
      en: 'SEO Services',
      ar: 'خدمات تحسين محركات البحث',
    },
    shortDescription: {
      en: 'Technical SEO, semantic optimization, and AI visibility.',
      ar: 'SEO تقني وتحسين دلالي وظهور أمام الذكاء الاصطناعي.',
    },
    summary: {
      en: 'Rumuze provides SEO services including technical audits, Core Web Vitals optimization, semantic content strategy, structured data implementation, bilingual SEO (Arabic + English), and GEO/AEO optimization for AI search engine visibility.',
      ar: 'تقدم روموز خدمات SEO تشمل التدقيق التقني وتحسين Core Web Vitals واستراتيجية المحتوى الدلالي وتنفيذ البيانات المهيكلة وSEO ثنائي اللغة (عربي + إنجليزي) وتحسين GEO/AEO للظهور في محركات البحث الذكية.',
    },
    keywords: ['SEO', 'technical SEO', 'GEO', 'AEO', 'structured data', 'Core Web Vitals'],
    geoScope: ['UAE', 'Saudi Arabia', 'Egypt', 'Qatar'],
    industries: ['E-commerce', 'SaaS', 'Healthcare', 'Real Estate', 'Professional Services'],
    definitions: {
      short: {
        en: 'Technical SEO, semantic content strategy, structured data implementation, and GEO/AEO optimization for traditional and AI-powered search engines.',
        ar: 'SEO تقني واستراتيجية محتوى دلالي وتنفيذ بيانات مهيكلة وتحسين GEO/AEO لمحركات البحث التقليدية والذكية.',
      },
      medium: {
        en: 'Rumuze delivers SEO that goes beyond keywords. We optimize technical infrastructure (Core Web Vitals, crawlability, structured data), create semantic content aligned with search intent, implement JSON-LD schemas for entity clarity, and optimize for AI citation through GEO and AEO techniques.',
        ar: 'تقدم روموز SEO يتجاوز الكلمات المفتاحية. نحسّن البنية التقنية (Core Web Vitals والزحف والبيانات المهيكلة) وننشئ محتوى دلالياً متوافقاً مع نية البحث وننفذ ترميز JSON-LD لوضوح الكيانات ونحسّن للاستشهاد الذكي عبر تقنيات GEO وAEO.',
      },
      long: {
        en: 'SEO at Rumuze combines technical optimization, semantic content strategy, and AI visibility engineering. We audit and fix technical foundations (site speed, crawl budget, structured data, security headers), develop content strategies aligned with real search queries, implement comprehensive schema markup (Organization, Service, FAQ, Person, BreadcrumbList), and optimize for generative AI engines through entity-clear content structure, direct-answer formatting, and chunkable information architecture.',
        ar: 'يجمع SEO في روموز بين التحسين التقني واستراتيجية المحتوى الدلالي وهندسة الظهور أمام الذكاء الاصطناعي. ندقق ونصلح الأسس التقنية (سرعة الموقع وميزانية الزحف والبيانات المهيكلة ورؤوس الأمان)، ونطور استراتيجيات محتوى متوافقة مع استعلامات البحث الحقيقية، وننفذ ترميز Schema شامل، ونحسّن لمحركات الذكاء الاصطناعي التوليدية.',
      },
      bullets: {
        en: ['Technical SEO audits and optimization', 'Core Web Vitals improvement', 'Structured data (JSON-LD) implementation', 'GEO/AEO for AI search engines', 'Bilingual SEO (Arabic + English)'],
        ar: ['تدقيقات وتحسين SEO التقني', 'تحسين Core Web Vitals', 'تنفيذ البيانات المهيكلة (JSON-LD)', 'GEO/AEO لمحركات البحث الذكية', 'SEO ثنائي اللغة (عربي + إنجليزي)'],
      },
    },
    category: 'marketing',
    problemSolved: {
      en: 'Websites with low organic visibility, poor technical foundations, no structured data, and zero presence in AI-powered search results like Google AI Overviews and ChatGPT.',
      ar: 'المواقع ذات الظهور العضوي المنخفض والأسس التقنية الضعيفة وبدون بيانات مهيكلة وبدون تواجد في نتائج البحث الذكية مثل Google AI Overviews وChatGPT.',
    },
    targetAudience: {
      en: 'Businesses that need sustainable organic growth, improved search rankings, and visibility in AI-powered search engines across Arabic and English markets.',
      ar: 'الأعمال التي تحتاج نمو عضوي مستدام وترتيب بحث محسّن وظهور في محركات البحث الذكية عبر الأسواق العربية والإنجليزية.',
    },
    differentiators: {
      en: ['GEO/AEO optimization most agencies don\'t offer', 'Engineering-grade technical SEO', 'Native bilingual Arabic-English optimization', 'Comprehensive schema markup beyond basics'],
      ar: ['تحسين GEO/AEO لا تقدمه معظم الوكالات', 'SEO تقني بجودة هندسية', 'تحسين ثنائي اللغة عربي-إنجليزي أصلي', 'ترميز Schema شامل يتجاوز الأساسيات'],
    },
    faqs: [
      {
        question: { en: 'What is GEO/AEO optimization?', ar: 'ما هو تحسين GEO/AEO؟' },
        answer: { en: 'GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) are strategies to make your content cited by AI-powered search engines like ChatGPT, Perplexity, and Google AI Overviews. Rumuze optimizes content structure, entity clarity, and schema markup to maximize AI citations.', ar: 'GEO (تحسين المحركات التوليدية) وAEO (تحسين محركات الإجابة) هي استراتيجيات لجعل محتواك مُستَشهَداً من محركات البحث الذكية مثل ChatGPT وPerplexity وGoogle AI Overviews. تحسّن روموز هيكل المحتوى ووضوح الكيانات وترميز Schema لتعظيم الاستشهادات.' },
      },
    ],
  },
  // ── NEW: Social Media Management ──────────────────────────────────────
  {
    slug: 'social-media',
    title: {
      en: 'Social Media Management',
      ar: 'إدارة وسائل التواصل الاجتماعي',
    },
    shortDescription: {
      en: 'Strategic content, community management, and paid social.',
      ar: 'محتوى استراتيجي وإدارة مجتمع وإعلانات اجتماعية.',
    },
    summary: {
      en: 'Rumuze manages social media presence across Instagram, LinkedIn, X (Twitter), and TikTok with strategic content creation, community engagement, paid social campaigns, and analytics-driven optimization for brand authority and lead generation.',
      ar: 'تدير روموز التواجد على وسائل التواصل عبر إنستغرام ولينكدإن وX (تويتر) وتيك توك مع إنشاء محتوى استراتيجي وتفاعل مجتمعي وحملات اجتماعية مدفوعة وتحسين قائم على التحليلات لسلطة العلامة وتوليد العملاء.',
    },
    keywords: ['social media', 'content strategy', 'community management', 'paid social'],
    geoScope: ['UAE', 'Saudi Arabia', 'Egypt', 'Qatar'],
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
      en: 'B2B and B2C brands in MENA that need bilingual social media presence with measurable business impact beyond vanity metrics.',
      ar: 'علامات B2B وB2C في المنطقة التي تحتاج تواجداً ثنائي اللغة على التواصل بتأثير أعمال قابل للقياس يتجاوز المقاييس الشكلية.',
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
  },
];

