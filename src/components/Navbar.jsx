import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Cpu, Globe, ChevronDown, FlaskConical, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const isAr = i18n.language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('navbar.home'), href: '/' },
    { name: t('navbar.services'), href: '/#services' },
    { name: t('navbar.portfolio'), href: '/#portfolio' },
    { name: t('navbar.techStack'), href: '/#tech-stack' },
    { name: t('navbar.labs') || 'Labs', href: '/labs', highlight: true, icon: <FlaskConical size={14} /> },
    { name: t('navbar.contact'), href: '/#contact' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇦🇪' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-4 glass border-b' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center ${isAr ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link to="/" className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-purple text-background">
              <Cpu size={24} />
              <div className="absolute inset-0 bg-cyan blur-md opacity-20 animate-pulse"></div>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">RUMUZE</span>
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-8 ${isAr ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-6 ${isAr ? 'flex-row-reverse' : ''}`}>
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className={`text-sm font-medium transition-all flex items-center gap-2 ${
                    link.highlight 
                    ? 'text-cyan px-3 py-1 bg-cyan/10 border border-cyan/20 rounded-lg hover:bg-cyan/20' 
                    : 'text-gray-300 hover:text-cyan'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-yellow-400 hover:scale-110 transition-all duration-300 border border-slate-200 dark:border-white/10"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-cyan border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg transition-all"
              >
                <Globe size={16} className="text-cyan" />
                <span>{currentLang.name}</span>
                <ChevronDown size={14} className={`transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-full mt-2 bg-white dark:bg-background/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[140px] ${isAr ? 'left-0' : 'right-0'}`}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${
                          i18n.language === lang.code ? 'text-cyan bg-slate-50 dark:bg-white/5' : 'text-slate-700 dark:text-gray-300'
                        } ${isAr ? 'flex-row-reverse text-right' : 'text-left'}`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="btn-primary text-sm px-5 py-2">
              {t('navbar.startProject')}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className={`md:hidden flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
                </motion.div>
              </AnimatePresence>
            </button>
            <button 
               onClick={() => changeLanguage(isAr ? 'en' : 'ar')}
               className="p-2 text-slate-700 dark:text-gray-300 glass rounded-lg flex items-center gap-2 border border-slate-200 dark:border-white/10"
            >
              <Globe size={20} className="text-cyan" />
              <span className="text-xs font-bold">{isAr ? 'EN' : 'AR'}</span>
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-900 dark:text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass border-b md:hidden"
          >
            <div className="px-4 py-8 flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-semibold transition-colors flex items-center gap-2 ${
                    link.highlight ? 'text-cyan' : 'text-white hover:text-cyan'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <button className="btn-primary w-full max-w-xs">
                {t('navbar.startProject')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
