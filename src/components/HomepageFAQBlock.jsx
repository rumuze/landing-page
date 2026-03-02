import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ChevronDown } from 'lucide-react';
import { getHomepageFAQs } from '../config/faq';

const HomepageFAQBlock = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';
  const faqs = getHomepageFAQs();

  return (
    <>


      <section
        className="py-24 bg-slate-50/50 dark:bg-white/[0.01]"
        aria-labelledby="homepage-faq-title"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2
              id="homepage-faq-title"
              className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4"
            >
              {isAr
                ? 'أسئلة شائعة حول روموز'
                : 'Frequently Asked Questions about Rumuze'
              }
            </h2>
            <p className="text-lg text-slate-500 dark:text-gray-400 max-w-xl mx-auto">
              {isAr
                ? 'إجابات واضحة ومباشرة على أكثر الأسئلة شيوعاً.'
                : 'Clear, direct answers to the most common questions.'
              }
            </p>
          </Motion.div>

          <div className="space-y-4" role="list">
            {faqs.map((faq, idx) => (
              <FAQAccordionItem
                key={faq.id}
                question={faq.question[lang]}
                answer={faq.answer[lang]}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const FAQAccordionItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0); // First FAQ open by default

  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 overflow-hidden"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
      role="listitem"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left"
        aria-expanded={isOpen}
      >
        <h3
          className="text-base md:text-lg font-semibold text-slate-900 dark:text-white pe-4"
          itemProp="name"
        >
          {question}
        </h3>
        <ChevronDown
          size={20}
          className={`shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <div className="px-6 pb-6 text-slate-600 dark:text-gray-400 leading-relaxed text-sm" itemProp="text">
              {answer}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.div>
  );
};

export default HomepageFAQBlock;
