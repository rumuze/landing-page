import React from 'react';
import { SECTIONS, isFilled, sectionLines } from '../../tools/brief';

/**
 * The brief as a sheet of paper. A section that has not been answered shows grey bars that
 * shimmer; once it is answered the bars give way to the text. The section being edited carries
 * a blinking caret, and a stamp lands on the sheet when every core section is filled.
 */
const BriefPaper = ({ brief, copy, activeId, complete, isAr }) => {
  const title = brief.name.trim();
  return (
    <article
      className="brief-paper relative overflow-hidden rounded-2xl px-5 py-6 sm:px-8 sm:py-8"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-live="polite"
      aria-label={copy.documentTitle}
    >
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-600">{copy.documentTitle}</p>
      <p className="mt-1 text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
        {title || <span className="text-slate-600">{copy.placeholderTitle}</span>}
      </p>
      <div className="mt-1 h-0.5 w-12 bg-cyan" />

      {complete ? (
        <span
          data-testid="brief-stamp"
          className="brief-stamp absolute end-5 top-5 rounded-lg border-[3px] border-cyan px-3 py-1 text-xs font-black uppercase tracking-wider text-cyan"
        >
          {copy.progressDone}
        </span>
      ) : null}

      <div className="mt-6 grid gap-5">
        {SECTIONS.filter((section) => section.id !== 'name').map((section) => {
          const filled = isFilled(section.id, brief);
          const lines = sectionLines(section.id, brief, copy.labels);
          const listed = section.id === 'features' || section.id === 'references';
          return (
            <section key={section.id} data-filled={filled ? 'true' : 'false'}>
              <p className={`text-xs font-bold uppercase tracking-wide ${filled ? 'text-cyan-700' : 'text-slate-600'}`}>
                {copy.sections[section.id]}
              </p>
              {filled ? (
                <div key="text" className="brief-in mt-1.5 text-sm leading-6 text-slate-800">
                  {listed ? (
                    <ul className="flex flex-wrap gap-1.5">
                      {lines.map((line) => (
                        <li key={line} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                          {line}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    lines.map((line, index) => (
                      <p key={index} className={index === lines.length - 1 && activeId === section.id ? 'brief-caret' : ''}>
                        {line}
                      </p>
                    ))
                  )}
                </div>
              ) : section.core ? (
                <div className="mt-2 grid gap-2">
                  <span className="sr-only">{copy.empty}</span>
                  <span aria-hidden="true" className="brief-bar w-11/12" />
                  <span aria-hidden="true" className="brief-bar w-2/3" />
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </article>
  );
};

export default BriefPaper;
