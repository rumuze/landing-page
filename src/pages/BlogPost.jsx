import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
 
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from 'lucide-react';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import { getPostBySlug } from '../data/blogPosts';
import ShareButton from '../components/ShareButton';

const BlogPost = () => {
    const { slug } = useParams();
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';
    const post = getPostBySlug(slug);

    const content = isAr ? post.ar : (post?.en || {});

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Redirect to 404 if post not found
    if (!post) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="pt-32 pb-20 min-h-screen">
            <SEO 
                path={isAr ? `/ar/blog/${slug}` : `/blog/${slug}`} 
                overrideMeta={{
                    title: content.title,
                    description: content.excerpt,
                    image: post.image,
                    type: 'article',
                    author: post.author,
                    publishedTime: post.date
                }}
            />

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <div 
                    className="mb-8"
                >
                    <Link 
                        to={isAr ? "/ar/blog" : "/blog"}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan transition-colors"
                    >
                        {isAr ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                        <span>{isAr ? 'العودة للمدونة' : 'Back to Blog'}</span>
                    </Link>
                </div>

                {/* Header */}
                <header className="mb-12 text-center">
                    <div>
                        <span className="inline-block px-4 py-1 mb-6 rounded-full bg-cyan/10 text-cyan text-sm font-bold uppercase tracking-wider">
                            {t(`blog.categories.${post.category}`)}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-slate-900 dark:text-white leading-tight">
                            {content.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 dark:text-gray-400 font-medium">
                            <div className="flex items-center gap-2">
                                <User size={18} className="text-cyan" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-cyan" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-cyan" />
                                <span>{post.readTime} {t('blog.readTime')}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Image */}
                <div 
                    className="mb-16 rounded-3xl overflow-hidden shadow-2xl relative aspect-video"
                >
                    <OptimizedImage
                        src={post.image}
                        alt={content.title}
                        priority={true}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div 
                    className="prose prose-lg dark:prose-invert max-w-none 
                        prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
                        prose-p:text-slate-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                        prose-a:text-cyan hover:prose-a:text-purple prose-a:transition-colors
                        prose-blockquote:border-l-4 prose-blockquote:border-cyan prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-white/5 prose-blockquote:px-8 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:italic
                        prose-strong:text-slate-900 dark:prose-strong:text-white
                        rtl:prose-blockquote:border-l-0 rtl:prose-blockquote:border-r-4 rtl:prose-blockquote:rounded-l-lg rtl:prose-blockquote:rounded-r-none"
                    dangerouslySetInnerHTML={{ __html: content.content }}
                />

                {/* Footer / Share */}
                <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
                    <p className="text-slate-500 dark:text-gray-400 italic">
                        {isAr ? 'هل أعجبك المقال؟ شاركه مع شبكتك.' : 'Enjoyed this article? Share it with your network.'}
                    </p>
                    {/* ShareButton component is global, but we could add inline sharing here if needed */}
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
