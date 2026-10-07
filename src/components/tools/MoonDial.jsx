import React, { useEffect, useId, useRef, useState } from 'react';
import { cycleDelta, litPath } from '../../tools/hijri';
import { prefersReducedMotion } from '../motion/useCanvasLoop';

const STARS = [
  [12, 18, 1.1, 0],
  [86, 12, 0.9, 0.8],
  [92, 58, 1.2, 1.6],
  [8, 70, 0.9, 2.2],
  [24, 90, 1, 0.4],
  [78, 90, 0.8, 1.2],
  [50, 3, 0.8, 2.6],
];

/**
 * The moon at a given point of its cycle (0 new, 0.5 full). When the cycle changes, the lit
 * shape turns through the phases in between, the short way round, like a time-lapse.
 */
const MoonDial = ({ cycle, label }) => {
  const id = useId();
  const [shown, setShown] = useState(0.5);
  const from = useRef(0.5);

  useEffect(() => {
    if (cycle === null || cycle === undefined) return undefined;
    const delta = cycleDelta(from.current, cycle);
    const start = performance.now();
    const duration = prefersReducedMotion() ? 0 : Math.min(1600, 600 + Math.abs(delta) * 2600);
    let raf = 0;
    const step = (now) => {
      const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      const value = (((from.current + delta * eased) % 1) + 1) % 1;
      setShown(value);
      if (t < 1) raf = requestAnimationFrame(step);
      else from.current = cycle;
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [cycle]);

  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={label} className="mx-auto block w-full max-w-[13rem]">
      <defs>
        <radialGradient id={`${id}-lit`} cx="38%" cy="34%" r="80%">
          <stop offset="0%" stopColor="#fbfff0" />
          <stop offset="55%" stopColor="#e6f6c4" />
          <stop offset="100%" stopColor="#b9d98a" />
        </radialGradient>
      </defs>
      {STARS.map(([x, y, r, delay]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#e6f6c4" className="moon-star" style={{ '--d': `${delay}s` }} />
      ))}
      <circle cx="50" cy="50" r="44" fill="#16222f" stroke="rgba(198,240,136,0.22)" strokeWidth="0.8" />
      <path d={litPath(shown)} fill={`url(#${id}-lit)`} className="moon-lit" />
      <g fill="#7f9a62" opacity="0.22">
        <circle cx="38" cy="36" r="5" />
        <circle cx="60" cy="58" r="7" />
        <circle cx="44" cy="68" r="3.4" />
        <circle cx="64" cy="34" r="2.8" />
      </g>
    </svg>
  );
};

export default MoonDial;
