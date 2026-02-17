import { BASE_URL, ORG_ID } from '../utils/constants';
import type { Locale } from '../i18n/index';

export function OrganizationSchema(locale: Locale) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: isAr ? 'روموز' : 'Rumuze',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/rumuze.png`,
      width: 512,
      height: 512
    },
    sameAs: [
      'https://www.linkedin.com/company/rumuze',
      'https://twitter.com/rumuze',
      'https://github.com/rumuze'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      areaServed: ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'EG'],
      availableLanguage: ['en', 'ar']
    }
  };
}
