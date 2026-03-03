/**
 * Case Studies Configuration — Authority & Social Proof Data
 *
 * Centralized case study data for:
 * - CaseStudiesPage (full listing with detail view)
 * - Homepage metrics bar (aggregate numbers)
 * - Service detail pages (filtered by service)
 * - buildCaseStudySchema (future schema.org CreativeWork)
 *
 * AI Optimization Notes:
 * - Every result has a measurable metric (%, $, time)
 * - Industry tagging enables cross-referencing
 * - Service slugs connect to services.ts
 * - All content bilingual for MENA + global market
 */

import type { LanguageCode } from './entity';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Localized {
  en: string;
  ar: string;
}

export interface MeasurableResult {
  /** What was measured */
  metric: Localized;
  /** The numeric result (e.g., "340%", "$2.1M", "99.97%") */
  value: string;
  /** Direction of improvement (e.g., "increase", "decrease", "achieved") */
  improvement: Localized;
}

export interface CaseStudy {
  /** Unique identifier */
  id: string;
  /** URL-friendly slug */
  slug: string;
  /** Project title */
  title: Localized;
  /** Client industry */
  industry: Localized;
  /** The problem the client faced */
  problem: Localized;
  /** What Rumuze built/delivered */
  solution: Localized;
  /** Measurable outcomes — numbers required */
  results: MeasurableResult[];
  /** Service slugs from services.ts */
  services: string[];
  /** Project duration */
  duration: Localized;
  /** Key technologies used */
  techUsed: string[];
  /** Optional client testimonial */
  testimonial?: {
    quote: Localized;
    author: string;
    role: Localized;
    company: string;
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns case studies filtered by service slug.
 */
export function getCaseStudiesByService(serviceSlug: string): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.services.includes(serviceSlug));
}

/**
 * Returns case studies filtered by industry keyword.
 */
export function getCaseStudiesByIndustry(
  industryKeyword: string,
  lang: LanguageCode = 'en'
): CaseStudy[] {
  return CASE_STUDIES.filter((cs) =>
    cs.industry[lang].toLowerCase().includes(industryKeyword.toLowerCase())
  );
}

// ---------------------------------------------------------------------------
// Aggregate Metrics (for homepage MetricsBar)
// ---------------------------------------------------------------------------

