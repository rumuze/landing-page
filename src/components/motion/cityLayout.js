/**
 * Where the product towers stand on the city grid. The slots are spread so that labels
 * do not collide, and the grid shrinks on narrow screens.
 */
const SLOTS = {
  7: [[1, 1], [5, 1], [1, 5], [5, 5]],
  5: [[1, 0], [4, 1], [0, 3], [3, 4]],
};

export const cityGridSize = (width) => (width < 520 ? 5 : 7);

export function towerSlots(gridSize, count) {
  const slots = SLOTS[gridSize] || SLOTS[7];
  return slots.slice(0, count);
}

/** Small deterministic hash in [0, 1) so the skyline is the same on every load. */
export function hash01(n) {
  let x = (n ^ 61) ^ (n >>> 16);
  x += x << 3;
  x ^= x >>> 4;
  x = Math.imul(x, 0x27d4eb2d);
  return ((x ^ (x >>> 15)) >>> 0) / 4294967296;
}

/**
 * Buildings for the grid: product towers at their slots, plain buildings everywhere else.
 * Heights are fractions of the maximum height; products that are still in development stand
 * lower and are drawn faded.
 */
export function buildCity(gridSize, products) {
  const slots = towerSlots(gridSize, products.length);
  const centre = (gridSize - 1) / 2;
  const buildings = [];
  for (let i = 0; i < gridSize; i += 1) {
    for (let j = 0; j < gridSize; j += 1) {
      const slotIndex = slots.findIndex(([si, sj]) => si === i && sj === j);
      const distance = Math.hypot(i - centre, j - centre);
      if (slotIndex >= 0) {
        const product = products[slotIndex];
        buildings.push({
          i,
          j,
          name: product.name,
          tower: true,
          pending: Boolean(product.pending),
          height: product.pending ? 0.58 : 1,
          delay: distance * 260,
          seed: i * 31 + j * 7,
        });
      } else {
        buildings.push({
          i,
          j,
          name: "",
          tower: false,
          pending: false,
          height: (0.18 + hash01(i * 17 + j * 5) * 0.4) * (1 - distance / (gridSize * 1.3)),
          delay: distance * 260,
          seed: i * 31 + j * 7,
        });
      }
    }
  }
  return buildings;
}

/**
 * Whether the point (x, y) is on a drawn building: its two side faces and its roof, which
 * together form a hexagon. `hit` is { cx, cy, hw, hh, h } for the building's footprint
 * centre, half footprint width and height, and drawn height. Hit-testing the drawn body,
 * not the ground plot beneath it, makes hovering a tall tower pick the tower.
 */
export function bodyContains({ cx, cy, hw, hh, h }, x, y) {
  const polygon = [
    [cx - hw, cy],
    [cx - hw, cy - h],
    [cx, cy - hh - h],
    [cx + hw, cy - h],
    [cx + hw, cy],
    [cx, cy + hh],
  ];
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
