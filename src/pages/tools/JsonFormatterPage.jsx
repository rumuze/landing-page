import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, CheckCircle2, Download } from 'lucide-react';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import Odometer from '../../components/tools/Odometer';
import CodeStream from '../../components/tools/CodeStream';
import { saveText } from '../../components/tools/saveFile';
import SegmentedControl from '../../components/ui/SegmentedControl';
import CopyButton from '../../components/ui/CopyButton';
import { buttonClass, fieldClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import { EXAMPLE_JSON, INDENTS, processJson } from '../../tools/jsonFormat';

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);
const group = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// A very long result is shown in part; copying and saving still use all of it.
const SHOWN_LINES = 400;

const JsonFormatterPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const page = toolsContent[lang].json;
  const common = toolsContent[lang].common;

  const [text, setText] = useState('');
  const [mode, setMode] = useState('format');
  const [indent, setIndent] = useState('2');
  const [sortKeys, setSortKeys] = useState(false);

  // The example is put in once the page is in the browser, so the first view has something to read.
  useEffect(() => {
    setText(EXAMPLE_JSON);
  }, []);

  const result = useMemo(() => processJson(text, { mode, indent, sortKeys }), [text, mode, indent, sortKeys]);
  const valid = result.status === 'valid';
  const lines = useMemo(() => (valid ? result.output.split('\n') : []), [valid, result.output]);
  const cut = lines.length > SHOWN_LINES;
  const bad = result.status === 'invalid' ? result.error : null;
  const badLine = bad?.line ? text.split('\n')[bad.line - 1] ?? '' : '';
  const saved = valid ? Math.round((1 - result.bytesOut / Math.max(1, result.bytesIn)) * 100) : 0;

  const stat = (id, label, value) => (
    <div key={id} className="rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] bg-white/60 p-4 dark:bg-white/5">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white" data-testid={`json-${id}`}>
        {value}
      </p>
    </div>
  );

  return (
    <ToolPageShell wide toolId="json">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="min-w-0">
          <ToolField id="json-input" label={page.inputLabel}>
            {(props) => (
              <textarea
                {...props}
                rows={16}
                dir="ltr"
                spellCheck={false}
                value={text}
                placeholder={page.placeholder}
                onChange={(event) => setText(event.target.value)}
                className={`${fieldClass(Boolean(bad))} resize-y font-mono text-sm leading-6`}
              />
            )}
          </ToolField>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <button type="button" id="json-example" onClick={() => setText(EXAMPLE_JSON)} className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              {page.example}
            </button>
            <button type="button" id="json-clear" onClick={() => setText('')} className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              {page.clear}
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            <SegmentedControl
              id="json-mode"
              label={page.modeLabel}
              fill
              options={[
                { value: 'format', label: page.modes.format },
                { value: 'minify', label: page.modes.minify },
              ]}
              value={mode}
              onChange={setMode}
            />
            {mode === 'format' ? (
              <SegmentedControl id="json-indent" label={page.indentLabel} fill options={INDENTS.map((key) => ({ value: key, label: page.indents[key] }))} value={indent} onChange={setIndent} />
            ) : null}
            <label htmlFor="json-sort" className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-gray-300">
              <input id="json-sort" type="checkbox" checked={sortKeys} onChange={(event) => setSortKeys(event.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-[#3CBF00]" />
              {page.sortKeys}
            </label>
          </div>
        </div>

        <div className="min-w-0">
          <div role="status" aria-live="polite" data-testid="json-status" data-state={result.status} className="min-h-[3.25rem]">
            {valid ? (
              <p className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">
                <CheckCircle2 size={18} aria-hidden="true" className="shrink-0" />
                {page.valid}
              </p>
            ) : null}
            {bad ? (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-500/10 dark:text-red-300">
                <p className="flex items-center gap-2 font-semibold">
                  <AlertTriangle size={18} aria-hidden="true" className="shrink-0" />
                  {bad.line ? fill(page.invalidAt, { line: bad.line, column: bad.column }) : page.invalid}
                </p>
                {bad.line ? (
                  <pre dir="ltr" className="mt-2 overflow-x-auto rounded-xl bg-white/70 p-2 text-left font-mono text-xs text-slate-800 dark:bg-black/30 dark:text-slate-200" data-testid="json-error-line">
                    {badLine.slice(0, 160)}
                    {'\n'}
                    {' '.repeat(Math.min(Math.max(0, bad.column - 1), 160))}^
                  </pre>
                ) : null}
                {result.hint ? <p className="mt-2" data-testid="json-hint">{page.hints[result.hint]}</p> : null}
              </div>
            ) : null}
            {result.status === 'tooDeep' ? (
              <p className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
                <AlertTriangle size={18} aria-hidden="true" className="shrink-0" />
                {page.tooDeep}
              </p>
            ) : null}
            {result.status === 'empty' ? <p className="px-1 py-3 text-sm text-slate-500 dark:text-slate-400">{page.empty}</p> : null}
          </div>

          {valid ? (
            <>
              <div className="mt-4">
                <CodeStream lines={cut ? lines.slice(0, SHOWN_LINES) : lines} streamKey={`${mode}-${indent}-${sortKeys}`} label={page.output} />
                {cut ? <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{fill(page.cut, { n: group(SHOWN_LINES), total: group(lines.length) })}</p> : null}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <CopyButton id="json-copy" text={result.output} label={page.copy} copiedLabel={common.copied} />
                <button
                  type="button"
                  id="json-download"
                  onClick={() => saveText('data.json', `${result.output}\n`, 'application/json')}
                  className={`${buttonClass} border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`}
                >
                  <Download size={18} aria-hidden="true" />
                  {page.download}
                </button>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stat('keys', page.stats.keys, <Odometer value={group(result.stats.keys)} />)}
                {stat('depth', page.stats.depth, <Odometer value={group(result.stats.depth)} />)}
                {stat('bytes', page.stats.bytes, <Odometer value={group(result.bytesOut)} />)}
                {stat('saved', mode === 'minify' ? page.stats.saved : page.stats.added, <Odometer value={`${Math.abs(saved)}%`} />)}
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300" data-testid="json-types">
                {Object.entries(result.stats.counts)
                  .filter(([, count]) => count > 0)
                  .map(([type, count]) => `${page.types[type]} ${count}`)
                  .join(' · ')}
              </p>
              {result.unsafeNumber ? (
                <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200" data-testid="json-unsafe">
                  {page.unsafeNumber}
                </p>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{page.notice}</p>
    </ToolPageShell>
  );
};

export default JsonFormatterPage;
