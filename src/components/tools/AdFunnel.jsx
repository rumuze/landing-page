import React from 'react';
import Odometer from './Odometer';
import { FUNNEL_WIDTHS } from '../../tools/adBudget';

/**
 * Views, clicks and results as three bars that narrow in that order. The bars show the order of the
 * steps only (their widths are fixed steps, not the real proportions); the numbers are the real ones.
 * A stage with no value (views, when no click-through rate was given) is dimmed and shows a dash.
 */
const AdFunnel = ({ stages, active }) => (
  <ol className="grid gap-3" aria-label={stages.map((stage) => stage.label).join(' > ')}>
    {stages.map((stage, index) => {
      const has = active && stage.value !== null;
      return (
        <li key={stage.id} className="flex items-center gap-3" data-testid={`funnel-${stage.id}`}>
          <span className="w-20 shrink-0 text-xs font-semibold text-slate-600 dark:text-slate-300 sm:w-24">{stage.label}</span>
          <div className="min-w-0 flex-1" dir="ltr">
            <div
              className={`funnel-bar flex h-11 items-center rounded-lg px-3 text-sm font-bold ${
                has ? 'bg-gradient-to-r from-cyan to-emerald-400 text-slate-950' : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
              }`}
              style={{ width: `${has ? FUNNEL_WIDTHS[index] * 100 : 100}%`, opacity: has ? 1 : 0.6 }}
            >
              {has ? <Odometer value={stage.formatted} /> : <span>–</span>}
            </div>
          </div>
        </li>
      );
    })}
  </ol>
);

export default AdFunnel;
