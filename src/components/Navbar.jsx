import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, FlaskConical } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/theme-core';
import { hasLocalePrefix, localizePath } from '../seo/linking';
import ThemeToggle from './ThemeToggle';
import NavbarMobile from './NavbarMobile';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isAr = i18n.language === 'ar';



  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('navbar.home'), href: isAr ? '/ar/' : '/' },
    { name: t('navbar.services'), href: isAr ? '/ar/services' : '/services' },
    { name: t('navbar.portfolio'), href: isAr ? '/ar/portfolio' : '/portfolio' },
    { name: t('navbar.blog'), href: isAr ? '/ar/blog' : '/blog' },
    { name: t('navbar.about'), href: isAr ? '/ar/about' : '/about' },
    { name: t('navbar.labs'), href: isAr ? '/ar/labs' : '/labs', highlight: true, icon: <FlaskConical size={14} /> },
  ];

  const changeLanguage = (lng) => {
    const currentPath = location.pathname;
    const targetLocale = lng === 'ar' ? 'ar' : 'en';
    const currentLocale = hasLocalePrefix(currentPath, 'ar') ? 'ar' : 'en';
    const newPath = currentLocale === targetLocale ? currentPath : localizePath(currentPath, targetLocale);
    
    // Just navigate. App.jsx will handle the i18n switch.
    navigate(newPath);
    setShowLangMenu(false);
    setIsOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const isActive = (href) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    if (href.startsWith('/#') && location.hash === href.substring(1)) return true;
    return false;
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 hidden md:block ${
          scrolled 
          ? 'py-4 bg-white/70 dark:bg-background/80 backdrop-blur-2xl border-b border-white/40 dark:border-white/5 shadow-sm shadow-purple-500/5' 
          : 'py-6 bg-transparent'
        }`}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center w-full">
            {/* Logo */}
            <Link to={isAr ? '/ar/' : '/'} className="flex items-center gap-4 group shrink-0">
              {/* Symbol Container with Scanning Effect */}
              <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900/50 dark:bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-cyan/10 group-hover:border-cyan/50 transition-all duration-500 overflow-hidden">
                <picture>
                  <source srcSet="/rumuze-symbol-112.avif" type="image/avif" />
                  <source srcSet="/rumuze-symbol-112.webp" type="image/webp" />
                  <img src="/rumuze-symbol-112.webp" width="36" height="36" alt="Rumuze Symbol" fetchpriority="high" decoding="async" className="w-9 h-9 z-10 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.4)] transition-transform group-hover:scale-110" />
                </picture>
                
                {/* Scanning Line Animation */}
                <div 
                  className="absolute left-0 right-0 h-[2px] bg-cyan/40 shadow-[0_0_15px_rgba(0,229,255,0.8)] z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ animation: 'scan 2.5s linear infinite' }}
                />
                <style>{`@keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }`}</style>
                
                {/* Circuit Activation Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Text Brand Image */}
              <div className="h-6 flex items-center overflow-hidden">
                <picture className="h-full flex items-center">
                  <source srcSet="/rumuze-text.avif" type="image/avif" />
                  <img 
                    src="/rumuze-text.png" 
                    alt="RUMUZE" 
                    className="h-full object-contain filter dark:invert-0 invert opacity-90 group-hover:opacity-100 transition-opacity" 
                  />
                </picture>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`text-sm font-semibold transition-all flex items-center gap-2 relative py-1 ${
                      link.highlight 
                      ? 'text-cyan px-3 bg-cyan/10 border border-cyan/20 rounded-lg hover:bg-cyan/20' 
                      : 'text-slate-700 dark:text-gray-300 hover:text-cyan dark:hover:text-cyan'
                    }`}
                  >
                    {link.icon && <span aria-hidden="true">{link.icon}</span>}
                    {link.name}
                    {isActive(link.href) && !link.highlight && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan rounded-full animate-fade-in" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle className="ltr:ml-2 rtl:mr-2" />

              {/* Notification Bell — visible only when signed in */}
              <NotificationBell isRtl={isAr} />

              {/* Language Switcher */}
              <div className="relative">
                <button 
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  aria-label="Change language"
                  aria-expanded={showLangMenu}
                  className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-gray-300 hover:text-cyan border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg transition-all bg-slate-50 dark:bg-transparent shadow-sm"
                >
                  <Globe size={16} className="text-cyan" aria-hidden="true" />
                  <span>{currentLang.name}</span>
                  <ChevronDown size={14} className={`transition-transform ${showLangMenu ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                
                  {showLangMenu && (
                    <div 
                      className={`absolute top-full mt-2 bg-white/95 dark:bg-background/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[140px] z-[60] animate-fade-in ${isAr ? 'left-0' : 'right-0'}`}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${
                            i18n.language === lang.code ? 'text-cyan bg-slate-50 dark:bg-white/5' : 'text-slate-800 dark:text-gray-300'
                          } ${isAr ? 'text-right flex-row-reverse' : 'text-left'}`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="font-bold">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
              </div>

              <Link to={isAr ? '/ar/contact?intent=discovery' : '/contact?intent=discovery'}>
                <button className="rounded-lg border border-cyan bg-cyan px-5 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan/90">
                  {isAr ? 'احجز Systems Discovery' : 'Book a Systems Discovery'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

         <NavbarMobile 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            isAr={isAr} 
            navLinks={navLinks} 
            isActive={isActive} 
            t={t} 
            languages={languages} 
            i18n={i18n} 
            changeLanguage={changeLanguage}
            theme={theme}
            toggleTheme={toggleTheme}
            navigate={navigate}
         />
    </>
  );
};

export default Navbar;
