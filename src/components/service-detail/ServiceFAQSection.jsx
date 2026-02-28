import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ServiceFAQSection = ({ service, isAr, masterFAQs = [] }) => {
  // Combine per-service FAQs and related master FAQs
  const serviceFAQs = service.faqs || [];
  const allFAQs = [
    ...serviceFAQs,
    ...masterFAQs.map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
  ];

  if (allFAQs.length === 0) return null;

  const title = isAr ? service.title.ar : service.title.en;

  return (
    <section
      className="py-20"
      aria-labelledby="service-faq-title"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <Motion.h2
          id="service-faq-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12"
        >
          {isAr
            ? `أسئلة شائعة حول ${title}`
            : `Frequently Asked Questions about ${title}`
          }
        </Motion.h2>

        <div className="space-y-4">
          {allFAQs.map((faq, index) => (
            <FAQAccordionItem
              key={index}
              question={isAr ? faq.question.ar : faq.question.en}
              answer={isAr ? faq.answer.ar : faq.answer.en}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQAccordionItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 overflow-hidden"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
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
            <div className="px-6 pb-6 text-slate-600 dark:text-gray-400 leading-relaxed" itemProp="text">
              {answer}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.div>
  );
};

export default ServiceFAQSection;
