import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const ManifestoPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const content = {
    en: {
      title: "The Rumuze Doctrine",
      subtitle: "Complexity Decoded. Potential Unleashed.",
      sections: [
        {
          heading: "1. Value ≠ Time",
          text: "We reject the billable hour. It subsidizes inefficiency. We sell outcomes, architectures, and market dominance. Our value is measured in impact, not minutes."
        },
        {
          heading: "2. The Code is a Liability",
          text: "Every line of code is a future bug. Code is debt. We minimize surface area. We engineer systems that do more with less. Minimum Viable Code for Maximum Viable Product."
        },
        {
          heading: "3. AI is not a Feature",
          text: "It is the substrate. We don't 'add' AI to applications; we build applications that assume AI is the operating system of the future. Deterministic logic for control; probabilistic logic for scale."
        },
        {
          heading: "4. Digital Sovereignty",
          text: "You must own your data, your algorithms, and your destiny. We build platforms that free you from vendor lock-in and platform dependencies."
        }
      ]
    },
    ar: {
      title: "عقيدة روموز",
      subtitle: "فك شفرة التعقيد.. إطلاق العنان للمستقبل",
      sections: [
        {
          heading: "1. القيمة ≠ الوقت",
          text: "نرفض الساعة مدفوعة الأجر. إنها تشجع عدم الكفاءة. نحن نبيع النتائج، الهندسة المعمارية، والهيمنة على السوق. قيمتنا تقاس بالأثر، لا بالدقيقة."
        },
        {
          heading: "2. الكود هو عبء",
          text: "كل سطر كود هو خطأ مستقبلي محتمل. نحن لا نكتب الكود لمجرد الكتابة. نهندس أنظمة تفعل الكثير بالقليل. الحد الأدنى من الكود لأقصى منتج قابل للحياة."
        },
        {
          heading: "3. الذكاء الاصطناعي ليس ميزة إضافية",
          text: "إنه الأساس. نحن لا 'نضيف' الذكاء الاصطناعي للتطبيقات؛ نبني تطبيقات تفترض أن الذكاء الاصطناعي هو نظام تشغيل المستقبل. منطق حتمي للتحكم؛ ومنطق احتمالي للتوسع."
        },
        {
          heading: "4. السيادة الرقمية",
          text: "يجب أن تمتلك بياناتك، خوارزمياتك، ومصيرك. نبني منصات تحررك من قيود البائعين واعتماديات المنصات."
        }
      ]
    }
  };

  const currentContent = isAr ? content.ar : content.en;

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <SEO 
        path={isAr ? '/ar/manifesto' : '/manifesto'}
        overrideMeta={{
            title: currentContent.title,
            description: currentContent.subtitle,
            type: 'article'
        }} 
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-20"
        >
            <h1 className="text-6xl md:text-8xl font-black mb-8 text-slate-900 dark:text-white tracking-tighter uppercase relative z-10">
                {isAr ? 'العقيدة' : 'MANIFESTO'}
            </h1>
            <p className="text-2xl md:text-3xl text-cyan font-bold tracking-wide">
                {currentContent.subtitle}
            </p>
        </motion.div>

        <div className="space-y-16">
            {currentContent.sections.map((section, index) => (
                <motion.section 
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group border-l-4 border-slate-200 dark:border-white/10 pl-8 hover:border-cyan transition-colors"
                >
                    <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white group-hover:text-cyan transition-colors">
                        {section.heading}
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-400 leading-relaxed font-light">
                        {section.text}
                    </p>
                </motion.section>
            ))}
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24 text-center border-t border-slate-200 dark:border-white/10 pt-10"
        >
            <p className="text-lg text-slate-500 font-mono">
                {isAr ? 'توقيع: مهندسو روموز' : 'SIGNED: THE ARCHITECTS OF RUMUZE'}
            </p>
        </motion.div>

      </div>
    </div>
  );
};

export default ManifestoPage;
