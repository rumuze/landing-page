# Rumuze Professional Execution Plan

Date: 2026-04-08

## 1. Goal

الهدف من هذه الخطة هو رفع المشروع من موقع "فكرة قوية + تنفيذ جيد جزئيًا" إلى موقع "شركة موثوقة، مقنعة، وقابلة للمنافسة فعليًا" من خلال:

- رفع الثقة والمصداقية
- إصلاح الفجوات التقنية الحرجة
- توحيد الرسالة التسويقية
- تحسين التحويل التجاري
- بناء أدلة إثبات حقيقية تدعم التموضع

## 2. Success Definition

يُعتبر المشروع نجح في هذه الخطة عندما تتحقق الشروط التالية:

1. لا توجد placeholders أو بيانات ثقة مكسورة داخل الواجهة أو الكود.
2. الـSEO technical layer متسق وصحيح وقابل للفهرسة بثقة.
3. الرسالة الرئيسية واضحة: ماذا تقدم Rumuze، لمن، وما القيمة المختلفة.
4. يوجد funnel واضح من الزيارة إلى الطلب إلى الـqualification.
5. توجد دراسات حالة وأدلة proof حقيقية أو موصوفة بوضوح كـillustrative.
6. الواجهة الرئيسية لا تبالغ في claims لا يمكن إثباتها.

## 3. Execution Model

الخطة مقسمة إلى 4 مسارات عمل متوازية:

1. Trust & Credibility
2. Technical Core & SEO Integrity
3. Positioning, Messaging & Conversion
4. Proof, Case Studies & Growth Engine

الأولوية التنفيذية:

- أولًا: P0 الثقة + السلامة + صحة الإشارات التقنية
- ثانيًا: P1 التموضع + التحويل + الرسالة
- ثالثًا: P2 الأدلة + محرك النمو + التوسع

## 4. Phase Plan

## Phase 0: Stabilization
مدة مقترحة: 3 إلى 5 أيام

### الهدف

إغلاق أي شيء يضرب الثقة أو يعرض المشروع لمخاطر مباشرة.

### المهام

1. إزالة أي secrets أو fallback credentials من الكود.
2. مراجعة كل بيانات التواصل والسوشيال.
3. حذف أو استبدال أي `href="#"`.
4. استبدال أي أرقام placeholder أو بيانات غير حقيقية.
5. مراجعة أي claims حرجة لا يوجد لها إثبات مباشر.

### مخرجات المرحلة

- نسخة آمنة من الكود
- واجهة بدون بيانات placeholder
- قائمة claims مع حالة كل claim:
  - verified
  - internal benchmark
  - illustrative

### معايير القبول

- لا توجد credentials داخل source code
- لا توجد روابط وهمية في الواجهة
- لا يوجد رقم هاتف placeholder
- كل claim حساس له تصنيف واضح

## Phase 1: Technical Integrity
مدة مقترحة: 5 إلى 7 أيام

### الهدف

ضبط البنية التقنية بحيث تكون متسقة مع صورة المشروع الاحترافية.

### المهام

1. إصلاح `hreflang` generation.
2. توحيد `supportedLocales` مع اللغات الفعلية فقط.
3. توسيع `sitemap` ليشمل:
   - case studies
   - service detail pages
   - comparison pages
   - blog posts
   - authority pages
4. إصلاح metadata layer:
   - دعم `overrideMeta` فعليًا أو إزالة استخدامه
5. مراجعة schema injection لمنع التكرار.
6. تحديد استراتيجية واضحة للـprerender:
   - إما تفعيلها فعليًا
   - أو إزالة الاعتماد التسويقي عليها
7. مراجعة PWA caching strategy وتقليل حجم precache إن أمكن.

### مخرجات المرحلة

- SEO layer نظيفة
- alternate links صحيحة
- sitemap كاملة
- metadata behavior موحد
- قرار واضح حول prerender

### معايير القبول

- كل صفحة رئيسية لها canonical صحيح
- alternate links صحيحة للـEN/AR فقط
- sitemap تشمل كل الصفحات المراد فهرستها
- لا يوجد schema duplication ظاهر
- build ينجح بدون regressions

## Phase 2: Positioning & Messaging
مدة مقترحة: 7 إلى 10 أيام

### الهدف

تحويل Rumuze من "خطاب ذكي لكنه واسع" إلى "عرض واضح، حاد، ومقنع".

### المهام

1. تحديد ICP الأساسي بدقة:
   - مثال مبدئي:
     - شركات B2B في الخليج ومصر
     - شركات تحتاج موقع/منصة + CRM/ERP + attribution
     - شركات تريد bilingual execution + measurable growth
