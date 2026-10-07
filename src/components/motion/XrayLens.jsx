import React, { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "./useCanvasLoop";

// What sits behind each part of the screen. The wording follows what Rveta, our delivery
// platform, is documented to do (see homeContent work cards), not invented endpoints.
const NOTES = {
  bar: "<DriverApp /> · Flutter",
  status: "delivery status updates",
  map: "live location · Firebase",
  order: "order assignment · Laravel API",
  chat: "customer chat · push notifications",
  deliver: "status update → backend",
  lock: "biometric app lock",
};

const Screen = ({ ui }) => (
  <>
    <div className="xr-bar" data-c={NOTES.bar}>
      <b>{ui.brand}</b>
      <span className="xr-pill" data-c={NOTES.status}>
        {ui.status}
      </span>
    </div>
    <div className="xr-map" data-c={NOTES.map}>
      <i className="xr-pin" />
    </div>
    <div className="xr-order" data-c={NOTES.order}>
      <h4>{ui.order}</h4>
      <p data-c={NOTES.chat}>{ui.chat}</p>
    </div>
    <div className="xr-actions">
      <span className="xr-btn" data-c={NOTES.deliver}>
        {ui.deliver}
      </span>
      <span className="xr-btn xr-ghost" data-c={NOTES.lock}>
        {ui.lock}
      </span>
    </div>
  </>
);

/**
 * A finished app screen with a lens that reveals the engineering behind it. Pointer or
 * finger moves the lens; when nobody is steering it drifts on its own. With reduced motion
 * the lens rests in the middle.
 */
const XrayLens = ({ copy, className = "" }) => {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    const reduce = prefersReducedMotion();
    let lastTouch = -9999;
    let raf = 0;
    let onScreen = false;
    const born = performance.now();

    const place = (x, y) => {
      box.style.setProperty("--x", `${x}px`);
      box.style.setProperty("--y", `${y}px`);
    };
    const size = () => {
      box.style.setProperty("--r", `${Math.round(clamp(box.clientWidth * 0.2, 64, 120))}px`);
      if (reduce || lastTouch < 0) place(box.clientWidth / 2, box.clientHeight / 2);
    };
    size();

    const steer = (event) => {
      const rect = box.getBoundingClientRect();
      place(event.clientX - rect.left, event.clientY - rect.top);
      lastTouch = performance.now();
    };
    box.addEventListener("pointermove", steer, { passive: true });
    box.addEventListener("pointerdown", steer, { passive: true });

    let lastPlaced = 0;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (now - lastPlaced < 32) return;
      lastPlaced = now;
      if (now - lastTouch > 2500) {
        const t = now - born;
        const w = box.clientWidth;
        const h = box.clientHeight;
        place(w / 2 + Math.sin(t * 0.0007) * w * 0.32, h / 2 + Math.sin(t * 0.0011) * h * 0.28);
      }
    };
    const run = () => {
      if (!raf && onScreen && !reduce && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Older browsers without these observers keep the lens still, in the middle.
    const intersection =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              onScreen = entry.isIntersecting;
              if (onScreen) run();
              else stop();
            },
            { threshold: 0.1 },
          )
        : null;
    intersection?.observe(box);
    const resize = "ResizeObserver" in window ? new ResizeObserver(size) : null;
    resize?.observe(box);
    const onVisibility = () => (document.hidden ? stop() : run());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      intersection?.disconnect();
      resize?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      box.removeEventListener("pointermove", steer);
      box.removeEventListener("pointerdown", steer);
    };
  }, []);

  return (
    <figure className={className}>
      <div ref={boxRef} className="xray" role="img" aria-label={copy.label}>
        <div className="xr-layer xr-real" aria-hidden="true">
          <Screen ui={copy} />
        </div>
        <div className="xr-layer xr-x" aria-hidden="true">
          <Screen ui={copy} />
        </div>
        <div className="xr-lens" aria-hidden="true" />
      </div>
      <figcaption className="type-small copy-muted mt-3 dark:text-slate-400">{copy.hint}</figcaption>
    </figure>
  );
};

export default XrayLens;
