import { Github, Linkedin, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { siteCoreConfig } from '../config/siteCoreConfig';
import { Link } from 'react-router-dom';
import { ENTITY } from '../config/entity';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const isRtl = i18n.dir() === 'rtl';
  const pathPrefix = isAr ? '/ar' : '';
  const socialLinks = [
    {
      key: 'linkedin',
      href: ENTITY.publicProfiles.linkedIn,
      label: 'Connect with us on LinkedIn',
      icon: <Linkedin size={20} />,
    },
    {
      key: 'github',
      href: ENTITY.publicProfiles.github,
      label: 'View our GitHub projects',
      icon: <Github size={20} />,
    },
    {
      key: 'website',
      href: ENTITY.publicProfiles.website,
      label: 'Visit the Rumuze website',
      icon: <Globe size={20} />,
    },
  ].filter((link) => Boolean(link.href));

  return (
    <footer className={`surface-section footer-mobile-nav-clearance border-t border-slate-200/80 shadow-[0_-10px_40px_-15px_rgba(15,23,42,0.04)] dark:border-white/10 ${isRtl ? 'text-right' : 'text-left'}`}>
      <div className="content-shell pt-20">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className={`flex items-center gap-2 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-purple overflow-hidden">
                <img src="/rumuze.svg" alt="Rumuze Logo" className="w-5 h-5 z-10" />
              </div>
              <span className="copy-primary text-xl font-black">RUMUZE</span>
            </div>
            <p className="copy-secondary text-sm leading-relaxed mb-2">
              {t('footer.tagline')}
            </p>
            <p className="copy-muted text-xs leading-relaxed mb-6">
              {siteCoreConfig.shortDescription[isAr ? 'ar' : 'en']}
            </p>
            {socialLinks.length > 0 ? (
              <div className={`flex gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                {socialLinks.map(({ key, href, label, icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="copy-muted hover:text-cyan transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <h4 className="copy-primary font-bold mb-6 uppercase tracking-widest text-xs">{t('footer.sections.solutions')}</h4>
            <ul className="space-y-4 text-sm copy-secondary">
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('services.software.items.erp.name')}</Link></li>
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('services.software.items.mobile.name')}</Link></li>
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.cloud')}</Link></li>
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('services.software.items.api.name')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="copy-primary font-bold mb-6 uppercase tracking-widest text-xs">{t('footer.sections.services')}</h4>
            <ul className="space-y-4 text-sm copy-secondary">
              <li><Link to={`${pathPrefix}/portfolio`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('navbar.portfolio')}</Link></li>
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('services.marketing.items.brand.name')}</Link></li>
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('services.marketing.items.ads.name')}</Link></li>
              <li><Link to={`${pathPrefix}/services`} className="hover:text-cyan dark:hover:text-white transition-colors">SEO</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="copy-primary font-bold mb-6 uppercase tracking-widest text-xs">{t('footer.sections.company')}</h4>
            <ul className="space-y-4 text-sm copy-secondary">
              <li><Link to={`${pathPrefix}/about`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.about')}</Link></li>
              <li><Link to={`${pathPrefix}/blog`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.cases')}</Link></li>
              <li><Link to={`${pathPrefix}/blog`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.careers')}</Link></li>
              <li><Link to={`${pathPrefix}/contact?intent=discovery`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="copy-primary font-bold mb-6 uppercase tracking-widest text-xs">{isAr ? 'أدوات المطور' : 'Developer Tools'}</h4>
            <ul className="space-y-4 text-sm copy-secondary">
              <li><Link to={`${pathPrefix}/qr-generator`} className="hover:text-cyan dark:hover:text-white transition-colors">{isAr ? 'مولد رمز QR' : 'QR Code Generator'}</Link></li>
            </ul>
          </div>
        </div>

        <div className={`border-t border-slate-200/80 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <p className="copy-muted text-xs text-center md:text-left">
            {t('footer.rights')}
          </p>
          <div className={`flex gap-8 copy-muted text-xs ${isRtl ? 'flex-row-reverse' : ''}`}>
            <Link to={`${pathPrefix}/privacy`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.privacy')}</Link>
            <Link to={`${pathPrefix}/terms`} className="hover:text-cyan dark:hover:text-white transition-colors">{t('footer.sections.links.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
