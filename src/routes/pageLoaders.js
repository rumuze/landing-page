import { matchPath } from 'react-router-dom';
import { stripLocalePrefix } from '../seo/linking';
import { PAGE_ROUTES } from './routeTable';

// One loader per page chunk. AppRoutes lazy-loads them; main.jsx loads the chunk of the
// page being hydrated first, so the server-rendered page is never swapped for a skeleton.
export const PAGE_LOADERS = {
  home: () => import('../pages/HomePage'),
  notFound: () => import('../pages/NotFound'),
  portfolio: () => import('../pages/PortfolioPage'),
  productDetail: () => import('../pages/ProductPage'),
  labs: () => import('../components/Labs'),
  services: () => import('../pages/ServicesPage'),
  serviceDetail: () => import('../pages/ServiceDetailPage'),
  saudiArabia: () => import('../pages/SaudiArabiaPage'),
  process: () => import('../pages/ProcessPage'),
  about: () => import('../pages/AboutPage'),
  blog: () => import('../pages/BlogPage'),
  blogPost: () => import('../pages/BlogPost'),
  privacy: () => import('../pages/LegalPage'),
  terms: () => import('../pages/LegalPage'),
  contact: () => import('../pages/ContactPage'),
  qrGenerator: () => import('../pages/QrGeneratorPage'),
  whatsappLink: () => import('../pages/tools/WhatsAppLinkPage'),
  utmBuilder: () => import('../pages/tools/UtmBuilderPage'),
  serpPreview: () => import('../pages/tools/SerpPreviewPage'),
  profile: () => import('../pages/Profile'),
  settings: () => import('../pages/Settings'),
  myMessages: () => import('../pages/MyMessages'),
  adminInbox: () => import('../pages/admin/Inbox'),
  adminUsers: () => import('../pages/admin/Users'),
  adminVisits: () => import('../pages/admin/Visits'),
};

/** The page id for a URL path in either language, or null when no page matches. */
export function pageIdForPath(pathname) {
  const base = stripLocalePrefix(pathname) || '/';
  const path = base.length > 1 ? base.replace(/\/+$/, '') : base;
  if (path === '/') return 'home';
  return PAGE_ROUTES.find((route) => matchPath({ path: route.path, end: true }, path))?.id ?? null;
}

// Pages whose chunk has loaded, by id. A lazy component always suspends once while it
// resolves, even when its chunk is already there; rendering the loaded component directly
// lets the page being hydrated render in one pass.
export const loadedPages = new Map();

/** Loads the chunk of the page at `pathname` and remembers its component. */
export async function preloadPageFor(pathname) {
  const id = pageIdForPath(pathname);
  if (!id) return;
  const module = await PAGE_LOADERS[id]();
  loadedPages.set(id, module.default);
}
