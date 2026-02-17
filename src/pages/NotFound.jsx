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
import { Home, ArrowLeft, Search } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  const location = useLocation();

  // Detect locale from URL (no effect needed, computed value)
  const isArabic = useMemo(() => location.pathname.startsWith('/ar'), [location.pathname]);

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

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Glassmorphism Card */}
        <div className="glass-card p-10 rounded-3xl">
          {/* 404 Number */}
          <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-cyan via-purple to-cyan bg-clip-text text-transparent mb-4">
            {t.title}
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t.subtitle}
          </h2>

          {/* Description */}
          <p className="text-slate-300 mb-8 leading-relaxed">
            {t.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>

          {/* Search Hint */}
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm">
            <Search className="w-4 h-4" />
            <span>{t.searchHint}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
