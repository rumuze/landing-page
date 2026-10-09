import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SCENES } from './illustrations/scenes.generated';
import { cellOn } from './illustrations/labsPattern';

const COPY = {
  ar: { button: 'ولّد رمزًا جديدًا', hint: 'مرّر على الصورة أو اضغط على الرمز' },
  en: { button: 'Generate a new code', hint: 'Move over the picture or press the code' },
};

const AUTO_MS = 6500;

/**
 * The /labs hero: the isometric workbench, alive. The QR modules redraw (on a timer, on a press, or from the button),
 * the scene leans toward the pointer, and the vessel, cube and dots react to it. The picture is decorative, so the
 * button is the keyboard way in. Under reduced motion nothing runs on its own and redraws are instant.
 */
const LabsHero = ({ isAr, className = '' }) => {
  const art = SCENES.labs;
  const frame = useRef(null);
  const svg = useRef(null);
  const paused = useRef(false);
  const burstTimer = useRef(0);
  const [seed, setSeed] = useState(0);
  const copy = COPY[isAr ? 'ar' : 'en'];

  // Stagger the redraw as a wave that runs from the top corner across the code.
  useEffect(() => {
    svg.current?.querySelectorAll('.lh-cell').forEach((cell) => {
      cell.style.setProperty('--w', `${(Number(cell.dataset.x) + Number(cell.dataset.y)) * 45}ms`);
    });
  }, []);

  useEffect(() => {
    svg.current?.querySelectorAll('.lh-cell').forEach((cell) => {
      cell.dataset.on = cellOn(Number(cell.dataset.x), Number(cell.dataset.y), seed) ? '1' : '0';
    });
  }, [seed]);

  // A redraw also plays a short scan over the whole code, so the press is felt even when few modules change.
  const next = useCallback(() => {
    setSeed((value) => value + 1);
    const node = frame.current;
    if (!node) return;
    node.classList.remove('is-burst');
    void node.getBoundingClientRect();
    node.classList.add('is-burst');
    clearTimeout(burstTimer.current);
    burstTimer.current = setTimeout(() => node.classList.remove('is-burst'), 1400);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => {
      if (!paused.current && !document.hidden) next();
    }, AUTO_MS);
    return () => {
      clearInterval(timer);
      clearTimeout(burstTimer.current);
    };
  }, [next]);

  const lean = (event) => {
    const node = frame.current;
    if (!node || event.pointerType === 'touch') return;
    const box = node.getBoundingClientRect();
    const px = ((event.clientX - box.left) / box.width - 0.5) * 2;
    const py = ((event.clientY - box.top) / box.height - 0.5) * 2;
    node.style.setProperty('--px', px.toFixed(3));
    node.style.setProperty('--py', py.toFixed(3));
    node.style.setProperty('--lh-ry', `${(px * 7).toFixed(2)}deg`);
    node.style.setProperty('--lh-rx', `${(-py * 6).toFixed(2)}deg`);
  };

  const leave = () => {
    paused.current = false;
    ['--px', '--py', '--lh-rx', '--lh-ry'].forEach((name) => frame.current?.style.removeProperty(name));
  };

  const press = (event) => {
    if (event.target.closest('.lh-qr')) next();
    const gear = event.target.closest('.lh-gear');
    if (gear) {
      gear.classList.remove('is-pop');
      void gear.getBoundingClientRect();
      gear.classList.add('is-pop');
    }
  };

  return (
    <div className={`lh-wrap ${className}`}>
      <div
        className="ill-frame lh-frame"
        onClick={press}
        onPointerEnter={() => { paused.current = true; }}
        onPointerLeave={leave}
        onPointerMove={lean}
        ref={frame}
      >
        <div className="lh-stage" aria-hidden="true">
          <svg
            className="ill"
            dangerouslySetInnerHTML={{ __html: art.body }}
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            ref={svg}
            viewBox={art.viewBox}
          />
        </div>
      </div>
      <div className="lh-bar">
        <button className="btn-primary lh-button" onClick={next} type="button">{copy.button}</button>
        <span className="lh-hint">{copy.hint}</span>
      </div>
    </div>
  );
};

export default LabsHero;
