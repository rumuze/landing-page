import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Menu, X, Globe, ChevronDown, FlaskConical, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/theme-core';
import ThemeToggle from './ThemeToggle';

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
    let newPath = currentPath;
    
    if (lng === 'ar') {
      if (!currentPath.startsWith('/ar')) {
        newPath = '/ar' + (currentPath === '/' ? '' : currentPath);
      }
    } else {
      if (currentPath.startsWith('/ar')) {
        newPath = currentPath.replace('/ar', '') || '/';
      }
    }
    
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
                <img src="/rumuze-symbol.png" alt="Rumuze Symbol" className="w-9 h-9 z-10 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.4)] transition-transform group-hover:scale-110" />
                
                {/* Scanning Line Animation */}
                <Motion.div 
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-cyan/40 shadow-[0_0_15px_rgba(0,229,255,0.8)] z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                
                {/* Circuit Activation Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Text Brand Image */}
              <div className="h-6 flex items-center overflow-hidden">
                <img 
                  src="/rumuze-text.png" 
                  alt="RUMUZE" 
                  className="h-full object-contain filter dark:invert-0 invert opacity-90 group-hover:opacity-100 transition-opacity" 
                />
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
                      <Motion.div 
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle className="ltr:ml-2 rtl:mr-2" />

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
                
                <AnimatePresence>
                  {showLangMenu && (
                    <Motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute top-full mt-2 bg-white/95 dark:bg-background/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[140px] z-[60] ${isAr ? 'left-0' : 'right-0'}`}
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
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button className="btn-primary text-sm px-5 py-2 shadow-lg shadow-cyan/20">
                {t('navbar.startProject')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-6 left-4 right-4 z-50 md:hidden">
        <div className="glass-card !rounded-2xl !p-2 flex justify-around items-center shadow-2xl bg-white/90 dark:bg-background/90 border-slate-200 dark:border-white/10 backdrop-blur-xl">
           <Link to={isAr ? '/ar/' : '/'} className={`p-2 rounded-xl flex flex-col items-center gap-1 ${isActive(isAr ? '/ar/' : '/') ? 'text-cyan' : 'text-slate-700 dark:text-gray-400'}`}>
              <Motion.div whileTap={{ scale: 0.9 }} className={isActive(isAr ? '/ar/' : '/') ? 'bg-cyan/10 p-1.5 rounded-lg' : 'p-1.5'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </Motion.div>
              <span className="text-[10px] font-bold">{t('navbar.home')}</span>
           </Link>

           <Link to={isAr ? '/ar/services' : '/services'} className={`p-2 rounded-xl flex flex-col items-center gap-1 ${isActive(isAr ? '/ar/services' : '/services') ? 'text-cyan' : 'text-slate-700 dark:text-gray-400'}`}>
              <Motion.div whileTap={{ scale: 0.9 }} className={isActive(isAr ? '/ar/services' : '/services') ? 'bg-cyan/10 p-1.5 rounded-lg' : 'p-1.5'}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              </Motion.div>
              <span className="text-[10px] font-bold">{t('navbar.services')}</span>
           </Link>

           <Link to={isAr ? '/ar/labs' : '/labs'} className={`p-2 rounded-xl flex flex-col items-center gap-1 ${isActive(isAr ? '/ar/labs' : '/labs') ? 'text-cyan' : 'text-slate-700 dark:text-gray-400'}`}>
              <Motion.div whileTap={{ scale: 0.9 }} className={isActive(isAr ? '/ar/labs' : '/labs') ? 'bg-cyan/10 p-1.5 rounded-lg' : 'p-1.5'}>
                 <FlaskConical size={20} />
              </Motion.div>
              <span className="text-[10px] font-bold">{t('navbar.labs')}</span>
           </Link>

           <a href={isAr ? '/ar/contact' : '/contact'} onClick={(e) => { e.preventDefault(); navigate(isAr ? '/ar/contact' : '/contact'); }} className={`p-2 rounded-xl flex flex-col items-center gap-1 ${isActive(isAr ? '/ar/contact' : '/contact') ? 'text-cyan' : 'text-slate-700 dark:text-gray-400'}`}>
              <Motion.div whileTap={{ scale: 0.9 }} className={isActive(isAr ? '/ar/contact' : '/contact') ? 'bg-cyan/10 p-1.5 rounded-lg' : 'p-1.5'}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </Motion.div>
              <span className="text-[10px] font-bold">{t('navbar.contact', 'Contact')}</span>
           </a>

           <button 
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-xl flex flex-col items-center gap-1 text-slate-700 dark:text-gray-400"
            >
              <Motion.div whileTap={{ scale: 0.9 }} className="p-1.5">
                 <Menu size={20} />
              </Motion.div>
              <span className="text-[10px] font-bold">{t('navbar.more', 'More')}</span>
           </button>
        </div>
      </nav>

      {/* Mobile Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/98 dark:bg-background/98 backdrop-blur-xl flex flex-col md:hidden"
          >
            {/* Header */}
            <div className={`p-6 flex justify-between items-center ${isAr ? 'flex-row-reverse' : ''}`}>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 border border-white/10">
                    <img src="/rumuze-symbol.png" alt="Logo" className="w-7 h-7" />
                  </div>
                  <img src="/rumuze-text.png" alt="RUMUZE" className="h-5 object-contain dark:invert-0 invert" />
               </div>
               <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white"
                >
                  <X size={24} />
               </button>
            </div>

            {/* Preferences (Language & Theme) */}
            <div className="px-8 pb-4">
              <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-between">
                {/* Language Toggle */}
                <div className="flex-1 flex gap-1 p-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex-1 relative py-2 rounded-xl text-xs font-bold transition-all ${
                         i18n.language === lang.code ? 'text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-gray-400'
                      }`}
                    >
                      {i18n.language === lang.code && (
                        <Motion.div 
                          layoutId="langActive"
                          className="absolute inset-0 bg-white dark:bg-white/10 rounded-xl shadow-sm"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-1">
                         {lang.flag} {lang.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-slate-200 dark:bg-white/10 mx-2"></div>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-xl bg-white dark:bg-white/10 shadow-sm border border-slate-200 dark:border-white/5 text-slate-800 dark:text-yellow-400"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-6">
              {navLinks.map((link, i) => (
                <Motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-4xl font-black ${
                      isActive(link.href) ? 'text-cyan' : 'text-slate-900 dark:text-white'
                    } ${isAr ? 'text-right' : 'text-left'}`}
                  >
                    {link.name}
                  </Link>
                </Motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-8">
              <button 
                onClick={() => { setIsOpen(false); navigate(isAr ? '/ar/contact' : '/contact'); }}
                className="w-full btn-primary py-4 text-lg shadow-xl shadow-cyan/20"
              >
                {t('navbar.startProject')}
              </button>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
