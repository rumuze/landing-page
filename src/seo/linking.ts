export function generateCanonical(baseUrl: string, path: string) {
  const clean = path.replace(/\/{2,}/g, '/');
  return `${baseUrl}${clean}`;
}

export function generateHreflangs(baseUrl: string, path: string) {
  const clean = path.replace(/^\/ar/, '');
  return {
    en: `${baseUrl}${clean}`,
    ar: `${baseUrl}/ar${clean}`,
    xDefault: `${baseUrl}${clean}`,
  };
}

export function generateHreflangsFromLocales(baseUrl: string, path: string, locales: string[]) {
  const clean = path.replace(/^\/[a-zA-Z-]+/, ''); // strip leading locale segment
  const map: Record<string, string> = {};
  for (const locale of locales) {
    if (locale === 'en') {
      map.en = `${baseUrl}${clean}`;
    } else {
      map[locale] = `${baseUrl}/${locale}${clean}`;
    }
  }
  map['x-default'] = `${baseUrl}${clean}`;
  return map;
}
