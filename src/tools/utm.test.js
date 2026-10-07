import { describe, expect, it } from 'vitest';
import { UTM_PRESETS, buildUtmUrl, normalizeValue, parseTargetUrl } from './utm';

describe('normalizeValue', () => {
  it('lower-cases and joins words with underscores by default', () => {
    expect(normalizeValue('  Ramadan Sale 2026 ')).toBe('ramadan_sale_2026');
  });
  it('can keep case and spaces', () => {
    expect(normalizeValue('Ramadan Sale', { lowercase: false, underscores: false })).toBe('Ramadan Sale');
  });
  it('leaves Arabic text alone apart from the spaces', () => {
    expect(normalizeValue('عرض رمضان')).toBe('عرض_رمضان');
  });
});

describe('parseTargetUrl', () => {
  it('adds https when the scheme is missing', () => {
    const result = parseTargetUrl('rumuze.com/services');
    expect(result.ok).toBe(true);
    expect(result.url.href).toBe('https://rumuze.com/services');
  });
  it('rejects empty, malformed and non-web addresses', () => {
    expect(parseTargetUrl('')).toEqual({ ok: false, error: 'empty' });
    expect(parseTargetUrl('not a url')).toEqual({ ok: false, error: 'invalid' });
    expect(parseTargetUrl('localdomain')).toEqual({ ok: false, error: 'invalid' });
    expect(parseTargetUrl('ftp://rumuze.com')).toEqual({ ok: false, error: 'protocol' });
    expect(parseTargetUrl('javascript://rumuze.com/%0Aalert(1)')).toEqual({ ok: false, error: 'protocol' });
  });
});

describe('buildUtmUrl', () => {
  const base = { url: 'https://rumuze.com/services', source: 'Google', medium: 'CPC', campaign: 'Ramadan Sale' };

  it('adds the three required parameters, normalised, in order', () => {
    const result = buildUtmUrl(base);
    expect(result.ok).toBe(true);
    expect(result.url).toBe('https://rumuze.com/services?utm_source=google&utm_medium=cpc&utm_campaign=ramadan_sale');
    expect(result.params.map(([key]) => key)).toEqual(['utm_source', 'utm_medium', 'utm_campaign']);
  });

  it('adds term and content only when given', () => {
    const result = buildUtmUrl({ ...base, term: 'web design', content: 'banner A' });
    expect(result.url).toContain('utm_term=web_design');
    expect(result.url).toContain('utm_content=banner_a');
  });

  it('keeps existing parameters and the fragment, and replaces old utm_ ones', () => {
    const result = buildUtmUrl({ ...base, url: 'rumuze.com/p?ref=a&utm_source=old&UTM_Medium=old#pricing' });
    expect(result.ok).toBe(true);
    const url = new URL(result.url);
    expect(url.searchParams.get('ref')).toBe('a');
    expect(url.searchParams.getAll('utm_source')).toEqual(['google']);
    expect(url.searchParams.has('UTM_Medium')).toBe(false);
    expect(url.hash).toBe('#pricing');
    expect(result.url.endsWith('#pricing')).toBe(true);
  });

  it('percent-encodes Arabic values', () => {
    const result = buildUtmUrl({ ...base, campaign: 'عرض رمضان' });
    expect(result.ok).toBe(true);
    expect(new URL(result.url).searchParams.get('utm_campaign')).toBe('عرض_رمضان');
    expect(result.url).toContain('%D8%B9');
  });

  it('can keep case as typed', () => {
    const result = buildUtmUrl(base, { lowercase: false });
    expect(result.url).toContain('utm_source=Google');
  });

  it('reports every missing field at once', () => {
    expect(buildUtmUrl({ url: '', source: '', medium: ' ', campaign: '' })).toEqual({
      ok: false,
      errors: { url: 'empty', source: 'required', medium: 'required', campaign: 'required' },
    });
  });
});

describe('UTM_PRESETS', () => {
  it('uses values that are already normalised, so choosing one never changes it', () => {
    for (const preset of UTM_PRESETS) {
      expect(normalizeValue(preset.source), preset.id).toBe(preset.source);
      expect(normalizeValue(preset.medium), preset.id).toBe(preset.medium);
    }
  });
});
