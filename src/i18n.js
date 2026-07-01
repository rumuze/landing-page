import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

// Simple check for Arabic-speaking countries based on browser locale if no saved preference exists
const isInitialArabicPreferred = () => {
    const browserLangs = navigator.languages || [navigator.language];
    const arLocales = ['ar', 'ar-SA', 'ar-AE', 'ar-EG', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-QA'];
    return browserLangs.some(lang => arLocales.includes(lang));
};

i18n
    .use(LanguageDetector)
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

// Handle initial detection bias if no localStorage is set
if (!localStorage.getItem('i18nextLng')) {
    i18n.changeLanguage('ar');
}



export default i18n;
