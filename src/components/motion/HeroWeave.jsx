import React, { useRef } from "react";
import { buildWeaveGraph, nearestVertex } from "./weaveGraph";
import { useCanvasLoop } from "./useCanvasLoop";

const MAX_WALKERS = 70;
const FRAME_MS = 32;
const HEAT_LEVELS = 5;
// Lit lines pass behind the hero copy; keep them from competing with it.
const PULSE_ALPHA = 0.8;

const palette = (dark) =>
  dark
    ? { base: "198, 240, 136", baseAlpha: 0.22, pulse: "60, 191, 0", head: "#C6F088", blend: "lighter" }
    : { base: "0, 107, 84", baseAlpha: 0.2, pulse: "0, 133, 103", head: "#006B54", blend: "source-over" };

// The weave fades out towards the bottom of the hero. Doing it here, band by band, is much
// cheaper than a CSS mask over a canvas that repaints every frame.
const BAND_FADE = [1, 0.6, 0.3];
const bandOf = (y, height) => {
  const t = y / height;
  if (t < 0.58) return 0;
  if (t < 0.74) return 1;
  if (t < 0.88) return 2;
  return -1;
};

/** Strokes every lattice line, in three bands that fade towards the bottom. */
function strokeLattice(ctx, vertices, edges, colors) {
  ctx.lineWidth = 1;
  for (let band = 0; band < BAND_FADE.length; band += 1) {
    ctx.strokeStyle = `rgba(${colors.base}, ${(colors.baseAlpha * BAND_FADE[band]).toFixed(3)})`;
    ctx.beginPath();
    for (const edge of edges) {
      if (edge.band === band) {
        ctx.moveTo(vertices[edge.a].x, vertices[edge.a].y);
        ctx.lineTo(vertices[edge.b].x, vertices[edge.b].y);
      }
    }
    ctx.stroke();
  }
}

/**
 * Hero background: Islamic geometric ornament that reads as a circuit, with light pulses
 * running along its lines. The cursor (or a finger) drops new pulses onto the nearest
 * node; pressing sends a burst. Decorative only.
 *
 * Two stacked canvases: the still lattice is drawn once on the lower one (and again only
 * when the size or theme changes); the upper one is cleared and redrawn every frame with
 * just the lit lines and the moving heads, which keeps each frame cheap.
 */
