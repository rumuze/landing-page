import MagneticButton from './MagneticButton';
import HeroMobileCode from './HeroMobileCode';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-transparent pt-[60px] pb-[50px] md:pt-[80px] md:pb-[70px] lg:pt-[100px] lg:pb-[80px]">
      <Helmet>
        <link 
          rel="preload" 
          as="image" 
          href="/rumuze-symbol-112.webp" 
          fetchPriority="high"
          type="image/webp"
        />
      </Helmet>
      {/* Mesh Gradient Background — CSS animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
           className={`absolute top-[-20%] w-[1000px] h-[1000px] bg-gradient-to-br from-indigo-300/20 to-purple-300/20 dark:from-cyan/10 dark:to-purple/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-hero-blob-1 ${isRtl ? '-right-[30%]' : '-left-[30%]'}`}
        />
        <div 
           className={`absolute bottom-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-purple-300/20 to-pink-300/20 dark:from-purple/10 dark:to-pink-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-60 animate-hero-blob-2 ${isRtl ? '-left-[20%]' : '-right-[20%]'}`}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-10 px-4 sm:px-6 md:gap-12 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div
          className={`animate-hero-slide-in max-w-[640px] ${isRtl ? 'ml-auto text-right' : 'text-left'}`}
        >
          <div 
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700 backdrop-blur-sm animate-hero-fade-up [animation-delay:200ms] dark:border-white/10 dark:bg-white/5 dark:text-cyan sm:text-xs"
          >
            <Sparkles size={14} />
            {t('hero.badge')}
          </div>
          
          <h1
            className={`mb-4 text-[32px] font-black text-slate-900 dark:text-white sm:text-[36px] md:text-[40px] lg:text-[50px] xl:text-[54px] ${
              isRtl
                ? 'leading-[1.2] md:leading-[1.18] lg:leading-[1.14] tracking-normal'
                : 'leading-[1.12] md:leading-[1.1] lg:leading-[1.08] tracking-[-0.035em]'
            }`}
          >
            {t('hero.headline_part1')} 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-purple to-cyan bg-[length:200%_auto] animate-gradient-x">
              {t('hero.headline_part2')}
            </span>.<br />
            {t('hero.headline_part3')}
          </h1>
          
          <p
            className={`mb-6 max-w-[42rem] text-[15px] leading-[1.6] text-slate-600 dark:text-gray-400 sm:text-base md:text-[17px] lg:text-[18px] ${
              isRtl ? 'tracking-normal' : 'tracking-[-0.012em]'
            }`}
          >
            {t('hero.subheadline')}
          </p>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link to={isRtl ? '/ar/contact' : '/contact'} className="w-full sm:w-auto">
              <MagneticButton className="w-full px-7 py-[15px] text-[15px] leading-none shadow-xl shadow-cyan/20 sm:w-auto sm:text-base">
                {t('hero.ctaExplore')}
                <ArrowRight size={18} className="rtl-flip group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </Link>
            
            <Link to={isRtl ? '/ar/services' : '/services'} className="w-full sm:w-auto">
              <button className="w-full rounded-xl border border-slate-200 px-7 py-[15px] text-[15px] font-bold leading-none text-slate-700 shadow-sm transition-all backdrop-blur-sm hover:bg-slate-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5 sm:w-auto sm:text-base">
                {t('hero.ctaServices')}
              </button>
            </Link>
          </div>
        </div>

        {/* Desktop Animated Code Block — CSS entrance */}
        <div
          className="relative perspective-1000 hidden lg:block animate-hero-zoom-in [animation-delay:200ms]"
        >
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
            <div className={`absolute -bottom-6 w-32 h-32 glass border border-cyan/20 rounded-2xl flex items-center justify-center animate-bounce duration-[3000ms] ${isRtl ? '-left-6' : '-right-6'}`}>
              <Terminal className="text-cyan w-12 h-12 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            </div>
          </div>
        </div>

        {/* Mobile Code Stream Animation — dynamically imported */}
        <div className="mt-2 w-full md:mt-4 lg:hidden">
           <HeroMobileCode />
        </div>
      </div>
    </section>
  );
};

export default Hero;
