import { LanguageCode } from '../config/entity';

export function buildWebSiteSchema(lang: LanguageCode) {
  const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.rumuze.com/#website',
    url: 'https://www.rumuze.com',
    name: 'Rumuze',
    publisher: { '@id': 'https://www.rumuze.com/#organization' },
    inLanguage: locale,
  };
}
