import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolPageShell from '../../components/tools/ToolPageShell';
import SegmentedControl from '../../components/ui/SegmentedControl';
import ToolField from '../../components/tools/ToolField';
import { inputClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import {
  LAYOUT,
  LIMITS,
  breadcrumbUrl,
  countChars,
  countWords,
  fitLines,
  isRtlText,
  lengthStatus,
} from '../../tools/serp';

// Text is measured on a canvas with the fonts Google's result page uses (Arial at 20 and 14 px).
// Only in the browser, and only after mount, so the server-rendered page and the first client
// render are the same.
function makeMeasure(font) {
  const context = document.createElement('canvas').getContext('2d');
  context.font = font;
  return (text) => context.measureText(text).width;
}

const STATUS_STYLE = {
  empty: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-gray-300',
  short: 'bg-amber-100 text-amber-900 dark:bg-amber-400/20 dark:text-amber-200',
  good: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-400/20 dark:text-emerald-200',
  long: 'bg-red-100 text-red-900 dark:bg-red-400/20 dark:text-red-200',
};

const Counter = ({ id, text, limits, page }) => {
  const length = countChars(text);
  const status = lengthStatus(length, limits);
  return (
    <div id={id} className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600 dark:text-gray-400">
      <span className={`rounded-full px-2.5 py-0.5 font-semibold ${STATUS_STYLE[status]}`}>{page.status[status]}</span>
      <span>
        <bdi className="font-semibold tabular-nums text-slate-900 dark:text-white">{length}</bdi> {page.characters}
        {' · '}
        <bdi className="tabular-nums">{countWords(text)}</bdi> {page.words}
      </span>
      <span>{page.advice.replace('{min}', limits.min).replace('{max}', limits.max)}</span>
    </div>
  );
};

const SerpPreviewPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const page = toolsContent[lang].serp;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [device, setDevice] = useState('desktop');
  const [measures, setMeasures] = useState(null);

  useEffect(() => {
    // A phone gets the phone preview first. Done after mount so the server-rendered page and the
    // first client render are the same.
    if (window.matchMedia('(max-width: 639px)').matches) setDevice('mobile');
    setMeasures({
      title: makeMeasure('20px Arial, sans-serif'),
      description: makeMeasure('14px Arial, sans-serif'),
    });
  }, []);

  const shownTitle = title.trim() || page.sampleTitle;
  const shownDescription = description.trim() || page.sampleDescription;
  const layout = LAYOUT[device];
  const rtl = isRtlText(title) || (!title.trim() && isRtlText(description)) || (!title.trim() && !description.trim() && lang === 'ar');

  const fitted = useMemo(() => {
    if (!measures) return { title: { lines: [shownTitle], truncated: false }, description: { lines: [shownDescription], truncated: false } };
    return {
      title: fitLines(shownTitle, layout.title, measures.title),
      description: fitLines(shownDescription, layout.description, measures.description),
    };
  }, [measures, shownTitle, shownDescription, layout]);

  const crumb = breadcrumbUrl(address);
  const placeholderTitle = !title.trim();
  const placeholderDescription = !description.trim();

  return (
    <ToolPageShell toolId="serp">
      <ToolField id="serp-title" label={page.pageTitle}>
        {(props) => (
          <input
            {...props}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-describedby="serp-title-count"
            className={inputClass}
          />
        )}
      </ToolField>
      <Counter id="serp-title-count" text={title} limits={LIMITS.title} page={page} />

      <ToolField id="serp-description" label={page.description} className="mt-6">
        {(props) => (
          <textarea
            {...props}
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            aria-describedby="serp-description-count"
            className={`${inputClass} resize-y`}
          />
        )}
      </ToolField>
      <Counter id="serp-description-count" text={description} limits={LIMITS.description} page={page} />

      <ToolField id="serp-address" label={page.address} className="mt-6">
        {(props) => (
          <input
            {...props}
            type="text"
            dir="ltr"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder={page.addressPlaceholder}
            className={`${inputClass} text-left`}
          />
        )}
      </ToolField>

      <div className="mt-8 border-t border-[rgb(var(--border-subtle)/0.7)] pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="type-h4 copy-primary dark:text-white">{page.preview}</h2>
          <SegmentedControl
            id="serp-device"
            label={page.device}
            options={[
              { value: 'desktop', label: page.desktop },
              { value: 'mobile', label: page.mobile },
            ]}
            value={device}
            onChange={setDevice}
          />
        </div>

        <div className="mt-4 overflow-x-auto rounded-2xl bg-slate-100 p-4 dark:bg-white/5" data-testid="serp-preview">
          <div
            dir={rtl ? 'rtl' : 'ltr'}
            lang={rtl ? 'ar' : undefined}
            className="mx-auto rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm"
            style={{ width: layout.description.width + 32, maxWidth: 'none', fontFamily: 'Arial, sans-serif', textAlign: rtl ? 'right' : 'left' }}
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold uppercase text-slate-600"
              >
                {crumb.host.charAt(0)}
              </span>
              <div dir="ltr" className="min-w-0 text-left" style={{ fontSize: 14, lineHeight: '20px' }}>
                <div className="truncate" style={{ color: '#202124' }}>{crumb.host}</div>
                <div className="truncate" style={{ color: '#4d5156', fontSize: 12 }}>{`https://${crumb.host}${crumb.path}`}</div>
              </div>
            </div>

            <div
              data-testid="serp-title"
              className="mt-2"
              style={{ width: layout.title.width, maxWidth: '100%', fontSize: 20, lineHeight: '26px', color: placeholderTitle ? '#5f6368' : '#1a0dab' }}
            >
              {fitted.title.lines.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>

            <div
              data-testid="serp-description"
              className="mt-1"
              style={{ width: layout.description.width, maxWidth: '100%', fontSize: 14, lineHeight: '22px', color: placeholderDescription ? '#5f6368' : '#4d5156' }}
            >
              {fitted.description.lines.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-500 dark:text-gray-400">{page.approximate}</p>
      </div>
    </ToolPageShell>
  );
};

export default SerpPreviewPage;
