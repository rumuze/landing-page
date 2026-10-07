import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Copy, ExternalLink, Plus, Trash2, X, AlertTriangle } from 'lucide-react';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import CodeStream from '../../components/tools/CodeStream';
import ReadinessRing from '../../components/tools/ReadinessRing';
import { buttonClass, inputClass } from '../../components/tools/toolStyles';
import { useCopy } from '../../components/tools/useCopy';
import { toolsContent } from '../../content/toolsContent';
import {
  EXAMPLES,
  MAX_FAQ_ITEMS,
  SCHEMA_FIELDS,
  SCHEMA_TYPES,
  buildSchema,
  checkSchema,
  readiness,
  serializeSchema,
} from '../../tools/schema';

const LTR_KINDS = new Set(['url', 'urls', 'email', 'tel', 'country', 'date']);
const LONG_FIELDS = new Set(['sameAs']);
const EMPTY_FAQ = [{ q: '', a: '' }];

const StatusIcon = ({ status }) => {
  if (status === 'ok') {
    return (
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cyan text-slate-950">
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 8.5l3.2 3.2L13 4.8" className="tool-check" />
        </svg>
      </span>
    );
  }
  const Icon = status === 'missing' ? X : AlertTriangle;
  const tone = status === 'missing' ? 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400' : 'bg-amber-400 text-slate-950';
  return (
    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${tone}`}>
      <Icon size={12} strokeWidth={3} aria-hidden="true" />
    </span>
  );
};

const SchemaGeneratorPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const page = toolsContent[lang].schema;
  const common = toolsContent[lang].common;
  const { copied, copy } = useCopy();

  const [type, setType] = useState('Organization');
  const [values, setValues] = useState({});
  const [faq, setFaq] = useState(EMPTY_FAQ);

  const all = useMemo(() => ({ ...values, faq }), [values, faq]);
  const code = useMemo(() => serializeSchema(buildSchema(type, all)), [type, all]);
  const lines = useMemo(() => code.split('\n'), [code]);
  const checks = useMemo(() => checkSchema(type, all), [type, all]);
  const ready = useMemo(() => readiness(type, all), [type, all]);
  const statusOf = (id) => checks.find((item) => item.id === id)?.status;

  const setValue = (id) => (event) => setValues((current) => ({ ...current, [id]: event.target.value }));
  const setFaqField = (index, key) => (event) =>
    setFaq((current) => current.map((item, at) => (at === index ? { ...item, [key]: event.target.value } : item)));

  const switchType = (next) => {
    setType(next);
  };
  const loadExample = () => {
    const example = EXAMPLES[type];
    if (type === 'FAQPage') setFaq(example.faq);
    else setValues(example);
  };
  const clear = () => {
    setValues({});
    setFaq(EMPTY_FAQ);
  };

  const fieldProblem = (id) => {
    const status = statusOf(id);
    return status === 'invalid' || status === 'long' ? page.problems[status] : '';
  };

  const checklistRows =
    type === 'FAQPage'
      ? checks.map((item) => ({
          id: item.id,
          label: item.id === 'faq' ? page.problems.faqMissing : page.faqItem.replace('{n}', item.index + 1),
          note: item.status === 'invalid' ? page.problems.faqPair : '',
          status: item.status,
          level: item.level,
        }))
      : checks.map((item) => ({
          id: item.id,
          label: page.fields[item.id],
          note: fieldProblem(item.id),
          status: item.status,
          level: item.level,
        }));

  return (
    <ToolPageShell toolId="schema">
      <div role="group" aria-label={page.typeLabel} className="flex flex-wrap gap-2">
        {SCHEMA_TYPES.map((key) => (
          <button
            key={key}
            type="button"
            id={`sc-type-${key}`}
            aria-pressed={type === key}
            onClick={() => switchType(key)}
            className={`min-h-[2.5rem] rounded-full border-2 px-4 text-sm font-semibold transition-all duration-200 ${
              type === key
                ? 'border-cyan bg-cyan text-slate-950'
                : 'border-slate-200 text-slate-700 hover:border-cyan dark:border-white/10 dark:text-slate-200'
            }`}
          >
            {page.types[key]}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <div key={type} className="tool-rise grid gap-4 sm:grid-cols-2">
            {type === 'FAQPage' ? (
              <div className="grid gap-4 sm:col-span-2">
                {faq.map((item, index) => (
                  <div key={index} className="rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{page.faqItem.replace('{n}', index + 1)}</span>
                      {faq.length > 1 ? (
                        <button
                          type="button"
                          aria-label={page.removeQuestion.replace('{n}', index + 1)}
                          onClick={() => setFaq((current) => current.filter((_, at) => at !== index))}
                          className="rounded-lg p-1.5 text-slate-500 hover:text-red-600"
                        >
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      ) : null}
                    </div>
                    <ToolField id={`sc-q${index}`} label={page.faqQuestion}>
                      {(props) => <input {...props} type="text" dir="auto" value={item.q} onChange={setFaqField(index, 'q')} className={inputClass} />}
                    </ToolField>
                    <ToolField id={`sc-a${index}`} label={page.faqAnswer} className="mt-3">
                      {(props) => <textarea {...props} rows={3} dir="auto" value={item.a} onChange={setFaqField(index, 'a')} className={`${inputClass} resize-y`} />}
                    </ToolField>
                  </div>
                ))}
                {faq.length < MAX_FAQ_ITEMS ? (
                  <button
                    type="button"
                    id="sc-add"
                    onClick={() => setFaq((current) => [...current, { q: '', a: '' }])}
                    className={`${buttonClass} justify-self-start border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`}
                  >
                    <Plus size={18} aria-hidden="true" />
                    {page.addQuestion}
                  </button>
                ) : null}
              </div>
            ) : (
              SCHEMA_FIELDS[type].map((field) => {
                const problem = fieldProblem(field.id);
                const ltr = LTR_KINDS.has(field.kind);
                const tag = `sc-${field.id}`;
                const controlProps = {
                  value: values[field.id] ?? '',
                  onChange: setValue(field.id),
                  dir: ltr ? 'ltr' : undefined,
                  className: `${inputClass} ${ltr ? 'text-left' : ''}`,
                };
                return (
                  <ToolField
                    key={field.id}
                    id={tag}
                    label={`${page.fields[field.id]}${field.level === 'required' ? ' *' : ''}`}
                    hint={page.hints[field.id]}
                    error={problem}
                    className={LONG_FIELDS.has(field.id) || field.id === 'headline' ? 'sm:col-span-2' : ''}
                  >
                    {(props) =>
                      field.kind === 'urls' ? (
                        <textarea {...props} {...controlProps} rows={3} className={`${controlProps.className} resize-y`} />
                      ) : (
                        <input {...props} {...controlProps} type="text" />
                      )
                    }
                  </ToolField>
                );
              })
            )}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" id="sc-example" onClick={loadExample} className={`${buttonClass} border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`}>
              {page.loadExample}
            </button>
            <button type="button" id="sc-clear" onClick={clear} className="px-3 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              {page.clear}
            </button>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-4">
            <ReadinessRing value={ready} label={page.readiness} />
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{page.readiness}</p>
              <p id="sc-ready" className="text-xs text-slate-500 dark:text-slate-400">
                {Math.round(ready * 100)}%
              </p>
            </div>
          </div>

          <ul className="mt-4 grid gap-1.5" aria-label={page.checklist}>
            {checklistRows.map((row) => (
              <li key={row.id} data-status={row.status} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                <StatusIcon status={row.status} />
                <span className="min-w-0">
                  <span className="font-medium">{row.label}</span>{' '}
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    ({page.levels[row.level] ?? row.level}, {page.status[row.status]})
                  </span>
                  {row.note ? <span className="block text-xs text-amber-700 dark:text-amber-400">{row.note}</span> : null}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <CodeStream lines={lines} streamKey={type} label={page.output} />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{page.placeUse}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              id="sc-copy"
              onClick={() => copy(code)}
              className={`${buttonClass} bg-cyan text-slate-950`}
            >
              {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
              {copied ? common.copied : page.copyCode}
            </button>
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass} border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`}
            >
              <ExternalLink size={18} aria-hidden="true" />
              {page.tryGoogle}
            </a>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">{page.notice}</p>
    </ToolPageShell>
  );
};

export default SchemaGeneratorPage;
