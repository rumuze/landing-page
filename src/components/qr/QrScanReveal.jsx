import { useLayoutEffect, useRef } from 'react';
import { SCAN_MS, scanFrame, withAlpha } from './scanReveal';

const LIME = '#3CBF00';
const DOT_PITCH = 8;

/** The part of `target` inside its padding, in the overlay canvas's own coordinates. */
function measure(canvas, target) {
  const overlay = canvas.getBoundingClientRect();
  const box = target.getBoundingClientRect();
  const style = getComputedStyle(target);
  const left = parseFloat(style.paddingLeft) || 0;
  const right = parseFloat(style.paddingRight) || 0;
  const top = parseFloat(style.paddingTop) || 0;
  const bottom = parseFloat(style.paddingBottom) || 0;
  return {
    W: overlay.width,
    H: overlay.height,
    x: box.left - overlay.left + left,
    y: box.top - overlay.top + top,
    w: box.width - left - right,
    h: box.height - top - bottom,
    corner: parseFloat(style.borderTopLeftRadius) || 0,
  };
}

function draw(ctx, m, f, colors) {
  ctx.clearRect(0, 0, m.W, m.H);
  const yLine = m.y + f.scan * m.h;

  // Not yet scanned: covered in the code's own background, with a faint grid of dots.
  if (f.scan < 1) {
    ctx.fillStyle = colors.cover;
    ctx.fillRect(m.x, yLine, m.w, m.y + m.h - yLine);
    ctx.fillStyle = withAlpha(colors.ink, 0.14);
    ctx.beginPath();
    const firstRow = Math.ceil((yLine - m.y) / DOT_PITCH + 0.5);
    for (let y = m.y + (firstRow - 0.5) * DOT_PITCH; y < m.y + m.h; y += DOT_PITCH) {
      for (let x = m.x + DOT_PITCH / 2; x < m.x + m.w; x += DOT_PITCH) {
        ctx.moveTo(x + 1.2, y);
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      }
    }
    ctx.fill();
  }

  if (f.laser > 0) {
    const trail = Math.min(46, yLine - m.y);
    if (trail > 0) {
      const gradient = ctx.createLinearGradient(0, yLine - trail, 0, yLine);
      gradient.addColorStop(0, 'rgba(60, 191, 0, 0)');
      gradient.addColorStop(1, `rgba(60, 191, 0, ${0.34 * f.laser})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(m.x, yLine - trail, m.w, trail);
    }
    ctx.save();
    ctx.globalAlpha = f.laser;
    ctx.shadowColor = LIME;
    ctx.shadowBlur = 14;
    ctx.fillStyle = LIME;
    ctx.fillRect(m.x - 10, yLine - 1.5, m.w + 20, 3);
    ctx.restore();
  }

  if (f.flash > 0.001) {
    ctx.fillStyle = `rgba(60, 191, 0, ${0.2 * f.flash})`;
    ctx.fillRect(m.x, m.y, m.w, m.h);
  }

  if (f.bracketAlpha > 0.001) {
    const offset = 5 + 22 * (1 - f.bracket);
    const length = 22;
    ctx.save();
    ctx.globalAlpha = f.bracketAlpha;
    ctx.strokeStyle = LIME;
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.shadowColor = LIME;
    ctx.shadowBlur = 8;
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

/**
 * A scanner sweep over a freshly generated QR code. It sits on top of the real code, which is
 * already in place underneath: the overlay covers it in its own background colour and uncovers
 * it as a laser passes, so what is revealed is the actual code, colours and logo included.
 * `targetRef` is the element that holds the code (its padding is left uncovered). The first
 * frame is drawn before the browser paints, so the finished code never flashes first.
 */
const QrScanReveal = ({ targetRef, colors, onDone }) => {
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
    draw(ctx, m, scanFrame(0), colors);

    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / SCAN_MS);
      const frame = scanFrame(t);
      if (frame.done) {
        onDone();
        return;
      }
      draw(ctx, m, frame, colors);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetRef, colors, onDone]);

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
