import { describe, expect, it } from 'vitest';
import { readPrefilledUrl } from './prefill';

describe('readPrefilledUrl', () => {
  it('reads an encoded http or https address', () => {
    const url = 'https://wa.me/966551234567?text=' + encodeURIComponent('مرحبا بك');
    expect(readPrefilledUrl(`?url=${encodeURIComponent(url)}`)).toBe(url);
    expect(readPrefilledUrl('?url=http%3A%2F%2Fexample.com')).toBe('http://example.com');
  });

  it('ignores anything that is not a web address', () => {
    expect(readPrefilledUrl('')).toBe('');
    expect(readPrefilledUrl('?other=1')).toBe('');
    expect(readPrefilledUrl('?url=')).toBe('');
    expect(readPrefilledUrl('?url=not%20a%20url')).toBe('');
    expect(readPrefilledUrl('?url=javascript%3Aalert(1)')).toBe('');
    expect(readPrefilledUrl('?url=data%3Atext%2Fhtml%2Cx')).toBe('');
  });

  it('ignores an address that is far too long', () => {
    expect(readPrefilledUrl(`?url=${encodeURIComponent('https://example.com/' + 'a'.repeat(2100))}`)).toBe('');
  });
});
