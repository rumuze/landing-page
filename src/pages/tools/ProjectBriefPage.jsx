import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, Copy, Download, Send } from 'lucide-react';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import BriefPaper from '../../components/tools/BriefPaper';
import ReadinessRing from '../../components/tools/ReadinessRing';
import { buttonClass, inputClass } from '../../components/tools/toolStyles';
import { useCopy } from '../../components/tools/useCopy';
import { toolsContent } from '../../content/toolsContent';
import { BUDGETS, EMPTY_BRIEF, FEATURES, PROJECT_TYPES, TIMELINES, briefToText, completeness } from '../../tools/brief';

// Lets Windows editors read the Arabic in the downloaded file as UTF-8.
const BYTE_ORDER_MARK = String.fromCharCode(0xfeff);

const chipClass = (on) =>
  `min-h-[2.5rem] rounded-full border-2 px-4 text-sm font-semibold transition-all duration-200 ${
    on ? 'border-cyan bg-cyan text-slate-950' : 'border-slate-200 text-slate-700 hover:border-cyan dark:border-white/10 dark:text-slate-200'
  }`;

// A group of chips the visitor picks one from; picking the chosen one again clears it.
const ChipGroup = ({ id, label, options, labels, value, onPick }) => (
  <div role="group" aria-labelledby={`${id}-label`}>
    <p id={`${id}-label`} className="mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">
      {label}
    </p>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button key={option} type="button" id={`${id}-${option}`} aria-pressed={value === option} onClick={() => onPick(value === option ? '' : option)} className={chipClass(value === option)}>
          {labels[option]}
        </button>
      ))}
    </div>
  </div>
);

const ProjectBriefPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const prefix = isAr ? '' : '/en';
  const page = toolsContent[lang].brief;
  const common = toolsContent[lang].common;
  const { copied, copy } = useCopy();

  const [brief, setBrief] = useState(EMPTY_BRIEF);
  const [activeId, setActiveId] = useState('');

  const set = (key) => (value) => setBrief((current) => ({ ...current, [key]: value }));
  const setText = (key) => (event) => set(key)(event.target.value);
  const toggleFeature = (feature) =>
    setBrief((current) => ({
      ...current,
      features: current.features.includes(feature) ? current.features.filter((item) => item !== feature) : [...current.features, feature],
    }));

  const copyDictionary = useMemo(
    () => ({
      documentTitle: page.document.documentTitle,
      openQuestions: page.document.openQuestions,
      sections: page.document.sections,
      labels: { type: page.types, budget: page.budgets, timeline: page.timelines, features: page.features },
    }),
    [page],
  );
  const text = useMemo(() => briefToText(brief, copyDictionary), [brief, copyDictionary]);
  const progress = completeness(brief);
  const complete = progress >= 1;

  const download = () => {
    const blob = new Blob([BYTE_ORDER_MARK + text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = page.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const track = (id) => () => setActiveId(id);

  return (
    <ToolPageShell toolId="brief">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid min-w-0 content-start gap-5">
          <ToolField id="br-name" label={page.fields.name}>
            {(props) => <input {...props} type="text" dir="auto" value={brief.name} onFocus={track('name')} onChange={setText('name')} placeholder={page.placeholders.name} className={inputClass} />}
          </ToolField>

          <ChipGroup id="br-type" label={page.fields.type} options={PROJECT_TYPES} labels={page.types} value={brief.type} onPick={(value) => { setActiveId('type'); set('type')(value); }} />

          <ToolField id="br-goal" label={page.fields.goal} hint={page.hints.goal}>
            {(props) => <textarea {...props} rows={3} dir="auto" value={brief.goal} onFocus={track('goal')} onChange={setText('goal')} placeholder={page.placeholders.goal} className={`${inputClass} resize-y`} />}
          </ToolField>

          <ToolField id="br-audience" label={page.fields.audience}>
            {(props) => <input {...props} type="text" dir="auto" value={brief.audience} onFocus={track('audience')} onChange={setText('audience')} placeholder={page.placeholders.audience} className={inputClass} />}
          </ToolField>

          <ChipGroup id="br-budget" label={page.fields.budget} options={BUDGETS} labels={page.budgets} value={brief.budget} onPick={(value) => { setActiveId('budget'); set('budget')(value); }} />
          <ChipGroup id="br-timeline" label={page.fields.timeline} options={TIMELINES} labels={page.timelines} value={brief.timeline} onPick={(value) => { setActiveId('timeline'); set('timeline')(value); }} />

          <div role="group" aria-labelledby="br-features-label">
            <p id="br-features-label" className="mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">
              {page.fields.features}
            </p>
            <div className="flex flex-wrap gap-2">
              {FEATURES.map((feature) => (
                <button
                  key={feature}
                  type="button"
                  id={`br-feature-${feature}`}
                  aria-pressed={brief.features.includes(feature)}
                  onClick={() => {
                    setActiveId('features');
                    toggleFeature(feature);
                  }}
                  className={chipClass(brief.features.includes(feature))}
                >
                  {page.features[feature]}
                </button>
              ))}
            </div>
          </div>

          <ToolField id="br-references" label={page.fields.references} hint={page.hints.references}>
            {(props) => <textarea {...props} dir="ltr" rows={2} value={brief.references} onFocus={track('references')} onChange={setText('references')} placeholder={page.placeholders.references} className={`${inputClass} resize-y text-left`} />}
          </ToolField>

          <ToolField id="br-notes" label={page.fields.notes}>
            {(props) => <textarea {...props} rows={3} dir="auto" value={brief.notes} onFocus={track('notes')} onChange={setText('notes')} placeholder={page.placeholders.notes} className={`${inputClass} resize-y`} />}
          </ToolField>
        </div>

        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <div className="mb-4 flex items-center gap-4">
            <ReadinessRing value={progress} label={page.progress} />
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{page.progress}</p>
              <p id="br-progress" className="text-xs text-slate-500 dark:text-slate-400">
                {Math.round(progress * 100)}%
              </p>
            </div>
          </div>

          <BriefPaper brief={brief} copy={{ ...copyDictionary, ...page.document, progressDone: page.progressDone }} activeId={activeId} complete={complete} isAr={isAr} />

          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" id="br-copy" onClick={() => copy(text)} className={`${buttonClass} bg-cyan text-slate-950`}>
              {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
              {copied ? common.copied : page.copy}
            </button>
            <button type="button" id="br-download" onClick={download} className={`${buttonClass} border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`}>
              <Download size={18} aria-hidden="true" />
              {page.download}
            </button>
          </div>
          <div className="mt-3">
            <Link
              id="br-send"
              to={`${prefix}/contact`}
              onClick={() => copy(text)}
              className={`${buttonClass} border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`}
            >
              <Send size={18} aria-hidden="true" className={isAr ? '-scale-x-100' : ''} />
              {page.sendToUs}
            </Link>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{page.sendHint}</p>
          </div>
        </div>
      </div>
    </ToolPageShell>
  );
};

export default ProjectBriefPage;
