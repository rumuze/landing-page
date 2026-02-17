import React from 'react';
import { getLocaleContent } from '../locales';

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
        </section>
        <section id="core-services" aria-labelledby="core-services-title">
          <h2 id="core-services-title" className="text-2xl font-bold mb-3">{homepage.coreServicesTitle}</h2>
          <ul className="list-disc ms-5 space-y-1">
            {homepage.coreServices.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </section>
      </div>
      <div className="grid md:grid-cols-3 gap-12 mt-12">
        <section id="industries" aria-labelledby="industries-title">
          <h2 id="industries-title" className="text-2xl font-bold mb-3">{homepage.industriesTitle}</h2>
          <ul className="list-disc ms-5 space-y-1">
            {homepage.industries.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </section>
        <section id="tech-stack" aria-labelledby="tech-stack-title">
          <h2 id="tech-stack-title" className="text-2xl font-bold mb-3">{homepage.techStackTitle}</h2>
          <ul className="list-disc ms-5 space-y-1">
            {homepage.techStack.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </section>
        <section id="geo-focus" aria-labelledby="geo-focus-title">
          <h2 id="geo-focus-title" className="text-2xl font-bold mb-3">{homepage.geoFocusTitle}</h2>
          <ul className="list-disc ms-5 space-y-1">
            {homepage.geoFocus.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </section>
      </div>
    </section>
  );
};

export default HomeGEOBlocks;
