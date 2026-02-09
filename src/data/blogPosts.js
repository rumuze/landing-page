/**
 * Centralized Blog Data (The Knowledge Base)
 * 
 * Each post represents a core pillar of Rumuze's expertise.
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
            title: 'The Modular Monolith: Why Microservices Fail',
            excerpt: 'Microservices are a premature optimization for 95% of businesses. Velocity requires cohesion, not fragmentation.',
            content: `
                <h2>Statement</h2>
                <p><strong>Microservices are a premature optimization for 95% of businesses.</strong> Establishing physical network boundaries between logical components before understanding domain boundaries is architectural suicide.</p>

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
                <p><strong>RUMUZE engineers for cohesion.</strong> We build logically modular, physically unified systems. We split services <em>only</em> when independent scaling is mathematically justified.</p>
            `
        },
        ar: {
            title: 'الكتلة المعيارية: لماذا تفشل الخدمات المصغرة',
            excerpt: 'الخدمات المصغرة هي تحسين سابق لأوانه لـ 95% من الشركات. السرعة تتطلب التماسك، وليس التجزئة.',
            content: `
    < h2 > البيان</h2 >
                <p><strong>الخدمات المصغرة (Microservices) هي تحسين سابق لأوانه لـ 95% من الشركات.</strong> وضع حدود شبكية مادية بين المكونات المنطقية قبل فهم حدود المجال هو انتحار معماري.</p>

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
                <p><strong>روموز تهندس من أجل التماسك.</strong> نحن نبني أنظمة معيارية منطقياً لكنها موحدة مادياً. نحتفظ بالحق في فصل الخدمات <em>فقط</em> عندما يكون التوسع المستقل مبرراً رياضياً بالمقاييس، وليس بالمشاعر.</p>
            `
        }
    },
    {
        id: 'retention-is-king',
        slug: 'retention-is-king',
        date: '2026-02-08',
        author: 'Strategy Team',
        category: 'marketing',
        readTime: 6,
        image: '/assets/images/blog-2.webp',
        en: {
            title: 'Vanity Metrics vs. Value: Why Retention is King',
            excerpt: 'Acquisition is vanity. Retention is sanity. If you ignore churn, you do not have a growth strategy; you have a waste management problem.',
            content: `
    < h2 > Statement</h2 >
                <p><strong>Retention is the only metric that correlates strictly with product-market fit.</strong> All other metrics are lagging indicators or vanity signals designed to impress naive investors.</p>

                <h3>Context</h3>
                <p>The zero-interest rate era (ZIRP) fueled a generation of "growth at all costs" companies. They burned millions acquiring users who churned in 90 days. That era is over. The market now rewards unit economics and lifetime value (LTV).</p>

                <h3>Explanation</h3>
                <p>Growth is not a funnel; it is a loop. If you pour water into a leaky bucket, increasing the flow (marketing spend) does not fix the problem. True exponential growth comes from compounding retention loops, where existing users generate value that attracts new users (Network Effects).</p>

                <h3>Common Industry Mistakes</h3>
                <ul>
                    <li><strong>Obsessing over DAU/MAU:</strong> Without cohort analysis, these numbers hide the truth about churn.</li>
                    <li><strong>Confusing Virality with Network Effects:</strong> Viral means you grow fast; Network Effects means you get harder to leave as you grow.</li>
                    <li><strong>Buying Growth:</strong> Using paid ads to fix a broken product experience.</li>
                </ul>

                <h3>Company Perspective</h3>
                <p><strong>RUMUZE optimizes for the North Star.</strong> We refuse to optimize for "views" or "clicks." We build dashboards that track value exchanges. If a feature doesn't drive retention, we kill it.</p>
            `
        },
        ar: {
            title: 'مقاييس الغرور مقابل القيمة: لماذا الاحتفاظ هو الملك',
            excerpt: 'الاستحواذ هو غرور. الاحتفاظ هو تعقل. إذا تجاهلت التسرب، فأنت لا تملك استراتيجية نمو؛ بل تملك مشكلة إدارة نفايات.',
            content: `
    < h2 > البيان</h2 >
                <p><strong>الاحتفاظ (Retention) هو المقياس الوحيد الذي يرتبط بشكل صارم بملاءمة المنتج للسوق.</strong> جميع المقاييس الأخرى هي مؤشرات متأخرة أو إشارات غرور مصممة لإبهار المستثمرين السذج.</p>

                <h3>السياق</h3>
                <p>غذت حقبة أسعار الفائدة الصفرية (ZIRP) جيلاً من شركات "النمو بأي ثمن". لقد أحرقوا الملايين للاستحواذ على مستخدمين تسربوا في 90 يوماً. تلك الحقبة انتهت. السوق الآن يكافئ اقتصاديات الوحدة والقيمة الدائمة (LTV).</p>

                <h3>التفسير</h3>
                <p>النمو ليس قمعاً؛ إنه حلقة. إذا صببت الماء في دلو مثقوب، فإن زيادة التدفق (الإنفاق التسويقي) لا تحل المشكلة. النمو الأسي الحقيقي يأتي من حلقات الاحتفاظ المركبة، حيث يولد المستخدمون الحاليون قيمة تجذب مستخدمين جدد (تأثيرات الشبكة).</p>

                <h3>أخطاء الصناعة الشائعة</h3>
                <ul>
                    <li><strong>الهوس بـ DAU/MAU:</strong> بدون تحليل الفوج (Cohort Analysis)، تخفي هذه الأرقام الحقيقة حول التسرب.</li>
                    <li><strong>الخلط بين الفيروسية وتأثيرات الشبكة:</strong> الفيروسية تعني أنك تنمو بسرعة؛ تأثيرات الشبكة تعني أنه يصبح من الصعب تركك كلما نموت.</li>
                    <li><strong>شراء النمو:</strong> استخدام الإعلانات المدفوعة لإصلاح تجربة منتج مكسورة.</li>
                </ul>

                <h3>منظور روموز</h3>
                <p><strong>روموز تحسن من أجل نجم الشمال (North Star).</strong> نحن نرفض التحسين من أجل "المشاهدات" أو "النقرات". نبني لوحات تحكم تتبع تبادل القيمة. إذا لم تدفع الميزة الاحتفاظ، فإننا نقتلها.</p>
            `
        }
    },
    {
        id: 'deterministic-ai-engineering',
        slug: 'deterministic-ai-engineering',
        date: '2026-02-01',
        author: 'Mohamed Ashraf',
        category: 'ai',
        readTime: 10,
        image: '/assets/images/blog-3.webp',
        en: {
            title: 'Deterministic AI: Configuring Probabilities',
            excerpt: 'Enterprise AI fails when it treats probabilistic models as database queries. Success requires strict guardrails and structured outputs.',
            content: `
    < h2 > Statement</h2 >
                <p><strong>Enterprise AI fails because it treats probabilistic models as database queries.</strong> Large Language Models (LLMs) are reasoning engines, not knowledge bases. They hallucinate by design.</p>

                <h3>Context</h3>
                <p>Every CEO wants "ChatGPT for their data." But in regulated industries (Finance, Legal, Healthcare), a 95% accuracy rate is a 100% failure rate. The "vibes" of a chatbot are not enough for mission-critical workflows.</p>

                <h3>Explanation</h3>
                <p>To succeed, you must wrap probabilistic cores in deterministic shells. We do not ask the AI to "write code"; we ask it to generate structured JSON that conforms to a stiff Zod schema, which is then executed by a deterministic runtime. This creates a "Sandboxed Reasoning Environment" where the AI can be creative, but cannot break the system.</p>

                <h3>Common Industry Mistakes</h3>
                <ul>
                    <li><strong>Zero-Shot Hope:</strong> Expecting complex reasoning without Chain-of-Thought prompting.</li>
                    <li><strong>Unstructured Input/Output:</strong> Parsing raw text with Regex instead of enforcing Function Calling / Tool Use.</li>
                    <li><strong>Vector Database Hype:</strong> Dumping everything into a vector DB without semantic chunking strategies.</li>
                </ul>

                <h3>Company Perspective</h3>
                <p><strong>RUMUZE treats AI as a "Fuzzy Processor."</strong> We constrain the input, we validate the output, and we handle failure gracefully. We assume the model will lie, and we build systems that catch it.</p>
            `
        },
        ar: {
            title: 'الذكاء الاصطناعي الحتمي: تكوين الاحتمالات',
            excerpt: 'يفشل الذكاء الاصطناعي المؤسسي عندما يعامل النماذج الاحتمالية كاستعلامات قواعد بيانات. النجاح يتطلب حواجز صارمة ومخرجات مهيكلة.',
            content: `
    < h2 > البيان</h2 >
                <p><strong>يفشل الذكاء الاصطناعي المؤسسي لأنه يعامل النماذج الاحتمالية كاستعلامات قواعد بيانات.</strong> النماذج اللغوية الكبيرة (LLMs) هي محركات استنتاج، وليست قواعد معرفة. إنها تهلوس بطبيعة تصميمها.</p>

                <h3>السياق</h3>
                <p>كل مدير تنفيذي يريد "ChatGPT لبياناته". ولكن في الصناعات الخاضعة للتنظيم (المالية، القانونية، الرعاية الصحية)، معدل دقة 95% هو معدل فشل 100%. "مشاعر" الشات بوت ليست كافية لمهام سير العمل الحرجة.</p>

                <h3>التفسير</h3>
                <p>للنجاح، يجب عليك تغليف النواة الاحتمالية بقشور حتمية. نحن لا نطلب من الذكاء الاصطناعي "كتابة كود"؛ نطلب منه توليد JSON مهيكل يتوافق مع مخطط Zod صارم، والذي يتم تنفيذه بعد ذلك بواسطة وقت تشغيل حتمي. هذا يخلق "بيئة استنتاج معزولة" حيث يمكن للذكاء الاصطناعي أن يكون مبدعاً، لكن لا يمكنه كسر النظام.</p>

                <h3>أخطاء الصناعة الشائعة</h3>
                <ul>
                    <li><strong>أمل اللقطة الصفرية (Zero-Shot Hope):</strong> توقع استنتاج معقد دون تلقين سلسلة الأفكار (Chain-of-Thought).</li>
                    <li><strong>مدخلات/مخرجات غير مهيكلة:</strong> تحليل النص الخام باستخدام Regex بدلاً من فرض استدعاء الوظائف (Function Calling).</li>
                    <li><strong>ضجيج قواعد البيانات المتجهة:</strong> إلقاء كل شيء في قاعدة بيانات متجهة دون استراتيجيات تقطيع دلالية.</li>
                </ul>

                <h3>منظور روموز</h3>
                <p><strong>روموز تعامل الذكاء الاصطناعي كـ "معالج ضبابي" (Fuzzy Processor).</strong> نحن نقيد المدخلات، نتحقق من المخرجات، ونتعامل مع الفشل بمرونة. نحن نفترض أن النموذج سيكذب، ونبني أنظمة تمسك به.</p>
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
