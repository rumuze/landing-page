import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code2, BrainCircuit, Rocket } from 'lucide-react';
import SEO from '../components/SEO';

const ServicesPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const services = [
    {
      id: 'software',
      icon: <Code2 className="text-cyan w-12 h-12" />,
      title: t('services_page.software.title'),
      description: t('services_page.software.description'),
      tech: t('services_page.software.tech', { returnObjects: true }),
      process: t('services_page.software.process', { returnObjects: true }),
      color: 'from-cyan/20 to-blue-500/20'
    },
    {
      id: 'ai',
      icon: <BrainCircuit className="text-purple w-12 h-12" />,
      title: t('services_page.ai.title'),
      description: t('services_page.ai.description'),
      tech: t('services_page.ai.tech', { returnObjects: true }),
      process: t('services_page.ai.process', { returnObjects: true }),
      color: 'from-purple/20 to-pink-500/20'
    },
    {
      id: 'growth',
      icon: <Rocket className="text-orange-500 w-12 h-12" />,
      title: t('services_page.growth.title'),
      description: t('services_page.growth.description'),
      tech: t('services_page.growth.tech', { returnObjects: true }),
      process: t('services_page.growth.process', { returnObjects: true }),
      color: 'from-orange-500/20 to-yellow-500/20'
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <SEO 
        title={t('services_page.title')} 
        description={t('services.description')}
        path={isAr ? '/ar/services' : '/services'}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan via-purple to-cyan bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
            {t('services_page.title')}
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('services.description')}
          </p>
        </motion.div>

        <div className="space-y-32">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 w-full text-left rtl:text-right">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8`}>
                  {service.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                  {service.title}
                </h2>
                <p className="text-lg text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {service.description}
                </p>

                {/* Tech Stack specific to service */}
                <div className="mb-10">
                  <h3 className="text-sm font-black uppercase tracking-widest text-cyan mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {service.tech.map((item) => (
                      <span key={item} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-700 dark:text-gray-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Process for service */}
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-purple mb-6">Our Process</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {service.process.map((step, sIdx) => (
                      <div key={step} className="relative group">
                        <div className="text-xs font-black text-slate-200 dark:text-gray-600 mb-2">0{sIdx + 1}</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan transition-colors">{step}</div>
                        {sIdx < service.process.length - 1 && (
                          <div className={`absolute top-0 right-0 h-full w-px bg-slate-200 dark:bg-white/5 hidden sm:block ${isAr ? 'left-0 right-auto' : ''}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className={`aspect-square rounded-3xl bg-gradient-to-br ${service.color} relative overflow-hidden group`}>
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="p-12 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 shadow-2xl"
                      >
                         {service.icon}
                      </motion.div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
