// The QR block in the /labs hero: an 11 x 11 grid with three finder squares and data cells that can be redrawn.
export const GRID = 11;
export const CELL = 0.3;
export const FINDERS = [[0, 0], [8, 0], [0, 8]];

const inFinderZone = (x, y) => (x < 4 && y < 4) || (x >= 7 && y < 4) || (x < 4 && y >= 7);

/** Every grid cell that can hold a data module. */
export const DATA_CELLS = Array.from({ length: GRID * GRID }, (_, i) => ({ x: i % GRID, y: Math.floor(i / GRID) })).filter(({ x, y }) => !inFinderZone(x, y));

/** Whether the module at (x, y) is drawn for a given seed. Same input, same answer. */
export const cellOn = (x, y, seed) => ((((x + 1) * 73856093) ^ ((y + 1) * 19349663) ^ ((seed + 1) * 83492791)) >>> 0) % 100 < 52;
