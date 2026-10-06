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
    getPublicRouteManifest().flatMap((route) => [route.path, `/en${route.path === '/' ? '' : route.path}`]),
  );
  const rules = read('public/_redirects')
    .split('\n')
    .filter((line) => /\s301$/.test(line))
    .map((line) => line.trim().split(/\s+/))
    // The /ar/* catch-all sends old Arabic URLs to the same path at the root.
    .filter(([, to]) => !to.includes(':splat'));

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

  it('allows reCAPTCHA and App Check in the page CSP', () => {
    const html = read('index.html');
    expect(html).toMatch(/frame-src[^;]*google\.com\/recaptcha/);
    expect(html).toMatch(/connect-src[^;]*firebaseappcheck\.googleapis\.com/);
  });

  it('allows the visit-tracking function in the page CSP', () => {
    expect(read('index.html')).toMatch(/connect-src[^;]*cloudfunctions\.net/);
  });
});

describe('search snippets', () => {
  it.each(SERVICES.map((service) => [service.slug, service]))('%s has a snippet-length meta description', (_slug, service) => {
    for (const lang of ['en', 'ar']) {
      const length = service.metaDescription[lang].length;
      expect(length, `${lang} description is ${length} characters`).toBeGreaterThanOrEqual(80);
      expect(length, `${lang} description is ${length} characters`).toBeLessThanOrEqual(165);
    }
  });
});

