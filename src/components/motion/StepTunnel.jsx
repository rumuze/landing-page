import React, { useRef } from "react";
import { clamp, useCanvasLoop } from "./useCanvasLoop";

const GLYPHS = "رموزابتثجحخدذسشصضطعغفقكلمنهي{}<>/;=()[]01".split("");
const RINGS = 24;
const PER_RING = 18;

const makeRing = (d, gate) => ({
  d,
  rot: Math.random() * Math.PI * 2,
  spin: (Math.random() - 0.5) * 0.0004,
  glyphs: Array.from({ length: PER_RING }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]),
  gate,
});

/**
 * A tunnel of letters and code that the viewer travels down, with a gate passing every few
 * rings. The gates carry the steps of what happens after a project request. It sits behind
 * the closing call to action, which is always dark, so it uses the dark palette. Decorative.
 */
const StepTunnel = ({ gates, className = "" }) => {
  const canvasRef = useRef(null);
  const world = useRef({ rings: [], recycled: 0, gateIndex: 0, nx: 0, ny: 0 });

  const nextGate = () => {
    const w = world.current;
    const label = gates[w.gateIndex % gates.length];
    w.gateIndex += 1;
    return label;
  };

  useCanvasLoop(canvasRef, {
    forceDark: true,
    warm: 1,
    startDelay: 300,
    setup: () => {
      const w = world.current;
      if (w.rings.length) return;
      w.rings = Array.from({ length: RINGS }, (_, i) => makeRing((i + 1) / RINGS, null));
      w.rings[RINGS - 4].gate = nextGate();
    },
    frame: (s, now, dt) => {
      const { ctx, W, H, pointer } = s;
      const w = world.current;
      const unit = Math.min(W, H) / 360;
      const radius0 = Math.min(W, H) * 0.95;
      const targetX = pointer.in ? (pointer.x / W - 0.5) * 2 : Math.sin(now * 0.0003);
      const targetY = pointer.in ? (pointer.y / H - 0.5) * 2 : Math.cos(now * 0.00041) * 0.6;
      w.nx += (targetX - w.nx) * 0.05;
      w.ny += (targetY - w.ny) * 0.05;
      const speed = ((pointer.down ? 0.85 : 0.2) / 1000) * dt;

      for (const ring of w.rings) {
        ring.d -= speed;
        ring.rot += ring.spin * dt;
        if (ring.d < 0.045) {
          w.recycled += 1;
          Object.assign(ring, makeRing(ring.d + 0.955, w.recycled % 7 === 0 ? nextGate() : null));
        }
      }
      w.rings.sort((a, b) => b.d - a.d);

      ctx.clearRect(0, 0, W, H);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const glowX = W / 2 + w.nx * W * 0.28;
      const glowY = H / 2 + w.ny * H * 0.22;
      const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, Math.min(W, H) * 0.5);
      glow.addColorStop(0, "rgba(60, 191, 0, 0.22)");
      glow.addColorStop(1, "rgba(60, 191, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      const t = now * 0.0006;
      w.rings.forEach((ring, index) => {
        const d = ring.d;
        const scale = 0.075 / d;
        const radius = radius0 * scale;
        const near = Math.min(1, d * 1.2);
        const cx = W / 2 + w.nx * W * 0.28 * near + Math.sin(d * 5 + t) * W * 0.05 * d;
        const cy = H / 2 + w.ny * H * 0.22 * near + Math.cos(d * 4 + t) * H * 0.04 * d;
        const alpha = clamp((1 - d) * 3, 0, 1) * clamp((d - 0.045) / 0.07, 0, 1);
        if (alpha < 0.02) return;

        ctx.globalAlpha = alpha * 0.1;
        ctx.strokeStyle = "#3CBF00";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        const fontSize = 30 * scale * unit * 1.5;
        if (fontSize < 4) return;
        ctx.font = `${fontSize}px Cairo, sans-serif`;
        ctx.fillStyle = index % 2 ? "#3CBF00" : "#C6F088";
        ctx.globalAlpha = alpha;
        for (let k = 0; k < PER_RING; k += 1) {
          const angle = ring.rot + (k / PER_RING) * Math.PI * 2;
          ctx.save();
          ctx.translate(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
          ctx.rotate(angle + Math.PI / 2);
          ctx.fillText(ring.glyphs[k], 0, 0);
          ctx.restore();
        }

        if (ring.gate) {
          ctx.globalAlpha = alpha * clamp((d - 0.1) / 0.25, 0, 1);
          ctx.strokeStyle = "#3CBF00";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, radius * 0.82, 0, Math.PI * 2);
          ctx.stroke();
          ctx.font = `900 ${Math.min(60 * scale * unit * 1.3, W * 0.11)}px Cairo, sans-serif`;
          ctx.fillStyle = "#C6F088";
          ctx.shadowColor = "rgba(60, 191, 0, 0.8)";
          ctx.shadowBlur = 20;
          ctx.fillText(ring.gate, cx, cy);
          ctx.shadowBlur = 0;
        }
      });
      ctx.globalAlpha = 1;
    },
  });

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
};

export default StepTunnel;
