import React, { useEffect, useRef, useState } from 'react';

const STEP = 5;

/**
 * Two versions of one picture, one on top of the other, with a divider you drag to uncover the
 * second. It sweeps from one side to the middle when it first appears. The divider can be moved by
 * pointer or with the arrow keys, Home and End. Always laid out left to right, so "original" is on
 * the left in either language.
 */
const CompareSlider = ({ original, compressed, labels, width, height }) => {
  const box = useRef(null);
  const [position, setPosition] = useState(100);
  const [dragging, setDragging] = useState(false);

  // First paint at the far side, then move to the middle so the divider glides in.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setPosition(50));
    return () => cancelAnimationFrame(frame);
  }, [original, compressed]);

  const moveTo = (clientX) => {
    const rect = box.current.getBoundingClientRect();
    setPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  const onKeyDown = (event) => {
    const next = { ArrowLeft: position - STEP, ArrowRight: position + STEP, Home: 0, End: 100 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setPosition(Math.max(0, Math.min(100, next)));
  };

  return (
    <div
      ref={box}
      dir="ltr"
      className={`relative mx-auto w-full max-w-2xl touch-none select-none overflow-hidden rounded-2xl bg-slate-200 dark:bg-white/10 ${dragging ? 'compare-dragging' : ''}`}
      style={{ aspectRatio: `${width} / ${height}`, maxHeight: '26rem' }}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragging(true);
        moveTo(event.clientX);
      }}
      onPointerMove={(event) => dragging && moveTo(event.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <img src={compressed} alt="" draggable="false" className="absolute inset-0 h-full w-full object-contain" />
      <img
        src={original}
        alt=""
        draggable="false"
        className="compare-clip absolute inset-0 h-full w-full object-contain"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      <span className="pointer-events-none absolute start-3 top-3 rounded-md bg-slate-950/70 px-2 py-1 text-xs font-semibold text-white">{labels.original}</span>
      <span className="pointer-events-none absolute end-3 top-3 rounded-md bg-slate-950/70 px-2 py-1 text-xs font-semibold text-white">{labels.compressed}</span>

      <div className="compare-handle pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]" style={{ insetInlineStart: `${position}%` }}>
        <button
          type="button"
          role="slider"
          aria-label={labels.slider}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}%`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-black text-slate-900 shadow-lg"
        >
          <span aria-hidden="true">◂▸</span>
        </button>
      </div>
    </div>
  );
};

export default CompareSlider;
