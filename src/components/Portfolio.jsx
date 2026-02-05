import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const projects = [
    {
      title: t('portfolio.items.fintech'),
      category: t('services.software.title'),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      description: "A high-performance analytics platform for real-time market tracking."
    },
    {
      title: t('portfolio.items.ecommerce'),
      category: t('services.marketing.title'),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      description: "Scaling a lifestyle brand from zero to 1M+ monthly recurring revenue."
    },
    {
      title: t('portfolio.items.logistics'),
      category: t('services.software.title'),
      image: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=800",
      description: "Automating supply chain workflows with cloud-native microservices."
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <div className={`max-w-xl ${isRtl ? 'text-right' : 'text-left'}`}>
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">
              {t('portfolio.title').split(' ')[0]} <span className="text-purple">{t('portfolio.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-500 dark:text-gray-400">
              {t('portfolio.description')}
            </p>
          </div>
          <button className="px-6 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:bg-white dark:hover:bg-white/5 transition-all text-sm font-bold">
            {t('portfolio.viewAll')}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white dark:bg-background border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-background via-white/40 dark:via-background/40 to-transparent opacity-80"></div>
              <div className={`absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-[-10px] ${isRtl ? 'text-right' : 'text-left'}`}>
                <span className="text-purple text-xs font-bold tracking-widest uppercase mb-2">{project.category}</span>
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
                  {project.title}
                  <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple" />
                </h3>
                <p className="text-slate-600 dark:text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
