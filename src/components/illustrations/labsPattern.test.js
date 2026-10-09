import { describe, expect, it } from 'vitest';
import { DATA_CELLS, GRID, cellOn } from './labsPattern';
import { SCENES } from './scenes.generated';

describe('labs hero code', () => {
  it('keeps the finder squares clear and every cell on the grid', () => {
    expect(DATA_CELLS.every(({ x, y }) => x >= 0 && y >= 0 && x < GRID && y < GRID)).toBe(true);
    expect(DATA_CELLS.some(({ x, y }) => x < 3 && y < 3)).toBe(false);
    expect(DATA_CELLS.some(({ x, y }) => x >= 8 && y < 3)).toBe(false);
    expect(DATA_CELLS.some(({ x, y }) => x < 3 && y >= 8)).toBe(false);
  });

  it('draws the same code for the same seed and a different one for the next', () => {
    const draw = (seed) => DATA_CELLS.map(({ x, y }) => (cellOn(x, y, seed) ? 1 : 0)).join('');
    expect(draw(3)).toBe(draw(3));
    expect(draw(3)).not.toBe(draw(4));
  });

  it('starts the scene from seed 0 so the page matches what the server rendered', () => {
    const cells = [...SCENES.labs.body.matchAll(/data-x="(\d+)" data-y="(\d+)" data-on="([01])"/g)];
    expect(cells).toHaveLength(DATA_CELLS.length);
    cells.forEach(([, x, y, on]) => expect(on === '1').toBe(cellOn(Number(x), Number(y), 0)));
  });
});
