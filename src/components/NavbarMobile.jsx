import React from 'react';
import { FlaskConical, Home, Layers3, Menu, Moon, PhoneCall, Sun, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavbarMobile = ({
  isOpen, setIsOpen, isAr, navLinks, isActive, t,
  languages, i18n, changeLanguage, theme, toggleTheme, navigate
}) => {
  const handleClose = () => setIsOpen(false);
  const handleDiscoveryNavigate = () => {
    setIsOpen(false);
    navigate(isAr ? '/ar/contact?intent=discovery' : '/contact?intent=discovery');
  };

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

  const navItemClass = (active) =>
    `flex h-full min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1.5 text-[10px] font-semibold leading-none transition-all duration-300 ${
      active
        ? 'bg-cyan/12 text-cyan shadow-[0_14px_30px_-24px_rgba(0,229,255,0.75)]'
        : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/6 dark:hover:text-white'
    }`;

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-[70] border-t border-slate-200/80 bg-slate-50/92 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/92 md:hidden"
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
              <button
                key={item.key}
                type="button"
                onClick={item.onClick}
                className={navItemClass(active)}
              >
                <Icon size={20} />
                <span className="max-w-full truncate">{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className={navItemClass(isOpen)}
            type="button"
          >
            <Menu size={20} />
            <span className="max-w-full truncate">{t('navbar.more', 'More')}</span>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 z-[11000] h-[100dvh] overflow-y-auto bg-slate-50/96 backdrop-blur-2xl dark:bg-slate-950/96 md:hidden"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
        >
          <div className="flex min-h-[100dvh] flex-col">
            <div className={`content-shell flex h-20 shrink-0 items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/88">
                  <picture>
                    <source srcSet="/rumuze-symbol-112.avif" type="image/avif" />
                    <source srcSet="/rumuze-symbol-112.webp" type="image/webp" />
                    <img src="/rumuze-symbol-112.webp" width="28" height="28" alt="Logo" className="h-7 w-7" />
                  </picture>
                </div>
                <picture className="h-5 min-w-0">
                  <source srcSet="/rumuze-text.avif" type="image/avif" />
                  <img
                    src="/rumuze-text.png"
                    alt="RUMUZE"
                    className={`h-full object-contain ${theme === 'dark' ? '' : 'invert'}`}
                  />
                </picture>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full border border-slate-200/90 bg-white p-2.5 text-slate-900 shadow-sm dark:border-white/10 dark:bg-slate-900/88 dark:text-white"
                type="button"
              >
                <X size={22} />
              </button>
            </div>

            <div className="content-shell pb-4">
              <div className="surface-card-soft flex items-center gap-3 p-2">
                <div className="grid flex-1 grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`rounded-xl px-3 py-3 text-xs font-semibold transition-all ${
                        i18n.language === lang.code
                          ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-950 dark:text-white'
                          : 'copy-secondary hover:bg-white/70 dark:hover:bg-white/6'
                      }`}
                      type="button"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name.split(' ')[0]}</span>
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={toggleTheme}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200/90 bg-white text-slate-800 shadow-sm dark:border-white/10 dark:bg-slate-950 dark:text-yellow-300"
                  type="button"
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
                  className={`animate-fade-right rounded-[1.5rem] border px-5 py-4 text-xl font-semibold transition-all sm:text-2xl ${
                    isActive(link.href)
                      ? 'border-cyan/30 bg-cyan/10 text-cyan shadow-[0_24px_44px_-34px_rgba(0,229,255,0.75)]'
                      : 'border-slate-200/90 bg-white/82 text-slate-950 hover:border-cyan/20 hover:bg-white dark:border-white/10 dark:bg-slate-900/78 dark:text-white dark:hover:bg-slate-900'
                  } ${isAr ? 'text-right' : 'text-left'}`}
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
                className="w-full rounded-2xl border border-cyan bg-cyan py-4 text-base font-semibold text-slate-950 shadow-[0_20px_42px_-26px_rgba(0,229,255,0.68)] transition-all hover:-translate-y-0.5 hover:bg-cyan/90"
                type="button"
              >
                {isAr ? 'احجز Systems Discovery' : 'Book a Systems Discovery'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarMobile;
