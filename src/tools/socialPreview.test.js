import { describe, expect, it } from 'vitest';
import { EXAMPLE, buildMetaTags, domainOf, lengthStatus, tokenizeHtmlLine } from './socialPreview';

describe('domainOf', () => {
  it('gives the host without www', () => {
    expect(domainOf('https://www.example.com/a/b?x=1')).toBe('example.com');
    expect(domainOf('example.sa/page')).toBe('example.sa');
    expect(domainOf('javascript:alert(1)')).toBe('');
    expect(domainOf('')).toBe('');
  });
});

describe('lengthStatus', () => {
  it('compares the number of characters with the range', () => {
    const range = { min: 5, max: 10 };
    expect(lengthStatus('', range)).toBe('empty');
    expect(lengthStatus('  ', range)).toBe('empty');
    expect(lengthStatus('abc', range)).toBe('short');
    expect(lengthStatus('abcdef', range)).toBe('good');
    expect(lengthStatus('abcdefghijk', range)).toBe('long');
    expect(lengthStatus('مرحبا بكم', range)).toBe('good');
  });
});

describe('buildMetaTags', () => {
  it('writes the Open Graph and Twitter tags', () => {
    const tags = buildMetaTags({ ...EXAMPLE, locale: 'en_US' });
    expect(tags).toContain('<meta property="og:title" content="Example Studio: websites and stores for growing brands">');
    expect(tags).toContain('<meta property="og:url" content="https://example.com">');
    expect(tags).toContain('<meta property="og:image" content="https://example.com/share.jpg">');
    expect(tags).toContain('<meta property="og:locale" content="en_US">');
    expect(tags).toContain('<meta name="twitter:card" content="summary_large_image">');
  });
  it('uses the small card when there is no image, and leaves out empty tags', () => {
    const tags = buildMetaTags({ title: 'T', description: '', url: '', imageUrl: '' });
    expect(tags).toContain('content="summary"');
    expect(tags).not.toContain('og:image');
    expect(tags).not.toContain('og:description');
    expect(tags).not.toContain('og:url');
  });
  it('escapes text and refuses an address that is not a web address', () => {
    const tags = buildMetaTags({ title: '"><script>alert(1)</script>', description: 'a & b', url: 'javascript:alert(1)', imageUrl: 'data:image/png;base64,AAAA' });
    expect(tags).not.toContain('<script>');
    expect(tags).toContain('&quot;&gt;&lt;script&gt;');
    expect(tags).toContain('a &amp; b');
    expect(tags).not.toContain('javascript:');
    expect(tags).not.toContain('data:');
  });
  it('gives nothing for an empty form', () => {
    expect(buildMetaTags({ title: '', description: '', url: '', imageUrl: '' })).toBe('');
  });
});

describe('tokenizeHtmlLine', () => {
  it('colours the tag, the attributes and the values, and keeps the text whole', () => {
    const line = '<meta property="og:title" content="A &amp; B">';
    const tokens = tokenizeHtmlLine(line);
    expect(tokens.map((token) => token.text).join('')).toBe(line);
    expect(tokens.filter((token) => token.type !== 'space').map((token) => [token.type, token.text])).toEqual([
      ['tag', '<meta'],
      ['key', 'property'],
      ['punct', '='],
      ['string', '"og:title"'],
      ['key', 'content'],
      ['punct', '='],
      ['string', '"A &amp; B"'],
      ['punct', '>'],
    ]);
  });
});
