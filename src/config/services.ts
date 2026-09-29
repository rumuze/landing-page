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
  /** Search-result description, about 155 characters */
  metaDescription: Localized;
  keywords: string[];
  geoScope: string[];
  industries?: string[];
  definitions?: {
    short: Localized;
    medium: Localized;
    long: Localized;
    bullets: {
      en: string[];
      ar: string[];
    };
  };
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
  /** Declarative H2 headings, phrased so each section answers one question */
  h2Sections?: Localized[];
  /** Slugs of related services for internal linking */
  relatedServices?: string[];
  /** Regional (Gulf / MENA) context paragraph */
  saudiContext?: Localized;
}

// Content rules (see docs/CLAIMS_REGISTRY.md): describe what Rumuze builds and
// how it works. No client names, revenue figures, uptime numbers, or
// compliance certifications until they can be evidenced.
export const SERVICES: ServiceItem[] = [
  {
    slug: 'software-engineering',
    title: {
      en: 'Custom Software and Backend Platforms',
      ar: 'البرمجيات المخصصة والمنصات الخلفية',
    },
    shortDescription: {
      en: 'Custom platforms and backend systems built as modular monoliths or event-driven services, chosen per problem.',
      ar: 'منصات وأنظمة خلفية مخصصة تُبنى كـ Modular Monolith أو كخدمات قائمة على الأحداث، حسب طبيعة المشكلة.',
    },
    summary: {
      en: 'Rumuze designs and builds custom software and backend platforms with Laravel and NestJS. Systems are split into modules with clear contracts between them, and can use a transactional outbox, webhooks, and realtime channels where the problem calls for it.',
      ar: 'تصمم رموز وتبني برمجيات مخصصة ومنصات خلفية بـ Laravel وNestJS. تُقسَّم الأنظمة إلى وحدات بعقود واضحة بينها، ويمكن أن تعتمد على نمط Outbox وWebhooks وقنوات لحظية عندما تتطلب المشكلة ذلك.',
    },
    metaDescription: {
      en: 'Custom software and backend platforms built with Laravel and NestJS: modular systems, transactional outbox, webhooks, and realtime channels.',
      ar: 'برمجيات مخصصة ومنصات خلفية بـ Laravel وNestJS: أنظمة مقسمة إلى وحدات، ونمط Outbox، وWebhooks، وقنوات لحظية.',
    },
    keywords: ['custom software development', 'Laravel', 'NestJS', 'modular monolith', 'API development'],
    geoScope: ['Saudi Arabia', 'UAE', 'Egypt', 'MENA'],
    industries: ['Business operations software', 'Delivery and logistics platforms', 'Integration platforms'],
    definitions: {
      short: {
        en: 'Custom software and backend platforms built with Laravel and NestJS, organised into modules with clear contracts.',
        ar: 'برمجيات مخصصة ومنصات خلفية بـ Laravel وNestJS، منظمة في وحدات بعقود واضحة.',
      },
      medium: {
        en: 'We build backends and APIs as modular monoliths by default, and move to event-driven services only when a real requirement justifies the added complexity. Modules communicate through contracts, so a system stays changeable as it grows.',
        ar: 'نبني الأنظمة الخلفية وواجهات API كـ Modular Monolith افتراضياً، وننتقل إلى خدمات قائمة على الأحداث فقط عندما يبرر ذلك متطلب حقيقي. تتواصل الوحدات عبر عقود، فيبقى النظام قابلاً للتغيير مع نموه.',
      },
      long: {
        en: 'Our own platform RumuzePMO is a Laravel 12 modular monolith with seven modules that can be enabled independently, and Rumuze Core is a NestJS API built around a transactional outbox, a webhook engine, and Socket.IO realtime. The same practices apply to client work: contract-first module boundaries, request tracing, health endpoints, non-destructive migrations, and containerised, scripted releases.',
        ar: 'منصتنا RumuzePMO هي Modular Monolith بـ Laravel 12 من سبع وحدات يمكن تفعيلها بشكل مستقل، وRumuze Core هي واجهة NestJS مبنية حول نمط Outbox ومحرك Webhooks واتصال لحظي عبر Socket.IO. وننقل الممارسات نفسها إلى مشاريع العملاء: حدود وحدات قائمة على العقود، وتتبع للطلبات، ونقاط فحص صحة، وترحيلات غير مدمرة، وإصدارات مؤتمتة في حاويات.',
      },
      bullets: {
        en: [
          'Modular monoliths with contract-first module boundaries',
          'Event-driven services with a transactional outbox when needed',
          'Webhook ingestion and reliable outbound delivery',
          'Request tracing, health endpoints, and safe migrations',
          'Containerised, scripted releases',
        ],
        ar: [
          'Modular Monolith بحدود وحدات قائمة على العقود',
          'خدمات قائمة على الأحداث بنمط Outbox عند الحاجة',
          'استقبال Webhooks وإرسال موثوق',
          'تتبع للطلبات ونقاط فحص صحة وترحيلات آمنة',
          'إصدارات مؤتمتة في حاويات',
        ],
      },
    },
    category: 'software',
    problemSolved: {
      en: 'A backend that has grown without structure: changes in one place break another, releases are risky, and nobody is sure how the system fits together.',
      ar: 'نظام خلفي نما بلا هيكل: تغيير في مكان يكسر آخر، والإصدارات محفوفة بالمخاطر، ولا أحد متأكد من ترابط أجزاء النظام.',
    },
    targetAudience: {
      en: 'Product teams and businesses that need a custom backend, or that are inheriting a codebase and need it to become maintainable.',
      ar: 'فرق المنتجات والشركات التي تحتاج نظاماً خلفياً مخصصاً، أو ترث قاعدة كود وتريد جعلها قابلة للصيانة.',
    },
    differentiators: {
      en: [
        'We run our own platforms on the same architecture',
        'Modular by default, distributed only when justified',
        'Runbooks and architecture notes delivered with the code',
        'Arabic and English supported from the data layer up',
      ],
      ar: [
        'نشغّل منصاتنا الخاصة على المعمارية نفسها',
        'وحدات معيارية افتراضياً، وتوزيع فقط عند الحاجة',
        'دلائل تشغيل وملاحظات معمارية تُسلَّم مع الكود',
        'دعم العربية والإنجليزية من طبقة البيانات فصاعداً',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Does Rumuze build microservices?',
          ar: 'هل تبني رموز خدمات مصغرة (Microservices)؟',
        },
        answer: {
          en: 'Only when a real requirement calls for it. Most systems start as a modular monolith, which is simpler to run and change, and split into separate services later if scale or team structure demands it.',
          ar: 'فقط عندما يتطلب ذلك متطلب حقيقي. تبدأ معظم الأنظمة كـ Modular Monolith لأنه أبسط في التشغيل والتغيير، ثم تُقسَّم إلى خدمات منفصلة لاحقاً إذا فرض الحجم أو هيكل الفريق ذلك.',
        },
      },
      {
        question: {
          en: 'Which backend technologies does Rumuze use?',
          ar: 'ما التقنيات الخلفية التي تستخدمها رموز؟',
        },
        answer: {
          en: 'Laravel and NestJS, with PostgreSQL or MySQL for data and Redis for caching and queues. The choice depends on the problem and on the team that will maintain the system.',
          ar: 'Laravel وNestJS، مع PostgreSQL أو MySQL للبيانات وRedis للتخزين المؤقت والطوابير. ويعتمد الاختيار على المشكلة وعلى الفريق الذي سيصون النظام.',
        },
      },
    ],
    h2Sections: [
      { en: 'Why a Modular Monolith Is the Default', ar: 'لماذا يكون Modular Monolith هو الخيار الافتراضي' },
      { en: 'How Modules Communicate Through Contracts', ar: 'كيف تتواصل الوحدات عبر العقود' },
      { en: 'When Event-Driven Services Are Worth It', ar: 'متى تستحق الخدمات القائمة على الأحداث' },
      { en: 'How Releases and Migrations Stay Safe', ar: 'كيف تبقى الإصدارات والترحيلات آمنة' },
      { en: 'What You Receive at Handover', ar: 'ما الذي تتسلمه عند التسليم' },
    ],
    relatedServices: ['saas-erp', 'mobile-apps', 'marketing-infrastructure'],
    saudiContext: {
      en: 'Businesses in Saudi Arabia and the UAE often need Arabic-first interfaces, regional payment gateways, and clear decisions about where data lives. Rumuze designs for these from the start and documents them, so later reviews begin from facts rather than assumptions.',
      ar: 'تحتاج الشركات في السعودية والإمارات غالباً إلى واجهات عربية أولاً وبوابات دفع إقليمية وقرارات واضحة حول مكان حفظ البيانات. تصمم رموز لذلك من البداية وتوثقه، فتبدأ المراجعات اللاحقة من وقائع لا من افتراضات.',
    },
  },
  {
    slug: 'mobile-apps',
    title: {
      en: 'Mobile Apps with Flutter',
      ar: 'تطبيقات الموبايل بـ Flutter',
    },
    shortDescription: {
      en: 'Cross-platform Flutter apps for customers, drivers, and field teams, connected to your backend.',
      ar: 'تطبيقات Flutter متعددة المنصات للعملاء والسائقين والفرق الميدانية، متصلة بنظامك الخلفي.',
    },
    summary: {
      en: 'Rumuze builds cross-platform mobile apps with Flutter for iOS and Android, connected to Laravel or NestJS backends. Typical features include live location tracking, push notifications, in-app chat, biometric lock, and Arabic and English localisation.',
      ar: 'تبني رموز تطبيقات موبايل متعددة المنصات بـ Flutter لنظامي iOS وAndroid، متصلة بأنظمة Laravel أو NestJS الخلفية. تشمل الميزات المعتادة تتبع الموقع المباشر والإشعارات الفورية والمحادثة داخل التطبيق والقفل البيومتري ودعم العربية والإنجليزية.',
    },
    metaDescription: {
      en: 'Cross-platform Flutter apps for iOS and Android with live location, push notifications, in-app chat, and Arabic and English support.',
      ar: 'تطبيقات Flutter لنظامي iOS وAndroid مع تتبع الموقع المباشر والإشعارات والمحادثة داخل التطبيق ودعم العربية والإنجليزية.',
    },
    keywords: ['Flutter app development', 'mobile app development', 'delivery app', 'iOS and Android', 'Arabic mobile app'],
    geoScope: ['Saudi Arabia', 'UAE', 'Egypt', 'MENA'],
    industries: ['Delivery and logistics', 'Field operations', 'Customer apps'],
    definitions: {
      short: {
        en: 'Flutter apps for iOS and Android, built against your backend, with Arabic and English support.',
        ar: 'تطبيقات Flutter لنظامي iOS وAndroid، مبنية فوق نظامك الخلفي، مع دعم العربية والإنجليزية.',
      },
      medium: {
        en: 'We build Flutter apps that share one codebase across iOS and Android, use provider-based state management and dependency injection, and connect to your API. Background location, push notifications, and biometric lock are handled with care because they are the riskiest parts of a field app.',
        ar: 'نبني تطبيقات Flutter بقاعدة كود واحدة لنظامي iOS وAndroid، بإدارة حالة قائمة على Provider وحقن للاعتمادات، ومتصلة بواجهة API الخاصة بك. ونتعامل بحذر مع الموقع في الخلفية والإشعارات والقفل البيومتري لأنها أخطر أجزاء تطبيقات العمل الميداني.',
      },
      long: {
        en: 'Our Rveta driver app is a Flutter app backed by a Laravel API. It covers order assignment, delivery status updates, live location for active deliveries, customer chat, push notifications in foreground and background, biometric app lock, and Arabic and English localisation. Its maintenance runbooks, upgrade risk reports, and manual device smoke-test checklist ship with the code.',
        ar: 'تطبيق السائقين Rveta هو تطبيق Flutter مدعوم بواجهة Laravel. يغطي إسناد الطلبات وتحديث حالة التوصيل والموقع المباشر للطلبات النشطة ومحادثة العميل والإشعارات في الواجهة والخلفية والقفل البيومتري ودعم العربية والإنجليزية. وتُسلَّم مع الكود دلائل الصيانة وتقارير مخاطر الترقية وقائمة اختبار الأجهزة اليدوي.',
      },
      bullets: {
        en: [
          'One Flutter codebase for iOS and Android',
          'Live location and background tracking',
          'Push notifications in every app state',
          'Biometric app lock',
          'Arabic and English localisation',
        ],
        ar: [
          'قاعدة كود Flutter واحدة لنظامي iOS وAndroid',
          'الموقع المباشر والتتبع في الخلفية',
          'إشعارات فورية في كل حالات التطبيق',
          'قفل بيومتري للتطبيق',
          'دعم العربية والإنجليزية',
        ],
      },
    },
    category: 'software',
    problemSolved: {
      en: 'Field teams and customers working through calls, messaging groups, and spreadsheets because there is no app connected to the backend.',
      ar: 'فرق ميدانية وعملاء يعملون عبر المكالمات ومجموعات المراسلة والجداول لعدم وجود تطبيق متصل بالنظام الخلفي.',
    },
    targetAudience: {
      en: 'Businesses that need a driver, field-staff, or customer app tied to their operations system.',
      ar: 'الشركات التي تحتاج تطبيقاً للسائقين أو الموظفين الميدانيين أو العملاء مرتبطاً بنظام عملياتها.',
    },
    differentiators: {
      en: [
        'We ship and maintain a production-oriented Flutter app ourselves',
        'Backend and mobile built by one team',
        'Background location and notifications treated as high-risk areas',
        'Maintenance runbooks and smoke-test checklists included',
      ],
      ar: [
        'نطوّر ونصون بأنفسنا تطبيق Flutter موجهاً للإنتاج',
        'الخلفية والموبايل من فريق واحد',
        'التعامل مع الموقع في الخلفية والإشعارات كمجالات عالية المخاطر',
        'دلائل صيانة وقوائم اختبار مرفقة',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Why Flutter instead of native apps?',
          ar: 'لماذا Flutter بدلاً من التطبيقات الأصلية؟',
        },
        answer: {
          en: 'One codebase for iOS and Android lowers build and maintenance cost. Native code is still used where a platform feature requires it, such as background location.',
          ar: 'قاعدة كود واحدة لنظامي iOS وAndroid تقلل تكلفة البناء والصيانة. ويُستخدم الكود الأصلي حيث تتطلب ميزة في المنصة ذلك، مثل الموقع في الخلفية.',
        },
      },
      {
        question: {
          en: 'Can the app work in Arabic and English?',
          ar: 'هل يعمل التطبيق بالعربية والإنجليزية؟',
        },
        answer: {
          en: 'Yes. Text, layout direction, and formatting switch between right-to-left and left-to-right, with translations kept in one place per language.',
          ar: 'نعم. تتبدل النصوص واتجاه التخطيط والتنسيق بين اليمين لليسار واليسار لليمين، مع حفظ الترجمات في مكان واحد لكل لغة.',
        },
      },
    ],
    h2Sections: [
      { en: 'What a Field or Driver App Needs', ar: 'ما الذي يحتاجه تطبيق السائقين أو الفرق الميدانية' },
      { en: 'How Live Location Is Handled Safely', ar: 'كيف يُدار الموقع المباشر بأمان' },
      { en: 'How Push Notifications Behave in Every App State', ar: 'كيف تعمل الإشعارات في كل حالات التطبيق' },
      { en: 'How Arabic and English Share One App', ar: 'كيف تشترك العربية والإنجليزية في تطبيق واحد' },
      { en: 'How Upgrades and Releases Are Managed', ar: 'كيف تُدار الترقيات والإصدارات' },
    ],
    relatedServices: ['software-engineering', 'saas-erp'],
    saudiContext: {
      en: 'Apps for the Gulf need Arabic right-to-left layouts, location permissions that satisfy store policy, and reliable notifications on the devices customers actually use. We test on real Android and iOS devices before release.',
      ar: 'تحتاج التطبيقات في الخليج إلى تخطيط عربي من اليمين لليسار وأذونات موقع تلتزم بسياسات المتاجر وإشعارات موثوقة على الأجهزة التي يستخدمها العملاء فعلاً. نختبر على أجهزة Android وiOS حقيقية قبل الإصدار.',
    },
  },
  {
    slug: 'web-development',
    title: {
      en: 'Bilingual Web Applications',
      ar: 'تطبيقات الويب ثنائية اللغة',
    },
    shortDescription: {
      en: 'Web applications and websites with Arabic RTL and English LTR built into one codebase.',
      ar: 'تطبيقات ومواقع ويب بدعم العربية RTL والإنجليزية LTR في قاعدة كود واحدة.',
    },
    summary: {
      en: 'Rumuze builds web applications and websites with React and Next.js on Laravel or Node.js backends. Arabic and English share one codebase, with routing, layout direction, metadata, and structured data handled for each language instead of translated afterwards.',
      ar: 'تبني رموز تطبيقات ومواقع ويب بـ React وNext.js فوق أنظمة Laravel أو Node.js الخلفية. تشترك العربية والإنجليزية في قاعدة كود واحدة، مع معالجة المسارات واتجاه التخطيط والبيانات الوصفية والبيانات المنظمة لكل لغة بدلاً من الترجمة لاحقاً.',
    },
    metaDescription: {
      en: 'Bilingual React and Next.js web applications on Laravel or Node.js, with one codebase for Arabic and English and correct RTL, metadata, and schema.',
      ar: 'تطبيقات ويب بـ React وNext.js فوق Laravel أو Node.js، بقاعدة كود واحدة للعربية والإنجليزية ودعم صحيح لـ RTL والبيانات الوصفية.',
    },
    keywords: ['bilingual web development', 'Arabic RTL website', 'React', 'Next.js', 'multilingual SEO'],
    geoScope: ['Saudi Arabia', 'UAE', 'Egypt', 'MENA'],
    industries: ['Business websites', 'Web applications', 'Admin dashboards'],
    definitions: {
      short: {
        en: 'React and Next.js web applications with Arabic RTL and English LTR from one codebase.',
        ar: 'تطبيقات ويب بـ React وNext.js بدعم العربية RTL والإنجليزية LTR من قاعدة كود واحدة.',
      },
      medium: {
        en: 'Each language gets its own routes, metadata, canonical and hreflang tags, and layout direction. Components are written with logical properties so the same interface works right-to-left and left-to-right without duplicated styles.',
        ar: 'تحصل كل لغة على مساراتها وبياناتها الوصفية ووسوم canonical وhreflang واتجاه التخطيط الخاص بها. تُكتب المكونات بخصائص منطقية فتعمل الواجهة نفسها من اليمين لليسار والعكس دون تكرار الأنماط.',
      },
      long: {
        en: 'This website is built the same way: one React codebase serving English and Arabic, locale-aware routes, per-language metadata and JSON-LD, a generated sitemap with hreflang alternates, and a progressive web app shell. We apply the same approach to client sites and admin dashboards.',
        ar: 'هذا الموقع مبني بالطريقة نفسها: قاعدة كود React واحدة تخدم الإنجليزية والعربية، ومسارات واعية باللغة، وبيانات وصفية وJSON-LD لكل لغة، وخريطة موقع مولّدة ببدائل hreflang، وهيكل تطبيق ويب تقدمي. ونطبق النهج نفسه على مواقع العملاء ولوحات الإدارة.',
      },
      bullets: {
        en: [
          'Locale-aware routing and metadata',
          'Right-to-left and left-to-right from one component set',
          'Canonical, hreflang, sitemap, and JSON-LD per language',
          'Progressive web app support',
          'Admin dashboards for operations teams',
        ],
        ar: [
          'مسارات وبيانات وصفية واعية باللغة',
          'اليمين لليسار واليسار لليمين من مجموعة مكونات واحدة',
          'canonical وhreflang وخريطة موقع وJSON-LD لكل لغة',
          'دعم تطبيقات الويب التقدمية',
          'لوحات إدارة لفرق التشغيل',
        ],
      },
    },
    category: 'software',
    problemSolved: {
      en: 'Sites where Arabic was added as a translation on top of an English layout, leaving broken alignment, duplicated content, and weak search visibility in one language.',
      ar: 'مواقع أُضيفت فيها العربية كترجمة فوق تخطيط إنجليزي، فنتج عن ذلك تنسيق مكسور ومحتوى مكرر وظهور ضعيف في البحث بإحدى اللغتين.',
    },
    targetAudience: {
      en: 'Businesses launching or rebuilding a website or web application that must work properly in both Arabic and English.',
      ar: 'الشركات التي تطلق أو تعيد بناء موقع أو تطبيق ويب يجب أن يعمل بشكل سليم بالعربية والإنجليزية.',
    },
    differentiators: {
      en: [
        'Each language is a first-class route, not an overlay',
        'Technical SEO built in, not added afterwards',
        'The same practices run this website',
        'One team for frontend and backend',
      ],
      ar: [
        'كل لغة مسار أصيل وليست طبقة فوق النظام',
        'تحسين محركات البحث التقني مدمج وليس لاحقاً',
        'الممارسات نفسها تشغّل هذا الموقع',
        'فريق واحد للواجهة والخلفية',
      ],
    },
    faqs: [
      {
        question: {
          en: 'How does Rumuze handle Arabic right-to-left layouts?',
          ar: 'كيف تتعامل رموز مع تخطيطات العربية من اليمين لليسار؟',
        },
        answer: {
          en: 'Components use logical CSS properties and a per-language direction attribute, so one interface renders correctly in both directions instead of maintaining two sets of styles.',
          ar: 'تستخدم المكونات خصائص CSS منطقية وسمة اتجاه لكل لغة، فتُعرض الواجهة نفسها بشكل صحيح في الاتجاهين بدل صيانة مجموعتي أنماط.',
        },
      },
      {
        question: {
          en: 'Will both languages be indexed by search engines?',
          ar: 'هل ستُفهرس اللغتان في محركات البحث؟',
        },
        answer: {
          en: 'Each language has its own URL, canonical tag, hreflang alternates, sitemap entry, and metadata, which is what search engines need to index and serve the right version.',
          ar: 'لكل لغة رابطها ووسم canonical وبدائل hreflang وإدخالها في خريطة الموقع وبياناتها الوصفية، وهذا ما تحتاجه محركات البحث لفهرسة النسخة الصحيحة وعرضها.',
        },
      },
    ],
    h2Sections: [
      { en: 'Why Arabic Cannot Be a Translation Layer', ar: 'لماذا لا يمكن أن تكون العربية طبقة ترجمة' },
      { en: 'How One Codebase Serves Two Directions', ar: 'كيف تخدم قاعدة كود واحدة اتجاهين' },
      { en: 'How Each Language Gets Its Own Metadata and Sitemap', ar: 'كيف تحصل كل لغة على بياناتها الوصفية وخريطة موقعها' },
      { en: 'How Web Apps Connect to Your Backend', ar: 'كيف تتصل تطبيقات الويب بنظامك الخلفي' },
      { en: 'What Launch and Handover Include', ar: 'ما يشمله الإطلاق والتسليم' },
    ],
    relatedServices: ['seo-services', 'software-engineering'],
    saudiContext: {
      en: 'Many Gulf businesses need Arabic as the primary language, with English for partners and international customers. We build both as first-class experiences and treat Arabic search behaviour separately from English.',
      ar: 'تحتاج كثير من شركات الخليج العربية كلغة رئيسية مع الإنجليزية للشركاء والعملاء الدوليين. نبني كلتيهما كتجربة أصيلة ونتعامل مع سلوك البحث العربي بشكل منفصل عن الإنجليزي.',
    },
  },
  {
    slug: 'saas-erp',
    title: {
      en: 'SaaS, ERP, and Business Systems',
      ar: 'أنظمة SaaS وERP وأنظمة الأعمال',
    },
    shortDescription: {
      en: 'Multi-module business platforms: ERP, CRM, HR, project management, and billing, with multi-tenant options.',
      ar: 'منصات أعمال متعددة الوحدات: ERP وCRM وموارد بشرية وإدارة مشاريع وفوترة، مع خيارات تعدد المستأجرين.',
    },
    summary: {
      en: 'Rumuze builds business platforms that combine ERP, HRM, CRM, project management, payments, and support in one codebase, split into modules that can be enabled independently. RumuzePMO, our own Laravel 12 platform, is built this way.',
      ar: 'تبني رموز منصات أعمال تجمع ERP والموارد البشرية وCRM وإدارة المشاريع والمدفوعات والدعم في قاعدة كود واحدة، مقسمة إلى وحدات يمكن تفعيلها بشكل مستقل. وRumuzePMO، منصتنا الخاصة بـ Laravel 12، مبنية بهذه الطريقة.',
    },
    metaDescription: {
      en: 'ERP, HRM, CRM, project management, and payments in one modular codebase, built the way our own RumuzePMO platform is built.',
      ar: 'ERP وموارد بشرية وCRM وإدارة مشاريع ومدفوعات في قاعدة كود واحدة مقسمة إلى وحدات، بالأسلوب نفسه الذي بُنيت به منصتنا RumuzePMO.',
    },
    keywords: ['ERP development', 'CRM development', 'SaaS platform', 'multi-tenant', 'HR system'],
    geoScope: ['Saudi Arabia', 'UAE', 'Egypt', 'MENA'],
    industries: ['Business operations', 'Human resources', 'Sales and CRM', 'Project management'],
    definitions: {
      short: {
        en: 'Modular ERP, CRM, HR, and project-management platforms with role-based access and payment integration.',
        ar: 'منصات معيارية للـ ERP وCRM والموارد البشرية وإدارة المشاريع بصلاحيات قائمة على الأدوار وتكامل مع الدفع.',
      },
      medium: {
        en: 'We build systems where each business area is a module with its own routes, services, and data, activated through configuration. Multi-tenant designs isolate each customer, with tooling to check that queries and writes respect tenant boundaries.',
        ar: 'نبني أنظمة يكون فيها كل مجال عمل وحدة بمساراتها وخدماتها وبياناتها، تُفعَّل عبر الإعدادات. وتعزل التصاميم متعددة المستأجرين كل عميل، مع أدوات للتحقق من أن الاستعلامات والكتابة تحترم حدود المستأجر.',
      },
      long: {
        en: 'RumuzePMO covers finance and inventory (ERP), employees and payroll (HRM), leads and pipelines (CRM), projects and timesheets, multi-gateway billing, and support workflows. It uses contract-first module boundaries, tenant-isolation tooling, request tracing, a Docker and FrankenPHP deployment stack, and Redis-backed queues, and integrates a wide range of payment gateways.',
        ar: 'تغطي RumuzePMO المالية والمخزون (ERP) والموظفين والرواتب (HRM) والعملاء المحتملين وخطوط المبيعات (CRM) والمشاريع وسجلات الوقت والفوترة عبر بوابات دفع متعددة وسير عمل الدعم. وتعتمد حدود وحدات قائمة على العقود وأدوات عزل المستأجرين وتتبع الطلبات وحزمة نشر بـ Docker وFrankenPHP وطوابير Redis، وتتكامل مع مجموعة واسعة من بوابات الدفع.',
      },
      bullets: {
        en: [
          'ERP, HRM, CRM, and project management modules',
          'Module-level activation through configuration',
          'Multi-tenant isolation and role-based access',
          'Multi-gateway payment integration',
          'Docker-based deployment with health checks',
        ],
        ar: [
          'وحدات ERP والموارد البشرية وCRM وإدارة المشاريع',
          'تفعيل على مستوى الوحدة عبر الإعدادات',
          'عزل متعدد المستأجرين وصلاحيات قائمة على الأدوار',
          'تكامل مع بوابات دفع متعددة',
          'نشر بـ Docker مع فحوصات صحة',
        ],
      },
    },
    category: 'software',
    problemSolved: {
      en: 'Operations split across spreadsheets and disconnected tools, or a generic off-the-shelf product that cannot follow the way the business actually works.',
      ar: 'عمليات موزعة بين الجداول وأدوات غير مترابطة، أو منتج جاهز عام لا يستطيع مجاراة طريقة عمل الشركة الفعلية.',
    },
    targetAudience: {
      en: 'Businesses that need a custom operations platform, and founders building a multi-tenant SaaS product.',
      ar: 'الشركات التي تحتاج منصة عمليات مخصصة، والمؤسسون الذين يبنون منتج SaaS متعدد المستأجرين.',
    },
    differentiators: {
      en: [
        'We build and run a platform of this kind ourselves',
        'Modules can be switched on independently',
        'Tenant-isolation checks built into the tooling',
        'Documented architecture and deployment runbooks',
      ],
      ar: [
        'نبني ونشغّل بأنفسنا منصة من هذا النوع',
        'يمكن تفعيل الوحدات بشكل مستقل',
        'فحوصات عزل المستأجرين مدمجة في الأدوات',
        'معمارية موثقة ودلائل نشر',
      ],
    },
    faqs: [
      {
        question: {
          en: 'What is a modular monolith and why use one for an ERP?',
          ar: 'ما هو Modular Monolith ولماذا يُستخدم في أنظمة ERP؟',
        },
        answer: {
          en: 'It is a single deployable application divided into modules with strict boundaries. It keeps deployment and data consistency simple, while letting teams work on modules independently.',
          ar: 'هو تطبيق واحد قابل للنشر مقسم إلى وحدات بحدود صارمة. يبسّط النشر واتساق البيانات، ويتيح للفرق العمل على الوحدات بشكل مستقل.',
        },
      },
      {
        question: {
          en: 'Can you extend or take over an existing business system?',
          ar: 'هل يمكنكم توسعة أو تسلّم نظام أعمال قائم؟',
        },
        answer: {
          en: 'Yes. We start with a technical review of the architecture, data model, and deployment, then recommend whether to extend, refactor, or rebuild.',
          ar: 'نعم. نبدأ بمراجعة تقنية للمعمارية ونموذج البيانات والنشر، ثم نوصي بالتوسعة أو إعادة الهيكلة أو إعادة البناء.',
        },
      },
    ],
    h2Sections: [
      { en: 'What Modules a Business Platform Usually Needs', ar: 'ما الوحدات التي تحتاجها منصة الأعمال عادةً' },
      { en: 'How Multi-Tenancy Keeps Customer Data Separate', ar: 'كيف يحفظ تعدد المستأجرين بيانات العملاء منفصلة' },
      { en: 'How Payments Are Integrated', ar: 'كيف تُدمج المدفوعات' },
      { en: 'How the Platform Is Deployed and Monitored', ar: 'كيف تُنشر المنصة وتُراقب' },
      { en: 'How an Existing System Is Reviewed or Taken Over', ar: 'كيف يُراجع نظام قائم أو يُتسلَّم' },
    ],
    relatedServices: ['software-engineering', 'marketing-infrastructure'],
    saudiContext: {
      en: 'Gulf businesses often need Arabic reports and invoices, regional payment gateways, and role structures that match local organisations. We build these into the modules rather than customising afterwards, and we document where data is stored.',
      ar: 'تحتاج شركات الخليج غالباً إلى تقارير وفواتير بالعربية وبوابات دفع إقليمية وهياكل صلاحيات تناسب المؤسسات المحلية. نبني ذلك داخل الوحدات بدل التخصيص لاحقاً، ونوثق مكان حفظ البيانات.',
    },
  },
  {
    slug: 'marketing-infrastructure',
    title: {
      en: 'Integrations, Tracking, and Data',
      ar: 'التكامل والتتبع والبيانات',
    },
    shortDescription: {
      en: 'Connecting your website, CRM, and analytics so leads are routed and numbers can be trusted.',
      ar: 'ربط موقعك وCRM وأدوات التحليلات ليُوجَّه العملاء المحتملون وتصبح الأرقام موثوقة.',
    },
    summary: {
      en: 'Rumuze connects websites, forms, CRM systems, and analytics tools: structured lead intake, source capture, event and conversion tracking, CRM field mapping, and reporting dashboards, so sales and leadership work from the same data.',
      ar: 'تربط رموز المواقع والنماذج وأنظمة CRM وأدوات التحليلات: استقبال منظم للعملاء المحتملين والتقاط المصدر وتتبع الأحداث والتحويلات وربط حقول CRM ولوحات التقارير، فتعمل المبيعات والإدارة على البيانات نفسها.',
    },
    metaDescription: {
      en: 'Connect websites, forms, CRM, and analytics: structured lead intake, source capture, conversion tracking, CRM field mapping, and reporting.',
      ar: 'ربط المواقع والنماذج وCRM والتحليلات: استقبال منظم للعملاء المحتملين والتقاط المصدر وتتبع التحويلات وربط حقول CRM والتقارير.',
    },
    keywords: ['CRM integration', 'conversion tracking', 'lead routing', 'analytics setup', 'reporting dashboards'],
    geoScope: ['Saudi Arabia', 'UAE', 'Egypt', 'MENA'],
    industries: ['Sales operations', 'Marketing operations', 'Reporting'],
    definitions: {
      short: {
        en: 'CRM integration, lead intake, event tracking, and reporting dashboards connected end to end.',
        ar: 'تكامل CRM واستقبال العملاء المحتملين وتتبع الأحداث ولوحات التقارير، مربوطة من البداية للنهاية.',
      },
      medium: {
        en: 'We define an event and conversion taxonomy, capture the request source and intent at submission, map the data into CRM fields, and expose it in dashboards. Consent and privacy handling are designed into the collection layer.',
        ar: 'نحدد تصنيفاً للأحداث والتحويلات، ونلتقط مصدر الطلب ونيته عند الإرسال، ونربط البيانات بحقول CRM، ونعرضها في لوحات. ويُصمَّم التعامل مع الموافقة والخصوصية داخل طبقة الجمع.',
      },
      long: {
        en: 'This website uses the same approach: a structured intake form that records the engagement type, market, systems in use, and source for each request, and creates a normalised thread for internal review instead of a free-text message. We build equivalent flows and integrations for client sites.',
        ar: 'يستخدم هذا الموقع النهج نفسه: نموذج استقبال منظم يسجل نوع التعاقد والسوق والأنظمة المستخدمة والمصدر لكل طلب، وينشئ محادثة موحدة للمراجعة الداخلية بدل رسالة نصية حرة. ونبني مسارات وتكاملات مماثلة لمواقع العملاء.',
      },
      bullets: {
        en: [
          'Structured lead intake with source capture',
          'Event and conversion taxonomy',
          'CRM field mapping and lifecycle stages',
          'Server-side tracking where appropriate',
          'Reporting dashboards',
        ],
        ar: [
          'استقبال منظم للعملاء المحتملين مع التقاط المصدر',
          'تصنيف للأحداث والتحويلات',
          'ربط حقول CRM ومراحل دورة الحياة',
          'تتبع من جانب الخادم عند الحاجة',
          'لوحات تقارير',
        ],
      },
    },
    category: 'marketing',
    problemSolved: {
      en: 'Leads arrive as unstructured messages, CRM data is partial, and nobody trusts which channel produced which result.',
      ar: 'يصل العملاء المحتملون كرسائل غير منظمة، وبيانات CRM ناقصة، ولا أحد يثق بأي قناة أنتجت أي نتيجة.',
    },
    targetAudience: {
      en: 'Teams with a website and a CRM that do not talk to each other, or whose reporting cannot be trusted.',
      ar: 'الفرق التي لديها موقع وCRM غير متصلين، أو التي لا يمكن الوثوق بتقاريرها.',
    },
    differentiators: {
      en: [
        'Built by engineers, so the data model is treated as a real system',
        'We use the same intake approach on our own website',
        'No promised uplift figures, only what can be measured',
        'Privacy and consent designed into collection',
      ],
      ar: [
        'يبنيها مهندسون، فيُعامل نموذج البيانات كنظام حقيقي',
        'نستخدم نهج الاستقبال نفسه في موقعنا',
        'لا وعود بنسب تحسن، فقط ما يمكن قياسه',
        'الخصوصية والموافقة مصممتان داخل الجمع',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Do you promise specific increases in leads or revenue?',
          ar: 'هل تعدون بزيادات محددة في العملاء المحتملين أو الإيرادات؟',
        },
        answer: {
          en: 'No. We build the tracking, routing, and reporting so results can be measured accurately. Outcomes depend on your market, offer, and spend.',
          ar: 'لا. نبني التتبع والتوجيه والتقارير لتُقاس النتائج بدقة. أما النتائج فتعتمد على سوقك وعرضك وإنفاقك.',
        },
      },
      {
        question: {
          en: 'Which CRM systems can you integrate?',
          ar: 'ما أنظمة CRM التي يمكنكم ربطها؟',
        },
        answer: {
          en: 'Any CRM with an API or webhooks, including custom ones. We confirm the exact integration approach during a technical review.',
          ar: 'أي نظام CRM يوفر API أو Webhooks، بما في ذلك الأنظمة المخصصة. ونؤكد أسلوب الربط الدقيق أثناء المراجعة التقنية.',
        },
      },
    ],
    h2Sections: [
      { en: 'What a Structured Lead Intake Captures', ar: 'ما الذي يلتقطه الاستقبال المنظم للعملاء المحتملين' },
      { en: 'How Events and Conversions Are Defined', ar: 'كيف تُعرَّف الأحداث والتحويلات' },
      { en: 'How Data Reaches the CRM', ar: 'كيف تصل البيانات إلى CRM' },
      { en: 'How Consent and Privacy Are Handled', ar: 'كيف تُعالج الموافقة والخصوصية' },
      { en: 'What Reporting Leadership Gets', ar: 'ما التقارير التي تصل إلى الإدارة' },
    ],
    relatedServices: ['seo-services', 'software-engineering'],
    saudiContext: {
      en: 'Tracking in the Gulf has to respect platform-specific consent rules and, where relevant, data-residency expectations. We design the collection layer around those constraints and record what is collected and where it is stored.',
      ar: 'يجب أن يحترم التتبع في الخليج قواعد الموافقة الخاصة بكل منصة، وعند الاقتضاء توقعات موقع حفظ البيانات. نصمم طبقة الجمع وفق هذه القيود ونسجل ما يُجمع وأين يُخزَّن.',
    },
  },
  {
    slug: 'seo-services',
    title: {
      en: 'Technical SEO and Structured Data',
      ar: 'تحسين محركات البحث التقني والبيانات المنظمة',
    },
    shortDescription: {
      en: 'Technical SEO, structured data, and answer-engine readiness for bilingual Arabic and English sites.',
      ar: 'تحسين محركات البحث التقني والبيانات المنظمة والجاهزية لمحركات الإجابة للمواقع ثنائية اللغة عربي وإنجليزي.',
    },
    summary: {
      en: 'Rumuze implements the technical side of search visibility for Arabic and English sites: canonical and hreflang tags, sitemaps, JSON-LD structured data, crawlable rendering, and machine-readable summaries such as llms.txt that help search and answer engines understand a site.',
      ar: 'تنفذ رموز الجانب التقني لظهور المواقع العربية والإنجليزية في البحث: وسوم canonical وhreflang وخرائط الموقع وبيانات JSON-LD المنظمة وعرضاً قابلاً للزحف وملخصات مقروءة آلياً مثل llms.txt تساعد محركات البحث والإجابة على فهم الموقع.',
    },
    metaDescription: {
      en: 'Technical SEO for Arabic and English sites: canonical and hreflang, sitemaps, JSON-LD structured data, crawlable rendering, and llms.txt.',
      ar: 'تحسين تقني لمحركات البحث للمواقع العربية والإنجليزية: canonical وhreflang وخرائط الموقع وبيانات JSON-LD وعرض قابل للزحف وllms.txt.',
    },
    keywords: ['technical SEO', 'structured data', 'JSON-LD', 'hreflang', 'answer engine optimization'],
    geoScope: ['Saudi Arabia', 'UAE', 'Egypt', 'MENA'],
    industries: ['Business websites', 'Web applications'],
    definitions: {
      short: {
        en: 'Canonical and hreflang setup, sitemaps, JSON-LD, and crawlable rendering for bilingual sites.',
        ar: 'إعداد canonical وhreflang وخرائط الموقع وJSON-LD وعرض قابل للزحف للمواقع ثنائية اللغة.',
      },
      medium: {
        en: 'We audit how a site is crawled and rendered, fix duplicate and missing metadata, add structured data that matches visible content, and publish machine-readable summaries. Structured data is only added where the same information is visible on the page.',
        ar: 'ندقق كيف يُزحف الموقع ويُعرض، ونصلح البيانات الوصفية المكررة والمفقودة، ونضيف بيانات منظمة تطابق المحتوى المرئي، وننشر ملخصات مقروءة آلياً. ولا تُضاف البيانات المنظمة إلا حيث تظهر المعلومة نفسها في الصفحة.',
      },
      long: {
        en: 'On this website, structured data is generated from the same content shown on the page, including the homepage FAQ, the organisation, and the services. Sitemaps carry hreflang alternates for both languages, robots rules address search and answer-engine crawlers, and llms.txt summarises the company and its products. We apply the same discipline to client sites.',
        ar: 'في هذا الموقع تُولَّد البيانات المنظمة من المحتوى نفسه المعروض في الصفحة، بما فيها الأسئلة الشائعة في الرئيسية والمنظمة والخدمات. وتحمل خرائط الموقع بدائل hreflang للغتين، وتخاطب قواعد robots زواحف البحث والإجابة، ويلخص llms.txt الشركة ومنتجاتها. ونطبق الانضباط نفسه على مواقع العملاء.',
      },
      bullets: {
        en: [
          'Canonical, hreflang, and sitemap setup',
          'JSON-LD that matches visible content',
          'Crawlable rendering and metadata fixes',
          'Robots rules for search and answer-engine crawlers',
          'llms.txt and machine-readable summaries',
        ],
        ar: [
          'إعداد canonical وhreflang وخريطة الموقع',
          'JSON-LD مطابق للمحتوى المرئي',
          'عرض قابل للزحف وإصلاح البيانات الوصفية',
          'قواعد robots لزواحف البحث والإجابة',
          'llms.txt وملخصات مقروءة آلياً',
        ],
      },
    },
    category: 'marketing',
    problemSolved: {
      en: 'Bilingual sites with duplicate or missing metadata, wrong or invisible structured data, and one language that search engines barely index.',
      ar: 'مواقع ثنائية اللغة ببيانات وصفية مكررة أو مفقودة وبيانات منظمة خاطئة أو غير مرئية ولغة واحدة بالكاد تفهرسها محركات البحث.',
    },
    targetAudience: {
      en: 'Businesses whose website is technically sound but not being found or understood by search and answer engines.',
      ar: 'الشركات التي موقعها سليم تقنياً لكنه لا يُكتشف أو لا يُفهم من محركات البحث والإجابة.',
    },
    differentiators: {
      en: [
        'Implemented by engineers who build the site',
        'Structured data only where the content is visible',
        'Both languages treated as separate search targets',
        'No ranking guarantees',
      ],
      ar: [
        'ينفذها مهندسون يبنون الموقع',
        'بيانات منظمة فقط حيث يكون المحتوى مرئياً',
        'كل لغة تُعامل كهدف بحث منفصل',
        'لا ضمانات لترتيب النتائج',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Can you guarantee a Google ranking?',
          ar: 'هل تضمنون ترتيباً معيناً في Google؟',
        },
        answer: {
          en: 'No one can. We make sure the site is crawlable, correctly described, and structured for search and answer engines. Rankings depend on content quality, competition, and time.',
          ar: 'لا أحد يستطيع. نتأكد أن الموقع قابل للزحف ووصفه صحيح ومنظم لمحركات البحث والإجابة. أما الترتيب فيعتمد على جودة المحتوى والمنافسة والوقت.',
        },
      },
      {
        question: {
          en: 'What is llms.txt?',
          ar: 'ما هو llms.txt؟',
        },
        answer: {
          en: 'A plain-text file at the site root that summarises what a company does and links to its key pages, written for language models and answer engines that read the web.',
          ar: 'ملف نصي في جذر الموقع يلخص ما تفعله الشركة ويربط بصفحاتها الرئيسية، مكتوب للنماذج اللغوية ومحركات الإجابة التي تقرأ الويب.',
        },
      },
    ],
    h2Sections: [
      { en: 'How Search Engines Crawl and Render a Bilingual Site', ar: 'كيف تزحف محركات البحث وتعرض موقعاً ثنائي اللغة' },
      { en: 'How Canonical and Hreflang Tags Prevent Duplicates', ar: 'كيف تمنع وسوم canonical وhreflang التكرار' },
      { en: 'How Structured Data Should Match the Page', ar: 'كيف يجب أن تطابق البيانات المنظمة الصفحة' },
      { en: 'How Answer Engines Read a Site', ar: 'كيف تقرأ محركات الإجابة الموقع' },
      { en: 'How Progress Is Measured', ar: 'كيف يُقاس التقدم' },
    ],
    relatedServices: ['web-development', 'marketing-infrastructure'],
    saudiContext: {
      en: 'Arabic search queries differ from English ones in phrasing and spelling variants. We treat each language as its own target, with its own metadata and content, rather than mirroring the English site.',
      ar: 'تختلف استعلامات البحث العربية عن الإنجليزية في الصياغة وتنويعات الإملاء. نتعامل مع كل لغة كهدف مستقل ببياناتها الوصفية ومحتواها بدل محاكاة الموقع الإنجليزي.',
    },
  },
];
