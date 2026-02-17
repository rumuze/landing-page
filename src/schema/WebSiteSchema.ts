import { BASE_URL, WEBSITE_ID, ORG_ID } from '../utils/constants';
import type { Locale } from '../i18n/index';

export function WebSiteSchema(locale: Locale) {
  const inLanguage = locale === 'ar' ? 'ar-EG' : 'en-US';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: BASE_URL,
    name: 'Rumuze',
    publisher: { '@id': ORG_ID },
    inLanguage
  };
}
