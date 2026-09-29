import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

const isBrowser = typeof window !== 'undefined';

// The language detector needs the browser; during prerendering the language is
// set explicitly per route (see entry-server.jsx).
if (isBrowser) {
    i18n.use(LanguageDetector);
}

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslations },
            ar: { translation: arTranslations },
        },
        fallbackLng: 'ar',
        supportedLngs: ['en', 'ar'],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag', 'cookie'],
            lookupLocalStorage: 'i18nextLng',
            caches: ['localStorage'],
        },
    });



export default i18n;
