import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Calendar, TrendingUp, Code2 } from 'lucide-react';

const CTA_VARIANTS = {
  technical: {
    en: 'Request a Scoped Technical Assessment',
    ar: 'اطلب تقييماً تقنياً محدد النطاق',
    icon: Code2,
  },
  growth: {
    en: 'Request a Revenue Infrastructure Audit',
    ar: 'اطلب تدقيق بنية الإيرادات التحتية',
    icon: TrendingUp,
  },
  strategy: {
    en: 'Request a Discovery Session',
    ar: 'اطلب جلسة اكتشاف',
    icon: Calendar,
  },
};

const ServiceCTASection = ({ service, isAr, variant = 'technical' }) => {
  const title = isAr ? service.title.ar : service.title.en;
  const cta = CTA_VARIANTS[variant] || CTA_VARIANTS.technical;
  const Icon = cta.icon;
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20" aria-labelledby="service-cta-title">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-slate-900 dark:bg-white/[0.04] border border-white/10 p-10 md:p-14 text-center overflow-hidden"
        >
          <div className="relative z-10">
            <h2
              id="service-cta-title"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              {isAr
                ? `حدّد نطاق مبادرة ${title}`
                : `Scope Your ${title} Initiative`
              }
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              {isAr
                ? 'قدّم متطلباتكم لتحصلوا على مخطط اكتشاف محدد النطاق. مالك مشروع مسمّى سيحدد المخرجات والجدول الزمني ونموذج الحوكمة قبل أي التزام.'
                : 'Submit your requirements to receive a scoped discovery outline. A named project owner will define deliverables, timeline, and governance model before any commitment.'
              }
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={isAr ? '/ar/contact' : '/contact'}
                className="btn-primary px-8 py-4 text-base flex items-center gap-3 group"
              >
                <Icon size={20} />
                <span>{isAr ? cta.ar : cta.en}</span>
                <Arrow size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={isAr ? '/ar/services' : '/services'}
                className="px-8 py-4 text-base font-semibold text-gray-300 hover:text-white transition-colors"
              >
                {isAr ? 'عرض جميع القدرات' : 'View All Capabilities'}
              </Link>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default ServiceCTASection;
