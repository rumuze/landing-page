import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import OfflineFallback from '../pages/OfflineFallback';
import ProtectedRoute from '../components/ProtectedRoute';
import RouteSkeleton from '../components/RouteSkeleton';
import { PAGE_LOADERS, loadedPages } from './pageLoaders';
import { localizePath, PAGE_ROUTES, RETIRED_REDIRECTS } from './routeTable';

// A page renders straight away when its chunk was loaded before hydration (see main.jsx),
// and through React.lazy otherwise (client navigation).
function pageComponent(id) {
  const Lazy = lazy(PAGE_LOADERS[id]);
  return function Page(props) {
    const Loaded = loadedPages.get(id);
    return Loaded ? <Loaded {...props} /> : <Lazy {...props} />;
  };
}

const HomePage = pageComponent('home');
const NotFound = pageComponent('notFound');

const PAGES = Object.fromEntries(PAGE_ROUTES.map(({ id }) => [id, pageComponent(id)]));

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
