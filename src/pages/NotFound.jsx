/**
 * The 404 page. It follows the light and dark theme through the site's own colour tokens, moves with
 * CSS only (and stops under reduced motion), reads the language from the address, and suggests the
 * real pages closest to what was typed.
 */

import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Compass, FlaskConical, Home, Layers, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import LostSignal from '../components/LostSignal';
import { localeFromPath } from '../seo/linking';
import { suggestPaths } from '../seo/suggestRoutes';
import { PAGE_ROUTES, localizePath } from '../routes/routeTable';

const CONTENT = {
  en: {
    subtitle: 'Page not found',
    description: "The page you're looking for doesn't exist or has moved. Here is a way back.",
    backHome: 'Back to home',
    goBack: 'Go back',
    didYouMean: 'Did you mean',
    popular: 'Popular pages',
    links: { home: 'Home', services: 'Services', labs: 'Free tools', contact: 'Start a project' },
    sceneLabel: 'A signal that stops at a broken connection and finds another route to the home page',
    seoTitle: 'Page Not Found | Rumuze',
    seoDescription: 'The page you are looking for does not exist.',
  },
  ar: {
    subtitle: 'الصفحة غير موجودة',
    description: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها. هذا طريق العودة.',
    backHome: 'العودة للرئيسية',
    goBack: 'رجوع',
    didYouMean: 'هل تقصد',
    popular: 'صفحات شائعة',
    links: { home: 'الرئيسية', services: 'الخدمات', labs: 'أدوات مجانية', contact: 'ابدأ مشروعك' },
    sceneLabel: 'إشارة تتوقف عند وصلة مقطوعة ثم تجد طريقاً آخر إلى الصفحة الرئيسية',
    seoTitle: 'الصفحة غير موجودة | رموز',
    seoDescription: 'الصفحة التي تبحث عنها غير موجودة.',
  },
};

// The pages a visitor can open without an account and without a parameter in the address.
const PUBLIC_PATHS = ['/', ...PAGE_ROUTES.filter((route) => route.access === 'public' && !route.path.includes(':')).map((route) => route.path)];

const POPULAR = [
  { id: 'home', path: '/', Icon: Home },
  { id: 'services', path: '/services', Icon: Layers },
  { id: 'labs', path: '/labs', Icon: FlaskConical },
  { id: 'contact', path: '/contact', Icon: Mail },
];

const NotFound = () => {
  const location = useLocation();
  const isArabic = useMemo(() => localeFromPath(location.pathname) === 'ar', [location.pathname]);
  const locale = isArabic ? 'ar' : 'en';
  const t = CONTENT[locale];
  const suggestions = useMemo(() => suggestPaths(location.pathname, PUBLIC_PATHS), [location.pathname]);

  return (
    <div
      className="surface-page relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-16 pt-[calc(6.5rem+var(--safe-area-top))]"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <SEO path="/404" title={t.seoTitle} description={t.seoDescription} noindex />

      <div className="nf-glow" aria-hidden="true" />

      <section data-testid="nf-card" className="home-panel relative z-10 w-full max-w-2xl px-6 py-10 text-center sm:px-12">
        <LostSignal label={t.sceneLabel} />

        <h1 className="nf-digits mt-2 text-8xl font-black leading-none text-cyan-700 dark:text-cyan sm:text-9xl" dir="ltr">
          <span className="sr-only">404</span>
          <span aria-hidden="true" className="flex items-center justify-center gap-1">
            <span className="nf-rise" style={{ '--i': 0 }}>
              4
            </span>
            <span className="nf-zero nf-rise" style={{ '--i': 1 }} />
            <span className="nf-rise" style={{ '--i': 2 }}>
              4
            </span>
          </span>
        </h1>

        <h2 className="type-h3 copy-primary mt-5 dark:text-white nf-rise" style={{ '--i': 3 }}>
          {t.subtitle}
        </h2>
        <p className="copy-secondary mx-auto mt-3 max-w-md leading-relaxed nf-rise" style={{ '--i': 4 }}>
          {t.description}
        </p>

        {suggestions.length ? (
          <div className="mt-6 nf-rise" style={{ '--i': 5 }} data-testid="nf-suggestions">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <Compass size={16} aria-hidden="true" />
              {t.didYouMean}
            </p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2">
              {suggestions.map((path) => (
                <li key={path}>
                  <Link
                    to={localizePath(path, locale)}
                    dir="ltr"
                    className="inline-block rounded-full border-2 border-cyan/50 bg-cyan/10 px-4 py-1.5 font-mono text-sm font-semibold text-slate-900 transition-colors hover:border-cyan hover:bg-cyan/20 dark:text-white"
                  >
                    {path}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row nf-rise" style={{ '--i': 6 }}>
          <Link
            to={localizePath('/', locale)}
            className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-full bg-cyan px-6 py-3 font-bold text-slate-950 transition-transform duration-300 hover:scale-105"
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            {t.backHome}
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            <ArrowLeft className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`} aria-hidden="true" />
            {t.goBack}
          </button>
        </div>

        <nav className="mt-8 border-t border-[rgb(var(--border-subtle)/0.7)] pt-6 nf-rise" style={{ '--i': 7 }} aria-label={t.popular}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t.popular}</p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {POPULAR.map(({ id, path, Icon }) => (
              <li key={id}>
                <Link to={localizePath(path, locale)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-800 hover:underline dark:text-cyan">
                  <Icon size={15} aria-hidden="true" />
                  {t.links[id]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default NotFound;
