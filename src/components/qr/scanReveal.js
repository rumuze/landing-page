/**
 * Timing for the "scanner" reveal that plays over a freshly generated QR code: a laser line
 * sweeps down the code and uncovers it, then a flash and four focus brackets close in on the
 * corners. All values are for progress `t` from 0 to 1 over SCAN_MS.
 */
export const SCAN_MS = 1500;

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const seg = (t, from, to) => clamp01((t - from) / (to - from));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export function scanFrame(t) {
  return {
    // How far down the code the laser has travelled (0 = top edge, 1 = bottom edge).
    scan: easeInOut(seg(t, 0.08, 0.74)),
    // Laser brightness: fades in at the top, fades out at the bottom.
    laser: Math.min(seg(t, 0.06, 0.12), 1 - seg(t, 0.7, 0.76)),
    // A short tint over the finished code.
    flash: Math.sin(seg(t, 0.76, 0.9) * Math.PI),
    // Brackets travel from outside the card (0) to its corners (1), then fade out.
    bracket: easeOut(seg(t, 0.76, 0.94)),
    bracketAlpha: seg(t, 0.76, 0.84) * (1 - seg(t, 0.94, 1)),
    done: t >= 1,
  };
}

/** "#rrggbb" or "#rgb" as an rgba() string; anything else comes back unchanged. */
export function withAlpha(color, alpha) {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color || '');
  if (!match) return color;
  const hex = match[1].length === 3 ? match[1].replace(/./g, (c) => c + c) : match[1];
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
