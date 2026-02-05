import { useScroll, useSpring, AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

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
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global Loading Provider
const LoadingProvider = ({ children }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Initial load simulation
    const timer = setTimeout(() => setIsInitialLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999]"
          >
            <LoadingSpinner fullScreen />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
};

function AppContent() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isAr = i18n.language === 'ar';

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Language Synchronizer with Path
  useEffect(() => {
    const isPathAr = location.pathname.startsWith('/ar');
    if (isPathAr && i18n.language !== 'ar') {
      i18n.changeLanguage('ar');
    } else if (!isPathAr && i18n.language !== 'en' && !location.pathname.includes('/labs')) {
      i18n.changeLanguage('en');
    }

    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n, location.pathname, isAr]);

  return (
    <div className={`min-h-screen bg-white dark:bg-background transition-colors duration-300 ${isAr ? 'rtl' : 'ltr'}`}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan to-purple origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Home Routes */}
          <Route path="/" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}>
                <Hero />
                <Services />
                <Portfolio />
                <TechStack />
                <Contact />
              </Suspense>
            </motion.div>
          } />
          <Route path="/ar" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}>
                <Hero />
                <Services />
                <Portfolio />
                <TechStack />
                <Contact />
              </Suspense>
            </motion.div>
          } />

          {/* Labs Routes */}
          <Route path="/labs" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}><Labs /></Suspense>
            </motion.div>
          } />
          <Route path="/ar/labs" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}><Labs /></Suspense>
            </motion.div>
          } />

          {/* Services Routes */}
          <Route path="/services" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}><ServicesPage /></Suspense>
            </motion.div>
          } />
          <Route path="/ar/services" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}><ServicesPage /></Suspense>
            </motion.div>
          } />

          {/* About Routes */}
          <Route path="/about" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}><AboutPage /></Suspense>
            </motion.div>
          } />
          <Route path="/ar/about" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}><AboutPage /></Suspense>
            </motion.div>
          } />

          {/* Blog Routes */}
          <Route path="/blog" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}><BlogPage /></Suspense>
            </motion.div>
          } />
          <Route path="/ar/blog" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}><BlogPage /></Suspense>
            </motion.div>
          } />

          {/* Legal Routes */}
          <Route path="/privacy" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}><LegalPage type="privacy" /></Suspense>
            </motion.div>
          } />
          <Route path="/ar/privacy" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}><LegalPage type="privacy" /></Suspense>
            </motion.div>
          } />
          <Route path="/terms" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}><LegalPage type="terms" /></Suspense>
            </motion.div>
          } />
          <Route path="/ar/terms" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Suspense fallback={<Skeleton />}><LegalPage type="terms" /></Suspense>
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Initial load simulation or actual asset checking
    const timer = setTimeout(() => setIsInitialLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <AnimatePresence>
          {isInitialLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-[10000]"
            >
              <LoadingSpinner fullScreen />
            </motion.div>
          )}
        </AnimatePresence>
        <Router>
          <SEO />
          <ScrollToTop />
          <AppContent />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
