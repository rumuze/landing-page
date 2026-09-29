// Homepage copy. Every claim here must be traceable to code or documentation in
// the products described (see docs/CLAIMS_REGISTRY.md). No client names, user
// counts, revenue figures, or uptime numbers until they can be evidenced.

export const homeContent = {
  en: {
    hero: {
      badge: "Software engineering for Gulf and MENA businesses",
      headline: "We build the software your business runs on.",
      subheadline:
        "Rumuze is a software engineering company. We design and build custom platforms, mobile apps, and backend systems, in Arabic and English from day one, and built to be operated for years, not just launched.",
      primaryCta: "Start a project",
      secondaryCta: "Request a technical review",
      reviewNote: "Every request is reviewed within one business day.",
      supportEyebrow: "How we build",
      supportTitle: "Engineering you can inspect.",
      supportBody:
        "Our own products run on the same practices we bring to client work.",
      supportItems: [
        "Modular monoliths and event-driven services, chosen per problem",
        "Tenant isolation, request tracing, and health checks built in from the start",
        "Containerised deployments with scripted, repeatable releases",
      ],
      signals: [
        {
          label: "Bilingual by default",
          value: "Arabic RTL and English LTR from a single codebase.",
        },
        {
          label: "Full stack",
          value: "Backend, web, and mobile built by one team.",
        },
        {
          label: "Products we own",
          value: "We ship and operate our own SaaS platforms.",
        },
      ],
    },
    capabilities: {
      eyebrow: "What we build",
      title: "Four things we do well.",
      intro:
        "From a single mobile app to a multi-module business platform, the work falls into four areas.",
      cards: [
        {
          title: "Custom software and SaaS",
          description:
            "Multi-module business systems such as ERP, CRM, HR, project management, and billing.",
          points: [
            "Multi-tenant SaaS",
            "Modular architecture",
            "Role-based access control",
            "Payment gateway integration",
          ],
        },
        {
          title: "Mobile apps",
          description:
            "Cross-platform Flutter apps for customers, drivers, and field teams.",
          points: [
            "Delivery and field-operations apps",
            "Live location tracking",
            "Push notifications",
            "Arabic and English localisation",
          ],
        },
        {
          title: "Backend and API platforms",
          description:
            "Event-driven backends, webhooks, and realtime services that stay reliable under load.",
          points: [
            "NestJS and Laravel APIs",
            "Transactional outbox and reliable webhooks",
            "Realtime over WebSockets",
            "Admin dashboards",
          ],
        },
        {
          title: "Integrations and data",
          description:
            "Connecting the systems you already run, and making the numbers trustworthy.",
          points: [
            "CRM integration",
            "Tracking and attribution",
            "Reporting dashboards",
            "Legacy system integration",
          ],
        },
      ],
    },
    work: {
      eyebrow: "Selected work",
      title: "Products we have built and run.",
      intro:
        "These are platforms we design, build, and operate ourselves. They show the engineering standard we bring to client projects.",
      stackLabel: "Stack",
      cards: [
        {
          tag: "SaaS platform",
          status: "",
          title: "RumuzePMO",
          summary:
            "ERP, HRM, CRM, project management, payments, and support in one Laravel 12 codebase, split into seven modules that can be switched on independently.",
          highlights: [
            "Modular monolith with contract-first module boundaries",
            "Tenant-isolation tooling and request tracing",
            "Integrates a wide range of payment gateways",
            "Runs on FrankenPHP and Octane with Redis-backed queues",
          ],
          stack: ["Laravel 12", "MySQL", "Redis", "Docker"],
        },
        {
          tag: "Delivery operations",
          status: "",
          title: "Rveta",
          summary:
            "A Laravel backend with a Flutter driver app: order assignment, delivery status updates, live location, customer chat, and push notifications, in Arabic and English.",
          highlights: [
            "Live location tracking for active deliveries",
            "Biometric app lock for drivers",
            "Push notifications in foreground and background",
            "Scripted production deploys with health checks",
          ],
          stack: ["Laravel", "Flutter", "Firebase", "Nginx"],
        },
        {
          tag: "Platform kernel",
          status: "",
          title: "Rumuze Core",
          summary:
            "A NestJS API built around a transactional outbox, an integration webhook engine, and Socket.IO realtime, with a Next.js admin dashboard on top.",
          highlights: [
            "Transactional outbox for guaranteed event delivery",
            "Secure webhook ingestion and reliable outbound delivery",
            "Realtime fan-out through Redis",
            "Trace ID propagation across requests",
          ],
          stack: ["NestJS", "Prisma", "PostgreSQL", "Next.js"],
        },
        {
          tag: "Device control",
          status: "In development",
          title: "Rveta Connector",
          summary:
            "A cross-platform Flutter app that pairs a device to a backend control plane, with hardened token handling and a foreground command channel.",
          highlights: [
            "Device pairing and token rotation",
            "Explicit handling of expiry, revocation, and suspension",
            "Actor sign-in and operator sessions",
          ],
          stack: ["Flutter", "Laravel API"],
        },
      ],
    },
    engineering: {
      eyebrow: "How we work",
      title: "Engineering habits, visible in the code.",
      intro:
        "The practices below are not slogans. They are how our own repositories are organised today.",
      points: [
        {
          title: "Architecture with boundaries",
          text: "Modules talk through contracts, not each other's internals, so systems stay changeable as they grow.",
        },
        {
          title: "Bilingual from day one",
          text: "Arabic RTL and English LTR share one codebase, with routing, SEO, and layout handled properly rather than translated on top.",
        },
        {
          title: "Operational safety built in",
          text: "Health endpoints, request tracing, tenant guards, and non-destructive migrations come before features.",
        },
        {
          title: "Repeatable releases",
          text: "Containerised environments, isolated dev, staging, and production configuration, and scripted deploys.",
        },
        {
          title: "Documentation you can hand over",
          text: "Architecture notes, runbooks, and setup guides ship with the code.",
        },
      ],
    },
    faq: {
      eyebrow: "Questions",
      title: "Answers to common questions.",
      items: [
        {
          q: "What does Rumuze do?",
          a: "Rumuze is a software engineering company. It builds custom platforms, mobile apps, backend and API systems, and integrations for businesses in Saudi Arabia, the UAE, and the wider MENA region.",
        },
        {
          q: "Does Rumuze build in both Arabic and English?",
          a: "Yes. Arabic (right-to-left) and English (left-to-right) are built into the same codebase from the start, including routing, layout, and search metadata, rather than translated afterwards.",
        },
        {
          q: "What technologies does Rumuze use?",
          a: "Laravel and NestJS for backends, Next.js and React for web, Flutter for mobile, PostgreSQL, MySQL and Redis for data, and Docker for deployment. The choice depends on the problem.",
        },
        {
          q: "Can Rumuze review or take over an existing codebase?",
          a: "Yes. A technical review covers architecture, code quality, deployment, and risks, and ends with a written recommendation on whether to repair, extend, or rebuild.",
        },
        {
          q: "Which products has Rumuze built?",
          a: "RumuzePMO (a modular ERP, CRM, and HR platform), Rveta (a delivery operations platform with a Flutter driver app), and Rumuze Core (an event-driven API kernel with an admin dashboard). Rveta Connector, a device control app, is in development.",
        },
        {
          q: "How do I start a project with Rumuze?",
          a: "Send a request through the contact form. It is reviewed within one business day, followed by a short call to confirm scope and a written proposal covering architecture, milestones, and estimate.",
        },
        {
          q: "Where is Rumuze based?",
          a: "Rumuze is based in Obour City, Cairo, Egypt, and works with clients in Saudi Arabia, the UAE, and the wider MENA region.",
        },
      ],
    },
    finalCta: {
      title: "Have a system to build, fix, or take over?",
      body: "Tell us what you are working on. We will review the scope and reply with a clear next step: a build plan, a technical review, or an honest answer that it is not a fit.",
      primaryCta: "Start a project",
      secondaryCta: "Request a technical review",
      nextLabel: "What happens next",
      nextSteps: [
        "We read your request and reply within one business day.",
        "A short call to confirm scope and constraints.",
        "A written proposal covering architecture, milestones, and estimate.",
      ],
    },
  },
  ar: {
    hero: {
      badge: "هندسة برمجيات لشركات الخليج والمنطقة",
      headline: "نبني البرمجيات التي تعتمد عليها شركتك.",
      subheadline:
        "رموز شركة هندسة برمجيات. نصمم وننفذ منصات مخصصة وتطبيقات موبايل وأنظمة خلفية، بالعربية والإنجليزية من اليوم الأول، ومصممة لتعمل سنوات طويلة لا لتُطلق فقط.",
      primaryCta: "ابدأ مشروعك",
      secondaryCta: "اطلب مراجعة تقنية",
      reviewNote: "تتم مراجعة كل طلب خلال يوم عمل واحد.",
      supportEyebrow: "كيف نبني",
      supportTitle: "هندسة يمكن فحصها.",
      supportBody:
        "منتجاتنا الخاصة تعمل بنفس الممارسات التي نطبقها على مشاريع العملاء.",
      supportItems: [
        "معمارية وحدات (Modular Monolith) وخدمات قائمة على الأحداث، نختارها حسب المشكلة",
        "عزل بين المستأجرين وتتبع للطلبات وفحوصات صحة مدمجة من البداية",
        "نشر عبر الحاويات بإصدارات مؤتمتة قابلة للتكرار",
      ],
      signals: [
        {
          label: "ثنائي اللغة افتراضياً",
          value: "عربي RTL وإنجليزي LTR من قاعدة كود واحدة.",
        },
        {
          label: "مكدس متكامل",
          value: "الخلفية والويب والموبايل من فريق واحد.",
        },
        {
          label: "منتجات نملكها",
          value: "نطلق ونشغّل منصات SaaS خاصة بنا.",
        },
      ],
    },
    capabilities: {
      eyebrow: "ما الذي نبنيه",
      title: "أربعة مجالات نتقنها.",
      intro:
        "من تطبيق موبايل واحد إلى منصة أعمال متعددة الوحدات، يقع العمل ضمن أربعة مجالات.",
      cards: [
        {
          title: "برمجيات مخصصة وSaaS",
          description:
            "أنظمة أعمال متعددة الوحدات مثل ERP وCRM والموارد البشرية وإدارة المشاريع والفوترة.",
          points: [
            "SaaS متعدد المستأجرين",
            "معمارية وحدات",
            "صلاحيات قائمة على الأدوار",
            "ربط بوابات الدفع",
          ],
        },
        {
          title: "تطبيقات الموبايل",
          description:
            "تطبيقات Flutter متعددة المنصات للعملاء والسائقين والفرق الميدانية.",
          points: [
            "تطبيقات التوصيل والعمليات الميدانية",
            "تتبع الموقع المباشر",
            "إشعارات فورية",
            "دعم العربية والإنجليزية",
          ],
        },
        {
          title: "الأنظمة الخلفية وواجهات API",
          description:
            "أنظمة خلفية قائمة على الأحداث وWebhooks وخدمات لحظية تبقى موثوقة تحت الضغط.",
          points: [
            "واجهات NestJS وLaravel",
            "نمط Outbox وWebhooks موثوقة",
            "اتصال لحظي عبر WebSockets",
            "لوحات إدارة",
          ],
        },
        {
          title: "التكامل والبيانات",
          description:
            "ربط الأنظمة التي تعمل بها اليوم وجعل الأرقام قابلة للثقة.",
          points: [
            "تكامل CRM",
            "التتبع والإسناد",
            "لوحات التقارير",
            "الربط مع الأنظمة القديمة",
          ],
        },
      ],
    },
    work: {
      eyebrow: "أعمال مختارة",
      title: "منتجات بنيناها ونشغّلها.",
      intro:
        "هذه منصات نصممها ونبنيها ونشغّلها بأنفسنا، وهي تعكس المعيار الهندسي الذي نطبقه على مشاريع العملاء.",
      stackLabel: "التقنيات",
      cards: [
        {
          tag: "منصة SaaS",
          status: "",
          title: "RumuzePMO",
          summary:
            "ERP وموارد بشرية وCRM وإدارة مشاريع ومدفوعات ودعم في قاعدة كود Laravel 12 واحدة، مقسمة إلى سبع وحدات يمكن تفعيلها بشكل مستقل.",
          highlights: [
            "Modular Monolith بحدود وحدات قائمة على العقود",
            "أدوات عزل المستأجرين وتتبع الطلبات",
            "تكامل مع مجموعة واسعة من بوابات الدفع",
            "يعمل على FrankenPHP وOctane مع طوابير Redis",
          ],
          stack: ["Laravel 12", "MySQL", "Redis", "Docker"],
        },
        {
          tag: "عمليات التوصيل",
          status: "",
          title: "Rveta",
          summary:
            "نظام خلفي بـ Laravel مع تطبيق Flutter للسائقين: إسناد الطلبات وتحديث حالة التوصيل والموقع المباشر ومحادثة العميل والإشعارات، بالعربية والإنجليزية.",
          highlights: [
            "تتبع الموقع المباشر للطلبات النشطة",
            "قفل بيومتري لتطبيق السائق",
            "إشعارات فورية في الواجهة والخلفية",
            "نشر إنتاجي مؤتمت مع فحوصات صحة",
          ],
          stack: ["Laravel", "Flutter", "Firebase", "Nginx"],
        },
        {
          tag: "نواة المنصة",
          status: "",
          title: "Rumuze Core",
          summary:
            "واجهة NestJS مبنية حول نمط Outbox ومحرك Webhooks للتكامل واتصال لحظي عبر Socket.IO، مع لوحة إدارة Next.js.",
          highlights: [
            "نمط Outbox لضمان تسليم الأحداث",
            "استقبال Webhooks آمن وإرسال موثوق",
            "توزيع لحظي عبر Redis",
            "تمرير معرّف التتبع عبر الطلبات",
          ],
          stack: ["NestJS", "Prisma", "PostgreSQL", "Next.js"],
        },
        {
          tag: "التحكم بالأجهزة",
          status: "قيد التطوير",
          title: "Rveta Connector",
          summary:
            "تطبيق Flutter متعدد المنصات يربط الجهاز بمنصة تحكم خلفية، مع إدارة صارمة للرموز وقناة أوامر تعمل أثناء فتح التطبيق.",
          highlights: [
            "ربط الجهاز وتدوير الرموز",
            "معالجة صريحة للانتهاء والإلغاء والإيقاف",
            "تسجيل دخول المشغّل وجلسات التشغيل",
          ],
          stack: ["Flutter", "Laravel API"],
        },
      ],
    },
    engineering: {
      eyebrow: "طريقة عملنا",
      title: "عادات هندسية تظهر في الكود.",
      intro:
        "هذه الممارسات ليست شعارات، بل هي طريقة تنظيم مستودعاتنا الحالية.",
      points: [
        {
          title: "معمارية بحدود واضحة",
          text: "تتواصل الوحدات عبر عقود لا عبر تفاصيل بعضها، فتبقى الأنظمة قابلة للتغيير مع نموها.",
        },
        {
          title: "ثنائي اللغة من اليوم الأول",
          text: "العربية RTL والإنجليزية LTR في قاعدة كود واحدة، مع معالجة سليمة للمسارات وSEO والتخطيط بدلاً من الترجمة فوق النظام.",
        },
        {
          title: "أمان تشغيلي مدمج",
          text: "نقاط فحص الصحة وتتبع الطلبات وحواجز المستأجرين وترحيلات غير مدمرة تأتي قبل الميزات.",
        },
        {
          title: "إصدارات قابلة للتكرار",
          text: "بيئات في حاويات، وإعدادات معزولة للتطوير والاختبار والإنتاج، ونشر مؤتمت.",
        },
        {
          title: "توثيق قابل للتسليم",
          text: "ملاحظات المعمارية ودلائل التشغيل وأدلة الإعداد تُسلَّم مع الكود.",
        },
      ],
    },
    faq: {
      eyebrow: "أسئلة",
      title: "إجابات عن الأسئلة الشائعة.",
      items: [
        {
          q: "ماذا تفعل رموز؟",
          a: "رموز شركة هندسة برمجيات. تبني منصات مخصصة وتطبيقات موبايل وأنظمة خلفية وواجهات API وتكاملات لشركات في السعودية والإمارات ومنطقة الشرق الأوسط وشمال أفريقيا.",
        },
        {
          q: "هل تبني رموز بالعربية والإنجليزية معاً؟",
          a: "نعم. العربية (من اليمين لليسار) والإنجليزية (من اليسار لليمين) مبنيتان في قاعدة كود واحدة من البداية، بما في ذلك المسارات والتخطيط وبيانات البحث، وليس بالترجمة لاحقاً.",
        },
        {
          q: "ما التقنيات التي تستخدمها رموز؟",
          a: "Laravel وNestJS للأنظمة الخلفية، وNext.js وReact للويب، وFlutter للموبايل، وPostgreSQL وMySQL وRedis للبيانات، وDocker للنشر. ويعتمد الاختيار على طبيعة المشكلة.",
        },
        {
          q: "هل تستطيع رموز مراجعة قاعدة كود قائمة أو تسلّمها؟",
          a: "نعم. تشمل المراجعة التقنية المعمارية وجودة الكود والنشر والمخاطر، وتنتهي بتوصية مكتوبة: إصلاح أو توسعة أو إعادة بناء.",
        },
        {
          q: "ما المنتجات التي بنتها رموز؟",
          a: "RumuzePMO (منصة معيارية للـ ERP وCRM والموارد البشرية)، وRveta (منصة عمليات توصيل مع تطبيق Flutter للسائقين)، وRumuze Core (نواة API قائمة على الأحداث مع لوحة إدارة). أما Rveta Connector، وهو تطبيق للتحكم بالأجهزة، فقيد التطوير.",
        },
        {
          q: "كيف أبدأ مشروعاً مع رموز؟",
          a: "أرسل طلباً عبر نموذج التواصل. تتم مراجعته خلال يوم عمل واحد، ثم مكالمة قصيرة لتأكيد النطاق وعرض مكتوب يشمل المعمارية والمراحل والتقدير.",
        },
        {
          q: "أين مقر رموز؟",
          a: "مقر رموز في مدينة العبور بالقاهرة، مصر، وتعمل مع عملاء في السعودية والإمارات ومنطقة الشرق الأوسط وشمال أفريقيا.",
        },
      ],
    },
    finalCta: {
      title: "لديك نظام تريد بناءه أو إصلاحه أو تسلّمه؟",
      body: "أخبرنا بما تعمل عليه. سنراجع النطاق ونرد بخطوة تالية واضحة: خطة بناء، أو مراجعة تقنية، أو إجابة صريحة بأن المشروع غير مناسب لنا.",
      primaryCta: "ابدأ مشروعك",
      secondaryCta: "اطلب مراجعة تقنية",
      nextLabel: "ماذا يحدث بعد ذلك",
      nextSteps: [
        "نقرأ طلبك ونرد خلال يوم عمل واحد.",
        "مكالمة قصيرة لتأكيد النطاق والقيود.",
        "عرض مكتوب يشمل المعمارية والمراحل والتقدير.",
      ],
    },
  },
};
