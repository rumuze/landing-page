import React, { useEffect } from 'react';
import { FlaskConical, Home, Layers3, Menu, Moon, PhoneCall, Sun, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandWordmark from './BrandWordmark';

const joinClasses = (...classes) => classes.filter(Boolean).join(' ');

const NavbarMobile = ({
  currentLang,
  isOpen,
  setIsOpen,
  isAr,
  navLinks,
  isActive,
  t,
  languages,
  i18n,
  changeLanguage,
  theme,
  toggleTheme,
  navigate,
  useHeroNav,
}) => {
  const handleClose = () => setIsOpen(false);
  const handleDiscoveryNavigate = () => {
    setIsOpen(false);
    navigate(isAr ? '/ar/contact?intent=discovery' : '/contact?intent=discovery');
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const primaryItems = [
    {
      key: 'home',
      href: isAr ? '/ar' : '/',
      icon: Home,
      label: t('navbar.home'),
    },
    {
      key: 'services',
      href: isAr ? '/ar/services' : '/services',
      icon: Layers3,
      label: t('navbar.services'),
    },
    {
      key: 'labs',
      href: isAr ? '/ar/labs' : '/labs',
      icon: FlaskConical,
      label: t('navbar.labs'),
    },
    {
      key: 'discovery',
      icon: PhoneCall,
      label: 'Discovery',
      onClick: handleDiscoveryNavigate,
      isCurrent: isActive(isAr ? '/ar/contact' : '/contact'),
    },
  ];

  const topBarSurfaceClass = useHeroNav
    ? 'border-b border-[rgb(var(--border-subtle)/0.68)] bg-[rgb(var(--surface-page)/0.78)] shadow-[0_14px_32px_-28px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-[rgb(var(--border-subtle)/0.66)] dark:bg-[rgb(var(--surface-page)/0.76)]'
    : 'border-b border-[rgb(var(--border-subtle)/0.82)] bg-[rgb(var(--surface-section)/0.88)] shadow-[0_14px_32px_-26px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-[rgb(var(--border-subtle)/0.78)] dark:bg-[rgb(var(--surface-section)/0.86)]';

  const chipSurfaceClass = useHeroNav
    ? 'border border-[rgb(var(--border-subtle)/0.8)] bg-[rgb(var(--surface-card)/0.88)] text-slate-900 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.16)] dark:border-[rgb(var(--border-subtle)/0.74)] dark:bg-[rgb(var(--surface-card)/0.78)] dark:text-white'
    : 'border border-[rgb(var(--border-subtle)/0.84)] bg-[rgb(var(--surface-card)/0.94)] text-slate-900 shadow-sm dark:border-[rgb(var(--border-subtle)/0.78)] dark:bg-[rgb(var(--surface-card)/0.82)] dark:text-white';

  const navItemClass = (active) =>
    joinClasses(
      'flex h-full min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1.5 text-[10px] font-semibold leading-none transition-all duration-300',
      active
        ? 'border border-cyan/22 bg-cyan/[0.08] text-slate-950 shadow-[0_14px_28px_-24px_rgba(0,229,255,0.34)] dark:border-cyan/26 dark:text-white'
        : 'border border-transparent text-slate-600 hover:border-slate-200/75 hover:bg-slate-900/[0.045] hover:text-slate-950 dark:text-slate-300 dark:hover:border-white/10 dark:hover:bg-white/8 dark:hover:text-white'
    );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 lg:hidden" dir={isAr ? 'rtl' : 'ltr'}>
        <div className={joinClasses('transition-all duration-300', topBarSurfaceClass)}>
          <div className="content-shell">
            <div className="flex h-16 items-center justify-between gap-3">
              <Link to={isAr ? '/ar' : '/'} onClick={handleClose} className="flex min-w-0 items-center gap-3">
                <div className={joinClasses('flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl', chipSurfaceClass)}>
                  <picture>
                    <source srcSet="/rumuze-symbol-112.avif" type="image/avif" />
                    <source srcSet="/rumuze-symbol-112.webp" type="image/webp" />
                    <img src="/rumuze-symbol-112.webp" width="28" height="28" alt="Rumuze Symbol" className="h-7 w-7" />
                  </picture>
                </div>
                <BrandWordmark />
              </Link>

              <button
                onClick={() => setIsOpen(true)}
                className={joinClasses('inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-all duration-300', chipSurfaceClass)}
                type="button"
                aria-label="Open menu"
              >
                <span>{t('navbar.more', 'Menu')}</span>
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-[70] border-t border-slate-200/70 bg-[rgb(var(--surface-section)/0.88)] backdrop-blur-xl dark:border-white/10 dark:bg-[rgb(var(--surface-section)/0.84)] lg:hidden"
        style={{
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)',
        }}
      >
        <div className="mx-auto grid h-16 max-w-lg grid-cols-5 gap-1 px-3">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const active = item.isCurrent ?? isActive(item.href);

            if (item.href) {
              return (
                <Link key={item.key} to={item.href} className={navItemClass(active)}>
                  <Icon size={20} />
                  <span className="max-w-full truncate">{item.label}</span>
                </Link>
              );
            }

            return (
              <button key={item.key} type="button" onClick={item.onClick} className={navItemClass(active)}>
                <Icon size={20} />
                <span className="max-w-full truncate">{item.label}</span>
              </button>
            );
          })}

          <button onClick={() => setIsOpen(true)} aria-label="Open menu" className={navItemClass(isOpen)} type="button">
            <Menu size={20} />
            <span className="max-w-full truncate">{t('navbar.more', 'More')}</span>
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[11000] h-[100dvh] overflow-y-auto bg-white/88 backdrop-blur-2xl dark:bg-slate-950/88 lg:hidden"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
        >
          <div className="flex min-h-[100dvh] flex-col">
            <div className="content-shell flex h-16 shrink-0 items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/92 shadow-sm dark:border-white/10 dark:bg-slate-900/90">
                  <picture>
                    <source srcSet="/rumuze-symbol-112.avif" type="image/avif" />
                    <source srcSet="/rumuze-symbol-112.webp" type="image/webp" />
                    <img src="/rumuze-symbol-112.webp" width="28" height="28" alt="Rumuze Symbol" className="h-7 w-7" />
                  </picture>
                </div>
                <BrandWordmark />
              </div>

              <button
                onClick={handleClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/92 text-slate-900 shadow-sm transition-all duration-300 dark:border-white/10 dark:bg-slate-900/90 dark:text-white"
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            <div className="content-shell pb-4 pt-2">
              <div className="surface-card-soft flex items-center gap-3 p-2.5">
                <div className="grid flex-1 grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={joinClasses(
                        'rounded-2xl px-3 py-3 text-xs font-semibold transition-all duration-300',
                        i18n.language === lang.code
                          ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-950 dark:text-white'
                          : 'copy-secondary hover:bg-white/70 dark:hover:bg-white/6'
                      )}
                      type="button"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.code === currentLang.code ? currentLang.name.split(' ')[0] : lang.name.split(' ')[0]}</span>
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={toggleTheme}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/92 text-slate-800 shadow-sm transition-all duration-300 dark:border-white/10 dark:bg-slate-950 dark:text-yellow-300"
                  type="button"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>

            <div className="content-shell flex-1 py-2">
              <div className="flex flex-col gap-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={handleClose}
                    className={joinClasses(
                      'animate-fade-right rounded-[1.5rem] border px-5 py-4 text-xl font-semibold transition-all duration-300 sm:text-2xl',
                      isActive(link.href)
                        ? 'border-cyan/24 bg-cyan/[0.08] text-slate-950 shadow-[0_18px_34px_-28px_rgba(0,229,255,0.32)] dark:text-white'
                        : 'border-slate-200/80 bg-white/88 text-slate-950 hover:border-slate-300/80 hover:bg-white dark:border-white/10 dark:bg-slate-900/82 dark:text-white dark:hover:bg-slate-900',
                      isAr ? 'text-right' : 'text-left'
                    )}
                    style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'both' }}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span>{link.name}</span>
                      {link.icon ? <span className="text-cyan">{link.icon}</span> : null}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="content-shell shrink-0 pt-6">
              <button
                onClick={handleDiscoveryNavigate}
                className="w-full rounded-2xl border border-cyan bg-cyan py-4 text-base font-semibold text-slate-950 shadow-[0_18px_40px_-26px_rgba(0,229,255,0.54)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan/90"
                type="button"
              >
                {isAr ? 'احجز جلسة تشخيص مجانية' : 'Book a Systems Discovery'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NavbarMobile;
