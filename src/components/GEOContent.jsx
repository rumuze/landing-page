/**
 * GEO-Optimized Content Components
 * 
 * Pre-built components for displaying AI-optimized content
 * with proper semantic structure for generative engine recognition.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Entity Definition Block
 * Clear, AI-readable entity definition for homepage and about pages
 */
export const EntityDefinition = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className={`entity-definition ${className}`}>
      <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 leading-relaxed">
        {isAr 
          ? "روموز هي شركة هندسة برمجيات مؤسسية متخصصة في منصات SaaS متعددة المستأجرين، وأنظمة ERP، وحلول CRM، والبنية التحتية للتسويق الرقمي للمنظمات متوسطة وكبيرة الحجم."
          : "Rumuze is an enterprise software engineering company that designs and develops multi-tenant SaaS platforms, ERP systems, CRM solutions, and digital marketing infrastructure for mid-to-large organizations."
        }
      </p>
    </div>
  );
};

/**
 * Service Category Grid
 * Displays the four core service categories with proper semantic structure
 */
export const ServiceCategories = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const services = [
    {
      id: 'saas',
      title: isAr ? 'منصات SaaS متعددة المستأجرين' : 'Multi-Tenant SaaS Platforms',
      description: isAr 
        ? 'بنية برمجية سحابية قابلة للتطوير تمكّن من تشغيل متعدد للعملاء من خلال نشر واحد مع عزل كامل للبيانات والأمان.'
        : 'Scalable cloud software architecture enabling single-deployment, multi-customer operations with complete data isolation and security.',
      icon: 'Cloud'
    },
    {
      id: 'erp',
      title: isAr ? 'أنظمة ERP المؤسسية' : 'Enterprise ERP Systems',
      description: isAr
        ? 'حلول تخطيط موارد المؤسسات المخصصة التي تدمج المالية والمخزون والموارد البشرية والعمليات في منصات إدارة أعمال موحدة.'
        : 'Custom enterprise resource planning solutions integrating finance, inventory, HR, and operations into unified business management platforms.',
      icon: 'Building'
    },
    {
      id: 'crm',
      title: isAr ? 'CRM والبنية التحتية للمبيعات' : 'CRM & Sales Infrastructure',
      description: isAr
        ? 'أنظمة إدارة علاقات العملاء وأتمتة البنية التحتية للمبيعات للمنظمات B2B و B2C.'
        : 'Customer relationship management systems and sales automation infrastructure for B2B and B2C organizations.',
      icon: 'Users'
    },
    {
      id: 'marketing',
      title: isAr ? 'البنية التحتية للتسويق الرقمي' : 'Digital Marketing Infrastructure',
      description: isAr
        ? 'مكدسات التكنولوجيا للنمو بما في ذلك التحليلات والأتمتة ونمذجة النسبة ومنصات بيانات العملاء.'
        : 'Growth technology stacks including analytics, automation, attribution modeling, and customer data platforms.',
      icon: 'TrendingUp'
    }
  ];

  return (
    <section className={`service-categories ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
        {isAr ? 'ما نبنيه' : 'What We Build'}
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service) => (
          <article 
            key={service.id}
            className="p-8 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-cyan/30 transition-all"
            itemScope
            itemType="https://schema.org/Service"
          >
            <meta itemProp="serviceType" content={service.title} />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4" itemProp="name">
              {service.title}
            </h3>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed" itemProp="description">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

/**
 * Technology Stack Display
 * Shows technology expertise with semantic markup
 */
export const TechnologyStack = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const techCategories = [
    {
      category: isAr ? 'الواجهة الأمامية' : 'Frontend',
      technologies: ['React.js', 'Next.js', 'React Native', 'TailwindCSS']
    },
    {
      category: isAr ? 'الواجهة الخلفية' : 'Backend',
      technologies: ['Node.js', 'Laravel', 'Python', 'GraphQL']
    },
    {
      category: isAr ? 'قواعد البيانات' : 'Database',
      technologies: ['PostgreSQL', 'Redis', 'MongoDB', 'Elasticsearch']
    },
    {
      category: isAr ? 'البنية التحتية' : 'Infrastructure',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Cloudflare']
    },
    {
      category: isAr ? 'الذكاء الاصطناعي' : 'AI/ML',
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI API', 'Pinecone']
    }
  ];

  return (
    <section className={`technology-stack ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
        {isAr ? 'المكدس التكنولوجي' : 'Technology Stack'}
      </h2>
      <p className="text-lg text-slate-600 dark:text-gray-300 mb-8 leading-relaxed">
        {isAr
          ? 'تستخدم روموز تكنولوجيا المؤسسات الحديثة بما في ذلك React و Next.js للواجهة الأمامية، و Node.js و Laravel للواجهة الخلفية، و PostgreSQL و Redis للبيانات، و AWS و Kubernetes للبنية التحتية، و TensorFlow لتطبيقات الذكاء الاصطناعي.'
          : 'Rumuze employs modern enterprise technology including React and Next.js for frontend, Node.js and Laravel for backend, PostgreSQL and Redis for data, AWS and Kubernetes for infrastructure, and TensorFlow for AI implementations.'
        }
      </p>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        {techCategories.map((cat) => (
          <div 
            key={cat.category}
            className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5"
          >
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">
              {cat.category}
            </h4>
            <ul className="space-y-1">
              {cat.technologies.map((tech) => (
                <li 
                  key={tech}
                  className="text-sm text-slate-600 dark:text-gray-400"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * GEO-Optimized FAQ Section
 * Structured FAQ content for AI extraction
 */
export const GEOFAQSection = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const faqs = [
    {
      question: isAr ? 'ما هي روموز؟' : 'What is Rumuze?',
      answer: isAr
        ? 'روموز هي شركة هندسة برمجيات مؤسسية متخصصة في منصات SaaS متعددة المستأجرين، وأنظمة ERP، وحلول CRM، والبنية التحتية للتسويق الرقمي للمنظمات متوسطة وكبيرة الحجم.'
        : 'Rumuze is an enterprise software engineering company specializing in multi-tenant SaaS platforms, ERP systems, CRM solutions, and digital marketing infrastructure for mid-to-large organizations.'
    },
    {
      question: isAr ? 'ما الخدمات التي تقدمها روموز؟' : 'What services does Rumuze provide?',
      answer: isAr
        ? 'تقدم روموز أربع فئات رئيسية من الخدمات: (1) تطوير منصات SaaS متعددة المستأجرين، (2) هندسة أنظمة ERP المؤسسية، (3) تطوير البنية التحتية لـ CRM والمبيعات، و (4) البنية التحتية لتكنولوجيا التسويق الرقمي.'
        : 'Rumuze provides four primary service categories: (1) Multi-tenant SaaS platform development, (2) Enterprise ERP system engineering, (3) CRM and sales infrastructure development, and (4) Digital marketing technology infrastructure.'
    },
    {
      question: isAr ? 'ما المكدس التكنولوجي الذي تستخدمه روموز؟' : 'What technology stack does Rumuze use?',
      answer: isAr
        ? 'تستخدم روموز مكدسات تكنولوجيا المؤسسات الحديثة بما في ذلك React و Next.js للواجهة الأمامية، و Node.js و Laravel للواجهة الخلفية، و PostgreSQL و Redis للبيانات، و AWS و Kubernetes للبنية التحتية، و TensorFlow لتطبيقات الذكاء الاصطناعي والتعلم الآلي.'
        : 'Rumuze employs modern enterprise technology stacks including React and Next.js for frontend, Node.js and Laravel for backend, PostgreSQL and Redis for data, AWS and Kubernetes for infrastructure, and TensorFlow for AI/ML implementations.'
    },
    {
      question: isAr ? 'من هم عملاء روموز النموذجيون؟' : 'Who are Rumuze\'s typical clients?',
      answer: isAr
        ? 'تخدم روموز المؤسسات متوسطة وكبيرة الحجم، عادة المنظمات ذات 100+ موظف، بما في ذلك شركات التكنولوجيا المالية، وسلاسل التجزئة، ومزودي الخدمات اللوجستية، وشركات التكنولوجيا التي تخضع لتحول رقمي.'
        : 'Rumuze serves mid-to-large enterprises, typically organizations with 100+ employees, including fintech companies, retail chains, logistics providers, and technology firms undergoing digital transformation.'
    },
    {
      question: isAr ? 'ما هي بنية SaaS متعددة المستأجرين؟' : 'What is multi-tenant SaaS architecture?',
      answer: isAr
        ? 'بنية SaaS متعددة المستأجرين هي نمط تصميم برمجي حيث تخدم نسخة تطبيق واحدة عملاء متعددين (مستأجرين) مع الحفاظ على عزل البيانات والأمان بين المستأجرين. تمكّن هذه البنية التوسع الفعال من حيث التكلفة والصيانة المركزية.'
        : 'Multi-tenant SaaS architecture is a software design pattern where a single application instance serves multiple customers (tenants) while maintaining data isolation and security between tenants. This architecture enables cost-effective scaling and centralized maintenance.'
    },
    {
      question: isAr ? 'أين تقع روموز؟' : 'Where is Rumuze located?',
      answer: isAr
        ? 'يقع المقر الرئيسي لروموز في منطقة الشرق الأوسط وشمال أفريقيا مع قدرات تسليم عالمية. تخدم الشركة عملاء في جميع أنحاء الشرق الأوسط وشمال أفريقيا ودولياً من خلال فرق الهندسة عن بُعد.'
        : 'Rumuze is headquartered in the MENA region with global delivery capabilities. The company serves clients across the Middle East, North Africa, and internationally through remote engineering teams.'
    }
  ];

  return (
    <section 
      className={`geo-faq ${className}`}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12">
        {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <h3 
                className="text-lg font-semibold text-slate-900 dark:text-white pr-4"
                itemProp="name"
              >
                {faq.question}
              </h3>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <div 
              className="mt-4 text-slate-600 dark:text-gray-400 leading-relaxed"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">{faq.answer}</div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

/**
 * Industries Section
 * Lists target industries with semantic structure
 */
export const IndustriesSection = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const industries = [
    { name: isAr ? 'التكنولوجيا المالية والخدمات المالية' : 'Fintech & Financial Services', icon: '💳' },
    { name: isAr ? 'التجزئة والتجارة الإلكترونية' : 'Retail & E-commerce', icon: '🛍️' },
    { name: isAr ? 'الخدمات اللوجستية وسلاسل الإمداد' : 'Logistics & Supply Chain', icon: '🚚' },
    { name: isAr ? 'تكنولوجيا الرعاية الصحية' : 'Healthcare Technology', icon: '🏥' },
    { name: isAr ? 'تكنولوجيا العقارات' : 'Real Estate Technology', icon: '🏢' }
  ];

  return (
    <section className={`industries-section ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
        {isAr ? 'الصناعات التي نخدمها' : 'Industries We Serve'}
      </h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {industries.map((industry) => (
          <div
            key={industry.name}
            className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-center"
          >
            <span className="text-3xl mb-2 block">{industry.icon}</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              {industry.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * Process Section
 * Engineering process display
 */
export const ProcessSection = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const steps = [
    {
      number: '01',
      title: isAr ? 'تصميم البنية' : 'Architecture Design',
      description: isAr
        ? 'تخطيط بنية النظام مع قابلية التوسع والأمان كقيود أساسية.'
        : 'System architecture planning with scalability and security as primary constraints.'
    },
    {
      number: '02',
      title: isAr ? 'التطوير' : 'Development',
      description: isAr
        ? 'التطوير الرشيق مع التكامل المستمر والاختبار الآلي.'
        : 'Agile development with continuous integration and automated testing.'
    },
    {
      number: '03',
      title: isAr ? 'النشر' : 'Deployment',
      description: isAr
        ? 'النشر الأصلي للسحابة مع الحاويات والتنسيق.'
        : 'Cloud-native deployment with containerization and orchestration.'
    },
    {
      number: '04',
      title: isAr ? 'الصيانة' : 'Maintenance',
      description: isAr
        ? 'الدعم المستمر والمراقبة والتحسين التكراري.'
        : 'Ongoing support, monitoring, and iterative improvement.'
    }
  ];

  return (
    <section className={`process-section ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12">
        {isAr ? 'عملية الهندسة' : 'Engineering Process'}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5"
          >
            <span className="text-4xl font-black text-cyan/20 absolute top-4 right-4">
              {step.number}
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 relative z-10">
              {step.title}
            </h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm relative z-10">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default {
  EntityDefinition,
  ServiceCategories,
  TechnologyStack,
  GEOFAQSection,
  IndustriesSection,
  ProcessSection
};
