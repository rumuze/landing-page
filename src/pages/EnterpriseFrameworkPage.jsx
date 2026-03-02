import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';
import { SiteConfig, StableIds } from '../config/site';
import MagneticButton from '../components/MagneticButton';

const BASE_URL = SiteConfig.baseUrl;

const EnterpriseFrameworkPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const path = isAr ? '/ar/enterprise-framework' : '/enterprise-framework';
  const [openFaq, setOpenFaq] = React.useState(null);

  const faqItems = t('enterpriseFramework.faq.items', { returnObjects: true });

  // Inject FAQPage schema
  React.useEffect(() => {
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}${path}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isAr ? 'الرئيسية' : 'Home',
          item: `${BASE_URL}/${isAr ? 'ar' : ''}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isAr ? 'إطار المؤسسة' : 'Enterprise Framework',
          item: `${BASE_URL}${path}`,
        },
      ],
    };
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${BASE_URL}${path}#faq`,
      mainEntity: Array.isArray(faqItems)
        ? faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          }))
        : [],
    };
    window.rumuzeContextGraph = [breadcrumb, faqSchema];
    return () => {
      window.rumuzeContextGraph = null;
    };
  }, [path, isAr, faqItems]);

  const sectionKeys = [
    'governance',
    'lifecycle',
    'sprintCadence',
    'accountability',
    'riskSLA',
    'techSecurity',
  ];

  const phaseColors = [
    'from-cyan/20 to-blue-500/10',
    'from-purple/20 to-indigo-500/10',
    'from-cyan/20 to-teal-500/10',
    'from-green-500/20 to-cyan/10',
    'from-purple/20 to-pink-500/10',
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className={`pt-32 pb-20 ${isAr ? 'rtl' : 'ltr'}`}>
      <SEO path={path} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple/30 bg-purple/5 text-purple text-xs font-bold tracking-widest uppercase"
          >
            {t('enterpriseFramework.badge')}
          </Motion.div>
        </div>

        {/* H1 */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-6">
            {t('enterpriseFramework.h1')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('enterpriseFramework.intro')}
          </p>
        </Motion.div>

        {/* Authority Statement */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20 max-w-3xl mx-auto"
        >
          <blockquote className="border-l-4 border-purple rtl:border-l-0 rtl:border-r-4 pl-6 rtl:pr-6 rtl:pl-0 py-2">
            <p className="text-base text-slate-500 dark:text-gray-400 italic leading-relaxed">
              {t('enterpriseFramework.authorityStatement')}
            </p>
          </blockquote>
        </Motion.div>

        {/* Framework Sections */}
        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-12 mb-24"
        >
          {sectionKeys.map((key) => {
            const section = t(`enterpriseFramework.sections.${key}`, { returnObjects: true });
            const phases = section.phases;
            const points = section.points;
            const slas = section.slas;
            const standards = section.standards;
            const reportTypes = section.reportTypes;

            return (
              <Motion.section
                key={key}
                variants={itemVariants}
                className="p-8 md:p-10 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5"
                aria-label={section.title}
              >
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4">
                  {section.title}
                </h2>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                  {section.body}
                </p>

                {/* Phases */}
                {Array.isArray(phases) && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
                    {phases.map((phase, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl bg-gradient-to-br ${phaseColors[i % phaseColors.length]} border border-white/10 dark:border-white/5`}
                      >
                        <div className="text-xs font-black text-cyan uppercase tracking-widest mb-1">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                          {phase.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
                          {phase.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bullet points */}
                {Array.isArray(points) && (
                  <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                    {points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* SLAs */}
                {Array.isArray(slas) && (
                  <ul className="mt-4 space-y-2">
                    {slas.map((sla, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 dark:text-gray-300">{sla}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Standards */}
                {Array.isArray(standards) && (
                  <ul className="mt-4 space-y-2">
                    {standards.map((std, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 dark:text-gray-300">{std}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Report Types */}
                {Array.isArray(reportTypes) && (
                  <div className="mt-4 grid sm:grid-cols-3 gap-4">
                    {reportTypes.map((rt, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5"
                      >
                        <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                          {rt.type}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
                          {rt.covers}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Motion.section>
            );
          })}
        </Motion.div>

        {/* FAQ Section */}
        <div className="mb-24">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-10 text-center">
            {t('enterpriseFramework.faq.title')}
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {Array.isArray(faqItems) && faqItems.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] overflow-hidden"
              >
                <button
                  id={`faq-btn-${i}`}
                  className="w-full text-left rtl:text-right p-6 flex justify-between items-center group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-bold text-slate-900 dark:text-white group-hover:text-cyan transition-colors">
                    {item.question}
                  </span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-cyan flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className="px-6 pb-6 text-slate-600 dark:text-gray-400 text-sm leading-relaxed"
                  >
                    {item.answer}
                  </div>
                )}
              </Motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-8 md:p-12 text-center bg-slate-50 dark:bg-white/[0.02]">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">
              {t('enterpriseFramework.cta.title')}
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed text-sm md:text-base">
              {t('enterpriseFramework.cta.body')}
            </p>
            <div className="flex justify-center mb-6">
              <Link to={isAr ? '/ar/contact' : '/contact'} className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto px-8 py-3.5">
                  {t('enterpriseFramework.cta.button')}
                  <ArrowRight size={16} className="rtl-flip" />
                </MagneticButton>
              </Link>
            </div>
            <p className="text-xs text-slate-400 dark:text-gray-600">
              {t('enterpriseFramework.cta.whatsappLabel')}{' '}
              <a
                href={t('enterpriseFramework.cta.whatsappHref')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-gray-500 hover:underline"
              >
                {t('enterpriseFramework.cta.whatsappText')}
              </a>
            </p>
          </div>
        </Motion.div>

      </div>
    </div>
  );
};

export default EnterpriseFrameworkPage;
