import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon } from 'lucide-react';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import Odometer from '../../components/tools/Odometer';
import MoonDial from '../../components/tools/MoonDial';
import HijriMonth from '../../components/tools/HijriMonth';
import Select from '../../components/ui/Select';
import SegmentedControl from '../../components/ui/SegmentedControl';
import CopyButton from '../../components/ui/CopyButton';
import { fieldClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import { toLatinDigits } from '../../tools/whatsapp';
import {
  GREGORIAN_MONTHS,
  HIJRI_MONTHS,
  WEEKDAYS,
  gregorianToHijri,
  hijriMonthGrid,
  hijriToGregorian,
  illumination,
  moonCycle,
  phaseName,
  toHijriParts,
  utcDate,
} from '../../tools/hijri';

const toInt = (text) => {
  const digits = toLatinDigits(text).trim();
  return /^\d+$/.test(digits) ? Number.parseInt(digits, 10) : Number.NaN;
};

// Turns the form into a result: both dates, the weekday, the month grid and the moon.
function resolve(mode, day, month, year) {
  const d = toInt(day);
  const m = toInt(month);
  const y = toInt(year);
  const converted = mode === 'g' ? gregorianToHijri(y, m, d) : hijriToGregorian(y, m, d);
  if (!converted.ok) {
    const error = mode === 'h' && d === 30 && converted.error === 'invalid' && m >= 1 && m <= 12 ? 'day30' : converted.error;
    return { ok: false, error };
  }
  const { date } = converted;
  const hijri = converted.hijri;
  const gregorian = { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
  const cycle = moonCycle(date);
  return {
    ok: true,
    hijri,
    gregorian,
    weekday: date.getUTCDay(),
    grid: hijriMonthGrid(hijri.year, hijri.month),
    cycle,
    lit: illumination(cycle),
    phase: phaseName(cycle),
  };
}

const HijriConverterPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const page = toolsContent[lang].hijri;
  const common = toolsContent[lang].common;

  const [mode, setMode] = useState('g');
  const [form, setForm] = useState({ day: '', month: '', year: '' });
  const [shown, setShown] = useState(null);

  const setField = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  // The page is rendered ahead of time, so "today" can only be read once it is in the browser.
  useEffect(() => {
    const now = new Date();
    setForm({ day: String(now.getDate()), month: String(now.getMonth() + 1), year: String(now.getFullYear()) });
  }, []);

  const result = useMemo(() => resolve(mode, form.day, form.month, form.year), [mode, form]);
  const empty = !form.day && !form.month && !form.year;
  if (result.ok && result !== shown) setShown(result);

  const switchMode = (next) => {
    if (next === mode) return;
    if (shown) {
      const source = next === 'g' ? shown.gregorian : shown.hijri;
      setForm({ day: String(source.day), month: String(source.month), year: String(source.year) });
    }
    setMode(next);
  };

  const useToday = () => {
    const now = new Date();
    const date = utcDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const source = mode === 'g' ? { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() } : toHijriParts(date);
    if (source) setForm({ day: String(source.day), month: String(source.month), year: String(source.year) });
  };

  const pickDay = (day) => {
    if (!shown) return;
    setMode('h');
    setForm({ day: String(day), month: String(shown.hijri.month), year: String(shown.hijri.year) });
  };

  const monthOptions = (mode === 'g' ? GREGORIAN_MONTHS[lang] : HIJRI_MONTHS[lang]).map((name, index) => ({
    value: String(index + 1),
    label: name,
    meta: String(index + 1),
  }));
  const error = !result.ok && !empty ? page.errors[result.error] : '';
  const dimmed = !result.ok && shown;

  const hijriText = shown ? `${shown.hijri.day} ${HIJRI_MONTHS[lang][shown.hijri.month - 1]} ${shown.hijri.year} ${page.suffixHijri}` : '';
  const gregText = shown
    ? `${shown.gregorian.day} ${GREGORIAN_MONTHS[lang][shown.gregorian.month - 1]} ${shown.gregorian.year} ${page.suffixGregorian}`
    : '';
  const copyText = shown ? `${hijriText} ${page.equals} ${gregText}` : '';
  const moonLabel = shown ? `${page.moon.phases[shown.phase]}, ${Math.round(shown.lit * 100)}% ${page.moon.illuminated}` : page.moon.title;

  const row = (label, parts, monthName, suffix, testId) => (
    <div className="rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] bg-white/60 p-4 dark:bg-white/5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p data-testid={testId} className="mt-1 flex flex-wrap items-baseline gap-x-3 text-2xl font-black leading-tight text-slate-900 dark:text-white sm:text-4xl" dir={isAr ? 'rtl' : 'ltr'}>
        {parts ? (
          <>
            <Odometer value={parts.day} />
            <span key={`${monthName}-${parts.month}`} className="tool-rise">
              {monthName}
            </span>
            <Odometer value={parts.year} />
            <span className="text-lg font-bold text-cyan-800 dark:text-cyan">{suffix}</span>
          </>
        ) : (
          <span className="text-slate-300 dark:text-slate-600">–</span>
        )}
      </p>
    </div>
  );

  return (
    <ToolPageShell wide toolId="hijri">
      <SegmentedControl
        id="hj-mode"
        label={page.modeLabel}
        fill
        options={[
          { value: 'g', label: page.modes.g },
          { value: 'h', label: page.modes.h },
        ]}
        value={mode}
        onChange={switchMode}
      />

      <div className="mt-6 grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)_minmax(0,1fr)] gap-3 sm:gap-4">
        <ToolField id="hj-day" label={page.day}>
          {(props) => (
            <input {...props} type="text" inputMode="numeric" autoComplete="off" dir="ltr" value={form.day} onChange={setField('day')} className={`${fieldClass(Boolean(error))} text-center`} />
          )}
        </ToolField>
        <ToolField id="hj-month" label={page.month}>
          {(props) => (
            <Select
              {...props}
              value={form.month}
              onChange={(next) => setForm((current) => ({ ...current, month: next }))}
              options={monthOptions}
              placeholder="–"
            />
          )}
        </ToolField>
        <ToolField id="hj-year" label={page.year}>
          {(props) => (
            <input {...props} type="text" inputMode="numeric" autoComplete="off" dir="ltr" value={form.year} onChange={setField('year')} className={`${fieldClass(Boolean(error))} text-center`} />
          )}
        </ToolField>
      </div>

      <div className="mt-3 flex min-h-[1.5rem] flex-wrap items-center justify-between gap-3">
        <p id="hj-error" role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
        <button type="button" id="hj-today" onClick={useToday} className="text-sm font-semibold text-cyan-800 hover:underline dark:text-cyan">
          {page.today}
        </button>
      </div>

      <div className={`mt-6 grid gap-4 transition-opacity duration-300 ${dimmed ? 'opacity-50' : ''}`} aria-live="polite">
        {row(
          page.hijriLabel,
          shown?.hijri,
          shown ? HIJRI_MONTHS[lang][shown.hijri.month - 1] : '',
          page.suffixHijri,
          'hj-hijri',
        )}
        {row(
          page.gregorianLabel,
          shown?.gregorian,
          shown ? GREGORIAN_MONTHS[lang][shown.gregorian.month - 1] : '',
          page.suffixGregorian,
          'hj-gregorian',
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {page.weekdayLabel}:{' '}
            <strong id="hj-weekday" key={shown?.weekday} className="tool-rise inline-block text-base text-slate-900 dark:text-white">
              {shown ? WEEKDAYS[lang][shown.weekday] : '–'}
            </strong>
          </p>
          <CopyButton id="hj-copy" text={copyText} disabled={!shown || !result.ok} label={page.copyResult} copiedLabel={common.copied} />
        </div>
      </div>

      {shown ? (
        <div className="mt-8 grid gap-6 border-t border-[rgb(var(--border-subtle)/0.7)] pt-8 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] md:items-start">
          <div className="rounded-2xl bg-[#0b1220] p-5 text-center text-white">
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-300">
              <Moon size={15} aria-hidden="true" /> {page.moon.title}
            </p>
            <MoonDial cycle={shown.cycle} label={moonLabel} />
            <p id="hj-phase" className="mt-3 text-lg font-bold">
              {page.moon.phases[shown.phase]}
            </p>
            <p className="text-sm text-slate-300">
              <Odometer value={Math.round(shown.lit * 100)} />% {page.moon.illuminated}
            </p>
          </div>
          <div>
            <h2 className="type-h4 copy-primary mb-4 dark:text-white">
              {page.calendar.title}: {HIJRI_MONTHS[lang][shown.hijri.month - 1]} {shown.hijri.year}
              <span className="ms-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                {shown.grid ? `${shown.grid.length} ${page.calendar.days}` : ''}
              </span>
            </h2>
            {shown.grid ? (
              <HijriMonth
                grid={shown.grid}
                year={shown.hijri.year}
                month={shown.hijri.month}
                selected={shown.hijri.day}
                weekdays={page.calendar.weekdays}
                pickLabel={page.calendar.pick}
                onPick={pickDay}
                isAr={isAr}
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">{page.moon.approximate}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{page.approximate}</p>
    </ToolPageShell>
  );
};

export default HijriConverterPage;
