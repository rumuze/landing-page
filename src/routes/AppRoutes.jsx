import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import OfflineFallback from '../pages/OfflineFallback';
import ProtectedRoute from '../components/ProtectedRoute';
import RouteSkeleton from '../components/RouteSkeleton';
import { localizePath, PAGE_ROUTES, RETIRED_REDIRECTS } from './routeTable';

const HomePage = lazy(() => import('../pages/HomePage'));
const NotFound = lazy(() => import('../pages/NotFound'));

const PAGES = {
  portfolio: lazy(() => import('../pages/PortfolioPage')),
  productDetail: lazy(() => import('../pages/ProductPage')),
  labs: lazy(() => import('../components/Labs')),
  services: lazy(() => import('../pages/ServicesPage')),
  serviceDetail: lazy(() => import('../pages/ServiceDetailPage')),
  saudiArabia: lazy(() => import('../pages/SaudiArabiaPage')),
  process: lazy(() => import('../pages/ProcessPage')),
  about: lazy(() => import('../pages/AboutPage')),
  blog: lazy(() => import('../pages/BlogPage')),
  blogPost: lazy(() => import('../pages/BlogPost')),
  privacy: lazy(() => import('../pages/LegalPage')),
  terms: lazy(() => import('../pages/LegalPage')),
  contact: lazy(() => import('../pages/ContactPage')),
  qrGenerator: lazy(() => import('../pages/QrGeneratorPage')),
  profile: lazy(() => import('../pages/Profile')),
  settings: lazy(() => import('../pages/Settings')),
  myMessages: lazy(() => import('../pages/MyMessages')),
  adminInbox: lazy(() => import('../pages/admin/Inbox')),
  adminUsers: lazy(() => import('../pages/admin/Users')),
  adminVisits: lazy(() => import('../pages/admin/Visits')),
};

const LOCALES = ['en', 'ar'];

function PageShell({ children }) {
  return (
    <div className="animate-fade-in">
      <Suspense fallback={<RouteSkeleton />}>{children}</Suspense>
    </div>
  );
}

function renderPageRoute({ id, path, access, props }, locale) {
  const Page = PAGES[id];
  const page = (
    <PageShell>
      <Page {...props} />
    </PageShell>
  );
  const element =
    access === 'public' ? (
      page
    ) : (
      <ProtectedRoute requireAdmin={access === 'admin'}>{page}</ProtectedRoute>
    );

  return <Route key={`${locale}:${id}`} path={localizePath(path, locale)} element={element} />;
}

/** Every route of the site. `location` and the key make each navigation remount the page. */
export default function AppRoutes({ location }) {
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage isAr={true} />} />
      <Route path="/en" element={<HomePage />} />

      <Route path="/offline" element={<OfflineFallback />} />
      <Route path="/en/offline" element={<OfflineFallback />} />

      {LOCALES.flatMap((locale) => PAGE_ROUTES.map((route) => renderPageRoute(route, locale)))}

      {LOCALES.flatMap((locale) =>
        RETIRED_REDIRECTS.map(([from, to]) => (
          <Route
            key={`${locale}:${from}`}
            path={localizePath(from, locale)}
            element={<Navigate to={localizePath(to, locale)} replace />}
          />
        )),
      )}

      <Route
        path="*"
        element={
          <PageShell>
            <NotFound />
          </PageShell>
        }
      />
    </Routes>
  );
}
