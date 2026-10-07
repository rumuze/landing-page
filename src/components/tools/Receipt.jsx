import React from 'react';
import Odometer from './Odometer';

/**
 * The VAT result as a till receipt. The paper prints in when `printKey` changes (a new country or
 * direction), the amounts roll as they change, and the bar below splits the total into the price and
 * the VAT. `rows` is [{ id, label, value, strong }] with `value` already formatted.
 */
const Receipt = ({ title, rows, share, shareLabel, empty, printKey, active, isAr }) => (
  <div key={printKey} className="receipt-print receipt-paper mx-auto w-full max-w-sm rounded-t-xl px-6 pb-9 pt-6 shadow-xl" dir={isAr ? 'rtl' : 'ltr'}>
    <p className="text-center text-[0.7rem] font-bold uppercase tracking-[0.25em] text-slate-600">{title}</p>
    <div className="my-3 border-t-2 border-dashed border-slate-300" />

    {active ? (
      <>
        <dl className="grid gap-3">
          {rows.map((row) => (
            <div
              key={row.id}
              className={`flex items-baseline justify-between gap-4 ${row.strong ? 'border-t-2 border-dashed border-slate-300 pt-3 text-lg font-black' : 'text-sm'}`}
            >
              <dt className={row.strong ? '' : 'text-slate-600'}>{row.label}</dt>
              <dd className={`tabular-nums ${row.strong ? 'text-2xl' : 'text-base font-semibold'}`} data-testid={`receipt-${row.id}`}>
                <Odometer value={row.value} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5">
          <div className="flex h-3 overflow-hidden rounded-full bg-slate-200" aria-hidden="true" dir="ltr">
            <div className="receipt-bar bg-slate-700" style={{ width: `${(1 - share) * 100}%` }} />
            <div className="receipt-bar bg-cyan" style={{ width: `${share * 100}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-600">{shareLabel}</p>
        </div>
      </>
    ) : (
      <p className="py-8 text-center text-sm text-slate-600">{empty}</p>
    )}
  </div>
);

export default Receipt;
