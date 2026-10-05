import React from 'react';

/**
 * Layered architecture diagram. Tiers stack top to bottom with a connector
 * between them; node names are LTR technical terms even on Arabic pages.
 */
const ArchitectureDiagram = ({ diagram, lang }) => {
  if (!diagram) return null;
  const isAr = lang === 'ar';

  return (
    <figure
      className="home-panel-soft mt-8 p-5 md:p-6"
      aria-label={diagram.caption[lang]}
    >
      <ol className="space-y-2">
        {diagram.tiers.map((tier, index) => (
          <li key={tier.label.en}>
            <div
              className={`flex flex-col gap-3 sm:flex-row sm:items-center ${
                isAr ? 'sm:flex-row-reverse' : ''
              }`}
            >
              <span
                className={`type-label copy-muted shrink-0 sm:w-24 ${isAr ? 'sm:text-left' : 'sm:text-right'}`}
              >
                {tier.label[lang]}
              </span>
              <div
                className="flex flex-1 flex-wrap gap-2 rounded-xl border border-[rgb(var(--border-subtle)/0.8)] bg-[rgb(var(--surface-card)/0.7)] p-3"
                dir="ltr"
              >
                {tier.nodes.map((node) => (
                  <span key={node} className="home-chip normal-case tracking-normal">
                    {node}
                  </span>
                ))}
              </div>
            </div>
            {index < diagram.tiers.length - 1 ? (
              <div aria-hidden="true" className="flex justify-center py-1 text-cyan sm:pl-24">
                <svg className="arch-connector" width="16" height="20" viewBox="0 0 16 20" fill="none">
                  <path pathLength="1" d="M8 1v15m0 0-5-5m5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <figcaption className="type-small copy-muted mt-4 text-center">{diagram.caption[lang]}</figcaption>
    </figure>
  );
};

export default ArchitectureDiagram;
