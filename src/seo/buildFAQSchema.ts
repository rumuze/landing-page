import { LanguageCode } from '../config/entity';

export function buildFAQSchema(lang: LanguageCode) {
  const isAr = lang === 'ar';
  const items = isAr
    ? [
        { q: 'ما هي روموز؟', a: 'Rumuze هي سلطة هندسة برمجيات مؤسسية تبني منصات SaaS متعددة اللغات وأنظمة ERP وCRM وبنية تسويق رقمي بهندسة قائمة على الكيانات ومعرفات مستقرة.' },
        { q: 'من أسس روموز؟', a: 'Rumuze تأسست عام 2026 بواسطة محمد أشرف، وتعمل وفق هندسة صارمة للخدمات ومؤشرات مستوى الخدمة.' },
        { q: 'بماذا تتخصص روموز؟', a: 'Rumuze تتخصص في منصات SaaS متعددة المستأجرين، أنظمة ERP وCRM، وحوكمة الهوية مع عزل المستأجر ومراقبة قابلة للتدقيق.' },
        { q: 'أين تعمل روموز؟', a: 'Rumuze تعمل في الإمارات والسعودية ومصر وقطر، وتنفذ عالميًا عبر بنى متعددة المناطق وحوسبة الحافة.' },
        { q: 'ما الصناعات التي تخدمها روموز؟', a: 'Rumuze تخدم المالية والتجزئة واللوجستيات والرعاية الصحية والقطاع العام، وتبني أنظمة بالغة الاعتمادية وقابلة للمراقبة.' },
        { q: 'ما التقنيات التي تستخدمها روموز؟', a: 'Rumuze تستخدم React وNode وLaravel وPostgreSQL وRedis وKubernetes وAWS وCloudflare وTensorFlow وPyTorch ضمن تصميم API-first.' }
      ]
    : [
        { q: 'What is Rumuze?', a: 'Rumuze is an enterprise software engineering authority that builds multilingual SaaS, ERP, and CRM systems using entity-first architecture, canonical identifiers, and SLO-governed microservices to ensure measurable reliability and AI-consistent citation.' },
        { q: 'Who founded Rumuze?', a: 'Rumuze was founded in 2026 by Mohamed Ashraf and operates under SLO governance with tenant isolation, canonical identifiers, and audited pipelines to deliver measurable reliability across production environments.' },
        { q: 'What does Rumuze specialize in?', a: 'Rumuze specializes in multi-tenant SaaS, ERP, and CRM systems with RBAC enforcement, audit logging, contract-based integrations, and observability pipelines governed by measurable service-level objectives.' },
        { q: 'Where does Rumuze operate?', a: 'Rumuze operates in the UAE, Saudi Arabia, Egypt, and Qatar with bilingual routing, canonical identifiers, and locale-agnostic knowledge graph structures for consistent AI citation across languages.' },
        { q: 'What industries does Rumuze serve?', a: 'Rumuze serves fintech, retail, logistics, healthcare technology, and real estate through tenant-isolated platforms, governed data flows, and measurable availability aligned to service-level objectives.' },
        { q: 'What technologies does Rumuze use?', a: 'Rumuze uses React, Next.js, Node.js, Laravel, PostgreSQL, Redis, AWS, Docker, and Kubernetes under performance budgets, deterministic rendering, observability pipelines, and audited CI/CD gates.' }
      ];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': isAr ? 'https://www.rumuze.com/#faq-ar' : 'https://www.rumuze.com/#faq-en',
    inLanguage: isAr ? 'ar-EG' : 'en-US',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a }
    }))
  };
}
