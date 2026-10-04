/**
 * Blog posts (English and Arabic). Each post is written by the Rumuze team about
 * how we build software; keep claims to what our own products and repositories show.
 */

export const blogPosts = [
    {
        id: 'modular-monolith-architecture',
        slug: 'modular-monolith-architecture',
        date: '2026-02-12',
        author: 'Mohamed Ashraf',
        category: 'tech',
        readTime: 5,
        image: '/assets/images/blog/modular-monolith-architecture.jpg',
        en: {
            title: 'Why We Start with a Modular Monolith',
            excerpt: 'For most business systems, microservices are a premature optimisation. Speed of change comes from cohesion, not fragmentation.',
            content: `
                <h2>The short version</h2>
                <p>We start new business systems as a modular monolith: one deployable application, split inside into modules with clear boundaries. A module moves into its own service only when a specific requirement calls for it.</p>

                <h2>What goes wrong when services come first</h2>
                <p>Splitting a system into network services before the domain is understood makes the boundaries guesses, and every wrong guess now costs a network call, a versioned API and a deployment to fix. Teams end up spending their time on the plumbing between services instead of the product.</p>
                <ul>
                    <li><strong>Boundaries drawn too early.</strong> Services split by database table rather than by business capability end up calling each other for almost everything.</li>
                    <li><strong>Consistency becomes your problem.</strong> A change that used to be one database transaction turns into a sequence of calls that can half-succeed.</li>
                    <li><strong>Operations multiply.</strong> Each service needs its own deployment, health checks, logs and alerts, and a request that crosses several of them needs tracing before anyone can understand it.</li>
                </ul>

                <h2>What a modular monolith keeps</h2>
                <p>One codebase and one deployment keep transactions, refactoring and releases simple. The modules keep the discipline: each owns its data and logic and exposes a small, explicit contract to the others. Moving a boundary is an editor refactor and a test run, not an API migration.</p>

                <h2>How we keep the boundaries real</h2>
                <p>A boundary that only exists in a diagram erodes. We define each module's contract first, let other modules depend on that contract and not on its internals, and keep modules switchable so one that is not needed can be turned off. The same structure makes it cheap to lift a module out later.</p>

                <h2>When we do split a service out</h2>
                <p>When a requirement justifies the cost: a part of the system that must scale on its own, a different failure or security profile, or a separate team and release cycle. The contract already exists by then, so the move is mostly infrastructure work.</p>

                <h2>In our own products</h2>
                <p>RumuzePMO is a Laravel modular monolith with seven modules that can be enabled independently. It runs on FrankenPHP and Octane with Redis-backed queues and integrates several payment gateways.</p>
            `
        },
        ar: {
            title: 'لماذا نبدأ بالكتلة المعيارية (Modular Monolith)',
            excerpt: 'بالنسبة لمعظم أنظمة الأعمال، الخدمات المصغرة تحسين سابق لأوانه. سرعة التغيير تأتي من التماسك لا من التجزئة.',
            content: `
                <h2>الخلاصة</h2>
                <p>نبدأ أنظمة الأعمال الجديدة ككتلة معيارية: تطبيق واحد قابل للنشر، مقسَّم من الداخل إلى وحدات بحدود واضحة. ولا تنتقل وحدة إلى خدمة مستقلة إلا عندما يستدعي ذلك متطلب محدد.</p>

                <h2>ما الذي يسوء عندما تسبق الخدمات الفهم</h2>
                <p>تقسيم النظام إلى خدمات شبكية قبل فهم المجال يجعل الحدود مجرد تخمين، وكل تخمين خاطئ يكلّف استدعاءً شبكياً وواجهة مُصدَّرة ونشراً لإصلاحه. وينتهي الفريق منشغلاً بالسباكة بين الخدمات بدل المنتج.</p>
                <ul>
                    <li><strong>حدود مرسومة مبكراً.</strong> خدمات تُقسَّم حسب جداول قاعدة البيانات لا حسب القدرة التجارية فتستدعي بعضها في كل شيء تقريباً.</li>
                    <li><strong>الاتساق يصبح مشكلتك.</strong> تغيير كان معاملة واحدة في قاعدة البيانات يتحول إلى سلسلة استدعاءات قد ينجح بعضها ويفشل بعضها.</li>
                    <li><strong>تضاعف العمليات.</strong> لكل خدمة نشرها وفحوص سلامتها وسجلاتها وتنبيهاتها، والطلب الذي يمر بعدة خدمات يحتاج تتبعاً قبل أن يفهمه أحد.</li>
                </ul>

                <h2>ما تحتفظ به الكتلة المعيارية</h2>
                <p>قاعدة كود واحدة ونشر واحد يُبقيان المعاملات وإعادة الهيكلة والإصدارات بسيطة. وتحتفظ الوحدات بالانضباط: كل وحدة تملك بياناتها ومنطقها وتعرض للوحدات الأخرى عقداً صغيراً وصريحاً. ونقل الحد بين وحدتين يصبح إعادة هيكلة في المحرر وتشغيلاً للاختبارات، لا ترحيلاً لواجهة برمجية.</p>

                <h2>كيف نُبقي الحدود حقيقية</h2>
                <p>الحد الموجود في رسم تخطيطي فقط يتآكل. لذلك نحدد عقد كل وحدة أولاً، ونجعل الوحدات الأخرى تعتمد على العقد لا على تفاصيله الداخلية، ونُبقي الوحدات قابلة للتفعيل والإيقاف فتُطفأ الوحدة غير المطلوبة. وهذا البناء نفسه يجعل استخراج وحدة لاحقاً أقل كلفة.</p>

                <h2>متى نفصل خدمة فعلاً</h2>
                <p>عندما يبرر متطلب ما الكلفة: جزء من النظام يجب أن يتوسع وحده، أو يختلف في نمط الفشل أو الأمان، أو يعمل عليه فريق ودورة إصدار مستقلان. ويكون العقد موجوداً حينها، فيصير النقل في الأغلب عملاً على البنية التحتية.</p>

                <h2>في منتجاتنا</h2>
                <p>منصة RumuzePMO كتلة معيارية بـ Laravel من سبع وحدات يمكن تفعيلها بشكل مستقل. وتعمل على FrankenPHP وOctane مع طوابير مدعومة بـ Redis، وتتكامل مع عدة بوابات دفع.</p>
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
            title: 'One Codebase, Two Directions: Bilingual Done Right',
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
            title: 'قاعدة كود واحدة واتجاهان: العربية والإنجليزية معاً',
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
    },
    {
        id: 'architecture-boundary-checks',
        slug: 'architecture-boundary-checks',
        date: '2026-10-04',
        author: 'Mohamed Ashraf',
        category: 'tech',
        readTime: 5,
        image: '/assets/images/blog/architecture-boundary-checks.jpg',
        en: {
            title: 'Checking Module Boundaries with Commands, Not Reviews',
            excerpt: 'A modular monolith only stays modular while the boundaries are checked. Make the checks commands that run before every merge.',
            content: `
                <h2>A rule nobody checks stops being a rule</h2>
                <p>A modular monolith works while its modules stay separate. The rule is easy to state: modules talk through contracts, never through each other's internals. It is just as easy to break, one convenient import at a time, and each break looks harmless in a review.</p>

                <h2>Three places drift shows up</h2>
                <ul>
                    <li><strong>Module boundaries:</strong> a module reaches into another module's folders instead of its public contract.</li>
                    <li><strong>Code:</strong> classes in one domain depend directly on classes in another.</li>
                    <li><strong>Database:</strong> a foreign key or a join couples two modules' tables, which makes the modules impossible to separate later.</li>
                </ul>

                <h2>Make each check a command</h2>
                <p>A check that has to be remembered will be skipped. A command can run in a hook and in CI. Each of the three drifts above deserves its own scan, plus one command that applies the architecture policy and reports a score, and one that snapshots the whole picture so changes between releases are visible.</p>

                <h2>Report first, then block</h2>
                <p>Run on an existing codebase, a new scan finds violations that already exist. Blocking on all of them on day one stops the team. Record the current state as the baseline, fail only on new violations, and bring the baseline down over time.</p>

                <h2>Run them before the merge</h2>
                <p>The cheapest moment to fix a boundary violation is before it lands. A pre-commit hook gives the developer the answer while the change is still in their head, and the same commands in CI catch anything that skipped the hook.</p>

                <h2>In our own products</h2>
                <p>RumuzePMO ships these as artisan commands: an architecture check, scans for module boundaries, code dependencies and database dependencies, and a cross-module snapshot. It also ships a pre-commit hook for the architecture checks, installed with one script, so the rule is enforced by tooling instead of by memory.</p>
            `
        },
        ar: {
            title: 'فحص حدود الوحدات بالأوامر لا بالمراجعة',
            excerpt: 'الكتلة المعيارية لا تبقى معيارية إلا إذا فُحصت حدودها. اجعل الفحوصات أوامر تعمل قبل كل دمج.',
            content: `
                <h2>قاعدة لا يفحصها أحد تتوقف عن كونها قاعدة</h2>
                <p>تعمل الكتلة المعيارية ما دامت وحداتها منفصلة. والقاعدة سهلة الصياغة: تتواصل الوحدات عبر العقود لا عبر الأجزاء الداخلية لبعضها. وهي سهلة الكسر كذلك، استيرادًا مريحًا بعد آخر، وكل كسر يبدو بريئًا في المراجعة.</p>

                <h2>ثلاثة أماكن يظهر فيها الانحراف</h2>
                <ul>
                    <li><strong>حدود الوحدات:</strong> وحدة تدخل في مجلدات وحدة أخرى بدل عقدها العام.</li>
                    <li><strong>الكود:</strong> فئات في مجال تعتمد مباشرة على فئات في مجال آخر.</li>
                    <li><strong>قاعدة البيانات:</strong> مفتاح أجنبي أو join يربط جداول وحدتين، فيصبح فصلهما لاحقًا مستحيلًا.</li>
                </ul>

                <h2>اجعل كل فحص أمرًا</h2>
                <p>الفحص الذي يجب تذكّره سيُنسى. أما الأمر فيعمل في hook وفي CI. يستحق كل انحراف من الثلاثة فحصًا خاصًا، مع أمر يطبّق سياسة المعمارية ويعطي درجة، وآخر يلتقط صورة للمشهد كله ليظهر ما تغيّر بين الإصدارات.</p>

                <h2>أبلِغ أولًا ثم امنع</h2>
                <p>عند تشغيل فحص جديد على كود قائم تظهر مخالفات موجودة أصلًا. منع كل شيء من اليوم الأول يوقف الفريق. سجّل الوضع الحالي كخط أساس، وافشل فقط عند المخالفات الجديدة، ثم اخفض خط الأساس مع الوقت.</p>

                <h2>شغّلها قبل الدمج</h2>
                <p>أرخص وقت لإصلاح مخالفة حدود هو قبل أن تدخل. يعطي pre-commit hook المطوّر الجواب والتغيير ما زال في ذهنه، وتلتقط الأوامر نفسها في CI ما تجاوز الـ hook.</p>

                <h2>في منتجاتنا</h2>
                <p>تقدّم RumuzePMO هذه الفحوصات كأوامر artisan: فحص للمعمارية، وفحص لحدود الوحدات والاعتماد في الكود والاعتماد في قاعدة البيانات، ولقطة معمارية بين الوحدات. وتتضمن pre-commit hook لفحوصات المعمارية يُثبَّت بسكربت واحد، فتُفرض القاعدة بالأدوات لا بالذاكرة.</p>
            `
        }
    },
    {
        id: 'health-checks-release-order',
        slug: 'health-checks-release-order',
        date: '2026-10-04',
        author: 'Mohamed Ashraf',
        category: 'tech',
        readTime: 5,
        image: '/assets/images/blog/health-checks-release-order.jpg',
        en: {
            title: 'Health Checks and a Fixed Release Order for a Docker Stack',
            excerpt: 'A deploy is not finished when the command returns. Check health at every layer, wait with a timeout, and keep the release steps in one order.',
            content: `
                <h2>A returned command is not a healthy system</h2>
                <p>A deploy script that exits with zero has only proved that its commands ran. The containers may be restarting, the database may still be starting, or the application may be up and unable to reach its queue. Health has to be asked, not assumed.</p>

                <h2>Ask at every layer</h2>
                <p>One check at the front door hides which layer is failing. Give each service its own check, close to what it does: the application process answers a ping, the web server serves a health path, the database answers a ping, the cache answers a ping. When something is red, the check already says where.</p>

                <h2>Wait with a timeout</h2>
                <p>Services take time to become ready, so a script should poll instead of sleeping for a guessed number of seconds. Poll every couple of seconds, stop at a clear limit, and fail with a message naming the service. A deploy that waits forever is as bad as one that does not wait.</p>

                <h2>Keep the release steps in one order</h2>
                <p>The order matters. Migrate the schema first, because the new code may need it. Rebuild caches next, so they describe the new code. Reload the workers so they stop running the old code. Verify the health endpoint last, because it is the proof that everything above worked. Write the order down once and let the script own it.</p>

                <h2>Separate "alive" from "which version"</h2>
                <p>A health check says the system is alive. It does not say what is running. A small version endpoint, separate from the health check, answers the question you ask right after a release: did the new build go live?</p>

                <h2>In our own products</h2>
                <p>The Rveta stack gives the application, the web server, MySQL and Redis each their own container check, and its bootstrap script waits for services to report healthy within a timeout before continuing. RumuzePMO's deploy script follows the order above and ends by checking its health route. Rumuze Core exposes its running version on an internal endpoint that is separate from its health check.</p>
            `
        },
        ar: {
            title: 'فحوصات الصحة وترتيب ثابت للإصدار في بيئة Docker',
            excerpt: 'النشر لا ينتهي عند عودة الأمر. افحص الصحة في كل طبقة، وانتظر بمهلة، وأبقِ خطوات الإصدار بترتيب واحد.',
            content: `
                <h2>عودة الأمر لا تعني نظامًا سليمًا</h2>
                <p>سكربت النشر الذي ينتهي بصفر أثبت فقط أن أوامره عملت. قد تكون الحاويات تعيد التشغيل، أو قاعدة البيانات ما زالت تبدأ، أو التطبيق يعمل ولا يصل إلى الطابور. الصحة تُسأل ولا تُفترض.</p>

                <h2>اسأل في كل طبقة</h2>
                <p>فحص واحد عند الباب الأمامي يخفي أي طبقة تفشل. أعطِ كل خدمة فحصها الخاص القريب مما تفعله: عملية التطبيق تجيب على ping، وخادم الويب يخدم مسار صحة، وقاعدة البيانات تجيب على ping، والكاش كذلك. وحين يظهر الأحمر يقول الفحص أين المشكلة.</p>

                <h2>انتظر بمهلة</h2>
                <p>تحتاج الخدمات وقتًا لتصبح جاهزة، فعلى السكربت أن يستعلم بدل أن ينام عددًا مخمّنًا من الثواني. استعلم كل ثانيتين تقريبًا، وتوقف عند حد واضح، وافشل برسالة تسمّي الخدمة. نشر ينتظر إلى الأبد سيئ كنشر لا ينتظر.</p>

                <h2>أبقِ خطوات الإصدار بترتيب واحد</h2>
                <p>الترتيب مهم. رحّل المخطط أولًا لأن الكود الجديد قد يحتاجه. ثم أعد بناء الكاش ليصف الكود الجديد. ثم أعد تشغيل العمّال ليتوقفوا عن تشغيل الكود القديم. وتحقق من نقطة الصحة أخيرًا لأنها دليل أن كل ما سبق نجح. اكتب الترتيب مرة واحدة ودع السكربت يملكه.</p>

                <h2>افصل «حي» عن «أي إصدار»</h2>
                <p>فحص الصحة يقول إن النظام حي، ولا يقول ما الذي يعمل. نقطة إصدار صغيرة منفصلة عن فحص الصحة تجيب على السؤال الذي تطرحه بعد كل إصدار: هل نُشر البناء الجديد؟</p>

                <h2>في منتجاتنا</h2>
                <p>تعطي بيئة Rveta كلًا من التطبيق وخادم الويب وMySQL وRedis فحص حاوية خاصًا، ويقوم سكربت التهيئة فيها بانتظار الخدمات حتى تصبح سليمة ضمن مهلة قبل المتابعة. ويتبع سكربت نشر RumuzePMO الترتيب أعلاه وينتهي بفحص مسار الصحة. وتعرض Rumuze Core الإصدار العامل على نقطة داخلية منفصلة عن فحص الصحة.</p>
            `
        }
    },
    {
        id: 'device-token-lifecycle',
        slug: 'device-token-lifecycle',
        date: '2026-10-04',
        author: 'Mohamed Ashraf',
        category: 'tech',
        readTime: 6,
        image: '/assets/images/blog/device-token-lifecycle.jpg',
        en: {
            title: 'Device Tokens: Expiry, Revocation and Rotation',
            excerpt: 'A paired device is not a signed-in user. Name every way its token can fail, rotate without locking it out, and never show the token.',
            content: `
                <h2>A device is not a user</h2>
                <p>An app that pairs a device to a backend holds a long-lived credential that nobody types. It can expire, be revoked by an administrator, or belong to a device that was suspended. If the app treats all of these as "something went wrong", the person using it cannot tell what to do next.</p>

                <h2>Name every failure</h2>
                <p>Give each backend answer its own state: token missing, invalid, expired or revoked, and device revoked, inactive or suspended. Map them in one place, so every screen shows the same, correct message and offers the right action: pair again, wait for reactivation, or contact an administrator.</p>

                <h2>Rotate without locking the device out</h2>
                <p>Rotation replaces the credential before it becomes a problem. The order is what keeps the device connected: receive the new token, store it securely, then refresh the session state. Clearing the local session is a separate, deliberate action. It removes what is on the device and says so before it does, and it does not pretend to revoke anything on the server.</p>

                <h2>Never show the token</h2>
                <p>A token must not appear in the interface, in logs, or in an error message. Screens read a presentation status from the mapper instead of raw backend text or headers, which removes the easiest way for a secret to leak.</p>

                <h2>Two credentials, two jobs</h2>
                <p>When a person operates a device, there are two identities: the device and the person acting through it. Keep two credentials with documented rules for which request carries which, and never let the person's token stand in for the device's.</p>

                <h2>Keep command polling honest</h2>
                <p>Before a real background runtime exists, a foreground poll is the honest version. It runs on a visible timer while the screen is open, stops when the session is no longer authenticated, executes only commands it understands, and reports the rest as unsupported instead of guessing.</p>

                <h2>In our own products</h2>
                <p>Rveta Connector, still in development, follows this: seven distinct token and device states, rotation that stores the new token before refreshing, a local clear that does not touch the server, separate actor and device credentials, and a 30-second foreground poll that runs only ping and a status refresh. It has no native gateway runtime yet, and its pages say so.</p>
            `
        },
        ar: {
            title: 'رموز الأجهزة: انتهاء الصلاحية والإلغاء والتدوير',
            excerpt: 'الجهاز المقترن ليس مستخدمًا مسجّلًا. سمِّ كل طرق فشل رمزه، وأدِّر الرمز دون أن تُقفل الجهاز، ولا تعرض الرمز أبدًا.',
            content: `
                <h2>الجهاز ليس مستخدمًا</h2>
                <p>التطبيق الذي يقرن جهازًا بالخادم يحمل بيانات اعتماد طويلة العمر لا يكتبها أحد. قد تنتهي صلاحيتها، أو يلغيها مسؤول، أو تخص جهازًا أُوقف. وإن عاملها التطبيق كلها على أنها «حدث خطأ» فلن يعرف المستخدم ماذا يفعل بعد ذلك.</p>

                <h2>سمِّ كل فشل</h2>
                <p>أعطِ كل جواب من الخادم حالته: الرمز مفقود أو غير صالح أو منتهي أو ملغى، والجهاز ملغى أو غير نشط أو موقوف. حوّلها في مكان واحد ليعرض كل شاشة الرسالة الصحيحة نفسها ويقترح الإجراء المناسب: اقتران جديد، أو انتظار إعادة التفعيل، أو التواصل مع المسؤول.</p>

                <h2>دوّر دون أن تُقفل الجهاز</h2>
                <p>التدوير يستبدل بيانات الاعتماد قبل أن تصبح مشكلة. والترتيب هو ما يبقي الجهاز متصلًا: استلم الرمز الجديد، ثم خزّنه بأمان، ثم حدّث حالة الجلسة. أما مسح الجلسة المحلية فإجراء منفصل ومقصود، يزيل ما على الجهاز ويقول ذلك قبل أن يفعل، ولا يدّعي أنه ألغى شيئًا على الخادم.</p>

                <h2>لا تعرض الرمز أبدًا</h2>
                <p>يجب ألا يظهر الرمز في الواجهة ولا في السجلات ولا في رسالة خطأ. تقرأ الشاشات حالة العرض من المحوِّل بدل نص الخادم الخام أو ترويساته، فيزول أسهل طريق لتسريب سر.</p>

                <h2>بيانات اعتماد اثنتان لمهمتين</h2>
                <p>حين يشغّل شخص جهازًا توجد هويتان: الجهاز والشخص الذي يعمل عبره. أبقِ بيانات اعتماد منفصلة مع قواعد موثقة لأي طلب يحمل أيًّا منها، ولا تدع رمز الشخص يحل محل رمز الجهاز.</p>

                <h2>اجعل استعلام الأوامر صادقًا</h2>
                <p>قبل وجود تشغيل خلفي حقيقي، يكون الاستعلام في المقدمة هو النسخة الصادقة. يعمل بمؤقّت ظاهر ما دامت الشاشة مفتوحة، ويتوقف حين لا تعود الجلسة موثّقة، وينفّذ فقط الأوامر التي يفهمها، ويبلغ عن الباقي بأنه غير مدعوم بدل أن يخمّن.</p>

                <h2>في منتجاتنا</h2>
                <p>يتبع Rveta Connector، وهو ما زال قيد التطوير، هذا النهج: سبع حالات متمايزة للرمز والجهاز، وتدوير يخزّن الرمز الجديد قبل التحديث، ومسح محلي لا يمس الخادم، وبيانات اعتماد منفصلة للممثل والجهاز، واستعلام في المقدمة كل 30 ثانية ينفّذ ping وتحديث الحالة فقط. وليس له تشغيل أصلي للبوابة بعد، وصفحاته تقول ذلك.</p>
            `
        }
    },
    {
        id: 'answer-engine-optimization-basics',
        slug: 'answer-engine-optimization-basics',
        date: '2026-10-04',
        author: 'Mohamed Ashraf',
        category: 'marketing',
        readTime: 6,
        image: '/assets/images/blog/answer-engine-optimization-basics.jpg',
        en: {
            title: 'Answer Engines: What AEO and GEO Actually Change',
            excerpt: 'Answer engines read your site and summarise it for someone else. Most of AEO and GEO is making that reading easy and accurate.',
            content: `
                <h2>The reader is no longer only a person</h2>
                <p>Search engines list pages. Answer engines read pages and write an answer, often without the visitor ever opening your site. Whether your company is described correctly in that answer depends on how readable and consistent your site is to a machine. That is the whole subject of answer-engine optimisation (AEO) and generative-engine optimisation (GEO).</p>

                <h2>Start with pages a crawler can read</h2>
                <p>If the content only exists after JavaScript runs, many crawlers see an empty page. Render the page's real content into the HTML that is served, so the first response already contains the headings, the text, and the links.</p>

                <h2>Say who you are in one consistent place</h2>
                <p>Answer engines combine many sources. If your name, location, services and contact details differ between your site, your profiles and your listings, the summary will be a blend of them. Pick one wording and use it everywhere, starting with a clear description of what the company does on the home page.</p>

                <h2>Structured data must match the visible page</h2>
                <p>JSON-LD helps a machine read a page, but only when it describes what a visitor can also see. Questions and answers in structured data should be the same ones printed on the page. Data that claims more than the page does is a reason to be ignored.</p>

                <h2>Write answers, not slogans</h2>
                <p>A page that opens with the direct answer to a question, then explains it, is easy to quote. Use headings that are real questions or clear statements, keep each section to one idea, and avoid claims you cannot support, because an engine will repeat them.</p>

                <h2>Give crawlers and models a summary</h2>
                <p>A plain-text file such as llms.txt at the site root can summarise the company and link to the key pages for language models. It is a convenience, not a ranking switch, and it is only useful if it is accurate. Keep robots rules explicit about which crawlers are welcome.</p>

                <h2>On our own site</h2>
                <p>This site renders every public page to static HTML at build time in both languages, generates its structured data from the same content shown on the page, lists the search and answer-engine crawlers it welcomes in robots.txt, and publishes an llms.txt summary. None of this promises a result: it removes reasons for a machine to misread us.</p>
            `
        },
        ar: {
            title: 'محركات الإجابة: ما الذي تغيّره AEO وGEO فعلاً',
            excerpt: 'محركات الإجابة تقرأ موقعك وتلخصه لشخص آخر. وأغلب AEO وGEO أن تجعل هذه القراءة سهلة ودقيقة.',
            content: `
                <h2>القارئ لم يعد شخصاً فقط</h2>
                <p>محركات البحث تسرد الصفحات. أما محركات الإجابة فتقرأ الصفحات وتكتب إجابة، وغالباً دون أن يفتح الزائر موقعك أصلاً. ووصف شركتك في تلك الإجابة بشكل صحيح يعتمد على مدى وضوح موقعك واتساقه للآلة. وهذا هو موضوع تحسين محركات الإجابة (AEO) وتحسين المحركات التوليدية (GEO) كله.</p>

                <h2>ابدأ بصفحات يستطيع الزاحف قراءتها</h2>
                <p>إن كان المحتوى لا يظهر إلا بعد تشغيل JavaScript فإن زواحف كثيرة ترى صفحة فارغة. اعرض المحتوى الحقيقي للصفحة داخل HTML المُقدَّم، فتحتوي الاستجابة الأولى على العناوين والنص والروابط.</p>

                <h2>قل من أنت في مكان واحد متسق</h2>
                <p>تجمع محركات الإجابة بين مصادر كثيرة. فإن اختلف اسمك وموقعك وخدماتك وبيانات التواصل بين موقعك وحساباتك وقوائمك، جاء الملخص مزيجاً منها. اختر صياغة واحدة واستخدمها في كل مكان، بدءاً بوصف واضح لما تفعله الشركة في الصفحة الرئيسية.</p>

                <h2>يجب أن تطابق البيانات المنظمة الصفحة المرئية</h2>
                <p>يساعد JSON-LD الآلة على قراءة الصفحة، لكن فقط حين يصف ما يراه الزائر أيضاً. وينبغي أن تكون الأسئلة والأجوبة في البيانات المنظمة هي نفسها المطبوعة في الصفحة. فالبيانات التي تدّعي أكثر مما تقوله الصفحة سبب لتجاهلها.</p>

                <h2>اكتب إجابات لا شعارات</h2>
                <p>الصفحة التي تبدأ بالإجابة المباشرة عن سؤال ثم تشرحها سهلة الاقتباس. استخدم عناوين هي أسئلة حقيقية أو عبارات واضحة، واجعل كل قسم لفكرة واحدة، وتجنب ادعاءات لا تستطيع إثباتها لأن المحرك سيكررها.</p>

                <h2>أعطِ الزواحف والنماذج ملخصاً</h2>
                <p>يمكن لملف نصي مثل llms.txt في جذر الموقع أن يلخص الشركة ويربط بصفحاتها الرئيسية للنماذج اللغوية. وهو تسهيل لا مفتاح ترتيب، ولا يفيد إلا إذا كان دقيقاً. وأبقِ قواعد robots صريحة بشأن الزواحف المرحَّب بها.</p>

                <h2>في موقعنا</h2>
                <p>يعرض هذا الموقع كل صفحة عامة كـ HTML ثابت وقت البناء باللغتين، ويولّد بياناته المنظمة من المحتوى نفسه المعروض في الصفحة، ويسرد في robots.txt زواحف البحث والإجابة المرحَّب بها، وينشر ملخص llms.txt. لا شيء من هذا يعد بنتيجة: هو يزيل أسباب سوء قراءة الآلة لنا.</p>
            `
        }
    },
    {
        id: 'arabic-seo-is-not-translated-seo',
        slug: 'arabic-seo-is-not-translated-seo',
        date: '2026-10-04',
        author: 'Mohamed Ashraf',
        category: 'marketing',
        readTime: 5,
        image: '/assets/images/blog/arabic-seo-is-not-translated-seo.jpg',
        en: {
            title: 'Arabic SEO Is Not Translated English SEO',
            excerpt: 'People search in Arabic differently from English. Treat each language as its own search target, with its own metadata and content.',
            content: `
                <h2>Two audiences, two sets of queries</h2>
                <p>A translated page answers the English query in Arabic words. It does not answer the question an Arabic speaker would type. Arabic has spelling variants, dialect words, and phrasing that differs from English even when the meaning is the same. Search for each language separately, with its own keyword research.</p>

                <h2>Give each language its own address</h2>
                <p>Put each language on its own URL, for example a /ar path, rather than switching the language with a cookie or a script. Search engines index addresses, so a language that only appears after a click can be invisible.</p>

                <h2>Link the versions with hreflang</h2>
                <p>Tell search engines that the English and Arabic pages are versions of each other. Each page should list both alternates and point to itself, and the sitemap should carry the same pairs. Without this, the two pages can compete or the wrong one can be shown.</p>

                <h2>Write the metadata in Arabic</h2>
                <p>Title, description, headings and structured data should be written for the Arabic page, not copied in English. A search result in the wrong language, or a title cut off by a long translation, loses the click.</p>

                <h2>Check right-to-left layout is part of quality</h2>
                <p>Mirrored layout, correct punctuation, and numbers that read properly are part of how a page is judged by visitors. Slow or broken Arabic pages lose people before the content has a chance.</p>

                <h2>On our own site</h2>
                <p>Every public page here exists at its own English and Arabic address, links both with hreflang and in the sitemap, and has Arabic titles, descriptions and headings written for it. Arabic uses its own font files, loaded before the first paint, so the page appears quickly.</p>
            `
        },
        ar: {
            title: 'SEO بالعربية ليس SEO إنجليزياً مترجماً',
            excerpt: 'يبحث الناس بالعربية بطريقة تختلف عن الإنجليزية. تعامل مع كل لغة كهدف بحث مستقل ببياناتها الوصفية ومحتواها.',
            content: `
                <h2>جمهوران وصيغتا استعلام</h2>
                <p>الصفحة المترجمة تجيب عن الاستعلام الإنجليزي بكلمات عربية، ولا تجيب عن السؤال الذي سيكتبه متحدث العربية. فللعربية تنويعات إملائية وكلمات لهجية وصياغة تختلف عن الإنجليزية حتى مع تطابق المعنى. ابحث لكل لغة على حدة، ولكلٍ منها بحث كلمات مفتاحية خاص.</p>

                <h2>أعطِ كل لغة عنوانها</h2>
                <p>ضع كل لغة على عنوان URL خاص، مثل مسار /ar، بدل تبديل اللغة بملف تعريف ارتباط أو سكربت. فمحركات البحث تفهرس العناوين، واللغة التي لا تظهر إلا بعد نقرة قد تكون غير مرئية.</p>

                <h2>اربط النسختين بـ hreflang</h2>
                <p>أخبر محركات البحث أن الصفحتين الإنجليزية والعربية نسختان من بعضهما. ينبغي أن تسرد كل صفحة البديلين وتشير إلى نفسها، وأن تحمل خريطة الموقع الأزواج نفسها. بدون ذلك قد تتنافس الصفحتان أو تظهر الصفحة الخاطئة.</p>

                <h2>اكتب البيانات الوصفية بالعربية</h2>
                <p>يجب أن يُكتب العنوان والوصف والعناوين الفرعية والبيانات المنظمة للصفحة العربية لا أن تُنسخ بالإنجليزية. فنتيجة بحث بلغة خاطئة أو عنوان مقطوع بسبب ترجمة طويلة يخسر النقرة.</p>

                <h2>التخطيط من اليمين لليسار جزء من الجودة</h2>
                <p>التخطيط المعكوس وعلامات الترقيم الصحيحة والأرقام المقروءة جزء من حكم الزوار على الصفحة. والصفحات العربية البطيئة أو المكسورة تخسر الناس قبل أن تتاح للمحتوى فرصة.</p>

                <h2>في موقعنا</h2>
                <p>كل صفحة عامة هنا لها عنوانها الإنجليزي والعربي، وتربطهما hreflang وخريطة الموقع، ولها عناوين وأوصاف عربية مكتوبة لها. وتستخدم العربية ملفات خطوطها الخاصة التي تُحمَّل قبل أول رسم، فتظهر الصفحة بسرعة.</p>
            `
        }
    },
    {
        id: 'track-leads-before-ad-spend',
        slug: 'track-leads-before-ad-spend',
        date: '2026-10-04',
        author: 'Mohamed Ashraf',
        category: 'marketing',
        readTime: 5,
        image: '/assets/images/blog/track-leads-before-ad-spend.jpg',
        en: {
            title: 'Set Up Lead Tracking Before You Spend on Ads',
            excerpt: 'Ad reports that count clicks cannot tell you which campaign produced a customer. Decide what counts as a lead and measure it first.',
            content: `
                <h2>A click is not a lead</h2>
                <p>Most ad dashboards report impressions and clicks because those are easy to count. A business cares about enquiries and sales. Until the second kind of number is measured, spending more cannot be judged to have worked or not.</p>

                <h2>Decide what counts as a result</h2>
                <p>Write down the events that matter: a submitted form, a click on a phone number, a message sent on a chat button, a booked call. Agree on them before the campaign starts, and give each a name that will not change.</p>

                <h2>Capture where the lead came from</h2>
                <p>Record the source when a lead arrives: the campaign tag in the address, or at minimum the page and referrer. A form that records the source, the type of enquiry and the market lets you compare channels without asking customers to remember.</p>

                <h2>Count the leads that do not arrive through the form</h2>
                <p>Phone calls and chat messages are often the majority of enquiries for service businesses and are the easiest to miss. Track clicks on call and chat buttons as events, and keep a simple way to log calls that come in directly.</p>

                <h2>Respect consent</h2>
                <p>Do not record visitors before they agree where agreement is required. Measure what you are allowed to, say what you record, and make declining the same effort as accepting. Reports built on consented data are smaller and trustworthy.</p>

                <h2>Test the tracking before the budget</h2>
                <p>Submit a test enquiry from a phone, from a desktop, in Arabic and in English, and confirm that each one appears with the right source. A small test costs nothing; a month of untracked spend does.</p>

                <h2>On our own site</h2>
                <p>Our contact form records the type of enquiry, the market, the systems in use and the source of each request, and visit tracking only starts after a visitor accepts. We use the same approach when we set up measurement for clients.</p>
            `
        },
        ar: {
            title: 'جهّز تتبع العملاء المحتملين قبل أن تنفق على الإعلانات',
            excerpt: 'تقارير الإعلانات التي تعدّ النقرات لا تخبرك أي حملة جلبت عميلاً. حدد ما يُعدّ عميلاً محتملاً وقِسه أولاً.',
            content: `
                <h2>النقرة ليست عميلاً</h2>
                <p>تعرض أغلب لوحات الإعلانات مرات الظهور والنقرات لأنها سهلة العد. أما النشاط التجاري فيهمه الاستفسارات والمبيعات. وإلى أن يُقاس النوع الثاني من الأرقام لا يمكن الحكم بأن زيادة الإنفاق نجحت أو لم تنجح.</p>

                <h2>حدد ما يُعدّ نتيجة</h2>
                <p>اكتب الأحداث المهمة: نموذج مُرسَل، أو نقرة على رقم هاتف، أو رسالة عبر زر محادثة، أو مكالمة محجوزة. اتفق عليها قبل بدء الحملة وأعطِ كلًّا منها اسماً لا يتغير.</p>

                <h2>سجّل مصدر العميل المحتمل</h2>
                <p>سجّل المصدر عند وصول العميل: وسم الحملة في العنوان، أو على الأقل الصفحة والمُحيل. والنموذج الذي يسجل المصدر ونوع الاستفسار والسوق يتيح لك مقارنة القنوات دون أن تطلب من العملاء تذكّرها.</p>

                <h2>عدّ العملاء الذين لا يصلون عبر النموذج</h2>
                <p>المكالمات الهاتفية ورسائل المحادثة غالباً أكثر الاستفسارات لدى شركات الخدمات وأسهلها فوتاً. تتبع النقرات على أزرار الاتصال والمحادثة كأحداث، وأبقِ طريقة بسيطة لتسجيل المكالمات الواردة مباشرة.</p>

                <h2>احترم الموافقة</h2>
                <p>لا تسجّل الزوار قبل أن يوافقوا حيث تكون الموافقة مطلوبة. قِس ما يُسمح لك به، وقل ما تسجله، واجعل الرفض بنفس سهولة القبول. التقارير المبنية على بيانات موافَق عليها أصغر لكنها موثوقة.</p>

                <h2>اختبر التتبع قبل الميزانية</h2>
                <p>أرسل استفساراً تجريبياً من الهاتف ومن الحاسوب، بالعربية وبالإنجليزية، وتأكد أن كلًّا منها يظهر بالمصدر الصحيح. اختبار صغير لا يكلف شيئاً، أما شهر من الإنفاق غير المتتبَّع فيكلف.</p>

                <h2>في موقعنا</h2>
                <p>يسجل نموذج التواصل لدينا نوع الاستفسار والسوق والأنظمة المستخدمة ومصدر كل طلب، ولا يبدأ تتبع الزيارات إلا بعد موافقة الزائر. ونستخدم النهج نفسه عند إعداد القياس للعملاء.</p>
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
