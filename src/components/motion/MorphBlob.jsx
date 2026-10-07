import React, { useEffect, useRef } from "react";
import { MORPH_SHAPES, sampleShape } from "./morphShapes";
import { useCanvasLoop } from "./useCanvasLoop";

const COUNT = 230;
const AUTOPLAY_MS = 3400;

/** Switches the target shape and splashes the liquid so the change is felt. */
function morphTo(w, index) {
  w.current = index;
  w.switchedAt = performance.now();
  for (const p of w.parts) {
    const angle = Math.random() * Math.PI * 2;
    const kick = 4 + Math.random() * 9;
    p.vx += Math.cos(angle) * kick;
    p.vy += Math.sin(angle) * kick;
  }
}

/**
 * A green liquid that takes the shape of whichever capability is active: hover or tap a
 * capability card and it becomes a bulb, code, a phone, a server, a magnifier, a megaphone,
 * a pen or a plug. With nobody pointing at anything it cycles through them on its own.
 * `active` is a shape index or null; `labels` names each shape for the caption.
 */
const MorphBlob = ({ active, labels, ariaLabel, className = "" }) => {
  const canvasRef = useRef(null);
  const world = useRef({ shapes: null, parts: [], current: 0, switchedAt: 0, active: null, caption: null });

  useEffect(() => {
    world.current.active = active;
  }, [active]);

  const capRef = useRef(null);
  const setCaption = (index) => {
    const el = capRef.current;
    if (!el) return;
    el.style.opacity = "0";
    window.setTimeout(() => {
      el.textContent = labels[index] || "";
      el.style.opacity = "1";
    }, 140);
  };
  const captionRef = useRef(setCaption);
  useEffect(() => {
    captionRef.current = setCaption;
  });

  useCanvasLoop(canvasRef, {
    warm: 1,
    setup: (s) => {
      const w = world.current;
      if (!w.shapes) {
        w.shapes = MORPH_SHAPES.map((paths) => sampleShape(paths, COUNT));
        w.parts = Array.from({ length: COUNT }, (_, k) => ({
          x: s.W / 2 + (Math.random() - 0.5) * 40,
          y: s.H / 2 + (Math.random() - 0.5) * 40,
          vx: 0,
          vy: 0,
          r: 4.6 + (k % 4) * 0.7,
        }));
        w.current = 0;
        w.switchedAt = performance.now();
        if (labels[0]) window.setTimeout(() => captionRef.current(0), 0);
      }
    },
    frame: (s, now) => {
      const { ctx, W, H, pointer } = s;
      const w = world.current;
      if (!w.shapes) return;
      const target = w.active !== null && w.active !== undefined ? w.active : null;
      if (target !== null && target !== w.current) {
        morphTo(w, target);
        captionRef.current(target);
      } else if (target === null && !s.reduce && now - w.switchedAt > AUTOPLAY_MS) {
        const next = (w.current + 1) % w.shapes.length;
        morphTo(w, next);
        captionRef.current(next);
      }
      const box = Math.min(W * 0.8, H * 0.74);
      const scale = box * 0.01;
      const unit = Math.max(0.6, Math.min(W, H) / 330);
      const cx = W / 2;
      const cy = H / 2 - H * 0.04;
      const points = w.shapes[w.current];
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#3CBF00";
      ctx.beginPath();
      for (let k = 0; k < w.parts.length; k += 1) {
        const p = w.parts[k];
        const tx = cx + (points[k][0] - 50) * scale;
        const ty = cy + (points[k][1] - 50) * scale;
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const sq = dx * dx + dy * dy;
        if (pointer.in && sq < 6400) {
          const d = Math.sqrt(sq) || 1;
          const push = (1 - sq / 6400) * 3;
          p.vx += (dx / d) * push;
          p.vy += (dy / d) * push;
        }
        p.vx = (p.vx + (tx - p.x) * 0.055 + Math.sin(now * 0.002 + k) * 0.06) * 0.84;
        p.vy = (p.vy + (ty - p.y) * 0.055 + Math.cos(now * 0.0023 + k) * 0.06) * 0.84;
        if (s.reduce) {
          p.x = tx;
          p.y = ty;
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }
        const r = p.r * unit;
        ctx.moveTo(p.x + r, p.y);
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      }
      ctx.fill();
    },
  });

  return (
    <div className={`relative ${className}`} role="img" aria-label={ariaLabel}>
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <filter id="rumuze-goo" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
            />
          </filter>
        </defs>
      </svg>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ filter: "url(#rumuze-goo)" }}
      />
      <p
        ref={capRef}
        aria-hidden="true"
        className="type-label copy-primary pointer-events-none absolute inset-x-0 bottom-1 text-center transition-opacity duration-300 dark:text-white"
      />
    </div>
  );
};

export default MorphBlob;
