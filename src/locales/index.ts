export type LocaleCode = 'en' | 'ar';

export interface LocaleBundle {
  locale: LocaleCode;
  dir: 'ltr' | 'rtl';
  hreflang: string;
  common: Record<string, string>;
  homepage: Record<string, string | string[]>;
  services: Record<string, string | string[]>;
}

export async function getLocaleContent(locale: LocaleCode): Promise<LocaleBundle> {
  const isAr = locale === 'ar';
  const [common, homepage, services] = await Promise.all([
    import(`./${locale}/common.json`).then(m => m.default),
    import(`./${locale}/homepage.json`).then(m => m.default),
    import(`./${locale}/services.json`).then(m => m.default),
  ]);
  return {
    locale,
    dir: isAr ? 'rtl' : 'ltr',
    hreflang: isAr ? 'ar' : 'en',
    common,
    homepage,
    services,
  };
}
