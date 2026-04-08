const DEFAULT_LOCALE = 'en';

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function normalizeSeoLocale(locale?: string | null) {
  return locale?.toLowerCase().startsWith('ar') ? 'ar' : 'en';
}

export function normalizePath(path: string) {
  const rawPath = (path || '/').split(/[?#]/)[0] || '/';
  const withLeadingSlash = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, '/');

  if (collapsed === '/') {
    return '/';
  }

  return collapsed.endsWith('/') ? collapsed.slice(0, -1) : collapsed;
}

export function hasLocalePrefix(path: string, locale = 'ar') {
  const normalizedPath = normalizePath(path);
  return new RegExp(`^/${escapeRegex(locale)}(?:/|$)`).test(normalizedPath);
}

export function stripLocalePrefix(path: string, locales: string[] = [DEFAULT_LOCALE, 'ar']) {
  const normalizedPath = normalizePath(path);
  const effectiveLocales = locales.filter(Boolean);

  if (effectiveLocales.length === 0) {
    return normalizedPath;
  }

  const localePattern = effectiveLocales.map(escapeRegex).join('|');
  const strippedPath = normalizedPath.replace(new RegExp(`^/(?:${localePattern})(?=/|$)`), '');

  return strippedPath || '/';
}

export function localizePath(path: string, locale: string) {
  const cleanPath = stripLocalePrefix(path);
  const normalizedLocale = normalizeSeoLocale(locale);

  if (normalizedLocale === DEFAULT_LOCALE) {
    return cleanPath;
  }

  return cleanPath === '/' ? `/${normalizedLocale}` : `/${normalizedLocale}${cleanPath}`;
}

export function generateCanonical(baseUrl: string, path: string) {
  return `${baseUrl}${normalizePath(path)}`;
}

export function generateHreflangs(baseUrl: string, path: string) {
  const cleanPath = stripLocalePrefix(path, [DEFAULT_LOCALE, 'ar']);

  return {
    en: `${baseUrl}${localizePath(cleanPath, 'en')}`,
    ar: `${baseUrl}${localizePath(cleanPath, 'ar')}`,
    xDefault: `${baseUrl}${localizePath(cleanPath, DEFAULT_LOCALE)}`,
  };
}

export function generateHreflangsFromLocales(baseUrl: string, path: string, locales: string[]) {
  const supportedLocales = Array.from(
    new Set(
      (locales || [])
        .map((locale) => normalizeSeoLocale(locale))
        .filter((locale) => locale === 'en' || locale === 'ar')
    )
  );
  const cleanPath = stripLocalePrefix(path, supportedLocales.length > 0 ? supportedLocales : [DEFAULT_LOCALE, 'ar']);
  const map: Record<string, string> = {};

  supportedLocales.forEach((locale) => {
    map[locale] = `${baseUrl}${localizePath(cleanPath, locale)}`;
  });

  map['x-default'] = map.en ?? `${baseUrl}${localizePath(cleanPath, DEFAULT_LOCALE)}`;

  return map;
}
