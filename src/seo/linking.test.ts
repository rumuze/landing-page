import { describe, expect, it } from 'vitest';
import {
  generateHreflangsFromLocales,
  hasLocalePrefix,
  localizePath,
  normalizeSeoLocale,
  stripLocalePrefix,
} from './linking';

describe('SEO linking helpers', () => {
  const baseUrl = 'https://www.rumuze.com';

  it('detects locale prefixes only at the first path segment', () => {
    expect(hasLocalePrefix('/ar/services', 'ar')).toBe(true);
    expect(hasLocalePrefix('/ar', 'ar')).toBe(true);
    expect(hasLocalePrefix('/architecture-principles', 'ar')).toBe(false);
    expect(hasLocalePrefix('/article', 'ar')).toBe(false);
  });

  it('strips locale prefixes without corrupting English routes', () => {
    expect(stripLocalePrefix('/ar/services')).toBe('/services');
    expect(stripLocalePrefix('/ar')).toBe('/');
    expect(stripLocalePrefix('/architecture-principles')).toBe('/architecture-principles');
  });

  it('builds localized paths with a clean Arabic root URL', () => {
    expect(localizePath('/', 'ar')).toBe('/ar');
    expect(localizePath('/services', 'ar')).toBe('/ar/services');
    expect(localizePath('/ar/services', 'en')).toBe('/services');
  });

  it('generates hreflang maps for supported locales only', () => {
    expect(generateHreflangsFromLocales(baseUrl, '/architecture-principles', ['en', 'ar', 'fr'])).toEqual({
      en: 'https://www.rumuze.com/architecture-principles',
      ar: 'https://www.rumuze.com/ar/architecture-principles',
      'x-default': 'https://www.rumuze.com/architecture-principles',
    });
  });

  it('normalizes language codes to the supported SEO locales', () => {
    expect(normalizeSeoLocale('ar-EG')).toBe('ar');
    expect(normalizeSeoLocale('en-US')).toBe('en');
    expect(normalizeSeoLocale(undefined)).toBe('en');
  });
});
