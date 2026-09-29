import { Facebook, Github, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ENTITY } from '../config/entity';
import { SERVICES } from '../config/services';
import { siteCoreConfig } from '../config/siteCoreConfig';
import { writeConsent } from '../utils/consent';

const copyByLocale = {
  en: {
    services: 'Services',
    company: 'Company',
    contactTitle: 'Contact',
    about: 'About',
    work: 'Our work',
    insights: 'Insights',
    tools: 'Tools',
    contact: 'Start a project',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    cookies: 'Analytics preferences',
    linkedin: 'Rumuze on LinkedIn',
    github: 'Rumuze on GitHub',
    facebook: 'Rumuze on Facebook',
    instagram: 'Rumuze on Instagram',
    tiktok: 'Rumuze on TikTok',
  },
  ar: {
    services: 'الخدمات',
    company: 'الشركة',
    contactTitle: 'التواصل',
    about: 'من نحن',
    work: 'أعمالنا',
    insights: 'مقالات',
    tools: 'الأدوات',
    contact: 'ابدأ مشروعك',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الاستخدام',
    cookies: 'تفضيلات الإحصاءات',
    linkedin: 'رموز على LinkedIn',
    github: 'رموز على GitHub',
    facebook: 'رموز على Facebook',
    instagram: 'رموز على Instagram',
    tiktok: 'رموز على TikTok',
  },
};

// lucide-react has no TikTok glyph, so draw it inline.
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 2h-3.2v13.2a2.8 2.8 0 1 1-2.8-2.8c.3 0 .6 0 .8.1V9.2a6 6 0 1 0 5.2 5.9V8.6a7.4 7.4 0 0 0 4.3 1.4V6.8a4.3 4.3 0 0 1-4.3-4.8z" />
  </svg>
);

const linkClass = 'hover:text-cyan dark:hover:text-white transition-colors';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';
  const isRtl = i18n.dir() === 'rtl';
  const c = copyByLocale[lang];
  const prefix = isAr ? '/ar' : '';

  const socialLinks = [
    { key: 'linkedin', href: ENTITY.publicProfiles.linkedIn, label: c.linkedin, icon: <Linkedin size={20} /> },
    { key: 'facebook', href: ENTITY.publicProfiles.facebook, label: c.facebook, icon: <Facebook size={20} /> },
    { key: 'instagram', href: ENTITY.publicProfiles.instagram, label: c.instagram, icon: <Instagram size={20} /> },
    { key: 'tiktok', href: ENTITY.publicProfiles.tiktok, label: c.tiktok, icon: <TikTokIcon /> },
    { key: 'github', href: ENTITY.publicProfiles.github, label: c.github, icon: <Github size={20} /> },
  ].filter((link) => Boolean(link.href));

  return (
    <footer
      className={`surface-section footer-mobile-nav-clearance border-t border-slate-200/80 dark:border-white/10 ${
        isRtl ? 'text-right' : 'text-left'
      }`}
    >
      <div className="content-shell pt-16">
        <div className="mb-14 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className={`mb-5 flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <img src="/rumuze-symbol-112.webp" alt="" width="32" height="32" className="h-8 w-8" />
              <span className="copy-primary text-xl font-black tracking-wide">RUMUZE</span>
            </div>
            <p className="copy-secondary max-w-xs text-sm leading-relaxed">
              {siteCoreConfig.shortDescription[lang]}
            </p>
            {socialLinks.length > 0 ? (
              <div className={`mt-6 flex gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                {socialLinks.map(({ key, href, label, icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="copy-muted transition-colors hover:text-cyan"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <h2 className="copy-primary mb-5 text-xs font-bold uppercase tracking-widest">{c.services}</h2>
            <ul className="copy-secondary space-y-3 text-sm">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link to={`${prefix}/services/${service.slug}`} className={linkClass}>
                    {service.title[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="copy-primary mb-5 text-xs font-bold uppercase tracking-widest">{c.company}</h2>
            <ul className="copy-secondary space-y-3 text-sm">
              <li><Link to={`${prefix}/about`} className={linkClass}>{c.about}</Link></li>
              <li><Link to={`${prefix}/portfolio`} className={linkClass}>{c.work}</Link></li>
              <li><Link to={`${prefix}/blog`} className={linkClass}>{c.insights}</Link></li>
              <li><Link to={`${prefix}/labs`} className={linkClass}>{c.tools}</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="copy-primary mb-5 text-xs font-bold uppercase tracking-widest">{c.contactTitle}</h2>
            <ul className="copy-secondary space-y-3 text-sm">
              <li><Link to={`${prefix}/contact?intent=discovery`} className={linkClass}>{c.contact}</Link></li>
              <li>
                <a href={`mailto:${ENTITY.contact.email}`} className={linkClass} dir="ltr">
                  {ENTITY.contact.email}
                </a>
              </li>
              <li>{ENTITY.contact.location[lang]}</li>
            </ul>
          </div>
        </div>

        <div
          className={`flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 dark:border-white/10 md:flex-row ${
            isRtl ? 'md:flex-row-reverse' : ''
          }`}
        >
          <p className="copy-muted text-xs">{t('footer.rights')}</p>
          <div className={`copy-muted flex gap-8 text-xs ${isRtl ? 'flex-row-reverse' : ''}`}>
            <Link to={`${prefix}/privacy`} className={linkClass}>{c.privacy}</Link>
            <Link to={`${prefix}/terms`} className={linkClass}>{c.terms}</Link>
            <button type="button" onClick={() => writeConsent(null)} className={linkClass}>
              {c.cookies}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
