import { homeContent } from "./homeContent";

export const conversionContent = {
  en: {
    seo: {
      home: {
        title: "Rumuze | Software Engineering for Gulf and MENA Businesses",
        description:
          "Rumuze is a software engineering company building custom platforms, mobile apps, and backend systems for businesses in Saudi Arabia, the UAE, and the wider MENA region, in Arabic and English.",
      },
      contact: {
        title: "Start a Project | Rumuze",
        description:
          "Tell us what you want to build, fix, or take over. Every request is reviewed within one business day.",
      },
    },
    homepage: homeContent.en,
    intake: {
      pageEyebrow: "Start a project",
      pageTitle: "Tell us what you are building.",
      pageIntro:
        "Use this form to start a project, request a technical review, or ask about integrations and data work. Every submission is reviewed against fit, urgency, and system complexity.",
      reviewNote:
        "Your request goes through scope review and fit validation, and you get a recommended next step within one business day.",
      confirmationTitle: "Request received",
      confirmationBody:
        "Your request has been received. We will review your submission and respond within one business day.",
      fields: {
        fullName: "Full Name",
        workEmail: "Work Email",
        companyName: "Company Name",
        role: "Role",
        website: "Website",
        companySize: "Company Size",
        market: "Primary Market",
        engagementType: "Engagement Type",
        primaryChallenge: "Primary Challenge",
        timeline: "Timeline",
        systems: "Systems Currently Used",
        monthlyActivity: "Monthly Activity Level",
        description: "Describe the Current Bottleneck",
      },
      placeholders: {
        fullName: "Jane Doe",
        workEmail: "jane@company.com",
        companyName: "Company name",
        role: "Founder, COO, Head of Growth, CTO...",
        website: "company.com",
        systems: "Current stack, CRM, analytics tools, hosting",
        description:
          "Describe where revenue, routing, reporting, or delivery is breaking today.",
      },
      helper: {
        engagementType:
          "Choose the closest match. We will confirm whether the right next step is a build, audit, or infrastructure setup.",
        systems:
          "Include the website platform, CRM, analytics tools, advertising platforms, or internal tools in use today.",
      },
      requiredLabel: "Required",
      optionalLabel: "Optional",
      submit: "Submit Qualified Request",
      submitting: "Submitting",
      close: "Close",
      backToSite: "Back to homepage",
      intents: {
        discovery: {
          title: "Start a project",
          description:
            "Use this path when you know what problem you have and want us to confirm the right way to work together.",
          defaultEngagementType: "",
        },
        audit: {
          title: "Request a technical review",
          description:
            "Use this path when something is failing but the root cause is unclear, or you are inheriting a codebase and need an honest assessment.",
          defaultEngagementType: "audit",
        },
        build: {
          title: "Plan a build",
          description:
            "Use this path when you are preparing to build or rebuild a platform, mobile app, or backend system.",
          defaultEngagementType: "build",
        },
        infrastructure: {
          title: "Integrations and data setup",
          description:
            "Use this path when you need systems connected, or when tracking, CRM, or reporting data cannot be trusted.",
          defaultEngagementType: "infrastructure",
        },
      },
      options: {
        companySize: [
          { value: "1-10", label: "1 to 10" },
          { value: "11-25", label: "11 to 25" },
          { value: "26-100", label: "26 to 100" },
          { value: "101-250", label: "101 to 250" },
          { value: "250+", label: "250+" },
        ],
        market: [
          { value: "saudi-arabia", label: "Saudi Arabia" },
          { value: "uae", label: "UAE" },
          { value: "egypt", label: "Egypt" },
          { value: "gcc", label: "GCC" },
          { value: "other", label: "Other" },
        ],
        engagementType: [
          { value: "build", label: "New system build" },
          { value: "audit", label: "Technical review or audit" },
          { value: "infrastructure", label: "Integrations and data infrastructure" },
        ],
        primaryChallenge: [
          { value: "website-platform", label: "Weak website or platform" },
          { value: "crm-fragmentation", label: "CRM or process fragmentation" },
          { value: "tracking-failure", label: "Attribution or tracking failure" },
          { value: "pipeline-quality", label: "Low-quality pipeline" },
          { value: "vendor-coordination", label: "Vendor coordination failure" },
          { value: "regional-expansion", label: "Regional expansion or bilingual execution" },
        ],
        timeline: [
          { value: "immediate", label: "Immediate" },
          { value: "this-quarter", label: "This quarter" },
          { value: "next-quarter", label: "Next quarter" },
          { value: "exploring", label: "Exploring" },
        ],
        monthlyActivity: [
          { value: "under-100", label: "Under 100 monthly qualified actions" },
          { value: "100-500", label: "100 to 500 monthly qualified actions" },
          { value: "500-2000", label: "500 to 2,000 monthly qualified actions" },
          { value: "2000-plus", label: "2,000+ monthly qualified actions" },
          { value: "not-tracked", label: "Not tracked consistently" },
        ],
      },
    },
  },
  ar: {
    seo: {
      home: {
        title: "رموز | هندسة برمجيات لشركات الخليج والمنطقة",
        description:
          "رموز شركة هندسة برمجيات تبني منصات مخصصة وتطبيقات موبايل وأنظمة خلفية لشركات في السعودية والإمارات والمنطقة، بالعربية والإنجليزية.",
      },
      contact: {
        title: "ابدأ مشروعك | Rumuze",
        description:
          "أخبرنا بما تريد بناءه أو إصلاحه أو تسلّمه. تتم مراجعة كل طلب خلال يوم عمل واحد.",
      },
    },
    homepage: homeContent.ar,
    intake: {
      pageEyebrow: "ابدأ مشروعك",
      pageTitle: "أخبرنا بما تبنيه.",
      pageIntro:
        "استخدم هذا النموذج لبدء مشروع أو طلب مراجعة تقنية أو الاستفسار عن التكامل والبيانات. تتم مراجعة كل طلب بناءً على الملاءمة والاستعجال وتعقيد النظام.",
      reviewNote:
        "يمر طلبك عبر مراجعة النطاق والتحقق من الملاءمة وتحديد الخطوة التالية خلال يوم عمل واحد.",
      confirmationTitle: "تم استلام الطلب بنجاح",
      confirmationBody:
        "تم استلام طلبك بنجاح. سنراجع تفاصيل مشروعك ونتواصل معك خلال يوم عمل واحد لتحديد موعد جلسة التشخيص.",
      fields: {
        fullName: "الاسم الكامل",
        workEmail: "واتساب / بريد العمل",
        companyName: "اسم الشركة / المنظمة",
        role: "المنصب",
        website: "الموقع الإلكتروني",
        companySize: "حجم الشركة",
        market: "السوق الأساسي",
        engagementType: "ما تحتاجه بالضبط",
        primaryChallenge: "التحدي الأساسي",
        timeline: "الإطار الزمني",
        systems: "الأنظمة المستخدمة حالياً",
        monthlyActivity: "مستوى النشاط الشهري",
        description: "تفاصيل إضافية عن المشروع أو المنظومة",
      },
      placeholders: {
        fullName: "محمد أحمد",
        workEmail: "name@company.com أو +966 5x xxx xxxx",
        companyName: "اسم شركتك أو مشروعك",
        role: "المؤسس، المدير التنفيذي، مدير النمو، CTO...",
        website: "company.com",
        systems: "منصة الموقع، CRM، أدوات التحليلات، إعلانات",
        description: "صف باختصار ما ترغب في إنجازه، التحديات التقنية، أو المتطلبات الخاصة...",
      },
      helper: {
        engagementType:
          "اختر ما تحتاجه بالضبط. سنراجع النطاق ونؤكد أفضل خطوة للبدء.",
        systems:
          "اذكر منصة الموقع وCRM وأدوات التحليلات أو الأدوات الداخلية المستخدمة اليوم.",
      },
      requiredLabel: "مطلوب",
      optionalLabel: "اختياري",
      submit: "إرسال الطلب",
      submitting: "جارٍ الإرسال...",
      close: "إغلاق",
      backToSite: "العودة إلى الرئيسية",
      intents: {
        discovery: {
          title: "ابدأ مشروعك",
          description:
            "استخدم هذا المسار عندما تعرف المشكلة وتريد أن نؤكد معاً أفضل طريقة للعمل.",
          defaultEngagementType: "",
        },
        audit: {
          title: "اطلب مراجعة تقنية",
          description:
            "استخدم هذا المسار عندما يكون هناك خلل لم يتضح سببه، أو عندما ترث قاعدة كود وتحتاج تقييماً صريحاً.",
          defaultEngagementType: "audit",
        },
        build: {
          title: "خطط لبناء منصة",
          description:
            "استخدم هذا المسار عندما تستعد لبناء أو إعادة بناء منصة أو تطبيق موبايل أو نظام خلفي.",
          defaultEngagementType: "build",
        },
        infrastructure: {
          title: "التكامل وإعداد البيانات",
          description:
            "استخدم هذا المسار عندما تحتاج ربط الأنظمة، أو عندما لا يمكن الوثوق ببيانات التتبع أو CRM أو التقارير.",
          defaultEngagementType: "infrastructure",
        },
      },
      options: {
        companySize: [
          { value: "1-10", label: "1 إلى 10" },
          { value: "11-25", label: "11 إلى 25" },
          { value: "26-100", label: "26 إلى 100" },
          { value: "101-250", label: "101 إلى 250" },
          { value: "250+", label: "250+" },
        ],
        market: [
          { value: "saudi-arabia", label: "السعودية" },
          { value: "uae", label: "الإمارات" },
          { value: "egypt", label: "مصر" },
          { value: "gcc", label: "الخليج" },
          { value: "other", label: "أخرى" },
        ],
        engagementType: [
          { value: "build", label: "بناء نظام جديد" },
          { value: "audit", label: "مراجعة أو تدقيق تقني" },
          { value: "infrastructure", label: "التكامل وبنية البيانات" },
        ],
        primaryChallenge: [
          { value: "website-platform", label: "ضعف الموقع أو المنصة" },
          { value: "crm-fragmentation", label: "تشظي CRM أو العمليات" },
          { value: "tracking-failure", label: "فشل التتبع أو الإسناد" },
          { value: "pipeline-quality", label: "ضعف جودة الـ pipeline" },
          { value: "vendor-coordination", label: "فشل التنسيق بين الموردين" },
          { value: "regional-expansion", label: "توسع إقليمي أو تنفيذ ثنائي اللغة" },
        ],
        timeline: [
          { value: "immediate", label: "فوري" },
          { value: "this-quarter", label: "هذا الربع" },
          { value: "next-quarter", label: "الربع القادم" },
          { value: "exploring", label: "استكشاف" },
        ],
        monthlyActivity: [
          { value: "under-100", label: "أقل من 100 نشاط مؤهل شهرياً" },
          { value: "100-500", label: "100 إلى 500 نشاط مؤهل شهرياً" },
          { value: "500-2000", label: "500 إلى 2,000 نشاط مؤهل شهرياً" },
          { value: "2000-plus", label: "أكثر من 2,000 نشاط مؤهل شهرياً" },
          { value: "not-tracked", label: "غير متابع بشكل ثابت" },
        ],
      },
    },
  },
};
