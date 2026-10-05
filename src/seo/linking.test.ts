import { describe, expect, it } from 'vitest';
import {
  generateHreflangsFromLocales,
  hasLocalePrefix,
  localeFromPath,
  localizePath,
  normalizeSeoLocale,
  stripLocalePrefix,
} from './linking';

describe('SEO linking helpers', () => {
  const baseUrl = 'https://www.rumuze.com';

  it('detects locale prefixes only at the first path segment', () => {
    expect(hasLocalePrefix('/en/services', 'en')).toBe(true);
    expect(hasLocalePrefix('/en', 'en')).toBe(true);
    expect(hasLocalePrefix('/engineering-standards', 'en')).toBe(false);
    expect(hasLocalePrefix('/enterprise-framework', 'en')).toBe(false);
  });

  it('reads the language from the URL: Arabic everywhere except under /en', () => {
    expect(localeFromPath('/')).toBe('ar');
    expect(localeFromPath('/services')).toBe('ar');
    expect(localeFromPath('/en')).toBe('en');
    expect(localeFromPath('/en/services')).toBe('en');
    expect(localeFromPath('/engineering-standards')).toBe('ar');
  });

  it('strips locale prefixes without corrupting English routes', () => {
    expect(stripLocalePrefix('/en/services')).toBe('/services');
    expect(stripLocalePrefix('/en')).toBe('/');
    expect(stripLocalePrefix('/engineering-standards')).toBe('/engineering-standards');
  });

  it('builds localized paths with a clean Arabic root URL', () => {
    expect(localizePath('/', 'ar')).toBe('/');
    expect(localizePath('/services', 'ar')).toBe('/services');
    expect(localizePath('/', 'en')).toBe('/en');
    expect(localizePath('/en/services', 'ar')).toBe('/services');
    expect(localizePath('/services', 'en')).toBe('/en/services');
  });

  it('generates hreflang maps for supported locales only', () => {
    expect(generateHreflangsFromLocales(baseUrl, '/architecture-principles', ['en', 'ar', 'fr'])).toEqual({
      en: 'https://www.rumuze.com/en/architecture-principles',
      ar: 'https://www.rumuze.com/architecture-principles',
      'x-default': 'https://www.rumuze.com/architecture-principles',
    });
  });

  it('normalizes language codes to the supported SEO locales', () => {
    expect(normalizeSeoLocale('ar-EG')).toBe('ar');
    expect(normalizeSeoLocale('en-US')).toBe('en');
    expect(normalizeSeoLocale(undefined)).toBe('ar');
  });
});
