// Route data for the app. Arabic is the primary language: every page exists in
// Arabic (`/x`) and English (`/en/x`); the table lists each page once and
// `localizePath` derives both.
// Components are attached in AppRoutes.jsx, so this file stays plain data that
// tests can read without loading any page.

export const localizePath = (path, locale) =>
  locale === 'en' ? (path === '/' ? '/en' : `/en${path}`) : path;

/**
 * access: 'public' | 'account' (signed in) | 'admin' (signed in with the admin role)
 * props: passed to the page component
 */
export const PAGE_ROUTES = [
  { id: 'portfolio', path: '/portfolio', access: 'public' },
  { id: 'productDetail', path: '/portfolio/:slug', access: 'public' },
  { id: 'labs', path: '/labs', access: 'public' },
  { id: 'services', path: '/services', access: 'public' },
  { id: 'serviceDetail', path: '/services/:slug', access: 'public' },
  { id: 'saudiArabia', path: '/saudi-arabia', access: 'public' },
  { id: 'process', path: '/process', access: 'public' },
  { id: 'about', path: '/about', access: 'public' },
  { id: 'blog', path: '/blog', access: 'public' },
  { id: 'blogPost', path: '/blog/:slug', access: 'public' },
  { id: 'privacy', path: '/privacy', access: 'public', props: { type: 'privacy' } },
  { id: 'terms', path: '/terms', access: 'public', props: { type: 'terms' } },
  { id: 'contact', path: '/contact', access: 'public' },
  { id: 'qrGenerator', path: '/qr-generator', access: 'public' },
  { id: 'whatsappLink', path: '/whatsapp-link-generator', access: 'public' },
  { id: 'utmBuilder', path: '/utm-builder', access: 'public' },
  { id: 'serpPreview', path: '/serp-preview', access: 'public' },
  { id: 'hijriConverter', path: '/hijri-date-converter', access: 'public' },
  { id: 'schemaGenerator', path: '/schema-generator', access: 'public' },
  { id: 'briefWriter', path: '/project-brief-writer', access: 'public' },
  { id: 'vatCalculator', path: '/vat-calculator', access: 'public' },
  { id: 'adBudgetCalculator', path: '/ad-budget-calculator', access: 'public' },
  { id: 'imageCompressor', path: '/image-compressor', access: 'public' },
  { id: 'emailSignature', path: '/email-signature-generator', access: 'public' },
  { id: 'paletteFromImage', path: '/palette-from-image', access: 'public' },
  { id: 'socialPreview', path: '/social-share-preview', access: 'public' },
  { id: 'wordCounter', path: '/word-counter', access: 'public' },
  { id: 'seoFiles', path: '/robots-txt-sitemap-generator', access: 'public' },
  { id: 'invoiceGenerator', path: '/invoice-generator', access: 'public' },
  { id: 'jsonFormatter', path: '/json-formatter', access: 'public' },
  { id: 'faviconGenerator', path: '/favicon-generator', access: 'public' },
  { id: 'cssUnitConverter', path: '/css-unit-converter', access: 'public' },
  { id: 'profile', path: '/profile', access: 'account' },
  { id: 'settings', path: '/settings', access: 'account' },
  { id: 'myMessages', path: '/my-messages', access: 'account' },
  { id: 'adminInbox', path: '/admin/inbox', access: 'admin' },
  { id: 'adminUsers', path: '/admin/users', access: 'admin' },
  { id: 'adminVisits', path: '/admin/visits', access: 'admin' },
];

/** Retired URLs and the live page each one now points to (kept in step with public/_redirects). */
export const RETIRED_REDIRECTS = [
  ['/case-studies/*', '/portfolio'],
  ['/why-rumuze', '/about'],
  ['/enterprise-framework', '/services'],
  ['/methodology', '/about'],
  ['/architecture-principles', '/about'],
  ['/engineering-standards', '/about'],
  ['/slo-framework', '/services'],
  ['/multilingual-systems', '/services/web-development'],
  ['/knowledge-graph-architecture', '/services'],
  ['/enterprise-web-development', '/services/web-development'],
  ['/saas-architecture', '/services/saas-erp'],
  ['/marketing-infrastructure', '/services/marketing-infrastructure'],
  ['/seo-revenue-systems', '/services/seo-services'],
  ['/custom-software-development', '/services/software-engineering'],
  ['/enterprise-application-development', '/services/saas-erp'],
  ['/api-integration-architecture', '/services/software-engineering'],
  ['/manifesto', '/about'],
  ['/comparison/*', '/services'],
  ['/admin/messages', '/admin/inbox'],
];
