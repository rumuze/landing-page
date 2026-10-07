import React from 'react';
import { addDays } from '../../tools/hijri';

/**
 * One Hijri month as a calendar. Each cell shows the Hijri day with its Gregorian day beneath;
 * the selected day is filled and the cells pop in one after another when the month changes.
 */
const HijriMonth = ({ grid, year, month, selected, weekdays, pickLabel, onPick, isAr }) => {
  const cells = [];
  for (let blank = 0; blank < grid.firstWeekday; blank += 1) cells.push({ blank: true, key: `b${blank}` });
  for (let day = 1; day <= grid.length; day += 1) {
    const date = addDays(grid.first, day - 1);
    cells.push({ day, greg: date.getUTCDate(), first: date.getUTCDate() === 1, key: `d${day}` });
  }

  return (
    <div key={`${year}-${month}`} className="grid max-w-xl grid-cols-7 gap-1.5 sm:gap-2" dir={isAr ? 'rtl' : 'ltr'}>
      {weekdays.map((name) => (
        <div key={name} className="pb-1 text-center text-[0.7rem] font-semibold text-slate-500 dark:text-slate-400 sm:text-xs">
          {name}
        </div>
      ))}
      {cells.map((cell, index) =>
        cell.blank ? (
          <span key={cell.key} aria-hidden="true" />
        ) : (
          <button
            key={cell.key}
            type="button"
            onClick={() => onPick(cell.day)}
            aria-label={`${pickLabel}: ${cell.day}`}
            aria-pressed={cell.day === selected}
            style={{ '--i': index }}
            className={`hmonth-cell flex aspect-[5/4] min-w-0 flex-col items-center justify-center rounded-xl border text-center leading-none transition-colors ${
              cell.day === selected
                ? 'border-cyan bg-cyan text-slate-950'
                : 'border-[rgb(var(--border-subtle)/0.8)] bg-white/60 text-slate-800 hover:border-cyan dark:bg-white/5 dark:text-slate-100'
            }`}
          >
            <span className="text-sm font-bold sm:text-base">{cell.day}</span>
            <span className={`mt-1 text-[0.6rem] sm:text-[0.68rem] ${cell.day === selected ? 'text-slate-800' : 'text-slate-500 dark:text-slate-400'}`}>
              {cell.greg}
              {cell.first ? '•' : ''}
            </span>
          </button>
        ),
      )}
    </div>
  );
};

export default HijriMonth;
