import { describe, expect, it } from 'vitest';
import {
  contrastRatio,
  extractPalette,
  hexToRgb,
  paletteToCss,
  readableOn,
  relativeLuminance,
  rgbToHex,
  rgbToHsl,
  wcagLevel,
} from './palette';

const pixels = (...blocks) => {
  const out = [];
  for (const [r, g, b, n, a = 255] of blocks) for (let i = 0; i < n; i += 1) out.push(r, g, b, a);
  return Uint8ClampedArray.from(out);
};

describe('colour notations', () => {
  it('converts between hex and rgb', () => {
    expect(rgbToHex({ r: 0, g: 107, b: 84 })).toBe('#006b54');
    expect(hexToRgb('#3CBF00')).toEqual({ r: 60, g: 191, b: 0 });
    expect(hexToRgb('3cbf00')).toEqual({ r: 60, g: 191, b: 0 });
    expect(hexToRgb('#fff')).toBeNull();
    expect(rgbToHex({ r: 300, g: -5, b: 12.4 })).toBe('#ff000c');
  });
  it('converts rgb to hsl', () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
    expect(rgbToHsl({ r: 0, g: 0, b: 255 })).toEqual({ h: 240, s: 100, l: 50 });
    expect(rgbToHsl({ r: 128, g: 128, b: 128 })).toEqual({ h: 0, s: 0, l: 50 });
  });
});

describe('contrast', () => {
  it('matches the WCAG reference values', () => {
    expect(relativeLuminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 5);
    expect(relativeLuminance({ r: 0, g: 0, b: 0 })).toBe(0);
    expect(contrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 })).toBeCloseTo(21, 5);
    // #767676 on white is the well known smallest grey that passes AA for body text.
    expect(contrastRatio(hexToRgb('#767676'), { r: 255, g: 255, b: 255 })).toBeCloseTo(4.54, 2);
    expect(contrastRatio({ r: 9, g: 9, b: 9 }, { r: 9, g: 9, b: 9 })).toBe(1);
  });
  it('grades the ratio', () => {
    expect(wcagLevel(7.2)).toBe('AAA');
    expect(wcagLevel(4.6)).toBe('AA');
    expect(wcagLevel(4.4)).toBe('fail');
    expect(wcagLevel(3.2, true)).toBe('AA');
    expect(wcagLevel(2.9, true)).toBe('fail');
    expect(wcagLevel(4.6, true)).toBe('AAA');
  });
  it('picks white or black text', () => {
    expect(readableOn({ r: 0, g: 0, b: 60 })).toEqual({ r: 255, g: 255, b: 255 });
    expect(readableOn({ r: 240, g: 240, b: 100 })).toEqual({ r: 0, g: 0, b: 0 });
  });
});

describe('extractPalette', () => {
  it('finds the two colours of a two-colour picture with their shares', () => {
    const palette = extractPalette(pixels([200, 30, 30, 75], [20, 20, 200, 25]), 2);
    expect(palette.map((color) => color.hex)).toEqual(['#c81e1e', '#1414c8']);
    expect(palette[0].share).toBeCloseTo(0.75, 5);
    expect(palette[1].share).toBeCloseTo(0.25, 5);
  });
  it('returns fewer colours when the picture has fewer', () => {
    expect(extractPalette(pixels([10, 200, 10, 40]), 5)).toHaveLength(1);
  });
  it('ignores transparent pixels and an empty image', () => {
    expect(extractPalette(pixels([255, 0, 0, 50, 0], [0, 255, 0, 10]), 3).map((color) => color.hex)).toEqual(['#00ff00']);
    expect(extractPalette(new Uint8ClampedArray(), 4)).toEqual([]);
  });
  it('shares add up to one and colours come most common first', () => {
    const palette = extractPalette(pixels([250, 250, 250, 60], [10, 10, 10, 30], [200, 40, 40, 10]), 3);
    expect(palette.reduce((sum, color) => sum + color.share, 0)).toBeCloseTo(1, 5);
    expect([...palette].sort((x, y) => y.share - x.share)).toEqual(palette);
    expect(palette[0].hex).toBe('#fafafa');
  });
});

describe('paletteToCss', () => {
  it('writes one custom property per colour', () => {
    expect(paletteToCss([{ hex: '#111111' }, { hex: '#222222' }])).toBe(':root {\n  --color-1: #111111;\n  --color-2: #222222;\n}');
  });
});
