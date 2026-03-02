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
];
