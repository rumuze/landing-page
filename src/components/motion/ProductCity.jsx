import React, { useRef } from "react";
import { buildCity, cityGridSize, hash01 } from "./cityLayout";
import { clamp, useCanvasLoop } from "./useCanvasLoop";

const CYCLE = 12500;
const FRAME_MS = 32;

const themes = {
  dark: {
    ground: "rgba(7, 26, 17, 0.85)",
    street: "rgba(60, 191, 0, 0.22)",
    edge: "rgba(198, 240, 136, 0.25)",
    left: "#0a2117",
    right: "#051410",
    top: "#123a26",
    topHover: "#1d5a3a",
    towerLeft: "#0f5c00",
    towerRight: "#0a4200",
    towerTop: "#3cbf00",
    windowLit: "rgba(198, 240, 136, 0.9)",
    windowDim: "rgba(198, 240, 136, 0.13)",
    car: "#c6f088",
    carGlow: "#3cbf00",
    label: "#c6f088",
    labelGlow: "rgba(60, 191, 0, 0.8)",
  },
  light: {
    ground: "rgba(237, 250, 242, 0.95)",
    street: "rgba(0, 107, 84, 0.2)",
    edge: "rgba(0, 107, 84, 0.3)",
    left: "#c9e4d4",
    right: "#a6cdb8",
    top: "#e8f6ee",
    topHover: "#d2efdd",
    towerLeft: "#2ea000",
    towerRight: "#1f7d00",
    towerTop: "#3cbf00",
    windowLit: "rgba(255, 255, 255, 0.95)",
    windowDim: "rgba(0, 107, 84, 0.16)",
    car: "#006b54",
    carGlow: "#3cbf00",
    label: "#00483a",
    labelGlow: "rgba(255, 255, 255, 0.9)",
  },
};

const ease = (t) => 1 - Math.pow(1 - t, 3);

/**
 * An isometric city whose tall towers are the products we have built and run. Buildings
 * grow in from the middle, lights come on in their windows, and small dots (requests, or
 * customers) travel the streets. Hovering a plot lifts the building on it.
 */
