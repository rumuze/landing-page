import React, { useEffect, useRef, useState } from 'react';
import { Globe, ChevronDown, FlaskConical } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/theme-core';
import { hasLocalePrefix, localizePath } from '../seo/linking';
import BrandWordmark from './BrandWordmark';
import ThemeToggle from './ThemeToggle';
import NavbarMobile from './NavbarMobile';
import NotificationBell from './NotificationBell';

const MOBILE_MEDIA_QUERY = '(max-width: 1023px)';
const SCROLL_THRESHOLD = 18;

const joinClasses = (...classes) => classes.filter(Boolean).join(' ');

const normalizePath = (path) => {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed || '/';
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > SCROLL_THRESHOLD : false
  );
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_MEDIA_QUERY).matches : false
  );
  const langMenuRef = useRef(null);
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isAr = i18n.language === 'ar';
  const isHomepage = ['/', '/ar'].includes(normalizePath(location.pathname));
  const useHeroNav = isHomepage && !scrolled;

  const closeMenus = () => {
    setShowLangMenu(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > SCROLL_THRESHOLD;
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handleChange = (event) => {
      setIsMobileViewport(event.matches);
      if (!event.matches) {
        setIsOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!showLangMenu) return undefined;

    const handlePointerDown = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowLangMenu(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showLangMenu]);

  const navLinks = [
    { name: t('navbar.home'), href: isAr ? '/ar' : '/' },
    { name: t('navbar.services'), href: isAr ? '/ar/services' : '/services' },
    { name: t('navbar.portfolio'), href: isAr ? '/ar/portfolio' : '/portfolio' },
    { name: t('navbar.blog'), href: isAr ? '/ar/blog' : '/blog' },
    { name: t('navbar.about'), href: isAr ? '/ar/about' : '/about' },
    {
      name: t('navbar.labs'),
      href: isAr ? '/ar/labs' : '/labs',
      highlight: true,
      icon: <FlaskConical size={14} />,
    },
  ];

  const changeLanguage = (lng) => {
    const currentPath = location.pathname;
    const targetLocale = lng === 'ar' ? 'ar' : 'en';
    const currentLocale = hasLocalePrefix(currentPath, 'ar') ? 'ar' : 'en';
    const newPath = currentLocale === targetLocale ? currentPath : localizePath(currentPath, targetLocale);

    // Save language preference in our independent redirection key to prevent race conditions
    localStorage.setItem('i18n_lang_pref', lng);
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);

    navigate(newPath);
    closeMenus();
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const currentLang = languages.find((language) => language.code === i18n.language) || languages[0];

  const isActive = (href) => {
    const currentPath = normalizePath(location.pathname);
    const targetPath = normalizePath(href);

    if (targetPath === '/') {
      return currentPath === '/';
    }

    if (currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)) {
      return true;
    }

    return href.startsWith('/#') && location.hash === href.substring(1);
  };

  const navSurfaceClass = useHeroNav
    ? 'border-b border-[rgb(var(--border-subtle)/0.68)] bg-[rgb(var(--surface-page)/0.76)] shadow-[0_18px_42px_-38px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-[rgb(var(--border-subtle)/0.66)] dark:bg-[rgb(var(--surface-page)/0.74)]'
    : 'border-b border-[rgb(var(--border-subtle)/0.82)] bg-[rgb(var(--surface-section)/0.88)] shadow-[0_18px_42px_-36px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-[rgb(var(--border-subtle)/0.78)] dark:bg-[rgb(var(--surface-section)/0.86)]';

  const topSurfaceClass =
    'border border-[rgb(var(--border-subtle)/0.8)] bg-[rgb(var(--surface-card)/0.88)] shadow-[0_16px_32px_-28px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-[rgb(var(--border-subtle)/0.74)] dark:bg-[rgb(var(--surface-card)/0.78)] dark:shadow-[0_18px_40px_-30px_rgba(2,6,23,0.68)]';

  const solidSurfaceClass =
    'border border-[rgb(var(--border-subtle)/0.84)] bg-[rgb(var(--surface-card)/0.94)] shadow-[0_16px_34px_-30px_rgba(15,23,42,0.16)] dark:border-[rgb(var(--border-subtle)/0.78)] dark:bg-[rgb(var(--surface-card)/0.82)] dark:shadow-[0_20px_42px_-32px_rgba(2,6,23,0.76)]';

  const controlClass = joinClasses(
    'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-300',
    useHeroNav ? topSurfaceClass : solidSurfaceClass,
    'text-slate-900 hover:border-slate-300/80 hover:text-slate-950 dark:text-white dark:hover:border-white/20'
  );

  const langMenuPanelClass =
    'absolute top-full mt-2 min-w-[180px] overflow-hidden rounded-2xl border border-slate-200/80 bg-white/96 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.34)] backdrop-blur-xl dark:border-[rgb(var(--border-subtle)/0.82)] dark:bg-[rgb(var(--surface-card-strong)/0.98)] dark:shadow-[0_28px_70px_-38px_rgba(2,6,23,0.92)]';

  const getLangOptionClass = (isActiveLanguage) =>
    joinClasses(
      'flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-300',
      isActiveLanguage
        ? 'bg-slate-100 text-slate-950 dark:bg-[rgb(var(--surface-card-soft)/0.92)] dark:text-white'
        : 'text-slate-700 hover:bg-slate-100/90 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-[rgb(var(--surface-card-soft)/0.78)] dark:hover:text-white'
    );

  const getDesktopLinkClass = (link) => {
    const active = isActive(link.href);

    if (link.highlight) {
      return joinClasses(
        'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all duration-300',
        active
          ? 'border-cyan/26 bg-cyan/[0.08] text-slate-950 shadow-[0_16px_30px_-26px_rgba(0,229,255,0.28)] dark:text-white'
          : 'border-cyan/18 text-slate-700 hover:border-cyan/28 hover:bg-cyan/[0.06] hover:text-slate-950 dark:text-slate-100 dark:hover:bg-cyan/[0.08] dark:hover:text-white'
      );
    }

    return joinClasses(
      'inline-flex h-10 items-center rounded-full border border-transparent px-4 text-sm font-medium transition-all duration-300',
      active
        ? 'border-[rgb(var(--border-subtle)/0.82)] bg-[rgb(var(--surface-card-soft)/0.8)] text-slate-950 shadow-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-white'
        : 'text-slate-600 hover:border-[rgb(var(--border-subtle)/0.86)] hover:bg-[rgb(var(--surface-card-soft)/0.72)] hover:text-slate-950 dark:text-slate-300 dark:hover:border-white/10 dark:hover:bg-white/[0.05] dark:hover:text-white'
    );
  };

  return (
    <>
      {isMobileViewport ? (
        <NavbarMobile
          currentLang={currentLang}
          changeLanguage={changeLanguage}
          i18n={i18n}
          isActive={isActive}
          isAr={isAr}
          isOpen={isOpen}
          languages={languages}
          navLinks={navLinks}
          navigate={navigate}
          setIsOpen={setIsOpen}
          t={t}
          theme={theme}
          toggleTheme={toggleTheme}
          useHeroNav={useHeroNav}
        />
      ) : (
        <header className="fixed inset-x-0 top-0 z-50" dir={isAr ? 'rtl' : 'ltr'}>
          <nav className={joinClasses('w-full transition-all duration-300', navSurfaceClass)}>
            <div className="content-shell">
              <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-6 lg:h-20 lg:gap-8">
                <Link to={isAr ? '/ar' : '/'} onClick={closeMenus} className="group flex shrink-0 items-center gap-3">
                  <div
                    className={joinClasses(
                      'flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl transition-all duration-300',
                      useHeroNav ? topSurfaceClass : solidSurfaceClass
                    )}
                  >
                    <picture>
                      <source srcSet="/rumuze-symbol-112.avif" type="image/avif" />
                      <source srcSet="/rumuze-symbol-112.webp" type="image/webp" />
                      <img
                        src="/rumuze-symbol-112.webp"
                        width="32"
                        height="32"
                        alt="Rumuze Symbol"
                        fetchPriority="high"
                        decoding="async"
                        className="h-8 w-8 drop-shadow-[0_0_12px_rgba(0,229,255,0.28)] transition-transform duration-300 group-hover:scale-105"
                      />
                    </picture>
                  </div>

                  <BrandWordmark className="opacity-95 group-hover:opacity-100" />
                </Link>

                <div className="flex min-w-0 items-center justify-center gap-1.5 justify-self-center xl:gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={closeMenus}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      className={getDesktopLinkClass(link)}
                    >
                      {link.icon ? <span aria-hidden="true">{link.icon}</span> : null}
                      <span className="whitespace-nowrap">{link.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-2.5 justify-self-end">
                  <ThemeToggle className="shrink-0" />
                  <NotificationBell isRtl={isAr} />

                  <div ref={langMenuRef} className="relative shrink-0">
                    <button
                      onClick={() => setShowLangMenu((current) => !current)}
                      aria-label="Change language"
                      aria-expanded={showLangMenu}
                      className={controlClass}
                      type="button"
                    >
                      <Globe size={16} className="text-cyan" aria-hidden="true" />
                      <span>{currentLang.name}</span>
                      <ChevronDown
                        size={14}
                        className={joinClasses('transition-transform duration-300', showLangMenu ? 'rotate-180' : '')}
                        aria-hidden="true"
                      />
                    </button>

                    {showLangMenu ? (
                      <div
                        className={joinClasses(
                          langMenuPanelClass,
                          isAr ? 'left-0' : 'right-0'
                        )}
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={joinClasses(
                              getLangOptionClass(i18n.language === lang.code),
                              isAr ? 'flex-row-reverse text-right' : 'text-left'
                            )}
                            type="button"
                          >
                            <span className="text-lg">{lang.flag}</span>
                            <span>{lang.name}</span>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <Link
                    to={isAr ? '/ar/contact?intent=discovery' : '/contact?intent=discovery'}
                    onClick={closeMenus}
                    className="shrink-0"
                  >
                    <span className="inline-flex h-10 items-center rounded-full border border-cyan bg-cyan px-5 text-sm font-semibold text-slate-950 shadow-[0_18px_36px_-24px_rgba(0,229,255,0.52)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan/90 hover:shadow-[0_20px_40px_-24px_rgba(0,229,255,0.56)]">
                      {isAr ? 'احجز جلسة تشخيص مجانية' : 'Book a Systems Discovery'}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;
