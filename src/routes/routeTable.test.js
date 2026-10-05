import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { matchPath } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { getPublicRouteManifest } from '../../scripts/lib/publicRouteManifest.js';
import { localizePath, PAGE_ROUTES, RETIRED_REDIRECTS } from './routeTable';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const LOCALES = ['en', 'ar'];

const allPaths = [
  ...PAGE_ROUTES.map((route) => route.path),
  ...RETIRED_REDIRECTS.map(([from]) => from),
];

describe('route table', () => {
  it('has unique ids and paths', () => {
    const ids = PAGE_ROUTES.map((route) => route.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(allPaths).size).toBe(allPaths.length);
  });

  it('localizes paths for both languages', () => {
    expect(localizePath('/', 'en')).toBe('/en');
    expect(localizePath('/about', 'en')).toBe('/en/about');
    expect(localizePath('/about', 'ar')).toBe('/about');
  });

  it('serves every public page in the manifest in both languages', () => {
    const served = LOCALES.flatMap((locale) =>
      PAGE_ROUTES.filter((route) => route.access === 'public').map((route) => localizePath(route.path, locale)),
    );
    for (const route of getPublicRouteManifest()) {
      for (const locale of LOCALES) {
        const url = localizePath(route.path, locale);
        if (url === '/' || url === '/en') continue; // home routes are defined separately
        const sample = url.replace(/:slug/, 'sample');
        expect(
          served.some((pattern) => matchPath({ path: pattern, end: true }, sample)),
          `${url} has no route`,
        ).toBe(true);
      }
    }
  });

  it('redirects only to pages that exist', () => {
    const live = new Set(PAGE_ROUTES.map((route) => route.path));
    for (const [, to] of RETIRED_REDIRECTS) {
      const matchesRoute = [...live].some((pattern) => matchPath({ path: pattern, end: true }, to));
      expect(matchesRoute, `${to} is not a route`).toBe(true);
    }
  });

  it('keeps the client-side redirects in step with public/_redirects', () => {
    const fromFile = fs
      .readFileSync(path.join(root, 'public/_redirects'), 'utf8')
      .split('\n')
      .filter((line) => /\s301$/.test(line))
      .map((line) => line.trim().split(/\s+/)[0])
      // Old /ar URLs are only redirected by the host; the router has no /ar routes.
      .filter((source) => !/^\/ar(\/|$)/.test(source));
    const client = new Set(
      LOCALES.flatMap((locale) => RETIRED_REDIRECTS.map(([from]) => localizePath(from, locale))),
    );
    for (const source of fromFile) {
      expect(client.has(source), `${source} is redirected by the host but not by the router`).toBe(true);
    }
  });
});
