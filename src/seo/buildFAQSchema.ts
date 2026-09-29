import { LanguageCode } from '../config/entity';
import { homeContent } from '../content/homeContent';

// The FAQPage markup mirrors the FAQ rendered on the homepage. Keep them
// derived from the same source so structured data never drifts from the page.
export function buildFAQSchema(lang: LanguageCode) {
  const isAr = lang === 'ar';
  const items = homeContent[isAr ? 'ar' : 'en'].faq.items;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': isAr ? 'https://www.rumuze.com/ar#faq' : 'https://www.rumuze.com/#faq',
    inLanguage: isAr ? 'ar' : 'en',
    mainEntity: items.map((item: { q: string; a: string }) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
