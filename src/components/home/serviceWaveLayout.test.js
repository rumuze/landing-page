import { describe, expect, it } from 'vitest';
import { WAVE_DEPTH, WAVE_LINKS, WAVE_ORDER, getWaveLayout } from './serviceWaveLayout';

describe('service wave layout', () => {
  it.each([
    [280, 6],
    [320, 6],
    [390, 6],
    [600, 6],
    [768, 8],
    [999, 8],
    [1000, 9],
    [1280, 9],
    [1920, 9],
    [2560, 9],
  ])('shows the right number of services at %ipx wide (%i)', (width, count) => {
    expect(getWaveLayout(width).items).toHaveLength(count);
  });

  it('keeps the most important services as the screen gets smaller', () => {
    const small = getWaveLayout(320).keys;
    expect(small).toEqual(['erp', 'crm', 'odoo', 'project', 'websites', 'seo']);
    expect(getWaveLayout(1280).keys).toEqual(WAVE_ORDER);
  });

  it.each([280, 320, 390, 640, 768, 1024, 1280, 1920, 2560])('keeps every chip inside the band and apart at %ipx', (width) => {
    const { items, size, height } = getWaveLayout(width);
    items.forEach((item) => {
      expect(item.x - size / 2, `${item.key} left edge`).toBeGreaterThanOrEqual(0);
      expect(item.x + size / 2, `${item.key} right edge`).toBeLessThanOrEqual(width);
      expect(item.y + size, `${item.key} bottom`).toBeLessThan(height);
    });
    items.forEach((a, i) => {
      items.slice(i + 1).forEach((b) => {
        const apartX = Math.abs(a.x - b.x) >= size + 8;
        const apartY = Math.abs(a.y - b.y) >= size + 24;
        expect(apartX || apartY, `${a.key} and ${b.key} overlap at ${width}px`).toBe(true);
      });
    });
  });

  it('mirrors the rows for right-to-left pages', () => {
    const ltr = getWaveLayout(1280, { rtl: false }).items;
    const rtl = getWaveLayout(1280, { rtl: true }).items;
    ltr.forEach((item, index) => {
      expect(rtl[index].key).toBe(item.key);
      expect(rtl[index].x).toBeCloseTo(1280 - item.x);
      expect(rtl[index].y).toBe(item.y);
    });
  });

  it('only links services that exist and gives each a depth', () => {
    WAVE_LINKS.forEach(([a, b]) => {
      expect(WAVE_ORDER).toContain(a);
      expect(WAVE_ORDER).toContain(b);
    });
    WAVE_ORDER.forEach((key) => expect([0, 1, 2]).toContain(WAVE_DEPTH[key]));
  });
});
