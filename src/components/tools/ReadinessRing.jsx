import React from 'react';

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** A ring that fills as the share `value` (0 to 1) grows; the centre shows the percentage. */
const ReadinessRing = ({ value, label }) => {
  const percent = Math.round(value * 100);
  const done = value >= 1;
  return (
    <div className="relative h-16 w-16 shrink-0" role="img" aria-label={`${label}: ${percent}%`}>
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={RADIUS} fill="none" strokeWidth="6" className="stroke-slate-200 dark:stroke-white/10" />
        <circle
          cx="32"
          cy="32"
          r={RADIUS}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - value)}
          className="tool-ring"
          stroke={done ? '#3CBF00' : '#2dd4bf'}
        />
      </svg>
      <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-sm font-bold text-slate-900 dark:text-white">
        {percent}%
      </span>
    </div>
  );
};

export default ReadinessRing;
