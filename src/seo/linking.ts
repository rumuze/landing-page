// Arabic is the primary language: it lives at the site root, English under /en.
const DEFAULT_LOCALE = 'ar';
const PREFIXED_LOCALES = ['en'];

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function normalizeSeoLocale(locale?: string | null) {
  return locale?.toLowerCase().startsWith('en') ? 'en' : 'ar';
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

export function hasLocalePrefix(path: string, locale = 'en') {
  const normalizedPath = normalizePath(path);
  return new RegExp(`^/${escapeRegex(locale)}(?:/|$)`).test(normalizedPath);
}

/** The language a URL is in: English under /en, Arabic everywhere else. */
export function localeFromPath(path: string) {
  return hasLocalePrefix(path, 'en') ? 'en' : 'ar';
}

export function stripLocalePrefix(path: string, locales: string[] = PREFIXED_LOCALES) {
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

function generateHreflangs(baseUrl: string, path: string) {
  const cleanPath = stripLocalePrefix(path);

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
  const cleanPath = stripLocalePrefix(path);
  const map: Record<string, string> = {};

  supportedLocales.forEach((locale) => {
    map[locale] = `${baseUrl}${localizePath(cleanPath, locale)}`;
  });

  map['x-default'] = map[DEFAULT_LOCALE] ?? `${baseUrl}${localizePath(cleanPath, DEFAULT_LOCALE)}`;

  return map;
}
