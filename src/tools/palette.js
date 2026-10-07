// Pure logic for the palette-from-image tool: picking the main colours of a picture, converting
// them between notations, and checking how readable text is on each one (WCAG 2 contrast).

const clamp255 = (value) => Math.max(0, Math.min(255, Math.round(value)));
const hex2 = (value) => clamp255(value).toString(16).padStart(2, '0');

export const rgbToHex = ({ r, g, b }) => `#${hex2(r)}${hex2(g)}${hex2(b)}`;

export function hexToRgb(hex) {
  const match = /^#?([0-9a-f]{6})$/i.exec(String(hex ?? '').trim());
  if (!match) return null;
  const value = Number.parseInt(match[1], 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

export function rgbToHsl({ r, g, b }) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(lightness * 100) };
  const delta = max - min;
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue;
  if (max === red) hue = (green - blue) / delta + (green < blue ? 6 : 0);
  else if (max === green) hue = (blue - red) / delta + 2;
  else hue = (red - green) / delta + 4;
  return { h: Math.round(hue * 60) % 360, s: Math.round(saturation * 100), l: Math.round(lightness * 100) };
}

/** WCAG relative luminance, 0 (black) to 1 (white). */
export function relativeLuminance({ r, g, b }) {
  const channel = (value) => {
    const unit = value / 255;
    return unit <= 0.03928 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** WCAG contrast ratio between two colours, 1 to 21. */
export function contrastRatio(a, b) {
  const [light, dark] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

/** 'AAA', 'AA' or 'fail' for normal-size text, 'AA' also for large text from 3:1. */
export function wcagLevel(ratio, large = false) {
  if (ratio >= (large ? 4.5 : 7)) return 'AAA';
  if (ratio >= (large ? 3 : 4.5)) return 'AA';
  return 'fail';
}

const WHITE = { r: 255, g: 255, b: 255 };
const BLACK = { r: 0, g: 0, b: 0 };

/** Whichever of white and black reads better on `color`. */
export function readableOn(color) {
  return contrastRatio(color, WHITE) >= contrastRatio(color, BLACK) ? WHITE : BLACK;
}

/**
 * The `count` main colours of an image, most common first, with the share of the picture each one
 * stands for. `data` is RGBA pixels (from a canvas); transparent pixels are ignored. Uses median cut:
 * the pixels are split in two along the colour channel that varies most until there are `count` groups, and
 * each group is averaged. The cut is made in the middle of the range of that channel.
 */
export function extractPalette(data, count = 5) {
  const pixels = [];
  for (let i = 0; i + 3 < data.length; i += 4) {
    if (data[i + 3] >= 125) pixels.push([data[i], data[i + 1], data[i + 2]]);
  }
  if (!pixels.length) return [];

  const rangeOf = (group) => {
    const lows = [255, 255, 255];
    const highs = [0, 0, 0];
    for (const pixel of group) {
      for (let channel = 0; channel < 3; channel += 1) {
        if (pixel[channel] < lows[channel]) lows[channel] = pixel[channel];
        if (pixel[channel] > highs[channel]) highs[channel] = pixel[channel];
      }
    }
    const spans = highs.map((high, channel) => high - lows[channel]);
    const widest = spans.indexOf(Math.max(...spans));
    return { widest, span: spans[widest], low: lows[widest], high: highs[widest] };
  };

  let groups = [pixels];
  while (groups.length < count) {
    // Split the group with the widest spread, and stop when nothing is left to split.
    let best = -1;
    let bestSpan = 0;
    groups.forEach((group, index) => {
      if (group.length < 2) return;
      const { span } = rangeOf(group);
      const weighted = span * Math.sqrt(group.length);
      if (span > 0 && weighted > bestSpan) {
        best = index;
        bestSpan = weighted;
      }
    });
    if (best < 0) break;
    const group = groups[best];
    const { widest, low, high } = rangeOf(group);
    // Cut in the middle of the colour range, not at the middle of the pixel count, so a small area of a
    // distinct colour is not mixed into a large area of another.
    const cut = (low + high) / 2;
    const below = group.filter((pixel) => pixel[widest] <= cut);
    const above = group.filter((pixel) => pixel[widest] > cut);
    groups = [...groups.slice(0, best), below, above, ...groups.slice(best + 1)];
  }

  return groups
    .map((group) => {
      const sum = group.reduce((total, pixel) => [total[0] + pixel[0], total[1] + pixel[1], total[2] + pixel[2]], [0, 0, 0]);
      const color = { r: clamp255(sum[0] / group.length), g: clamp255(sum[1] / group.length), b: clamp255(sum[2] / group.length) };
      return { ...color, hex: rgbToHex(color), share: group.length / pixels.length };
    })
    .sort((x, y) => y.share - x.share);
}

/** The palette as CSS custom properties, one per colour. */
export function paletteToCss(colors) {
  return `:root {\n${colors.map((color, index) => `  --color-${index + 1}: ${color.hex};`).join('\n')}\n}`;
}
