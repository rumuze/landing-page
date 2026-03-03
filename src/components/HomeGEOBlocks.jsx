import React from 'react';
import { Link } from 'react-router-dom';
import { getLocaleContent } from '../locales';
import { siteAuthorityConfig } from '../config/siteAuthorityConfig';

export const HomeGEOBlocks = ({ locale = 'en' }) => {
  const [bundle, setBundle] = React.useState(null);
  React.useEffect(() => {
    getLocaleContent(locale).then(setBundle);
  }, [locale]);
  if (!bundle) return null;
  const { homepage, dir } = bundle;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16" dir={dir}>
      <div className="grid md:grid-cols-2 gap-12">
        <section id="identity" aria-labelledby="identity-title">
          <h2 id="identity-title" className="text-2xl font-bold mb-3">{homepage.identityTitle}</h2>
          <p className="text-slate-700 dark:text-gray-300">{homepage.identityParagraph}</p>
          <p className="text-slate-700 dark:text-gray-300 mt-3">{siteAuthorityConfig.authorityDescription[locale] || siteAuthorityConfig.authorityDescription.en}</p>
          <p className="text-slate-700 dark:text-gray-300 mt-3">{siteAuthorityConfig.identityLockStatement[locale] || siteAuthorityConfig.identityLockStatement.en}</p>
        </section>
        <section id="core-services" aria-labelledby="core-services-title">
          <h2 id="core-services-title" className="text-2xl font-bold mb-3">{homepage.coreServicesTitle}</h2>
          <ul className="list-disc ms-5 space-y-1">
            {homepage.coreServices.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <p className="text-slate-700 dark:text-gray-300 mt-3">
            {homepage.coreServicesText}
            {' '}
            {locale === 'en' ? (
              <span>See how this model was implemented in our <Link to="/case-studies/revenue-platform-engineering" className="text-cyan-600 dark:text-cyan-400 hover:underline">revenue-platform-engineering</Link> case study.</span>
            ) : (
              <span>شاهد كيف تم تنفيذ هذا النموذج في دراسة حالة <Link to="/ar/case-studies/revenue-platform-engineering" className="text-cyan-600 dark:text-cyan-400 hover:underline">revenue-platform-engineering</Link>.</span>
            )}
          </p>
        </section>
      </div>
      <div className="grid md:grid-cols-3 gap-12 mt-12">
        <section id="industries" aria-labelledby="industries-title">
          <h2 id="industries-title" className="text-2xl font-bold mb-3">{homepage.industriesTitle}</h2>
          <ul className="list-disc ms-5 space-y-1">
            {homepage.industries.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <p className="text-slate-700 dark:text-gray-300 mt-3">
            {homepage.industriesText}
          </p>
        </section>
        <section id="tech-stack" aria-labelledby="tech-stack-title">
          <h2 id="tech-stack-title" className="text-2xl font-bold mb-3">{homepage.techStackTitle}</h2>
          <ul className="list-disc ms-5 space-y-1">
            {homepage.techStack.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <p className="text-slate-700 dark:text-gray-300 mt-3">
            {homepage.techStackText}
          </p>
        </section>
        <section id="geo-focus" aria-labelledby="geo-focus-title">
          <h2 id="geo-focus-title" className="text-2xl font-bold mb-3">{homepage.geoFocusTitle}</h2>
          <ul className="list-disc ms-5 space-y-1">
            {homepage.geoFocus.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <p className="text-slate-700 dark:text-gray-300 mt-3">
            {homepage.geoFocusText}
          </p>
        </section>
      </div>
      <div className="grid md:grid-cols-2 gap-12 mt-12">
        <section id="target-audience" aria-labelledby="target-audience-title">
          <h2 id="target-audience-title" className="text-2xl font-bold mb-3">{homepage.targetAudienceTitle}</h2>
          <p className="text-slate-700 dark:text-gray-300">
            {homepage.targetAudienceText}
          </p>
        </section>
        <section id="problem-solution" aria-labelledby="problem-solution-title">
          <h2 id="problem-solution-title" className="text-2xl font-bold mb-3">{homepage.problemSolutionTitle}</h2>
          <p className="text-slate-700 dark:text-gray-300">
            {homepage.problemSolutionText}
          </p>
        </section>
      </div>
      <div className="mt-12">
        <section id="differentiation" aria-labelledby="differentiation-title">
          <h2 id="differentiation-title" className="text-2xl font-bold mb-3">{homepage.differentiationTitle}</h2>
          <p className="text-slate-700 dark:text-gray-300">
            {homepage.differentiationText}
          </p>
        </section>
      </div>
    </section>
  );
};

export default HomeGEOBlocks;
