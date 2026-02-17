import { Helmet } from 'react-helmet-async';
import React from 'react';
import { getLocaleFromPath, getHtmlDir, getLangAttr, Locale } from '../i18n/index';

type SEOProps = {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  image?: string;
};

const SITE_NAME = 'Rumuze';
const BASE_URL = 'https://www.rumuze.com';

export function SEO({ title, description, path, locale, image }: SEOProps) {
  const loc: Locale = locale ?? getLocaleFromPath(path);
  const langAttr = getLangAttr(loc);
  const dirAttr = getHtmlDir(loc);
  const canonical = `${BASE_URL}${path || '/'}`;
  const altPath = path.replace(/^\/ar/, '') || '/';
  const enHref = `${BASE_URL}${altPath}`;
  const arHref = `${BASE_URL}/ar${altPath === '/' ? '' : altPath}`;
  const ogLocale = loc === 'ar' ? 'ar_EG' : 'en_US';
  const ogImage = image ?? `${BASE_URL}/${loc === 'ar' ? 'og-image-ar.png' : 'og-image-en.png'}`;

  return (
    <Helmet>
      <html lang={langAttr} dir={dirAttr} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large" />
      <link rel="canonical" href={canonical} />

      <link rel="alternate" hrefLang="en" href={enHref} />
      <link rel="alternate" hrefLang="ar" href={arHref} />
      <link rel="alternate" hrefLang="x-default" href={enHref} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={ogLocale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}

export default SEO;
