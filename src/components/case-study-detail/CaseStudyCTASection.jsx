import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Rocket, FileText } from 'lucide-react';

const CaseStudyCTASection = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24" aria-labelledby="case-study-cta">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-white/[0.04] dark:via-white/[0.02] dark:to-white/[0.04] border border-white/10 p-10 md:p-16 overflow-hidden text-center"
        >
          {/* Glow effects */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-cyan/15 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2
              id="case-study-cta"
              className="text-3xl md:text-4xl font-black text-white mb-6"
            >
              {isAr ? 'هل تريد تحقيق نتائج مماثلة؟' : 'Want similar results?'}
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              {isAr
                ? 'حدد موعداً لجلسة استراتيجية أو تقييم تقني لمناقشة تحديات نمو شركتك مع خبرائنا.'
                : 'Schedule a strategy session or technical audit to discuss your company\'s growth challenges with our experts.'
              }
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={isAr ? '/ar/contact' : '/contact'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-cyan/10 hover:text-white transition-all duration-300 group"
              >
                <Rocket size={20} className="text-cyan group-hover:text-white transition-colors" />
                {isAr ? 'طلب استراتيجية نمو' : 'Request a Growth Strategy'}
                <Arrow size={18} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to={isAr ? '/ar/services' : '/services'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
              >
                <FileText size={20} className="text-gray-400" />
                {isAr ? 'استكشاف جميع القدرات' : 'Explore All Capabilities'}
              </Link>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default CaseStudyCTASection;
