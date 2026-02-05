import React from 'react';
import { Cpu, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <footer className={`bg-background pt-20 pb-10 border-t border-white/5 ${isRtl ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className={`flex items-center gap-2 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-purple">
                <Cpu className="text-background w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">RUMUZE</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className={`flex gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <a href="#" className="text-gray-500 hover:text-cyan transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-cyan transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-cyan transition-colors"><Github size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-cyan transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">{t('footer.sections.solutions')}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('services.software.items.erp.name')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('services.software.items.mobile.name')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cloud Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('services.software.items.api.name')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">{t('footer.sections.services')}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('services.marketing.items.growth.name')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('services.marketing.items.brand.name')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('services.marketing.items.ads.name')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SEO Optimization</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">{t('footer.sections.company')}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className={`border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <p className="text-gray-500 text-xs text-center md:text-left">
            {t('footer.rights')}
          </p>
          <div className={`flex gap-8 text-gray-500 text-xs ${isRtl ? 'flex-row-reverse' : ''}`}>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
