import { toLatinDigits } from './whatsapp';

// Pure logic for the VAT calculator. Money is worked out in whole minor units (cents) so that
// adding and removing VAT never drifts by a cent, and rounding is half up on the VAT itself.

// Standard rates only. Zero-rated and exempt goods and services are not covered, and the page says so.
// Checked October 2026 against published tax summaries; confirm with the tax authority before invoicing.

export const VAT_COUNTRIES = [
  { id: 'SA', rate: 15, en: 'Saudi Arabia', ar: 'السعودية' },
  { id: 'AE', rate: 5, en: 'United Arab Emirates', ar: 'الإمارات' },
  { id: 'BH', rate: 10, en: 'Bahrain', ar: 'البحرين' },
  { id: 'OM', rate: 5, en: 'Oman', ar: 'عُمان' },
  { id: 'EG', rate: 14, en: 'Egypt', ar: 'مصر' },
  { id: 'JO', rate: 16, en: 'Jordan', ar: 'الأردن' },
];

const MAX_AMOUNT = 1_000_000_000_000;

/**
 * An amount typed by a person, in minor units, or null when it is not a usable number. Accepts Arabic
 * digits, spaces and commas as thousands separators, and "." or the Arabic decimal mark as the point.
 */
export function parseAmount(text) {
  const cleaned = toLatinDigits(text).replace(/[\s,،٬]/g, '').replace(/٫/g, '.');
  if (!/^\d+(\.\d{0,2})?$/.test(cleaned)) return null;
  const [whole, fraction = ''] = cleaned.split('.');
  const minor = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  return Number.isSafeInteger(minor) && minor <= MAX_AMOUNT * 100 ? minor : null;
}

/** A rate typed by a person, in percent with up to two decimals, or null. */
export function parseRate(text) {
  const cleaned = toLatinDigits(text).replace(/\s/g, '').replace(/[٫,]/g, '.').replace(/%/g, '');
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const rate = Number(cleaned);
  return rate <= 100 ? rate : null;
}

// Rates are held in basis points (hundredths of a percent) so the arithmetic stays in integers.
const basisPoints = (rate) => Math.round(rate * 100);

/**
 * Adds VAT to a net amount, or takes it out of a gross one. `minor` is the amount the person typed.
 * Returns { net, vat, gross } in minor units.
 */
export function calcVat(minor, rate, mode) {
  const bp = basisPoints(rate);
  if (mode === 'remove') {
    // gross = net * (1 + rate): the VAT is gross * rate / (1 + rate), rounded half up.
    const vat = Math.floor((minor * bp * 2 + (10000 + bp)) / (2 * (10000 + bp)));
    return { net: minor - vat, vat, gross: minor };
  }
  const vat = Math.floor((minor * bp * 2 + 10000) / 20000);
  return { net: minor, vat, gross: minor + vat };
}

/** Minor units as a plain string with two decimals and thousands separators, e.g. 1,234.50. */
export function formatMinor(minor) {
  const sign = minor < 0 ? '-' : '';
  const abs = Math.abs(minor);
  const whole = Math.floor(abs / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${sign}${whole}.${String(abs % 100).padStart(2, '0')}`;
}

/** The share of the gross amount that is VAT, 0 to 1, for the bar. */
export function vatShare({ vat, gross }) {
  return gross > 0 ? vat / gross : 0;
}
