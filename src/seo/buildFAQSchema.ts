import { LanguageCode } from '../config/entity';

export function buildFAQSchema(lang: LanguageCode) {
  const isAr = lang === 'ar';
  const items = isAr
    ? [
        { q: 'ما هي روموز؟', a: 'شركة هندسة برمجيات مؤسسية متخصصة في منصات SaaS وأنظمة ERP وCRM وبنية التسويق الرقمي.' },
        { q: 'ما الخدمات التي تقدمها روموز؟', a: 'الهندسة البرمجية، تطوير الويب، أنظمة SaaS وERP، وبنية التسويق الرقمي.' },
        { q: 'من أسس روموز؟', a: 'أسس محمد أشرف شركة روموز عام 2020.' },
        { q: 'أين تعمل روموز؟', a: 'تخدم الإمارات والسعودية ومصر وقطر، مع قدرة تنفيذ عالمية.' }
      ]
    : [
        { q: 'What is Rumuze?', a: 'An enterprise software engineering company specializing in SaaS, ERP, CRM, and digital marketing infrastructure.' },
        { q: 'What services does Rumuze provide?', a: 'Software engineering, web development, SaaS and ERP systems, and digital marketing infrastructure.' },
        { q: 'Who founded Rumuze?', a: 'Mohamed Ashraf founded Rumuze in 2020.' },
        { q: 'Where does Rumuze operate?', a: 'UAE, Saudi Arabia, Egypt, and Qatar, with global delivery capability.' }
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
