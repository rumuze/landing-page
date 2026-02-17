export type Locale = 'en' | 'ar';

export function getLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith('/ar') ? 'ar' : 'en';
}

export function getHtmlDir(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function getLangAttr(locale: Locale): string {
  return locale === 'ar' ? 'ar' : 'en';
}
