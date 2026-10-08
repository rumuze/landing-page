import { describe, expect, it } from 'vitest';
import { SIZES, buildIco, cornerRadius, glyphOf, glyphScale, headWithColor, isHex, manifestJson } from './favicon';

describe('shapes and glyphs', () => {
  it('draws each shape with its own corner radius', () => {
    expect(cornerRadius('square', 100)).toBe(0);
    expect(cornerRadius('rounded', 100)).toBe(22);
    expect(cornerRadius('circle', 100)).toBe(50);
  });

  it('keeps the first two whole characters, emoji and Arabic included', () => {
    expect(glyphOf('  rumuze ')).toBe('ru');
    expect(glyphOf('رموز')).toBe('رم');
    expect(glyphOf('🚀 go')).toBe('🚀 ');
    expect(glyphOf('')).toBe('');
    expect(glyphOf(null)).toBe('');
  });

  it('makes one character larger than two', () => {
    expect(glyphScale('R')).toBeGreaterThan(glyphScale('Ru'));
  });

  it('lists the sizes browsers and phones ask for', () => {
    expect(SIZES.map((item) => item.size)).toEqual([16, 32, 180, 192, 512]);
    expect(new Set(SIZES.map((item) => item.file)).size).toBe(SIZES.length);
  });
});

describe('buildIco', () => {
  it('writes a valid directory around the images', () => {
    const a = new Uint8Array([1, 2, 3]);
    const b = new Uint8Array([4, 5, 6, 7]);
    const ico = buildIco([
      { size: 16, data: a },
      { size: 32, data: b },
    ]);
    const view = new DataView(ico.buffer);
    expect(view.getUint16(0, true)).toBe(0);
    expect(view.getUint16(2, true)).toBe(1);
    expect(view.getUint16(4, true)).toBe(2);
    expect(ico[6]).toBe(16);
    expect(ico[22]).toBe(32);
    expect(view.getUint32(6 + 8, true)).toBe(3);
    expect(view.getUint32(6 + 12, true)).toBe(38);
    expect(Array.from(ico.slice(38, 41))).toEqual([1, 2, 3]);
    expect(Array.from(ico.slice(41))).toEqual([4, 5, 6, 7]);
    expect(ico.length).toBe(45);
  });
});

describe('text outputs', () => {
  it('fills the theme colour and falls back on a bad one', () => {
    expect(headWithColor('#112233')).toContain('content="#112233"');
    expect(headWithColor('red')).toContain('content="#000000"');
    expect(headWithColor('#112233', { withIco: false })).not.toContain('favicon.ico');
  });

  it('writes a manifest with both Android icons and a short name', () => {
    const manifest = JSON.parse(manifestJson({ name: 'A very long site name indeed', color: '#abcdef' }));
    expect(manifest.icons).toHaveLength(2);
    expect(manifest.short_name.length).toBeLessThanOrEqual(12);
    expect(manifest.theme_color).toBe('#abcdef');
    expect(JSON.parse(manifestJson({ name: '', color: 'x' })).name).toBe('My site');
  });

  it('checks hex colours', () => {
    expect(isHex('#00aaFF')).toBe(true);
    expect(isHex('#fff')).toBe(false);
  });
});
