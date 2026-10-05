import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { localeFromPath } from '../seo/linking';
import { useTheme } from '../context/theme-core';

/**
 * Keeps language, text direction and the saved language choice in step with the
 * URL, and sets the mobile status-bar colour for the current theme.
 */
export function useLanguageSync(pathname) {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // The root is Arabic, the primary language. A visitor who explicitly chose
  // English before goes to /en; everyone else, crawlers included, stays on the
  // Arabic page, so the language of a URL never depends on the browser.
  useEffect(() => {
    if (pathname === '/' && localStorage.getItem('i18n_lang_pref') === 'en') {
      navigate('/en', { replace: true });
    }
  }, [pathname, navigate]);

  // Remember the language of the last page the visitor used.
  useEffect(() => {
    if (pathname.startsWith('/admin')) return;
    localStorage.setItem('i18n_lang_pref', localeFromPath(pathname));
  }, [pathname]);

  // The URL decides the language; mirror it into i18n and the <html> element.
  useEffect(() => {
    const targetLang = localeFromPath(pathname);

    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }

    const dir = targetLang === 'ar' ? 'rtl' : 'ltr';
    if (document.documentElement.dir !== dir) {
      document.documentElement.dir = dir;
    }
    if (document.documentElement.lang !== targetLang) {
      document.documentElement.lang = targetLang;
    }

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', theme === 'dark' ? '#020617' : '#f8fafc');
    }
  }, [i18n, pathname, theme]);
}
