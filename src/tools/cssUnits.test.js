import { describe, expect, it } from 'vitest';
import { COMMON_PX, convert, fluidClamp, parseNumber, pxToRem, remToPx, sizeAt, trim, typeScale } from './cssUnits';

describe('conversion', () => {
  it('converts both ways from a base size', () => {
    expect(pxToRem(24)).toBe(1.5);
    expect(pxToRem(20, 10)).toBe(2);
    expect(remToPx(1.25, 16)).toBe(20);
    expect(convert(1.5, 'rem', 16)).toEqual({ px: 24, rem: 1.5, em: 1.5 });
    expect(convert(8, 'px', 16).rem).toBe(0.5);
  });

  it('trims numbers for the CSS', () => {
    expect(trim(1.5)).toBe('1.5');
    expect(trim(0.333333)).toBe('0.3333');
    expect(trim(2)).toBe('2');
    expect(trim(-0.00001)).toBe('0');
    expect(trim(NaN)).toBe('0');
  });

  it('reads numbers typed with Arabic digits or a decimal comma', () => {
    expect(parseNumber('١٦')).toBe(16);
    expect(parseNumber('1,5')).toBe(1.5);
    expect(parseNumber('٠٫٧٥')).toBe(0.75);
    expect(parseNumber('abc')).toBeNull();
    expect(parseNumber('')).toBeNull();
  });

  it('lists common sizes in order', () => {
    expect([...COMMON_PX].sort((a, b) => a - b)).toEqual(COMMON_PX);
  });
});

describe('typeScale', () => {
  it('multiplies by the ratio for each step', () => {
    const scale = typeScale(16, 1.25);
    expect(scale).toHaveLength(8);
    expect(scale.find((item) => item.step === 0).px).toBe(16);
    expect(scale.find((item) => item.step === 1).px).toBe(20);
    expect(scale.find((item) => item.step === -1).px).toBeCloseTo(12.8, 5);
  });
});

describe('fluidClamp', () => {
  it('writes clamp() that hits both ends', () => {
    const rule = fluidClamp({ minPx: 16, maxPx: 24, minWidth: 400, maxWidth: 1200 });
    expect(rule.css).toBe('clamp(1rem, 0.75rem + 1vw, 1.5rem)');
    expect(sizeAt(rule, 400)).toBeCloseTo(16, 6);
    expect(sizeAt(rule, 800)).toBeCloseTo(20, 6);
    expect(sizeAt(rule, 1200)).toBeCloseTo(24, 6);
    expect(sizeAt(rule, 200)).toBe(16);
    expect(sizeAt(rule, 2000)).toBe(24);
  });

  it('uses a minus sign when the offset is negative', () => {
    const rule = fluidClamp({ minPx: 16, maxPx: 64, minWidth: 600, maxWidth: 1000 });
    expect(rule.css).toBe('clamp(1rem, -3.5rem + 12vw, 4rem)');
    expect(sizeAt(rule, 800)).toBeCloseTo(40, 6);
  });

  it('puts the ends in the right order and handles a flat rule', () => {
    expect(fluidClamp({ minPx: 24, maxPx: 16, minWidth: 1200, maxWidth: 400 }).css).toBe('clamp(1rem, 0.75rem + 1vw, 1.5rem)');
    const flat = fluidClamp({ minPx: 16, maxPx: 16, minWidth: 400, maxWidth: 1200 });
    expect(flat.css).toBe('1rem');
    expect(sizeAt(flat, 900)).toBe(16);
  });

  it('follows the base size', () => {
    expect(fluidClamp({ minPx: 20, maxPx: 40, minWidth: 400, maxWidth: 1200, base: 10 }).css).toBe('clamp(2rem, 1rem + 2.5vw, 4rem)');
  });
});
