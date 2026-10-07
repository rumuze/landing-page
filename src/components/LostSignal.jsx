import React from 'react';

/**
 * The 404 picture: a signal runs along a circuit, reaches a broken connection, flickers, then finds
 * another route and arrives at the home node. Drawn with the page's colour tokens, so it reads in the
 * light and the dark theme, and moved with CSS only. Always laid out left to right.
 */
const LostSignal = ({ label }) => (
  <svg viewBox="0 0 480 170" role="img" aria-label={label} className="nf-scene mx-auto block w-full max-w-md" dir="ltr">
    <defs>
      <pattern id="nf-dots" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1" className="nf-dot" />
      </pattern>
    </defs>
    <rect width="480" height="170" fill="url(#nf-dots)" />

    {/* The circuit up to the break, and the ghost of the rest. */}
    <path d="M24 130 H110 V76 H214" className="nf-trace" pathLength="100" />
    <path d="M246 76 H330 V130 H440" className="nf-trace nf-ghost" pathLength="100" />

    {/* The pulse on the working part. */}
    <path d="M24 130 H110 V76 H214" className="nf-pulse nf-pulse-a" pathLength="100" />

    {/* The detour that draws itself round the break, and the pulse that follows it. */}
    <path d="M214 76 V34 H330 V130 H440" className="nf-detour" pathLength="100" />
    <path d="M214 76 V34 H330 V130 H440" className="nf-pulse nf-pulse-b" pathLength="100" />

    <circle cx="24" cy="130" r="6" className="nf-node" />
    <circle cx="440" cy="130" r="9" className="nf-home" />
    <circle cx="440" cy="130" r="4" className="nf-node" />
    <g className="nf-break" transform="translate(230 76)">
      <path d="M-6 -6 L6 6 M6 -6 L-6 6" />
    </g>
    <circle cx="230" cy="76" r="8" className="nf-ripple" />
  </svg>
);

export default LostSignal;
