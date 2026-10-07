import React from 'react';

const chipClass = (on) =>
  `min-h-[2.5rem] rounded-full border-2 px-4 text-sm font-semibold transition-all duration-200 ${
    on ? 'border-cyan bg-cyan text-slate-950' : 'border-slate-200 text-slate-700 hover:border-cyan dark:border-white/10 dark:text-slate-200'
  }`;

/**
 * A wrapping row of toggle chips. With `multiple` the value is an array and each chip toggles on its
 * own; otherwise the value is one option, and pressing the chosen chip again clears it unless
 * `required` is set. Chips are buttons with aria-pressed, so each reads as "on" or "off".
 */
const ChipGroup = ({ id, label, options, value, onChange, multiple = false, required = false, labelClassName = '' }) => {
  const isOn = (option) => (multiple ? value.includes(option) : value === option);

  const press = (option) => {
    if (multiple) onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);
    else onChange(value === option && !required ? '' : option);
  };

  return (
    <div role="group" aria-labelledby={label ? `${id}-label` : undefined}>
      {label ? (
        <p id={`${id}-label`} className={`mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300 ${labelClassName}`}>
          {label}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button key={option.value} type="button" id={`${id}-${option.value}`} aria-pressed={isOn(option.value)} onClick={() => press(option.value)} className={chipClass(isOn(option.value))}>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChipGroup;
