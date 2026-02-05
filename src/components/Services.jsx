import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  const serviceCategories = [
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
      title: t('services.digital.title'), // Wait, check translation keys
      description: t('services.digital.description'),
      icon: <Target className="text-purple" />,
      items: [
        { name: t('services.digital.items.growth.name'), text: t('services.digital.items.growth.text') },
        { name: t('services.digital.items.brand.name'), text: t('services.digital.items.brand.text') },
        { name: t('services.digital.items.ads.name'), text: t('services.digital.items.ads.text') }
      ]
    }
  ];

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
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            {t('services.title').split(' ')[0]} <span className="text-cyan">{t('services.title').split(' ').slice(1).join(' ')}</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {correctedCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glass-card group hover:border-cyan/30"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  {category.icon}
                </div>
                <div className="text-start">
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  <p className="text-sm text-gray-400">{category.description}</p>
                </div>
              </div>

              <div className="grid gap-4 mt-8">
                {category.items.map((item) => (
                  <div key={item.name} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all text-start">
                    <h4 className="font-bold text-white mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-400">{item.text}</p>
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
