import { useEffect, useRef } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const isDarkTheme = () =>
  typeof document !== "undefined" && document.documentElement.classList.contains("dark");

/**
 * Drives one canvas: sizes it to its CSS box (DPR aware), then calls `frame` on every
 * animation frame while the canvas is on screen and the tab is visible. Nothing runs
 * during server rendering. With reduced motion the scene is painted once, settled,
 * using `warm` frames of simulated time, and never animates.
 *
 * `setup(s)` runs on mount and on every resize. `s` carries { ctx, W, H, dark, reduce,
 * pointer }, where `pointer` is tracked on `listenOn` (default: the canvas's parent).
 */
export function useCanvasLoop(canvasRef, { setup, frame, warm = 1, startDelay = 0, forceDark = false }) {
  const callbacks = useRef({ setup, frame });

  useEffect(() => {
    callbacks.current = { setup, frame };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (!canvas || !ctx) return undefined;

    const reduce = prefersReducedMotion();
    const pointer = { x: 0, y: 0, in: false, down: false, moved: 0 };
    const s = { ctx, W: 0, H: 0, dark: true, reduce, pointer };
    let raf = 0;
    let last = 0;
    let onScreen = false;
    let armed = false;
    let started = false;
    let disposed = false;
    let startTimer = 0;

    const readTheme = () => {
      s.dark = forceDark || isDarkTheme();
    };

    const paintStatic = () => {
      for (let i = 0; i < warm; i += 1) callbacks.current.frame(s, 1000 + i * 16, 16);
    };

    const fit = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.W = Math.max(1, Math.floor(box.width));
      s.H = Math.max(1, Math.floor(box.height));
      canvas.width = s.W * dpr;
      canvas.height = s.H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readTheme();
      callbacks.current.setup?.(s);
      if (reduce) paintStatic();
    };

    const tick = (now) => {
      const dt = Math.min(50, last ? now - last : 16);
      last = now;
      readTheme();
      callbacks.current.frame(s, now, dt);
      raf = requestAnimationFrame(tick);
    };
    const run = () => {
      if (raf || disposed || !started || !onScreen || document.hidden || reduce) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const target = canvas.parentElement || canvas;
    const track = (event) => {
      const box = canvas.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
      pointer.moved += 1;
    };
    const onMove = (event) => {
      track(event);
      pointer.in = true;
    };
    const onDown = (event) => {
      track(event);
      pointer.in = true;
      pointer.down = true;
    };
    const onUp = () => {
      pointer.down = false;
    };
    const onLeave = () => {
      pointer.in = false;
      pointer.down = false;
    };
    target.addEventListener("pointermove", onMove, { passive: true });
    target.addEventListener("pointerdown", onDown, { passive: true });
    target.addEventListener("pointerup", onUp, { passive: true });
    target.addEventListener("pointercancel", onLeave, { passive: true });
    target.addEventListener("pointerleave", onLeave, { passive: true });

    // Nothing is measured or built until the canvas has both waited out `startDelay` and
    // come on screen, so a canvas far down the page costs nothing while the page loads.
    const maybeStart = () => {
      if (disposed || started || !armed || !onScreen) return;
      started = true;
      fit();
      run();
    };
    const begin = () => {
      armed = true;
      maybeStart();
    };
    if (startDelay > 0) {
      startTimer = window.setTimeout(() => {
        if ("requestIdleCallback" in window) window.requestIdleCallback(begin, { timeout: 1200 });
        else begin();
      }, startDelay);
    } else {
      begin();
    }

    const resizeObserver =
      "ResizeObserver" in window
        ? new ResizeObserver(() => {
            if (!started) return;
            const box = canvas.getBoundingClientRect();
            if (Math.floor(box.width) !== s.W || Math.floor(box.height) !== s.H) fit();
          })
        : null;
    resizeObserver?.observe(canvas);

    const intersection =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              onScreen = entry.isIntersecting;
              if (!onScreen) stop();
              else if (started) run();
              else maybeStart();
            },
            { threshold: 0.05 },
          )
        : null;
    if (intersection) intersection.observe(canvas);
    else {
      onScreen = true;
      maybeStart();
    }

    const onVisibility = () => (document.hidden ? stop() : run());
    document.addEventListener("visibilitychange", onVisibility);

    // A theme switch repaints a static (reduced-motion) scene; animated ones pick it up per frame.
    const themeObserver = new MutationObserver(() => {
      if (reduce && started) fit();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      disposed = true;
      stop();
      window.clearTimeout(startTimer);
      resizeObserver?.disconnect();
      intersection?.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerdown", onDown);
      target.removeEventListener("pointerup", onUp);
      target.removeEventListener("pointercancel", onLeave);
      target.removeEventListener("pointerleave", onLeave);
    };
    // The loop is created once per canvas; setup/frame are read through `callbacks`.
  }, [canvasRef, forceDark, startDelay, warm]);
}
