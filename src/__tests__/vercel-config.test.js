import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { buildVercelConfig, parseHeaders, parseRedirects, readSources, renderVercelConfig } from '../../scripts/generate-vercel-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const { redirectsText } = readSources();

// The two hosts must answer the same way. This resolves a path the way each rule list is meant to be read.
function resolveCloudflare(pathname) {
  for (const raw of redirectsText.split('\n')) {
    const [from, to, status] = raw.trim().split(/\s+/);
    if (status !== '301') continue;
    if (from.endsWith('/*')) {
      const base = from.slice(0, -2);
      if (pathname === base || pathname.startsWith(`${base}/`)) return to.replace(':splat', pathname.slice(base.length + 1));
    } else if (pathname === from) return to;
  }
  return null;
}

function resolveVercel(pathname) {
  for (const { source, destination } of vercel.redirects) {
    if (source.endsWith('/:path*')) {
      const base = source.slice(0, -7);
      if (pathname === base || pathname.startsWith(`${base}/`)) return destination.replace(':path*', pathname.slice(base.length + 1));
    } else if (pathname === source) return destination;
  }
  return null;
}

describe('vercel.json', () => {
  it('is generated from public/_redirects and public/_headers (run `npm run vercel-config`)', () => {
    expect(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8')).toBe(renderVercelConfig());
  });

  it('builds the same site Cloudflare builds and lets Git deployments run', () => {
    expect(vercel.buildCommand).toBe('npm run build');
    expect(vercel.outputDirectory).toBe('dist');
    expect(vercel.git?.deploymentEnabled).not.toBe(false);
  });

  it.each([
    '/', '/ar', '/ar/', '/ar/services', '/ar/services/saas-erp', '/ar/blog/answer-engine-optimization-basics', '/ar/comparison/a/b',
    '/comparison/x', '/en/comparison/y', '/why-rumuze', '/ar/why-rumuze', '/en/why-rumuze', '/en/manifesto', '/services', '/services/seo-services',
    '/en/about', '/marketing-infrastructure', '/ar/marketing-infrastructure', '/portfolio/rveta', '/admin/inbox',
  ])('redirects %s like Cloudflare does', (pathname) => {
    expect(resolveVercel(pathname)).toBe(resolveCloudflare(pathname));
  });

  it('sends legacy /ar URLs to the same page at the root and keeps real pages untouched', () => {
    expect(resolveVercel('/ar/services')).toBe('/services');
    expect(resolveVercel('/ar')).toBe('/');
    expect(resolveVercel('/services')).toBeNull();
    expect(resolveVercel('/en/services')).toBeNull();
  });

  it('keeps the security headers and long caching for assets', () => {
    const all = vercel.headers.find((rule) => rule.source === '/(.*)');
    const names = all.headers.map((h) => h.key);
    expect(names).toEqual(expect.arrayContaining(['X-Frame-Options', 'X-Content-Type-Options', 'Strict-Transport-Security', 'Referrer-Policy']));
    const assets = vercel.headers.find((rule) => rule.source === '/assets/(.*)');
    expect(assets.headers[0].value).toContain('immutable');
  });

  it('sends everything that is not a file to the app shell', () => {
    expect(vercel.rewrites).toEqual([{ source: '/(.*)', destination: '/200.html' }]);
  });

  it('parses the source formats strictly', () => {
    expect(() => parseRedirects('/a /b 302')).toThrow();
    expect(() => parseRedirects('/a/* /b/:rest 301')).toThrow();
    expect(parseHeaders('/*\n  X-A: 1: 2\n')).toEqual([{ pattern: '/*', headers: [{ key: 'X-A', value: '1: 2' }] }]);
    expect(buildVercelConfig('/x /y 301\n/* /200.html 200\n', '/*\n  A: b\n').redirects).toEqual([{ source: '/x', destination: '/y', permanent: true }]);
  });
});