const ProductCity = ({ products, ariaLabel, className = "" }) => {
  const canvasRef = useRef(null);
  const world = useRef({ buildings: [], hover: new Map(), cars: [], g: 5, tw: 0, ox: 0, oy: 0, born: 0, lastDraw: 0 });

  useCanvasLoop(canvasRef, {
    warm: 1,
    startDelay: 200,
    setup: (s) => {
      const w = world.current;
      w.g = cityGridSize(s.W);
      w.buildings = buildCity(w.g, products);
      w.tw = Math.min((s.W * 0.94) / w.g, (s.H * 0.86) / (w.g / 2 + 0.95));
      w.maxH = w.tw * 0.95;
      w.ox = s.W / 2;
      w.oy = (s.H - (w.g * (w.tw / 2) + w.maxH)) / 2 + w.maxH + s.H * 0.02;
      w.born = performance.now();
      w.cars = Array.from({ length: 10 }, () => ({
        line: Math.floor(Math.random() * (w.g + 1)),
        vertical: Math.random() < 0.5,
        u: Math.random() * w.g,
        speed: (0.0004 + Math.random() * 0.0006) * (Math.random() < 0.5 ? 1 : -1),
        trail: [],
      }));
    },
    frame: (s, now) => {
      const { ctx, W, H, pointer } = s;
      const w = world.current;
      if (!s.reduce && now - w.lastDraw < FRAME_MS) return;
      const dt = Math.min(64, w.lastDraw ? now - w.lastDraw : 16);
      w.lastDraw = now;
      const c = s.dark ? themes.dark : themes.light;
      const { g, tw, ox, oy, maxH } = w;
      const th = tw / 2;
      const iso = (a, b) => [ox + ((a - b) * tw) / 2, oy + ((a + b) * th) / 2];
      const age = s.reduce ? 6000 : (now - w.born) % CYCLE;
      const shrink = clamp((CYCLE - age) / 900, 0, 1);
      const footprint = 0.72;
      const hw = (tw / 2) * footprint;
      const hh = (th / 2) * footprint;

      let hoverI = -1;
      let hoverJ = -1;
      if (pointer.in) {
        const px = pointer.x - ox;
        const py = pointer.y - oy;
        hoverI = Math.floor((px / (tw / 2) + py / th) / 2);
        hoverJ = Math.floor((py / th - px / (tw / 2)) / 2);
      }

      ctx.clearRect(0, 0, W, H);
      const p0 = iso(0, 0);
      const p1 = iso(g, 0);
      const p2 = iso(g, g);
      const p3 = iso(0, g);
      ctx.fillStyle = c.ground;
      ctx.beginPath();
      ctx.moveTo(p0[0], p0[1]);
      ctx.lineTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.lineTo(p3[0], p3[1]);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = c.street;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let n = 0; n <= g; n += 1) {
        const a1 = iso(n, 0);
        const a2 = iso(n, g);
        const b1 = iso(0, n);
        const b2 = iso(g, n);
        ctx.moveTo(a1[0], a1[1]);
        ctx.lineTo(a2[0], a2[1]);
        ctx.moveTo(b1[0], b1[1]);
        ctx.lineTo(b2[0], b2[1]);
      }
      ctx.stroke();

      for (const car of w.cars) {
        car.u += car.speed * dt;
        if (car.u > g) car.u -= g;
        if (car.u < 0) car.u += g;
        const q = car.vertical ? iso(car.line, car.u) : iso(car.u, car.line);
        car.trail.push(q);
        if (car.trail.length > 7) car.trail.shift();
        car.trail.forEach((t, k) => {
          ctx.globalAlpha = k / 12;
          ctx.fillStyle = c.carGlow;
          ctx.beginPath();
          ctx.arc(t[0], t[1], 1.6, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
        ctx.fillStyle = c.car;
        ctx.shadowColor = c.carGlow;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(q[0], q[1], 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      const labels = [];
      const ordered = [...w.buildings].sort((a, b) => a.i + a.j - (b.i + b.j));
      for (const b of ordered) {
        const key = b.i * 100 + b.j;
        const target = b.i === hoverI && b.j === hoverJ ? 1 : 0;
        const lift = (w.hover.get(key) || 0) + (target - (w.hover.get(key) || 0)) * 0.15;
        w.hover.set(key, lift);
        const grow = s.reduce ? 1 : ease(clamp((age - b.delay) / 1300, 0, 1));
        const h = (b.height * maxH * grow + lift * maxH * 0.3 * grow) * shrink;
        if (h < 1) continue;
        const [cx, cy] = iso(b.i + 0.5, b.j + 0.5);
        const top = [cx, cy - hh];
        const right = [cx + hw, cy];
        const bottom = [cx, cy + hh];
        const left = [cx - hw, cy];
        const faded = b.pending ? 0.6 : 1;

        ctx.globalAlpha = faded;
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = c.edge;
        if (b.tower) {
          ctx.shadowColor = "rgba(60, 191, 0, 0.7)";
          ctx.shadowBlur = 20;
        }
        ctx.fillStyle = b.tower ? c.towerLeft : c.left;
        ctx.beginPath();
        ctx.moveTo(left[0], left[1]);
        ctx.lineTo(bottom[0], bottom[1]);
        ctx.lineTo(bottom[0], bottom[1] - h);
        ctx.lineTo(left[0], left[1] - h);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = b.tower ? c.towerRight : c.right;
        ctx.beginPath();
        ctx.moveTo(bottom[0], bottom[1]);
        ctx.lineTo(right[0], right[1]);
        ctx.lineTo(right[0], right[1] - h);
        ctx.lineTo(bottom[0], bottom[1] - h);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        drawWindows(ctx, left, bottom, h, b.seed, c);
        drawWindows(ctx, bottom, right, h, b.seed + 99, c);

        ctx.fillStyle = b.tower ? c.towerTop : lift > 0.3 ? c.topHover : c.top;
        ctx.beginPath();
        ctx.moveTo(top[0], top[1] - h);
        ctx.lineTo(right[0], right[1] - h);
        ctx.lineTo(bottom[0], bottom[1] - h);
        ctx.lineTo(left[0], left[1] - h);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (b.tower && grow > 0.9 && shrink > 0.9) labels.push({ text: b.name, x: cx, y: top[1] - h - 11 });
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `700 ${Math.max(11, Math.min(15, tw * 0.22))}px Cairo, Inter, sans-serif`;
      for (const label of labels) {
        ctx.shadowColor = c.labelGlow;
        ctx.shadowBlur = 10;
        ctx.fillStyle = c.label;
        ctx.fillText(label.text, label.x, label.y);
        ctx.shadowBlur = 0;
      }
    },
  });

  return <canvas ref={canvasRef} role="img" aria-label={ariaLabel} className={className} />;
};

function drawWindows(ctx, from, to, height, seed, c) {
  const lit = [];
  const dim = [];
  for (let v = 8, row = 0; v + 5 < height - 4; v += 11, row += 1) {
    for (let col = 0; col < 2; col += 1) {
      const u0 = 0.18 + col * 0.42;
      const u1 = u0 + 0.22;
      const bucket = hash01(seed + row * 7 + col * 3) < 0.45 ? lit : dim;
      bucket.push([
        from[0] + (to[0] - from[0]) * u0,
        from[1] + (to[1] - from[1]) * u0 - v,
        from[0] + (to[0] - from[0]) * u1,
        from[1] + (to[1] - from[1]) * u1 - v,
      ]);
    }
  }
  [
    [dim, c.windowDim],
    [lit, c.windowLit],
  ].forEach(([quads, color]) => {
    if (!quads.length) return;
    ctx.beginPath();
    for (const [x1, y1, x2, y2] of quads) {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x2, y2 - 5);
      ctx.lineTo(x1, y1 - 5);
      ctx.closePath();
    }
    ctx.fillStyle = color;
    ctx.fill();
  });
}

export default ProductCity;