const HeroWeave = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const latticeRef = useRef(null);
  const world = useRef({
    vertices: [],
    edges: [],
    walkers: [],
    hot: [],
    latticeKey: "",
    lastSpawn: 0,
    lastDraw: 0,
    downSeen: 0,
  });

  const spawn = (v) => {
    const w = world.current;
    const node = w.vertices[v];
    if (!node || !node.edges.length) return;
    if (w.walkers.length >= MAX_WALKERS) w.walkers.shift();
    w.walkers.push({
      edge: node.edges[Math.floor(Math.random() * node.edges.length)],
      from: v,
      progress: 0,
      speed: 0.0016 + Math.random() * 0.0016,
    });
  };

  useCanvasLoop(canvasRef, {
    startDelay: 350,
    warm: 1,
    setup: (s) => {
      const w = world.current;
      const graph = buildWeaveGraph(s.W, s.H, s.W < 520 ? 46 : 64);
      w.vertices = graph.vertices;
      w.edges = graph.edges.map((edge) => ({
        ...edge,
        band: bandOf(edge.midY, s.H),
        lit: false,
      }));
      w.walkers = [];
      w.hot = [];
      w.latticeKey = "";
      for (let i = 0; i < 24; i += 1) spawn(Math.floor(Math.random() * w.vertices.length));
    },
    frame: (s, now) => {
      const { ctx, W, H, pointer } = s;
      const w = world.current;
      if (!s.reduce && now - w.lastDraw < FRAME_MS) return;
      const dt = Math.min(64, w.lastDraw ? now - w.lastDraw : 16);
      w.lastDraw = now;
      const { vertices, edges, walkers, hot } = w;
      const colors = palette(s.dark);
      const latticeKey = `${W}x${H}:${s.dark}`;
      if (w.latticeKey !== latticeKey) {
        const lattice = latticeRef.current;
        if (lattice) {
          const pixelRatio = ctx.canvas.width / W;
          lattice.width = ctx.canvas.width;
          lattice.height = ctx.canvas.height;
          const latticeCtx = lattice.getContext("2d");
          latticeCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          strokeLattice(latticeCtx, vertices, edges, colors);
          lattice.style.opacity = "1";
        }
        w.latticeKey = latticeKey;
      }

      if (pointer.in && now - w.lastSpawn > 70) {
        const v = nearestVertex(vertices, pointer.x, pointer.y, 90);
        if (v >= 0) spawn(v);
        w.lastSpawn = now;
      }
      if (pointer.down && w.downSeen !== pointer.moved) {
        w.downSeen = pointer.moved;
        const v = nearestVertex(vertices, pointer.x, pointer.y, 140);
        if (v >= 0) for (let i = 0; i < 10; i += 1) spawn(v);
      }

      for (const walker of walkers) {
        const edge = edges[walker.edge];
        edge.heat = 1;
        if (!edge.lit) {
          edge.lit = true;
          hot.push(edge);
        }
        walker.progress += walker.speed * dt;
        if (walker.progress >= 1) {
          const to = edge.a === walker.from ? edge.b : edge.a;
          const options = vertices[to].edges;
          let next = walker.edge;
          if (options.length > 1) {
            do {
              next = options[Math.floor(Math.random() * options.length)];
            } while (next === walker.edge);
          }
          walker.from = to;
          walker.edge = next;
          walker.progress = 0;
        }
      }

      ctx.clearRect(0, 0, W, H);

      // Lit lines, grouped by brightness and fade band so there are a handful of strokes.
      const decay = Math.pow(0.94, dt / 16);
      const groups = new Map();
      for (let i = hot.length - 1; i >= 0; i -= 1) {
        const edge = hot[i];
        if (edge.heat < 0.03) {
          edge.lit = false;
          edge.heat = 0;
          hot[i] = hot[hot.length - 1];
          hot.pop();
          continue;
        }
        if (edge.band >= 0) {
          const level = Math.min(HEAT_LEVELS, Math.ceil(edge.heat * HEAT_LEVELS - 0.0001));
          const key = edge.band * 10 + level;
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key).push(edge);
        }
        edge.heat *= decay;
      }
      ctx.globalCompositeOperation = colors.blend;
      groups.forEach((group, key) => {
        const band = Math.floor(key / 10);
        const heat = (key % 10) / HEAT_LEVELS;
        ctx.strokeStyle = `rgba(${colors.pulse}, ${(heat * BAND_FADE[band] * PULSE_ALPHA).toFixed(3)})`;
        ctx.lineWidth = 1 + heat * 2.2;
        ctx.beginPath();
        for (const edge of group) {
          ctx.moveTo(vertices[edge.a].x, vertices[edge.a].y);
          ctx.lineTo(vertices[edge.b].x, vertices[edge.b].y);
        }
        ctx.stroke();
      });

      ctx.fillStyle = colors.head;
      ctx.beginPath();
      for (const walker of walkers) {
        const edge = edges[walker.edge];
        const from = vertices[walker.from];
        const to = vertices[edge.a === walker.from ? edge.b : edge.a];
        const x = from.x + (to.x - from.x) * walker.progress;
        const y = from.y + (to.y - from.y) * walker.progress;
        ctx.moveTo(x + 2.6, y);
        ctx.arc(x, y, 2.6, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    },
  });

  return (
    <>
      <canvas
        ref={latticeRef}
        aria-hidden="true"
        className={`${className} opacity-0 transition-opacity duration-[1400ms] motion-reduce:transition-none`}
      />
      <canvas ref={canvasRef} aria-hidden="true" className={className} />
    </>
  );
};

export default HeroWeave;
