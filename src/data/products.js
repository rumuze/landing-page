// Product pages for /portfolio/:slug. Every statement here is read from the
// product's own repository README (see docs/CLAIMS_REGISTRY.md, CR-022 to
// CR-025). Do not add numbers, customers, or results that the repository does
// not show. `title` must match the card title on the work page, which is also
// the key used by architectureDiagrams.js.

export const products = [
  {
    slug: 'rumuzepmo',
    title: 'RumuzePMO',
    stack: ['Laravel 12', 'PHP 8.3', 'MySQL 8', 'Redis 7', 'FrankenPHP', 'Octane', 'Docker'],
    related: ['modular-monolith-architecture', 'tenant-isolation-modular-monolith'],
    en: {
      tag: 'SaaS platform',
      status: '',
      headline: 'RumuzePMO: ERP, HRM, CRM and project management in one modular Laravel system',
      description:
        'RumuzePMO is a Laravel 12 modular monolith that covers ERP, HRM, CRM, project management, payments and support, with tenant-isolation tooling and request tracing.',
      summary:
        'One Laravel 12 codebase that covers the operations of a business, split into seven modules that can be switched on independently.',
      sections: [
        {
          title: 'What it covers',
          items: [
            'Finance, accounting, invoicing, inventory and point of sale (ERP)',
            'Employees, payroll, attendance and recruitment (HRM)',
            'Leads, deals and pipeline workflows (CRM)',
            'Projects, tasks, timesheets and bug tracking',
            'Billing with many payment gateways, including callbacks',
            'Support workflows and public landing content',
          ],
        },
        {
          title: 'How it is built',
          items: [
            'A shared Laravel core with domain modules; modules are activated through configuration',
            'Modules talk through contracts and a query engine, not through each other\'s internals',
            'Runs on FrankenPHP with Laravel Octane; cache, sessions and queues use Redis; data is in MySQL',
            'A request-tracing middleware gives every request a trace id; a health endpoint is served at /up',
          ],
        },
        {
          title: 'How it is kept safe',
          items: [
            'Commands that classify tables as tenant-scoped or global and report enforcement coverage',
            'A tenant query guard with diagnostics, and a circuit breaker for the guard',
            'Architecture checks and boundary scans that find cross-module dependencies in code and in the database',
          ],
        },
      ],
      notYet: [],
    },
    ar: {
      tag: 'منصة SaaS',
      status: '',
      headline: 'RumuzePMO: ERP وHRM وCRM وإدارة المشاريع في نظام Laravel معياري واحد',
      description:
        'RumuzePMO كتلة معيارية بـ Laravel 12 تغطي ERP وHRM وCRM وإدارة المشاريع والمدفوعات والدعم، مع أدوات لعزل المستأجرين وتتبع الطلبات.',
      summary:
        'قاعدة كود واحدة بـ Laravel 12 تغطي عمليات الشركة، مقسمة إلى سبع وحدات يمكن تفعيلها بشكل مستقل.',
      sections: [
        {
          title: 'ماذا تغطي',
          items: [
            'المالية والمحاسبة والفوترة والمخزون ونقاط البيع (ERP)',
            'الموظفون والرواتب والحضور والتوظيف (HRM)',
            'العملاء المحتملون والصفقات وخطوط المبيعات (CRM)',
            'المشاريع والمهام وسجلات الوقت وتتبع الأخطاء',
            'الفوترة عبر عدد كبير من بوابات الدفع مع معالجة ردود البوابات',
            'مسارات الدعم ومحتوى صفحات الهبوط العامة',
          ],
        },
        {
          title: 'كيف بُنيت',
          items: [
            'نواة Laravel مشتركة مع وحدات حسب المجال، وتُفعَّل الوحدات عبر الإعدادات',
            'تتواصل الوحدات عبر عقود ومحرك استعلام، لا عبر الأجزاء الداخلية لبعضها',
            'تعمل على FrankenPHP مع Laravel Octane؛ الكاش والجلسات والطوابير على Redis والبيانات في MySQL',
            'Middleware لتتبع الطلبات يعطي كل طلب معرّف تتبع، ونقطة فحص صحة على /up',
          ],
        },
        {
          title: 'كيف تُحمى',
          items: [
            'أوامر تصنّف الجداول كمقيّدة بالمستأجر أو عامة وتقيس تغطية التطبيق',
            'حارس استعلامات للمستأجرين مع أدوات تشخيص وقاطع دائرة للحارس',
            'فحوصات معمارية وفحص للحدود بين الوحدات يكشف الاعتماد المتبادل في الكود وقاعدة البيانات',
          ],
        },
      ],
      notYet: [],
    },
  },
  {
    slug: 'rveta',
    title: 'Rveta',
    stack: ['Laravel', 'Flutter', 'Firebase', 'Nginx', 'MySQL', 'Redis'],
    related: ['flutter-driver-app-risky-parts'],
    en: {
      tag: 'Delivery operations',
      status: '',
      headline: 'Rveta: a Laravel backend and a Flutter driver app for delivery operations',
      description:
        'Rveta is a delivery operations platform: a Laravel backend and a Flutter driver app with order assignment, status updates, live location, customer chat and push notifications, in Arabic and English.',
      summary:
        'A Laravel backend with a Flutter app for delivery drivers: orders, status updates, live location, customer chat and push notifications, in Arabic and English.',
      sections: [
        {
          title: 'What the driver app does',
          items: [
            'Driver sign-in and startup configuration loaded from the backend',
            'Current orders and order history, with order details and delivery status updates',
            'Live location recording for active deliveries',
            'Chat between the driver and the customer',
            'Push notifications, including when the app is in the background',
            'Arabic and English, with light and dark themes',
          ],
        },
        {
          title: 'How it is built',
          items: [
            'Flutter with provider for state and get_it for dependency injection',
            'An API client with interceptors and central error handling, against a Laravel backend',
            'Firebase for push notifications; maps and location packages for tracking',
            'Foreground and background task support so tracking continues during a delivery',
            'Feature-first folder structure, with tests for providers, models and widgets',
          ],
        },
        {
          title: 'How it is kept safe and shippable',
          items: [
            'Biometric app lock for drivers',
            'Maintenance screens and a documented upgrade runbook',
            'On the backend side: Nginx with Let\'s Encrypt TLS, a scheduler and a queue worker',
          ],
        },
      ],
      notYet: [],
    },
    ar: {
      tag: 'عمليات التوصيل',
      status: '',
      headline: 'Rveta: واجهة Laravel وتطبيق Flutter للسائقين لعمليات التوصيل',
      description:
        'Rveta منصة لعمليات التوصيل: واجهة Laravel وتطبيق Flutter للسائقين يشمل إسناد الطلبات وتحديث الحالة والموقع المباشر ومحادثة العملاء والإشعارات، بالعربية والإنجليزية.',
      summary:
        'واجهة خلفية بـ Laravel مع تطبيق Flutter لسائقي التوصيل: الطلبات وتحديث الحالة والموقع المباشر ومحادثة العملاء والإشعارات، بالعربية والإنجليزية.',
      sections: [
        {
          title: 'ماذا يفعل تطبيق السائق',
          items: [
            'تسجيل دخول السائق وتحميل إعدادات البدء من الخادم',
            'الطلبات الحالية وسجل الطلبات مع تفاصيل الطلب وتحديث حالة التسليم',
            'تسجيل الموقع المباشر أثناء التوصيلات النشطة',
            'محادثة بين السائق والعميل',
            'إشعارات فورية تعمل حتى والتطبيق في الخلفية',
            'العربية والإنجليزية مع وضعين فاتح وداكن',
          ],
        },
        {
          title: 'كيف بُني',
          items: [
            'Flutter مع provider لإدارة الحالة وget_it لحقن الاعتمادات',
            'عميل API مع معترضات ومعالجة مركزية للأخطاء، يتصل بخلفية Laravel',
            'Firebase للإشعارات وحزم الخرائط والموقع للتتبع',
            'دعم المهام في المقدمة والخلفية لاستمرار التتبع أثناء التوصيل',
            'بنية مجلدات قائمة على الميزات مع اختبارات للـ providers والنماذج والواجهات',
          ],
        },
        {
          title: 'كيف يُحمى ويُنشر',
          items: [
            'قفل التطبيق بالبصمة للسائقين',
            'شاشات صيانة وكتيّب موثّق للترقية',
            'في الخلفية: Nginx مع شهادات Let\'s Encrypt ومجدول ومعالج طوابير',
          ],
        },
      ],
      notYet: [],
    },
  },
  {
    slug: 'rumuze-core',
    title: 'Rumuze Core',
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'Socket.IO', 'Next.js 14', 'Docker', 'Nginx'],
    related: ['transactional-outbox-pattern'],
    en: {
      tag: 'Platform kernel',
      status: '',
      headline: 'Rumuze Core: a NestJS platform kernel built on a transactional outbox',
      description:
        'Rumuze Core is a NestJS API with an event bus, a transactional outbox, an integration webhook engine and Socket.IO realtime, with a Next.js administration dashboard.',
      summary:
        'A NestJS API built around a transactional outbox, a webhook engine and Socket.IO realtime, with a Next.js dashboard on top.',
      sections: [
        {
          title: 'What the kernel provides',
          items: [
            'An event bus for domain events and communication between modules',
            'A transactional outbox so events are delivered once the data they describe is committed',
            'A webhook engine for secure inbound webhooks and reliable outbound delivery',
            'A realtime engine on Socket.IO, fanned out through Redis',
            'Platform metrics and trace id propagation',
          ],
        },
        {
          title: 'How it is built',
          items: [
            'A monorepo with a NestJS API and a Next.js 14 dashboard',
            'Prisma on PostgreSQL; Redis for realtime fan-out',
            'Nginx as the reverse proxy for two subdomains, one for the API and one for the dashboard',
            'Docker Compose for local development and production',
          ],
        },
        {
          title: 'How it is operated',
          items: [
            'TLS certificates are issued and renewed automatically through Let\'s Encrypt',
            'The running kernel version is exposed on an internal endpoint, separate from the health check',
            'CORS origins and secrets are configured through environment variables',
          ],
        },
      ],
      notYet: [],
    },
    ar: {
      tag: 'نواة المنصة',
      status: '',
      headline: 'Rumuze Core: نواة منصة بـ NestJS مبنية على Transactional Outbox',
      description:
        'Rumuze Core واجهة NestJS تضم ناقل أحداث وTransactional Outbox ومحرك Webhooks واتصالًا لحظيًا عبر Socket.IO، مع لوحة إدارة بـ Next.js.',
      summary:
        'واجهة NestJS مبنية حول Transactional Outbox ومحرك Webhooks واتصال لحظي عبر Socket.IO، مع لوحة تحكم بـ Next.js.',
      sections: [
        {
          title: 'ماذا توفر النواة',
          items: [
            'ناقل أحداث لأحداث المجال والتواصل بين الوحدات',
            'Transactional Outbox لتسليم الأحداث بعد حفظ البيانات التي تصفها',
            'محرك Webhooks لاستقبال آمن وتسليم موثوق للصادر',
            'محرك اتصال لحظي على Socket.IO يوزّع عبر Redis',
            'مقاييس للمنصة وتمرير معرّف التتبع',
          ],
        },
        {
          title: 'كيف بُنيت',
          items: [
            'مستودع واحد (monorepo) فيه واجهة NestJS ولوحة Next.js 14',
            'Prisma على PostgreSQL وRedis للتوزيع اللحظي',
            'Nginx كوكيل عكسي لنطاقين فرعيين: واحد للواجهة وواحد للوحة',
            'Docker Compose للتطوير المحلي والإنتاج',
          ],
        },
        {
          title: 'كيف تُشغَّل',
          items: [
            'شهادات TLS تُصدر وتُجدَّد تلقائيًا عبر Let\'s Encrypt',
            'إصدار النواة العاملة متاح على نقطة داخلية منفصلة عن فحص الصحة',
            'أصول CORS والأسرار تُضبط عبر متغيرات البيئة',
          ],
        },
      ],
      notYet: [],
    },
  },
  {
    slug: 'rveta-connector',
    title: 'Rveta Connector',
    stack: ['Flutter', 'Laravel API'],
    related: [],
    en: {
      tag: 'Device control',
      status: 'In development',
      headline: 'Rveta Connector: a Flutter app that pairs a device to a control plane',
      description:
        'Rveta Connector is a cross-platform Flutter app, in development, that pairs a device to a Laravel control plane with hardened token handling and a foreground command channel.',
      summary:
        'A standalone Flutter app that pairs a device to a backend control plane, with hardened token handling and a foreground command channel.',
      sections: [
        {
          title: 'What works today',
          items: [
            'Device pairing against the backend, with a status screen driven by the real session',
            'Token rotation, with the new token stored securely; tokens are never shown or logged',
            'Explicit handling of expired, revoked, inactive and suspended tokens and devices',
            'Actor sign-in and operator sessions against the backend',
            'A command channel that polls every 30 seconds while the screen is open and runs only ping and refresh_status',
          ],
        },
        {
          title: 'How it is built',
          items: [
            'Flutter targeting Android, iOS, Windows, Linux, macOS and web; web is limited to control and status screens',
            'A decision record states that the dashboard controls the connector',
            'Separate credentials for actor sign-in and for the device, with documented header rules',
            'Session status is mapped in one place, so screens never show raw errors or authorization headers',
          ],
        },
      ],
      notYet: [
        'No native gateway runtime yet: the gateway controls are demonstration only',
        'No VPN, SMS or call runtime',
        'No background service or WebSocket command runtime',
        'Remote assist is a separate future capability that needs its own consent, audit and review',
      ],
    },
    ar: {
      tag: 'التحكم بالأجهزة',
      status: 'قيد التطوير',
      headline: 'Rveta Connector: تطبيق Flutter يربط الجهاز بمنصة تحكم',
      description:
        'Rveta Connector تطبيق Flutter متعدد المنصات قيد التطوير، يربط الجهاز بمنصة تحكم Laravel مع معالجة محكمة للرموز وقناة أوامر في المقدمة.',
      summary:
        'تطبيق Flutter مستقل يربط الجهاز بمنصة تحكم خلفية، مع معالجة محكمة للرموز وقناة أوامر تعمل في المقدمة.',
      sections: [
        {
          title: 'ما يعمل اليوم',
          items: [
            'ربط الجهاز بالخادم مع شاشة حالة تعتمد على الجلسة الفعلية',
            'تدوير الرمز مع تخزين الرمز الجديد بأمان، ولا يُعرض الرمز ولا يُسجَّل أبدًا',
            'معالجة صريحة لانتهاء الرموز وإلغائها وللأجهزة غير النشطة والموقوفة',
            'تسجيل دخول الممثل وجلسات المشغّل مع الخادم',
            'قناة أوامر تستعلم كل 30 ثانية ما دامت الشاشة مفتوحة، وتنفّذ فقط ping وrefresh_status',
          ],
        },
        {
          title: 'كيف بُني',
          items: [
            'Flutter يستهدف Android وiOS وWindows وLinux وmacOS والويب؛ والويب مقصور على شاشات التحكم والحالة',
            'قرار معماري موثّق ينص على أن لوحة التحكم هي التي تتحكم بالموصّل',
            'بيانات اعتماد منفصلة لتسجيل دخول الممثل وللجهاز مع قواعد موثّقة للترويسات',
            'حالة الجلسة تُحوَّل في مكان واحد، فلا تعرض الشاشات أخطاء خام ولا ترويسات التفويض',
          ],
        },
      ],
      notYet: [
        'لا يوجد تشغيل أصلي للبوابة بعد: عناصر التحكم بالبوابة للعرض التجريبي فقط',
        'لا تشغيل لـ VPN أو SMS أو المكالمات',
        'لا خدمة خلفية ولا قناة أوامر عبر WebSocket',
        'المساعدة عن بُعد قدرة مستقبلية منفصلة تحتاج موافقتها وتدقيقها ومراجعتها',
      ],
    },
  },
];

export const getProductBySlug = (slug) => products.find((product) => product.slug === slug);
