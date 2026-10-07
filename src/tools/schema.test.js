import { describe, expect, it } from 'vitest';
import {
  EXAMPLES,
  buildSchema,
  checkSchema,
  isIsoDate,
  isWebUrl,
  readiness,
  serializeSchema,
  tokenizeLine,
} from './schema';

describe('validators', () => {
  it('checks web addresses and dates', () => {
    expect(isWebUrl('https://example.com/a')).toBe(true);
    expect(isWebUrl('example.com')).toBe(false);
    expect(isWebUrl('javascript:alert(1)')).toBe(false);
    expect(isIsoDate('2026-02-28')).toBe(true);
    expect(isIsoDate('2026-02-30')).toBe(false);
    expect(isIsoDate('28/02/2026')).toBe(false);
  });
});

describe('buildSchema', () => {
  it('builds an Organization and leaves empty fields out', () => {
    const schema = buildSchema('Organization', { name: ' Acme ', url: 'https://acme.com', logo: '', sameAs: 'https://x.com/acme\n\n' });
    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Acme',
      url: 'https://acme.com',
      sameAs: ['https://x.com/acme'],
    });
  });
  it('nests the address of a LocalBusiness and upper-cases the country', () => {
    const schema = buildSchema('LocalBusiness', { name: 'Cafe', street: '1 Road', city: 'Riyadh', country: 'sa' });
    expect(schema.address).toEqual({
      '@type': 'PostalAddress',
      streetAddress: '1 Road',
      addressLocality: 'Riyadh',
      addressCountry: 'SA',
    });
  });
  it('keeps only complete question and answer pairs in an FAQPage', () => {
    const schema = buildSchema('FAQPage', { faq: [{ q: 'Q1', a: 'A1' }, { q: 'Q2', a: '' }, { q: '', a: '' }] });
    expect(schema.mainEntity).toHaveLength(1);
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe('A1');
  });
  it('builds an Article with a Person author', () => {
    const schema = buildSchema('Article', EXAMPLES.Article);
    expect(schema.author).toEqual({ '@type': 'Person', name: 'Example Team' });
    expect(schema.mainEntityOfPage).toBe('https://example.com/blog/choose-platform');
  });
});

describe('checkSchema and readiness', () => {
  it('flags missing, invalid and long values', () => {
    const results = checkSchema('Article', { headline: 'x'.repeat(120), author: '', datePublished: '2026-13-01', image: 'nope' });
    const status = Object.fromEntries(results.map((item) => [item.id, item.status]));
    expect(status).toMatchObject({ headline: 'long', author: 'missing', datePublished: 'invalid', image: 'invalid', url: 'missing' });
  });
  it('is fully ready for every example', () => {
    for (const type of Object.keys(EXAMPLES)) {
      expect(readiness(type, EXAMPLES[type])).toBe(1);
      expect(checkSchema(type, EXAMPLES[type]).every((item) => item.status === 'ok')).toBe(true);
    }
  });
  it('is not ready when empty', () => {
    expect(readiness('Organization', {})).toBe(0);
    expect(checkSchema('FAQPage', {})).toEqual([{ id: 'faq', level: 'required', status: 'missing' }]);
  });
  it('marks a half-filled FAQ pair as invalid', () => {
    expect(checkSchema('FAQPage', { faq: [{ q: 'Q', a: '' }] })[0].status).toBe('invalid');
  });
});

describe('serializeSchema', () => {
  it('wraps the JSON in a script tag', () => {
    const text = serializeSchema(buildSchema('Organization', { name: 'A', url: 'https://a.com' }));
    expect(text.startsWith('<script type="application/ld+json">\n{')).toBe(true);
    expect(text.endsWith('}\n</script>')).toBe(true);
  });
  it('can not be closed early by a value', () => {
    const text = serializeSchema({ name: '</script><img src=x onerror=alert(1)>' });
    expect(text.slice(0, -'</script>'.length)).not.toContain('</script');
    expect(text).toContain('\\u003c/script>');
  });
});

describe('tokenizeLine', () => {
  it('separates keys, strings and punctuation', () => {
    const tokens = tokenizeLine('  "name": "Acme",');
    expect(tokens.filter((t) => t.type !== 'space').map((t) => [t.type, t.text])).toEqual([
      ['key', '"name"'],
      ['punct', ':'],
      ['string', '"Acme"'],
      ['punct', ','],
    ]);
    expect(tokens.map((t) => t.text).join('')).toBe('  "name": "Acme",');
  });
  it('recognises the script tags', () => {
    expect(tokenizeLine('<script type="application/ld+json">')[0].type).toBe('tag');
  });
});
