import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export function PageSEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  jsonLd,
  noindex,
}) {
  const { pathname } = useLocation();
  const fullCanonical = canonical ?? `https://www.rumuze.com${pathname}`;
  const image = ogImage ?? 'https://www.rumuze.com/og-image-en.png?v=2026-02';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={ogType} />

      {/* Twitter Card */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

export default PageSEO;
