import { useTranslation } from 'react-i18next';
import { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { useRegisterSW } from 'virtual:pwa-register/react';
import UpdateToast from './components/UpdateToast';
import InstallPrompt from './components/InstallPrompt';
import OfflineFallback from './pages/OfflineFallback';
import ErrorBoundary from './components/ErrorBoundary';
import CustomCursor from './components/CustomCursor';
import AuthProfile from './components/AuthProfile';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load components
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const TechStack = lazy(() => import('./components/TechStack'));
const Contact = lazy(() => import('./components/Contact'));
const Labs = lazy(() => import('./components/Labs'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
import ShareButton from './components/ShareButton';
import OfflineToast from './components/OfflineToast';
import WhatsAppButton from './components/WhatsAppButton';
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ManifestoPage = lazy(() => import('./pages/ManifestoPage'));
const Methodology = lazy(() => import('./pages/Methodology'));
const ArchitecturePrinciples = lazy(() => import('./pages/ArchitecturePrinciples'));
const EngineeringStandards = lazy(() => import('./pages/EngineeringStandards'));
const SLOFramework = lazy(() => import('./pages/SLOFramework'));
const MultilingualSystems = lazy(() => import('./pages/MultilingualSystems'));
const KnowledgeGraphArchitecture = lazy(() => import('./pages/KnowledgeGraphArchitecture'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage'));
const WhyRumuzePage = lazy(() => import('./pages/WhyRumuzePage'));
const ComparisonPage = lazy(() => import('./pages/ComparisonPage'));
const SaudiArabiaPage = lazy(() => import('./pages/SaudiArabiaPage'));
const EnterpriseFrameworkPage = lazy(() => import('./pages/EnterpriseFrameworkPage'));
const EnterpriseWebDevelopmentPage = lazy(() => import('./pages/EnterpriseWebDevelopmentPage'));
const SaaSArchitecturePage = lazy(() => import('./pages/SaaSArchitecturePage'));
const MarketingInfrastructurePage = lazy(() => import('./pages/MarketingInfrastructurePage'));
const SeoRevenueSystemsPage = lazy(() => import('./pages/SeoRevenueSystemsPage'));
const CustomSoftwareDevelopmentPage = lazy(() => import('./pages/CustomSoftwareDevelopmentPage'));
const EnterpriseApplicationDevelopmentPage = lazy(() => import('./pages/EnterpriseApplicationDevelopmentPage'));
const ApiIntegrationArchitecturePage = lazy(() => import('./pages/ApiIntegrationArchitecturePage'));
const QrGeneratorPage = lazy(() => import('./pages/QrGeneratorPage'));
const ProfilePage = lazy(() => import('./pages/Profile'));
const SettingsPage = lazy(() => import('./pages/Settings'));

// Skeleton Loader
const Skeleton = () => (
    <div className="min-h-screen bg-white dark:bg-background p-8 space-y-8 animate-pulse">
        <div className="h-20 bg-white/5 rounded-2xl w-full"></div>
        <div className="h-[500px] bg-white/5 rounded-3xl w-full"></div>
        <div className="grid grid-cols-3 gap-8">
            <div className="h-64 bg-white/5 rounded-2xl"></div>
            <div className="h-64 bg-white/5 rounded-2xl"></div>
            <div className="h-64 bg-white/5 rounded-2xl"></div>
        </div>
    </div>
);

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      // Add a small delay for lazy-loaded components to mount
      const timer = setTimeout(() => {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  
  return null;
};

function AppContent() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isAr = i18n.language === 'ar';
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Reactive mobile breakpoint — no dependency, no animation
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight === 0) return;
      setScrollProgress(totalScroll / windowHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // PWA Register Logic
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered() {
      console.log('SW Registered');
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
    onOfflineReady() {
      console.log('App ready for offline use');
    },
  });


  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Language Synchronizer with Path
  // Language Synchronizer with Path
  useEffect(() => {
    // 1. Determine target language from URL
    const isPathAr = location.pathname.startsWith('/ar');
    const targetLang = isPathAr ? 'ar' : 'en';

    // 2. Sync i18n instance if mismatched
    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }

    // 3. Update document attributes
    const dir = targetLang === 'ar' ? 'rtl' : 'ltr';
    if (document.documentElement.dir !== dir) {
       document.documentElement.dir = dir;
    }
    if (document.documentElement.lang !== targetLang) {
       document.documentElement.lang = targetLang;
    }
    
    // Set theme color dynamically for mobile status bar
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', '#000B18');
    }
  }, [i18n, location.pathname]);

  // Periodic Sync Registration
  useEffect(() => {
    async function registerPeriodicSync() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
          .then(async (registration) => {
            if (registration && 'periodicSync' in registration) {
              try {
                // Check if already registered to avoid redundant calls
                const tags = await registration.periodicSync.getTags();
                if (!tags.includes('update-labs-data')) {
                  await registration.periodicSync.register('update-labs-data', {
                    // Minimum interval in milliseconds (24 hours)
                    minInterval: 24 * 60 * 60 * 1000,
                  });
                  console.log('Periodic Sync registered: update-labs-data');
                }
              } catch (error) {
                console.error('Periodic Sync registration failed:', error);
              }
            }
          })
          .catch(() => {});
      }
    }

    registerPeriodicSync();
  }, []);

  return (
    <div className={`min-h-screen bg-white dark:bg-background tech-grid transition-colors duration-300 ${isAr ? 'rtl' : 'ltr'}`}>
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan to-purple origin-left z-[100] transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      
      <OfflineToast />
      <Navbar />
      
      <main>
        
          <Routes location={location} key={location.pathname}>
            {/* Home Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/ar" element={<HomePage isAr={true} />} />

            {/* Portfolio Page Routes */}
            <Route path="/portfolio" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><PortfolioPage /></Suspense>
              </div>
            } />
            <Route path="/ar/portfolio" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><PortfolioPage /></Suspense>
              </div>
            } />

            {/* Offline Page */}
            <Route path="/offline" element={<OfflineFallback />} />
            <Route path="/ar/offline" element={<OfflineFallback />} />

            {/* Labs Routes */}
            <Route path="/labs" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><Labs /></Suspense>
              </div>
            } />
            <Route path="/ar/labs" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><Labs /></Suspense>
              </div>
            } />

            {/* Services Routes */}
            <Route path="/services" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><ServicesPage /></Suspense>
              </div>
            } />
            <Route path="/ar/services" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><ServicesPage /></Suspense>
              </div>
            } />

            {/* Service Detail Routes */}
            <Route path="/services/:slug" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><ServiceDetailPage /></Suspense>
              </div>
            } />
            <Route path="/ar/services/:slug" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><ServiceDetailPage /></Suspense>
              </div>
            } />

            {/* Case Studies Routes */}
            <Route path="/case-studies" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><CaseStudiesPage /></Suspense>
              </div>
            } />
            <Route path="/ar/case-studies" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><CaseStudiesPage isAr={true} /></Suspense>
              </div>
            } />
            <Route path="/case-studies/:slug" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><CaseStudyDetailPage /></Suspense>
              </div>
            } />
            <Route path="/ar/case-studies/:slug" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><CaseStudyDetailPage isAr={true} /></Suspense>
              </div>
            } />

            {/* Why Rumuze & Comparison Routes */}
            <Route path="/why-rumuze" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><WhyRumuzePage /></Suspense>
              </div>
            } />
            <Route path="/ar/why-rumuze" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><WhyRumuzePage isAr={true} /></Suspense>
              </div>
            } />
            <Route path="/comparison/:slug" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><ComparisonPage /></Suspense>
              </div>
            } />
            <Route path="/ar/comparison/:slug" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><ComparisonPage isAr={true} /></Suspense>
              </div>
            } />

            {/* Saudi Arabia & Enterprise Framework Routes */}
            <Route path="/saudi-arabia" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><SaudiArabiaPage /></Suspense>
              </div>
            } />
            <Route path="/ar/saudi-arabia" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><SaudiArabiaPage /></Suspense>
              </div>
            } />
            <Route path="/enterprise-framework" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><EnterpriseFrameworkPage /></Suspense>
              </div>
            } />
            <Route path="/ar/enterprise-framework" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><EnterpriseFrameworkPage /></Suspense>
              </div>
            } />

            {/* About Routes */}
            <Route path="/about" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Suspense />}><AboutPage /></Suspense>
              </div>
            } />
            <Route path="/ar/about" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><AboutPage /></Suspense>
              </div>
            } />

            {/* Authority Pages */}
            <Route path="/methodology" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><Methodology /></Suspense>
              </div>
            } />
            <Route path="/ar/methodology" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><Methodology /></Suspense>
              </div>
            } />
            <Route path="/architecture-principles" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><ArchitecturePrinciples /></Suspense>
              </div>
            } />
            <Route path="/ar/architecture-principles" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><ArchitecturePrinciples /></Suspense>
              </div>
            } />
            <Route path="/engineering-standards" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><EngineeringStandards /></Suspense>
              </div>
            } />
            <Route path="/ar/engineering-standards" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><EngineeringStandards /></Suspense>
              </div>
            } />
            <Route path="/slo-framework" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><SLOFramework /></Suspense>
              </div>
            } />
            <Route path="/ar/slo-framework" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><SLOFramework /></Suspense>
              </div>
            } />
            <Route path="/multilingual-systems" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><MultilingualSystems /></Suspense>
              </div>
            } />
            <Route path="/ar/multilingual-systems" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><MultilingualSystems /></Suspense>
              </div>
            } />
            <Route path="/knowledge-graph-architecture" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><KnowledgeGraphArchitecture /></Suspense>
              </div>
            } />
            <Route path="/ar/knowledge-graph-architecture" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><KnowledgeGraphArchitecture /></Suspense>
              </div>
            } />
            {/* Topical Authority Routes */}
            <Route path="/enterprise-web-development" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><EnterpriseWebDevelopmentPage /></Suspense>
              </div>
            } />
            <Route path="/ar/enterprise-web-development" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><EnterpriseWebDevelopmentPage /></Suspense>
              </div>
            } />
            <Route path="/saas-architecture" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><SaaSArchitecturePage /></Suspense>
              </div>
            } />
            <Route path="/ar/saas-architecture" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><SaaSArchitecturePage /></Suspense>
              </div>
            } />
            <Route path="/marketing-infrastructure" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><MarketingInfrastructurePage /></Suspense>
              </div>
            } />
            <Route path="/ar/marketing-infrastructure" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><MarketingInfrastructurePage /></Suspense>
              </div>
            } />
            <Route path="/seo-revenue-systems" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><SeoRevenueSystemsPage /></Suspense>
              </div>
            } />
            <Route path="/ar/seo-revenue-systems" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><SeoRevenueSystemsPage /></Suspense>
              </div>
            } />
            <Route path="/custom-software-development" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><CustomSoftwareDevelopmentPage /></Suspense>
              </div>
            } />
            <Route path="/ar/custom-software-development" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><CustomSoftwareDevelopmentPage /></Suspense>
              </div>
            } />
            <Route path="/enterprise-application-development" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><EnterpriseApplicationDevelopmentPage /></Suspense>
              </div>
            } />
            <Route path="/ar/enterprise-application-development" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><EnterpriseApplicationDevelopmentPage /></Suspense>
              </div>
            } />
            <Route path="/api-integration-architecture" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><ApiIntegrationArchitecturePage /></Suspense>
              </div>
            } />
            <Route path="/ar/api-integration-architecture" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><ApiIntegrationArchitecturePage /></Suspense>
              </div>
            } />

            {/* Blog Routes */}
            <Route path="/blog" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><BlogPage /></Suspense>
              </div>
            } />
            <Route path="/ar/blog" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><BlogPage /></Suspense>
              </div>
            } />

            {/* Legal Routes */}
            <Route path="/privacy" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><LegalPage type="privacy" /></Suspense>
              </div>
            } />
            <Route path="/ar/privacy" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><LegalPage type="privacy" /></Suspense>
              </div>
            } />
            <Route path="/terms" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><LegalPage type="terms" /></Suspense>
              </div>
            } />
            <Route path="/ar/terms" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><LegalPage type="terms" /></Suspense>
              </div>
            } />

            {/* Contact Routes */}
            <Route path="/contact" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><ContactPage /></Suspense>
              </div>
            } />
            <Route path="/ar/contact" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><ContactPage /></Suspense>
              </div>
            } />

            {/* QR Generator Routes */}
            <Route path="/qr-generator" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><QrGeneratorPage /></Suspense>
              </div>
            } />
            <Route path="/ar/qr-generator" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><QrGeneratorPage /></Suspense>
              </div>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <div className="animate-fade-in">
                  <Suspense fallback={<Skeleton />}><ProfilePage /></Suspense>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/ar/profile" element={
              <ProtectedRoute>
                <div className="animate-fade-in">
                  <Suspense fallback={<Skeleton />}><ProfilePage /></Suspense>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <div className="animate-fade-in">
                  <Suspense fallback={<Skeleton />}><SettingsPage /></Suspense>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/ar/settings" element={
              <ProtectedRoute>
                <div className="animate-fade-in">
                  <Suspense fallback={<Skeleton />}><SettingsPage /></Suspense>
                </div>
              </ProtectedRoute>
            } />

            {/* 404 Catch-All Route */}
            <Route path="*" element={
              <div className="animate-fade-in">
                <Suspense fallback={<Skeleton />}><NotFound /></Suspense>
              </div>
            } />
          </Routes>
        
      </main>

      <div
        className="fixed bottom-24 right-6 z-50 flex flex-col items-center gap-3 md:bottom-6"
        style={{
          bottom: isMobile
            ? 'calc(96px + env(safe-area-inset-bottom))'
            : 'calc(24px + env(safe-area-inset-bottom))',
          right: 'calc(24px + env(safe-area-inset-right))',
        }}
      >
        <AuthProfile />
        <WhatsAppButton />
        <ShareButton />
      </div>


      <UpdateToast 
        show={needRefresh} 
        onUpdate={() => updateServiceWorker(true)} 
        onClose={() => setNeedRefresh(false)} 
      />
      {/* Conditionally show InstallPrompt if online */}
      {!isOffline && <InstallPrompt />}
      <Footer />
    </div>
  );
}

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Initial load simulation or actual asset checking
    const timer = setTimeout(() => setIsInitialLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <AuthProvider>
            {isInitialLoading && (
              <div
                className="route-fade fixed inset-0 z-[10000]"
              >
                <LoadingSpinner fullScreen />
              </div>
            )}
            <Router>
              <CustomCursor />
              <ScrollToTop />
              <AppContent />
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
