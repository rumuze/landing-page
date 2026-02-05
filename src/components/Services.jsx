import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();


  // NOTE: I used "marketing" in json, let me fix the call
  const correctedCategories = [
    {
      title: t('services.software.title'),
      description: t('services.software.description'),
      icon: <Layers className="text-cyan" />,
      items: [
        { name: t('services.software.items.erp.name'), text: t('services.software.items.erp.text') },
        { name: t('services.software.items.api.name'), text: t('services.software.items.api.text') },
        { name: t('services.software.items.mobile.name'), text: t('services.software.items.mobile.text') }
      ]
    },
    {
      title: t('services.marketing.title'),
      description: t('services.marketing.description'),
      icon: <Target className="text-purple" />,
      items: [
        { name: t('services.marketing.items.growth.name'), text: t('services.marketing.items.growth.text') },
        { name: t('services.marketing.items.brand.name'), text: t('services.marketing.items.brand.text') },
        { name: t('services.marketing.items.ads.name'), text: t('services.marketing.items.ads.text') }
      ]
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-white dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white"
          >
            {t('services.title').split(' ')[0]} <span className="text-cyan">{t('services.title').split(' ').slice(1).join(' ')}</span>
          </motion.h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 no-scrollbar">
          {correctedCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="min-w-[85vw] md:min-w-0 snap-center p-8 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-cyan/30 transition-all group shadow-sm hover:shadow-xl dark:shadow-none mx-2 md:mx-0"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <div className="text-start">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{category.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400">{category.description}</p>
                </div>
              </div>

              <div className="grid gap-4 mt-8">
                {category.items.map((item) => (
                  <div key={item.name} className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-cyan/20 transition-all text-start group/item">
                    <h4 className="font-bold text-slate-800 dark:text-white mb-1 group-hover/item:text-cyan transition-colors">{item.name}</h4>
                    <p className="text-sm text-slate-600 dark:text-gray-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
