import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { Github, Linkedin, Mail, Award, Zap, ShieldCheck, Database, Layout, Server, Cpu, Globe, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';
import { SiteConfig } from '../config/site';

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const values = [
    {
      id: 'innovation',
      icon: <Zap className="text-yellow-400 w-8 h-8" />,
      title: t('about.values.innovation.title'),
      text: t('about.values.innovation.text'),
      gradient: "from-yellow-400/20 to-orange-500/20"
    },
    {
      id: 'precision',
      icon: <ShieldCheck className="text-cyan w-8 h-8" />,
      title: t('about.values.precision.title'),
      text: t('about.values.precision.text'),
      gradient: "from-cyan/20 to-blue-500/20"
    },
    {
      id: 'scalability',
      icon: <Award className="text-purple w-8 h-8" />,
      title: t('about.values.scalability.title'),
      text: t('about.values.scalability.text'),
      gradient: "from-purple/20 to-pink-500/20"
    }
  ];

  const techStack = [
    { category: "Frontend Core", icon: <Layout />, items: ["React.js", "Next.js", "TailwindCSS", "Framer Motion", "Three.js"] },
    { category: "Backend & Cloud", icon: <Server />, items: ["Node.js Cluster", "Laravel Enterprise", "AWS Lambda", "Docker", "Kubernetes"] },
    { category: "Data & AI", icon: <Database />, items: ["PostgreSQL", "Redis", "TensorFlow", "PyTorch", "Pinecone"] },
    { category: "Global Edge", icon: <Globe />, items: ["Cloudflare Workers", "Edge Caching", "Global CDN", "WASM"] }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className={`pt-32 pb-20 overflow-hidden ${isAr ? 'rtl' : 'ltr'}`}>
      <SEO path={isAr ? '/ar/about' : '/about'} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Helper Badge */}
        <div className="flex justify-center mb-8">
            <Motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple/30 bg-purple/5 text-purple text-sm font-bold tracking-widest uppercase"
            >
              <Cpu size={16} />
              <span>{t('about.subtitle')}</span>
            </Motion.div>
        </div>

        {/* Hero Section */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 dark:text-white leading-tight tracking-tight">
            {isAr ? "نفك شفرة " : "DECODING "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-purple to-cyan bg-[length:200%_auto] animate-gradient-x">
              {isAr ? "التعقيد" : "COMPLEXITY"}
            </span>.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('about.story.content')}
          </p>
          <p className="text-base md:text-lg text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mt-6">
            {SiteConfig.authorityDescription[isAr ? 'ar' : 'en']}
          </p>
        </Motion.div>

        {/* Mission & Values Grid */}
        <Motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-8 mb-32"
        >
          {values.map((value) => (
             <Motion.div 
               key={value.id}
               variants={itemVariants}
               className="p-8 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-cyan/30 transition-all group relative overflow-hidden"
             >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                   <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black/40 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                   </div>
                   <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{value.title}</h3>
                   <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                      {value.text}
                   </p>
                </div>
             </Motion.div>
          ))}
        </Motion.div>

        {/* Tech Stack Visualization */}
        <div className="mb-32">
           <Motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-3xl md:text-4xl font-black text-center mb-16 text-slate-900 dark:text-white"
           >
              {t('techStack.badge')}
           </Motion.h2>

           <Motion.div 
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-50px" }}
             className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
           >
              {techStack.map((stack) => (
                 <Motion.div
                   key={stack.category}
                   variants={itemVariants}
                   className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-purple/40 transition-colors"
                 >
                    <div className="flex items-center gap-3 mb-6">
                       <span className="p-2 rounded bg-purple/10 text-purple">{stack.icon}</span>
                       <h3 className="font-bold text-slate-900 dark:text-white">{stack.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {stack.items.map((item) => (
                          <span key={item} className="px-3 py-1 text-xs font-bold rounded-md bg-white dark:bg-white/10 text-slate-600 dark:text-gray-300 border border-slate-100 dark:border-white/5">
                             {item}
                          </span>
                       ))}
                    </div>
                 </Motion.div>
              ))}
           </Motion.div>
        </div>

        {/* Founder Section */}
        <Motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden"
        >
          <div className="absolute inset-0 bg-slate-900 dark:bg-black"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
          
          <div className="relative z-10 p-12 lg:p-24 flex flex-col lg:flex-row gap-16 items-center">
             <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full border-4 border-cyan/20 p-2 flex-shrink-0 relative group">
                <div className="absolute inset-0 rounded-full border-2 border-cyan/50 border-t-transparent animate-spin-slow group-hover:animate-spin"></div>
                <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-black flex items-center justify-center overflow-hidden">
                   <span className="text-5xl font-black text-cyan">MA</span>
                </div>
             </div>
             
             <div className="text-center lg:text-left rtl:lg:text-right flex-1">
                <h2 className="text-3xl font-black text-white mb-2">{t('about.cto.name')}</h2>
                <div className="text-cyan font-bold tracking-widest uppercase text-sm mb-6">{t('about.cto.role')}</div>
                <p className="text-xl text-gray-400 mb-10 leading-relaxed italic">
                   "{t('about.cto.bio')}"
                </p>
                <div className="flex justify-center lg:justify-start gap-6 items-center">
                  <div className="flex gap-4">
                    <a href="https://github.com/mohamedashraf" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-cyan hover:text-white transition-colors text-white">
                       <Github size={20} />
                    </a>
                    <a href="https://linkedin.com/in/mohamedashraf" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-cyan hover:text-white transition-colors text-white">
                       <Linkedin size={20} />
                    </a>
                  </div>
                  
                  <Link to={isAr ? "/ar/contact" : "/contact"}>
                    <MagneticButton className="px-8 py-3 shadow-lg shadow-cyan/20">
                       {t('hero.ctaExplore')} <ArrowUpRight size={18} className="rtl-flip" />
                    </MagneticButton>
                  </Link>
                </div>
             </div>
          </div>
        </Motion.div>

      </div>
    </div>
  );
};

export default AboutPage;
