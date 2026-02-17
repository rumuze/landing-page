 
import { useTranslation } from 'react-i18next';
import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
 
import OfflineFallback from './pages/OfflineFallback';
import ErrorBoundary from './components/ErrorBoundary';
 

// Lazy load components
const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const TechStack = lazy(() => import('./components/TechStack'));
const Contact = lazy(() => import('./components/Contact'));
 
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
 
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ManifestoPage = lazy(() => import('./pages/ManifestoPage'));
const LabsPage = lazy(() => import('./pages/LabsPage'));

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
     
      <Navbar />
      
      <main className="pb-24 md:pb-0">
        <Routes location={location} key={location.pathname}>
            {/* Home Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/ar" element={<HomePage isAr={true} />} />

            {/* Portfolio Page Routes */}
            <Route path="/portfolio" element={<Suspense fallback={<Skeleton />}><PortfolioPage /></Suspense>} />
            <Route path="/ar/portfolio" element={<Suspense fallback={<Skeleton />}><PortfolioPage /></Suspense>} />

            {/* Offline Page */}
            <Route path="/offline" element={<OfflineFallback />} />
            <Route path="/ar/offline" element={<OfflineFallback />} />

            {/* Labs Routes */}
            <Route path="/labs" element={<Suspense fallback={<Skeleton />}><LabsPage /></Suspense>} />
            <Route path="/ar/labs" element={<Suspense fallback={<Skeleton />}><LabsPage /></Suspense>} />

            {/* Services Routes */}
            <Route path="/services" element={<Suspense fallback={<Skeleton />}><ServicesPage /></Suspense>} />
            <Route path="/ar/services" element={<Suspense fallback={<Skeleton />}><ServicesPage /></Suspense>} />

            {/* About Routes */}
            <Route path="/about" element={<Suspense fallback={<Skeleton />}><AboutPage /></Suspense>} />
            <Route path="/ar/about" element={<Suspense fallback={<Skeleton />}><AboutPage /></Suspense>} />


            {/* Blog Routes */}
            <Route path="/blog" element={<Suspense fallback={<Skeleton />}><BlogPage /></Suspense>} />
            <Route path="/ar/blog" element={<Suspense fallback={<Skeleton />}><BlogPage /></Suspense>} />

            {/* Legal Routes */}
            <Route path="/privacy" element={<Suspense fallback={<Skeleton />}><LegalPage type="privacy" /></Suspense>} />
            <Route path="/ar/privacy" element={<Suspense fallback={<Skeleton />}><LegalPage type="privacy" /></Suspense>} />
            <Route path="/terms" element={<Suspense fallback={<Skeleton />}><LegalPage type="terms" /></Suspense>} />
            <Route path="/ar/terms" element={<Suspense fallback={<Skeleton />}><LegalPage type="terms" /></Suspense>} />

            {/* Contact Routes */}
            <Route path="/contact" element={<Suspense fallback={<Skeleton />}><ContactPage /></Suspense>} />
            <Route path="/ar/contact" element={<Suspense fallback={<Skeleton />}><ContactPage /></Suspense>} />

            {/* 404 Catch-All Route */}
            <Route path="*" element={<Suspense fallback={<Skeleton />}><NotFound /></Suspense>} />
          </Routes>
      </main>

      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>
          
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
