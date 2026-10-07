import { useLayoutEffect, useRef } from 'react';
import {
  SCAN_MS,
  easeBack,
  isFinderModule,
  isLogoModule,
  moduleScale,
  qrGeometry,
  roundedCorners,
  scanFrame,
  withAlpha,
} from './scanReveal';

const LIME = '#3CBF00';
const LOGO_URL = '/rumuze-logo-master.png';

// The same logo the code itself carries. Loading it ahead of time means it is ready to land
// in the animation, and that its proportions are known when the layout is worked out.
let logoImage = null;
const getLogo = () => {
  if (!logoImage && typeof Image !== 'undefined') {
    logoImage = new Image();
    logoImage.src = LOGO_URL;
  }
  return logoImage;
};

/**
 * What the overlay needs to know about the code that is underneath: its modules (read from
 * the generator's own matrix, so the animation draws the real code) and where it puts them.
 * Returns null if the library does not expose them, and the overlay falls back to a plain
 * cover that the laser pulls away.
 */
function readModel(qrCode, canvasWidth, canvasHeight) {
  try {
    const matrix = qrCode?._qr;
    const options = qrCode?._options;
    if (!matrix || typeof matrix.getModuleCount !== 'function' || typeof matrix.isDark !== 'function') return null;
    const count = matrix.getModuleCount();
    const logo = getLogo();
    const imageAspect = logo && logo.naturalWidth ? logo.naturalHeight / logo.naturalWidth : 1;
    const geometry = qrGeometry({
      width: options?.width ?? canvasWidth,
      height: options?.height ?? canvasHeight,
      margin: options?.margin ?? 0,
      count,
      imageSize: options?.image ? options?.imageOptions?.imageSize ?? 0 : 0,
      level: options?.qrOptions?.errorCorrectionLevel,
      imageAspect,
      imageMargin: options?.imageOptions?.margin ?? 0,
    });
    if (!geometry.dot) return null;
    // Data modules only: the corner patterns are drawn whole, and the logo's area is clear.
    const isData = (row, col) =>
      row >= 0 &&
      col >= 0 &&
      row < count &&
      col < count &&
      !isFinderModule(row, col, count) &&
      !isLogoModule(row, col, count, geometry.hideX, geometry.hideY) &&
      Boolean(matrix.isDark(row, col));
    const centre = (index) => geometry.x0 + index * geometry.dot + geometry.dot / 2;
    const modules = [];
    const dots = [];
    for (let row = 0; row < count; row += 1) {
      for (let col = 0; col < count; col += 1) {
        dots.push([centre(col), geometry.y0 + row * geometry.dot + geometry.dot / 2]);
        if (isFinderModule(row, col, count) || isLogoModule(row, col, count, geometry.hideX, geometry.hideY)) continue;
        const dark = isData(row, col);
        modules.push({
          x: centre(col),
          y: geometry.y0 + row * geometry.dot + geometry.dot / 2,
          dark,
          corners: dark
            ? roundedCorners({ up: isData(row - 1, col), right: isData(row, col + 1), down: isData(row + 1, col), left: isData(row, col - 1) })
            : null,
        });
      }
    }
    // The three corner patterns: a rounded ring around a round dot, each one piece.
    const finders = [[0, 0], [0, count - 7], [count - 7, 0]].map(([row, col]) => ({
      x: geometry.x0 + (col + 3.5) * geometry.dot,
      y: geometry.y0 + (row + 3.5) * geometry.dot,
    }));
    return { geometry, modules, dots, finders, scale: canvasWidth / (options?.width ?? canvasWidth) };
  } catch {
    return null;
  }
}

/** Where the code sits inside the overlay, in the overlay's own pixels. */
function measure(canvas, target) {
  const overlay = canvas.getBoundingClientRect();
  const holder = target.getBoundingClientRect();
  const code = target.querySelector('canvas');
  const codeBox = code ? code.getBoundingClientRect() : null;
  const style = getComputedStyle(target);
  const left = parseFloat(style.paddingLeft) || 0;
  const right = parseFloat(style.paddingRight) || 0;
  const top = parseFloat(style.paddingTop) || 0;
  const bottom = parseFloat(style.paddingBottom) || 0;
  const box = codeBox || {
    left: holder.left + left,
    top: holder.top + top,
    width: holder.width - left - right,
    height: holder.height - top - bottom,
  };
  return {
    W: overlay.width,
    H: overlay.height,
    x: box.left - overlay.left,
    y: box.top - overlay.top,
    w: box.width,
    h: box.height,
  };
}

