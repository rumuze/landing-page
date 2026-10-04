// Copy for /process. Each step describes what Rumuze does in its own
// repositories or what the site's intake form already records (CR-029). No
// timelines, prices, or response times: none can be evidenced yet.

export const processContent = {
  en: {
    eyebrow: 'How we work',
    title: 'How a project moves from first message to handover.',
    intro:
      'This is the approach we use on our own platforms and bring to client work. It describes the order of work and what you receive, not a fixed schedule.',
    stepLabel: 'Step',
    steps: [
      {
        title: 'Start with a clear request',
        text: 'The contact form has three paths: plan a build, request a technical review, or set up integrations and data. It records the engagement type, your market, the systems you already use, and where you found us, so the first conversation starts from facts.',
      },
      {
        title: 'Understand the system before choosing the architecture',
        text: 'Our default is a modular monolith with clear contracts between modules. We move to separate or event-driven services only where there is a reason, such as independent scaling, delivery guarantees, or separate ownership.',
        link: { slug: 'modular-monolith-architecture' },
      },
      {
        title: 'Build in modules, with automated checks',
        text: 'Each business area is a module with its own routes, services and data. In our own repositories, scans for module boundaries and tenant isolation run as commands, so the structure is enforced by tooling and not by memory.',
        link: { slug: 'architecture-boundary-checks' },
      },
      {
        title: 'Release in a fixed order, and check health',
        text: 'Releases follow one written order: migrate, rebuild caches, reload workers, verify health. Each service has its own health check, so a failure points at the layer that failed.',
        link: { slug: 'health-checks-release-order' },
      },
      {
        title: 'Hand over what your team needs to run it',
        text: 'Architecture notes, runbooks and setup guides ship with the code, and mobile work includes maintenance runbooks and smoke-test checklists.',
      },
    ],
    notTitle: 'What this page does not promise',
    notText:
      'We do not publish fixed timelines or prices, because both depend on scope. They are confirmed in writing after we understand the system, not before.',
    relatedLabel: 'Read how this works in practice',
    ctaTitle: 'Tell us where you are in this process.',
    ctaBody: 'Starting something new, or taking over something that already exists.',
    ctaLabel: 'Start a project',
  },
  ar: {
    eyebrow: 'كيف نعمل',
    title: 'كيف يتحرك المشروع من أول رسالة إلى التسليم.',
    intro:
      'هذا هو النهج الذي نستخدمه في منصاتنا الخاصة ونأخذه إلى أعمال العملاء. وهو يصف ترتيب العمل وما تتسلمه، لا جدولًا زمنيًا ثابتًا.',
    stepLabel: 'الخطوة',
    steps: [
      {
        title: 'نبدأ بطلب واضح',
        text: 'في نموذج التواصل ثلاثة مسارات: تخطيط بناء، أو طلب مراجعة تقنية، أو إعداد التكاملات والبيانات. ويسجّل النموذج نوع التعاون وسوقك والأنظمة التي تستخدمها وأين وجدتنا، فيبدأ أول حوار من وقائع.',
      },
      {
        title: 'نفهم النظام قبل اختيار المعمارية',
        text: 'خيارنا الافتراضي كتلة معيارية بعقود واضحة بين الوحدات. ننتقل إلى خدمات منفصلة أو قائمة على الأحداث فقط عند وجود سبب، مثل التوسع المستقل أو ضمانات التسليم أو الملكية المنفصلة.',
        link: { slug: 'modular-monolith-architecture' },
      },
      {
        title: 'نبني على وحدات مع فحوصات آلية',
        text: 'كل مجال عمل وحدة بمساراتها وخدماتها وبياناتها. وفي مستودعاتنا الخاصة تعمل فحوصات حدود الوحدات وعزل المستأجرين كأوامر، فتُفرض البنية بالأدوات لا بالذاكرة.',
        link: { slug: 'architecture-boundary-checks' },
      },
      {
        title: 'نُصدر بترتيب ثابت ونفحص الصحة',
        text: 'تتبع الإصدارات ترتيبًا مكتوبًا واحدًا: ترحيل، ثم إعادة بناء الكاش، ثم إعادة تشغيل العمّال، ثم التحقق من الصحة. ولكل خدمة فحص صحة خاص بها، فيشير الفشل إلى الطبقة التي فشلت.',
        link: { slug: 'health-checks-release-order' },
      },
      {
        title: 'نسلّم ما يحتاجه فريقك لتشغيله',
        text: 'تُسلَّم ملاحظات المعمارية وكتيّبات التشغيل وأدلة الإعداد مع الكود، ويشمل عمل الموبايل كتيّبات الصيانة وقوائم اختبار الدخان.',
      },
    ],
    notTitle: 'ما لا تعد به هذه الصفحة',
    notText:
      'لا ننشر جداول زمنية ثابتة ولا أسعارًا لأن كليهما يعتمد على النطاق. نؤكدهما كتابةً بعد أن نفهم النظام، لا قبله.',
    relatedLabel: 'اقرأ كيف يتم ذلك عمليًا',
    ctaTitle: 'أخبرنا أين أنت من هذه العملية.',
    ctaBody: 'تبدأ شيئًا جديدًا، أو تتسلم شيئًا قائمًا.',
    ctaLabel: 'ابدأ مشروعك',
  },
};
