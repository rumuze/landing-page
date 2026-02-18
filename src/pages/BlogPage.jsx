import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import { ArticleSkeleton } from '../components/SkeletonLoader';

// Defensive import: Fallback to empty array if blog data is unavailable
let getAllPosts = () => [];
try {
  const blogData = await import('../data/blogPosts');
  getAllPosts = blogData.getAllPosts || (() => []);
} catch {
  console.warn('[BlogPage] Blog data unavailable, falling back to empty posts.');
}

const BlogPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch posts from centralized data
  const rawPosts = getAllPosts();
  
  // Map internal data structure to UI component expectation
  const posts = rawPosts.map(post => {
      const content = isAr ? post.ar : post.en;
      return {
          id: post.id,
          title: content.title,
          category: post.category,
          date: post.date,
          author: post.author,
          readTime: post.readTime.toString(),
          image: post.image,
          slug: post.slug // Add slug for linking
      };
  });

  return (
    <div className="pt-32 pb-20">
      <SEO path={isAr ? '/ar/blog' : '/blog'} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </Motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
             <>
               <ArticleSkeleton />
               <ArticleSkeleton />
               <ArticleSkeleton />
             </>
          ) : (
            posts.map((post, index) => (
            <Link 
              key={post.id} 
              to={isAr ? `/ar/blog/${post.slug}` : `/blog/${post.slug}`}
              className="block h-full group"
            >
            <Motion.article 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-cyan/10 transition-all duration-500 flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="w-full h-full group-hover:scale-110 transition-transform duration-700">
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6">
                  <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-black uppercase tracking-widest text-cyan shadow-lg">
                    {t(`blog.categories.${post.category}`)}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-slate-700 dark:text-gray-400 mb-6 font-bold">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{post.readTime} {t('blog.readTime')}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white group-hover:text-cyan transition-colors leading-tight">
                  {post.title}
                </h3>

                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center text-[10px] font-black text-cyan">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-gray-300">{post.author}</span>
                  </div>
                  <ArrowRight size={20} className="text-slate-200 group-hover:text-cyan group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-all" />
                </div>
              </div>
            </Motion.article>
            </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
