import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layers, BarChart3, ShieldCheck, TrendingUp } from 'lucide-react';

const DIFFERENTIATORS = [
  {
    icon: Layers,
    title: {
      en: 'System-Based Growth Model',
      ar: 'نموذج نمو قائم على النظم',
    },
    description: {
      en: 'Rumuze builds integrated digital systems — not isolated deliverables. Every component connects to a strategic growth architecture designed to scale with your business.',
      ar: 'تبني روموز أنظمة رقمية متكاملة — وليس مخرجات منفصلة. كل مكوّن يتصل ببنية نمو استراتيجية مصممة للتوسع مع أعمالك.',
    },
  },
  {
    icon: BarChart3,
    title: {
      en: 'Software + Marketing Integration',
      ar: 'تكامل البرمجيات والتسويق',
    },
    description: {
      en: 'Most agencies offer either development or marketing. Rumuze delivers both under one roof, ensuring your technology stack and growth strategy are engineered together — not bolted on.',
      ar: 'معظم الوكالات تقدم إما التطوير أو التسويق. روموز تقدم كليهما تحت سقف واحد، لضمان أن المكدس التكنولوجي واستراتيجية النمو مهندسان معاً — وليسا مضافين لاحقاً.',
    },
  },
  {
    icon: ShieldCheck,
    title: {
      en: 'Performance Accountability',
      ar: 'مسؤولية أداء قابلة للقياس',
    },
    description: {
      en: 'Every Rumuze engagement is governed by measurable KPIs and service-level objectives (SLOs). We report on uptime, ROAS, delivery velocity, and system reliability — not vanity metrics.',
      ar: 'كل ارتباط مع روموز محكوم بمؤشرات أداء قابلة للقياس ومؤشرات مستوى الخدمة (SLOs). نقدم تقارير عن وقت التشغيل والعائد الإعلاني وسرعة التسليم وموثوقية النظام — وليس مقاييس شكلية.',
    },
  },
  {
    icon: TrendingUp,
    title: {
      en: 'Long-Term Scalability Focus',
      ar: 'تركيز على قابلية التوسع طويلة المدى',
    },
    description: {
      en: 'Rumuze architects systems for the next 10 years, not the next sprint. Domain-driven design, modular microservices, and infrastructure-as-code ensure your platform evolves without rewrites.',
      ar: 'تصمم روموز الأنظمة للسنوات العشر القادمة، وليس للسبرنت التالي. التصميم الموجه بالمجال والميكروسيرفيس المعيارية والبنية التحتية ككود تضمن تطور منصتك بدون إعادة كتابة.',
    },
  },
];

const HomepageDifferentiationSection = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <section className="py-24" aria-labelledby="homepage-diff-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            id="homepage-diff-title"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4"
          >
            {isAr
              ? 'لماذا تعتمد المؤسسات على روموز في هندسة SaaS و ERP'
              : 'Why Enterprises Choose Rumuze for SaaS & ERP Engineering'
            }
          </h2>
          <p className="text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
            {isAr
              ? 'روموز تجمع بين هندسة البرمجيات المؤسسية والتسويق الأدائي بتسليم محكوم بمؤشرات مستوى الخدمة.'
              : 'Rumuze combines enterprise software engineering with performance marketing under SLO-governed delivery.'
            }
          </p>
        </Motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {DIFFERENTIATORS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-cyan/30 hover:shadow-xl hover:shadow-cyan/5 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/10 to-purple/10 flex items-center justify-center shrink-0 group-hover:from-cyan/20 group-hover:to-purple/20 transition-all">
                    <Icon size={24} className="text-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {isAr ? item.title.ar : item.title.en}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
                      {isAr ? item.description.ar : item.description.en}
                    </p>
                  </div>
                </div>
              </Motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomepageDifferentiationSection;
