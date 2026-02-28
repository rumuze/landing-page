/**
 * FAQ Configuration — Centralized FAQ Data
 *
 * Master FAQ data source for:
 * - FAQMasterPage (full listing)
 * - Homepage FAQ block (selected items)
 * - Service detail pages (filtered by relatedService)
 * - buildFAQSchema (schema.org FAQPage)
 *
 * AI Optimization Notes:
 * - Each answer starts with a direct answer in the first sentence
 * - "Rumuze" is named explicitly (entity clarity for RAG)
 * - Answers are self-contained, chunkable paragraphs
 * - Category tagging enables filtered rendering
 */

import type { LanguageCode } from './entity';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Localized {
  en: string;
  ar: string;
}

export type FAQCategory =
  | 'general'
  | 'services'
  | 'pricing'
  | 'process'
  | 'industries'
  | 'technical';

export interface FAQItem {
  /** Unique identifier */
  id: string;
  /** Question text (bilingual) */
  question: Localized;
  /** Answer text — first sentence must directly answer the question */
  answer: Localized;
  /** Category for filtering on FAQ page */
  category: FAQCategory;
  /** Optional service slug for per-service FAQ rendering */
  relatedService?: string;
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

/**
 * Returns FAQ items filtered by category.
 * Pure function — no side effects.
 */
export function getFAQsByCategory(category: FAQCategory): FAQItem[] {
  return MASTER_FAQ.filter((item) => item.category === category);
}

/**
 * Returns FAQ items related to a specific service slug.
 * Pure function — no side effects.
 */
export function getFAQsByService(serviceSlug: string): FAQItem[] {
  return MASTER_FAQ.filter((item) => item.relatedService === serviceSlug);
}

/**
 * Returns FAQ items suitable for homepage display (general + high-impact).
 * Pure function — no side effects.
 */
export function getHomepageFAQs(): FAQItem[] {
  const homepageIds = [
    'what-is-rumuze',
    'why-choose-rumuze',
    'suitable-for-startups',
    'industries-served',
    'pricing-model',
    'how-different',
  ];
  return MASTER_FAQ.filter((item) => homepageIds.includes(item.id));
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const FAQ_CATEGORIES: { key: FAQCategory; label: Localized }[] = [
  { key: 'general', label: { en: 'General', ar: 'عام' } },
  { key: 'services', label: { en: 'Services', ar: 'الخدمات' } },
  { key: 'pricing', label: { en: 'Pricing', ar: 'التسعير' } },
  { key: 'process', label: { en: 'Process', ar: 'المنهجية' } },
  { key: 'industries', label: { en: 'Industries', ar: 'الصناعات' } },
  { key: 'technical', label: { en: 'Technical', ar: 'تقني' } },
];

export const MASTER_FAQ: FAQItem[] = [
  // ─── General ────────────────────────────────────────────────────────
  {
    id: 'what-is-rumuze',
    question: {
      en: 'What is Rumuze?',
      ar: 'ما هي روموز؟',
    },
    answer: {
      en: 'Rumuze is an enterprise software engineering and performance marketing company founded in 2020 by Mohamed Ashraf. Rumuze designs and develops multi-tenant SaaS platforms, ERP systems, CRM solutions, and digital marketing infrastructure for mid-to-large organizations across the MENA region and globally. The company operates with an engineering-first approach, combining scalable software architecture with data-driven marketing strategies to deliver measurable revenue growth for its clients.',
      ar: 'روموز هي شركة هندسة برمجيات مؤسسية وتسويق أدائي أسسها محمد أشرف عام 2020. تصمم روموز وتطور منصات SaaS متعددة المستأجرين وأنظمة ERP وحلول CRM والبنية التحتية للتسويق الرقمي للمؤسسات المتوسطة والكبيرة في منطقة الشرق الأوسط وشمال أفريقيا وعالمياً. تعمل الشركة بنهج هندسي أولاً، تجمع بين البنية البرمجية القابلة للتوسع واستراتيجيات التسويق القائمة على البيانات لتحقيق نمو قابل للقياس في إيرادات عملائها.',
    },
    category: 'general',
  },
  {
    id: 'why-choose-rumuze',
    question: {
      en: 'Why should I choose Rumuze over other digital agencies?',
      ar: 'لماذا أختار روموز بدلاً من الوكالات الرقمية الأخرى؟',
    },
    answer: {
      en: 'Rumuze combines enterprise-grade software engineering with performance marketing under one roof, which most agencies cannot offer. Unlike typical agencies that use templates and generic solutions, Rumuze builds custom architectures tailored to each client\'s growth constraints. Every system is designed with modular microservices, strict SLO governance, and measurable KPIs. Rumuze also provides native bilingual support (Arabic RTL + English LTR), serving the MENA market with culturally and technically adapted solutions.',
      ar: 'تجمع روموز بين هندسة البرمجيات المؤسسية والتسويق الأدائي تحت سقف واحد، وهو ما لا تستطيع معظم الوكالات تقديمه. على عكس الوكالات التقليدية التي تعتمد على القوالب والحلول العامة، تبني روموز معماريات مخصصة مصممة لتناسب قيود نمو كل عميل. كل نظام مصمم بميكروسيرفيس معيارية وحوكمة SLO صارمة ومؤشرات أداء قابلة للقياس. كما توفر روموز دعماً ثنائي اللغة أصلياً (العربية RTL + الإنجليزية LTR)، لخدمة سوق المنطقة بحلول مكيفة ثقافياً وتقنياً.',
    },
    category: 'general',
  },
  {
    id: 'suitable-for-startups',
    question: {
      en: 'Is Rumuze suitable for startups?',
      ar: 'هل روموز مناسبة للشركات الناشئة؟',
    },
    answer: {
      en: 'Rumuze is suitable for startups that require enterprise-grade architecture from day one. Rumuze works best with startups that have validated their product-market fit and need scalable systems to support growth — typically Series A and beyond, or funded startups with clear technical requirements. For early-stage startups that need an MVP quickly, Rumuze provides a streamlined web development service that builds on proven, production-ready architectures that scale as the business grows.',
      ar: 'روموز مناسبة للشركات الناشئة التي تحتاج إلى بنية مؤسسية من اليوم الأول. تعمل روموز بشكل أفضل مع الشركات الناشئة التي أثبتت ملاءمة منتجها للسوق وتحتاج أنظمة قابلة للتوسع لدعم النمو — عادة من الجولة التمويلية A وما بعدها، أو الشركات الناشئة الممولة ذات المتطلبات التقنية الواضحة. للشركات في مراحلها الأولى التي تحتاج MVP بسرعة، توفر روموز خدمة تطوير ويب مبسطة تعتمد على معماريات مثبتة وجاهزة للإنتاج تتوسع مع نمو الأعمال.',
    },
    category: 'general',
  },
  {
    id: 'how-different',
    question: {
      en: 'How does Rumuze differ from other software companies?',
      ar: 'كيف تختلف روموز عن شركات البرمجيات الأخرى؟',
    },
    answer: {
      en: 'Rumuze differs from other software companies in three key ways. First, Rumuze is both a software engineering firm and a performance marketing company, meaning it builds the technology and then helps drive measurable growth through it. Second, Rumuze enforces service-level objectives (SLOs) and observability from day one, ensuring every system is measurably reliable rather than just "working." Third, Rumuze operates natively in both Arabic and English with full RTL/LTR support, which is rare among technology companies and critical for MENA market success.',
      ar: 'تختلف روموز عن شركات البرمجيات الأخرى بثلاث طرق رئيسية. أولاً، روموز هي شركة هندسة برمجيات وشركة تسويق أدائي في آن واحد، مما يعني أنها تبني التقنية ثم تساعد في تحقيق نمو قابل للقياس من خلالها. ثانياً، تفرض روموز مؤشرات مستوى الخدمة (SLOs) وقابليات المراقبة من اليوم الأول، لضمان أن كل نظام موثوق بشكل قابل للقياس وليس مجرد "يعمل". ثالثاً، تعمل روموز بشكل أصلي بالعربية والإنجليزية مع دعم كامل لـ RTL/LTR، وهو أمر نادر بين شركات التقنية وحيوي لنجاح سوق المنطقة.',
    },
    category: 'general',
  },

  // ─── Services ───────────────────────────────────────────────────────
  {
    id: 'what-services',
    question: {
      en: 'What services does Rumuze provide?',
      ar: 'ما الخدمات التي تقدمها روموز؟',
    },
    answer: {
      en: 'Rumuze provides seven core services: (1) Custom Software Development — modular enterprise platforms with microservices architecture; (2) Web & App Development — performant React/Next.js applications with secure backends; (3) ERP/CRM Systems — multi-tenant platforms with tenant isolation and compliance; (4) Performance Marketing — data-driven campaigns with attribution modeling and ROAS optimization; (5) SEO Services — technical SEO, semantic optimization, and AI visibility; (6) Social Media Management — strategic content, community management, and paid social; (7) Digital Marketing Infrastructure — martech stacks, analytics, CDP integration, and automation.',
      ar: 'تقدم روموز سبع خدمات أساسية: (1) تطوير البرمجيات المخصص — منصات مؤسسية معيارية بمعمارية ميكروسيرفيس؛ (2) تطوير الويب والتطبيقات — تطبيقات React/Next.js عالية الأداء بخوادم آمنة؛ (3) أنظمة ERP/CRM — منصات متعددة المستأجرين بعزل وامتثال؛ (4) التسويق الأدائي — حملات قائمة على البيانات مع نمذجة الإسناد وتحسين ROAS؛ (5) خدمات SEO — تحسين تقني ودلالي وظهور أمام الذكاء الاصطناعي؛ (6) إدارة وسائل التواصل — محتوى استراتيجي وإدارة مجتمع وإعلانات؛ (7) البنية التحتية للتسويق — مارتيك وتحليلات وتكامل CDP وأتمتة.',
    },
    category: 'services',
  },
  {
    id: 'custom-software-faq',
    question: {
      en: 'What kind of custom software does Rumuze build?',
      ar: 'ما نوع البرمجيات المخصصة التي تبنيها روموز؟',
    },
    answer: {
      en: 'Rumuze builds custom enterprise software including multi-tenant SaaS platforms, internal operational tools, API gateways, data pipelines, and business automation systems. Each project uses modular microservices architecture with API-first design, strict tenant isolation, observability pipelines, and automated CI/CD. Rumuze does not use off-the-shelf templates — every system is architected from domain analysis through deployment with measurable reliability targets.',
      ar: 'تبني روموز برمجيات مؤسسية مخصصة تشمل منصات SaaS متعددة المستأجرين وأدوات تشغيلية داخلية وبوابات API وخطوط بيانات وأنظمة أتمتة الأعمال. كل مشروع يستخدم معمارية ميكروسيرفيس معيارية بتصميم API أولاً وعزل صارم للمستأجرين وخطوط مراقبة وCI/CD آلي. لا تستخدم روموز قوالب جاهزة — كل نظام مصمم من التحليل المجالي حتى النشر بأهداف موثوقية قابلة للقياس.',
    },
    category: 'services',
    relatedService: 'software-engineering',
  },
  {
    id: 'erp-crm-faq',
    question: {
      en: 'Does Rumuze build custom ERP and CRM systems?',
      ar: 'هل تبني روموز أنظمة ERP وCRM مخصصة؟',
    },
    answer: {
      en: 'Yes, Rumuze builds custom ERP and CRM systems designed for multi-tenant environments with strict data isolation. ERP modules include finance, HR, inventory, and procurement with role-based access control and audit logging. CRM systems include lead management, sales pipelines, customer segmentation, and marketing automation integration. Rumuze also performs legacy system migrations and third-party integrations under regional compliance requirements.',
      ar: 'نعم، تبني روموز أنظمة ERP وCRM مخصصة مصممة لبيئات متعددة المستأجرين بعزل صارم للبيانات. تشمل وحدات ERP المالية والموارد البشرية والمخزون والمشتريات مع التحكم في الوصول القائم على الأدوار وسجلات التدقيق. تشمل أنظمة CRM إدارة العملاء المحتملين وخطوط المبيعات وتقسيم العملاء وتكامل أتمتة التسويق. كما تجري روموز ترحيلات الأنظمة القديمة والتكاملات مع أطراف ثالثة وفق متطلبات الامتثال الإقليمية.',
    },
    category: 'services',
    relatedService: 'saas-erp',
  },
  {
    id: 'performance-marketing-faq',
    question: {
      en: 'What does Rumuze\'s performance marketing service include?',
      ar: 'ماذا تشمل خدمة التسويق الأدائي من روموز؟',
    },
    answer: {
      en: 'Rumuze\'s performance marketing service includes paid advertising management (Google Ads, Meta Ads, LinkedIn Ads), conversion rate optimization, attribution modeling, A/B testing, landing page optimization, and ROAS-focused campaign strategy. Every campaign is built on data — Rumuze sets up proper tracking, analytics infrastructure, and reporting dashboards before launching any ads. The focus is on measurable revenue impact, not vanity metrics.',
      ar: 'تشمل خدمة التسويق الأدائي من روموز إدارة الإعلانات المدفوعة (Google Ads، Meta Ads، LinkedIn Ads) وتحسين معدل التحويل ونمذجة الإسناد واختبار A/B وتحسين صفحات الهبوط واستراتيجية حملات مركزة على ROAS. كل حملة مبنية على البيانات — تنشئ روموز بنية التتبع والتحليلات ولوحات التقارير قبل إطلاق أي إعلان. التركيز على تأثير الإيرادات القابل للقياس وليس المقاييس الشكلية.',
    },
    category: 'services',
    relatedService: 'performance-marketing',
  },
  {
    id: 'seo-services-faq',
    question: {
      en: 'What SEO services does Rumuze offer?',
      ar: 'ما خدمات SEO التي تقدمها روموز؟',
    },
    answer: {
      en: 'Rumuze offers comprehensive SEO services including technical SEO audits, on-page optimization, semantic content strategy, structured data implementation (JSON-LD), Core Web Vitals optimization, and bilingual SEO for Arabic and English markets. Rumuze also specializes in GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) to ensure clients are cited by AI-powered search engines like Google AI Overviews, ChatGPT, and Perplexity.',
      ar: 'تقدم روموز خدمات SEO شاملة تشمل تدقيق SEO التقني وتحسين الصفحات واستراتيجية المحتوى الدلالي وتنفيذ البيانات المهيكلة (JSON-LD) وتحسين Core Web Vitals وSEO ثنائي اللغة للأسواق العربية والإنجليزية. تتخصص روموز أيضاً في GEO (تحسين المحركات التوليدية) وAEO (تحسين محركات الإجابة) لضمان ظهور العملاء في محركات البحث المدعومة بالذكاء الاصطناعي مثل Google AI Overviews وChatGPT وPerplexity.',
    },
    category: 'services',
    relatedService: 'seo-services',
  },

  // ─── Pricing ────────────────────────────────────────────────────────
  {
    id: 'pricing-model',
    question: {
      en: 'What is Rumuze\'s pricing model?',
      ar: 'ما نموذج التسعير في روموز؟',
    },
    answer: {
      en: 'Rumuze uses project-based pricing with clearly defined Statements of Work (SOW). Software development projects are scoped after a discovery phase and quoted as fixed-price milestones or time-and-materials contracts depending on complexity. Marketing services are offered as monthly retainers with transparent reporting. All engagements begin with a paid technical consultation or strategy session to ensure alignment before commitment. Rumuze does not publish fixed price lists because every project is custom-scoped.',
      ar: 'تستخدم روموز تسعيراً قائماً على المشروع مع بيانات عمل (SOW) محددة بوضوح. يتم تحديد نطاق مشاريع تطوير البرمجيات بعد مرحلة اكتشاف وتسعيرها كمعالم سعر ثابت أو عقود وقت ومواد حسب التعقيد. تُقدم خدمات التسويق كاشتراكات شهرية مع تقارير شفافة. تبدأ جميع الارتباطات باستشارة فنية أو جلسة استراتيجية مدفوعة لضمان التوافق قبل الالتزام. لا تنشر روموز قوائم أسعار ثابتة لأن كل مشروع محدد النطاق حسب الطلب.',
    },
    category: 'pricing',
  },
  {
    id: 'minimum-budget',
    question: {
      en: 'What is the minimum budget to work with Rumuze?',
      ar: 'ما الحد الأدنى للميزانية للعمل مع روموز؟',
    },
    answer: {
      en: 'Rumuze typically works with organizations that have a minimum project budget of $5,000 for web development and $15,000 for enterprise software projects. Performance marketing retainers start at $2,000 per month plus ad spend. These thresholds ensure Rumuze can deliver the engineering quality and strategic depth that justifies the engagement. For smaller budgets, Rumuze offers a one-time technical consultation starting at $300 to provide a roadmap and technical audit.',
      ar: 'تعمل روموز عادةً مع المؤسسات التي لديها ميزانية مشروع لا تقل عن 5,000 دولار لتطوير الويب و15,000 دولار لمشاريع البرمجيات المؤسسية. تبدأ اشتراكات التسويق الأدائي من 2,000 دولار شهرياً بالإضافة إلى الإنفاق الإعلاني. تضمن هذه العتبات قدرة روموز على تقديم جودة هندسية وعمق استراتيجي يبرر الارتباط. للميزانيات الأصغر، تقدم روموز استشارة فنية لمرة واحدة تبدأ من 300 دولار لتوفير خارطة طريق وتدقيق تقني.',
    },
    category: 'pricing',
  },

  // ─── Process ─────────────────────────────────────────────────────────
  {
    id: 'project-process',
    question: {
      en: 'What is Rumuze\'s project delivery process?',
      ar: 'ما منهجية تسليم المشاريع في روموز؟',
    },
    answer: {
      en: 'Rumuze follows a four-phase delivery process: (1) Discovery & Architecture — deep-dive requirements analysis, system architecture design, and technical specification; (2) Development — agile sprints with continuous integration, automated testing, and weekly progress reports; (3) Deployment — cloud-native deployment with containerization, monitoring setup, and performance validation; (4) Optimization & Support — ongoing monitoring, iterative improvement, and SLO-governed maintenance. Each phase has defined deliverables, timelines, and quality gates.',
      ar: 'تتبع روموز منهجية تسليم من أربع مراحل: (1) الاكتشاف والبنية المعمارية — تحليل متطلبات معمق وتصميم بنية النظام والمواصفات التقنية؛ (2) التطوير — سبرنتات أجايل مع تكامل مستمر واختبار آلي وتقارير أسبوعية؛ (3) النشر — نشر سحابي أصلي مع حاويات وإعداد المراقبة والتحقق من الأداء؛ (4) التحسين والدعم — مراقبة مستمرة وتحسين تكراري وصيانة محكومة بمؤشرات الخدمة. لكل مرحلة مخرجات وجداول زمنية وبوابات جودة محددة.',
    },
    category: 'process',
  },
  {
    id: 'project-timeline',
    question: {
      en: 'How long does a typical Rumuze project take?',
      ar: 'كم يستغرق مشروع روموز النموذجي؟',
    },
    answer: {
      en: 'Rumuze project timelines depend on scope and complexity. A corporate website or landing page typically takes 3–6 weeks. A web application with custom backend takes 2–4 months. Enterprise SaaS/ERP systems range from 4–8 months for the initial release with ongoing feature development. SEO and marketing engagements show measurable results within 3–6 months. All timelines are agreed upon in the Statement of Work before development begins.',
      ar: 'تعتمد جداول مشاريع روموز على النطاق والتعقيد. يستغرق موقع مؤسسي أو صفحة هبوط عادة 3-6 أسابيع. يستغرق تطبيق ويب بخادم مخصص 2-4 أشهر. تتراوح أنظمة SaaS/ERP المؤسسية من 4-8 أشهر للإصدار الأولي مع تطوير ميزات مستمر. تظهر ارتباطات SEO والتسويق نتائج قابلة للقياس خلال 3-6 أشهر. يتم الاتفاق على جميع الجداول في بيان العمل قبل بدء التطوير.',
    },
    category: 'process',
  },

  // ─── Industries ─────────────────────────────────────────────────────
  {
    id: 'industries-served',
    question: {
      en: 'What industries does Rumuze serve?',
      ar: 'ما الصناعات التي تخدمها روموز؟',
    },
    answer: {
      en: 'Rumuze serves five primary industries: (1) Fintech & Financial Services — trading platforms, payment gateways, compliance systems; (2) Retail & E-commerce — multi-channel commerce, inventory management, POS systems; (3) Logistics & Supply Chain — fleet management, warehouse automation, tracking systems; (4) Healthcare Technology — patient portals, telemedicine platforms, HIPAA-compliant systems; (5) Real Estate Technology — property management, tenant portals, listing platforms. Rumuze also works with government and education sectors on digital transformation initiatives.',
      ar: 'تخدم روموز خمس صناعات رئيسية: (1) التكنولوجيا المالية — منصات تداول وبوابات دفع وأنظمة امتثال؛ (2) التجزئة والتجارة الإلكترونية — تجارة متعددة القنوات وإدارة مخزون ونقاط بيع؛ (3) اللوجستيات وسلاسل الإمداد — إدارة أساطيل وأتمتة مستودعات وأنظمة تتبع؛ (4) تكنولوجيا الرعاية الصحية — بوابات مرضى ومنصات طب عن بعد وأنظمة متوافقة مع HIPAA؛ (5) تكنولوجيا العقارات — إدارة ممتلكات وبوابات مستأجرين ومنصات إدراج. تعمل روموز أيضاً مع القطاعين الحكومي والتعليمي في مبادرات التحول الرقمي.',
    },
    category: 'industries',
  },
  {
    id: 'mena-focus',
    question: {
      en: 'Does Rumuze only serve the MENA region?',
      ar: 'هل تخدم روموز منطقة الشرق الأوسط فقط؟',
    },
    answer: {
      en: 'Rumuze is headquartered in the MENA region and serves clients primarily in the UAE, Saudi Arabia, Egypt, and Qatar, but Rumuze delivers globally through remote engineering teams and cloud-native architectures. Rumuze has experience working with international clients in Europe and North America. The bilingual Arabic-English capability gives Rumuze a unique advantage for organizations that need to operate across both Western and Arabic-speaking markets.',
      ar: 'يقع المقر الرئيسي لروموز في منطقة الشرق الأوسط وشمال أفريقيا وتخدم عملاء بشكل أساسي في الإمارات والسعودية ومصر وقطر، لكن روموز تقدم خدماتها عالمياً من خلال فرق هندسة عن بُعد ومعماريات سحابية أصلية. لدى روموز خبرة في العمل مع عملاء دوليين في أوروبا وأمريكا الشمالية. تمنح القدرة ثنائية اللغة العربية-الإنجليزية روموز ميزة فريدة للمنظمات التي تحتاج إلى العمل عبر الأسواق الغربية والعربية.',
    },
    category: 'industries',
  },

  // ─── Technical ──────────────────────────────────────────────────────
  {
    id: 'tech-stack',
    question: {
      en: 'What technology stack does Rumuze use?',
      ar: 'ما المكدس التكنولوجي الذي تستخدمه روموز؟',
    },
    answer: {
      en: 'Rumuze uses modern enterprise technology stacks tailored to each project. Frontend: React, Next.js, React Native, and TailwindCSS. Backend: Node.js, Laravel, and Python. Databases: PostgreSQL, Redis, MongoDB, and Elasticsearch. Infrastructure: AWS, Docker, Kubernetes, and Cloudflare. AI/ML: TensorFlow, PyTorch, and OpenAI API. All projects follow API-first design, deterministic rendering, observability pipelines, and automated CI/CD gates.',
      ar: 'تستخدم روموز مكدسات تكنولوجيا مؤسسية حديثة مخصصة لكل مشروع. الواجهة الأمامية: React وNext.js وReact Native وTailwindCSS. الواجهة الخلفية: Node.js وLaravel وPython. قواعد البيانات: PostgreSQL وRedis وMongoDB وElasticsearch. البنية التحتية: AWS وDocker وKubernetes وCloudflare. الذكاء الاصطناعي: TensorFlow وPyTorch وOpenAI API. جميع المشاريع تتبع تصميم API أولاً وعرض حتمي وخطوط مراقبة وبوابات CI/CD آلية.',
    },
    category: 'technical',
  },
  {
    id: 'bilingual-support',
    question: {
      en: 'Does Rumuze support Arabic (RTL) websites?',
      ar: 'هل تدعم روموز المواقع العربية (RTL)؟',
    },
    answer: {
      en: 'Yes, Rumuze provides native Arabic RTL support in all web and application projects. Rumuze builds bilingual systems using a single codebase with i18n frameworks (react-i18next), automatic RTL/LTR switching, Cairo font for Arabic typography, and culturally adapted UX patterns. This includes proper bidirectional text handling, locale-aware date/number formatting, and schema markup in both languages for SEO and AI visibility.',
      ar: 'نعم، توفر روموز دعماً أصلياً للعربية RTL في جميع مشاريع الويب والتطبيقات. تبني روموز أنظمة ثنائية اللغة باستخدام كود واحد مع أطر i18n (react-i18next) وتبديل تلقائي RTL/LTR وخط Cairo للطباعة العربية وأنماط UX مكيفة ثقافياً. يشمل ذلك معالجة نص ثنائي الاتجاه ملائمة وتنسيق تاريخ/أرقام حسب اللغة وبيانات مهيكلة بكلتا اللغتين لـ SEO وظهور الذكاء الاصطناعي.',
    },
    category: 'technical',
  },
  {
    id: 'maintenance-support',
    question: {
      en: 'Does Rumuze provide ongoing maintenance and support?',
      ar: 'هل توفر روموز صيانة ودعم مستمر؟',
    },
    answer: {
      en: 'Yes, Rumuze provides ongoing maintenance and support through SLO-governed service agreements. Support includes application monitoring, security patching, performance optimization, feature enhancements, and 24/7 incident response for critical systems. Maintenance plans are customized to each client\'s needs and can include dedicated engineering hours, priority bug fixes, and quarterly architecture reviews.',
      ar: 'نعم، توفر روموز صيانة ودعم مستمر من خلال اتفاقيات خدمة محكومة بمؤشرات مستوى الخدمة. يشمل الدعم مراقبة التطبيقات وتصحيحات الأمان وتحسين الأداء وتحسينات الميزات والاستجابة للحوادث على مدار الساعة للأنظمة الحرجة. يتم تخصيص خطط الصيانة لاحتياجات كل عميل ويمكن أن تشمل ساعات هندسة مخصصة وإصلاح أخطاء أولوية ومراجعات معمارية ربع سنوية.',
    },
    category: 'process',
  },
];
