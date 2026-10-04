type LanguageCode = 'en' | 'ar';

interface Localized {
  en: string;
  ar: string;
}

interface LocalizedArray {
  en: string[];
  ar: string[];
}

interface ServiceFAQ {
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
    slug: 'digital-solutions',
    title: {
      en: 'From Idea to Digital Solution',
      ar: 'من الفكرة إلى الحل الرقمي',
    },
    shortDescription: {
      en: 'Turn a business idea or a manual process into a working digital product: scoped, built, launched, and handed over.',
      ar: 'نحوّل فكرة تجارية أو عملية يدوية إلى منتج رقمي يعمل: نحدد نطاقه ونبنيه ونطلقه ونسلّمه.',
    },
    summary: {
      en: 'Many projects start as an idea, a spreadsheet, or a chat group that has outgrown itself. Rumuze helps you define the problem, agree the smallest useful first version, choose the architecture, build it across web, mobile, and backend, and hand it over with documentation. The same team can then run the marketing that brings users to it.',
      ar: 'تبدأ مشاريع كثيرة كفكرة أو جدول بيانات أو مجموعة محادثة تجاوزت حدودها. تساعدك رموز على تحديد المشكلة والاتفاق على أصغر نسخة أولى مفيدة واختيار المعمارية وبنائها عبر الويب والموبايل والخلفية، ثم تسليمها مع التوثيق. ويمكن للفريق نفسه بعد ذلك إدارة التسويق الذي يجلب المستخدمين إليها.',
    },
    metaDescription: {
      en: 'Turn an idea or manual process into a digital product: scoping, architecture, web, mobile and backend build, launch, and handover with documentation.',
      ar: 'نحوّل الفكرة أو العملية اليدوية إلى منتج رقمي: تحديد النطاق والمعمارية وبناء الويب والموبايل والخلفية والإطلاق والتسليم مع التوثيق.',
    },
    keywords: ['digital transformation', 'idea to product', 'MVP development', 'custom software', 'digitise business processes'],
    geoScope: ['Saudi Arabia', 'UAE', 'Egypt', 'MENA'],
    industries: ['Startups', 'Operations-heavy businesses', 'Service businesses'],
    definitions: {
      short: {
        en: 'Scoping, architecture, build, launch, and handover for a new digital product or a digitised process.',
        ar: 'تحديد النطاق والمعمارية والبناء والإطلاق والتسليم لمنتج رقمي جديد أو عملية جرت رقمنتها.',
      },
      medium: {
        en: 'We start from the problem, not the feature list. Together we decide who the first users are, what the first version must do, and what can wait. Then we build it in stages, so you see working software early and can change direction while changes are still cheap.',
        ar: 'نبدأ من المشكلة لا من قائمة الميزات. نقرر معاً من هم أوائل المستخدمين وماذا يجب أن تفعل النسخة الأولى وما الذي يمكن تأجيله. ثم نبني على مراحل لترى برمجيات تعمل مبكراً وتغيّر الاتجاه بينما التغيير ما زال رخيصاً.',
      },
      long: {
        en: 'We run our own platforms, so the questions we ask come from operating software, not only building it: how data will be migrated, who administers the system, what happens when a payment fails, how the Arabic and English versions stay in step. The result is a product that can be run and extended by your team, with the architecture and runbooks written down.',
        ar: 'نشغّل منصاتنا بأنفسنا، فأسئلتنا تأتي من تشغيل البرمجيات لا من بنائها فقط: كيف تُنقل البيانات ومن يدير النظام وماذا يحدث عند فشل دفعة وكيف تبقى النسختان العربية والإنجليزية متطابقتين. والنتيجة منتج يستطيع فريقك تشغيله وتطويره، بمعمارية ودلائل تشغيل مكتوبة.',
      },
      bullets: {
        en: [
          'Problem definition and first-version scope',
          'Architecture and technology choice, explained in plain language',
          'Web, mobile, and backend build in stages',
          'Moving manual workflows and spreadsheets into a system',
          'Launch and handover with documentation and runbooks',
        ],
        ar: [
          'تحديد المشكلة ونطاق النسخة الأولى',
          'اختيار المعمارية والتقنيات مع شرحها بلغة واضحة',
          'بناء الويب والموبايل والخلفية على مراحل',
          'نقل العمليات اليدوية وجداول البيانات إلى نظام',
          'الإطلاق والتسليم مع التوثيق ودلائل التشغيل',
        ],
      },
    },
    category: 'software',
    problemSolved: {
      en: 'An idea that is hard to specify, a process that lives in spreadsheets and messages, or a first version that grew without a plan.',
      ar: 'فكرة يصعب توصيفها، أو عملية تعيش في جداول ورسائل، أو نسخة أولى نمت بلا خطة.',
    },
    targetAudience: {
      en: 'Founders with an idea, and businesses that want to move a manual process into software.',
      ar: 'المؤسسون أصحاب الأفكار، والشركات التي تريد نقل عملية يدوية إلى برمجيات.',
    },
    differentiators: {
      en: [
        'We start from the problem and the first users, not a feature list',
        'Working software in stages, so direction can change early',
        'Built by the team that runs its own platforms',
        'Marketing can follow from the same team once the product is live',
      ],
      ar: [
        'نبدأ من المشكلة وأوائل المستخدمين لا من قائمة ميزات',
        'برمجيات تعمل على مراحل ليتغير الاتجاه مبكراً',
        'يبنيها الفريق الذي يشغّل منصاته الخاصة',
        'يمكن للتسويق أن يتبع من الفريق نفسه بعد إطلاق المنتج',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Do I need a finished specification to start?',
          ar: 'هل أحتاج مواصفات مكتملة كي نبدأ؟',
        },
        answer: {
          en: 'No. Many projects begin with a description of the problem. Defining the scope of a first version is part of the work.',
          ar: 'لا. تبدأ مشاريع كثيرة بوصف للمشكلة. وتحديد نطاق النسخة الأولى جزء من العمل.',
        },
      },
      {
        question: {
          en: 'Can we build only a first version and extend it later?',
          ar: 'هل يمكن بناء نسخة أولى فقط وتطويرها لاحقاً؟',
        },
        answer: {
          en: 'Yes, and it is usually the better route. We choose an architecture that lets modules be added later without rewriting what already works.',
          ar: 'نعم، وهو غالباً المسار الأفضل. نختار معمارية تسمح بإضافة وحدات لاحقاً دون إعادة كتابة ما يعمل.',
        },
      },
    ],
    h2Sections: [
      { en: 'How We Turn an Idea into a First Version', ar: 'كيف نحوّل الفكرة إلى نسخة أولى' },
      { en: 'How We Choose the Architecture', ar: 'كيف نختار المعمارية' },
      { en: 'What You Receive at Handover', ar: 'ما الذي تتسلمه عند التسليم' },
    ],
    relatedServices: ['software-engineering', 'web-development', 'mobile-apps', 'paid-advertising'],
    saudiContext: {
      en: 'Products for the Gulf often need Arabic-first interfaces, regional payment gateways, and clear decisions about where data lives. We plan for these from the first scope.',
      ar: 'تحتاج المنتجات الموجهة للخليج غالباً إلى واجهات عربية أولاً وبوابات دفع إقليمية وقرارات واضحة حول مكان حفظ البيانات. نخطط لها منذ أول نطاق.',
    },
  },
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
    slug: 'paid-advertising',
    title: {
      en: 'Paid Advertising Management',
      ar: 'إدارة الإعلانات المدفوعة',
    },
    shortDescription: {
      en: 'Planning, launching, and optimising paid campaigns, with conversion tracking set up properly and reporting you can read.',
      ar: 'تخطيط الحملات المدفوعة وإطلاقها وتحسينها، مع إعداد سليم لتتبع التحويلات وتقارير يسهل فهمها.',
    },
    summary: {
      en: 'Rumuze plans and manages paid campaigns on major advertising platforms such as Google and Meta, in Arabic and English. Because the same team builds websites and tracking, campaigns start from working conversion tracking and landing pages that load fast, and results are reported against what the business actually counts as a lead or a sale.',
      ar: 'تخطط رموز وتدير الحملات المدفوعة على منصات الإعلان الكبرى مثل Google وMeta، بالعربية والإنجليزية. ولأن الفريق نفسه يبني المواقع والتتبع، تبدأ الحملات من تتبع تحويلات يعمل وصفحات هبوط سريعة، وتُقدَّم النتائج مقابل ما تعدّه الشركة فعلاً عميلاً محتملاً أو عملية بيع.',
    },
    metaDescription: {
      en: 'Paid advertising management on Google and Meta in Arabic and English: campaign planning, conversion tracking, landing pages, optimisation, and clear reporting.',
      ar: 'إدارة الإعلانات المدفوعة على Google وMeta بالعربية والإنجليزية: تخطيط الحملات وتتبع التحويلات وصفحات الهبوط والتحسين وتقارير واضحة.',
    },
    keywords: ['paid advertising', 'Google Ads management', 'Meta ads', 'performance marketing', 'conversion tracking'],
    geoScope: ['Saudi Arabia', 'UAE', 'Egypt', 'MENA'],
    industries: ['Service businesses', 'E-commerce', 'B2B companies'],
    definitions: {
      short: {
        en: 'Campaign planning, setup, optimisation, and reporting on major ad platforms, built on working conversion tracking.',
        ar: 'تخطيط الحملات وإعدادها وتحسينها والتقارير على منصات الإعلان الكبرى، فوق تتبع تحويلات يعمل.',
      },
      medium: {
        en: 'We agree what counts as a result first, then make sure it is measured correctly before spending begins. Campaigns are structured so that each audience, message, and landing page can be compared, and changes are made one at a time so their effect can be read.',
        ar: 'نتفق أولاً على ما يُعدّ نتيجة، ونتأكد من قياسه بشكل صحيح قبل بدء الإنفاق. تُبنى الحملات بحيث يمكن مقارنة كل جمهور ورسالة وصفحة هبوط، وتُجرى التعديلات واحداً تلو الآخر ليمكن قراءة أثرها.',
      },
      long: {
        en: 'Paid campaigns fail most often at the join between the ad and the business: tracking that misses leads that arrive by phone or chat, landing pages that load slowly on mobile, and reports that count clicks instead of enquiries. We treat that join as an engineering problem. We do not promise a cost per lead or a return, because both depend on the market, the offer, and the budget. We promise that what is reported can be traced back to what happened.',
        ar: 'تفشل الحملات المدفوعة غالباً عند الوصلة بين الإعلان والنشاط: تتبع يفوّت العملاء الذين يصلون بالهاتف أو المحادثة، وصفحات هبوط بطيئة على الموبايل، وتقارير تعدّ النقرات لا الاستفسارات. نتعامل مع هذه الوصلة كمشكلة هندسية. ولا نعد بتكلفة معينة للعميل المحتمل ولا بعائد، لأن كليهما يعتمد على السوق والعرض والميزانية. ما نعد به أن ما يُقدَّم في التقارير يمكن تتبعه إلى ما حدث فعلاً.',
      },
      bullets: {
        en: [
          'Campaign planning and account structure',
          'Conversion tracking and attribution set up before launch',
          'Landing pages built for speed on mobile, in Arabic and English',
          'Creative and audience testing, one change at a time',
          'Reporting tied to leads and sales, not only clicks',
        ],
        ar: [
          'تخطيط الحملات وهيكلة الحساب',
          'إعداد تتبع التحويلات والإسناد قبل الإطلاق',
          'صفحات هبوط سريعة على الموبايل بالعربية والإنجليزية',
          'اختبار المواد الإعلانية والجماهير بتغيير واحد في كل مرة',
          'تقارير مرتبطة بالعملاء المحتملين والمبيعات لا بالنقرات فقط',
        ],
      },
    },
    category: 'marketing',
    problemSolved: {
      en: 'Ad spend that cannot be tied to leads or sales, tracking that misses real enquiries, and landing pages that lose visitors before they act.',
      ar: 'إنفاق إعلاني لا يمكن ربطه بعملاء أو مبيعات، وتتبع يفوّت الاستفسارات الحقيقية، وصفحات هبوط تفقد الزوار قبل أن يتصرفوا.',
    },
    targetAudience: {
      en: 'Businesses that already advertise or are about to, and want results measured against real leads and sales.',
      ar: 'الشركات التي تعلن بالفعل أو توشك على ذلك وتريد قياس النتائج مقابل عملاء ومبيعات حقيقية.',
    },
    differentiators: {
      en: [
        'The team that builds the website and tracking also runs the campaigns',
        'Tracking is checked before budget is spent',
        'No promised cost per lead or return on spend',
        'Arabic and English treated as separate audiences',
      ],
      ar: [
        'الفريق الذي يبني الموقع والتتبع هو الذي يدير الحملات',
        'يُفحص التتبع قبل إنفاق الميزانية',
        'لا وعود بتكلفة للعميل المحتمل أو بعائد على الإنفاق',
        'العربية والإنجليزية كجمهورين منفصلين',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Can you promise a cost per lead or a return on ad spend?',
          ar: 'هل تعدون بتكلفة معينة للعميل المحتمل أو بعائد على الإنفاق الإعلاني؟',
        },
        answer: {
          en: 'No. Both depend on your market, offer, competition, and budget. We set up measurement so that results can be read honestly and decisions made from them.',
          ar: 'لا. كلاهما يعتمد على سوقك وعرضك والمنافسة وميزانيتك. نعد قياساً يجعل النتائج قابلة للقراءة بصدق وتُتخذ القرارات بناءً عليها.',
        },
      },
      {
        question: {
          en: 'Do you need access to my website to run campaigns?',
          ar: 'هل تحتاجون إلى الوصول لموقعي كي تديروا الحملات؟',
        },
        answer: {
          en: 'Usually yes, to install conversion tracking and to improve the landing pages the ads point to. If we built the site, this is already in place.',
          ar: 'غالباً نعم، لتثبيت تتبع التحويلات وتحسين صفحات الهبوط التي تشير إليها الإعلانات. وإن كنا بنينا الموقع فهذا موجود أصلاً.',
        },
      },
    ],
    h2Sections: [
      { en: 'How a Campaign Is Planned and Structured', ar: 'كيف تُخطط الحملة وتُهيكل' },
      { en: 'How Conversion Tracking Is Verified', ar: 'كيف يُتحقق من تتبع التحويلات' },
      { en: 'How Results Are Reported', ar: 'كيف تُقدَّم النتائج' },
    ],
    relatedServices: ['marketing-infrastructure', 'seo-services', 'web-development'],
    saudiContext: {
      en: 'Campaign setup follows each platform\'s consent and policy rules and, where relevant, expectations about where data is stored. Arabic and English audiences are planned separately.',
      ar: 'يتبع إعداد الحملات قواعد الموافقة والسياسات في كل منصة، وعند الاقتضاء توقعات موقع حفظ البيانات. وتُخطط الجماهير العربية والإنجليزية بشكل منفصل.',
    },
  },
  {
    slug: 'seo-services',
    title: {
      en: 'SEO, AEO and GEO',
      ar: 'تحسين محركات البحث والإجابة (SEO وAEO وGEO)',
    },
    shortDescription: {
      en: 'SEO, answer-engine (AEO) and generative-engine (GEO) readiness for Arabic and English sites: technical fixes, structured data, and content that answers real questions.',
      ar: 'جاهزية المواقع العربية والإنجليزية لمحركات البحث (SEO) والإجابة (AEO) والمحركات التوليدية (GEO): إصلاحات تقنية وبيانات منظمة ومحتوى يجيب عن أسئلة حقيقية.',
    },
    summary: {
      en: 'Rumuze implements the technical side of search visibility for Arabic and English sites: canonical and hreflang tags, sitemaps, JSON-LD structured data, crawlable rendering, and machine-readable summaries such as llms.txt that help search and answer engines understand a site.',
      ar: 'تنفذ رموز الجانب التقني لظهور المواقع العربية والإنجليزية في البحث: وسوم canonical وhreflang وخرائط الموقع وبيانات JSON-LD المنظمة وعرضاً قابلاً للزحف وملخصات مقروءة آلياً مثل llms.txt تساعد محركات البحث والإجابة على فهم الموقع.',
    },
    metaDescription: {
      en: 'SEO, AEO and GEO for Arabic and English sites: canonical and hreflang, sitemaps, JSON-LD structured data, crawlable rendering, llms.txt, and answer-ready content.',
      ar: 'SEO وAEO وGEO للمواقع العربية والإنجليزية: canonical وhreflang وخرائط الموقع وبيانات JSON-LD وعرض قابل للزحف وllms.txt ومحتوى جاهز للإجابة.',
    },
    keywords: ['SEO', 'AEO', 'GEO', 'technical SEO', 'structured data', 'JSON-LD', 'hreflang', 'answer engine optimization', 'generative engine optimization'],
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
  {
    slug: 'content-social-media',
    title: {
      en: 'Content and Social Media',
      ar: 'المحتوى ووسائل التواصل الاجتماعي',
    },
    shortDescription: {
      en: 'Bilingual content strategy, writing, design, and publishing for your website and social channels.',
      ar: 'استراتيجية محتوى ثنائية اللغة وكتابة وتصميم ونشر لموقعك وقنواتك على وسائل التواصل.',
    },
    summary: {
      en: 'Rumuze plans and produces content in Arabic and English: articles and landing-page copy for search, and posts for social channels. Content is planned around the questions your customers ask, written for each language rather than translated, and published on a calendar so the work stays consistent.',
      ar: 'تخطط رموز المحتوى وتنتجه بالعربية والإنجليزية: مقالات ونصوص صفحات هبوط للبحث، ومنشورات لقنوات التواصل. يُخطط المحتوى حول الأسئلة التي يطرحها عملاؤك، ويُكتب لكل لغة بدل أن يُترجم، ويُنشر وفق جدول ليبقى العمل متسقاً.',
    },
    metaDescription: {
      en: 'Bilingual content and social media management: content strategy, Arabic and English writing, design, publishing calendars, and reporting.',
      ar: 'إدارة المحتوى ووسائل التواصل بلغتين: استراتيجية المحتوى وكتابة بالعربية والإنجليزية وتصميم وجداول نشر وتقارير.',
    },
    keywords: ['content marketing', 'social media management', 'Arabic content', 'content strategy', 'bilingual copywriting'],
    geoScope: ['Saudi Arabia', 'UAE', 'Egypt', 'MENA'],
    industries: ['Service businesses', 'Technology companies', 'B2B companies'],
    definitions: {
      short: {
        en: 'Content strategy, Arabic and English writing, design, and publishing for web and social channels.',
        ar: 'استراتيجية المحتوى والكتابة بالعربية والإنجليزية والتصميم والنشر للويب وقنوات التواصل.',
      },
      medium: {
        en: 'We start with the questions your customers ask and the topics you can speak about with authority, then plan a calendar across your website and social channels. Each piece is written in the language it will be read in, so Arabic content reads as Arabic and not as a translation.',
        ar: 'نبدأ من الأسئلة التي يطرحها عملاؤك والموضوعات التي تستطيع الحديث عنها بسلطة، ثم نخطط جدولاً عبر موقعك وقنواتك الاجتماعية. ويُكتب كل محتوى باللغة التي سيُقرأ بها، فيُقرأ العربي كعربي لا كترجمة.',
      },
      long: {
        en: 'Content that supports search is written to answer a specific question completely, with clear headings and, where it applies, structured data that matches the visible text. Social content supports it by pointing people to those answers. We keep claims to what you can evidence, and we do not publish invented testimonials, figures, or case studies.',
        ar: 'المحتوى الذي يدعم البحث يُكتب ليجيب عن سؤال محدد إجابة كاملة، بعناوين واضحة وبيانات منظمة تطابق النص المرئي عند الاقتضاء. ويدعمه محتوى التواصل بتوجيه الناس إلى تلك الإجابات. ونُبقي الادعاءات في حدود ما تستطيع إثباته، ولا ننشر شهادات أو أرقاماً أو دراسات حالة مختلقة.',
      },
      bullets: {
        en: [
          'Content strategy built around customer questions',
          'Articles and page copy written separately in Arabic and English',
          'Social posts and visual design for your channels',
          'Publishing calendar and account management',
          'Reporting on reach, engagement, and enquiries',
        ],
        ar: [
          'استراتيجية محتوى مبنية على أسئلة العملاء',
          'مقالات ونصوص صفحات تُكتب بالعربية والإنجليزية بشكل منفصل',
          'منشورات تواصل وتصميم بصري لقنواتك',
          'جدول نشر وإدارة حسابات',
          'تقارير عن الوصول والتفاعل والاستفسارات',
        ],
      },
    },
    category: 'marketing',
    problemSolved: {
      en: 'Irregular posting, content translated word for word, and articles that do not answer what customers actually search for.',
      ar: 'نشر غير منتظم، ومحتوى مترجم حرفياً، ومقالات لا تجيب عمّا يبحث عنه العملاء فعلاً.',
    },
    targetAudience: {
      en: 'Businesses that need a steady, bilingual content presence and do not have an in-house team for it.',
      ar: 'الشركات التي تحتاج حضوراً ثابتاً ثنائي اللغة للمحتوى وليس لديها فريق داخلي لذلك.',
    },
    differentiators: {
      en: [
        'Arabic and English written for their readers, not translated',
        'Content planned with search and answer engines in mind',
        'Claims limited to what can be evidenced',
        'The same team can build the pages the content lives on',
      ],
      ar: [
        'عربي وإنجليزي يُكتبان لقرائهما لا يُترجمان',
        'محتوى يُخطط مع وضع محركات البحث والإجابة في الاعتبار',
        'ادعاءات محصورة فيما يمكن إثباته',
        'الفريق نفسه يستطيع بناء الصفحات التي يعيش فيها المحتوى',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Do you translate content or write it separately for each language?',
          ar: 'هل تترجمون المحتوى أم تكتبونه بشكل منفصل لكل لغة؟',
        },
        answer: {
          en: 'We write separately. A literal translation reads awkwardly and misses how Arabic and English audiences search and speak. Where a piece serves both, we adapt it.',
          ar: 'نكتب بشكل منفصل. الترجمة الحرفية تبدو ركيكة وتفوّت طريقة بحث الجمهور العربي والإنجليزي وحديثه. وحيث يخدم المحتوى الجمهورين نكيّفه.',
        },
      },
      {
        question: {
          en: 'Can you promise follower or traffic growth?',
          ar: 'هل تعدون بنمو في المتابعين أو الزيارات؟',
        },
        answer: {
          en: 'No. Growth depends on the topic, the competition, and how long the work continues. We commit to a consistent calendar, quality, and honest reporting.',
          ar: 'لا. النمو يعتمد على الموضوع والمنافسة ومدة استمرار العمل. نلتزم بجدول منتظم وجودة وتقارير صادقة.',
        },
      },
    ],
    h2Sections: [
      { en: 'How Content Topics Are Chosen', ar: 'كيف تُختار موضوعات المحتوى' },
      { en: 'How Arabic and English Content Differ', ar: 'كيف يختلف المحتوى العربي عن الإنجليزي' },
      { en: 'How Publishing and Reporting Work', ar: 'كيف يعمل النشر والتقارير' },
    ],
    relatedServices: ['seo-services', 'paid-advertising', 'marketing-infrastructure'],
    saudiContext: {
      en: 'Arabic content for the Gulf differs in tone and vocabulary from Egyptian or Levantine Arabic. We agree the target audience and dialect conventions before writing.',
      ar: 'يختلف المحتوى العربي الموجه للخليج في النبرة والمفردات عن المصري أو الشامي. نتفق على الجمهور المستهدف وأعراف اللهجة قبل الكتابة.',
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
];
