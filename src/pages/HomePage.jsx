import React, { Suspense, lazy } from 'react';
import SEO from '../seo/SEO';
import { en } from '../content/en';
import { ar } from '../content/ar';
import SchemaInjector from '../schema/SchemaInjector';
import { OrganizationSchema } from '../schema/OrganizationSchema';
import { WebSiteSchema } from '../schema/WebSiteSchema';
import { BreadcrumbSchema } from '../schema/BreadcrumbSchema';
import { FAQSchema } from '../schema/FAQSchema';

// Lazy load components
const Hero = lazy(() => import('../components/Hero'));
const Services = lazy(() => import('../components/Services'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const TechStack = lazy(() => import('../components/TechStack'));
const Contact = lazy(() => import('../components/Contact'));

// Skeleton Loader (reused from App.jsx pattern if needed, or imported)
const Skeleton = () => (
  <div className="min-h-screen bg-white dark:bg-background p-8 space-y-8 animate-pulse">
    <div className="h-20 bg-white/5 rounded-2xl w-full"></div>
    <div className="h-[500px] bg-white/5 rounded-3xl w-full"></div>
    <div className="grid grid-cols-3 gap-8">
        <div className="h-64 bg-white/5 rounded-2xl"></div>
        <div className="h-64 bg-white/5 rounded-2xl"></div>
        <div className="h-64 bg-white/5 rounded-2xl"></div>
    </div>
  </div>
);

const HomePage = ({ isAr = false }) => {
  const path = isAr ? '/ar' : '/';
  const content = isAr ? ar.homepage : en.homepage;
  const locale = isAr ? 'ar' : 'en';

  return (
    <div>
      <SEO
        title={isAr ? 'روموز | نفك شفرة التعقيد' : 'Rumuze | Complexity Decoded'}
        description={
          isAr
            ? 'روموز تبني مواقع ثابتة أولاً ومهيكلة لهيمنة البحث، بواجهات أداء عالية وبيانات منظمة.'
            : 'Rumuze builds static-first, schema-led marketing sites with high-performance frontends and structured data.'
        }
        path={path}
        locale={locale}
      />
      <Suspense fallback={<Skeleton />}>
        <main className={isAr ? 'rtl' : 'ltr'} dir={isAr ? 'rtl' : 'ltr'}>
          <header className="sr-only">
            <h1>{isAr ? 'روموز — هندسة برمجيات وهيكلة معرفة' : 'Rumuze — Software Engineering & Knowledge Graph'}</h1>
          </header>

          <section className="pt-28 md:pt-32 pb-20 bg-slate-50 dark:bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                {isAr ? 'هندسة مؤسسية بمستوى شركات التكنولوجيا الكبرى' : 'Category-Leading Engineering'}
              </h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {isAr
                  ? 'نُهندس منصات تقود قطاعاتها: مخططات منظَّمة، تحسين على الحافة، وتجارب تحويلية تُهيمن على البحث.'
                  : 'Engineered to lead categories: schema-led, edge-optimized, conversion-focused experiences that dominate search.'}
              </p>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
                  <div className="text-3xl font-black text-cyan">99.99%</div>
                  <div className="text-sm font-bold text-slate-600 dark:text-gray-400">
                    {isAr ? 'توافرية الأنظمة' : 'System Uptime'}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
                  <div className="text-3xl font-black text-purple">{"<"}50ms</div>
                  <div className="text-sm font-bold text-slate-600 dark:text-gray-400">
                    {isAr ? 'زمن استجابة واجهات API' : 'API Latency'}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
                  <div className="text-3xl font-black text-slate-900 dark:text-white">120+</div>
                  <div className="text-sm font-bold text-slate-600 dark:text-gray-400">
                    {isAr ? 'مشروعات مُنفّذة' : 'Projects Delivered'}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
                  <div className="text-3xl font-black text-slate-900 dark:text-white">{isAr ? 'عالمي' : 'Global'}</div>
                  <div className="text-sm font-bold text-slate-600 dark:text-gray-400">
                    {isAr ? 'قدرات تسليم' : 'Delivery Capability'}
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {(content.services.slice(0, 4)).map((title) => (
                  <div
                    key={title}
                    className="p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan/40 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      {isAr
                        ? 'تصميم وتنفيذ بمعايير المؤسسة، قابلية توسع، وأمان من الدرجة الأولى.'
                        : 'Enterprise-grade design and implementation with scalability and top-tier security.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <SchemaInjector
            data={[
              OrganizationSchema(locale),
              WebSiteSchema(locale),
              BreadcrumbSchema(path, locale),
              FAQSchema(path, locale, content.faq)
            ]}
          />
        </main>

        {/* Existing sections (optional, lazy) */}
        <Hero />
        <Services />
        <Portfolio />
        <TechStack />
        <Contact />
      </Suspense>
    </div>
  );
};

export default HomePage;