describe('blog markup', () => {
  const headings = (html) => [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/h[1-6]>/g)].map((m) => ({ level: Number(m[1][1]), text: m[2].trim() }));
  const templateHeadings = /^(Statement|Context|Explanation|Common Industry Mistakes|Company Perspective|البيان|السياق|التفسير|أخطاء الصناعة الشائعة|منظور روموز)$/;

  it.each(blogPosts.map((post) => [post.slug, post]))('%s has clean, parallel headings', (_slug, post) => {
    for (const lang of ['en', 'ar']) {
      const html = post[lang].content;
      expect(html, `${lang} has malformed tags`).not.toMatch(/<\s+\/?\s*[a-z]|<\/[a-z0-9]+\s+>/i);

      const found = headings(html);
      expect(found[0]?.level, `${lang} starts with an h2`).toBe(2);
      found.forEach((heading, index) => {
        const previous = found[index - 1]?.level ?? 1;
        expect(heading.level - previous, `${lang}: "${heading.text}" jumps from h${previous} to h${heading.level}`).toBeLessThanOrEqual(1);
        expect(heading.text, `${lang}: template heading`).not.toMatch(templateHeadings);
      });
    }
    expect(headings(post.ar.content).map((h) => h.level), 'Arabic mirrors the English heading levels').toEqual(
      headings(post.en.content).map((h) => h.level),
    );
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
    'src/content/serviceWaveContent.js',
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

describe('product pages', () => {
  const sectionTitles = (product, locale) => product[locale].sections.map((section) => section.items.length);

  it('has unique slugs, a diagram for every product, and the same shape in both languages', async () => {
    const { products } = await import('../data/products');
    const { architectureDiagrams } = await import('../content/architectureDiagrams');
    const { homeContent } = await import('../content/homeContent');

    expect(new Set(products.map((product) => product.slug)).size).toBe(products.length);
    const cardTitles = homeContent.en.work.cards.map((card) => card.title);
    expect(products.map((product) => product.title).sort()).toEqual([...cardTitles].sort());

    for (const product of products) {
      expect(architectureDiagrams[product.title], product.title).toBeTruthy();
      expect(sectionTitles(product, 'ar'), product.slug).toEqual(sectionTitles(product, 'en'));
      expect(product.ar.notYet.length, product.slug).toBe(product.en.notYet.length);
      expect(Boolean(product.ar.status), product.slug).toBe(Boolean(product.en.status));
      for (const locale of ['en', 'ar']) {
        expect(product[locale].description.length, `${product.slug} ${locale}`).toBeLessThanOrEqual(200);
        expect(product[locale].headline.length).toBeGreaterThan(20);
      }
    }
  });

  it('links only to blog posts that exist', async () => {
    const { products } = await import('../data/products');
    const { getPostBySlug } = await import('../data/blogPosts');
    for (const product of products) {
      for (const slug of product.related) expect(getPostBySlug(slug), `${product.slug} -> ${slug}`).toBeTruthy();
    }
  });
});

describe('process page', () => {
  it('has the same steps in both languages, links only to existing posts, and promises no schedule or price', async () => {
    const { processContent } = await import('../content/processContent');
    const { getPostBySlug } = await import('../data/blogPosts');
    expect(processContent.ar.steps.length).toBe(processContent.en.steps.length);
    processContent.en.steps.forEach((step, index) => {
      expect(processContent.ar.steps[index].link?.slug).toBe(step.link?.slug);
      if (step.link) expect(getPostBySlug(step.link.slug), step.link.slug).toBeTruthy();
    });
    const english = JSON.stringify(processContent.en);
    expect(english).not.toMatch(/\b\d+\s*(days?|weeks?|months?|hours?)\b|\$|USD|SAR|EGP|within 24|business day/i);
  });
});

describe('flat visual style', () => {
  const read = (file) => fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', file), 'utf8');

  it('has no decorative gradients, glows or off-brand colours in the shell and offline page', () => {
    for (const file of ['index.html', 'public/offline.html']) {
      const source = read(file);
      expect(source, file).not.toMatch(/gradient\(/);
      expect(source, file).not.toMatch(/filter:\s*blur/);
      expect(source, file).not.toMatch(/a855f7|168,\s*85,\s*247/i);
    }
  });

  it('has no coloured glow shadows in the source', () => {
    const walk = (dir) =>
      fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)],
      );
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    const offenders = walk(root)
      .filter((file) => /\.(jsx|js|css)$/.test(file) && !file.includes('__tests__'))
      .filter((file) => /shadow-\[[^\]]*rgba\((0,\s*229,\s*255|22,\s*163,\s*74)/.test(fs.readFileSync(file, 'utf8')));
    expect(offenders).toEqual([]);
  });
});

describe('translations', () => {
  it('has every key used with t() in both languages', () => {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const srcDir = path.resolve(here, '..');
    const locales = {
      en: JSON.parse(fs.readFileSync(path.join(srcDir, 'locales', 'en.json'), 'utf8')),
      ar: JSON.parse(fs.readFileSync(path.join(srcDir, 'locales', 'ar.json'), 'utf8')),
    };
    const lookup = (object, key) => key.split('.').reduce((value, part) => value?.[part], object);
    const walk = (dir) =>
      fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)],
      );

    const missing = [];
    for (const file of walk(srcDir).filter((f) => /\.(jsx|js)$/.test(f) && !f.includes('__tests__'))) {
      const source = fs.readFileSync(file, 'utf8');
      for (const match of source.matchAll(/\bt\(\s*['"]([\w.]+)['"]/g)) {
        for (const [language, messages] of Object.entries(locales)) {
          if (lookup(messages, match[1]) === undefined) {
            missing.push(`${language}: ${match[1]} (${path.relative(srcDir, file)})`);
          }
        }
      }
    }
    expect(missing).toEqual([]);
  });
});

describe('service wave copy', () => {
  it('describes every chip in both languages without numbers or promises', async () => {
    const { serviceWaveContent } = await import('../content/serviceWaveContent');
    const { WAVE_ORDER } = await import('../components/home/serviceWaveLayout');

    for (const locale of ['en', 'ar']) {
      const copy = serviceWaveContent[locale];
      expect(Object.keys(copy.items).sort(), locale).toEqual([...WAVE_ORDER].sort());
      for (const [key, item] of Object.entries(copy.items)) {
        expect(item.label.length, `${locale} ${key} label`).toBeGreaterThan(1);
        expect(item.text.length, `${locale} ${key} text`).toBeGreaterThan(10);
        expect(item.text.length, `${locale} ${key} text`).toBeLessThanOrEqual(80);
        expect(item.text, `${locale} ${key} has a number`).not.toMatch(/[0-9٠-٩%]/u);
      }
      expect(Object.keys(copy.modes).sort()).toEqual(['consult', 'explain', 'order']);
      expect(Object.keys(copy.notePlaceholder).sort()).toEqual(['consult', 'explain', 'order']);
    }
    expect(Object.keys(serviceWaveContent.ar)).toEqual(Object.keys(serviceWaveContent.en));
  });
});
