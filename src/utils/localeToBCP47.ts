const map: Record<string, string> = {
  en: 'en-US',
  ar: 'ar-EG',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
};

export function localeToBCP47(locale: string) {
  return map[locale] || 'en-US';
}
