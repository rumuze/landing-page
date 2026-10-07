import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import AdFunnel from '../../components/tools/AdFunnel';
import Odometer from '../../components/tools/Odometer';
import SegmentedControl from '../../components/ui/SegmentedControl';
import CopyButton from '../../components/ui/CopyButton';
import { fieldClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import { calcAdPlan, formatNumber, parseNumber } from '../../tools/adBudget';

const EMPTY = { target: '', budget: '', conversionRate: '', cpc: '', ctr: '', aov: '', margin: '' };
const EXAMPLE = { target: '100', budget: '3000', conversionRate: '2', cpc: '1.5', ctr: '1', aov: '200', margin: '40' };
const PERCENT = new Set(['conversionRate', 'ctr', 'margin']);
const REQUIRED = { target: ['target', 'conversionRate', 'cpc'], budget: ['budget', 'conversionRate', 'cpc'] };
const OPTIONAL = ['ctr', 'aov', 'margin'];

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);
const money = (value) => formatNumber(value, Math.abs(value) >= 1000 ? 0 : 2);
const count = (value) => formatNumber(value, Number.isInteger(value) || value >= 10 ? 0 : 1);

const AdBudgetPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const page = toolsContent[lang].adbudget;
  const common = toolsContent[lang].common;

  const [mode, setMode] = useState('target');
  const [fields, setFields] = useState(EMPTY);
  const [example, setExample] = useState(false);
  const [shown, setShown] = useState(null);

  // Example numbers go in once the page is in the browser, so the first view is a working plan.
  useEffect(() => {
    setFields(EXAMPLE);
    setExample(true);
  }, []);

  const set = (name) => (event) => {
    setExample(false);
    setFields((current) => ({ ...current, [name]: event.target.value }));
  };

  const parsed = useMemo(() => {
    const out = {};
    for (const [name, text] of Object.entries(fields)) out[name] = parseNumber(text, { max: PERCENT.has(name) ? 100 : 1_000_000_000 });
    return out;
  }, [fields]);

  const plan = useMemo(() => calcAdPlan({ mode, ...parsed }), [mode, parsed]);
  if (plan.ok && plan !== shown) setShown(plan);

  const errorFor = (name) => {
    const text = fields[name].trim();
    if (text === '' || parsed[name] !== null) return '';
    return page.errors[name] ?? page.errors.target;
  };

  const view = shown;
  const stages = [
    { id: 'views', label: page.results.funnel.views, value: view?.impressions ?? null, formatted: view?.impressions != null ? count(view.impressions) : '' },
    { id: 'clicks', label: page.results.funnel.clicks, value: view?.clicks ?? null, formatted: view ? count(view.clicks) : '' },
    { id: 'results', label: page.results.funnel.results, value: view?.conversions ?? null, formatted: view ? count(view.conversions) : '' },
  ];

  let verdict = '';
  if (view?.profit != null) {
    verdict = view.profit >= 0 ? fill(page.verdict.profit, { value: money(view.profit) }) : fill(page.verdict.loss, { value: money(Math.abs(view.profit)) });
  } else if (view?.roas != null) {
    verdict = fill(page.verdict.roasOnly, { roas: formatNumber(view.roas, 2) });
  }

  const summary = view
    ? fill(page.summary, { results: count(view.conversions), clicks: count(view.clicks), budget: money(view.budget), cpa: money(view.cpa) })
    : '';

  const field = (name, extra = {}) => (
    <ToolField
      key={name}
      id={`ab-${name}`}
      label={`${page.fields[name]}${OPTIONAL.includes(name) ? ` (${page.optional})` : ''}`}
      hint={page.hints[name]}
      error={errorFor(name)}
    >
      {(props) => (
        <input
          {...props}
          type="text"
          inputMode="decimal"
          dir="ltr"
          autoComplete="off"
          value={fields[name]}
          onChange={set(name)}
          className={`${fieldClass(Boolean(errorFor(name)))} text-left`}
          {...extra}
        />
      )}
    </ToolField>
  );

  const stat = (id, label, value, formatted) => (
    <div key={id} className="rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] bg-white/60 p-4 dark:bg-white/5">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white" data-testid={`stat-${id}`}>
        {value === null || value === undefined ? <span className="text-slate-300 dark:text-slate-600">–</span> : <Odometer value={formatted} />}
      </p>
    </div>
  );

  return (
    <ToolPageShell wide toolId="adbudget">
      <SegmentedControl
        id="ab-mode"
        label={page.modeLabel}
        fill
        options={[
          { value: 'target', label: page.modes.target },
          { value: 'budget', label: page.modes.budget },
        ]}
        value={mode}
        onChange={setMode}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid min-w-0 content-start gap-5">
          {example ? <p className="rounded-xl bg-cyan/10 px-3 py-2 text-sm text-slate-700 dark:text-slate-200">{page.example}</p> : null}
          {REQUIRED[mode].map((name) => field(name))}
          <div className="grid gap-5 border-t border-[rgb(var(--border-subtle)/0.7)] pt-5">{OPTIONAL.map((name) => field(name))}</div>
          <div>
            <button
              type="button"
              id="ab-clear"
              onClick={() => {
                setFields(EMPTY);
                setExample(false);
                setShown(null);
              }}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              {page.clear}
            </button>
          </div>
        </div>

        <div className="min-w-0" aria-live="polite">
          {view ? (
            <div className={`grid gap-6 transition-opacity duration-300 ${plan.ok ? '' : 'opacity-50'}`}>
              <AdFunnel stages={stages} active />
              <p className="text-xs text-slate-500 dark:text-slate-400">{page.results.funnelNote}</p>

              <div className="grid grid-cols-2 gap-3">
                {stat('budget', page.results.budget, view.budget, money(view.budget))}
                {stat('cpa', page.results.cpa, view.cpa, money(view.cpa ?? 0))}
                {view.revenue !== null ? stat('revenue', page.results.revenue, view.revenue, money(view.revenue)) : null}
                {view.roas !== null ? stat('roas', page.results.roas, view.roas, formatNumber(view.roas, 2)) : null}
                {view.breakEvenRoas !== null ? stat('breakeven', page.results.breakEven, view.breakEvenRoas, formatNumber(view.breakEvenRoas, 2)) : null}
                {view.profit !== null ? stat('profit', page.results.profit, view.profit, money(view.profit)) : null}
              </div>

              {verdict ? (
                <p
                  id="ab-verdict"
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-medium ${
                    view.profit !== null && view.profit < 0
                      ? 'border-amber-400 bg-amber-50 text-amber-900 dark:bg-amber-400/10 dark:text-amber-200'
                      : 'border-cyan/50 bg-cyan/10 text-slate-800 dark:text-slate-100'
                  }`}
                >
                  {verdict}
                </p>
              ) : null}

              <div>
                <CopyButton id="ab-copy" text={summary} label={page.copySummary} copiedLabel={common.copied} />
              </div>
            </div>
          ) : (
            <p className="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
              {page.results.empty}
            </p>
          )}
        </div>
      </div>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{page.notice}</p>
    </ToolPageShell>
  );
};

export default AdBudgetPage;
