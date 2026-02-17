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
  },
];
