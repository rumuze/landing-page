// Pure logic for the WhatsApp link generator. wa.me links take the full international
// number as digits only (no +, no leading zeros), with the message in ?text=.

/** Countries people most often need here. `dial` is the country calling code without "+". */
export const COUNTRIES = [
  { id: 'SA', dial: '966', en: 'Saudi Arabia', ar: 'السعودية' },
  { id: 'AE', dial: '971', en: 'United Arab Emirates', ar: 'الإمارات' },
  { id: 'EG', dial: '20', en: 'Egypt', ar: 'مصر' },
  { id: 'KW', dial: '965', en: 'Kuwait', ar: 'الكويت' },
  { id: 'QA', dial: '974', en: 'Qatar', ar: 'قطر' },
  { id: 'BH', dial: '973', en: 'Bahrain', ar: 'البحرين' },
  { id: 'OM', dial: '968', en: 'Oman', ar: 'عُمان' },
  { id: 'JO', dial: '962', en: 'Jordan', ar: 'الأردن' },
  { id: 'LB', dial: '961', en: 'Lebanon', ar: 'لبنان' },
  { id: 'IQ', dial: '964', en: 'Iraq', ar: 'العراق' },
  { id: 'PS', dial: '970', en: 'Palestine', ar: 'فلسطين' },
  { id: 'SY', dial: '963', en: 'Syria', ar: 'سوريا' },
  { id: 'YE', dial: '967', en: 'Yemen', ar: 'اليمن' },
  { id: 'SD', dial: '249', en: 'Sudan', ar: 'السودان' },
  { id: 'LY', dial: '218', en: 'Libya', ar: 'ليبيا' },
  { id: 'TN', dial: '216', en: 'Tunisia', ar: 'تونس' },
  { id: 'DZ', dial: '213', en: 'Algeria', ar: 'الجزائر' },
  { id: 'MA', dial: '212', en: 'Morocco', ar: 'المغرب' },
  { id: 'TR', dial: '90', en: 'Türkiye', ar: 'تركيا' },
  { id: 'GB', dial: '44', en: 'United Kingdom', ar: 'المملكة المتحدة' },
  { id: 'US', dial: '1', en: 'United States / Canada', ar: 'الولايات المتحدة / كندا' },
];

const MIN_DIGITS = 7; // shortest full number WhatsApp will take
const MAX_DIGITS = 15; // E.164 limit
const LONG_URL = 1500; // beyond this a QR code becomes very dense

const ARABIC_INDIC = '٠١٢٣٤٥٦٧٨٩';
const EXTENDED_ARABIC_INDIC = '۰۱۲۳۴۵۶۷۸۹';

/** Arabic-Indic and Persian digits to 0-9, so a number typed on an Arabic keyboard works. */
export function toLatinDigits(text) {
  return String(text ?? '').replace(/[٠-٩۰-۹]/g, (digit) => {
    const index = ARABIC_INDIC.indexOf(digit);
    return String(index >= 0 ? index : EXTENDED_ARABIC_INDIC.indexOf(digit));
  });
}

/**
 * Works out the full international digits for what was typed.
 * - "+966 55 123 4567" or "00966551234567": already international, used as typed.
 * - "055 123 4567": a local number; leading zeros (the trunk prefix) are dropped and the
 *   selected country's code is put in front.
 * - "966551234567" (the country's own code, then a long enough number): taken as international.
 */
export function internationalDigits(dial, rawNumber) {
  const typed = toLatinDigits(rawNumber).trim();
  const digits = typed.replace(/\D/g, '');
  if (!digits) return '';
  if (typed.startsWith('+')) return digits.replace(/^0+/, '');
  if (digits.startsWith('00')) return digits.replace(/^0+/, '');
  if (dial && digits.startsWith(dial) && digits.length >= dial.length + 7 && digits.length <= MAX_DIGITS) {
    return digits;
  }
  return `${dial}${digits.replace(/^0+/, '')}`;
}

/**
 * @returns {{ ok: true, url: string, digits: string, display: string, longUrl: boolean }
 *   | { ok: false, error: 'empty' | 'invalidChars' | 'tooShort' | 'tooLong' }}
 */
export function buildWhatsAppLink({ dial, number, message = '' }) {
  const typed = toLatinDigits(number).trim();
  if (!typed) return { ok: false, error: 'empty' };
  if (/[^\d\s+\-().]/.test(typed)) return { ok: false, error: 'invalidChars' };

  const digits = internationalDigits(dial, typed);
  if (digits.length < MIN_DIGITS) return { ok: false, error: 'tooShort' };
  if (digits.length > MAX_DIGITS) return { ok: false, error: 'tooLong' };

  const text = String(message ?? '').replace(/\r\n?/g, '\n').trim();
  const url = text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`;
  return { ok: true, url, digits, display: `+${digits}`, longUrl: url.length > LONG_URL };
}
