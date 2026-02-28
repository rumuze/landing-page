import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ServiceHeroSection = ({ service, isAr }) => {
  const title = isAr ? service.title.ar : service.title.en;
  const summary = isAr ? service.summary.ar : service.summary.en;
  const category = service.category === 'software'
    ? (isAr ? 'هندسة البرمجيات' : 'Software Engineering')
    : (isAr ? 'التسويق الرقمي' : 'Digital Marketing');

  return (
    <section
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
      aria-labelledby="service-hero-title"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        {/* Breadcrumb */}
        <Motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="mb-8"
        >
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={isAr ? '/ar/' : '/'} itemProp="item" className="hover:text-cyan transition-colors">
                <span itemProp="name">{isAr ? 'الرئيسية' : 'Home'}</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <span aria-hidden="true" className="text-slate-400">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={isAr ? '/ar/services' : '/services'} itemProp="item" className="hover:text-cyan transition-colors">
                <span itemProp="name">{isAr ? 'الخدمات' : 'Services'}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <span aria-hidden="true" className="text-slate-400">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-cyan font-medium">{title}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </Motion.nav>

        {/* Category badge */}
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan/10 text-cyan border border-cyan/20">
            {category}
          </span>
        </Motion.div>

        {/* Title */}
        <Motion.h1
          id="service-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 max-w-4xl leading-tight"
          itemProp="name"
        >
          {title}
        </Motion.h1>

        {/* Summary */}
        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-3xl leading-relaxed mb-10"
          itemProp="description"
        >
          {summary}
        </Motion.p>

        {/* CTA */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            to={isAr ? '/ar/contact' : '/contact'}
            className="btn-primary px-8 py-3.5 text-base shadow-lg shadow-cyan/20 flex items-center gap-2"
          >
            {isAr ? 'احجز استشارة فنية' : 'Request Technical Consultation'}
            {isAr ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </Link>
          <Link
            to={isAr ? '/ar/portfolio' : '/portfolio'}
            className="px-8 py-3.5 text-base font-semibold text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10 rounded-xl hover:border-cyan/30 hover:text-cyan transition-all"
          >
            {isAr ? 'شاهد أعمالنا' : 'View Case Studies'}
          </Link>
        </Motion.div>
      </div>
    </section>
  );
};

export default ServiceHeroSection;
