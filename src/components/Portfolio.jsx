import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ZoomIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import OptimizedImage from './OptimizedImage';
import { CardSkeleton } from './SkeletonLoader';

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading effect
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: 1,
      title: t('portfolio.items.fintech'),
      category: t('services.software.title'),
      image: "/assets/images/portfolio-1.webp",
      description: "A high-performance analytics platform for real-time market tracking.",
      longDesc: "Full-scale implementation of a real-time analytics dashboard handling over 1M transactions per second."
    },
    {
      id: 2,
      title: t('portfolio.items.ecommerce'),
      category: t('services.marketing.title'),
      image: "/assets/images/portfolio-2.webp",
      description: "Scaling a lifestyle brand from zero to 1M+ monthly recurring revenue.",
      longDesc: "Strategic growth hacking combined with a headless commerce architecture."
    },
    {
      id: 3,
      title: t('portfolio.items.logistics'),
      category: t('services.software.title'),
      image: "/assets/images/portfolio-3.webp",
      description: "Automating supply chain workflows with cloud-native microservices.",
      longDesc: "IoT integration and predictive logistics driven by machine learning models."
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-white/5 min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <div className={`max-w-xl ${isRtl ? 'text-right' : 'text-left'}`}>
            <h2 className="text-fluid-h2 font-black mb-4 text-slate-900 dark:text-white">
              {t('portfolio.title').split(' ')[0]} <span className="text-purple">{t('portfolio.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400">
              {t('portfolio.description')}
            </p>
          </div>
          <button className="px-6 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:bg-white dark:hover:bg-white/5 transition-all text-sm font-bold shadow-sm">
            {t('portfolio.viewAll')}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
             <>
               <CardSkeleton />
               <CardSkeleton />
               <CardSkeleton />
             </>
          ) : (
            projects.map((project, idx) => (
            <motion.div
              layoutId={project.id}
              onClick={() => setSelectedId(project.id)}
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white dark:bg-background border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <motion.div
                  className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                >
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    width={744}
                    height={496}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full"
                    fetchpriority={idx === 0 ? "high" : "auto"}
                  />
                </motion.div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-background via-white/40 dark:via-background/40 to-transparent opacity-80"></div>
              <div className={`absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-[-10px] ${isRtl ? 'text-right' : 'text-left'}`}>
                <span className="text-purple text-xs font-bold tracking-widest uppercase mb-2">{project.category}</span>
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
                  {project.title}
                  <ZoomIn size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple" />
                </h3>
                <p className="text-slate-600 dark:text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))
          )}
        </div>

        <AnimatePresence>
          {selectedId && (
            <div className="fixed inset-0 z-[100] grid place-items-center bg-black/60 backdrop-blur-sm p-4">
               {projects.map(item => item.id === selectedId && (
                  <motion.div 
                    layoutId={selectedId} 
                    className="w-full max-w-lg bg-white dark:bg-[#1a1a2e] rounded-3xl overflow-hidden shadow-2xl relative"
                    key={item.id}
                  >
                     <motion.button 
                        onClick={() => setSelectedId(null)}
                        className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full z-10 hover:bg-black/70 transition-colors"
                     >
                        <X size={20} />
                     </motion.button>
                     <motion.div className="aspect-video relative">
                        <OptimizedImage
                          src={item.image}
                          alt={item.title}
                          width={1200}
                          height={675}
                          priority={true}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="w-full h-full"
                        />
                     </motion.div>
                     <motion.div className="p-8">
                        <span className="text-purple text-xs font-bold tracking-widest uppercase">{item.category}</span>
                        <motion.h2 className="text-3xl font-black text-slate-900 dark:text-white my-2">{item.title}</motion.h2>
                        <motion.p className="text-slate-600 dark:text-gray-300 mb-6">{item.description}</motion.p>
                        <motion.div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/10">
                           <h4 className="font-bold text-sm mb-2 text-slate-900 dark:text-white">Project Impact</h4>
                           <p className="text-sm text-slate-600 dark:text-gray-400">{item.longDesc}</p>
                        </motion.div>
                     </motion.div>
                  </motion.div>
               ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
