import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { i18n } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const isAr = i18n.language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isAr]);

  return (
    <HelmetProvider>
      <div className={`bg-background min-h-screen text-white font-sans transition-all duration-300 ${isAr ? 'text-[1.05rem] leading-relaxed' : 'text-base'}`}>
        <SEO />
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan to-purple z-[60] origin-left"
          style={{ scaleX }}
        />

        <Navbar />
        
        {/* Smooth transition between LTR/RTL */}
        <AnimatePresence mode="wait">
          <motion.main
            key={i18n.language}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
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
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
