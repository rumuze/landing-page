/**
 * schema.org WebApplication markup for one of the free tools. `url` is the tool's canonical
 * address; `name` and `description` are the visible title and subtitle of the page.
 */
export function buildToolSchema({ name, description, url, lang }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    inLanguage: lang === 'ar' ? 'ar' : 'en',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (runs in a web browser)',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@type': 'Organization', name: 'Rumuze', url: 'https://www.rumuze.com' },
  };
}
