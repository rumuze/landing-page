import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white dark:bg-transparent">
      {/* Background Orbs */}
      <div className={`absolute top-1/4 w-96 h-96 bg-cyan/10 dark:bg-cyan/20 rounded-full blur-[120px] animate-pulse ${isRtl ? '-right-20' : '-left-20'}`}></div>
      <div className={`absolute bottom-1/4 w-96 h-96 bg-purple/10 dark:bg-purple/20 rounded-full blur-[120px] animate-pulse delay-1000 ${isRtl ? '-left-20' : '-right-20'}`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={isRtl ? 'text-right' : 'text-left'}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-cyan text-xs font-bold mb-6 tracking-wider uppercase">
            <Sparkles size={14} />
            {t('hero.badge')}
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-slate-900 dark:text-white">
            {i18n.language === 'en' ? (
              <>
                Decoding <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">Technology</span>,<br /> 
                Scaling Brands.
              </>
            ) : (
              <>
                {t('hero.headline').split('..')[0]}.. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">{t('hero.headline').split('..')[1]}</span>
              </>
            )}
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 mb-10 max-w-xl leading-relaxed">
            {t('hero.subheadline')}
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary flex items-center gap-2 group shadow-lg shadow-cyan/20">
              {t('hero.ctaExplore')}
              <ArrowRight size={18} className="rtl-flip group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-xl font-bold border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm">
              {t('hero.ctaServices')}
            </button>
          </div>
        </motion.div>

        {/* Animated Code Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: isRtl ? -20 : 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative perspective-1000 hidden lg:block"
        >
          <div className="glass-card p-0 overflow-hidden shadow-2xl cyan-glow">
            <div className="bg-white/10 px-4 py-2 flex gap-2 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="p-6 font-mono text-sm" dir="ltr">
              <pre className="text-gray-400">
                <code className="block">
                  <span className="text-purple">class</span> <span className="text-cyan">RumuzeGrowth</span> &#123; <br />
                  &nbsp;&nbsp;<span className="text-gray-400">// Scaling your vision</span> <br />
                  &nbsp;&nbsp;<span className="text-purple">async</span> <span className="text-cyan">accelerate</span>(project) &#123; <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple">const</span> stack = [<span className="text-green">'React'</span>, <span className="text-green">'Node'</span>, <span className="text-green">'AI'</span>];<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple">const</span> results = <span className="text-purple">await</span> project.<span className="text-cyan">optimize</span>(stack);<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple">return</span> <span className="text-cyan">`Success: $&#123;results.growth&#125;%`</span>;<br />
                  &nbsp;&nbsp;&#125; <br />
                  &#125;
                </code>
              </pre>
            </div>
            {/* Visual elements */}
            <div className={`absolute -bottom-6 w-32 h-32 glass border border-cyan/20 rounded-2xl flex items-center justify-center animate-bounce duration-[3000ms] ${isRtl ? '-left-6' : '-right-6'}`}>
              <Terminal className="text-cyan w-12 h-12" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