2. صياغة رسالة رئيسية واحدة للـhomepage:
   - من نحن
   - لمن نعمل
   - ماذا نبني
   - ما النتيجة
3. تقليل اللغة المتضخمة غير المدعومة:
   - إزالة أو تهدئة عبارات market dominance / prove results إن لم تكن مدعومة
4. إعادة بناء sections الرئيسية على الصفحة الرئيسية:
   - Hero
   - Proof
   - Services
   - Why Rumuze
   - Case Studies
   - CTA
5. توحيد نبرة البراند بين:
   - homepage
   - about
   - services
   - case studies
   - footer

### مخرجات المرحلة

- Messaging framework
- Homepage copy framework
- ICP definition
- Brand tone guide مصغرة

### معايير القبول

- الزائر يفهم خلال 5 إلى 8 ثوان:
  - ماذا تقدم Rumuze
  - هل Rumuze مناسبة له
  - لماذا تختلف
- لا يوجد تناقض بين الصفحات الرئيسية
- لا توجد claims كبيرة بلا إثبات مبدئي

## Phase 3: Conversion Architecture
مدة مقترحة: 5 إلى 8 أيام

### الهدف

تحويل الموقع من "عرض براند" إلى "نظام تحويل فعلي".

### المهام

1. تحويل الـCTA من general contact إلى offers واضحة:
   - Discovery Session
   - Architecture Assessment
   - Revenue Infrastructure Audit
2. إعادة تصميم نموذج التواصل ليدعم qualification:
   - company
   - project type
   - budget range
   - timeline
   - challenge type
3. تحديد success flow بعد الإرسال:
   - thank-you state
   - expected next step
   - response SLA
4. ربط كل CTA بنية واضحة داخل المحتوى.
5. مراجعة Contact section لتصبح:
   - أكثر مهنية
   - أقل generic
   - أكثر إقناعًا

### مخرجات المرحلة

- CTA strategy موحدة
- lead intake form محسّن
- structured inquiry flow

### معايير القبول

- كل CTA يؤدي إلى مسار مفهوم
- النموذج يجمع بيانات تساعد على qualification
- نصوص التواصل تعكس professionalism حقيقي

## Phase 4: Proof Layer
مدة مقترحة: 7 إلى 14 يوم

### الهدف

بناء الطبقة التي تجعل Rumuze قابلة للتصديق، لا مجرد مثيرة للاهتمام.

### المهام

1. مراجعة كل case studies الموجودة وتقسيمها إلى:
   - verified
   - composite
   - illustrative
2. إطلاق 2 إلى 3 case studies قوية فقط في البداية.
3. إزالة أو تخفيف الـaggregate metrics إذا لم تكن موثقة.
4. إعادة بناء Portfolio page لتصبح:
   - evidence-driven
   - مرتبطة بدراسات الحالة
   - بدون generic Unsplash-first feeling
5. إضافة proof blocks مثل:
   - measurable outcomes
   - engagement model
   - process snapshots
   - testimonials حقيقية أو حذفها إن لم تتوفر

### مخرجات المرحلة

- proof system واضح
- case studies موثقة أو labeled بوضوح
- portfolio page أقوى تجاريًا

### معايير القبول

- لا توجد أرقام كبيرة غير مفهومة المصدر
- كل دراسة حالة تحمل درجة وضوح عالية
- proof layer تدعم الرسالة بدل أن تضعفها

## Phase 5: Content Authority Engine
مدة مقترحة: 2 إلى 4 أسابيع

### الهدف

بناء authority حقيقي قابل للنمو على المدى المتوسط.

### المهام

1. مراجعة المدونة وتنظيف HTML والمحتوى العربي.
2. إعادة صياغة المقالات لتكون:
   - أقل انفعالية
   - أكثر professional authority
   - أكثر ربطًا بالـICP
3. إنشاء content map من 6 إلى 12 موضوعًا يخدم:
   - SaaS architecture
   - bilingual platforms
   - CRM / ERP implementation
   - attribution & SEO infrastructure
   - enterprise delivery governance
4. ربط المقالات بالـservices والـcase studies.
5. بناء internal linking واضح بين:
   - homepage
   - service pages
   - authority pages
   - case studies
   - blog

### مخرجات المرحلة

- editorial roadmap
- articles محسنة
- internal linking plan

### معايير القبول

- كل مقال يخدم هدفًا تجاريًا أو authority goal واضحًا
- المحتوى العربي نظيف ومتماسك
- المقالات تدفع الزائر نحو CTA أو proof page

## 5. Sprint Breakdown

## Sprint 1

التركيز:

- secrets cleanup
- placeholders cleanup
- contact/social credibility fixes
- claims classification

Done when:

