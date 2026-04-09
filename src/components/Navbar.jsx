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
  const joinClasses = (...classes) => classes.filter(Boolean).join(' ');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isAr = i18n.language === 'ar';
  const isHomepage = location.pathname === '/' || location.pathname === '/ar';
  const useHeroNav = isHomepage && !scrolled;
  const closeMenus = () => {
    setShowLangMenu(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = (event) => {
      setIsMobileViewport(event.matches);
      if (!event.matches) {
        setIsOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const navLinks = [
    { name: t('navbar.home'), href: isAr ? '/ar' : '/' },
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
    closeMenus();
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const normalizePath = (path) => {
    if (!path) return '/';
    const trimmed = path.replace(/\/+$/, '');
    return trimmed || '/';
  };

  const isActive = (href) => {
    const currentPath = normalizePath(location.pathname);
    const targetPath = normalizePath(href);

    if (targetPath === '/') {
      return currentPath === '/';
    }

    if (currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)) {
      return true;
    }

    if (href.startsWith('/#') && location.hash === href.substring(1)) return true;
    return false;
  };

  const desktopFrameClass = scrolled
    ? 'border-b border-slate-200/80 bg-white/78 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.22)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/78'
    : 'bg-transparent';

  const getDesktopLinkClass = (link) => {
    const active = isActive(link.href);

    if (link.highlight) {
      return joinClasses(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-all duration-300',
        active
          ? 'border-cyan/40 bg-cyan/14 text-cyan shadow-[0_18px_35px_-28px_rgba(0,229,255,0.6)]'
          : 'border-cyan/18 bg-cyan/8 text-cyan hover:border-cyan/40 hover:bg-cyan/12'
      );
    }

    return joinClasses(
      'inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300',
      active
        ? useHeroNav
          ? 'bg-white/12 text-white shadow-[0_18px_36px_-28px_rgba(2,6,23,0.72)]'
          : 'border border-slate-200/80 bg-slate-900/5 text-slate-950 shadow-[0_18px_34px_-30px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-white/8 dark:text-white'
        : useHeroNav
          ? 'text-slate-300 hover:bg-white/8 hover:text-white'
          : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/6 dark:hover:text-white'
    );
  };

  return (
    <>
      {isMobileViewport ? (
        <NavbarMobile
          isAr={isAr}
          isOpen={isOpen}
          isActive={isActive}
          i18n={i18n}
          languages={languages}
          navLinks={navLinks}
          navigate={navigate}
          changeLanguage={changeLanguage}
          setIsOpen={setIsOpen}
          t={t}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : (
        <header className="fixed inset-x-0 top-0 z-50" dir={isAr ? 'rtl' : 'ltr'}>
          <nav className={`w-full py-4 transition-all duration-500 ${desktopFrameClass}`}>
            <div className="content-shell flex items-center justify-between gap-6">
              <Link to={isAr ? '/ar' : '/'} onClick={closeMenus} className="group flex shrink-0 items-center gap-4">
                <div
                  className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-500 ${
                    useHeroNav
                      ? 'border-white/10 bg-slate-900/50 shadow-lg shadow-cyan/10 group-hover:border-cyan/50'
                      : 'border-slate-200/90 bg-white/88 shadow-sm shadow-slate-900/5 group-hover:border-cyan/40 dark:border-white/10 dark:bg-slate-950/88 dark:shadow-cyan/10'
                  }`}
                >
                  <picture>
                    <source srcSet="/rumuze-symbol-112.avif" type="image/avif" />
                    <source srcSet="/rumuze-symbol-112.webp" type="image/webp" />
                    <img
                      src="/rumuze-symbol-112.webp"
                      width="36"
                      height="36"
                      alt="Rumuze Symbol"
                      fetchpriority="high"
                      decoding="async"
                      className="z-10 h-9 w-9 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.4)] transition-transform group-hover:scale-110"
                    />
                  </picture>

                  <div
                    className="absolute left-0 right-0 z-20 h-[2px] bg-cyan/40 opacity-0 shadow-[0_0_15px_rgba(0,229,255,0.8)] transition-opacity group-hover:opacity-100"
                    style={{ animation: 'scan 2.5s linear infinite' }}
                  />
                  <style>{`@keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }`}</style>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>

                <div className="flex h-6 items-center overflow-hidden">
                  <picture className="flex h-full items-center">
                    <source srcSet="/rumuze-text.avif" type="image/avif" />
                    <img
                      src="/rumuze-text.png"
                      alt="RUMUZE"
                      className={`h-full object-contain opacity-90 transition-opacity group-hover:opacity-100 ${
                        useHeroNav && theme !== 'dark' ? 'invert' : ''
                      }`}
                    />
                  </picture>
                </div>
              </Link>

              <div className="flex min-w-0 flex-1 items-center justify-end gap-4 xl:gap-6">
                <div className="flex min-w-0 items-center gap-2 xl:gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={closeMenus}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      className={getDesktopLinkClass(link)}
                    >
                      {link.icon && <span aria-hidden="true">{link.icon}</span>}
                      <span className="whitespace-nowrap">{link.name}</span>
                    </Link>
                  ))}
                </div>

                <ThemeToggle className="shrink-0 ltr:ml-2 rtl:mr-2" />
                <NotificationBell isRtl={isAr} />

                <div className="relative shrink-0">
                  <button
                    onClick={() => setShowLangMenu((current) => !current)}
                    aria-label="Change language"
                    aria-expanded={showLangMenu}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                      useHeroNav
                        ? 'border-white/14 bg-white/[0.04] text-white shadow-[0_16px_34px_-26px_rgba(2,6,23,0.9)] hover:border-white/25 hover:text-cyan'
                        : 'border-slate-200/90 bg-white/88 text-slate-800 shadow-sm hover:border-cyan/30 hover:text-cyan dark:border-white/10 dark:bg-slate-950/85 dark:text-slate-200'
                    }`}
                  >
                    <Globe size={16} className="text-cyan" aria-hidden="true" />
                    <span>{currentLang.name}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${showLangMenu ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  {showLangMenu && (
                    <div
                      className={`absolute top-full mt-2 min-w-[160px] overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_26px_64px_-36px_rgba(15,23,42,0.34)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 ${isAr ? 'left-0' : 'right-0'}`}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-slate-100/80 dark:hover:bg-white/5 ${
                            i18n.language === lang.code
                              ? 'bg-slate-100 text-cyan dark:bg-white/6'
                              : 'text-slate-800 dark:text-slate-300'
                          } ${isAr ? 'flex-row-reverse text-right' : 'text-left'}`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="font-semibold">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to={isAr ? '/ar/contact?intent=discovery' : '/contact?intent=discovery'}
                  onClick={closeMenus}
                  className="shrink-0"
                >
                  <button className="rounded-full border border-cyan bg-cyan px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_38px_-24px_rgba(0,229,255,0.6)] transition-all hover:-translate-y-0.5 hover:bg-cyan/90 hover:shadow-[0_24px_48px_-24px_rgba(0,229,255,0.66)]">
                    {isAr ? 'احجز Systems Discovery' : 'Book a Systems Discovery'}
                  </button>
                </Link>
              </div>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;
