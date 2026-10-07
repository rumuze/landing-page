import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Download, Send } from 'lucide-react';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import BriefPaper from '../../components/tools/BriefPaper';
import ReadinessRing from '../../components/tools/ReadinessRing';
import { buttonClass, inputClass } from '../../components/tools/toolStyles';
import ChipGroup from '../../components/ui/ChipGroup';
import CopyButton from '../../components/ui/CopyButton';
import { useCopy } from '../../components/tools/useCopy';
import { toolsContent } from '../../content/toolsContent';
import { BUDGETS, EMPTY_BRIEF, FEATURES, PROJECT_TYPES, TIMELINES, briefToText, completeness } from '../../tools/brief';

// Lets Windows editors read the Arabic in the downloaded file as UTF-8.
const BYTE_ORDER_MARK = String.fromCharCode(0xfeff);

const ProjectBriefPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const prefix = isAr ? '' : '/en';
  const page = toolsContent[lang].brief;
  const common = toolsContent[lang].common;
  const { copy } = useCopy();

  const [brief, setBrief] = useState(EMPTY_BRIEF);
  const [activeId, setActiveId] = useState('');

  const set = (key) => (value) => setBrief((current) => ({ ...current, [key]: value }));
  const setText = (key) => (event) => set(key)(event.target.value);

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
    <ToolPageShell wide toolId="brief">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid min-w-0 content-start gap-5">
          <ToolField id="br-name" label={page.fields.name}>
            {(props) => <input {...props} type="text" dir="auto" value={brief.name} onFocus={track('name')} onChange={setText('name')} placeholder={page.placeholders.name} className={inputClass} />}
          </ToolField>

          <ChipGroup id="br-type" label={page.fields.type} options={PROJECT_TYPES.map((value) => ({ value, label: page.types[value] }))} value={brief.type} onChange={(value) => { setActiveId('type'); set('type')(value); }} />

          <ToolField id="br-goal" label={page.fields.goal} hint={page.hints.goal}>
            {(props) => <textarea {...props} rows={3} dir="auto" value={brief.goal} onFocus={track('goal')} onChange={setText('goal')} placeholder={page.placeholders.goal} className={`${inputClass} resize-y`} />}
          </ToolField>

          <ToolField id="br-audience" label={page.fields.audience}>
            {(props) => <input {...props} type="text" dir="auto" value={brief.audience} onFocus={track('audience')} onChange={setText('audience')} placeholder={page.placeholders.audience} className={inputClass} />}
          </ToolField>

          <ChipGroup id="br-budget" label={page.fields.budget} options={BUDGETS.map((value) => ({ value, label: page.budgets[value] }))} value={brief.budget} onChange={(value) => { setActiveId('budget'); set('budget')(value); }} />
          <ChipGroup id="br-timeline" label={page.fields.timeline} options={TIMELINES.map((value) => ({ value, label: page.timelines[value] }))} value={brief.timeline} onChange={(value) => { setActiveId('timeline'); set('timeline')(value); }} />

          <ChipGroup
            id="br-feature"
            label={page.fields.features}
            options={FEATURES.map((value) => ({ value, label: page.features[value] }))}
            value={brief.features}
            onChange={(value) => {
              setActiveId('features');
              set('features')(value);
            }}
            multiple
          />

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
            <CopyButton id="br-copy" text={text} label={page.copy} copiedLabel={common.copied} />
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
