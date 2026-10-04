// Route data for the app. Every page exists in English (`/x`) and Arabic
// (`/ar/x`); the table lists each page once and `localizePath` derives both.
// Components are attached in AppRoutes.jsx, so this file stays plain data that
// tests can read without loading any page.

export const localizePath = (path, locale) =>
  locale === 'ar' ? (path === '/' ? '/ar' : `/ar${path}`) : path;

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
  { id: 'about', path: '/about', access: 'public' },
  { id: 'blog', path: '/blog', access: 'public' },
  { id: 'blogPost', path: '/blog/:slug', access: 'public' },
  { id: 'privacy', path: '/privacy', access: 'public', props: { type: 'privacy' } },
  { id: 'terms', path: '/terms', access: 'public', props: { type: 'terms' } },
  { id: 'contact', path: '/contact', access: 'public' },
  { id: 'qrGenerator', path: '/qr-generator', access: 'public' },
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
