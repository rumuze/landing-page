import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Shield, FileText, Lock, Globe, Menu } from 'lucide-react';
import SEO from '../components/SEO';

const LegalPage = ({ type }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const [activeSection, setActiveSection] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Determine content based on type (privacy or terms)
  // Fallback to empty structure if translation is missing to avoid crash
  const legalData = t(`legal.${type}`, { returnObjects: true });
  const sections = useMemo(() => legalData?.sections || [], [legalData]);
  const title = legalData?.title || (type === 'privacy' ? 'Privacy Policy' : 'Terms of Service');
  const lastUpdated = legalData?.lastUpdated || '';
  const intro = legalData?.intro || '';

  const icon = type === 'privacy' 
    ? <Lock className="text-cyan" size={32} />
    : <FileText className="text-purple-500" size={32} />;

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(sec => document.getElementById(sec.id));
      const scrollPosition = window.scrollY + 100; // Offset

      for (const section of sectionElements) {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          setActiveSection(section.id);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-[#050505] pt-28 pb-20 ${isAr ? 'rtl' : 'ltr'}`}>
      <SEO path={isAr ? `/ar/${type}` : `/${type}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden col-span-1 mb-4">
             <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-white/5 rounded-xl text-sm font-bold w-full"
             >
                <Menu size={18} />
                <span>{t('navbar.more', 'Table of Contents')}</span>
                <span className="ml-auto opacity-50">{isSidebarOpen ? 'Close' : 'Open'}</span>
             </button>
             
             <AnimatePresence>
                {isSidebarOpen && (
                   <Motion.div 
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="overflow-hidden bg-slate-50 dark:bg-white/5 rounded-b-xl border border-t-0 border-slate-200 dark:border-white/10"
                   >
                      <ul className="p-4 space-y-2">
                        {sections.map(section => (
                          <li key={section.id}>
                            <button
                              onClick={() => scrollToSection(section.id)}
                              className={`text-sm w-full text-start py-2 px-3 rounded-lg ${
                                activeSection === section.id 
                                ? 'bg-cyan/10 text-cyan font-bold' 
                                : 'text-slate-600 dark:text-gray-400'
                              }`}
                            >
                              {section.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                   </Motion.div>
                )}
             </AnimatePresence>
          </div>

          {/* Sidebar Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32">
              <div className="mb-8">
                 <div className="inline-flex items-center justify-center p-3 bg-slate-100 dark:bg-white/5 rounded-2xl mb-4 border border-slate-200 dark:border-white/10">
                    {icon}
                 </div>
                 <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    {type === 'privacy' ? (isAr ? 'المحتويات' : 'Contents') : (isAr ? 'الشروط' : 'Terms')}
                 </h3>
                 <p className="text-xs text-slate-500 dark:text-gray-500">
                    {sections.length} {isAr ? 'أقسام' : 'Sections'}
                 </p>
              </div>

              <nav className="space-y-1 relative">
                 {/* Decorative Line */}
                 <div className={`absolute top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 ${isAr ? 'right-0' : 'left-0'}`}></div>

                 {sections.map((section) => (
                   <button
                     key={section.id}
                     onClick={() => scrollToSection(section.id)}
                     className={`relative block w-full text-start py-2 px-4 text-sm transition-all border-l-2 ${isAr ? 'border-r-2 border-l-0' : 'border-l-2'} ${
                       activeSection === section.id
                         ? 'border-cyan text-cyan font-bold bg-gradient-to-r from-cyan/5 to-transparent'
                         : 'border-transparent text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                     }`}
                   >
                     {section.title}
                   </button>
                 ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 lg:col-span-8 lg:col-start-5">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 border-b border-slate-200 dark:border-white/10 pb-8"
            >
              <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                {title}
              </h1>
              <div className="flex items-center gap-4 text-sm font-mono text-slate-500 dark:text-gray-400">
                 <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10">
                    {lastUpdated}
                 </span>
                 <span className="flex items-center gap-1">
                    <Globe size={14} />
                    {isAr ? 'تغطية عالمية' : 'Global Coverage'}
                 </span>
              </div>
              
              <p className="mt-8 text-lg md:text-xl leading-relaxed text-slate-600 dark:text-gray-300">
                {intro}
              </p>
            </Motion.div>

            <div className="space-y-16">
               {sections.map((section, idx) => (
                 <Motion.section 
                    key={section.id} 
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.1 }}
                 >
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                       <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan/10 text-cyan text-sm font-black border border-cyan/20">
                          {idx + 1}
                       </span>
                       {section.title.replace(/^\d+\.\s*/, '')} {/* Remove number prefix from title if present, since we style it above */}
                    </h2>
                    
                    <div className="prose prose-lg dark:prose-invert prose-slate max-w-none text-slate-600 dark:text-gray-400 leading-relaxed">
                       {section.content.split('\n').map((line, i) => {
                          if (line.startsWith('•')) {
                             // List items with bold keys
                             const [key, val] = line.replace('• ', '').split(':');
                             return (
                                <div key={i} className="flex gap-3 mb-2 ml-4">
                                   <div className="min-w-[6px] h-[6px] rounded-full bg-cyan mt-2.5"></div>
                                   <p className="m-0">
                                      {val ? (
                                         <>
                                            <strong className="text-slate-900 dark:text-white font-semibold">{key.replace(/\*\*/g, '')}:</strong>
                                            {val}
                                         </>
                                      ) : (
                                         line.replace('• ', '')
                                      )}
                                   </p>
                                </div>
                             )
                          }
                          // Standard Paragraph
                          return line.trim() ? <p key={i} className="mb-4">{line}</p> : null;
                       })}
                    </div>
                 </Motion.section>
               ))}
            </div>
            
            <div className="mt-20 p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
               <Shield className="text-cyan mb-4" size={32} />
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                 {isAr ? 'التزامنا بالأمان' : 'Our Commitment to Security'}
               </h3>
               <p className="text-slate-600 dark:text-gray-400">
                 {isAr 
                   ? 'نحن نستخدم أحدث تقنيات التشفير وبروتوكولات الأمان لحماية بياناتك من أي تهديدات محتملة.' 
                   : 'We employ state-of-the-art encryption via Cloudflare and rigorous security protocols to ensure your data remains inviolable.'
                 }
               </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
