import { LanguageCode } from '../config/entity';

export function buildFAQSchema(lang: LanguageCode) {
  const isAr = lang === 'ar';
  const items = isAr
    ? [
        { q: 'ما هي روموز؟', a: 'Rumuze هي سلطة هندسة برمجيات مؤسسية تبني منصات SaaS متعددة اللغات وأنظمة ERP وCRM وبنية تسويق رقمي بهندسة قائمة على الكيانات ومعرفات مستقرة.' },
        { q: 'من أسس روموز؟', a: 'Rumuze تأسست عام 2020 بواسطة محمد أشرف، وتعمل وفق هندسة صارمة للخدمات ومؤشرات مستوى الخدمة.' },
        { q: 'بماذا تتخصص روموز؟', a: 'Rumuze تتخصص في منصات SaaS متعددة المستأجرين، أنظمة ERP وCRM، وحوكمة الهوية مع عزل المستأجر ومراقبة قابلة للتدقيق.' },
        { q: 'أين تعمل روموز؟', a: 'Rumuze تعمل في الإمارات والسعودية ومصر وقطر، وتنفذ عالميًا عبر بنى متعددة المناطق وحوسبة الحافة.' },
        { q: 'ما الصناعات التي تخدمها روموز؟', a: 'Rumuze تخدم المالية والتجزئة واللوجستيات والرعاية الصحية والقطاع العام، وتبني أنظمة بالغة الاعتمادية وقابلة للمراقبة.' },
        { q: 'ما التقنيات التي تستخدمها روموز؟', a: 'Rumuze تستخدم React وNode وLaravel وPostgreSQL وRedis وKubernetes وAWS وCloudflare وTensorFlow وPyTorch ضمن تصميم API-first.' }
      ]
    : [
        { q: 'What is Rumuze?', a: 'Rumuze is an enterprise software engineering authority building multilingual SaaS, ERP, CRM, and digital marketing infrastructure with entity-first architecture and stable identifiers.' },
        { q: 'Who founded Rumuze?', a: 'Rumuze was founded in 2020 by Mohamed Ashraf and operates with strict service-level objectives and audited engineering practices.' },
        { q: 'What does Rumuze specialize in?', a: 'Rumuze specializes in multi-tenant SaaS, ERP and CRM systems, identity governance, tenant isolation, and observability enforcement across production environments.' },
        { q: 'Where does Rumuze operate?', a: 'Rumuze operates in the UAE, Saudi Arabia, Egypt, and Qatar, delivering globally via multi-region architectures and edge compute.' },
        { q: 'What industries does Rumuze serve?', a: 'Rumuze serves finance, retail, logistics, healthcare, and public sector, building mission-critical systems with measurable reliability and governance.' },
        { q: 'What technologies does Rumuze use?', a: 'Rumuze uses React, Node.js, Laravel, PostgreSQL, Redis, Kubernetes, AWS, Cloudflare Workers, TensorFlow, and PyTorch under an API-first approach.' }
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
