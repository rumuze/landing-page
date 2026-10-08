import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import Odometer from '../../components/tools/Odometer';
import SegmentedControl from '../../components/ui/SegmentedControl';
import CopyButton from '../../components/ui/CopyButton';
import { inputClass, fieldClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import { COMMON_PX, DEFAULT_BASE, SCALE_RATIOS, convert, fluidClamp, parseNumber, sizeAt, trim, typeScale } from '../../tools/cssUnits';

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);

const CssUnitsPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const page = toolsContent[lang].cssunits;
  const common = toolsContent[lang].common;

  const [base, setBase] = useState('16');
  const [value, setValue] = useState('24');
  const [unit, setUnit] = useState('px');
  const [scaleBase, setScaleBase] = useState('16');
  const [ratio, setRatio] = useState('majorThird');
  const [fluid, setFluid] = useState({ minPx: '16', maxPx: '32', minWidth: '400', maxWidth: '1200' });
  const [width, setWidth] = useState(800);

  const baseNumber = parseNumber(base) || DEFAULT_BASE;
  const amount = parseNumber(value);
  const result = amount === null ? null : convert(amount, unit, baseNumber);

  const scale = typeScale(parseNumber(scaleBase) || DEFAULT_BASE, SCALE_RATIOS[ratio], baseNumber);

  const nums = Object.fromEntries(Object.entries(fluid).map(([key, text]) => [key, parseNumber(text)]));
  const fluidValid = Object.values(nums).every((number) => number !== null && number > 0);
  const rule = fluidValid ? fluidClamp({ ...nums, base: baseNumber }) : null;
  const current = rule ? sizeAt(rule, width) : null;
  const css = rule ? `font-size: ${rule.css};` : '';

  const setFluidField = (name) => (event) => setFluid((state) => ({ ...state, [name]: event.target.value }));
  const small = (text) => <span className="text-slate-500 dark:text-slate-400">{text}</span>;

  return (
    <ToolPageShell wide toolId="cssunits">
      <section aria-labelledby="cu-convert-title">
        <h2 id="cu-convert-title" className="type-h4 copy-primary dark:text-white">
          {page.convert.title}
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-[1fr_1fr_1fr]">
          <ToolField id="cu-value" label={page.convert.value} error={amount === null && value.trim() ? page.convert.invalid : ''}>
            {(props) => <input {...props} inputMode="decimal" dir="ltr" value={value} onChange={(event) => setValue(event.target.value)} className={fieldClass(amount === null && Boolean(value.trim()))} />}
          </ToolField>
          <SegmentedControl id="cu-unit" label={page.convert.from} fill className="self-end" options={[{ value: 'px', label: 'px' }, { value: 'rem', label: 'rem' }]} value={unit} onChange={setUnit} />
          <ToolField id="cu-base" label={page.convert.base} hint={page.convert.baseHint}>
            {(props) => <input {...props} inputMode="decimal" dir="ltr" value={base} onChange={(event) => setBase(event.target.value)} className={inputClass} />}
          </ToolField>
        </div>
        <dl className="mt-5 grid grid-cols-3 gap-3 text-center" data-testid="cu-result">
          {['px', 'rem', 'em'].map((key) => (
            <div key={key} className="rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] bg-white/60 p-4 dark:bg-white/5">
              <dt className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400" dir="ltr">
                {key}
              </dt>
              <dd className="mt-1 text-2xl font-black text-slate-900 dark:text-white" data-testid={`cu-${key}`} dir="ltr">
                {result ? <Odometer value={trim(result[key])} /> : '—'}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-4">
          <CopyButton id="cu-copy" text={result ? `${trim(result.rem)}rem` : ''} disabled={!result} label={page.convert.copy} copiedLabel={common.copied} variant="outline" />
        </div>
      </section>

      <section aria-labelledby="cu-table-title" className="mt-10">
        <h2 id="cu-table-title" className="type-h4 copy-primary dark:text-white">
          {page.table.title}
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{fill(page.table.text, { base: trim(baseNumber) })}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6" data-testid="cu-table">
          {COMMON_PX.map((px) => (
            <button
              key={px}
              type="button"
              onClick={() => {
                setUnit('px');
                setValue(String(px));
              }}
              className="rounded-xl border border-[rgb(var(--border-subtle)/0.8)] px-3 py-2 text-start transition-colors hover:border-cyan"
              dir="ltr"
            >
              <span className="block text-sm font-bold text-slate-900 dark:text-white">{px}px</span>
              {small(`${trim(px / baseNumber)}rem`)}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="cu-scale-title" className="mt-10">
        <h2 id="cu-scale-title" className="type-h4 copy-primary dark:text-white">
          {page.scale.title}
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{page.scale.text}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ToolField id="cu-scale-base" label={page.scale.base}>
            {(props) => <input {...props} inputMode="decimal" dir="ltr" value={scaleBase} onChange={(event) => setScaleBase(event.target.value)} className={inputClass} />}
          </ToolField>
          <SegmentedControl
            id="cu-ratio"
            label={page.scale.ratio}
            fill
            className="self-end"
            options={Object.keys(SCALE_RATIOS).map((key) => ({ value: key, label: page.scale.ratios[key] }))}
            value={ratio}
            onChange={setRatio}
          />
        </div>
        <ul className="mt-5 divide-y divide-[rgb(var(--border-subtle)/0.6)]" data-testid="cu-scale" dir="ltr">
          {[...scale].reverse().map((item) => (
            <li key={item.step} className="flex items-baseline justify-between gap-4 py-2">
              <span className="truncate font-semibold text-slate-900 dark:text-white" style={{ fontSize: `${Math.min(item.px, 64)}px`, lineHeight: 1.15 }}>
                {page.scale.sample}
              </span>
              <span className="shrink-0 text-sm text-slate-600 dark:text-slate-300">
                {trim(item.px, 2)}px · {trim(item.rem, 3)}rem
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cu-fluid-title" className="mt-10">
        <h2 id="cu-fluid-title" className="type-h4 copy-primary dark:text-white">
          {page.fluid.title}
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{page.fluid.text}</p>
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            ['minPx', page.fluid.minSize],
            ['maxPx', page.fluid.maxSize],
            ['minWidth', page.fluid.minWidth],
            ['maxWidth', page.fluid.maxWidth],
          ].map(([name, label]) => (
            <ToolField key={name} id={`cu-${name}`} label={label}>
              {(props) => <input {...props} inputMode="decimal" dir="ltr" value={fluid[name]} onChange={setFluidField(name)} className={fieldClass(nums[name] === null || nums[name] <= 0)} />}
            </ToolField>
          ))}
        </div>

        {rule ? (
          <>
            <pre dir="ltr" tabIndex={0} aria-label={page.fluid.output} data-testid="cu-clamp" className="mt-5 overflow-x-auto rounded-2xl bg-[#0b1220] p-4 text-left font-mono text-sm text-[#f1e6b8]">
              <code>{css}</code>
            </pre>
            <div className="mt-3">
              <CopyButton id="cu-copy-css" text={css} label={page.fluid.copy} copiedLabel={common.copied} variant="outline" />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-4 dark:bg-white/5">
              <label htmlFor="cu-width" className="flex items-baseline justify-between gap-3 text-sm font-semibold text-slate-700 dark:text-gray-300">
                <span>{page.fluid.try}</span>
                <span dir="ltr" data-testid="cu-width-label">
                  {width}px → {trim(current, 1)}px
                </span>
              </label>
              <input id="cu-width" type="range" min="320" max="1600" step="10" value={width} onChange={(event) => setWidth(Number(event.target.value))} className="mt-3 w-full accent-[#3CBF00]" />
              <div className="mt-4 overflow-hidden rounded-xl bg-white p-4 dark:bg-slate-900" aria-hidden="true">
                <p className="font-black text-slate-900 dark:text-white" style={{ fontSize: `${current}px`, lineHeight: 1.15 }}>
                  {page.fluid.sample}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p role="alert" className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">
            {page.fluid.invalid}
          </p>
        )}
      </section>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{page.notice}</p>
    </ToolPageShell>
  );
};

export default CssUnitsPage;
