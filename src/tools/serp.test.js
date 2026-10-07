import { describe, expect, it } from 'vitest';
import { LIMITS, breadcrumbUrl, countChars, countWords, fitLines, isRtlText, lengthStatus } from './serp';

// Ten pixels per character: easy to reason about.
const measure = (text) => Array.from(text).length * 10;

describe('counting', () => {
  it('counts characters the way people do', () => {
    expect(countChars('  مرحبا  ')).toBe(5);
    expect(countChars('a😀b')).toBe(3);
    expect(countChars('')).toBe(0);
  });
  it('counts words', () => {
    expect(countWords('  one  two\nthree ')).toBe(3);
    expect(countWords('')).toBe(0);
  });
});

describe('lengthStatus', () => {
  it('compares a length with its range', () => {
    expect(lengthStatus(0, LIMITS.title)).toBe('empty');
    expect(lengthStatus(10, LIMITS.title)).toBe('short');
    expect(lengthStatus(30, LIMITS.title)).toBe('good');
    expect(lengthStatus(60, LIMITS.title)).toBe('good');
    expect(lengthStatus(61, LIMITS.title)).toBe('long');
  });
});

describe('isRtlText', () => {
  it('tells Arabic from English', () => {
    expect(isRtlText('تصميم مواقع في الرياض')).toBe(true);
    expect(isRtlText('Web design in Riyadh')).toBe(false);
    expect(isRtlText('رموز Rumuze')).toBe(false);
    expect(isRtlText('')).toBe(false);
  });
});

describe('fitLines', () => {
  it('keeps text that fits on one line', () => {
    expect(fitLines('hello world', { width: 200, lines: 1 }, measure)).toEqual({ lines: ['hello world'], truncated: false });
  });

  it('wraps at spaces onto the next line', () => {
    const result = fitLines('aaaa bbbb cccc', { width: 90, lines: 2 }, measure);
    expect(result).toEqual({ lines: ['aaaa bbbb', 'cccc'], truncated: false });
  });

  it('ends with an ellipsis, inside the width, when text is left out', () => {
    const result = fitLines('aaaa bbbb cccc dddd eeee', { width: 90, lines: 2 }, measure);
    expect(result.truncated).toBe(true);
    expect(result.lines).toHaveLength(2);
    const last = result.lines[1];
    expect(last.endsWith('…')).toBe(true);
    expect(measure(last)).toBeLessThanOrEqual(90);
  });

  it('breaks a single word that is wider than a line', () => {
    const result = fitLines('abcdefghijklmnop', { width: 50, lines: 2 }, measure);
    expect(result.lines[0]).toBe('abcde');
    expect(result.truncated).toBe(true);
  });

  it('returns no lines for empty text', () => {
    expect(fitLines('   ', { width: 100, lines: 2 }, measure)).toEqual({ lines: [], truncated: false });
  });
});

describe('breadcrumbUrl', () => {
  it('shows the host and the path as a breadcrumb', () => {
    expect(breadcrumbUrl('https://www.rumuze.com/services/seo-services')).toEqual({
      host: 'rumuze.com',
      path: ' › services › seo-services',
    });
  });
  it('adds a scheme, decodes Arabic paths and handles a bare host', () => {
    expect(breadcrumbUrl('rumuze.com').path).toBe('');
    expect(breadcrumbUrl('rumuze.com/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA').path).toBe(' › خدمات');
  });
  it('falls back to a placeholder when empty', () => {
    expect(breadcrumbUrl('')).toEqual({ host: 'example.com', path: '' });
  });
});
