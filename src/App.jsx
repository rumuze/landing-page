import { useScroll, useSpring, AnimatePresence, motion as Motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
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

// Lazy load components
const Hero = lazy(() => import('./components/Hero'));
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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
      if ('serviceWorker' in navigator && 'periodicSync' in navigator.serviceWorker.registration) {
        const registration = await navigator.serviceWorker.ready;
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
    }

    registerPeriodicSync();
  }, []);

  return (
    <div className={`min-h-screen bg-white dark:bg-background tech-grid transition-colors duration-300 ${isAr ? 'rtl' : 'ltr'}`}>
      <Motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan to-purple origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <OfflineToast />
      <Navbar />
      
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Home Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/ar" element={<HomePage isAr={true} />} />

            {/* Portfolio Page Routes */}
            <Route path="/portfolio" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><PortfolioPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/portfolio" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><PortfolioPage /></Suspense>
              </Motion.div>
            } />

            {/* Offline Page */}
            <Route path="/offline" element={<OfflineFallback />} />
            <Route path="/ar/offline" element={<OfflineFallback />} />

            {/* Labs Routes */}
            <Route path="/labs" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><Labs /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/labs" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><Labs /></Suspense>
              </Motion.div>
            } />

            {/* Services Routes */}
            <Route path="/services" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><ServicesPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/services" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><ServicesPage /></Suspense>
              </Motion.div>
            } />

            {/* Service Detail Routes */}
            <Route path="/services/:slug" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><ServiceDetailPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/services/:slug" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><ServiceDetailPage /></Suspense>
              </Motion.div>
            } />

            {/* Case Studies Routes */}
            <Route path="/case-studies" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><CaseStudiesPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/case-studies" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><CaseStudiesPage isAr={true} /></Suspense>
              </Motion.div>
            } />
            <Route path="/case-studies/:slug" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><CaseStudyDetailPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/case-studies/:slug" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><CaseStudyDetailPage isAr={true} /></Suspense>
              </Motion.div>
            } />

            {/* Why Rumuze & Comparison Routes */}
            <Route path="/why-rumuze" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><WhyRumuzePage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/why-rumuze" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><WhyRumuzePage isAr={true} /></Suspense>
              </Motion.div>
            } />
            <Route path="/comparison/:slug" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><ComparisonPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/comparison/:slug" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><ComparisonPage isAr={true} /></Suspense>
              </Motion.div>
            } />

            {/* Saudi Arabia & Enterprise Framework Routes */}
            <Route path="/saudi-arabia" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><SaudiArabiaPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/saudi-arabia" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><SaudiArabiaPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/enterprise-framework" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><EnterpriseFrameworkPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/enterprise-framework" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><EnterpriseFrameworkPage /></Suspense>
              </Motion.div>
            } />

            {/* About Routes */}
            <Route path="/about" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Suspense />}><AboutPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/about" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><AboutPage /></Suspense>
              </Motion.div>
            } />

            {/* Authority Pages */}
            <Route path="/methodology" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><Methodology /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/methodology" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><Methodology /></Suspense>
              </Motion.div>
            } />
            <Route path="/architecture-principles" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><ArchitecturePrinciples /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/architecture-principles" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><ArchitecturePrinciples /></Suspense>
              </Motion.div>
            } />
            <Route path="/engineering-standards" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><EngineeringStandards /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/engineering-standards" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><EngineeringStandards /></Suspense>
              </Motion.div>
            } />
            <Route path="/slo-framework" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><SLOFramework /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/slo-framework" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><SLOFramework /></Suspense>
              </Motion.div>
            } />
            <Route path="/multilingual-systems" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><MultilingualSystems /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/multilingual-systems" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><MultilingualSystems /></Suspense>
              </Motion.div>
            } />
            <Route path="/knowledge-graph-architecture" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><KnowledgeGraphArchitecture /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/knowledge-graph-architecture" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><KnowledgeGraphArchitecture /></Suspense>
              </Motion.div>
            } />
            {/* Topical Authority Routes */}
            <Route path="/enterprise-web-development" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><EnterpriseWebDevelopmentPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/enterprise-web-development" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><EnterpriseWebDevelopmentPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/saas-architecture" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><SaaSArchitecturePage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/saas-architecture" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><SaaSArchitecturePage /></Suspense>
              </Motion.div>
            } />
            <Route path="/marketing-infrastructure" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><MarketingInfrastructurePage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/marketing-infrastructure" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><MarketingInfrastructurePage /></Suspense>
              </Motion.div>
            } />
            <Route path="/seo-revenue-systems" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><SeoRevenueSystemsPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/seo-revenue-systems" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><SeoRevenueSystemsPage /></Suspense>
              </Motion.div>
            } />

            {/* Blog Routes */}
            <Route path="/blog" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><BlogPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/blog" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><BlogPage /></Suspense>
              </Motion.div>
            } />

            {/* Legal Routes */}
            <Route path="/privacy" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><LegalPage type="privacy" /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/privacy" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><LegalPage type="privacy" /></Suspense>
              </Motion.div>
            } />
            <Route path="/terms" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><LegalPage type="terms" /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/terms" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><LegalPage type="terms" /></Suspense>
              </Motion.div>
            } />

            {/* Contact Routes */}
            <Route path="/contact" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><ContactPage /></Suspense>
              </Motion.div>
            } />
            <Route path="/ar/contact" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><ContactPage /></Suspense>
              </Motion.div>
            } />

            {/* 404 Catch-All Route */}
            <Route path="*" element={
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Suspense fallback={<Skeleton />}><NotFound /></Suspense>
              </Motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Floating Button Stack — WhatsApp above Share, safe-area positioned */}
      <div
        style={{
          position: 'fixed',
          bottom: isMobile
            ? 'calc(118px + env(safe-area-inset-bottom))'
            : 'calc(28px + env(safe-area-inset-bottom))',
          ...(isAr
            ? { left: 'calc(20px + env(safe-area-inset-left))' }
            : { right: 'calc(20px + env(safe-area-inset-right))' }),
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 40,
          alignItems: 'center',
        }}
      >
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
          <AnimatePresence>
            {isInitialLoading && (
              <Motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[10000]"
              >
                <LoadingSpinner fullScreen />
              </Motion.div>
            )}
          </AnimatePresence>
          <Router>
            <CustomCursor />
            <ScrollToTop />
            <AppContent />
          </Router>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