export const AGGREGATE_METRICS = {
  projectsDelivered: { value: '47+', label: { en: 'Projects Delivered', ar: 'مشاريع مُنجزة' } },
  uptimeGuarantee: { value: '99.9%', label: { en: 'Uptime Guaranteed', ar: 'وقت تشغيل مضمون' } },
  countriesServed: { value: '12+', label: { en: 'Countries Served', ar: 'دول مخدومة' } },
  yearsExperience: { value: '8+', label: { en: 'Years Experience', ar: 'سنوات خبرة' } },
  clientRetention: { value: '94%', label: { en: 'Client Retention', ar: 'معدل الاحتفاظ بالعملاء' } },
  averageROAS: { value: '3.8x', label: { en: 'Average ROAS', ar: 'متوسط العائد الإعلاني' } },
} as const;

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-fintech-saas',
    slug: 'fintech-saas-platform',
    title: {
      en: 'Multi-Tenant Fintech Trading Platform',
      ar: 'منصة تداول مالية متعددة المستأجرين',
    },
    industry: {
      en: 'Fintech & Financial Services',
      ar: 'التكنولوجيا المالية والخدمات المالية',
    },
    problem: {
      en: 'A regional fintech company was running its trading operations on a monolithic legacy system that could not scale beyond 500 concurrent users. System downtime during peak trading hours was causing measurable revenue loss, and the inability to onboard new institutional clients under separate tenants was limiting growth.',
      ar: 'كانت شركة تكنولوجيا مالية إقليمية تدير عملياتها التداولية على نظام قديم أحادي لا يمكنه التوسع لأكثر من 500 مستخدم متزامن. كان التوقف أثناء ساعات الذروة يسبب خسائر إيرادات قابلة للقياس، وعدم القدرة على إضافة عملاء مؤسسيين جدد تحت مستأجرين منفصلين كان يحد من النمو.',
    },
    solution: {
      en: 'Rumuze re-architected the platform into a multi-tenant microservices system with strict tenant isolation at database and application layers. The new architecture included real-time WebSocket feeds, queue-based order processing, RBAC with audit logging, and automated failover. The system was deployed on AWS EKS with multi-region redundancy.',
      ar: 'أعادت روموز هيكلة المنصة إلى نظام ميكروسيرفيس متعدد المستأجرين مع عزل صارم على مستوى قاعدة البيانات والتطبيق. تضمنت البنية الجديدة تغذيات WebSocket حية ومعالجة أوامر قائمة على الطوابير وصلاحيات أدوار مع سجلات تدقيق وتجاوز فشل آلي. تم نشر النظام على AWS EKS مع تكرار متعدد المناطق.',
    },
    results: [
      {
        metric: { en: 'System Uptime', ar: 'وقت تشغيل النظام' },
        value: '99.97%',
        improvement: { en: 'achieved', ar: 'تم تحقيقه' },
      },
      {
        metric: { en: 'Concurrent User Capacity', ar: 'سعة المستخدمين المتزامنين' },
        value: '10,000+',
        improvement: { en: '20x increase', ar: 'زيادة 20 ضعف' },
      },
      {
        metric: { en: 'Client Onboarding Time', ar: 'وقت إضافة العملاء' },
        value: '48hrs',
        improvement: { en: '85% faster', ar: 'أسرع بنسبة 85%' },
      },
      {
        metric: { en: 'Revenue Impact', ar: 'الأثر على الإيرادات' },
        value: '+$1.2M',
        improvement: { en: 'first-year increase', ar: 'زيادة السنة الأولى' },
      },
    ],
    services: ['software-engineering', 'saas-erp'],
    duration: { en: '6 months', ar: '6 أشهر' },
    techUsed: ['Node.js', 'React', 'PostgreSQL', 'Redis', 'AWS EKS', 'Docker', 'WebSocket'],
    testimonial: {
      quote: {
        en: 'Rumuze didn\'t just rebuild our platform — they transformed how we operate. The new system handles 20x our previous capacity and we haven\'t had a single unplanned outage.',
        ar: 'لم تقم روموز بإعادة بناء منصتنا فحسب — بل غيرت طريقة عملنا. النظام الجديد يتعامل مع 20 ضعف سعتنا السابقة ولم نشهد أي توقف غير مخطط.',
      },
      author: 'Ahmad K.',
      role: { en: 'CTO', ar: 'المدير التقني' },
      company: 'Regional Fintech Company',
    },
  },
  {
    id: 'cs-retail-ecommerce',
    slug: 'multi-region-retail-platform',
    title: {
      en: 'Multi-Region E-Commerce Platform',
      ar: 'منصة تجارة إلكترونية متعددة المناطق',
    },
    industry: {
      en: 'Retail & E-commerce',
      ar: 'التجزئة والتجارة الإلكترونية',
    },
    problem: {
      en: 'A retail chain operating across 3 GCC countries needed a unified e-commerce platform that could handle localized pricing, multi-currency payments, bilingual content, and real-time inventory sync across 40+ physical stores. Their existing Shopify setup could not support the operational complexity.',
      ar: 'احتاجت سلسلة تجزئة تعمل عبر 3 دول خليجية إلى منصة تجارة إلكترونية موحدة تتعامل مع تسعير محلي ودفعات متعددة العملات ومحتوى ثنائي اللغة ومزامنة مخزون حية عبر 40+ متجراً فعلياً. لم يتمكن إعدادهم على Shopify من دعم هذا التعقيد التشغيلي.',
    },
    solution: {
      en: 'Rumuze built a custom headless commerce platform with a React/Next.js storefront, Node.js API layer, and PostgreSQL product catalog. Features included multi-currency pricing engine, real-time inventory sync via webhooks, bilingual product management (AR + EN), and integration with local payment gateways (PayTabs, Tap). The system supported server-side rendering for SEO and Arabic RTL layouts.',
      ar: 'بنت روموز منصة تجارة إلكترونية headless مخصصة بواجهة React/Next.js وطبقة API بـ Node.js وكتالوج منتجات PostgreSQL. شملت الميزات محرك تسعير متعدد العملات ومزامنة مخزون حية عبر webhooks وإدارة منتجات ثنائية اللغة (عربي + إنجليزي) وتكامل مع بوابات دفع محلية (PayTabs، Tap). دعم النظام عرض خادم لـ SEO وتخطيطات عربية RTL.',
    },
    results: [
      {
        metric: { en: 'Online Revenue', ar: 'الإيرادات الإلكترونية' },
        value: '+340%',
        improvement: { en: 'year-over-year growth', ar: 'نمو سنوي' },
      },
      {
        metric: { en: 'Page Load Time', ar: 'وقت تحميل الصفحة' },
        value: '1.2s',
        improvement: { en: '70% faster', ar: 'أسرع بنسبة 70%' },
      },
      {
        metric: { en: 'Cart Abandonment', ar: 'التخلي عن السلة' },
        value: '-28%',
        improvement: { en: 'reduction', ar: 'انخفاض' },
      },
    ],
    services: ['web-development', 'software-engineering'],
    duration: { en: '4 months', ar: '4 أشهر' },
    techUsed: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Cloudflare', 'PayTabs'],
  },
  {
    id: 'cs-logistics-erp',
    slug: 'logistics-erp-system',
    title: {
      en: 'Logistics & Fleet Management ERP',
      ar: 'نظام ERP لإدارة اللوجستيات والأساطيل',
    },
    industry: {
      en: 'Logistics & Supply Chain',
      ar: 'اللوجستيات وسلاسل الإمداد',
    },
    problem: {
      en: 'A logistics company managing 200+ vehicles across Egypt and Saudi Arabia was using spreadsheets and disconnected tools for fleet tracking, delivery scheduling, and driver management. Manual processes led to route inefficiencies, missed deliveries, and inability to generate operational reports.',
      ar: 'كانت شركة لوجستيات تدير 200+ مركبة عبر مصر والسعودية تستخدم جداول بيانات وأدوات منفصلة لتتبع الأساطيل وجدولة التسليم وإدارة السائقين. أدت العمليات اليدوية إلى عدم كفاءة المسارات وتسليمات فائتة وعدم القدرة على إنشاء تقارير تشغيلية.',
    },
    solution: {
      en: 'Rumuze designed and built a custom ERP system with modules for fleet tracking (GPS integration), automated route optimization, delivery scheduling, driver management, and financial reporting. The system included a mobile app for drivers (React Native), a web dashboard for dispatchers, and automated SMS/WhatsApp notifications for customers. Role-based access control ensured operational security across departments.',
      ar: 'صممت روموز وبنت نظام ERP مخصص بوحدات لتتبع الأساطيل (تكامل GPS) وتحسين المسارات الآلي وجدولة التسليم وإدارة السائقين والتقارير المالية. شمل النظام تطبيق جوال للسائقين (React Native) ولوحة ويب للمرسلين وإشعارات SMS/WhatsApp آلية للعملاء. ضمن التحكم في الوصول القائم على الأدوار الأمان التشغيلي عبر الأقسام.',
    },
    results: [
      {
        metric: { en: 'Delivery Efficiency', ar: 'كفاءة التسليم' },
        value: '+45%',
        improvement: { en: 'improvement', ar: 'تحسين' },
      },
      {
        metric: { en: 'Fuel Cost', ar: 'تكلفة الوقود' },
        value: '-22%',
        improvement: { en: 'reduction', ar: 'انخفاض' },
      },
      {
        metric: { en: 'Manual Reporting Time', ar: 'وقت التقارير اليدوية' },
        value: '-90%',
        improvement: { en: 'eliminated', ar: 'تم إلغاؤه' },
      },
      {
        metric: { en: 'On-Time Delivery Rate', ar: 'معدل التسليم في الوقت' },
        value: '94%',
        improvement: { en: 'from 67%', ar: 'من 67%' },
      },
    ],
    services: ['saas-erp', 'software-engineering'],
    duration: { en: '5 months', ar: '5 أشهر' },
    techUsed: ['Laravel', 'React', 'React Native', 'PostgreSQL', 'Redis', 'Google Maps API', 'AWS'],
    testimonial: {
      quote: {
        en: 'We went from managing our fleet on Excel to having a fully automated operations center. Rumuze understood our workflows and built exactly what we needed.',
        ar: 'انتقلنا من إدارة أسطولنا على Excel إلى مركز عمليات مؤتمت بالكامل. فهمت روموز أعمالنا وبنت بالضبط ما نحتاجه.',
      },
      author: 'Omar M.',
      role: { en: 'Operations Director', ar: 'مدير العمليات' },
      company: 'GCC Logistics Provider',
    },
  },
  {
    id: 'cs-healthcare-portal',
    slug: 'healthcare-patient-portal',
    title: {
      en: 'Healthcare Patient Portal & Telemedicine',
      ar: 'بوابة مرضى ومنصة طب عن بعد',
    },
    industry: {
      en: 'Healthcare Technology',
      ar: 'تكنولوجيا الرعاية الصحية',
    },
    problem: {
      en: 'A healthcare network with 12 clinics needed a patient-facing portal for appointment booking, medical records access, telemedicine consultations, and prescription management. The existing phone-based appointment system had a 40% no-show rate and fragmented patient data across clinics.',
      ar: 'احتاجت شبكة رعاية صحية تضم 12 عيادة إلى بوابة مرضى لحجز المواعيد والوصول للسجلات الطبية واستشارات الطب عن بعد وإدارة الوصفات. كان لنظام المواعيد القائم على الهاتف معدل عدم حضور 40% وبيانات مرضى مجزأة عبر العيادات.',
    },
    solution: {
      en: 'Rumuze built a unified patient portal with Next.js frontend and Node.js backend, featuring online appointment scheduling with SMS reminders, video consultation integration (WebRTC), electronic medical records with cross-clinic data sync, bilingual interface (Arabic primary), and secure authentication compliant with healthcare data regulations. The system included a provider dashboard for clinic staff.',
      ar: 'بنت روموز بوابة مرضى موحدة بواجهة Next.js وخلفية Node.js، تتضمن جدولة مواعيد إلكترونية مع تذكيرات SMS وتكامل استشارات فيديو (WebRTC) وسجلات طبية إلكترونية مع مزامنة بيانات بين العيادات وواجهة ثنائية اللغة (العربية أساسية) ومصادقة آمنة متوافقة مع لوائح بيانات الرعاية الصحية. شمل النظام لوحة مقدمي الخدمة لموظفي العيادات.',
    },
    results: [
      {
        metric: { en: 'No-Show Rate', ar: 'معدل عدم الحضور' },
        value: '-60%',
        improvement: { en: 'reduction (40% → 16%)', ar: 'انخفاض (40% → 16%)' },
      },
      {
        metric: { en: 'Patient Satisfaction', ar: 'رضا المرضى' },
        value: '4.7/5',
        improvement: { en: 'average rating', ar: 'متوسط التقييم' },
      },
      {
        metric: { en: 'Telemedicine Adoption', ar: 'تبني الطب عن بعد' },
        value: '35%',
        improvement: { en: 'of consultations', ar: 'من الاستشارات' },
      },
    ],
    services: ['web-development', 'software-engineering'],
    duration: { en: '4 months', ar: '4 أشهر' },
    techUsed: ['Next.js', 'Node.js', 'PostgreSQL', 'WebRTC', 'Twilio', 'AWS'],
  },
  {
    id: 'cs-performance-marketing',
    slug: 'ecommerce-performance-marketing',
    title: {
      en: 'E-Commerce Performance Marketing Overhaul',
      ar: 'إعادة هيكلة التسويق الأدائي للتجارة الإلكترونية',
    },
    industry: {
      en: 'Retail & E-commerce',
      ar: 'التجزئة والتجارة الإلكترونية',
    },
    problem: {
      en: 'An online fashion retailer in the UAE was spending $50K/month on paid ads (Meta + Google) with a ROAS of 1.8x, which was below profitability. Attribution was broken — the team couldn\'t identify which campaigns were driving actual purchases vs. last-click noise. Creative fatigue and poor audience segmentation were degrading performance monthly.',
      ar: 'كان متجر أزياء إلكتروني في الإمارات ينفق 50 ألف دولار شهرياً على الإعلانات المدفوعة (Meta + Google) بعائد إعلاني 1.8x، وهو أقل من الربحية. كان نظام الإسناد معطلاً — لم يتمكن الفريق من تحديد الحملات التي تدفع مشتريات فعلية مقابل ضوضاء النقرة الأخيرة. أدى إرهاق الإبداع وتقسيم الجمهور السيئ إلى تدهور الأداء شهرياً.',
    },
    solution: {
      en: 'Rumuze rebuilt the marketing infrastructure from tracking up. The engagement included server-side tracking implementation (Meta CAPI + GA4), multi-touch attribution modeling, creative testing framework with systematic A/B rotation, audience segmentation based on behavioral cohorts, and automated reporting dashboards. Campaign structure was redesigned from scratch with proper funnel mapping.',
      ar: 'أعادت روموز بناء البنية التحتية للتسويق من التتبع وصعوداً. شمل الارتباط تنفيذ تتبع خادم (Meta CAPI + GA4) ونمذجة إسناد متعدد اللمس وإطار اختبار إبداعي بتدوير A/B منهجي وتقسيم جمهور قائم على أفواج سلوكية ولوحات تقارير آلية. تمت إعادة تصميم هيكل الحملات من الصفر مع رسم خرائط القمع المناسب.',
    },
    results: [
      {
        metric: { en: 'ROAS', ar: 'العائد الإعلاني' },
        value: '4.6x',
        improvement: { en: 'from 1.8x (156% increase)', ar: 'من 1.8x (زيادة 156%)' },
      },
      {
        metric: { en: 'Cost Per Acquisition', ar: 'تكلفة الاكتساب' },
        value: '-42%',
        improvement: { en: 'reduction', ar: 'انخفاض' },
      },
      {
        metric: { en: 'Monthly Revenue', ar: 'الإيرادات الشهرية' },
        value: '+$180K',
        improvement: { en: 'incremental revenue', ar: 'إيرادات إضافية' },
      },
    ],
    services: ['performance-marketing', 'marketing-infrastructure'],
    duration: { en: '3 months', ar: '3 أشهر' },
    techUsed: ['Meta Ads', 'Google Ads', 'GA4', 'Meta CAPI', 'Looker Studio', 'GTM Server-Side'],
    testimonial: {
      quote: {
        en: 'Our ROAS went from barely breaking even to 4.6x in three months. Rumuze fixed our tracking first, then rebuilt everything on top of real data.',
        ar: 'انتقل عائدنا الإعلاني من بالكاد نقطة التعادل إلى 4.6x في ثلاثة أشهر. أصلحت روموز التتبع أولاً ثم أعادت بناء كل شيء على بيانات حقيقية.',
      },
      author: 'Sara A.',
      role: { en: 'Marketing Director', ar: 'مديرة التسويق' },
      company: 'UAE Fashion Retailer',
    },
  },
  {
    id: 'cs-revenue-platform',
    slug: 'revenue-platform-engineering',
    title: {
      en: 'Engineering a Revenue-Centric Web Platform with Integrated Marketing Infrastructure',
      ar: 'هندسة منصة ويب محورها الإيرادات مع بنية تحتية تسويقية متكاملة',
    },
    industry: {
      en: 'Professional Services & B2B SaaS',
      ar: 'الخدمات المهنية وتطبيقات SaaS للشركات',
    },
    problem: {
      en: `A mid-size professional services company had two compounding problems: a fragmented web platform that could not support their sales cycle, and marketing spend that operated without attribution accountability.

Executive Summary: The client's existing website was a static brochure site running on a shared hosting environment. It had no lead capture infrastructure, no CRM integration, no analytics beyond page views, and no conversion tracking. At the same time, their marketing team was spending $18,000/month across Google Ads and Meta Ads with no ability to attribute which campaigns were producing qualified pipeline. The combination of a weak platform and broken marketing infrastructure was causing 32% of inbound leads to be lost before first contact.

Business Problem: The operational bottleneck was a disconnected stack — static site, spreadsheet-managed leads, manual follow-up, and last-click attribution in Google Analytics. The revenue friction was measurable: $18K/month in ad spend producing a 1.4x ROAS with a cost-per-qualified-lead of $214. The system limitation was absence of any infrastructure — no webhook-based lead routing, no lifecycle tracking, no conversion API, no server-side event stream. The governance gap was total: no SOW-bound delivery model, no reporting cadence, no KPI accountability.`,
      ar: `شركة خدمات مهنية متوسطة الحجم كانت تعاني من مشكلتين متراكمتين: منصة ويب مجزأة لا تدعم دورة المبيعات، وإنفاق تسويقي يعمل دون مساءلة إسناد.

الملخص التنفيذي: كان موقع العميل الإلكتروني الحالي صفحة ثابتة تعمل على بيئة استضافة مشتركة. لم يكن لديه بنية تحتية لجمع العملاء المحتملين، ولا تكامل مع CRM، ولا تحليلات تتجاوز مشاهدات الصفحات، ولا تتبع للتحويلات. في نفس الوقت، كان فريق التسويق ينفق 18,000 دولار شهرياً عبر Google Ads وMeta Ads دون أي قدرة على نسب الحملات التي تنتج خط أنابيب مؤهل. أدى الجمع بين منصة ضعيفة وبنية تحتية تسويقية معطلة إلى خسارة 32% من العملاء المحتملين الوافدين قبل أول تواصل.

المشكلة التجارية: كانت الاختناق التشغيلي في مكدس منفصل — موقع ثابت وإدارة عملاء محتملين عبر جداول بيانات ومتابعة يدوية وإسناد نقرة أخيرة. كان الاحتكاك في الإيرادات قابلاً للقياس: 18 ألف دولار شهرياً في الإنفاق الإعلاني ينتج عائداً إعلانياً 1.4x وتكلفة لكل عميل مؤهل بـ 214 دولار. كان القيد النظامي غياب أي بنية تحتية — لا توجيه عملاء محتملين عبر webhook، ولا تتبع دورة حياة، ولا واجهة API للتحويل، ولا تدفق أحداث من جانب الخادم. كانت الفجوة في الحوكمة كاملة: لا نموذج تسليم مقيد ببيان عمل، ولا إيقاع تقارير، ولا مساءلة لمؤشرات الأداء.`,
    },
    solution: {
      en: `Rumuze delivered a two-pillar engagement: a production-grade web platform and a complete marketing infrastructure rebuild — both governed under a single Statement of Work with weekly reporting.

Pillar 1 — Software Engineering: Rumuze re-architected the client's web presence as a Next.js SSR platform with an API-first Node.js backend. The platform included a structured lead capture system with webhook-based routing to HubSpot CRM, lifecycle stage automation, a bilingual content architecture (Arabic + English), JSON-LD structured data for all service and FAQ entities, and a Core Web Vitals-optimized deployment on Vercel with edge CDN. The CRM integration included lead scoring rules, automated email sequences, and sales team assignment logic based on lead source and intent signal.

Pillar 2 — Marketing Infrastructure: Rumuze rebuilt the attribution stack from the tracking layer up. Implementation included server-side GTM, Meta Conversion API (CAPI), GA4 with custom event taxonomy, multi-touch attribution modeling in Looker Studio, and a structured audience segmentation framework based on behavioral cohorts. Campaign structure was redesigned across Google Ads (3 search campaigns, 2 performance max) and Meta Ads (6 ad sets, 18 creative variants) with a systematic A/B testing rotation. A weekly executive revenue dashboard was configured to report ROAS, CPL, pipeline velocity, and conversion stage breakdown.

Governance Model: The engagement ran under a defined SOW with bi-weekly sprint reviews, weekly KPI reporting, milestone sign-off before each phase launch, and a named Rumuze project owner accountable for all deliverables. No scope was added without a signed change order.`,
      ar: `قدمت روموز ارتباطاً ذا ركيزتين: منصة ويب بجودة إنتاجية وإعادة بناء كاملة للبنية التحتية التسويقية — كلاهما محكوم تحت بيان عمل واحد مع تقارير أسبوعية.

الركيزة 1 — هندسة البرمجيات: أعادت روموز هيكلة حضور العميل على الإنترنت كمنصة Next.js بعرض خادم مع خلفية Node.js قائمة على API-first. تضمنت المنصة نظام التقاط عملاء محتملين منظم مع توجيه قائم على webhook إلى HubSpot CRM وأتمتة مرحلة دورة الحياة ومعمارية محتوى ثنائية اللغة (عربي + إنجليزي) وبيانات JSON-LD المهيكلة لجميع كيانات الخدمة والأسئلة الشائعة ونشر محسّن لـ Core Web Vitals على Vercel مع CDN حافة. تضمن تكامل CRM قواعد تسجيل العملاء المحتملين وتسلسلات البريد الإلكتروني الآلية ومنطق تعيين فريق المبيعات بناءً على مصدر العميل المحتمل وإشارة النية.

الركيزة 2 — البنية التحتية التسويقية: أعادت روموز بناء مكدس الإسناد من طبقة التتبع. شمل التنفيذ GTM من جانب الخادم وواجهة Meta Conversion API (CAPI) وGA4 مع تصنيف أحداث مخصص ونمذجة إسناد متعدد اللمس في Looker Studio وإطار تقسيم جمهور منظم قائم على أفواج سلوكية. تمت إعادة تصميم هيكل الحملة عبر Google Ads (3 حملات بحث، 2 Performance Max) وMeta Ads (6 مجموعات إعلانية، 18 إصداراً إبداعياً) مع تدوير A/B منهجي. تم تكوين لوحة إيرادات تنفيذية أسبوعية للإبلاغ عن ROAS وCPL وسرعة خط الأنابيب وتفصيل مرحلة التحويل.

نموذج الحوكمة: جرى الارتباط تحت بيان عمل محدد مع مراجعات سبرينت نصف شهرية وتقارير KPI أسبوعية وتوقيع على مراحل قبل كل إطلاق مرحلة ومالك مشروع روموز مسمى مسؤول عن جميع المخرجات. لم تُضف أي نطاق دون أمر تغيير موقّع.`,
    },
    results: [
      {
        metric: {
          en: 'Qualified Lead Volume',
          ar: 'حجم العملاء المحتملين المؤهلين',
        },
        value: '+47%',
        improvement: {
          en: 'increase within 90 days of platform launch',
          ar: 'زيادة خلال 90 يوماً من إطلاق المنصة',
        },
      },
      {
        metric: {
          en: 'Lead Leakage Rate',
          ar: 'معدل تسرب العملاء المحتملين',
        },
        value: '-32%',
        improvement: {
          en: 'reduction via CRM webhook routing and lifecycle automation',
          ar: 'انخفاض عبر توجيه webhook لـ CRM وأتمتة دورة الحياة',
        },
      },
      {
        metric: {
          en: 'Conversion Rate (Visitor → Lead)',
          ar: 'معدل التحويل (زائر → عميل محتمل)',
        },
        value: '+18%',
        improvement: {
          en: 'improvement from 1.4% to 1.65% after CRO implementation',
          ar: 'تحسن من 1.4% إلى 1.65% بعد تنفيذ تحسين التحويل',
        },
      },
      {
        metric: { en: 'ROAS', ar: 'العائد الإعلاني' },
        value: '3.6x',
        improvement: {
          en: 'from 1.4x — attributed via server-side tracking + multi-touch model',
          ar: 'من 1.4x — منسوب عبر تتبع جانب الخادم ونموذج متعدد اللمس',
        },
      },
      {
        metric: {
          en: 'Cost Per Qualified Lead',
          ar: 'تكلفة العميل المحتمل المؤهل',
        },
        value: '$124',
        improvement: {
          en: 'from $214 — 42% reduction via audience segmentation and bid restructuring',
          ar: 'من 214 دولار — انخفاض 42% عبر تقسيم الجمهور وإعادة هيكلة العطاء',
        },
      },
      {
        metric: {
          en: 'Attribution Visibility',
          ar: 'رؤية الإسناد',
        },
        value: '100%',
        improvement: {
          en: 'full attribution across all paid channels via CAPI + server-side GTM',
          ar: 'إسناد كامل عبر جميع القنوات المدفوعة عبر CAPI + GTM من جانب الخادم',
        },
      },
    ],
    services: ['software-engineering', 'web-development', 'performance-marketing', 'marketing-infrastructure'],
    duration: { en: '4 months', ar: '4 أشهر' },
    techUsed: [
      'Next.js',
      'Node.js',
      'HubSpot CRM',
      'GTM Server-Side',
      'Meta CAPI',
      'GA4',
      'Looker Studio',
      'Vercel Edge',
      'JSON-LD',
    ],
    testimonial: {
      quote: {
        en: 'Before Rumuze, we were spending $18K a month on ads with no idea what was working. They rebuilt everything — the platform, the tracking, the campaigns — and for the first time we have a dashboard that shows us exactly where every qualified lead came from.',
        ar: 'قبل روموز، كنا ننفق 18 ألف دولار شهرياً على الإعلانات دون أي فكرة عما ينجح. أعادوا بناء كل شيء — المنصة والتتبع والحملات — وللمرة الأولى لدينا لوحة تظهر لنا بالضبط من أين جاء كل عميل مؤهل.',
      },
      author: 'Nasser R.',
      role: {
        en: 'Managing Director',
        ar: 'المدير العام',
      },
      company: 'B2B Professional Services Firm (MENA)',
    },
  },
];