/** A square with each corner either round (radius `r`) or square. `corners` is [tl, tr, br, bl]. */
function addSquare(ctx, x, y, size, r, corners) {
  const [tl, tr, br, bl] = corners.map((round) => (round ? Math.min(r, size / 2) : 0));
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + size - tr, y);
  if (tr) ctx.arcTo(x + size, y, x + size, y + tr, tr);
  ctx.lineTo(x + size, y + size - br);
  if (br) ctx.arcTo(x + size, y + size, x + size - br, y + size, br);
  ctx.lineTo(x + bl, y + size);
  if (bl) ctx.arcTo(x, y + size, x, y + size - bl, bl);
  ctx.lineTo(x, y + tl);
  if (tl) ctx.arcTo(x, y, x + tl, y, tl);
  ctx.closePath();
}

const ALL = [true, true, true, true];

function drawFinder(ctx, cx, cy, dot, k, ink) {
  const outer = 7 * dot * k;
  const inner = 5 * dot * k;
  ctx.fillStyle = ink;
  ctx.beginPath();
  addSquare(ctx, cx - outer / 2, cy - outer / 2, outer, 2.4 * dot * k, ALL);
  addSquare(ctx, cx - inner / 2, cy - inner / 2, inner, 1.5 * dot * k, ALL);
  ctx.fill('evenodd');
  ctx.beginPath();
  ctx.arc(cx, cy, 1.5 * dot * k, 0, Math.PI * 2);
  ctx.fill();
}

