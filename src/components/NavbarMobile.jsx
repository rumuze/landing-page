import React from 'react';
import { Menu, X, Sun, Moon, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavbarMobile = ({
  isOpen, setIsOpen, isAr, navLinks, isActive, t,
  languages, i18n, changeLanguage, theme, toggleTheme, navigate
}) => {
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-6 left-4 right-4 z-50 md:hidden">
        <div className="glass-card !rounded-2xl !p-2 flex justify-around items-center shadow-2xl bg-white/90 dark:bg-background/90 border-slate-200 dark:border-white/10 backdrop-blur-xl">
           <Link to={isAr ? '/ar/' : '/'} className={`p-2 rounded-xl flex flex-col items-center gap-1 ${isActive(isAr ? '/ar/' : '/') ? 'text-cyan' : 'text-slate-700 dark:text-gray-400'}`}>
              <div className={`transition-transform active:scale-90 ${isActive(isAr ? '/ar/' : '/') ? 'bg-cyan/10 p-1.5 rounded-lg' : 'p-1.5'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <span className="text-[10px] font-bold">{t('navbar.home')}</span>
           </Link>

           <Link to={isAr ? '/ar/services' : '/services'} className={`p-2 rounded-xl flex flex-col items-center gap-1 ${isActive(isAr ? '/ar/services' : '/services') ? 'text-cyan' : 'text-slate-700 dark:text-gray-400'}`}>
              <div className={`transition-transform active:scale-90 ${isActive(isAr ? '/ar/services' : '/services') ? 'bg-cyan/10 p-1.5 rounded-lg' : 'p-1.5'}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              </div>
              <span className="text-[10px] font-bold">{t('navbar.services')}</span>
           </Link>

           <Link to={isAr ? '/ar/labs' : '/labs'} className={`p-2 rounded-xl flex flex-col items-center gap-1 ${isActive(isAr ? '/ar/labs' : '/labs') ? 'text-cyan' : 'text-slate-700 dark:text-gray-400'}`}>
              <div className={`transition-transform active:scale-90 ${isActive(isAr ? '/ar/labs' : '/labs') ? 'bg-cyan/10 p-1.5 rounded-lg' : 'p-1.5'}`}>
                 <FlaskConical size={20} />
              </div>
              <span className="text-[10px] font-bold">{t('navbar.labs')}</span>
           </Link>

           <a href={isAr ? '/ar/contact' : '/contact'} onClick={(e) => { e.preventDefault(); navigate(isAr ? '/ar/contact' : '/contact'); }} className={`p-2 rounded-xl flex flex-col items-center gap-1 ${isActive(isAr ? '/ar/contact' : '/contact') ? 'text-cyan' : 'text-slate-700 dark:text-gray-400'}`}>
              <div className={`transition-transform active:scale-90 ${isActive(isAr ? '/ar/contact' : '/contact') ? 'bg-cyan/10 p-1.5 rounded-lg' : 'p-1.5'}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <span className="text-[10px] font-bold">{t('navbar.contact', 'Contact')}</span>
           </a>

           <button 
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-xl flex flex-col items-center gap-1 text-slate-700 dark:text-gray-400"
            >
              <div className="transition-transform active:scale-90 p-1.5">
                 <Menu size={20} />
              </div>
              <span className="text-[10px] font-bold">{t('navbar.more', 'More')}</span>
           </button>
        </div>
      </nav>

      {/* Mobile Full Screen Menu Overlay */}
      
        {isOpen && (
          <div
            className="fixed inset-0 z-[60] bg-white/98 dark:bg-background/98 backdrop-blur-xl flex flex-col md:hidden"
          >
            {/* Header */}
            <div className={`p-6 flex justify-between items-center ${isAr ? 'flex-row-reverse' : ''}`}>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 border border-white/10">
                    <picture>
                      <source srcSet="/rumuze-symbol-112.avif" type="image/avif" />
                      <source srcSet="/rumuze-symbol-112.webp" type="image/webp" />
                      <img src="/rumuze-symbol-112.webp" width="28" height="28" alt="Logo" className="w-7 h-7" />
                    </picture>
                  </div>
                  <picture className="h-5">
                    <source srcSet="/rumuze-text.avif" type="image/avif" />
                    <img src="/rumuze-text.png" alt="RUMUZE" className="h-full object-contain dark:invert-0 invert" />
                  </picture>
               </div>
               <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white"
                >
                  <X size={24} />
               </button>
            </div>

            {/* Preferences (Language & Theme) */}
            <div className="px-8 pb-4">
              <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-between">
                {/* Language Toggle */}
                <div className="flex-1 flex gap-1 p-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex-1 relative py-2 rounded-xl text-xs font-bold transition-all ${
                         i18n.language === lang.code ? 'text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-gray-400'
                      }`}
                    >
                      {i18n.language === lang.code && (
                        <div className="absolute inset-0 bg-white dark:bg-white/10 rounded-xl shadow-sm animate-fade-in" />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-1">
                         {lang.flag} {lang.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-slate-200 dark:bg-white/10 mx-2"></div>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-xl bg-white dark:bg-white/10 shadow-sm border border-slate-200 dark:border-white/5 text-slate-800 dark:text-yellow-400"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-6">
              {navLinks.map((link, i) => (
                <div key={link.name} className="animate-fade-right" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "both" }}>
                  <Link 
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-4xl font-black ${
                      isActive(link.href) ? 'text-cyan' : 'text-slate-900 dark:text-white'
                    } ${isAr ? 'text-right' : 'text-left'}`}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-8">
              <button 
                onClick={() => { setIsOpen(false); navigate(isAr ? '/ar/contact' : '/contact'); }}
                className="w-full btn-primary py-4 text-lg shadow-xl shadow-cyan/20"
              >
                {t('navbar.startProject')}
              </button>
            </div>
          </div>
        )}
      
    </>
  );
};

export default NavbarMobile;
