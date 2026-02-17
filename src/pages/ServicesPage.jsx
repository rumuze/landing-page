import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
 
import { Code2, BrainCircuit, Rocket, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import SEO from '../components/SEO';
 
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  
  // Removed motion-based parallax for static rendering
  const containerRef = useRef(null);

  const services = [
    {
      id: 'software',
      icon: <Code2 className="text-cyan w-16 h-16" />,
      title: t('services_page.software.title'),
      description: t('services_page.software.description'),
      tech: t('services_page.software.tech', { returnObjects: true }),
      benefits: t('services_page.software.benefits', { returnObjects: true }),
      color: 'from-cyan/20 to-blue-600/20',
      border: 'group-hover:border-cyan/50',
      glow: 'shadow-[0_0_50px_-12px_rgba(0,229,255,0.5)]'
    },
    {
      id: 'ai',
      icon: <BrainCircuit className="text-purple w-16 h-16" />,
      title: t('services_page.ai.title'),
      description: t('services_page.ai.description'),
      tech: t('services_page.ai.tech', { returnObjects: true }),
      benefits: t('services_page.ai.benefits', { returnObjects: true }),
      color: 'from-purple/20 to-pink-600/20',
      border: 'group-hover:border-purple/50',
      glow: 'shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)]'
    },
    {
      id: 'growth',
      icon: <Rocket className="text-orange-500 w-16 h-16" />,
      title: t('services_page.growth.title'),
      description: t('services_page.growth.description'),
      tech: t('services_page.growth.tech', { returnObjects: true }),
      benefits: t('services_page.growth.benefits', { returnObjects: true }),
      color: 'from-orange-500/20 to-yellow-500/20',
      border: 'group-hover:border-orange-500/50',
      glow: 'shadow-[0_0_50px_-12px_rgba(249,115,22,0.5)]'
    }
  ];

  const processSteps = [
    { num: "01", title: isAr ? "استشارة" : "Consultation", desc: isAr ? "تحليل عميق لاحتياجاتكم" : "Deep-dive requirement analysis." },
    { num: "02", title: isAr ? "المخطط الأزرق" : "Blueprint", desc: isAr ? "هندسة النظام والعمارة" : "System architecture design." },
    { num: "03", title: isAr ? "التطوير" : "Development", desc: isAr ? "بناء النظام بأحدث التقنيات" : "Agile development sprints." },
    { num: "04", title: isAr ? "الإطلاق" : "Launch", desc: isAr ? "نشر النظام ومراقبة الأداء" : "Deploy, monitor, and scale." },
  ];

  return (
    <div ref={containerRef} className={`min-h-screen bg-slate-50 dark:bg-[#000B18] overflow-hidden ${isAr ? 'rtl' : 'ltr'}`}>
      <SEO path={isAr ? '/ar/services' : '/services'} />

      {/* Hero Section (static) */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
         <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-cyan/5 via-purple/5 to-transparent pointer-events-none" />
         
         <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan/30 bg-cyan/5 text-cyan text-sm font-bold tracking-widest mb-8 uppercase">
              <Zap size={16} />
              {t('hero.badge')}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan via-purple to-cyan bg-[length:200%_auto] leading-tight">
              {t('services_page.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('services.description')}
            </p>
         </div>
      </section>

      {/* Services Cards (static) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-16 md:space-y-32">
          {services.map((service, index) => (
             <div key={service.id} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Text Content */}
                <div className="flex-1 space-y-8">
                   <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                      {service.icon}
                   </div>
                   
                   <h2 className="text-4xl font-bold text-slate-900 dark:text-white">{service.title}</h2>
                   <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed border-l-4 border-slate-200 dark:border-white/10 pl-6 rtl:pl-0 rtl:pr-6">
                      {service.description}
                   </p>
                   
                   <ul className="space-y-4">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-800 dark:text-gray-200 font-medium">
                           <CheckCircle2 className="text-green-500 w-5 h-5 flex-shrink-0" />
                           {benefit}
                        </li>
                      ))}
                   </ul>

                   <div className="flex flex-wrap gap-3 pt-4">
                      {service.tech.map((tech) => (
                         <span key={tech} className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {tech}
                         </span>
                      ))}
                   </div>
                </div>

                {/* Visual placeholder removed for static rendering */}
                <div className="flex-1 w-full h-auto md:h-[500px] rounded-3xl bg-gradient-to-br from-white/10 to-white/0 border border-slate-200 dark:border-white/10" />
             </div>
          ))}
        </div>
      </section>

      {/* Work Process Timeline (static) */}
      <section className="py-32 relative bg-slate-900 text-white overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900"></div>
         <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-24">
               <h2 className="text-3xl md:text-5xl font-black mb-6">{isAr ? "منهجية العمل" : "Our Methodology"}</h2>
               <p className="text-gray-400 max-w-2xl mx-auto">{isAr ? "من الفكرة إلى الهيمنة. مسار مدروس." : "From concept to dominance. A calculated path."}</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
               {/* Connecting Line */}
               <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-cyan/20 via-purple/20 to-cyan/20"></div>
               
               {processSteps.map((step, idx) => (
                  <div key={idx} className="relative text-center group">
                     <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full border-4 border-slate-900 flex items-center justify-center relative z-10 group-hover:border-cyan transition-colors duration-300">
                        <span className="text-2xl font-black text-white/20 group-hover:text-cyan transition-colors duration-300">{step.num}</span>
                     </div>
                     <div className="mt-8">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan transition-colors">{step.title}</h3>
                        <p className="text-sm text-gray-500">{step.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Bilingual High-Impact CTA */}
      <section className="py-32 px-4 text-center bg-gradient-to-br from-slate-50 to-white dark:from-[#000B18] dark:to-slate-900 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan via-purple to-cyan"></div>
         
         <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 dark:text-white leading-tight">
               {isAr ? "هل أنت مستعد للهيمنة؟" : "Ready to Dominate?"}
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-400 mb-12">
               {isAr ? "دعنا نبني إرثك الرقمي اليوم." : "Let's engineer your digital legacy today."}
            </p>
            
            <Link 
               to={isAr ? "/ar/contact" : "/contact"} 
               className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-cyan to-blue-600 text-white font-bold text-lg hover:shadow-[0_0_40px_-5px_rgba(0,229,255,0.6)] hover:scale-105 transition-all duration-300"
            >
               <span>{isAr ? "ابدأ المشروع" : "Start Your Project"}</span>
               <ArrowRight className={isAr ? "rotate-180" : ""} />
            </Link>
         </div>
      </section>
    </div>
  );
};

export default ServicesPage;
