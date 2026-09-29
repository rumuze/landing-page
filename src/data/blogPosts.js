/**
 * Centralized Blog Data (The Knowledge Base)
 * 
 * Each post is written by the Rumuze team about how we build software.
 * Content is structured for both human readability and AI extraction.
 */

export const blogPosts = [
    {
        id: 'modular-monolith-architecture',
        slug: 'modular-monolith-architecture',
        date: '2026-02-12',
        author: 'Mohamed Ashraf',
        category: 'tech',
        readTime: 8,
        image: '/assets/images/blog-1.webp',
        en: {
            title: 'Why We Start with a Modular Monolith',
            excerpt: 'For most teams, microservices are a premature optimisation. Speed of change comes from cohesion, not fragmentation.',
            content: `
                <h2>Statement</h2>
                <p><strong>For most teams, microservices are a premature optimisation.</strong> Putting network boundaries between components before the domain boundaries are understood is an expensive mistake.</p>

                <h3>Context</h3>
                <p>The industry spent a decade fragmenting functional systems into distributed nightmares. Teams with 5 engineers attempted Facebook-scale architectures. The result was not scale; it was <strong>Distributed Friction</strong>.</p>

                <h3>Explanation</h3>
                <p>Complexity kills velocity. Network calls fail. Latency obeys physics, not desire. A <strong>Modular Monolith</strong> enforces strict boundaries (namespaces) without the operational tax of orchestration. It allows you to refactor domain boundaries in seconds (IDE rename) rather than months (API versioning).</p>

                <h3>Common Industry Mistakes</h3>
                <ul>
                    <li><strong>Premature Decomposition:</strong> Splitting services by database table rather than domain context.</li>
                    <li><strong>Resume-Driven Development:</strong> Choosing Kubernetes for CRUD apps to pad CVs.</li>
                    <li><strong>Blind Observability:</strong> Distributed systems without distributed tracing are black holes.</li>
                </ul>

                <h3>Company Perspective</h3>
                <p><strong>Rumuze builds for cohesion.</strong> Our own platform RumuzePMO is a Laravel modular monolith with seven modules that can be enabled independently. We split out a service only when a real requirement, such as independent scaling, justifies it.</p>
            `
        },
        ar: {
            title: 'لماذا نبدأ بالكتلة المعيارية (Modular Monolith)',
            excerpt: 'بالنسبة لمعظم الفرق، الخدمات المصغرة تحسين سابق لأوانه. سرعة التغيير تأتي من التماسك لا من التجزئة.',
            content: `
    < h2 > البيان</h2 >
                <p><strong>بالنسبة لمعظم الفرق، الخدمات المصغرة (Microservices) تحسين سابق لأوانه.</strong> وضع حدود شبكية بين المكونات قبل فهم حدود المجال خطأ مكلف.</p>

                <h3>السياق</h3>
                <p>قضت صناعة التكنولوجيا العقد الماضي في تفتيت أنظمة تعمل بشكل مثالي إلى كوابيس موزعة. مستلهمين من نيتفليكس وأوبر، حاولت فرق مكونة من 5 مهندسين بناء معماريات مصممة لـ 5000 مهندس. النتيجة لم كانت التوسع؛ بل كانت "الاحتكاك الموزع".</p>

                <h3>التفسير</h3>
                <p>التعقيد هو القاتل الصامت للسرعة. كل استدعاء شبكي هو نقطة فشل محتملة. كل معاملة موزعة هي صداع في الاتساق. تقدم <strong>الكتلة المعيارية (Modular Monolith)</strong> فرض الحدود الصارم للخدمات المصغرة (عبر مساحات الأسماء والوحدات الخاصة) مع تكامل المعاملات وبساطة النشر للوحدة الواحدة. إنها تسمح لك بإعادة هيكلة حدود المجال في ثوانٍ (إعادة تسمية في المحرر) بدلاً من أشهر (إصدارات واجهة برمجة التطبيقات).</p>

                <h3>أخطاء الصناعة الشائعة</h3>
                <ul>
                    <li><strong>التفكيك السابق لأوانه:</strong> تقسيم الخدمات حسب جداول قاعدة البيانات بدلاً من سياق المجال.</li>
                    <li><strong>تطوير مدفوع بالسيرة الذاتية:</strong> اختيار Kubernetes و gRPC لتطبيق CRUD بسيط لتعزيز السير الذاتية.</li>
                    <li><strong>تجاهل القابلية للملاحظة:</strong> نشر أنظمة موزعة دون تتبع موزع (Jaeger/Zipkin).</li>
                </ul>

                <h3>منظور روموز</h3>
                <p><strong>رموز تبني من أجل التماسك.</strong> منصتنا RumuzePMO هي كتلة معيارية بـ Laravel من سبع وحدات يمكن تفعيلها بشكل مستقل. ولا نفصل خدمة إلا عندما يبررها متطلب حقيقي مثل التوسع المستقل.</p>
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
