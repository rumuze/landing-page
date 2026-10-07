// Pure logic for the Hijri / Gregorian converter. The Hijri dates come from the browser's
// built-in Umm al-Qura calendar (Intl), so no tables are shipped. All dates are handled as UTC
// midnights so the visitor's time zone never moves a date by a day.

const MIN_GREGORIAN_YEAR = 1901;
const MAX_GREGORIAN_YEAR = 2076;
const MIN_HIJRI_YEAR = 1318;
const MAX_HIJRI_YEAR = 1500;

export const HIJRI_MONTHS = {
  ar: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
  en: ['Muharram', 'Safar', "Rabi' al-awwal", "Rabi' al-thani", 'Jumada al-awwal', 'Jumada al-thani', 'Rajab', "Sha'ban", 'Ramadan', 'Shawwal', "Dhu al-Qa'dah", "Dhu al-Hijjah"],
};

export const GREGORIAN_MONTHS = {
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

// Index 0 is Sunday, to match Date#getUTCDay.
export const WEEKDAYS = {
  ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

const DAY_MS = 86_400_000;

let hijriParts = null;
function hijriFormatter() {
  if (hijriParts === null) {
    try {
      const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      });
      // A browser without the calendar may quietly fall back to Gregorian instead of throwing.
      hijriParts = formatter.resolvedOptions().calendar === 'islamic-umalqura' ? formatter : false;
    } catch {
      hijriParts = false;
    }
  }
  return hijriParts || null;
}

/** False when this browser has no Umm al-Qura calendar, so the page can say so. */
export const isHijriSupported = () => hijriFormatter() !== null;

/** A UTC midnight for a Gregorian date, valid for years below 100 too. */
export function utcDate(year, month, day) {
  const date = new Date(Date.UTC(2000, 0, 1));
  date.setUTCFullYear(year, month - 1, day);
  return date;
}

const isWholeNumber = (value) => Number.isInteger(value);

/** Hijri parts of a UTC date, or null when the calendar does not cover it. */
export function toHijriParts(date) {
  const formatter = hijriFormatter();
  if (!formatter) return null;
  const parts = {};
  for (const part of formatter.formatToParts(date)) {
    if (part.type !== 'literal') parts[part.type] = Number.parseInt(part.value, 10);
  }
  if (![parts.year, parts.month, parts.day].every(Number.isFinite)) return null;
  return { year: parts.year, month: parts.month, day: parts.day };
}

export function gregorianToHijri(year, month, day) {
  if (![year, month, day].every(isWholeNumber)) return { ok: false, error: 'empty' };
  if (year < MIN_GREGORIAN_YEAR || year > MAX_GREGORIAN_YEAR) return { ok: false, error: 'range' };
  if (month < 1 || month > 12 || day < 1) return { ok: false, error: 'invalid' };
  const date = utcDate(year, month, day);
  if (date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return { ok: false, error: 'invalid' };
  const hijri = toHijriParts(date);
  if (!hijri) return { ok: false, error: 'unsupported' };
  return { ok: true, date, hijri };
}

// First guess for a Hijri date, from the mean length of the Hijri year and month. The real
// date is then found by checking the days around the guess.
const HIJRI_EPOCH = Date.UTC(622, 6, 16);
const guessHijri = (year, month, day) =>
  new Date(HIJRI_EPOCH + ((year - 1) * 354.367 + (month - 1) * 29.53 + day - 1) * DAY_MS);

function findHijri(year, month, day) {
  const guess = Math.floor(guessHijri(year, month, day).getTime() / DAY_MS) * DAY_MS;
  for (let offset = 0; offset <= 45; offset += 1) {
    for (const sign of offset === 0 ? [1] : [1, -1]) {
      const date = new Date(guess + sign * offset * DAY_MS);
      const parts = toHijriParts(date);
      if (parts && parts.year === year && parts.month === month && parts.day === day) return date;
    }
  }
  return null;
}

export function hijriToGregorian(year, month, day) {
  if (![year, month, day].every(isWholeNumber)) return { ok: false, error: 'empty' };
  if (year < MIN_HIJRI_YEAR || year > MAX_HIJRI_YEAR) return { ok: false, error: 'range' };
  if (month < 1 || month > 12 || day < 1 || day > 30) return { ok: false, error: 'invalid' };
  if (!isHijriSupported()) return { ok: false, error: 'unsupported' };
  const date = findHijri(year, month, day);
  if (!date) return { ok: false, error: 'invalid' };
  // Both directions are limited to the same Gregorian years.
  const gregorianYear = date.getUTCFullYear();
  if (gregorianYear < MIN_GREGORIAN_YEAR || gregorianYear > MAX_GREGORIAN_YEAR) return { ok: false, error: 'range' };
  return { ok: true, date, hijri: { year, month, day } };
}

/** The days of one Hijri month: how many, which weekday the 1st falls on, and the Gregorian start. */
export function hijriMonthGrid(year, month) {
  const first = findHijri(year, month, 1);
  if (!first) return null;
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  const next = findHijri(nextYear, nextMonth, 1);
  const length = next ? Math.round((next.getTime() - first.getTime()) / DAY_MS) : 30;
  return { length, firstWeekday: first.getUTCDay(), first };
}

export function addDays(date, days) {
  return new Date(date.getTime() + days * DAY_MS);
}

// ---------------------------------------------------------------------------------------------
// Moon phase, from the mean synodic month counted from a known new moon. Real new and full moons
// differ from this by up to about half a day, so the page calls it approximate.

const SYNODIC_MONTH = 29.530588853;
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

/** Where the moon is in its cycle at noon UTC on `date`: 0 = new, 0.5 = full. */
export function moonCycle(date) {
  const noon = date.getTime() + DAY_MS / 2;
  const age = (((noon - KNOWN_NEW_MOON) / DAY_MS) % SYNODIC_MONTH + SYNODIC_MONTH) % SYNODIC_MONTH;
  return age / SYNODIC_MONTH;
}

export const illumination = (cycle) => (1 - Math.cos(2 * Math.PI * cycle)) / 2;

const PHASES = ['new', 'waxingCrescent', 'firstQuarter', 'waxingGibbous', 'full', 'waningGibbous', 'lastQuarter', 'waningCrescent'];
export const phaseName = (cycle) => PHASES[Math.floor(((cycle * 8 + 0.5) % 8 + 8) % 8)];

/** The shortest signed step from cycle `a` to cycle `b` (both 0..1), so the moon turns the short way. */
export function cycleDelta(a, b) {
  let delta = b - a;
  if (delta > 0.5) delta -= 1;
  if (delta < -0.5) delta += 1;
  return delta;
}

/**
 * SVG path for the lit part of the moon, in a 100 x 100 box with radius `r`. The lit limb is
 * the right edge while the moon grows and the left edge while it shrinks.
 */
export function litPath(cycle, r = 44, cx = 50, cy = 50) {
  const c = ((cycle % 1) + 1) % 1;
  const waxing = c < 0.5;
  const k = Math.cos(2 * Math.PI * c);
  const rx = Math.max(0.01, Math.abs(k) * r);
  const top = `${cx} ${cy - r}`;
  const bottom = `${cx} ${cy + r}`;
  const limb = waxing ? 1 : 0;
  const terminator = waxing ? (k > 0 ? 0 : 1) : k > 0 ? 1 : 0;
  return `M${top} A${r} ${r} 0 0 ${limb} ${bottom} A${rx.toFixed(2)} ${r} 0 0 ${terminator} ${top}Z`;
}
