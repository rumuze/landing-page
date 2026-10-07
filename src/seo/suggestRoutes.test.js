import { describe, expect, it } from 'vitest';
import { editDistance, similarity, suggestPaths } from './suggestRoutes';
import { PAGE_ROUTES } from '../routes/routeTable';

const paths = ['/', '/services', '/portfolio', '/contact', '/utm-builder', '/qr-generator', '/whatsapp-link-generator', '/serp-preview', '/vat-calculator', '/image-compressor'];

describe('editDistance', () => {
  it('counts the changes between two strings', () => {
    expect(editDistance('', 'abc')).toBe(3);
    expect(editDistance('kitten', 'sitting')).toBe(3);
    expect(editDistance('same', 'same')).toBe(0);
  });
});

describe('similarity', () => {
  it('is 1 for the same path and low for unrelated ones', () => {
    expect(similarity('/contact', '/contact')).toBe(1);
    expect(similarity('/zzzz', '/services')).toBeLessThan(0.3);
  });
});

describe('suggestPaths', () => {
  it('suggests the page for a typo', () => {
    expect(suggestPaths('/servces', paths)[0]).toBe('/services');
    expect(suggestPaths('/en/utm-biulder', paths)[0]).toBe('/utm-builder');
  });
  it('suggests by a shared word or by containment', () => {
    expect(suggestPaths('/qr', paths)).toContain('/qr-generator');
    expect(suggestPaths('/tools/vat-calculators', paths)[0]).toBe('/vat-calculator');
    expect(suggestPaths('/compress-image', paths)).toContain('/image-compressor');
  });
  it('ignores the language, query, hash and trailing slash', () => {
    expect(suggestPaths('/en/servces/?a=1#x', paths)[0]).toBe('/services');
  });
  it('suggests nothing for an unrelated path, for the home page, or more than the limit', () => {
    expect(suggestPaths('/qwertyuiop', paths)).toEqual([]);
    expect(suggestPaths('/', paths)).toEqual([]);
    expect(suggestPaths('/en', paths)).toEqual([]);
    expect(suggestPaths('/generator', paths, { limit: 2 }).length).toBeLessThanOrEqual(2);
  });
  it('never suggests a page that needs a parameter', () => {
    const candidates = PAGE_ROUTES.filter((route) => route.access === 'public' && !route.path.includes(':')).map((route) => route.path);
    expect(candidates.some((path) => path.includes(':'))).toBe(false);
    expect(candidates).toContain('/services');
  });
});
