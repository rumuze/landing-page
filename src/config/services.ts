export type LanguageCode = 'en' | 'ar';

export interface Localized {
  en: string;
  ar: string;
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
  },
];
