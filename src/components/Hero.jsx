import React from 'react';
 
import { Terminal, ArrowRight, Sparkles, Code2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
 

  const codeSteps = [
    { line: 1, text: "class RumuzeGrowth {", color: "text-purple" },
    { line: 2, text: "  async accelerate(project) {", color: "text-cyan" },
    { line: 3, text: "    const stack = ['React', 'AI'];", color: "text-green-400" },
    { line: 4, text: "    return project.optimize(stack);", color: "text-yellow-400" },
    { line: 5, text: "  }", color: "text-purple" },
    { line: 6, text: "}", color: "text-purple" },
  ];

 

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-transparent">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-20%] w-[1000px] h-[1000px] bg-gradient-to-br from-indigo-300/20 to-purple-300/20 dark:from-cyan/10 dark:to-purple/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 ${isRtl ? '-right-[30%]' : '-left-[30%]'}`} />
        <div className={`absolute bottom-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-purple-300/20 to-pink-300/20 dark:from-purple/10 dark:to-pink-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-60 ${isRtl ? '-left-[20%]' : '-right-[20%]'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid md:grid-cols-2 gap-12 items-center z-10">
        <div className={isRtl ? 'text-right' : 'text-left'}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-cyan text-xs font-bold mb-6 tracking-wider uppercase backdrop-blur-sm">
            <Sparkles size={14} />
            {t('hero.badge')}
          </div>
          
          <h1 className="text-fluid-h1 font-black leading-tight mb-6 text-slate-900 dark:text-white tracking-tight">
            {t('hero.headline_part1')} 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-purple to-cyan bg-[length:200%_auto] animate-gradient-x">
              {t('hero.headline_part2')}
            </span>.<br />
            {t('hero.headline_part3')}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 mb-10 max-w-xl leading-relaxed tracking-wide">
            {t('hero.subheadline')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={isRtl ? '/ar/services' : '/services'} className="px-8 py-4 shadow-xl shadow-cyan/20 w-full sm:w-auto btn-primary inline-flex items-center gap-2">
              {t('hero.ctaExplore')}
              <ArrowRight size={18} className="rtl-flip" />
            </Link>
            <Link to={isRtl ? '/ar/contact' : '/contact'} className="px-8 py-4 rounded-xl font-bold border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm w-full sm:w-auto backdrop-blur-sm">
              {t('hero.ctaServices')}
            </Link>
          </div>
        </div>

        {/* Desktop/Tablet Code Block */}
        <div className="relative perspective-1000 hidden md:block">
          <div className="glass-card p-0 overflow-hidden shadow-2xl cyan-glow border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-xl">
            <div className="bg-slate-100 dark:bg-white/5 px-4 py-3 flex gap-2 border-b border-slate-200 dark:border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-inner"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-inner"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-inner"></div>
            </div>
            <div className="p-8 font-mono text-sm leading-relaxed" dir="ltr">
              <pre className="text-slate-500 dark:text-gray-400">
                <code className="block">
                  <span className="text-purple font-bold">class</span> <span className="text-cyan font-bold">RumuzeGrowth</span> &#123; <br />
                  &nbsp;&nbsp;<span className="text-slate-400 italic">// {t('hero.code.comment', 'Scaling your vision')}</span> <br />
                  &nbsp;&nbsp;<span className="text-purple font-bold">async</span> <span className="text-blue-500 font-bold">accelerate</span>(project) &#123; <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple font-bold">const</span> stack = [<span className="text-green-500">'React'</span>, <span className="text-green-500">'Node'</span>, <span className="text-green-500">'AI'</span>];<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple font-bold">const</span> results = <span className="text-purple font-bold">await</span> project.<span className="text-blue-500 font-bold">optimize</span>(stack);<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple font-bold">return</span> <span className="text-blue-500">`Success: $&#123;results.growth&#125;%`</span>;<br />
                  &nbsp;&nbsp;&#125; <br />
                  &#125;
                </code>
              </pre>
            </div>
            {/* Visual elements */}
            <div className={`absolute -bottom-6 w-32 h-32 glass border border-cyan/20 rounded-2xl flex items-center justify-center ${isRtl ? '-left-6' : '-right-6'}`}>
              <Terminal className="text-cyan w-12 h-12 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            </div>
          </div>
        </div>

        {/* Mobile Code Stream Animation */}
        <div className="md:hidden mt-8 w-full">
           <div className="glass-card p-4 overflow-hidden relative min-h-[160px] flex items-center justify-center bg-slate-900/95 border-slate-700 shadow-xl">
              <Code2 className="absolute top-4 right-4 text-white/10 w-12 h-12" />
              <div className="font-mono text-sm w-full break-all whitespace-pre-wrap" dir="ltr">
                {codeSteps.map((step) => (
                  <div key={step.line} className={`${step.color} font-bold`}>
                    {step.text}
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
