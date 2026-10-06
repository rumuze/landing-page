import { WAVE_LINKS, getWaveLayout } from './serviceWaveLayout';

// Motion for the service wave. The server renders the chips as a plain wrapped
// row; this takes over in the browser: chips float on the waves, lean towards the
// cursor, can be grabbed and thrown, drag their neighbours along the connecting
// lines, and get an occasional gust. It stops when scrolled off screen.

const SVG_NS = 'http://www.w3.org/2000/svg';
const DEPTH_PARALLAX = [1, 0.6, 0.3];
const DEPTH_SOFTNESS = [1, 0.95, 0.88];
const GUST_EVERY = 9;      // seconds between gusts
const GUST_TRAVEL = 2.6;   // seconds a gust takes to cross the band
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export function createServiceWave({ root, field, links, card, rtl = false, onTap, onDismiss }) {
  const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sheetQuery = window.matchMedia('(max-width: 640px)');
  let reduce = reduceQuery.matches;
  const onReduceChange = (event) => { reduce = event.matches; };
  reduceQuery.addEventListener?.('change', onReduceChange);

  const chips = [...field.querySelectorAll('[data-key]')].map((el, i) => ({
    el,
    key: el.dataset.key,
    btn: el.querySelector('button'),
    i,
    ox: 0, oy: 0, vx: 0, vy: 0,
    fx: 0, fy: 0, shiftX: 0, shiftY: 0,
    bx: 0, by: 0,
    drag: false, down: false, near: false, calm: 0, moved: 0,
    depth: Number(el.dataset.depth) || 0,
    ph: (i * 1.13) % 6,
    per: 6 + (i % 4) * 0.55,
    vis: true,
  }));
  const byKey = Object.fromEntries(chips.map((c) => [c.key, c]));

  let tile = 64;
  let bandH = 300;
  let bandW = 0;
  let openKey = null;

  // ---- connecting lines and the small pulses that travel along them ----
  const lines = WAVE_LINKS.filter(([a, b]) => byKey[a] && byKey[b]).map(([a, b]) => {
    const line = document.createElementNS(SVG_NS, 'line');
    links.appendChild(line);
    return { a: byKey[a], b: byKey[b], line };
  });
  const dots = [];
  lines.forEach((ln, i) => {
    for (let k = 0; k < 2; k += 1) {
      const dot = document.createElementNS(SVG_NS, 'circle');
      dot.setAttribute('r', '2.6');
      dot.setAttribute('class', 'svc-wave__dot');
      links.appendChild(dot);
      dots.push({ dot, ln, ph: (i * 0.37 + k * 0.5) % 1, sp: 0.11 + 0.03 * ((i + k) % 3), dir: k ? -1 : 1 });
    }
  });

  // ---- layout: counts, rows and sizes follow the width ----
  function layout() {
    bandW = root.clientWidth;
    const result = getWaveLayout(bandW, { rtl });
    tile = result.size;
    bandH = result.height;
    root.style.setProperty('--svc-tile', `${tile}px`);
    root.style.height = `${bandH}px`;
    const placed = new Map(result.items.map((item) => [item.key, item]));
    chips.forEach((c) => {
      const spot = placed.get(c.key);
      c.vis = Boolean(spot);
      c.el.hidden = !spot;
      if (spot) { c.bx = spot.x; c.by = spot.y; }
    });
    links.setAttribute('viewBox', `0 0 ${bandW} ${bandH}`);
    root.classList.add('is-live');
  }

  // ---- popup placement ----
  function placeCard() {
    if (!openKey || sheetQuery.matches) { card.style.left = ''; card.style.top = ''; return; }
    const c = byKey[openKey];
    if (!c) return;
    const w = Math.min(330, bandW - 24);
    const h = card.offsetHeight || 280;
    const cx = c.bx + c.ox + c.shiftX;
    const cy = c.by + tile / 2 + c.oy + c.shiftY;
    const left = clamp(cx - w / 2, 12, bandW - w - 12);
    let top = cy + tile / 2 + 34;
    if (top + h > bandH + 90) top = Math.max(8, cy - tile / 2 - h - 14);
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  }

  // ---- pointer ----
  let mx = -999, my = -999, mvx = 0, mvy = 0, pmx = null, pmy = null;
  const rootRect = () => root.getBoundingClientRect();
  const onRootMove = (e) => {
    const r = rootRect();
    mx = e.clientX - r.left; my = e.clientY - r.top;
    if (pmx !== null) { mvx = mx - pmx; mvy = my - pmy; }
    pmx = mx; pmy = my;
    if (!reduce) root.style.setProperty('--svc-wx', `${(((e.clientX - r.left) / r.width - 0.5) * -14).toFixed(1)}px`);
  };
  const onRootLeave = () => { mx = my = -999; pmx = pmy = null; mvx = mvy = 0; };
  root.addEventListener('pointermove', onRootMove);
  root.addEventListener('pointerleave', onRootLeave);

  const cleanups = [];
  chips.forEach((c) => {
    let holdTimer = null;
    let sx = 0, sy = 0;
    const startDrag = (e) => {
      c.drag = true;
      c.el.classList.add('is-drag');
      try { c.el.setPointerCapture(e.pointerId); } catch { /* not capturable */ }
      c.px = e.clientX; c.py = e.clientY; c.vx = 0; c.vy = 0;
    };
    const onDown = (e) => {
      if (e.button > 0) return;
      c.moved = 0; sx = e.clientX; sy = e.clientY; c.t = performance.now(); c.down = true;
      if (e.pointerType === 'mouse') startDrag(e);                          // mouse: grab at once
      else holdTimer = setTimeout(() => { if (c.down) startDrag(e); }, 260); // touch: long press, so the page still scrolls
    };
    const onMove = (e) => {
      if (!c.drag) {
        if (holdTimer && Math.hypot(e.clientX - sx, e.clientY - sy) > 8) { clearTimeout(holdTimer); holdTimer = null; }
        return;
      }
      c.moved += Math.abs(e.clientX - c.px) + Math.abs(e.clientY - c.py);
      c.vx = (e.clientX - c.px) * 60; c.vy = (e.clientY - c.py) * 60;
      c.ox = clamp(c.ox + e.clientX - c.px, -c.bx + tile / 2, bandW - c.bx - tile / 2);
      c.oy = clamp(c.oy + e.clientY - c.py, -c.by, bandH - c.by - tile - 30);
      c.px = e.clientX; c.py = e.clientY;
    };
    const onUp = () => {
      clearTimeout(holdTimer); holdTimer = null;
      const tap = c.down && c.moved < 6 && performance.now() - c.t < 500;
      c.down = false; c.drag = false; c.el.classList.remove('is-drag');
      if (tap) onTap(c.key);
    };
    const onCancel = () => { clearTimeout(holdTimer); c.down = false; c.drag = false; c.el.classList.remove('is-drag'); };
    // A click with no pointer (keyboard Enter or Space) opens the popup too.
    const onClick = (e) => { if (e.detail === 0) onTap(c.key); };
    const onKey = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const visible = chips.filter((x) => x.vis);
      const dir = (e.key === 'ArrowRight' ? 1 : -1) * (rtl ? -1 : 1);
      visible[(visible.indexOf(c) + dir + visible.length) % visible.length].btn.focus();
    };
    c.el.addEventListener('pointerdown', onDown);
    c.el.addEventListener('pointermove', onMove);
    c.el.addEventListener('pointerup', onUp);
    c.el.addEventListener('pointercancel', onCancel);
    c.btn.addEventListener('click', onClick);
    c.btn.addEventListener('keydown', onKey);
    cleanups.push(() => {
      clearTimeout(holdTimer);
      c.el.removeEventListener('pointerdown', onDown);
      c.el.removeEventListener('pointermove', onMove);
      c.el.removeEventListener('pointerup', onUp);
      c.el.removeEventListener('pointercancel', onCancel);
      c.btn.removeEventListener('click', onClick);
      c.btn.removeEventListener('keydown', onKey);
    });
  });

  const onDocDown = (e) => {
    if (!openKey) return;
    if (card.contains(e.target) || e.target.closest?.('[data-key]')) return;
    onDismiss?.();
  };
  document.addEventListener('pointerdown', onDocDown);

  // ---- animation loop ----
  const t0 = performance.now();
  let last = t0;
  let running = false;
  let visible = true;
  let entered = false;
  let enterT = 0;
  let rafId = 0;

  function frame(now) {
    if (!visible || document.hidden) { running = false; return; }
    const dt = Math.min((now - last) / 1000, 0.033);
    last = now;
    const t = (now - t0) / 1000;
    mvx *= 0.8; mvy *= 0.8;
    const motion = reduce ? 0 : 1;
    const active = new Set();
    const gustAt = (t - enterT - 3.5) % GUST_EVERY;
    const gustX = motion && entered && gustAt >= 0 && gustAt < GUST_TRAVEL ? (gustAt / GUST_TRAVEL) * (bandW + 240) - 120 : null;

    chips.forEach((c) => {
      if (!c.vis) return;
      const a = ((t + c.ph) / c.per) * Math.PI * 2;
      const wantCalm = c.near || c.drag || c.btn === document.activeElement;
      c.calm += ((wantCalm ? 1 : 0) - c.calm) * Math.min(dt * 8, 1);   // they settle when you reach for them
      const k0 = 1 - 0.85 * c.calm;
      c.fy = Math.sin(a) * (7 * DEPTH_PARALLAX[c.depth] + 2) * motion * k0;
      c.fx = Math.sin(a * 0.5 + c.i) * 4 * motion * k0;
      const rot = Math.sin(a) * 1.2 * motion * k0;

      if (!c.drag) {
        const cx = c.bx + c.ox, cy = c.by + tile / 2 + c.oy;
        const dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy);
        c.near = !reduce && d < 110;
        if (!reduce && d < 130) {
          const k = 1 - d / 130;
          c.vx += dx * k * 1.6 * dt * 10; c.vy += dy * k * 1.6 * dt * 10;                       // lean in
          c.vx += clamp(mvx, -30, 30) * k * 3.5; c.vy += clamp(mvy, -30, 30) * k * 3.5;         // brushed like water
        }
        if (gustX !== null) {
          const g = 1 - Math.abs(c.bx - gustX) / 110;
          if (g > 0) { c.vy -= g * 90 * dt * 10; c.vx += (rtl ? -1 : 1) * g * 25 * dt * 10; }    // a gust passes through
        }
        chips.forEach((o) => {                                                                    // a held chip shoves the others
          if (o.drag && o !== c) {
            const ox = c.bx + c.ox - (o.bx + o.ox), oy = c.by + c.oy - (o.by + o.oy), od = Math.hypot(ox, oy);
            if (od < 110 && od > 0.1) { const f = (1 - od / 110) * 1400; c.vx += (ox / od) * f * dt; c.vy += (oy / od) * f * dt; }
          }
        });
        lines.forEach(({ a: A, b: B }) => {                                                       // linked chips follow with a little lag
          const o = A === c ? B : B === c ? A : null;
          if (o && o.vis) { c.vx += (o.ox - c.ox) * 5 * dt; c.vy += (o.oy - c.oy) * 5 * dt; }
        });
        c.vx += (-c.ox * 28 - c.vx * 4.5) * dt;
        c.vy += (-c.oy * 28 - c.vy * 4.5) * dt;
        c.ox += c.vx * dt; c.oy += c.vy * dt;
      }
      if (c.near || c.drag || c.key === openKey) active.add(c);

      const parallax = DEPTH_PARALLAX[c.depth];
      const px = reduce || mx < -100 ? 0 : ((mx - bandW / 2) / bandW) * 18 * parallax;
      const py = reduce || my < -100 ? 0 : ((my - bandH / 2) / bandH) * 10 * parallax;
      const progress = reduce ? 1 : clamp((t - enterT - c.i * 0.07) / 0.8, 0, 1);
      const ease = 1 - (1 - progress) ** 3;
      c.shiftX = c.fx + px;
      c.shiftY = c.fy + py - (1 - ease) * 70;
      const tilt = clamp(c.vx * 0.02, -14, 14);
      c.el.style.opacity = entered || reduce ? (ease * DEPTH_SOFTNESS[c.depth]).toFixed(2) : '0';
      c.el.style.transform =
        `translate(${(c.bx + c.shiftX + c.ox - tile / 2).toFixed(1)}px, ${(c.by + c.shiftY + c.oy).toFixed(1)}px) ` +
        `rotate(${(rot + tilt).toFixed(1)}deg) scale(${c.drag ? 1.1 : c.near ? 1.05 : 1})`;
    });

    // the lines follow the floating chips; the ones touching an active chip light up
    lines.forEach(({ a, b, line }) => {
      const show = a.vis && b.vis;
      line.style.display = show ? '' : 'none';
      if (!show) return;
      line.setAttribute('x1', a.bx + a.shiftX + a.ox);
      line.setAttribute('y1', a.by + tile / 2 + a.shiftY + a.oy);
      line.setAttribute('x2', b.bx + b.shiftX + b.ox);
      line.setAttribute('y2', b.by + tile / 2 + b.shiftY + b.oy);
      line.classList.toggle('is-on', active.has(a) || active.has(b));
    });
    dots.forEach((o) => {
      const { a, b, line } = o.ln;
      if (!(a.vis && b.vis) || reduce || !entered) { o.dot.style.display = 'none'; return; }
      const u = (((t * o.sp + o.ph) % 1) + 1) % 1;
      const v = o.dir > 0 ? u : 1 - u;
      const x1 = +line.getAttribute('x1'), y1 = +line.getAttribute('y1');
      const x2 = +line.getAttribute('x2'), y2 = +line.getAttribute('y2');
      o.dot.style.display = '';
      o.dot.setAttribute('cx', x1 + (x2 - x1) * v);
      o.dot.setAttribute('cy', y1 + (y2 - y1) * v);
      o.dot.style.opacity = Math.sin(Math.PI * u).toFixed(2);
    });

    placeCard();
    rafId = requestAnimationFrame(frame);
  }
  function go() {
    if (running || !visible || document.hidden) return;
    running = true; last = performance.now();
    rafId = requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    root.classList.toggle('is-paused', !visible);
    if (visible && !entered) { entered = true; enterT = (performance.now() - t0) / 1000; }
    go();
  });
  io.observe(root);
  document.addEventListener('visibilitychange', go);

  // one chip at a time asks for attention, instead of every chip pulsing together
  let attn = 0;
  const attnTimer = window.setInterval(() => {
    if (reduce || !visible || document.hidden) return;
    const shown = chips.filter((x) => x.vis);
    const c = shown[attn % shown.length];
    attn += 1;
    c.el.classList.remove('is-attn');
    void c.el.offsetWidth; // restart the animation
    c.el.classList.add('is-attn');
  }, 2400);

  layout();
  let resizeTimer;
  const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { layout(); placeCard(); }, 80); };
  window.addEventListener('resize', onResize);
  go();

  return {
    setOpen(key) { openKey = key; chips.forEach((c) => c.el.classList.toggle('is-open', c.key === key)); placeCard(); },
    destroy() {
      cancelAnimationFrame(rafId);
      clearInterval(attnTimer);
      clearTimeout(resizeTimer);
      io.disconnect();
      reduceQuery.removeEventListener?.('change', onReduceChange);
      root.removeEventListener('pointermove', onRootMove);
      root.removeEventListener('pointerleave', onRootLeave);
      document.removeEventListener('pointerdown', onDocDown);
      document.removeEventListener('visibilitychange', go);
      window.removeEventListener('resize', onResize);
      cleanups.forEach((fn) => fn());
      links.replaceChildren();
      root.classList.remove('is-live');
      root.style.height = '';
      chips.forEach((c) => { c.el.hidden = false; c.el.style.transform = ''; c.el.style.opacity = ''; });
    },
  };
}
