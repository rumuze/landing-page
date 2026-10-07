import React from 'react';

/**
 * A short row of mutually exclusive choices drawn as one control (a direction, a device). Built as a
 * radio group: one choice is always selected and the arrow keys move between them.
 */
const SegmentedControl = ({ id, label, options, value, onChange, fill = false, className = '' }) => {
  const move = (event, index) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    // In a right-to-left page the arrows are mirrored.
    const flip = event.currentTarget.closest('[dir="rtl"]') && (event.key === 'ArrowRight' || event.key === 'ArrowLeft') ? -1 : 1;
    const next = (index + step * flip + options.length) % options.length;
    event.preventDefault();
    onChange(options[next].value);
    document.getElementById(`${id}-${options[next].value}`)?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`${fill ? 'grid' : 'inline-grid'} auto-cols-fr grid-flow-col gap-1 rounded-2xl bg-slate-100 p-1.5 dark:bg-white/5 ${className}`}
    >
      {options.map((option, index) => {
        const on = option.value === value;
        return (
          <button
            key={option.value}
            id={`${id}-${option.value}`}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => move(event, index)}
            className={`min-h-[2.5rem] rounded-xl px-4 text-sm font-semibold transition-all duration-200 ${
              on ? 'bg-cyan text-slate-950 shadow' : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
