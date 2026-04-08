/**
 * NotFound (404) Page Component
 * 
 * High-end bilingual 404 experience with:
 * - Glassmorphism design matching site aesthetic
 * - Framer Motion animations
 * - Auto-detects locale from URL
 * - Language-aware navigation
 * - Centralized SEO metadata
 */

import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import SEO from '../components/SEO';
import { hasLocalePrefix } from '../seo/linking';

const NotFound = () => {
  const location = useLocation();

  // Detect locale from URL (no effect needed, computed value)
  const isArabic = useMemo(() => hasLocalePrefix(location.pathname, 'ar'), [location.pathname]);

  // Bilingual content
  const content = {
    en: {
      title: '404',
      subtitle: 'Page Not Found',
      description: "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
      backHome: 'Back to Home',
      goBack: 'Go Back',
      searchHint: 'Or try searching for what you need',
    },
    ar: {
      title: '404',
      subtitle: 'الصفحة غير موجودة',
      description: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نساعدك للعودة.',
      backHome: 'العودة للرئيسية',
      goBack: 'رجوع',
      searchHint: 'أو جرب البحث عما تحتاجه',
    },
  };

  const t = isArabic ? content.ar : content.en;
  const homePath = isArabic ? '/ar' : '/';

  return (
    <div 
      className={`min-h-screen bg-background flex items-center justify-center p-6 ${isArabic ? 'rtl' : 'ltr'}`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <SEO path="/404" />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
      </div>

      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* Glassmorphism Card */}
        <div className="glass-card p-10 rounded-3xl">
          {/* 404 Number */}
          <Motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-8xl md:text-9xl font-black bg-gradient-to-r from-cyan via-purple to-cyan bg-clip-text text-transparent mb-4"
          >
            {t.title}
          </Motion.h1>

          {/* Subtitle */}
          <Motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-white mb-4"
          >
            {t.subtitle}
          </Motion.h2>

          {/* Description */}
          <Motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-300 mb-8 leading-relaxed"
          >
            {t.description}
          </Motion.p>

          {/* Action Buttons */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to={homePath}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan to-cyan/80 text-background font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            >
              <Home className="w-5 h-5" />
              {t.backHome}
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors duration-300"
            >
              <ArrowLeft className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
              {t.goBack}
            </button>
          </Motion.div>

          {/* Search Hint */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm"
          >
            <Search className="w-4 h-4" />
            <span>{t.searchHint}</span>
          </Motion.div>
        </div>

        {/* Decorative Element */}
        <Motion.div
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full"
        />
      </Motion.div>
    </div>
  );
};

export default NotFound;
