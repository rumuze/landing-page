import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { SERVICES } from '../config/services';
import { homeContent } from '../content/homeContent';
import { architectureDiagrams } from '../content/architectureDiagrams';
import { blogPosts } from '../data/blogPosts.js';
import { buildFAQSchema } from '../seo/buildFAQSchema';
import { buildOrganizationSchema } from '../seo/buildOrganizationSchema';
import { buildPersonSchema } from '../seo/buildPersonSchema';
import { getPublicRouteManifest } from '../../scripts/lib/publicRouteManifest.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

describe('services config', () => {
  it('has unique slugs and complete bilingual content', () => {
    const slugs = SERVICES.map((service) => service.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const service of SERVICES) {
      for (const lang of ['en', 'ar']) {
        expect(service.title[lang], `${service.slug} title ${lang}`).toBeTruthy();
        expect(service.summary[lang], `${service.slug} summary ${lang}`).toBeTruthy();
        expect(service.definitions.bullets[lang].length).toBeGreaterThan(2);
        expect(service.faqs.length).toBeGreaterThan(0);
      }
      for (const related of service.relatedServices ?? []) {
        expect(slugs, `${service.slug} relates to unknown ${related}`).toContain(related);
      }
    }
  });
});

describe('homepage content', () => {
  it('keeps English and Arabic structurally identical', () => {
    const shape = (value) =>
      Array.isArray(value)
        ? value.map(shape)
        : value && typeof value === 'object'
          ? Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, shape(inner)]))
          : typeof value;
    expect(shape(homeContent.ar)).toEqual(shape(homeContent.en));
  });

  it('has a diagram for every product card', () => {
    for (const card of homeContent.en.work.cards) {
      expect(architectureDiagrams[card.title], card.title).toBeTruthy();
    }
  });
});

describe('structured data', () => {
  it('FAQ schema mirrors the visible homepage FAQ', () => {
    for (const lang of ['en', 'ar']) {
      const schema = buildFAQSchema(lang);
      const visible = homeContent[lang].faq.items;
      expect(schema.mainEntity.map((item) => item.name)).toEqual(visible.map((item) => item.q));
      expect(schema.mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(visible.map((item) => item.a));
    }
  });

  it('does not publish unverified identity facts', () => {
    const organization = buildOrganizationSchema('en');
    expect(organization).not.toHaveProperty('legalName');
    for (const url of [...organization.sameAs, ...buildPersonSchema('en').sameAs]) {
      expect(url.startsWith('https://')).toBe(true);
    }
  });
});

describe('blog', () => {
  it('has both languages and a cover image for every post', () => {
    for (const post of blogPosts) {
      expect(post.en.title && post.ar.title, post.slug).toBeTruthy();
      expect(post.en.content.length).toBeGreaterThan(400);
      expect(fs.existsSync(path.join(root, 'public', post.image)), `${post.slug} cover`).toBe(true);
    }
  });
});

describe('redirects', () => {
  const routes = new Set(
    getPublicRouteManifest().flatMap((route) => [route.path, `/ar${route.path === '/' ? '' : route.path}`]),
  );
  const rules = read('public/_redirects')
    .split('\n')
    .filter((line) => /\s301$/.test(line))
    .map((line) => line.trim().split(/\s+/));

  it('point at live pages and never chain', () => {
    expect(rules.length).toBeGreaterThan(20);
    const sources = new Set(rules.map(([from]) => from));
    for (const [, to] of rules) {
      expect(routes.has(to), `${to} is not a live route`).toBe(true);
      expect(sources.has(to), `${to} is itself redirected`).toBe(false);
    }
  });

});

describe('Cloudflare deployment config', () => {
  it('ships security and cache headers with the assets', () => {
    const headers = read('public/_headers');
    expect(headers).toMatch(/X-Frame-Options: DENY/);
    expect(headers).toMatch(/Strict-Transport-Security/);
    expect(headers).toMatch(/\/assets\/\*\s+Cache-Control: public, max-age=31536000, immutable/);
  });

  it('keeps Vercel Git deployments off', () => {
    expect(JSON.parse(read('vercel.json')).git.deploymentEnabled).toBe(false);
  });

  it('allows the visit-tracking function in the page CSP', () => {
    expect(read('index.html')).toMatch(/connect-src[^;]*cloudfunctions\.net/);
  });
});

describe('claims guard', () => {
  // Phrases that were removed because they cannot be evidenced. See docs/CLAIMS_REGISTRY.md.
  const banned = [
    /99\.9\s?%/i,
    /\bSLO\b/,
    /Kubernetes\s+(?!for CRUD)/,
    /TensorFlow|PyTorch/,
    /GDPR (and CCPA )?compliant|military-grade/i,
    /Complexity Decoded/i,
    /\b47\+|12\+ countries/i,
    /Rumuze Technologies LLC/,
    /within one business day|خلال يوم عمل/i,
  ];
  const files = [
    'src/content/homeContent.js',
    'src/content/conversionContent.js',
    'src/config/services.ts',
    'src/config/entity.ts',
    'src/config/person.ts',
    'src/locales/en.json',
    'src/locales/ar.json',
    'index.html',
    'public/llms.txt',
  ];

  it.each(files)('%s has no unsupported claims', (file) => {
    const text = read(file);
    for (const pattern of banned) {
      expect(text, `${file} matches ${pattern}`).not.toMatch(pattern);
    }
  });
});
