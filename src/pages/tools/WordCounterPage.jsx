import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import Odometer from '../../components/tools/Odometer';
import SegmentedControl from '../../components/ui/SegmentedControl';
import CopyButton from '../../components/ui/CopyButton';
import { inputClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import { EXAMPLE_TEXT, LIMITS, READING_SPEEDS, analyzeText, limitUse, splitSeconds, topWords } from '../../tools/wordCount';

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);
const group = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/** "2 min 5 s" with the numbers as rolling digits; the words come from the copy. */
const Duration = ({ template, seconds }) => {
  const { minutes, seconds: rest } = splitSeconds(seconds);
  return (
    <>
      {template.split(/(\{m\}|\{s\})/).map((part, index) => {
        if (part === '{m}') return <Odometer key={index} value={minutes} />;
        if (part === '{s}') return <Odometer key={index} value={rest} />;
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};

const WordCounterPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const page = toolsContent[lang].wordcount;
  const common = toolsContent[lang].common;

  const [text, setText] = useState('');
  const [speed, setSpeed] = useState('average');
  const [example, setExample] = useState(false);

  // An example text is put in once the page is in the browser, so the counters start with numbers.
  useEffect(() => {
    setText(EXAMPLE_TEXT[lang]);
    setExample(true);
  }, [lang]);

  const wordsPerMinute = READING_SPEEDS[speed];
  const stats = useMemo(() => analyzeText(text, wordsPerMinute), [text, wordsPerMinute]);
  const keywords = useMemo(() => topWords(text, { limit: 8 }), [text]);
  const maxShare = keywords.length ? keywords[0].share : 1;

  const summary = fill(page.summary, {
    words: group(stats.words),
    characters: group(stats.characters),
    noSpaces: group(stats.charactersNoSpaces),
    sentences: group(stats.sentences),
    time: fill(page.time, { m: splitSeconds(stats.readingSeconds).minutes, s: splitSeconds(stats.readingSeconds).seconds }),
  });

  const stat = (id, label, value, big = false) => (
    <div key={id} className={`rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] bg-white/60 p-4 dark:bg-white/5 ${big ? 'col-span-2 sm:col-span-1' : ''}`}>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`mt-1 font-black text-slate-900 dark:text-white ${big ? 'text-4xl' : 'text-2xl'}`} data-testid={`wc-${id}`}>
        {value}
      </p>
    </div>
  );

  return (
    <ToolPageShell wide toolId="wordcount">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="min-w-0">
          <ToolField id="wc-text" label={page.textLabel}>
            {(props) => (
              <textarea
                {...props}
                rows={14}
                dir="auto"
                value={text}
                placeholder={page.placeholder}
                onChange={(event) => {
                  setExample(false);
                  setText(event.target.value);
                }}
                className={`${inputClass} resize-y leading-relaxed`}
              />
            )}
          </ToolField>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">{example ? page.example : ''}</p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                id="wc-clear"
                onClick={() => {
                  setText('');
                  setExample(false);
                }}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                {page.clear}
              </button>
              <CopyButton id="wc-copy" text={summary} disabled={!stats.words} label={page.copyStats} copiedLabel={common.copied} variant="outline" />
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {stat('words', page.stats.words, <Odometer value={group(stats.words)} />, true)}
            {stat('characters', page.stats.characters, <Odometer value={group(stats.characters)} />)}
            {stat('nospaces', page.stats.charactersNoSpaces, <Odometer value={group(stats.charactersNoSpaces)} />)}
            {stat('sentences', page.stats.sentences, <Odometer value={group(stats.sentences)} />)}
            {stat('paragraphs', page.stats.paragraphs, <Odometer value={group(stats.paragraphs)} />)}
            {stat('reading', page.stats.reading, <span className="text-xl"><Duration template={page.time} seconds={stats.readingSeconds} /></span>)}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span data-testid="wc-speaking">
              {page.stats.speaking}: <Duration template={page.time} seconds={stats.speakingSeconds} />
            </span>
          </div>

          <div className="mt-5">
            <SegmentedControl
              id="wc-speed"
              label={page.speedLabel}
              fill
              options={Object.keys(READING_SPEEDS).map((key) => ({ value: key, label: page.speeds[key] }))}
              value={speed}
              onChange={setSpeed}
            />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{fill(page.speedNote, { n: wordsPerMinute })}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section aria-labelledby="wc-limits-title">
          <h2 id="wc-limits-title" className="type-h4 copy-primary dark:text-white">
            {page.limits.title}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{page.limits.intro}</p>
          <ul className="mt-4 grid gap-4">
            {LIMITS.map((limit) => {
              const use = limitUse(stats.characters, limit.max);
              const over = use.over > 0;
              return (
                <li key={limit.id} data-testid={`wc-limit-${limit.id}`} data-over={over ? 'true' : 'false'}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {page.limits.names[limit.id]} <span className="font-normal text-slate-500 dark:text-slate-400" dir="ltr">({group(limit.max)})</span>
                    </span>
                    <span className={over ? 'font-bold text-amber-700 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300'}>
                      {over ? fill(page.limits.over, { n: group(use.over) }) : fill(page.limits.left, { n: group(use.left) })}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10" dir="ltr" aria-hidden="true">
                    <div className={`size-bar h-full rounded-full ${over ? 'bg-amber-500' : 'bg-cyan'}`} style={{ width: `${use.ratio * 100}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="wc-keywords-title">
          <h2 id="wc-keywords-title" className="type-h4 copy-primary dark:text-white">
            {page.keywords.title}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{page.keywords.intro}</p>
          {keywords.length ? (
            <ul className="mt-4 grid gap-2.5" data-testid="wc-keywords">
              {keywords.map((entry, index) => (
                <li key={entry.word} className="item-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-semibold text-slate-800 dark:text-slate-100" dir="auto">
                      {entry.word}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {fill(page.keywords.times, { n: entry.count })} · {Math.round(entry.share * 1000) / 10}%
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10" dir="ltr" aria-hidden="true">
                    <div className="size-bar h-full rounded-full bg-emerald-500" style={{ width: `${(entry.share / maxShare) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">{page.keywords.empty}</p>
          )}
        </section>
      </div>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{page.notice}</p>
    </ToolPageShell>
  );
};

export default WordCounterPage;
