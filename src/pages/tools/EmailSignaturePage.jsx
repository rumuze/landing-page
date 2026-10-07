import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import CodeStream from '../../components/tools/CodeStream';
import SegmentedControl from '../../components/ui/SegmentedControl';
import CopyButton from '../../components/ui/CopyButton';
import { buttonClass, fieldClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import {
  EXAMPLE,
  TEMPLATES,
  buildSignatureHtml,
  buildSignatureText,
  formatHtml,
  isEmail,
  isHexColor,
  normalizeUrl,
  telHref,
} from '../../tools/emailSignature';
import { tokenizeHtmlLine } from '../../tools/socialPreview';

const EMPTY = { name: '', title: '', company: '', phone: '', email: '', website: '', address: '', logo: '' };
const ACCENTS = ['#006b54', '#2563eb', '#be123c', '#b45309', '#7c3aed', '#334155'];
const FIELD_ORDER = ['name', 'title', 'company', 'phone', 'email', 'website', 'address', 'logo'];
const LTR_FIELDS = new Set(['phone', 'email', 'website', 'logo']);
const CHECKS = {
  email: (value) => isEmail(value),
  phone: (value) => telHref(value) !== null,
  website: (value) => normalizeUrl(value) !== null,
  logo: (value) => normalizeUrl(value) !== null && /^https?:/i.test(value.trim()),
};

const EmailSignaturePage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const page = toolsContent[lang].signature;
  const common = toolsContent[lang].common;

  const [values, setValues] = useState(EMPTY);
  const [template, setTemplate] = useState('classic');
  const [accent, setAccent] = useState(ACCENTS[0]);

  // An example is filled in once the page is in the browser, so the first view is a working signature.
  useEffect(() => {
    setValues(EXAMPLE);
  }, []);

  const set = (name) => (event) => setValues((current) => ({ ...current, [name]: event.target.value }));
  const errorFor = (name) => (CHECKS[name] && values[name].trim() !== '' && !CHECKS[name](values[name]) ? page.errors[name] : '');

  // The preview HTML is built by buildSignatureHtml, which escapes everything typed and allows only
  // web, mail and phone links, so it is safe to place in the page.
  const previewHtml = useMemo(() => buildSignatureHtml(values, { template, accent, preview: true }), [values, template, accent]);
  const html = useMemo(() => buildSignatureHtml(values, { template, accent }), [values, template, accent]);
  const lines = useMemo(() => formatHtml(html), [html]);
  const text = useMemo(() => buildSignatureText(values), [values]);

  return (
    <ToolPageShell wide toolId="signature">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="min-w-0">
          <div className="grid gap-4 sm:grid-cols-2">
            {FIELD_ORDER.map((name) => {
              const error = errorFor(name);
              const ltr = LTR_FIELDS.has(name);
              return (
                <ToolField
                  key={name}
                  id={`sg-${name}`}
                  label={page.fields[name]}
                  hint={name === 'logo' ? page.hints.logo : undefined}
                  error={error}
                  className={name === 'logo' || name === 'address' ? 'sm:col-span-2' : ''}
                >
                  {(props) => (
                    <input
                      {...props}
                      type="text"
                      dir={ltr ? 'ltr' : 'auto'}
                      autoComplete="off"
                      value={values[name]}
                      onChange={set(name)}
                      placeholder={page.placeholders[name]}
                      className={`${fieldClass(Boolean(error))} ${ltr ? 'text-left' : ''}`}
                    />
                  )}
                </ToolField>
              );
            })}
          </div>

          <div className="mt-6 grid gap-5">
            <SegmentedControl
              id="sg-template"
              label={page.templateLabel}
              fill
              options={TEMPLATES.map((value) => ({ value, label: page.templates[value] }))}
              value={template}
              onChange={setTemplate}
            />

            <div role="group" aria-labelledby="sg-accent-label">
              <p id="sg-accent-label" className="mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">
                {page.accent}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {ACCENTS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    id={`sg-accent-${color.slice(1)}`}
                    aria-label={color}
                    aria-pressed={accent === color}
                    onClick={() => setAccent(color)}
                    className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 ${accent === color ? 'border-slate-900 ring-2 ring-offset-2 ring-slate-900 dark:border-white dark:ring-white' : 'border-white/70'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <label htmlFor="sg-accent-custom" className="sr-only">
                  {page.accent}
                </label>
                <input
                  id="sg-accent-custom"
                  type="color"
                  value={isHexColor(accent) ? accent : ACCENTS[0]}
                  onChange={(event) => setAccent(event.target.value)}
                  className="h-9 w-12 cursor-pointer rounded-lg border-2 border-slate-200 bg-transparent p-0.5 dark:border-white/20"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" id="sg-example" onClick={() => setValues(EXAMPLE)} className={`${buttonClass} border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`}>
                {page.loadExample}
              </button>
              <button type="button" id="sg-clear" onClick={() => setValues(EMPTY)} className="px-3 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                {page.clear}
              </button>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="type-h4 copy-primary mb-3 dark:text-white">{page.preview}</h2>
          <div className="sg-paper overflow-x-auto rounded-2xl p-6" data-testid="sg-preview">
            {previewHtml ? (
              <div key={`${template}-${accent}`} className="sg-assemble" dangerouslySetInnerHTML={{ __html: previewHtml }} />
            ) : (
              <p className="py-6 text-center text-sm text-slate-600">{page.previewEmpty}</p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <CopyButton id="sg-copy" text={text} html={html} disabled={!html} label={page.copyRich} copiedLabel={common.copied} />
            <CopyButton id="sg-copy-html" text={html} disabled={!html} variant="outline" label={page.copyHtml} copiedLabel={common.copied} />
            <CopyButton id="sg-copy-text" text={text} disabled={!html} variant="outline" label={page.copyText} copiedLabel={common.copied} />
          </div>

          {html ? (
            <div className="mt-6">
              <CodeStream lines={lines} streamKey={template} label={page.htmlLabel} tokenize={tokenizeHtmlLine} />
            </div>
          ) : null}

          <div className="mt-6 rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] p-4">
            <h3 className="mb-2 text-sm font-bold text-slate-800 dark:text-slate-100">{page.howToPaste.title}</h3>
            <ul className="grid gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              {['gmail', 'outlook', 'apple'].map((key) => (
                <li key={key}>{page.howToPaste[key]}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{page.notice}</p>
    </ToolPageShell>
  );
};

export default EmailSignaturePage;
