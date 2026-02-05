import { useScroll, useSpring, AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load components
const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const TechStack = lazy(() => import('./components/TechStack'));
const Contact = lazy(() => import('./components/Contact'));
const Labs = lazy(() => import('./components/Labs'));

// Skeleton Loader
const Skeleton = () => (
  <div className="min-h-screen bg-background p-8 space-y-8 animate-pulse">
    <div className="h-20 bg-white/5 rounded-2xl w-full"></div>
    <div className="h-[500px] bg-white/5 rounded-3xl w-full"></div>
    <div className="grid grid-cols-3 gap-8">
      <div className="h-64 bg-white/5 rounded-2xl"></div>
      <div className="h-64 bg-white/5 rounded-2xl"></div>
      <div className="h-64 bg-white/5 rounded-2xl"></div>
    </div>
  </div>
);

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan to-purple z-[60] origin-left"
        style={{ scaleX }}
      />
      <Hero />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <TechStack />
        <Services />
        <Portfolio />
        <Contact />
      </motion.div>
    </>
  );
};

function AppContent() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isAr = i18n.language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    window.scrollTo(0, 0);
  }, [i18n.language, isAr, location.pathname]);

  const isLabs = location.pathname === '/labs';

  return (
    <div className={`bg-background min-h-screen text-white font-sans transition-all duration-300 ${isAr ? 'text-[1.05rem] leading-relaxed' : 'text-base'}`}>
      <SEO />
      {!isLabs && <Navbar />}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={<Skeleton />}>
                <LandingPage />
              </Suspense>
            </motion.div>
          } />
          <Route path="/labs" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={<Skeleton />}>
                <Labs />
              </Suspense>
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>

      {!isLabs && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <Router>
          <AppContent />
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
