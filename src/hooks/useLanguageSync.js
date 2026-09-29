import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { hasLocalePrefix } from '../seo/linking';
import { useTheme } from '../context/theme-core';

/**
 * Keeps language, text direction and the saved language choice in step with the
 * URL, and sets the mobile status-bar colour for the current theme.
 */
export function useLanguageSync(pathname) {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // The English root stays English for crawlers and English browsers. Send a
  // visitor to /ar only when they chose Arabic before or their browser is Arabic.
  useEffect(() => {
    if (pathname === '/') {
      const preferredLng = localStorage.getItem('i18n_lang_pref');
      const browserIsArabic = (navigator.language ?? '').toLowerCase().startsWith('ar');
      if (preferredLng === 'ar' || (!preferredLng && browserIsArabic)) {
        navigate('/ar', { replace: true });
      }
    }
  }, [pathname, navigate]);

  // Remember the language of the last page the visitor used.
  useEffect(() => {
    if (hasLocalePrefix(pathname, 'ar')) {
      localStorage.setItem('i18n_lang_pref', 'ar');
    } else if (pathname !== '/' && !pathname.startsWith('/admin')) {
      localStorage.setItem('i18n_lang_pref', 'en');
    }
  }, [pathname]);

  // The URL decides the language; mirror it into i18n and the <html> element.
  useEffect(() => {
    const targetLang = hasLocalePrefix(pathname, 'ar') ? 'ar' : 'en';

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
