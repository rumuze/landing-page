// Pure layout rules for the service wave: how many chips fit, in which rows, and where.
// Kept free of the DOM so the numbers can be unit-tested at any width.

/** Chips in the order they are kept as the screen gets smaller. */
export const WAVE_ORDER = [
  'erp',
  'crm',
  'odoo',
  'project',
  'websites',
  'seo',
  'mobile',
  'ads',
  'automation',
];

/** Services that work together; a thin line connects each pair. */
export const WAVE_LINKS = [
  ['erp', 'crm'],
  ['crm', 'odoo'],
  ['erp', 'odoo'],
  ['websites', 'seo'],
  ['websites', 'mobile'],
  ['ads', 'seo'],
  ['automation', 'crm'],
];

/** 0 = near, 1 = middle, 2 = far: depth changes parallax and softness, never size. */
export const WAVE_DEPTH = {
  erp: 0,
  crm: 1,
  odoo: 2,
  project: 0,
  websites: 2,
  seo: 1,
  mobile: 0,
  ads: 1,
  automation: 2,
};

const ROW_PAD_TOP = 36;
const LABEL_SPACE = 56;

function getWaveBreakpoint(width) {
  if (width >= 1000) return { rows: [5, 4], size: 64 };
  if (width >= 640) return { rows: [4, 4], size: 60 };
  if (width >= 400) return { rows: [3, 3], size: 56 };
  if (width >= 340) return { rows: [3, 3], size: 52 };
  if (width >= 280) return { rows: [3, 3], size: 46 };
  return { rows: [2, 2], size: 44 };
}

/**
 * Where each visible chip sits, measured from the top-left of the band.
 * `x` is the chip centre, `y` the top of the tile. In right-to-left pages the
 * rows are mirrored so the first service starts on the reading side.
 */
export function getWaveLayout(width, { rtl = false } = {}) {
  const { rows, size } = getWaveBreakpoint(width);
  const count = rows.reduce((sum, n) => sum + n, 0);
  const keys = WAVE_ORDER.slice(0, count);
  const gap = size + LABEL_SPACE;
  const equalRows = rows[0] === rows[1];
  const items = [];
  let index = 0;

  rows.forEach((perRow, row) => {
    for (let i = 0; i < perRow; i += 1) {
      const key = keys[index];
      index += 1;
      if (!key) continue;

      let x;
      if (equalRows) {
        x = (width / (perRow + 0.5)) * (i + 0.5 + (row % 2 ? 0.5 : 0));
      } else if (row === 0) {
        x = (width * (i + 0.5)) / perRow;
      } else {
        x = (width * (i + 1)) / (perRow + 1);
      }

      items.push({ key, x: rtl ? width - x : x, y: ROW_PAD_TOP + row * gap, depth: WAVE_DEPTH[key] });
    }
  });

  const height = ROW_PAD_TOP + rows.length * gap + (width < 640 ? 10 : 24);
  return { size, items, keys, height: Math.max(height, 300) };
}
