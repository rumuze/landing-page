import { BASE_URL } from '../utils/constants';
import type { Locale } from '../i18n/index';

export function BreadcrumbSchema(path: string, locale: Locale) {
  const isAr = locale === 'ar';
  const segments = path.split('/').filter(Boolean).filter(s => s !== 'ar');
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: isAr ? 'الرئيسية' : 'Home',
      item: `${BASE_URL}${isAr ? '/ar' : ''}`
    }
  ];
  segments.forEach((seg, idx) => {
    items.push({
      '@type': 'ListItem',
      position: idx + 2,
      name: seg,
      item: `${BASE_URL}/${segments.slice(0, idx + 1).join('/')}`
    });
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}
