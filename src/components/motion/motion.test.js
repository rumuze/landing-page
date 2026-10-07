import { describe, it, expect } from 'vitest';
import { buildWeaveGraph, nearestVertex } from './weaveGraph';
import { decodeFrame } from './decodeText';
import { buildCity, cityGridSize, towerSlots } from './cityLayout';
import { MORPH_SHAPES } from './morphShapes';
import { homeContent } from '../../content/homeContent';

describe('weave graph', () => {
  const { vertices, edges } = buildWeaveGraph(640, 320, 64);

  it('is one shared network: every edge joins two real vertices, none repeat', () => {
    expect(edges.length).toBeGreaterThan(100);
    const seen = new Set();
    for (const edge of edges) {
      expect(vertices[edge.a]).toBeTruthy();
      expect(vertices[edge.b]).toBeTruthy();
      const key = edge.a < edge.b ? `${edge.a}_${edge.b}` : `${edge.b}_${edge.a}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    }
  });

  it('shares vertices between neighbouring cells instead of duplicating them', () => {
    const cells = (Math.ceil(640 / 64) + 1) * (Math.ceil(320 / 64) + 1);
    expect(vertices.length).toBeLessThan(cells * 12);
    expect(vertices.some((v) => v.edges.length >= 4)).toBe(true);
  });

  it('finds the nearest vertex, or none when too far', () => {
    const target = vertices[10];
    expect(nearestVertex(vertices, target.x + 1, target.y + 1, 20)).toBe(10);
    expect(nearestVertex(vertices, -500, -500, 20)).toBe(-1);
  });
});

describe('decodeFrame', () => {
  const word = 'نبني';
  it('shows the real word at full progress and keeps length and spaces while scrambling', () => {
    expect(decodeFrame(word, 1)).toBe(word);
    const mid = decodeFrame('we build', 0.2, { random: () => 0 });
    expect(Array.from(mid)).toHaveLength(8);
    expect(mid[2]).toBe(' ');
  });
  it('settles right to left for Arabic and left to right otherwise', () => {
    const ltr = decodeFrame('abcd', 0.45, { random: () => 0 });
    const rtl = decodeFrame('abcd', 0.45, { rtl: true, random: () => 0 });
    expect(ltr.startsWith('a')).toBe(true);
    expect(ltr.endsWith('d')).toBe(false);
    expect(rtl.endsWith('d')).toBe(true);
    expect(rtl.startsWith('a')).toBe(false);
  });
});

describe('city layout', () => {
  const products = homeContent.en.work.cards.map((card) => ({ name: card.title, pending: Boolean(card.status) }));

  it('stands one tower per product, on distinct plots inside the grid', () => {
    for (const size of [5, 7]) {
      const slots = towerSlots(size, products.length);
      expect(new Set(slots.map((s) => s.join(','))).size).toBe(products.length);
      for (const [i, j] of slots) {
        expect(i).toBeGreaterThanOrEqual(0);
        expect(i).toBeLessThan(size);
        expect(j).toBeGreaterThanOrEqual(0);
        expect(j).toBeLessThan(size);
      }
      const city = buildCity(size, products);
      expect(city).toHaveLength(size * size);
      expect(city.filter((b) => b.tower).map((b) => b.name).sort()).toEqual(products.map((p) => p.name).sort());
    }
  });

  it('draws products still in development lower than finished ones', () => {
    const city = buildCity(7, products);
    const pending = city.find((b) => b.tower && b.pending);
    const done = city.find((b) => b.tower && !b.pending);
    expect(pending.height).toBeLessThan(done.height);
  });

  it('uses a smaller grid on narrow screens', () => {
    expect(cityGridSize(360)).toBe(5);
    expect(cityGridSize(1200)).toBe(7);
  });
});

describe('morph shapes and the copy that feeds the new visuals', () => {
  const capabilityCards = homeContent.en.capabilities.groups.flatMap((group) => group.cards);

  it('has one outline for every capability card', () => {
    expect(MORPH_SHAPES).toHaveLength(capabilityCards.length);
    for (const paths of MORPH_SHAPES) expect(paths.length).toBeGreaterThan(0);
  });

  it('has a gate for each "what happens next" step and the x-ray strings, in both languages', () => {
    for (const lang of ['en', 'ar']) {
      const copy = homeContent[lang];
      expect(copy.finalCta.gates).toHaveLength(copy.finalCta.nextSteps.length);
      for (const key of ['label', 'hint', 'brand', 'status', 'order', 'chat', 'deliver', 'lock']) {
        expect(copy.engineering.xray[key], `${lang} xray ${key}`).toBeTruthy();
      }
      expect(copy.work.cityLabel).toBeTruthy();
      expect(copy.capabilities.visualLabel).toBeTruthy();
    }
  });
});
