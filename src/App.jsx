import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { organizationSchema } from './seo/organizationSchema';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UpdateToast from './components/UpdateToast';
import InstallPrompt from './components/InstallPrompt';
import ErrorBoundary from './components/ErrorBoundary';
import CustomCursor from './components/CustomCursor';
import AuthFloatingButton from './components/AuthFloatingButton';
import VisitTracker from './components/VisitTracker';
import ConsentBanner from './components/ConsentBanner';
import ShareButton from './components/ShareButton';
import OfflineToast from './components/OfflineToast';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import AppRoutes from './routes/AppRoutes';
import { useChunkErrorRecovery } from './hooks/useChunkErrorRecovery';
import { useLanguageSync } from './hooks/useLanguageSync';
import { useIsOffline } from './hooks/useOnlineStatus';
import { usePwaUpdate } from './hooks/usePwaUpdate';
import { useScrollProgress } from './hooks/useScrollProgress';

function AppContent() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isAr = i18n.language === 'ar';
  const isAdminRoute =
    location.pathname.startsWith('/admin') || location.pathname.startsWith('/en/admin');

  const isOffline = useIsOffline();
  const scrollProgress = useScrollProgress();
  const { needRefresh, applyUpdate, dismissUpdate } = usePwaUpdate();
  useLanguageSync(location.pathname);
  useChunkErrorRecovery(location.pathname);

  // Lets browser tests (and anyone debugging) know the app is interactive.
  useEffect(() => {
    document.documentElement.dataset.hydrated = 'true';
  }, []);

  return (
    <div className={`surface-page min-h-screen tech-grid transition-colors duration-300 ${isAr ? 'rtl' : 'ltr'}`}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>
      <VisitTracker />
      <ConsentBanner />
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan origin-left z-[100] transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <OfflineToast />
      <Navbar />

      <main className={!isAdminRoute ? 'main-mobile-nav-clearance' : undefined}>
        <AppRoutes location={location} />
      </main>

      <aside
        aria-label={isAr ? 'إجراءات سريعة' : 'Quick actions'}
        className="bottom-safe-nav-clearance fixed right-4 z-[72] flex flex-col items-center gap-3 md:right-6"
      >
        <AuthFloatingButton />
        {!isAdminRoute ? <WhatsAppButton /> : null}
        {!isAdminRoute ? <div className="hidden md:block"><ShareButton /></div> : null}
      </aside>

      <UpdateToast show={needRefresh} onUpdate={applyUpdate} onClose={dismissUpdate} />
      {!isOffline && !isAdminRoute ? <InstallPrompt /> : null}
      {!isAdminRoute ? <Footer /> : null}
    </div>
  );
}

/**
 * Root component.
 *
 * `RouterComponent`, `routerProps`, and `helmetContext` let the prerender build
 * (entry-server.jsx) render the same tree with a StaticRouter and collect the
 * <head> tags. In the browser the defaults apply.
 */
function App({ RouterComponent = Router, routerProps = {}, helmetContext }) {
  return (
    <HelmetProvider context={helmetContext}>
      <ErrorBoundary>
        <ThemeProvider>
          <AuthProvider>
            <RouterComponent {...routerProps}>
              <CustomCursor />
              <ScrollToTop />
              <AppContent />
            </RouterComponent>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
