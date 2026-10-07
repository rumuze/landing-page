import { describe, expect, it } from 'vitest';
import { COUNTRIES, buildWhatsAppLink, internationalDigits, toLatinDigits } from './whatsapp';

const SA = '966';
const EG = '20';

describe('toLatinDigits', () => {
  it('converts Arabic-Indic and Persian digits', () => {
    expect(toLatinDigits('٠٥٥ ١٢٣ ٤٥٦٧')).toBe('055 123 4567');
    expect(toLatinDigits('۰۹۱۲')).toBe('0912');
    expect(toLatinDigits('abc 123')).toBe('abc 123');
  });
});

describe('internationalDigits', () => {
  it('drops the local leading zero and adds the selected country code', () => {
    expect(internationalDigits(SA, '055 123 4567')).toBe('966551234567');
    expect(internationalDigits(EG, '01012345678')).toBe('201012345678');
    expect(internationalDigits(SA, '551234567')).toBe('966551234567');
  });
  it('uses a number typed with + or 00 as international, whatever country is selected', () => {
    expect(internationalDigits(EG, '+966 55 123 4567')).toBe('966551234567');
    expect(internationalDigits(EG, '00966551234567')).toBe('966551234567');
  });
  it("takes the selected country's own code followed by a full number as international", () => {
    expect(internationalDigits(SA, '966551234567')).toBe('966551234567');
  });
  it('reads Arabic digits', () => {
    expect(internationalDigits(SA, '٠٥٥١٢٣٤٥٦٧')).toBe('966551234567');
  });
});

describe('buildWhatsAppLink', () => {
  it('builds a wa.me link with no message', () => {
    const result = buildWhatsAppLink({ dial: SA, number: '0551234567' });
    expect(result).toMatchObject({ ok: true, url: 'https://wa.me/966551234567', display: '+966551234567', longUrl: false });
  });

  it('encodes an Arabic message with a line break', () => {
    const result = buildWhatsAppLink({ dial: SA, number: '0551234567', message: 'مرحبا\nأريد عرض سعر' });
    expect(result.ok).toBe(true);
    expect(result.url).toBe(`https://wa.me/966551234567?text=${encodeURIComponent('مرحبا\nأريد عرض سعر')}`);
    expect(result.url).toContain('%0A');
    expect(decodeURIComponent(new URL(result.url).searchParams.get('text'))).toBe('مرحبا\nأريد عرض سعر');
  });

  it('normalises Windows line breaks and trims the message', () => {
    const result = buildWhatsAppLink({ dial: SA, number: '551234567', message: '  a\r\nb  ' });
    expect(new URL(result.url).searchParams.get('text')).toBe('a\nb');
  });

  it('flags a link long enough to make a crowded QR code', () => {
    const result = buildWhatsAppLink({ dial: SA, number: '551234567', message: 'x'.repeat(1600) });
    expect(result.longUrl).toBe(true);
  });

  it('rejects empty, lettered, too short and too long numbers', () => {
    expect(buildWhatsAppLink({ dial: SA, number: '' })).toEqual({ ok: false, error: 'empty' });
    expect(buildWhatsAppLink({ dial: SA, number: '   ' })).toEqual({ ok: false, error: 'empty' });
    expect(buildWhatsAppLink({ dial: SA, number: '05a1234' })).toEqual({ ok: false, error: 'invalidChars' });
    expect(buildWhatsAppLink({ dial: SA, number: '12' })).toEqual({ ok: false, error: 'tooShort' });
    expect(buildWhatsAppLink({ dial: SA, number: '+1234567890123456' })).toEqual({ ok: false, error: 'tooLong' });
  });
});

describe('COUNTRIES', () => {
  it('has unique ids and dial codes, each in both languages', () => {
    expect(new Set(COUNTRIES.map((c) => c.id)).size).toBe(COUNTRIES.length);
    expect(new Set(COUNTRIES.map((c) => c.dial)).size).toBe(COUNTRIES.length);
    for (const country of COUNTRIES) {
      expect(country.en && country.ar && /^\d{1,3}$/.test(country.dial), country.id).toBeTruthy();
    }
  });
});
