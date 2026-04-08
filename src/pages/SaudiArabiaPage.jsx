import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Building2, ChartBar, Shield, Users, FileText } from 'lucide-react';
import SEO from '../components/SEO';
import { siteCoreConfig as SiteConfig, StableIds } from '../config/siteCoreConfig';
import MagneticButton from '../components/MagneticButton';

const BASE_URL = SiteConfig.baseUrl;

const SaudiArabiaPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const path = isAr ? '/ar/saudi-arabia' : '/saudi-arabia';
  const schemas = React.useMemo(() => {
    const breadcrumb = {
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
          name: isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia',
          item: `${BASE_URL}${path}`,
        },
      ],
    };
    const article = {
      '@type': 'Article',
      '@id': `${BASE_URL}${path}#article`,
      headline: isAr
        ? 'هندسة البرمجيات والتسويق الأدائي للمؤسسات السعودية'
        : 'Software Engineering & Performance Marketing for Saudi Enterprises',
      description: isAr
        ? 'روموز تقدم هندسة برمجيات منظمة وتنفيذ تسويق أدائي للمؤسسات العاملة في المملكة العربية السعودية.'
        : 'Rumuze delivers structured software engineering and performance marketing for enterprises operating in Saudi Arabia.',
      author: { '@id': StableIds.founder },
      publisher: { '@id': StableIds.organization },
      inLanguage: isAr ? 'ar' : 'en',
      about: { '@id': StableIds.organization },
      keywords: isAr
        ? 'هندسة برمجيات, تسويق أدائي, المملكة العربية السعودية, تحول رقمي'
        : 'software engineering, performance marketing, Saudi Arabia, digital transformation',
      areaServed: {
        '@type': 'Country',
        name: 'Saudi Arabia',
        sameAs: 'https://en.wikipedia.org/wiki/Saudi_Arabia',
      },
      mentions: { '@id': StableIds.organization },
    };
    return [breadcrumb, article];
  }, [path, isAr]);

  const sections = [
    {
      key: 'execution',
      icon: <FileText className="w-6 h-6 text-cyan" />,
      title: t('saudiPage.sections.execution.title'),
      body: t('saudiPage.sections.execution.body'),
      points: t('saudiPage.sections.execution.points', { returnObjects: true }),
    },
    {
      key: 'softwareDelivery',
      icon: <Building2 className="w-6 h-6 text-purple" />,
      title: t('saudiPage.sections.softwareDelivery.title'),
      body: t('saudiPage.sections.softwareDelivery.body'),
      points: t('saudiPage.sections.softwareDelivery.points', { returnObjects: true }),
    },
    {
      key: 'marketing',
      icon: <ChartBar className="w-6 h-6 text-cyan" />,
      title: t('saudiPage.sections.marketing.title'),
      body: t('saudiPage.sections.marketing.body'),
      points: t('saudiPage.sections.marketing.points', { returnObjects: true }),
    },
    {
      key: 'governance',
      icon: <Shield className="w-6 h-6 text-purple" />,
      title: t('saudiPage.sections.governance.title'),
      body: t('saudiPage.sections.governance.body'),
      points: t('saudiPage.sections.governance.points', { returnObjects: true }),
    },
    {
      key: 'whyStructured',
      icon: <Users className="w-6 h-6 text-cyan" />,
      title: t('saudiPage.sections.whyStructured.title'),
      body: t('saudiPage.sections.whyStructured.body'),
      points: t('saudiPage.sections.whyStructured.points', { returnObjects: true }),
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  return (
    <div className={`pt-32 pb-20 ${isAr ? 'rtl' : 'ltr'}`}>
      <SEO path={path} schemas={schemas} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* H1 */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-6">
            {t('saudiPage.h1')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('saudiPage.intro')}
          </p>
        </Motion.div>

        {/* Authority Statement */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20 max-w-3xl mx-auto"
        >
          <blockquote className="border-l-4 border-cyan rtl:border-l-0 rtl:border-r-4 pl-6 rtl:pr-6 rtl:pl-0 py-2">
            <p className="text-base text-slate-500 dark:text-gray-400 italic leading-relaxed">
              {t('saudiPage.authorityStatement')}
            </p>
          </blockquote>
        </Motion.div>

        {/* Sections */}
        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-16 mb-24"
        >
          {sections.map((section, idx) => (
            <Motion.section key={section.key} variants={itemVariants} aria-label={section.title}>
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div className={idx % 2 !== 0 ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                    {section.body}
                  </p>
                </div>
                <div className={`p-8 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 ${idx % 2 !== 0 ? 'md:order-1' : ''}`}>
                  <ul className="space-y-4">
                    {Array.isArray(section.points) && section.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-gray-300 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {idx < sections.length - 1 && (
                <div className="mt-16 border-b border-slate-100 dark:border-white/5" />
              )}
            </Motion.section>
          ))}
        </Motion.div>

        {/* Service Area Note */}
        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20 p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5"
        >
          <p className="text-sm text-slate-500 dark:text-gray-500 leading-relaxed text-center">
            {t('saudiPage.serviceArea')}
          </p>
        </Motion.div>

        {/* CTA Section */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-8 md:p-12 text-center bg-slate-50 dark:bg-white/[0.02]">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">
              {t('saudiPage.cta.title')}
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed text-sm md:text-base">
              {t('saudiPage.cta.body')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <Link to={isAr ? '/ar/contact' : '/contact'} className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto px-8 py-3.5">
                  {t('saudiPage.cta.button')}
                  <ArrowRight size={16} className="rtl-flip" />
                </MagneticButton>
              </Link>
              <Link to={isAr ? '/ar/enterprise-framework' : '/enterprise-framework'} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm border border-slate-300 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  {isAr ? 'إطار التسليم' : 'View Delivery Framework'}
                </button>
              </Link>
            </div>
            <p className="text-xs text-slate-400 dark:text-gray-600">
              {t('saudiPage.cta.whatsappLabel')}{' '}
              <a
                href={t('saudiPage.cta.whatsappHref')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-gray-500 hover:underline"
              >
                {t('saudiPage.cta.whatsappText')}
              </a>
            </p>
          </div>
        </Motion.div>

      </div>
    </div>
  );
};

export default SaudiArabiaPage;
