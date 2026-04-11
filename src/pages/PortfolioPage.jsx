import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ZoomIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '../components/OptimizedImage';
import { CardSkeleton } from '../components/SkeletonLoader';
import SEO from '../components/SEO';

const PortfolioPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading effect
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: 1,
      title: t('portfolio.items.fintech'),
      category: t('services.software.title'),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      description: "A high-performance analytics platform for real-time market tracking.",
      longDesc: "Full-scale implementation of a real-time analytics dashboard handling over 1M transactions per second."
    },
    {
      id: 2,
      title: t('portfolio.items.ecommerce'),
      category: t('services.marketing.title'),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      description: "Scaling a lifestyle brand from zero to 1M+ monthly recurring revenue.",
      longDesc: "Strategic growth hacking combined with a headless commerce architecture."
    },
    {
      id: 3,
      title: t('portfolio.items.logistics'),
      category: t('services.software.title'),
      image: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=800",
      description: "Automating supply chain workflows with cloud-native microservices.",
      longDesc: "IoT integration and predictive logistics driven by machine learning models."
    }
  ];

  return (
    <>
      <SEO path={isRtl ? '/ar/portfolio' : '/portfolio'} />
      
      {/* 
        RTL Fix: 
        1. Explicit dir prop
        2. Logical properties (text-start, ms-auto, me-auto) 
        3. Removed physical text alignment (text-left/right) favor of text-start
      */}
      <div 
        className="surface-page tech-grid min-h-screen pt-32 pb-20 bg-slate-50 dark:bg-background"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl text-start">
              <Motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-xs font-bold mb-4 tracking-wider uppercase"
              >
                {t('navbar.portfolio')}
              </Motion.div>
              <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
                {t('portfolio.title').split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">{t('portfolio.title').split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-gray-400">
                {t('portfolio.description')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
               <>
                 <CardSkeleton />
                 <CardSkeleton />
                 <CardSkeleton />
                 <CardSkeleton />
                 <CardSkeleton />
                 <CardSkeleton />
               </>
            ) : (
              projects.map((project, idx) => (
              <Motion.div
                layoutId={project.id}
                onClick={() => setSelectedId(project.id)}
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-2xl hover:shadow-cyan/10 transition-all duration-500 cursor-pointer text-start"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Motion.div
                    className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                  >
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={600}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="w-full h-full object-cover"
                    />
                  </Motion.div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                  <span className="text-cyan text-xs font-bold tracking-widest uppercase mb-2">{project.category}</span>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-white">
                    {project.title}
                    <ZoomIn size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan" />
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0">
                    {project.description}
                  </p>
                </div>
              </Motion.div>
            ))
            )}
          </div>

          <AnimatePresence>
            {selectedId && (
              <div 
                className="fixed inset-0 z-[100] grid place-items-center p-4"
                dir={isRtl ? 'rtl' : 'ltr'}
              >
                 <Motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedId(null)}
                    className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
                 />
                 {projects.map(item => item.id === selectedId && (
                    <Motion.div 
                      layoutId={selectedId} 
                      className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative z-10 text-start"
                      key={item.id}
                    >
                       <Motion.button 
                          onClick={() => setSelectedId(null)}
                          className={`absolute top-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full z-20 transition-colors backdrop-blur-sm ${isRtl ? 'left-4' : 'right-4'}`}
                       >
                          <X size={20} />
                       </Motion.button>
                       <Motion.div className="aspect-video relative">
                          <OptimizedImage
                            src={item.image}
                            alt={item.title}
                            width={1200}
                            height={675}
                            priority={true}
                            sizes="(max-width: 768px) 100vw, 70vw"
                            className="w-full h-full object-cover"
                          />
                       </Motion.div>
                       <Motion.div className="p-8">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-cyan/10 text-cyan text-xs font-bold tracking-widest uppercase">{item.category}</span>
                          </div>
                          
                          <Motion.h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">{item.title}</Motion.h2>
                          <Motion.p className="text-lg text-slate-600 dark:text-gray-300 mb-8 leading-relaxed">{item.description}</Motion.p>
                          
                          <Motion.div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/10">
                             <h4 className="font-bold text-sm mb-3 text-slate-900 dark:text-white uppercase tracking-wide opacity-70">Project Impact</h4>
                             <p className="text-base text-slate-700 dark:text-gray-300 leading-relaxed font-medium">{item.longDesc}</p>
                          </Motion.div>
                          
                          <div className="mt-8 flex gap-4">
                              <button className="flex-1 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity">
                                View Case Study
                              </button>
                              <button className="px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <ExternalLink size={20} />
                              </button>
                          </div>
                       </Motion.div>
                    </Motion.div>
                 ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
