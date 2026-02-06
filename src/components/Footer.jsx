import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const isRtl = i18n.dir() === 'rtl';
  const pathPrefix = isAr ? '/ar' : '';

  return (
    <footer className={`bg-white dark:bg-background pt-20 pb-10 border-t border-slate-200 dark:border-white/5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.03)] ${isRtl ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className={`flex items-center gap-2 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-purple overflow-hidden">
                <img src="/rumuze.svg" alt="Rumuze Logo" className="w-5 h-5 z-10" />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">RUMUZE</span>
            </div>
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className={`flex gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <a href="https://twitter.com/rumuze" aria-label="Follow us on Twitter" className="text-slate-200 hover:text-cyan transition-colors"><Twitter size={20} /></a>
              <a href="https://linkedin.com/company/rumuze" aria-label="Connect with us on LinkedIn" className="text-slate-200 hover:text-cyan transition-colors"><Linkedin size={20} /></a>
              <a href="https://github.com/rumuze" aria-label="View our GitHub projects" className="text-slate-200 hover:text-cyan transition-colors"><Github size={20} /></a>
              <a href="https://instagram.com/rumuze" aria-label="Follow us on Instagram" className="text-slate-200 hover:text-cyan transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">{t('footer.sections.solutions')}</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-gray-400">
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('services.software.items.erp.name')}</Link></li>
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('services.software.items.mobile.name')}</Link></li>
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.cloud')}</Link></li>
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('services.software.items.api.name')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">{t('footer.sections.services')}</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-gray-400">
              <li><Link to={`${pathPrefix}/portfolio`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('navbar.portfolio')}</Link></li>
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('services.marketing.items.brand.name')}</Link></li>
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('services.marketing.items.ads.name')}</Link></li>
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">SEO</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">{t('footer.sections.company')}</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-gray-400">
              <li><Link to={`${pathPrefix}/about`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.about')}</Link></li>
              <li><Link to={`${pathPrefix}/blog`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.cases')}</Link></li>
              <li><Link to={`${pathPrefix}/blog`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.careers')}</Link></li>
              <li><Link to={`${pathPrefix}/#contact`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.contact')}</Link></li>
            </ul>
          </div>
        </div>

        <div className={`border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <p className="text-slate-700 text-xs text-center md:text-left">
            {t('footer.rights')}
          </p>
          <div className={`flex gap-8 text-slate-700 text-xs ${isRtl ? 'flex-row-reverse' : ''}`}>
            <Link to={`${pathPrefix}/privacy`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.privacy')}</Link>
            <Link to={`${pathPrefix}/terms`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
