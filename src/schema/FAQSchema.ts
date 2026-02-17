import type { Locale } from '../i18n/index';
import { BASE_URL } from '../utils/constants';

type QA = { q: string; a: string };

export function FAQSchema(pagePath: string, locale: Locale, faqs: QA[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      'name': q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': a
      }
    })),
    '@id': `${BASE_URL}${pagePath}#faq`
  };
}
