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
        image: '/assets/images/blog/modular-monolith-architecture.jpg',
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
    },
    {
        id: 'transactional-outbox-pattern',
        slug: 'transactional-outbox-pattern',
        date: '2026-09-29',
        author: 'Mohamed Ashraf',
        category: 'tech',
        readTime: 6,
        image: '/assets/images/blog/transactional-outbox-pattern.jpg',
        en: {
            title: 'The Transactional Outbox: Making Events Reliable',
            excerpt: 'Saving data and publishing an event are two writes. If one fails, the system drifts. The outbox pattern turns them into one.',
            content: `
                <h2>The problem</h2>
                <p>A service saves an order, then publishes an <code>order.created</code> event. If the process crashes between the two steps, the order exists but nobody hears about it. Reverse the order and you can announce an event for data that was never saved. This is the dual-write problem, and retries do not fix it.</p>

                <h2>The pattern</h2>
                <p>Instead of publishing directly, write the event to an <strong>outbox table</strong> in the same database transaction as the business data. Either both are committed or neither is. A separate relay process reads unpublished rows, delivers them, and marks them as sent.</p>
                <ul>
                    <li><strong>Atomic write:</strong> the event exists if, and only if, the data does.</li>
                    <li><strong>At-least-once delivery:</strong> the relay may deliver an event twice after a crash, so consumers must be idempotent.</li>
                    <li><strong>Ordering:</strong> preserve order per aggregate (for example per order id) rather than globally.</li>
                </ul>

                <h2>What to watch in production</h2>
                <ul>
                    <li><strong>Relay lag:</strong> alert on the age of the oldest unpublished row, not only on errors.</li>
                    <li><strong>Poison events:</strong> cap retries, then park the event for inspection instead of blocking the queue.</li>
                    <li><strong>Cleanup:</strong> delete or archive delivered rows so the table stays small.</li>
                    <li><strong>Tracing:</strong> carry a trace id from the request into the event and on to the webhook, so one action can be followed end to end.</li>
                </ul>

                <h2>How we use it</h2>
                <p>Rumuze Core is a NestJS API built around this pattern: domain events go through an EventBus into a transactional outbox, and from there to a webhook engine for outbound delivery and to Socket.IO for realtime fan-out through Redis. Inbound webhooks are verified before they are accepted. The same idea is worth using in any system where a missed event means a support ticket.</p>
            `
        },
        ar: {
            title: 'نمط Outbox: جعل الأحداث موثوقة',
            excerpt: 'حفظ البيانات ونشر الحدث عمليتا كتابة منفصلتان. إذا فشلت إحداهما ينحرف النظام. نمط Outbox يجعلهما عملية واحدة.',
            content: `
                <h2>المشكلة</h2>
                <p>تحفظ الخدمة طلباً ثم تنشر الحدث <code>order.created</code>. إذا توقفت العملية بين الخطوتين يوجد الطلب دون أن يعلم به أحد. وإذا عكست الترتيب فقد تعلن عن حدث لبيانات لم تُحفظ أصلاً. هذه مشكلة الكتابة المزدوجة (dual write)، ولا تحلها إعادة المحاولة.</p>

                <h2>النمط</h2>
                <p>بدلاً من النشر المباشر، اكتب الحدث في <strong>جدول Outbox</strong> ضمن نفس معاملة قاعدة البيانات التي تحفظ بيانات العمل. إما أن يُحفظ الاثنان معاً أو لا يُحفظ أي منهما. ثم تقرأ عملية منفصلة الصفوف غير المنشورة وتسلّمها وتضع عليها علامة "أُرسل".</p>
                <ul>
                    <li><strong>كتابة ذرّية:</strong> الحدث موجود إذا وفقط إذا كانت البيانات موجودة.</li>
                    <li><strong>تسليم مرة واحدة على الأقل:</strong> قد تسلّم العملية الحدث مرتين بعد توقف مفاجئ، لذلك يجب أن يكون المستهلكون idempotent.</li>
                    <li><strong>الترتيب:</strong> حافظ على الترتيب لكل كيان (مثل رقم الطلب) بدل ترتيب عام.</li>
                </ul>

                <h2>ما تراقبه في الإنتاج</h2>
                <ul>
                    <li><strong>تأخر الإرسال:</strong> نبّه على عمر أقدم صف غير منشور وليس على الأخطاء فقط.</li>
                    <li><strong>الأحداث المعطوبة:</strong> حدّد عدد المحاولات ثم اعزل الحدث للفحص بدل أن يعطل الطابور.</li>
                    <li><strong>التنظيف:</strong> احذف الصفوف المسلّمة أو أرشفها ليبقى الجدول صغيراً.</li>
                    <li><strong>التتبع:</strong> مرّر معرّف تتبع من الطلب إلى الحدث ثم إلى الـ webhook لتتبع الإجراء الواحد من أوله لآخره.</li>
                </ul>

                <h2>كيف نستخدمه</h2>
                <p>Rumuze Core واجهة NestJS مبنية حول هذا النمط: تمر أحداث المجال عبر EventBus إلى Outbox معاملاتي، ومنه إلى محرك Webhooks للتسليم الخارجي وإلى Socket.IO للتوزيع اللحظي عبر Redis. ويجري التحقق من الـ webhooks الواردة قبل قبولها. والفكرة تستحق الاستخدام في أي نظام يعني فيه فقدان حدث فتح بلاغ دعم.</p>
            `
        }
    },
    {
        id: 'arabic-and-english-one-codebase',
        slug: 'arabic-and-english-one-codebase',
        date: '2026-09-29',
        author: 'Mohamed Ashraf',
        category: 'tech',
        readTime: 7,
        image: '/assets/images/blog/arabic-and-english-one-codebase.jpg',
        en: {
            title: 'One Codebase, Two Directions: Arabic and English Done Properly',
            excerpt: 'Right-to-left support is a design constraint, not a translation task. Here is how we structure a bilingual site so both languages are first-class.',
            content: `
                <h2>Start with the URL</h2>
                <p>Give each language its own path (<code>/</code> and <code>/ar</code>). The route decides the language, the <code>lang</code> and <code>dir</code> attributes, and the metadata. Storing the language only in a cookie or local storage makes pages impossible to link to and invisible to search engines.</p>

                <h2>Write layout once, in logical terms</h2>
                <p>Use logical CSS properties (<code>margin-inline-start</code>, <code>text-align: start</code>, <code>padding-inline</code>) instead of left and right. The same component then works in both directions. Decide deliberately which icons mirror: arrows and back buttons should, logos and checkmarks should not.</p>

                <h2>Treat mixed-script text with care</h2>
                <p>Arabic sentences often contain Latin terms such as product names or code. A sentence that begins or ends with a Latin word, or that contains parentheses and colons around one, can reorder visually. Keep technical tokens inside the sentence, wrap them in <code>dir="ltr"</code> when needed, and read the result on a real screen instead of trusting the source.</p>

                <h2>Give search engines two real pages</h2>
                <ul>
                    <li>A canonical URL per language, and <code>hreflang</code> alternates that point at each other.</li>
                    <li>Separate title, description, and structured data for each language, written for that language rather than translated from a template.</li>
                    <li>Both languages in the sitemap, and both prerendered to static HTML so crawlers that do not run JavaScript still see the content.</li>
                </ul>

                <h2>Common mistakes</h2>
                <ul>
                    <li>Translating the text but leaving the layout left-to-right.</li>
                    <li>One shared page title for both languages.</li>
                    <li>Only testing in a desktop browser with an English keyboard.</li>
                </ul>

                <h2>How we do it</h2>
                <p>This website is built this way: locale-aware routes, one component set that renders in both directions, per-language metadata and JSON-LD, and a build step that prerenders every route in both languages. Right-to-left support was a requirement from the first screen, not a later patch.</p>
            `
        },
        ar: {
            title: 'قاعدة كود واحدة واتجاهان: العربية والإنجليزية بالشكل الصحيح',
            excerpt: 'دعم الكتابة من اليمين لليسار قيد تصميمي وليس مهمة ترجمة. هكذا نبني موقعاً ثنائي اللغة تكون فيه اللغتان أصيلتين.',
            content: `
                <h2>ابدأ من الرابط</h2>
                <p>امنح كل لغة مساراً خاصاً بها (<code>/</code> و<code>/ar</code>). يحدد المسار اللغة وسمتي <code>lang</code> و<code>dir</code> والبيانات الوصفية. أما حفظ اللغة في كوكي أو التخزين المحلي فقط فيجعل الصفحات غير قابلة للربط وغير مرئية لمحركات البحث.</p>

                <h2>اكتب التخطيط مرة واحدة بمصطلحات منطقية</h2>
                <p>استخدم خصائص CSS المنطقية (<code>margin-inline-start</code> و<code>text-align: start</code> و<code>padding-inline</code>) بدل اليمين واليسار. فيعمل المكوّن نفسه في الاتجاهين. وقرر بوعي أي الأيقونات تنعكس: الأسهم وأزرار الرجوع تنعكس، أما الشعارات وعلامات الصح فلا.</p>

                <h2>تعامل بحذر مع النص المختلط</h2>
                <p>تحتوي الجمل العربية كثيراً على مصطلحات لاتينية مثل أسماء المنتجات أو الكود. والجملة التي تبدأ أو تنتهي بكلمة لاتينية، أو تحيط بها أقواس ونقطتان، قد يتغير ترتيبها بصرياً. أبقِ المصطلحات التقنية داخل الجملة، ولفّها بـ <code>dir="ltr"</code> عند الحاجة، واقرأ النتيجة على شاشة حقيقية بدل الاعتماد على الكود.</p>

                <h2>امنح محركات البحث صفحتين حقيقيتين</h2>
                <ul>
                    <li>رابط canonical لكل لغة، وبدائل <code>hreflang</code> تشير كل منها إلى الأخرى.</li>
                    <li>عنوان ووصف وبيانات منظمة منفصلة لكل لغة، مكتوبة لتلك اللغة وليست مترجمة من قالب.</li>
                    <li>اللغتان في خريطة الموقع، ومعروضتان مسبقاً كـ HTML ثابت ليرى المحتوى الزواحف التي لا تشغّل JavaScript.</li>
                </ul>

                <h2>أخطاء شائعة</h2>
                <ul>
                    <li>ترجمة النص مع إبقاء التخطيط من اليسار لليمين.</li>
                    <li>عنوان صفحة واحد مشترك للغتين.</li>
                    <li>الاختبار فقط في متصفح سطح المكتب بلوحة مفاتيح إنجليزية.</li>
                </ul>

                <h2>كيف نفعل ذلك</h2>
                <p>هذا الموقع مبني بهذه الطريقة: مسارات واعية باللغة، ومجموعة مكونات واحدة تُعرض في الاتجاهين، وبيانات وصفية وJSON-LD لكل لغة، وخطوة بناء تعرض كل مسار مسبقاً باللغتين. كان دعم اليمين لليسار شرطاً من أول شاشة وليس ترقيعاً لاحقاً.</p>
            `
        }
    },
    {
        id: 'flutter-driver-app-risky-parts',
        slug: 'flutter-driver-app-risky-parts',
        date: '2026-09-29',
        author: 'Mohamed Ashraf',
        category: 'tech',
        readTime: 6,
        image: '/assets/images/blog/flutter-driver-app-risky-parts.jpg',
        en: {
            title: 'The Risky Parts of a Flutter Driver App',
            excerpt: 'Screens are the easy part. Background location, notifications, and app lock are where a field app breaks.',
            content: `
                <h2>Where field apps fail</h2>
                <p>A driver app spends most of its life in the background, on a phone the operating system is trying to save battery on. The screens rarely cause incidents. The platform integrations do.</p>

                <h2>Background location</h2>
                <ul>
                    <li>Track only while a delivery is active, and stop the moment it ends.</li>
                    <li>Foreground services and permissions differ between Android and iOS, and store review checks them. Write the permission text for the user, not for the policy.</li>
                    <li>Change this code carefully and test it on real devices with the screen off.</li>
                </ul>

                <h2>Push notifications</h2>
                <ul>
                    <li>Handle three states separately: foreground, background, and terminated.</li>
                    <li>Android caches notification channel settings. After changing sounds or importance, test on a clean install, otherwise you are testing the old channel.</li>
                </ul>

                <h2>Biometric app lock</h2>
                <p>Lock the app without locking the driver out of an active delivery. Decide what happens when biometrics are unavailable, changed, or cancelled, and test each case.</p>

                <h2>The backend contract</h2>
                <p>Mobile releases cannot be rolled back instantly, so the API has to stay backward compatible for as long as old app versions are in use. Keep endpoint definitions in one place, and coordinate status-transition changes with the backend before shipping.</p>

                <h2>How we work</h2>
                <p>Our Rveta driver app is a Flutter app backed by a Laravel API. It ships with maintenance runbooks, an upgrade risk report, and a manual device smoke-test checklist, because the risky parts are exactly the ones automated tests do not cover.</p>
            `
        },
        ar: {
            title: 'الأجزاء الخطرة في تطبيق سائقين بـ Flutter',
            excerpt: 'الشاشات هي الجزء السهل. الموقع في الخلفية والإشعارات وقفل التطبيق هي المكان الذي ينكسر فيه تطبيق العمل الميداني.',
            content: `
                <h2>أين تفشل تطبيقات العمل الميداني</h2>
                <p>يقضي تطبيق السائقين معظم عمره في الخلفية، على هاتف يحاول نظام التشغيل توفير بطاريته. نادراً ما تسبب الشاشات حوادث. أما تكاملات المنصة فتسببها.</p>

                <h2>الموقع في الخلفية</h2>
                <ul>
                    <li>تتبّع فقط أثناء وجود توصيل نشط، وتوقف فور انتهائه.</li>
                    <li>تختلف الخدمات الأمامية والأذونات بين Android وiOS، وتراجعها المتاجر. اكتب نص الإذن للمستخدم وليس للسياسة.</li>
                    <li>غيّر هذا الكود بحذر واختبره على أجهزة حقيقية والشاشة مطفأة.</li>
                </ul>

                <h2>الإشعارات الفورية</h2>
                <ul>
                    <li>تعامل مع ثلاث حالات منفصلة: التطبيق في الواجهة وفي الخلفية ومغلقاً.</li>
                    <li>يحتفظ Android بإعدادات قنوات الإشعارات. بعد تغيير الأصوات أو الأهمية اختبر على تثبيت نظيف، وإلا فأنت تختبر القناة القديمة.</li>
                </ul>

                <h2>القفل البيومتري</h2>
                <p>اقفل التطبيق دون أن تقفل السائق خارج توصيل نشط. حدد ما يحدث عندما تكون البصمة غير متاحة أو تغيرت أو أُلغيت، واختبر كل حالة.</p>

                <h2>عقد الواجهة الخلفية</h2>
                <p>لا يمكن التراجع عن إصدارات الموبايل فوراً، لذلك يجب أن تبقى واجهة API متوافقة مع الإصدارات القديمة طالما هي قيد الاستخدام. أبقِ تعريفات النقاط في مكان واحد، ونسّق تغييرات انتقال الحالات مع الواجهة الخلفية قبل الإصدار.</p>

                <h2>كيف نعمل</h2>
                <p>تطبيق السائقين Rveta هو تطبيق Flutter مدعوم بواجهة Laravel. ويُسلَّم مع دلائل صيانة وتقرير مخاطر الترقية وقائمة اختبار يدوي على الأجهزة، لأن الأجزاء الخطرة هي بالضبط ما لا تغطيه الاختبارات الآلية.</p>
            `
        }
    },
    {
        id: 'tenant-isolation-modular-monolith',
        slug: 'tenant-isolation-modular-monolith',
        date: '2026-09-29',
        author: 'Mohamed Ashraf',
        category: 'tech',
        readTime: 7,
        image: '/assets/images/blog/tenant-isolation-modular-monolith.jpg',
        en: {
            title: 'Tenant Isolation in a Modular Monolith',
            excerpt: 'In a multi-tenant system, one forgotten filter is a data leak. Isolation has to be enforced by the platform, not remembered by developers.',
            content: `
                <h2>The failure mode</h2>
                <p>Multi-tenant bugs are quiet. A query without a tenant filter still returns rows, the page still renders, and the leak is discovered by a customer. Code review alone will not catch every case.</p>

                <h2>Three places to enforce it</h2>
                <ul>
                    <li><strong>Data access:</strong> route reads through one query layer that applies the tenant scope by default, so opting out is the exception that has to be justified.</li>
                    <li><strong>Request context:</strong> resolve the tenant once per request, from the authenticated user, a header, a subdomain, or the session, and make it available everywhere.</li>
                    <li><strong>Writes:</strong> reject or flag any write that arrives without tenant context.</li>
                </ul>

                <h2>Roll enforcement out in stages</h2>
                <p>Turning strict enforcement on in a large existing codebase breaks things. A safer path is to run the guard in a <em>shadow</em> mode that only logs violations, fix what it finds, switch to <em>active</em> mode for the paths you trust, and finally <em>strict</em>. A circuit breaker that degrades the guard under load protects availability while you do this.</p>

                <h2>Measure coverage</h2>
                <p>Classify every table as tenant-scoped or global, and report how many are actually covered. A coverage number tells you where the next leak is likely to be; a checklist does not.</p>

                <h2>Why a modular monolith helps</h2>
                <p>With one deployable and modules that talk through contracts, the query layer and the request context live in one place. You can enforce isolation once, instead of in every service.</p>

                <h2>How we do it</h2>
                <p>RumuzePMO resolves a tenant context per request, applies tenant scoping through its query engine, and ships commands to classify tables, validate integrity, and report enforcement coverage. Its write-protection middleware can run in shadow, active, or strict mode.</p>
            `
        },
        ar: {
            title: 'عزل المستأجرين في الكتلة المعيارية',
            excerpt: 'في النظام متعدد المستأجرين، فلتر منسي واحد يعني تسرب بيانات. يجب أن تفرض المنصة العزل لا أن يتذكره المطورون.',
            content: `
                <h2>نمط الفشل</h2>
                <p>أخطاء تعدد المستأجرين صامتة. استعلام دون فلتر المستأجر ما زال يعيد صفوفاً، والصفحة ما زالت تُعرض، ويكتشف العميل التسرب. مراجعة الكود وحدها لن تلتقط كل الحالات.</p>

                <h2>ثلاثة أماكن للفرض</h2>
                <ul>
                    <li><strong>الوصول للبيانات:</strong> مرّر القراءات عبر طبقة استعلام واحدة تطبق نطاق المستأجر افتراضياً، فيصبح الاستثناء هو ما يحتاج تبريراً.</li>
                    <li><strong>سياق الطلب:</strong> حدد المستأجر مرة واحدة لكل طلب، من المستخدم المصادَق أو ترويسة أو نطاق فرعي أو الجلسة، وأتحه في كل مكان.</li>
                    <li><strong>الكتابة:</strong> ارفض أو نبّه على أي كتابة تصل دون سياق مستأجر.</li>
                </ul>

                <h2>اطرح الفرض على مراحل</h2>
                <p>تفعيل الفرض الصارم دفعة واحدة في قاعدة كود كبيرة قائمة يكسر أشياء. المسار الأكثر أماناً أن تشغّل الحارس في وضع <em>الظل</em> الذي يسجل المخالفات فقط، ثم تصلح ما يجده، ثم تنتقل إلى الوضع <em>الفعّال</em> للمسارات الموثوقة، وأخيراً الوضع <em>الصارم</em>. ويحمي قاطع الدائرة الذي يخفف الحارس تحت الضغط الإتاحة أثناء ذلك.</p>

                <h2>قِس التغطية</h2>
                <p>صنّف كل جدول كمرتبط بمستأجر أو عام، وأبلغ عن عدد ما يغطيه الفرض فعلاً. رقم التغطية يخبرك أين يُحتمل التسرب القادم، وقائمة التحقق لا تفعل.</p>

                <h2>لماذا تساعد الكتلة المعيارية</h2>
                <p>مع تطبيق واحد قابل للنشر ووحدات تتواصل عبر عقود، تعيش طبقة الاستعلام وسياق الطلب في مكان واحد. فتفرض العزل مرة واحدة بدل كل خدمة.</p>

                <h2>كيف نفعل ذلك</h2>
                <p>تحدد RumuzePMO سياق المستأجر لكل طلب، وتطبق نطاق المستأجر عبر محرك الاستعلام، وتوفر أوامر لتصنيف الجداول والتحقق من السلامة والإبلاغ عن تغطية الفرض. ويمكن لوسيط حماية الكتابة أن يعمل في وضع الظل أو الفعّال أو الصارم.</p>
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
