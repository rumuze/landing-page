import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { Sparkles, Download, Palette, Zap, ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import QrGenerator from '../components/qr/QrGenerator';

/* ── FAQ Accordion Item ─────────────────────────────────── */
const FaqItem = ({ q, a, isOpen, onToggle }) => (
  <div className="border-b border-slate-200 dark:border-white/5">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 text-left group"
      aria-expanded={isOpen}
    >
      <span className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-cyan transition-colors">
        {q}
      </span>
      <ChevronDown
        size={20}
        className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-5' : 'max-h-0'}`}
    >
      <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{a}</p>
    </div>
  </div>
);

/* ── Content (bilingual) ────────────────────────────────── */
const CONTENT = {
  en: {
    heroTitle: 'QR Code Generator',
    heroHighlight: 'with Logo',
    heroSubtitle: 'Create branded QR codes with your logo and custom colors.',
    heroDesc:
      'Generate high-quality QR codes with an embedded logo, custom color palette, and instant PNG download — completely free.',
    features: [
      { icon: Sparkles, title: 'Custom Branded QR Codes', desc: 'Embed your logo at the center for instant brand recognition.' },
      { icon: Download, title: 'High Resolution Download', desc: 'Export crisp PNG files ready for print and digital use.' },
      { icon: Zap, title: 'Fast Generation', desc: 'Instant QR rendering — no server processing, runs client-side.' },
      { icon: Palette, title: 'Free Developer Tool', desc: 'Unlimited generations, no sign-up, no watermarks.' },
    ],
    faq: [
      {
        q: 'What is a QR code with logo?',
        a: 'A QR code with a logo is a standard QR code that has a custom image (such as a brand logo) embedded in the center. The logo replaces part of the QR data area while maintaining error correction so scanners can still read it.',
      },
      {
        q: 'How can I download a QR code?',
        a: 'After generating your QR code, click the "Download PNG" button below the preview. The QR code will be saved as a high-resolution PNG image ready for print or digital use.',
      },
      {
        q: 'Is this QR code generator free?',
        a: 'Yes, this QR code generator is completely free with no usage limits, no sign-up required, and no watermarks. It runs entirely in your browser — your data never leaves your device.',
      },
    ],
    ctaTitle: 'Need Custom Software?',
    ctaDesc: 'Explore our full range of enterprise engineering services.',
    ctaBtn: 'View Services',
  },
  ar: {
    heroTitle: 'مولد رمز QR',
    heroHighlight: 'مع الشعار',
    heroSubtitle: 'أنشئ رموز QR مميزة بشعارك وألوانك المخصصة.',
    heroDesc:
      'أنشئ رموز QR عالية الجودة مع شعار مدمج ولوحة ألوان مخصصة وتحميل فوري بصيغة PNG — مجاناً بالكامل.',
    features: [
      { icon: Sparkles, title: 'رموز QR مخصصة بالعلامة التجارية', desc: 'أدمج شعارك في المنتصف للتعرف الفوري على العلامة.' },
      { icon: Download, title: 'تحميل عالي الدقة', desc: 'صدّر ملفات PNG واضحة جاهزة للطباعة والاستخدام الرقمي.' },
      { icon: Zap, title: 'إنشاء فوري', desc: 'عرض QR لحظي — بدون معالجة خادم، يعمل محلياً في المتصفح.' },
      { icon: Palette, title: 'أداة مطور مجانية', desc: 'إنشاء غير محدود، بدون تسجيل، بدون علامات مائية.' },
    ],
    faq: [
      {
        q: 'ما هو رمز QR مع شعار؟',
        a: 'رمز QR مع شعار هو رمز QR قياسي يحتوي على صورة مخصصة (مثل شعار العلامة التجارية) مدمجة في المنتصف. يستبدل الشعار جزءاً من منطقة بيانات QR مع الحفاظ على تصحيح الأخطاء ليتمكن الماسح من قراءته.',
      },
      {
        q: 'كيف يمكنني تحميل رمز QR؟',
        a: 'بعد إنشاء رمز QR، انقر على زر "تحميل PNG" أسفل المعاينة. سيتم حفظ رمز QR كصورة PNG عالية الدقة جاهزة للطباعة أو الاستخدام الرقمي.',
      },
      {
        q: 'هل مولد رمز QR هذا مجاني؟',
        a: 'نعم، مولد رمز QR هذا مجاني تماماً بدون حدود استخدام، ولا يتطلب تسجيل، وبدون علامات مائية. يعمل بالكامل في متصفحك — بياناتك لا تغادر جهازك أبداً.',
      },
    ],
    ctaTitle: 'تحتاج برمجيات مخصصة؟',
    ctaDesc: 'استكشف مجموعتنا الكاملة من خدمات الهندسة المؤسسية.',
    ctaBtn: 'عرض الخدمات',
  },
};

/* ── JSON-LD SoftwareApplication Schema ─────────────────── */
const buildSoftwareAppSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Rumuze QR Code Generator',
  description:
    'Generate high-quality QR codes with embedded logos, custom colors, and instant PNG download. A free developer tool by Mohamed Ashraf.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: {
    '@type': 'Person',
    name: 'Mohamed Ashraf',
    url: 'https://www.rumuze.com',
  },
});

/* ── Page Component ─────────────────────────────────────── */
const QrGeneratorPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const c = isAr ? CONTENT.ar : CONTENT.en;
  const pathPrefix = isAr ? '/ar' : '';
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="surface-page tech-grid min-h-screen pt-28 pb-20 bg-slate-50 dark:bg-background">
      <SEO
        path={`${pathPrefix}/qr-generator`}
        schemas={[buildSoftwareAppSchema()]}
      />

      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <Motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-4"
        >
          {c.heroTitle}{' '}
          <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
            {c.heroHighlight}
          </span>
        </Motion.h1>

        <Motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="text-xl md:text-2xl text-slate-600 dark:text-gray-400 mb-3 font-medium"
        >
          {c.heroSubtitle}
        </Motion.p>

        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="text-base text-slate-500 dark:text-gray-500 max-w-2xl mx-auto"
        >
          {c.heroDesc}
        </Motion.p>
      </section>

      {/* ── Generator Card ── */}
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto px-4"
      >
        <div className="bg-white dark:bg-white/[0.03] rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none p-6 sm:p-10">
          <QrGenerator isAr={isAr} />
        </div>
      </Motion.div>

      {/* ── Features Grid ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-white dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/5 p-6 hover:border-cyan/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan/10 to-purple/10 flex items-center justify-center mb-4 group-hover:from-cyan/20 group-hover:to-purple/20 transition-colors">
                  <Icon size={20} className="text-cyan" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">{f.desc}</p>
              </Motion.div>
            );
          })}
        </div>
      </section>

      {/* ── FAQ (AEO) ── */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-8 text-center">
          {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        </h2>
        <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/5 px-6">
          {c.faq.map((item, i) => (
            <FaqItem
              key={i}
              q={item.q}
              a={item.a}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-light to-primary rounded-3xl p-10 sm:p-14 border border-white/5"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{c.ctaTitle}</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto">{c.ctaDesc}</p>
          <Link
            to={`${pathPrefix}/services`}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan to-purple text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {c.ctaBtn}
          </Link>
        </Motion.div>
      </section>
    </div>
  );
};

export default QrGeneratorPage;
