import { describe, expect, it } from 'vitest';
import { VAT_COUNTRIES, calcVat, formatMinor, parseAmount, parseRate, vatShare } from './vat';

describe('parseAmount', () => {
  it('reads plain, grouped and Arabic-digit amounts into minor units', () => {
    expect(parseAmount('100')).toBe(10000);
    expect(parseAmount('1,234.5')).toBe(123450);
    expect(parseAmount('١٢٣٫٤٥')).toBe(12345);
    expect(parseAmount(' 1 000 ')).toBe(100000);
    expect(parseAmount('0.07')).toBe(7);
  });
  it('refuses empty, negative, text and too many decimals', () => {
    for (const bad of ['', 'abc', '-5', '1.234', '1..2', '1e5', '1,2,.3.']) expect(parseAmount(bad), bad).toBeNull();
  });
  it('refuses amounts that are too large to be exact', () => {
    expect(parseAmount('99999999999999999999')).toBeNull();
  });
});

describe('parseRate', () => {
  it('reads percentages up to 100', () => {
    expect(parseRate('15')).toBe(15);
    expect(parseRate('7.5%')).toBe(7.5);
    expect(parseRate('٥٫٥')).toBe(5.5);
    expect(parseRate('100')).toBe(100);
  });
  it('refuses values that are not a rate', () => {
    for (const bad of ['', '-1', '101', '5.555', 'x']) expect(parseRate(bad), bad).toBeNull();
  });
});

describe('calcVat', () => {
  it('adds VAT to a net amount', () => {
    expect(calcVat(10000, 15, 'add')).toEqual({ net: 10000, vat: 1500, gross: 11500 });
    expect(calcVat(10000, 0, 'add')).toEqual({ net: 10000, vat: 0, gross: 10000 });
  });
  it('removes VAT from a gross amount', () => {
    expect(calcVat(11500, 15, 'remove')).toEqual({ net: 10000, vat: 1500, gross: 11500 });
    expect(calcVat(10500, 5, 'remove')).toEqual({ net: 10000, vat: 500, gross: 10500 });
  });
  it('rounds the VAT half up to the cent', () => {
    // 0.10 at 5% is 0.005, which rounds up to 0.01.
    expect(calcVat(10, 5, 'add').vat).toBe(1);
    // 0.09 at 5% is 0.0045, which rounds down to 0.00.
    expect(calcVat(9, 5, 'add').vat).toBe(0);
  });
  it('always adds up: net + vat = gross, and adding then removing returns the same net', () => {
    for (const { rate } of VAT_COUNTRIES) {
      for (const minor of [1, 99, 100, 12345, 99999, 1234567]) {
        const added = calcVat(minor, rate, 'add');
        expect(added.net + added.vat).toBe(added.gross);
        const removed = calcVat(added.gross, rate, 'remove');
        expect(removed.net + removed.vat).toBe(removed.gross);
        expect(removed.net).toBe(minor);
      }
    }
  });
});

describe('formatMinor and vatShare', () => {
  it('formats with separators and two decimals', () => {
    expect(formatMinor(0)).toBe('0.00');
    expect(formatMinor(5)).toBe('0.05');
    expect(formatMinor(123456789)).toBe('1,234,567.89');
  });
  it('gives the VAT share of the total', () => {
    expect(vatShare({ vat: 1500, gross: 11500 })).toBeCloseTo(0.1304, 3);
    expect(vatShare({ vat: 0, gross: 0 })).toBe(0);
  });
});
