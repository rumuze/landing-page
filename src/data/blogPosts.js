/**
 * Centralized Blog Data (The Knowledge Base)
 * 
 * Each post represents a core pillar of Rumuze's expertise.
 * Content is structured for both human readability and AI extraction.
 */

export const blogPosts = [
    {
        id: 'future-of-backend',
        slug: 'future-of-backend',
        date: '2026-02-10',
        author: 'Mohamed Ashraf',
        category: 'tech', // matches translation key blog.categories.tech
        readTime: 8,
        image: '/assets/images/blog-1.webp',
        en: {
            title: 'The Future of Scalable Backend Architectures',
            excerpt: 'Why microservices are evolving into modular monoliths, and how edge computing is redefining latency.',
            content: `
                <h2> The Death of Complexity </h2>
                <p>For a decade, "microservices" was the default answer to scaling. It was wrong. Complexity is the silent killer of velocity.</p>
                <p>At Rumuze, we advocate for the <strong>Modular Monolith</strong> pattern for 90% of enterprise applications. It offers the strict boundaries of microservices with the deployment simplicity of a monolith.</p>
                
                <h3> The Edge is the New Center </h3>
                <p>With Cloudflare Workers and Vercel Edge Functions, logic is moving closer to the user. We no longer build "backends" in the traditional sense; we build distributed compute networks.</p>
                
                <blockquote>"The fastest request is the one that never hits the origin server."</blockquote>
                
                <h3> AI-Native Infrastructure </h3>
                <p>Modern backends must be vector-ready. Integrating Pinecone or Milvus isn't an afterthought; it's Day 1 architecture. Rumuze builds systems where RAG (Retrieval-Augmented Generation) is intrinsic to the data layer.</p>
            `
        },
        ar: {
            title: 'مستقبل معماريات الخلفية القابلة للتوسع',
            excerpt: 'لماذا تتطور الخدمات المصغرة إلى كتل معيارية، وكيف تعيد الحوسبة الطرفية تعريف زمن الانتقال.',
            content: `
                <h2> موت التعقيد </h2>
                <p>لعمقد كامل، كانت "الخدمات المصغرة" (Microservices) هي الإجابة الافتراضية للتوسع. كان ذلك خطأ. التعقيد هو القاتل الصامت للسرعة.</p>
                <p>في روموز، نناشد بنمط <strong>الكتلة المعيارية (Modular Monolith)</strong> لـ 90% من التطبيقات المؤسسية. إنه يوفر الحدود الصارمة للخدمات المصغرة مع بساطة نشر النظام الموحد.</p>
                
                <h3> الحافة هي المركز الجديد </h3>
                <p>مع Cloudflare Workers و Vercel Edge Functions، ينتقل المنطق أقرب إلى المستخدم. لم نعد نبني "واجهات خلفية" بالمعنى التقليدي؛ نحن نبني شبكات حوسبة موزعة.</p>
                
                <blockquote>"أسرع طلب هو ذلك الذي لا يصل أبداً إلى السيرفر الأصلي."</blockquote>
                
                <h3> بنية تحتية أصلية للذكاء الاصطناعي </h3>
                <p>الواجهات الخلفية الحديثة يجب أن تكون جاهزة للمتجهات (Vector-ready). دمج Pinecone أو Milvus ليس فكرة لاحقة؛ إنها هندسة اليوم الأول. تبني روموز أنظمة يكون فيها RAG (توليد الاستجابة المعزز بالاسترجاع) جوهرياً في طبقة البيانات.</p>
            `
        }
    },
    {
        id: 'data-driven-growth',
        slug: 'data-driven-growth',
        date: '2026-02-05',
        author: 'Growth Team',
        category: 'marketing',
        readTime: 5,
        image: '/assets/images/blog-2.webp',
        en: {
            title: 'Data-Driven Growth: Beyond Simple Metrics',
            excerpt: 'Vanity metrics lie. Revenue metrics tell the truth. How to build a dashboard that actually informs strategy.',
            content: `
                <h2> The Fallacy of "Active Users" </h2>
                <p>Daily Active Users (DAU) is a vanity metric if those users aren't taking high-value actions. We shift the focus to <strong>North Star Metrics</strong> that correlate directly with long-term retention.</p>
                
                <h3> The Feedback Loop </h3>
                <p>Growth isn't a funnel; it's a flywheel. Data from sales must inform product, and product usage must inform marketing.</p>
            `
        },
        ar: {
            title: 'النمو القائم على البيانات: ما وراء المقاييس البسيطة',
            excerpt: 'مقاييس الغرور تكذب. مقاييس الإيرادات تقول الحقيقة. كيف تبني لوحة تحكم تبلغ الاستراتيجية حقاً.',
            content: `
                <h2> مغالطة "المستخدمين النشطين" </h2>
                <p>المستخدمون النشطون يومياً (DAU) هو مقياس غرور إذا لم يتخذ هؤلاء المستخدمون إجراءات عالية القيمة. نحن نحول التركيز إلى <strong>مقاييس نجم الشمال</strong> التي ترتبط مباشرة بالاحتفاظ طويل الأمد.</p>
                
                <h3> حلقة التغذية الراجعة </h3>
                <p>النمو ليس قمعاً؛ إنه عجلة دوارة (Flywheel). البيانات من المبيعات يجب أن تبلغ المنتج، واستخدام المنتج يجب أن يبلغ التسويق.</p>
            `
        }
    },
    {
        id: 'ai-integration',
        slug: 'ai-integration',
        date: '2026-01-28',
        author: 'Mohamed Ashraf',
        category: 'ai',
        readTime: 12,
        image: '/assets/images/blog-3.webp',
        en: {
            title: 'AI Integration: Transitioning from Theory to Profit',
            excerpt: 'Moving LLMs from "cool demo" to "core business logic". The challenges of hallucination, latency, and cost.',
            content: `
                <h2> Beyond the Chatbot </h2>
                <p>If your AI strategy is just "add a chatbot", you're missing 90% of the value. The real power of LLMs lies in <strong>Unstructured Data Processing</strong>.</p>
                
                <h3> Deterministic AI </h3>
                <p>Businesses hate unpredictability. Rumuze implements "Guardrails" allowing us to use probabilistic models (LLMs) in deterministic workflows. We control the output structure (JSON mode) to ensure reliability.</p>
            `
        },
        ar: {
            title: 'تكامل الذكاء الاصطناعي: الانتقال من النظرية إلى الربح',
            excerpt: 'نقل النماذج اللغوية الكبيرة من "عرض مبهر" إلى "منطق عمل جوهري". تحديات الهلوسة، التأخير، والتكلفة.',
            content: `
                <h2> ما وراء الشات بوت </h2>
                <p>إذا كانت استراتيجية الذكاء الاصطناعي الخاصة بك هي مجرد "إضافة شات بوت"، فأنت تفقد 90% من القيمة. القوة الحقيقية للنماذج اللغوية الكبيرة تكمن في <strong>معالجة البيانات غير المهيكلة</strong>.</p>
                
                <h3> الذكاء الاصطناعي الحتمي </h3>
                <p>في الأعمال نكره عدم القدرة على التنبؤ. تطبق روموز "حواجز حماية" (Guardrails) تسمح لنا استخدام نماذج احتمالية في مسارات عمل حتمية. نحن نتحكم في هيكل المخرجات (JSON mode) لضمان الموثوقية.</p>
            `
        }
    }
];

export function getPostBySlug(slug) {
    return blogPosts.find(post => post.slug === slug);
}

export function getAllPosts() {
    return blogPosts;
}
