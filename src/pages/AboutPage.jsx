import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Award, Zap, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const values = [
    {
      id: 'innovation',
      icon: <Zap className="text-yellow-400" />,
      title: t('about.values.innovation.title'),
      text: t('about.values.innovation.text')
    },
    {
      id: 'precision',
      icon: <ShieldCheck className="text-cyan" />,
      title: t('about.values.precision.title'),
      text: t('about.values.precision.text')
    },
    {
      id: 'scalability',
      icon: <Award className="text-purple" />,
      title: t('about.values.scalability.title'),
      text: t('about.values.scalability.text')
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <SEO 
        title={t('about.title')} 
        description={t('about.subtitle')}
        path={isAr ? '/ar/about' : '/about'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 dark:text-white leading-tight">
            {t('about.title')}
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan/20 to-purple/20 blur-2xl rounded-3xl group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-10 rounded-3xl shadow-xl backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
                {t('about.story.title')}
              </h2>
              <div className="space-y-6 text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
                <p>{t('about.story.content')}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {values.map((value) => (
              <div key={value.id} className="flex gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-cyan/30 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-white dark:bg-background flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{value.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400">{value.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTO Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-900 to-black rounded-[2.5rem] p-12 lg:p-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-cyan/5 animate-pulse"></div>
          <div className="relative flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-tr from-cyan via-purple to-pink-500 p-1">
               <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border-4 border-slate-900">
                  <span className="text-6xl font-black text-white">MA</span>
               </div>
            </div>
            <div className="flex-1 text-center lg:text-left rtl:text-right">
              <h2 className="text-4xl font-black text-white mb-2">{t('about.cto.name')}</h2>
              <p className="text-xl font-bold text-cyan mb-6">{t('about.cto.role')}</p>
              <p className="text-lg text-gray-400 mb-10 max-w-2xl leading-relaxed">
                {t('about.cto.bio')}
              </p>
              <div className="flex justify-center lg:justify-start gap-6">
                <a href="https://github.com/mohamedashraf" className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan hover:text-white transition-all">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com/in/mohamedashraf" className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan hover:text-white transition-all">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:official@rumuze.com" className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan hover:text-white transition-all">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
