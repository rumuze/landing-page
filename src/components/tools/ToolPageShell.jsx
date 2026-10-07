import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import SEO from '../SEO';
import { siteCoreConfig } from '../../config/siteCoreConfig';
import { TOOLS, toolById } from '../../config/tools';
import { toolsContent } from '../../content/toolsContent';
import { buildToolSchema } from '../../seo/buildToolSchema';
import { TOOL_ICONS } from './toolIcons';

/**
 * The page around a free tool: heading, the tool itself, how to use it, questions, a call to
 * action for the related service, and the other tools. `children` is the tool.
 */
const ToolPageShell = ({ toolId, children }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const prefix = isAr ? '' : '/en';
  const align = isAr ? 'text-right' : 'text-left';
  const tool = toolById(toolId);
  const all = toolsContent[lang];
  const page = all[toolId];
  const common = all.common;
  const path = `${prefix}${tool.path}`;
  const others = TOOLS.filter((item) => item.id !== toolId);

  return (
    <div className="surface-page min-h-screen pb-20 pt-[calc(6.5rem+var(--safe-area-top))] md:pt-[calc(7.5rem+var(--safe-area-top))]">
      <SEO
        path={path}
        schemas={[
          buildToolSchema({
            name: all.hub[toolId].title,
            description: page.subtitle,
            url: `${siteCoreConfig.baseUrl}${path}`,
            lang,
          }),
        ]}
      />

      <header className="content-shell max-w-3xl text-center">
        <span className="home-chip">{common.eyebrow}</span>
        <h1 className="type-h1 copy-primary mt-5 dark:text-white">{page.h1}</h1>
        <p className="type-body-lg copy-secondary mx-auto mt-4 max-w-2xl dark:text-slate-300">{page.subtitle}</p>
        <p className="type-small copy-muted mt-4 inline-flex items-center gap-2 dark:text-slate-400">
          <ShieldCheck className="h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
          {common.privacy}
        </p>
      </header>

      <section className="content-shell mt-10 max-w-3xl">
        <div className="home-panel p-5 sm:p-8 md:p-10">{children}</div>
      </section>

      <section className={`content-shell mt-20 max-w-3xl ${align}`}>
        <h2 className="type-h2 copy-primary dark:text-white">{common.howTitle}</h2>
        <ol className="mt-6 space-y-4">
          {page.steps.map((step, index) => (
            <li key={step} className={`flex items-start gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <span className="home-number-badge">{String(index + 1).padStart(2, '0')}</span>
              <span className="type-body copy-secondary dark:text-slate-300">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={`content-shell mt-16 max-w-3xl ${align}`}>
        <h2 className="type-h2 copy-primary dark:text-white">{common.faqTitle}</h2>
        <div className="mt-6 divide-y divide-[rgb(var(--border-subtle)/0.7)] border-y border-[rgb(var(--border-subtle)/0.7)]">
          {page.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="type-h4 copy-primary flex cursor-pointer list-none items-center justify-between gap-4 dark:text-white [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span aria-hidden="true" className="shrink-0 text-cyan transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="type-body copy-secondary mt-3 dark:text-slate-300">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="content-shell mt-16 max-w-3xl">
        <div className={`home-panel-strong p-6 sm:p-10 ${align}`}>
          <h2 className="type-h2 text-white">{page.cta.title}</h2>
          <p className="type-body-lg mt-4 text-slate-300">{page.cta.text}</p>
          <Link
            to={`${prefix}/services/${tool.service}`}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan px-7 py-3 font-bold text-slate-950 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {page.cta.button}
            <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className={`content-shell mt-16 max-w-3xl ${align}`}>
        <h2 className="type-h3 copy-primary dark:text-white">{common.moreTitle}</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {others.map((item) => {
            const Icon = TOOL_ICONS[item.id];
            const hub = all.hub[item.id];
            return (
              <li key={item.id}>
                <Link
                  to={`${prefix}${item.path}`}
                  className="home-panel group flex h-full flex-col gap-3 p-5 transition hover:-translate-y-0.5"
                >
                  <span className="home-icon-badge">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="type-h4 copy-primary dark:text-white">{hub.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link to={`${prefix}/labs`} className="mt-6 inline-block font-semibold text-cyan">
          {common.allTools}
        </Link>
      </section>
    </div>
  );
};

export default ToolPageShell;