- لا توجد بيانات مكسورة
- كل صفحة أساسية صالحة للنشر من منظور الثقة الأولية

## Sprint 2

التركيز:

- hreflang
- sitemap
- metadata
- schema cleanup
- prerender decision

Done when:

- SEO integrity layer مستقرة ومراجعة

## Sprint 3

التركيز:

- homepage messaging rewrite
- ICP definition
- CTA restructuring

Done when:

- homepage قادرة تشرح الشركة بوضوح وتقود الفعل

## Sprint 4

التركيز:

- contact qualification
- proof blocks
- portfolio/case study improvements

Done when:

- الموقع يقدم proof مقنعًا ويجمع leads أفضل

## Sprint 5

التركيز:

- content authority engine
- blog cleanup
- linking strategy

Done when:

- المحتوى يخدم النمو وليس مجرد ملء صفحات

## 6. KPI Framework

يجب قياس الخطة بمؤشرات محددة:

### Technical KPIs

- build success rate
- number of SEO integrity issues المفتوحة
- عدد الصفحات الصحيحة داخل sitemap
- عدد metadata/schema issues
- حجم precache النهائي

### Trust KPIs

- عدد placeholders المتبقية
- عدد claims غير المصنفة
- عدد الروابط غير الحقيقية
- نسبة صفحات proof-backed

### Commercial KPIs

- عدد الـqualified inquiries
- conversion rate من homepage إلى contact
- conversion rate من CTA إلى submit
- نسبة leads المطابقة للـICP

### Authority KPIs

- عدد case studies الموثقة
- عدد المقالات عالية الجودة المنشورة
- branded search growth
- internal link depth and coverage

## 7. Team / Ownership Model

إذا كان التنفيذ solo founder أو فريق صغير، فالتقسيم التالي مناسب:

### Owner 1: Product / Founder

- ICP
- messaging
- offers
- case study truthfulness
- commercial priority decisions

### Owner 2: Engineering

- SEO layer
- metadata
- sitemap
- schema
- form flow
- technical cleanup

### Owner 3: Content / Growth

- content cleanup
- proof page copy
- blog roadmap
- internal linking

إذا لم يوجد إلا شخص واحد، يتم التنفيذ بنفس الترتيب لكن بدون تبديل الأولوية.

## 8. Risks

### Risk 1

الاستمرار في claims أكبر من الأدلة.

التعامل:

- لا claim بدون classification
- لا رقم بدون source note داخلي

### Risk 2

تضييع الوقت في polish بصري قبل إصلاح الثقة.

التعامل:

- لا design pass قبل إغلاق P0 وP1

### Risk 3

التوسع في صفحات وخدمات قبل تثبيت العرض الأساسي.

التعامل:

- التركيز على 2 إلى 3 offers فقط في المرحلة الحالية

### Risk 4

تحسين SEO شكليًا بدون proof layer.

التعامل:

- SEO + proof يجب أن يتحركا معًا

## 9. Recommended Order of Real Work Inside This Repo

هذا هو الترتيب العملي المقترح داخل المشروع نفسه:

1. `functions/api/contact.js`
2. `src/components/Contact.jsx`
3. `src/components/Footer.jsx`
4. `src/config/entity.ts`
5. `src/seo/linking.ts`
6. `src/config/siteCoreConfig.ts`
7. `scripts/generate-sitemap.js`
8. `src/components/SEO.jsx`
9. `src/pages/HomePage.jsx`
10. `src/components/Hero.jsx`
11. `src/components/HomepageMetricsBar.jsx`
12. `src/components/HomepageDifferentiationSection.jsx`
13. `src/components/HomepageCTASection.jsx`
14. `src/pages/PortfolioPage.jsx`
15. `src/pages/CaseStudiesPage.jsx`
16. `src/data/blogPosts.js`
17. `src/pages/BlogPost.jsx`

## 10. Final Recommendation

أفضل تنفيذ احترافي للخطة ليس أن نحاول "تكبير" المشروع فورًا، بل أن نعمل على هذا التسلسل:

- Clean
- Align
- Clarify
- Prove
- Convert
- Scale

وبشكل عملي:

- الأسبوع الأول: نظافة وثقة
- الأسبوع الثاني: صحة تقنية وSEO
- الأسبوع الثالث: تموضع ورسالة
- الأسبوع الرابع: تحويل وتجميع leads
- الشهر الثاني: proof + content engine

## 11. Immediate Next Action

أول خطوة تنفيذية يجب أن تبدأ الآن:

- تنفيذ Sprint 1 كاملًا

لأن أي تسويق أو تحسين أعمق قبل إغلاق مشاكل الثقة الحالية سيكون مبنيًا على أرضية غير مستقرة.

