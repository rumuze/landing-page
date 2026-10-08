// CSS unit helpers: pixels to rem and back, a type scale, and fluid sizes written as clamp().

export const DEFAULT_BASE = 16;

/** Rounds to at most `digits` decimals and drops trailing zeros, so 1.5000 is shown as 1.5. */
export function trim(value, digits = 4) {
  if (!Number.isFinite(value)) return '0';
  const rounded = Number(value.toFixed(digits));
  return String(Object.is(rounded, -0) ? 0 : rounded);
}

export const pxToRem = (px, base = DEFAULT_BASE) => px / base;
export const remToPx = (rem, base = DEFAULT_BASE) => rem * base;

/** A positive number from text typed with Arabic or Latin digits, or null. */
export function parseNumber(text) {
  const latin = String(text ?? '')
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x6f0))
    .replace(/[٫،,]/g, '.')
    .trim();
  if (!/^\d*\.?\d+$|^\d+\.$/.test(latin)) return null;
  const value = Number(latin);
  return Number.isFinite(value) ? value : null;
}

/** One value in px, rem and em, all from the same base size. */
export function convert(value, from, base = DEFAULT_BASE) {
  const px = from === 'px' ? value : value * base;
  return { px, rem: px / base, em: px / base };
}

export const SCALE_RATIOS = { minorThird: 1.2, majorThird: 1.25, perfectFourth: 1.333, goldenRatio: 1.618 };

/** Steps of a modular scale around a base size: -2 … +5. */
export function typeScale(basePx, ratio, base = DEFAULT_BASE) {
  return [-2, -1, 0, 1, 2, 3, 4, 5].map((step) => {
    const px = basePx * ratio ** step;
    return { step, px, rem: px / base };
  });
}

/**
 * A size that grows smoothly with the screen: `minPx` at `minWidth` and `maxPx` at `maxWidth`,
 * written as clamp(). Returns the CSS and the numbers behind it.
 */
export function fluidClamp({ minPx, maxPx, minWidth, maxWidth, base = DEFAULT_BASE }) {
  let low = minPx;
  let high = maxPx;
  let from = minWidth;
  let to = maxWidth;
  if (low > high) [low, high] = [high, low];
  if (from > to) [from, to] = [to, from];
  const lowRem = trim(low / base);
  const highRem = trim(high / base);
  if (low === high || from === to) {
    return { css: `${lowRem}rem`, fixed: true, slope: 0, intercept: low, low, high, from, to };
  }
  const slope = (high - low) / (to - from);
  const intercept = low - slope * from;
  const offset = `${intercept < 0 ? '-' : ''}${trim(Math.abs(intercept) / base)}rem`;
  const css = `clamp(${lowRem}rem, ${offset} + ${trim(slope * 100)}vw, ${highRem}rem)`;
  return { css, fixed: false, slope, intercept, low, high, from, to };
}

/** The size, in px, that a fluid rule gives at a screen width. */
export function sizeAt(rule, width) {
  if (rule.fixed) return rule.low;
  return Math.min(rule.high, Math.max(rule.low, rule.intercept + rule.slope * width));
}

export const COMMON_PX = [10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 64];