function drawLaser(ctx, m, f, yLine) {
  if (f.laser <= 0) return;
  const trail = Math.min(46, yLine - m.y);
  if (trail > 0) {
    const gradient = ctx.createLinearGradient(0, yLine - trail, 0, yLine);
    gradient.addColorStop(0, 'rgba(60, 191, 0, 0)');
    gradient.addColorStop(1, `rgba(60, 191, 0, ${0.38 * f.laser})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(m.x - 12, yLine - trail, m.w + 24, trail);
  }
  ctx.save();
  ctx.globalAlpha = f.laser;
  ctx.shadowColor = LIME;
  ctx.shadowBlur = 16;
  ctx.fillStyle = LIME;
  ctx.fillRect(m.x - 14, yLine - 1.5, m.w + 28, 3);
  ctx.restore();
}

function drawFlashAndBrackets(ctx, m, f) {
  if (f.flash > 0.001) {
    ctx.fillStyle = `rgba(60, 191, 0, ${0.22 * f.flash})`;
    ctx.fillRect(m.x, m.y, m.w, m.h);
  }
  if (f.bracketAlpha > 0.001) {
    const offset = 5 + 22 * (1 - f.bracket);
    const length = 24;
    ctx.save();
    ctx.globalAlpha = f.bracketAlpha;
    ctx.strokeStyle = LIME;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.shadowColor = LIME;
    ctx.shadowBlur = 10;
    for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const x = m.x + m.w / 2 + sx * (m.w / 2 + offset);
      const y = m.y + m.h / 2 + sy * (m.h / 2 + offset);
      ctx.beginPath();
      ctx.moveTo(x - sx * length, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y - sy * length);
      ctx.stroke();
    }
    ctx.restore();
  }
}

/** The scan as designed: every module pops in behind the laser. */
function drawScan(ctx, m, model, f, colors) {
  ctx.clearRect(0, 0, m.W, m.H);
  const yLine = m.y + f.scan * m.h;
  const { geometry, modules, scale } = model;
  const cell = geometry.dot * scale;

  // Cover the real code, in its own background, until the very end.
  ctx.globalAlpha = f.cover;
  ctx.fillStyle = colors.cover;
  ctx.fillRect(m.x, m.y, m.w, m.h);

  // Ahead of the laser: a faint dot where every module will be.
  ctx.fillStyle = withAlpha(colors.ink, 0.14);
  ctx.beginPath();
  if (f.settle < 1) {
    for (const [dx, dy] of model.dots) {
      const x = m.x + dx * scale;
      const y = m.y + dy * scale;
      if (y >= yLine - 2) {
        ctx.moveTo(x + cell * 0.16, y);
        ctx.arc(x, y, cell * 0.16, 0, Math.PI * 2);
      }
    }
  }
  ctx.fill();

  // The cover and the dots fade out at the end. The modules and logo stay at full strength: the
  // real code underneath is the same, so nothing flickers when the overlay goes.
  ctx.globalAlpha = 1;

  // Behind the laser: the module itself, in the code's real style, popping to size.
  ctx.fillStyle = colors.ink;
  ctx.beginPath();
  for (const mod of modules) {
    if (!mod.dark) continue;
    const x = m.x + mod.x * scale;
    const y = m.y + mod.y * scale;
    if (y >= yLine - 2) continue;
    const k = moduleScale(yLine - y, cell, f.settle);
    if (k <= 0.02) continue;
    const size = cell * k;
    addSquare(ctx, x - size / 2, y - size / 2, size, size / 2, mod.corners);
  }
  ctx.fill();
  for (const finder of model.finders) {
    const y = m.y + finder.y * scale;
    if (y - cell * 3.5 >= yLine) continue;
    const k = moduleScale(yLine - (y - cell * 3.5), cell * 1.6, f.settle);
    if (k > 0.02) drawFinder(ctx, m.x + finder.x * scale, y, cell, k, colors.ink);
  }
  ctx.globalAlpha = 1;

  drawLaser(ctx, m, f, yLine);
  drawFlashAndBrackets(ctx, m, f);

  // The logo lands in the cleared middle, the real one the code carries.
  const logo = getLogo();
  if (f.logo > 0 && logo && logo.complete && logo.naturalWidth && geometry.logoWidth > 0) {
    const k = easeBack(f.logo);
    const w = geometry.logoWidth * scale * k;
    const h = geometry.logoHeight * scale * k;
    ctx.save();
    ctx.drawImage(logo, m.x + m.w / 2 - w / 2, m.y + m.h / 2 - h / 2, w, h);
    ctx.restore();
  }
}

/** Fallback when the modules cannot be read: a cover that the laser pulls away from the real code. */
function drawCoverOnly(ctx, m, f, colors) {
  ctx.clearRect(0, 0, m.W, m.H);
  const yLine = m.y + f.scan * m.h;
  if (f.scan < 1) {
    ctx.fillStyle = colors.cover;
    ctx.fillRect(m.x, yLine, m.w, m.y + m.h - yLine);
  }
  drawLaser(ctx, m, f, yLine);
  drawFlashAndBrackets(ctx, m, f);
}

/**
 * The scanner reveal over a freshly generated QR code. It sits on top of the real code,
 * covers it, and re-draws it module by module from the generator's own matrix as the laser
 * passes (see scanReveal.js), then hands over to the real code underneath. `targetRef` is the
 * element that holds the code. The first frame is drawn before the browser paints, so the
 * finished code never flashes first.
 */
const QrScanReveal = ({ qrCode, targetRef, colors, onDone }) => {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const target = targetRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;
    if (!canvas || !target || !ctx) {
      onDone();
      return undefined;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const m = measure(canvas, target);
    canvas.width = Math.round(m.W * pixelRatio);
    canvas.height = Math.round(m.H * pixelRatio);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    getLogo();
    const model = readModel(qrCode, m.w, m.h);
    const render = (frame) => (model ? drawScan(ctx, m, model, frame, colors) : drawCoverOnly(ctx, m, frame, colors));
    render(scanFrame(0));

    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const frame = scanFrame(Math.min(1, (now - start) / SCAN_MS));
      if (frame.done) {
        onDone();
        return;
      }
      render(frame);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [qrCode, targetRef, colors, onDone]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="qr-scan-reveal"
      className="pointer-events-none absolute -left-8 -top-8 z-10 h-[calc(100%+4rem)] w-[calc(100%+4rem)]"
    />
  );
};

export default QrScanReveal;
