/**
 * The scanner reveal that plays over a freshly generated QR code, as in the approved prototype:
 * faint dots mark where every module will be, a laser line sweeps down the code and each
 * module pops into place behind it, then a flash and four focus brackets close in on the
 * corners while the logo lands in the middle. Finally the overlay fades to the real code
 * underneath. All values are for progress `t` from 0 to 1 over SCAN_MS.
 */
export const SCAN_MS = 2000;

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const seg = (t, from, to) => clamp01((t - from) / (to - from));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
export const easeBack = (t) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export function scanFrame(t) {
  return {
    // How far down the code the laser has travelled (0 = top edge, 1 = bottom edge).
    scan: easeInOut(seg(t, 0.08, 0.76)),
    // Laser brightness: fades in at the top, fades out at the bottom.
    laser: Math.min(seg(t, 0.06, 0.12), 1 - seg(t, 0.74, 0.8)),
    // Once the laser has finished, modules still easing in are pushed to full size.
    settle: seg(t, 0.74, 0.82),
    // A short tint over the finished code.
    flash: Math.sin(seg(t, 0.78, 0.9) * Math.PI),
    // Brackets travel from outside the card (0) to its corners (1), then fade out.
    bracket: easeOut(seg(t, 0.78, 0.96)),
    bracketAlpha: seg(t, 0.78, 0.86) * (1 - seg(t, 0.94, 1)),
    // The logo landing, 0 to 1.
    logo: seg(t, 0.8, 0.96),
    // The overlay's own opacity: 1 until the very end, then it hands over to the real code.
    cover: 1 - seg(t, 0.94, 1),
    done: t >= 1,
  };
}

/** Size of a module that has `lag` pixels of laser travel behind it (`cell` is the module size). */
export function moduleScale(lag, cell, settle) {
  return easeBack(clamp01(lag / (cell * 5) + settle * 2));
}

// Share of a code the library lets a logo cover, by error-correction level.
const COVER_BY_LEVEL = { L: 0.07, M: 0.15, Q: 0.25, H: 0.3 };

/**
 * Where qr-code-styling puts the modules of a `count` x `count` code on a canvas, and which
 * modules it leaves out for the logo. This follows the library's own arithmetic, so the
 * overlay lines up with the real code underneath. `imageAspect` is the logo's height over width.
 */
export function qrGeometry({ width, height, margin, count, imageSize, level = 'Q', imageAspect = 1, imageMargin = 0 }) {
  const dot = Math.floor((Math.min(width, height) - margin * 2) / count);
  const x0 = Math.floor((width - count * dot) / 2);
  const y0 = Math.floor((height - count * dot) / 2);

  let hideX = 0;
  let hideY = 0;
  const maxHidden = Math.floor(imageSize * (COVER_BY_LEVEL[level] ?? 0.25) * count * count);
  if (imageSize > 0 && maxHidden > 0 && imageAspect > 0) {
    const maxAxis = count - 14;
    hideX = Math.floor(Math.sqrt(maxHidden / imageAspect));
    if (hideX <= 0) hideX = 1;
    if (maxAxis && maxAxis < hideX) hideX = maxAxis;
    if (hideX % 2 === 0) hideX -= 1;
    hideY = 1 + 2 * Math.ceil((hideX * imageAspect - 1) / 2);
    if (hideY * hideX > maxHidden || (maxAxis && maxAxis < hideY)) {
      if (maxAxis && maxAxis < hideY) {
        hideY = maxAxis;
        if (hideY % 2 === 0) hideX -= 1;
      } else {
        hideY -= 2;
      }
      hideX = 1 + 2 * Math.ceil((hideY / imageAspect - 1) / 2);
    }
  }
  return {
    dot,
    x0,
    y0,
    hideX,
    hideY,
    // The logo is drawn inside the hidden area, inset by its margin.
    logoWidth: Math.max(0, hideX * dot - 2 * imageMargin),
    logoHeight: Math.max(0, hideY * dot - 2 * imageMargin),
  };
}

/** Whether the module at (row, col) sits in the area left clear for the logo. */
export function isLogoModule(row, col, count, hideX, hideY) {
  return row >= (count - hideY) / 2 && row < (count + hideY) / 2 && col >= (count - hideX) / 2 && col < (count + hideX) / 2;
}

/** Whether the module belongs to one of the three corner finder patterns. */
export const isFinderModule = (row, col, count) =>
  (row < 7 && col < 7) || (row < 7 && col >= count - 7) || (row >= count - 7 && col < 7);

/**
 * Which corners of a data module are rounded, in the library's "rounded" dot style: a corner
 * is round when the two neighbours that meet at it are both missing. A lone module is a
 * circle, the end of a line has a round end, a straight run has square sides.
 * Returns [topLeft, topRight, bottomRight, bottomLeft].
 */
export function roundedCorners({ up, right, down, left }) {
  return [!up && !left, !up && !right, !down && !right, !down && !left];
}

/** "#rrggbb" or "#rgb" as an rgba() string; anything else comes back unchanged. */
export function withAlpha(color, alpha) {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color || '');
  if (!match) return color;
  const hex = match[1].length === 3 ? match[1].replace(/./g, (c) => c + c) : match[1];
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
