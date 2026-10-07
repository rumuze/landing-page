import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Copy } from 'lucide-react';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import { buttonClass, fieldClass, inputClass } from '../../components/tools/toolStyles';
import { useCopy } from '../../components/tools/useCopy';
import { toolsContent } from '../../content/toolsContent';
import { UTM_PRESETS, buildUtmUrl } from '../../tools/utm';

const EMPTY = { url: '', source: '', medium: '', campaign: '', term: '', content: '' };

const Toggle = ({ id, checked, onChange, children }) => (
  <label htmlFor={id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-gray-300">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      className="h-4 w-4 rounded border-slate-300 accent-[#3CBF00]"
    />
    {children}
  </label>
);

const UtmBuilderPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const page = toolsContent[lang].utm;
  const common = toolsContent[lang].common;

  const [fields, setFields] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [lowercase, setLowercase] = useState(true);
  const [underscores, setUnderscores] = useState(true);
  const { copied, copy } = useCopy();

  const result = useMemo(() => buildUtmUrl(fields, { lowercase, underscores }), [fields, lowercase, underscores]);

  const set = (name) => (event) => setFields((current) => ({ ...current, [name]: event.target.value }));
  const touch = (name) => () => setTouched((current) => ({ ...current, [name]: true }));
  const errorFor = (name) => {
    if (result.ok || !touched[name] || !result.errors[name]) return '';
    return name === 'url' ? page.errors[result.errors.url] : page.required;
  };
  const control = (name, extra = {}) => ({
    value: fields[name],
    onChange: set(name),
    onBlur: touch(name),
    className: fieldClass(Boolean(errorFor(name))),
    ...extra,
  });
  const applyPreset = (preset) => {
    setFields((current) => ({ ...current, source: preset.source, medium: preset.medium }));
    setTouched((current) => ({ ...current, source: true, medium: true }));
  };

  return (
    <ToolPageShell toolId="utm">
      <ToolField id="utm-url" label={page.url} hint={page.urlHint} error={errorFor('url')}>
        {(props) => (
          <input {...props} {...control('url', { type: 'url', dir: 'ltr', placeholder: 'https://example.com/landing' })} />
        )}
      </ToolField>

      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300" id="utm-presets-label">
          {page.presets}
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-labelledby="utm-presets-label">
          {UTM_PRESETS.map((preset) => {
            const active = fields.source === preset.source && fields.medium === preset.medium;
            return (
              <button
                key={preset.id}
                type="button"
                aria-pressed={active}
                onClick={() => applyPreset(preset)}
                className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
                  active
                    ? 'border-cyan bg-cyan text-slate-950'
                    : 'border-slate-200 text-slate-700 hover:border-cyan dark:border-white/15 dark:text-gray-300'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <ToolField id="utm-source" label={`${page.source} *`} hint={page.sourceHint} error={errorFor('source')}>
          {(props) => <input {...props} {...control('source', { dir: 'ltr', placeholder: 'google' })} />}
        </ToolField>
        <ToolField id="utm-medium" label={`${page.medium} *`} hint={page.mediumHint} error={errorFor('medium')}>
          {(props) => <input {...props} {...control('medium', { dir: 'ltr', placeholder: 'cpc' })} />}
        </ToolField>
        <ToolField id="utm-campaign" label={`${page.campaign} *`} hint={page.campaignHint} error={errorFor('campaign')}>
          {(props) => <input {...props} {...control('campaign', { placeholder: 'ramadan_sale' })} />}
        </ToolField>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <ToolField id="utm-term" label={page.term}>
          {(props) => <input {...props} {...control('term')} />}
        </ToolField>
        <ToolField id="utm-content" label={page.content} hint={page.contentHint}>
          {(props) => <input {...props} {...control('content')} />}
        </ToolField>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        <Toggle id="utm-lowercase" checked={lowercase} onChange={setLowercase}>
          {page.lowercase}
        </Toggle>
        <Toggle id="utm-underscores" checked={underscores} onChange={setUnderscores}>
          {page.underscores}
        </Toggle>
      </div>

      <div className="mt-8 border-t border-[rgb(var(--border-subtle)/0.7)] pt-6">
        <label htmlFor="utm-result" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
          {page.result}
        </label>
        <textarea
          id="utm-result"
          readOnly
          dir="ltr"
          rows={3}
          value={result.ok ? result.url : ''}
          placeholder="https://example.com/landing?utm_source=…"
          onFocus={(event) => event.target.select()}
          className={`${inputClass} resize-y text-left font-mono text-sm`}
        />

        <button
          type="button"
          id="utm-copy"
          disabled={!result.ok}
          onClick={() => copy(result.url)}
          className={`${buttonClass} mt-4 bg-cyan text-slate-950 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100`}
        >
          {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
          {copied ? common.copied : common.copy}
        </button>

        {result.ok ? (
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">{page.parameters}</h3>
            <dl dir="ltr" className="grid gap-x-6 gap-y-1 text-left font-mono text-sm sm:grid-cols-[max-content_1fr]">
              {result.params.map(([key, value]) => (
                <React.Fragment key={key}>
                  <dt className="text-slate-500 dark:text-gray-400">{key}</dt>
                  <dd className="break-all text-slate-900 dark:text-white">{value}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        ) : null}
      </div>
    </ToolPageShell>
  );
};

export default UtmBuilderPage;
