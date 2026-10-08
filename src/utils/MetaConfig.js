/**
 * Enterprise-Grade SEO Metadata Configuration
 * 
 * Centralized metadata management for all routes with:
 * - Bilingual support (EN/AR)
 * - Intelligent fallbacks
 * - Optimized OG images
 * - Marketing-oriented descriptions (120-160 chars)
 */

const BASE_URL = 'https://www.rumuze.com';
const BRAND_NAME = 'Rumuze';
const OG_IMAGE_VERSION = '2026-10c';

/**
 * Page-specific metadata configuration
 * Each route has EN and AR variants with optimized content
 */
const META_CONFIG = {
    '/': {
        en: {
            title: `${BRAND_NAME} | Software and Digital Marketing for Gulf and MENA Businesses`,
            description: 'Rumuze is a software and digital marketing company. We build platforms and mobile apps and run SEO, ads, and content for Gulf and MENA businesses.',
            keywords: 'software and digital marketing company, custom software development, SaaS platform development, Flutter mobile apps, backend development, Saudi Arabia, UAE, MENA',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze - Software Engineering'
        },
        ar: {
            title: 'رموز | برمجيات وتسويق رقمي لشركات الخليج والمنطقة',
            description: 'رموز شركة برمجيات وتسويق رقمي: نبني منصات وتطبيقات موبايل وندير SEO والإعلانات والمحتوى لشركات الخليج والمنطقة.',
            keywords: 'شركة برمجيات وتسويق رقمي, تطوير برمجيات مخصصة, تطوير منصات SaaS, تطبيقات Flutter, تطوير أنظمة خلفية, السعودية, الإمارات',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'رموز - هندسة البرمجيات'
        }
    },
    '/services': {
        en: {
            title: `Services | ${BRAND_NAME}`,
            description: 'Custom software and SaaS, Flutter mobile apps, backend and API platforms, and system integrations, built in Arabic and English.',
            keywords: 'software development services, SaaS development, Flutter app development, backend development, API integration',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Services - Software Engineering'
        },
        ar: {
            title: `الخدمات | ${BRAND_NAME}`,
            description: 'برمجيات مخصصة وSaaS وتطبيقات Flutter ومنصات خلفية وواجهات API وتكامل بين الأنظمة، بالعربية والإنجليزية.',
            keywords: 'خدمات تطوير البرمجيات, تطوير SaaS, تطبيقات Flutter, تطوير أنظمة خلفية, تكامل API',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'خدمات رموز - هندسة البرمجيات'
        }
    },
    '/portfolio': {
        en: {
            title: `Our Work | ${BRAND_NAME}`,
            description: 'Platforms we design, build, and operate: a modular ERP and CRM SaaS, a delivery operations platform, an event-driven platform kernel, and a device control app.',
            keywords: 'software portfolio, SaaS platform, Laravel, NestJS, Flutter, delivery platform',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Work - Products Built by Rumuze'
        },
        ar: {
            title: `أعمالنا | ${BRAND_NAME}`,
            description: 'منصات نصممها ونبنيها ونشغّلها: منصة ERP وCRM معيارية، ومنصة لعمليات التوصيل، ونواة منصة قائمة على الأحداث، وتطبيق للتحكم بالأجهزة.',
            keywords: 'أعمال رموز, منصة SaaS, Laravel, NestJS, Flutter, منصة توصيل',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'أعمال رموز - منتجات بنتها رموز'
        }
    },
    '/process': {
        en: {
            title: `How We Work | ${BRAND_NAME}`,
            description: 'How a Rumuze project moves from first request to handover: architecture choices, module checks, a fixed release order, and what you receive.',
            keywords: 'software development process, modular monolith, release process, handover documentation',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'How Rumuze works'
        },
        ar: {
            title: `كيف نعمل | ${BRAND_NAME}`,
            description: 'كيف يتحرك مشروع رموز من أول طلب إلى التسليم: خيارات المعمارية وفحوصات الوحدات وترتيب ثابت للإصدار وما تتسلمه.',
            keywords: 'عملية تطوير البرمجيات, كتلة معيارية, عملية الإصدار, وثائق التسليم',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'كيف تعمل رموز'
        }
    },
    '/about': {
        en: {
            title: `About | ${BRAND_NAME}`,
            description: 'Learn who is behind Rumuze, how we work, and the products we build and run ourselves.',
            keywords: 'about rumuze, software and digital marketing company Cairo, Rumuze founder, Rumuze technology stack',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'About Rumuze'
        },
        ar: {
            title: `من نحن | ${BRAND_NAME}`,
            description: 'تعرف على من يقف وراء رموز وكيف نعمل والمنتجات التي نبنيها ونشغّلها بأنفسنا.',
            keywords: 'عن رموز, شركة برمجيات وتسويق رقمي القاهرة, مؤسس رموز, تقنيات رموز',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'عن رموز'
        }
    },
    '/blog': {
        en: {
            title: `Insights | ${BRAND_NAME}`,
            description: 'Articles on software architecture, multilingual systems, and engineering practice from the Rumuze team.',
            keywords: 'software architecture articles, modular monolith, engineering blog',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Blog - Engineering Insights'
        },
        ar: {
            title: `مقالات | ${BRAND_NAME}`,
            description: 'مقالات عن معمارية البرمجيات والأنظمة متعددة اللغات والممارسات الهندسية من فريق رموز.',
            keywords: 'مقالات معمارية البرمجيات, مدونة هندسية',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'مدونة رموز - مقالات هندسية'
        }
    },
    '/labs': {
        en: {
            title: `Tools | ${BRAND_NAME}`,
            description: 'Small free tools built by Rumuze, starting with a QR code generator.',
            keywords: 'free tools, QR code generator, developer tools',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Tools'
        },
        ar: {
            title: `الأدوات | ${BRAND_NAME}`,
            description: 'أدوات مجانية صغيرة صنعتها رموز للمطورين والفرق، تبدأ بمولّد رموز QR.',
            keywords: 'أدوات مجانية, مولد رموز QR, أدوات المطورين',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'أدوات رموز'
        }
    },
    '/contact': {
        en: {
            title: `Contact Us | ${BRAND_NAME}`,
            description: 'Tell us what you want to build, fix, or take over. We read every request and reply by email.',
            keywords: 'contact rumuze, start a software project, technical review',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Contact Rumuze'
        },
        ar: {
            title: `تواصل معنا | ${BRAND_NAME}`,
            description: 'أخبرنا بما تريد بناءه أو إصلاحه أو تسلّمه. نقرأ كل طلب ونرد عليه بالبريد الإلكتروني.',
            keywords: 'تواصل مع رموز, ابدأ مشروع برمجي, مراجعة تقنية',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'تواصل مع رموز'
        }
    },
    '/privacy': {
        en: {
            title: `Privacy Policy | ${BRAND_NAME}`,
            description: 'How Rumuze collects, uses, and protects information submitted through this website.',
            keywords: 'privacy policy, data protection, personal data',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Privacy Policy'
        },
        ar: {
            title: `سياسة الخصوصية | ${BRAND_NAME}`,
            description: 'كيف تجمع رموز المعلومات المرسلة عبر هذا الموقع وتستخدمها وتحميها.',
            keywords: 'سياسة الخصوصية, حماية البيانات, البيانات الشخصية',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'سياسة الخصوصية لرموز'
        }
    },
    '/terms': {
        en: {
            title: `Terms of Service | ${BRAND_NAME}`,
            description: 'Master Services Agreement governing Rumuze partnerships. Intellectual property rights, liability terms, and service standards.',
            keywords: 'terms of service, service agreement, legal terms, intellectual property, liability',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Terms of Service - Legal Framework'
        },
        ar: {
            title: `شروط الخدمة | ${BRAND_NAME}`,
            description: 'اتفاقية الخدمات الرئيسية التي تحكم شراكات روموز. حقوق الملكية الفكرية، شروط المسؤولية، ومعايير الخدمة.',
            keywords: 'شروط الخدمة, اتفاقية الخدمة, شروط قانونية, الملكية الفكرية, المسؤولية',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'شروط الخدمة لروموز - الإطار القانوني'
        }
    },
    '/404': {
        en: {
            title: `Page Not Found | ${BRAND_NAME}`,
            description: 'The page you\'re looking for doesn\'t exist. Explore Rumuze\'s services and products.',
            keywords: '404, page not found, rumuze',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze - Page Not Found'
        },
        ar: {
            title: `الصفحة غير موجودة | ${BRAND_NAME}`,
            description: 'الصفحة التي تبحث عنها غير موجودة. استكشف خدمات رموز ومنتجاتها.',
            keywords: '404, صفحة غير موجودة, روموز',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'روموز - الصفحة غير موجودة'
        }
    },
    '/saudi-arabia': {
        en: {
            title: `Software Development in Saudi Arabia | ${BRAND_NAME}`,
            description: 'Rumuze builds custom platforms, mobile apps, and backend systems for businesses in Saudi Arabia, with Arabic-first interfaces and regional payment integration.',
            keywords: 'software development Saudi Arabia, custom software Riyadh, Arabic app development, Flutter Saudi Arabia',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze - Software Development for Saudi Arabia'
        },
        ar: {
            title: `تطوير البرمجيات في السعودية | ${BRAND_NAME}`,
            description: 'تبني رموز منصات مخصصة وتطبيقات موبايل وأنظمة خلفية لشركات في السعودية، بواجهات عربية أولاً وتكامل مع بوابات الدفع الإقليمية.',
            keywords: 'تطوير برمجيات السعودية, برمجيات مخصصة الرياض, تطوير تطبيقات عربية, Flutter السعودية',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'رموز - تطوير البرمجيات للسعودية'
        }
    },
    '/qr-generator': {
        en: {
            title: `Free QR Code Generator With Logo | ${BRAND_NAME}`,
            description: 'Generate high quality QR codes with embedded logos. A free tool from Rumuze. Custom colors, instant PNG download, no sign-up.',
            keywords: 'QR code generator, QR code with logo, free QR generator, branded QR code, QR code download PNG, developer tools',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free QR Code Generator With Logo - Rumuze'
        },
        ar: {
            title: `مولد رمز QR مجاني مع شعار | ${BRAND_NAME}`,
            description: 'أنشئ رموز QR عالية الجودة مع شعارات مدمجة. أداة مجانية من رموز. ألوان مخصصة، تحميل PNG فوري، بدون تسجيل.',
            keywords: 'مولد رمز QR, رمز QR مع شعار, مولد QR مجاني, رمز QR مميز, تحميل QR PNG, أدوات المطور',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'مولد رمز QR مجاني مع شعار - رموز'
        }
    },
    '/whatsapp-link-generator': {
        en: {
            title: `Free WhatsApp Link Generator | ${BRAND_NAME}`,
            description: 'Make a wa.me link that opens a WhatsApp chat with your number and a message already written. Free, no sign-up, runs in your browser.',
            keywords: 'WhatsApp link generator, wa.me link, WhatsApp link with message, click to chat link, WhatsApp QR code',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free WhatsApp Link Generator - Rumuze'
        },
        ar: {
            title: `مولد رابط واتساب مجاني | ${BRAND_NAME}`,
            description: 'اصنع رابط wa.me يفتح محادثة واتساب مع رقمك برسالة مكتوبة مسبقاً. مجاني، بدون تسجيل، ويعمل داخل متصفحك.',
            keywords: 'مولد رابط واتساب, رابط واتساب برسالة, رابط wa.me, رابط محادثة واتساب, رمز QR واتساب',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'مولد رابط واتساب مجاني - رموز'
        }
    },
    '/utm-builder': {
        en: {
            title: `Free UTM Link Builder | ${BRAND_NAME}`,
            description: 'Add UTM campaign tags to any link so analytics shows where each visit came from. Free, no sign-up, and nothing you type leaves your browser.',
            keywords: 'UTM builder, UTM link generator, campaign URL builder, Google Analytics UTM, utm_source utm_medium utm_campaign',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free UTM Link Builder - Rumuze'
        },
        ar: {
            title: `منشئ روابط UTM مجاني | ${BRAND_NAME}`,
            description: 'أضف وسوم UTM إلى أي رابط لتعرف من أين جاءت كل زيارة في التحليلات. مجاني وبدون تسجيل، ولا يغادر ما تكتبه متصفحك.',
            keywords: 'منشئ روابط UTM, مولد UTM, وسوم UTM, روابط الحملات, Google Analytics',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'منشئ روابط UTM مجاني - رموز'
        }
    },
    '/serp-preview': {
        en: {
            title: `Free Google Result Preview and Length Checker | ${BRAND_NAME}`,
            description: 'Preview how a page title and meta description may look in Google on desktop and mobile, and check their length. Works with Arabic. Free.',
            keywords: 'SERP preview, Google snippet preview, title length checker, meta description length, meta description checker',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free Google Result Preview - Rumuze'
        },
        ar: {
            title: `معاينة نتيجة جوجل وفاحص الطول مجاناً | ${BRAND_NAME}`,
            description: 'شاهد كيف قد يظهر عنوان الصفحة ووصفها في جوجل على الحاسوب والجوال، وتحقق من طولهما. يدعم العربية. مجاني.',
            keywords: 'معاينة نتيجة جوجل, فاحص طول العنوان, طول الوصف, meta description, SERP preview',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'معاينة نتيجة جوجل مجاناً - رموز'
        }
    },
    '/hijri-date-converter': {
        en: {
            title: `Free Hijri to Gregorian Date Converter | ${BRAND_NAME}`,
            description: 'Convert between Hijri and Gregorian dates, see the weekday, the whole Hijri month and the moon phase. Umm al-Qura calendar. Free, in your browser.',
            keywords: 'Hijri converter, Hijri to Gregorian, Gregorian to Hijri, Umm al-Qura calendar, Islamic date converter',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free Hijri Date Converter - Rumuze'
        },
        ar: {
            title: `محوّل التاريخ الهجري والميلادي مجاناً | ${BRAND_NAME}`,
            description: 'حوّل بين التاريخ الهجري والميلادي، وشاهد اليوم وتقويم الشهر الهجري وطور القمر. بتقويم أم القرى. مجاني ويعمل في متصفحك.',
            keywords: 'تحويل التاريخ, هجري إلى ميلادي, ميلادي إلى هجري, تقويم أم القرى, محول التاريخ الهجري',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'محوّل التاريخ الهجري والميلادي مجاناً - رموز'
        }
    },
    '/schema-generator': {
        en: {
            title: `Free JSON-LD Structured Data Generator | ${BRAND_NAME}`,
            description: 'Generate JSON-LD structured data for an organization, local business, FAQ or article, with checks as you type. Free, and nothing you type leaves your browser.',
            keywords: 'JSON-LD generator, schema markup generator, structured data generator, FAQ schema, local business schema, organization schema',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free JSON-LD Structured Data Generator - Rumuze'
        },
        ar: {
            title: `مولّد البيانات المنظمة JSON-LD مجاناً | ${BRAND_NAME}`,
            description: 'أنشئ بيانات JSON-LD المنظمة لشركة أو نشاط محلي أو أسئلة شائعة أو مقال، مع فحص أثناء الكتابة. مجاني ولا يغادر ما تكتبه متصفحك.',
            keywords: 'مولد JSON-LD, مولد schema, البيانات المنظمة, schema للأسئلة الشائعة, schema للنشاط المحلي',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'مولّد البيانات المنظمة JSON-LD مجاناً - رموز'
        }
    },
    '/project-brief-writer': {
        en: {
            title: `Free Project Brief Writer | ${BRAND_NAME}`,
            description: 'Answer a few questions and get a clear project brief for a website, store, app or campaign that you can send to any agency. Free, no sign-up.',
            keywords: 'project brief template, website brief, creative brief generator, web project brief, brief writer',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free Project Brief Writer - Rumuze'
        },
        ar: {
            title: `كاتب موجز المشروع مجاناً | ${BRAND_NAME}`,
            description: 'أجب عن بضعة أسئلة واحصل على موجز مشروع واضح لموقع أو متجر أو تطبيق أو حملة، ترسله لأي شركة. مجاني وبدون تسجيل.',
            keywords: 'نموذج موجز مشروع, بريف مشروع, بريف موقع, كتابة بريف, موجز المشروع',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'كاتب موجز المشروع مجاناً - رموز'
        }
    },
    '/vat-calculator': {
        en: {
            title: `Free VAT Calculator for the Gulf, Egypt and Jordan | ${BRAND_NAME}`,
            description: 'Add VAT to a price or take it out of one for Saudi Arabia, the UAE, Bahrain, Oman, Egypt and Jordan, or use your own rate. Free, in your browser.',
            keywords: 'VAT calculator, Saudi VAT calculator, UAE VAT calculator, add VAT, remove VAT, VAT inclusive exclusive',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free VAT Calculator - Rumuze'
        },
        ar: {
            title: `حاسبة ضريبة القيمة المضافة مجاناً | ${BRAND_NAME}`,
            description: 'أضف ضريبة القيمة المضافة إلى سعر أو استخرجها منه للسعودية والإمارات والبحرين وعُمان ومصر والأردن، أو بنسبة تحددها. مجانية وتعمل في متصفحك.',
            keywords: 'حاسبة ضريبة القيمة المضافة, حاسبة الضريبة السعودية, حساب الضريبة 15%, استخراج الضريبة من السعر, ضريبة القيمة المضافة الإمارات',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'حاسبة ضريبة القيمة المضافة مجاناً - رموز'
        }
    },
    '/ad-budget-calculator': {
        en: {
            title: `Free Ad Budget Calculator | ${BRAND_NAME}`,
            description: 'Work out what a number of sales or leads will cost, or what a budget can buy, from your own conversion rate and cost per click. Free, in your browser.',
            keywords: 'ad budget calculator, advertising budget calculator, cost per acquisition calculator, ROAS calculator, break-even ROAS',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free Ad Budget Calculator - Rumuze'
        },
        ar: {
            title: `حاسبة ميزانية الإعلانات مجاناً | ${BRAND_NAME}`,
            description: 'اعرف تكلفة عدد من المبيعات أو العملاء المحتملين، أو ما تشتريه ميزانيتك، من نسبة تحويلك وتكلفة النقرة. مجانية وتعمل في متصفحك.',
            keywords: 'حاسبة ميزانية الإعلانات, حاسبة تكلفة الإعلان, حاسبة ROAS, تكلفة اكتساب العميل, ميزانية الحملة الإعلانية',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'حاسبة ميزانية الإعلانات مجاناً - رموز'
        }
    },
    '/image-compressor': {
        en: {
            title: `Free Image Compressor: JPEG, PNG and WebP | ${BRAND_NAME}`,
            description: 'Make JPEG, PNG and WebP images smaller and compare the result with a slider. Your images are processed in your browser and never uploaded. Free.',
            keywords: 'image compressor, compress images online, reduce image size, convert to WebP, compress JPEG, compress PNG',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free Image Compressor - Rumuze'
        },
        ar: {
            title: `ضاغط الصور مجاناً: JPEG وPNG وWebP | ${BRAND_NAME}`,
            description: 'صغّر حجم صور JPEG وPNG وWebP وقارن النتيجة بشريط. تُعالج الصور داخل متصفحك ولا تُرفع أبداً. مجاني.',
            keywords: 'ضغط الصور, تصغير حجم الصورة, تحويل إلى WebP, ضغط صور JPEG, ضغط صور PNG, ضاغط صور اونلاين',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'ضاغط الصور مجاناً - رموز'
        }
    },
    '/email-signature-generator': {
        en: {
            title: `Free Email Signature Generator | ${BRAND_NAME}`,
            description: 'Make a clean HTML email signature for Gmail and Outlook, see it as you type, and copy it ready to paste. Free, and nothing you type leaves your browser.',
            keywords: 'email signature generator, HTML email signature, Gmail signature, Outlook signature, professional email signature',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free Email Signature Generator - Rumuze'
        },
        ar: {
            title: `مولّد توقيع البريد الإلكتروني مجاناً | ${BRAND_NAME}`,
            description: 'اصنع توقيع بريد HTML أنيقاً لـ Gmail وOutlook، وشاهده وأنت تكتب، وانسخه جاهزاً للصق. مجاني ولا يغادر ما تكتبه متصفحك.',
            keywords: 'مولد توقيع البريد, توقيع ايميل, توقيع Gmail, توقيع Outlook, توقيع بريد احترافي',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'مولّد توقيع البريد الإلكتروني مجاناً - رموز'
        }
    },
    '/palette-from-image': {
        en: {
            title: `Free Color Palette from Image | ${BRAND_NAME}`,
            description: 'Pick the main colors of a logo or photo with their HEX, RGB and HSL codes, and check text contrast on each one. Your image is never uploaded. Free.',
            keywords: 'color palette from image, extract colors from image, logo color picker, hex color extractor, contrast checker',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free Color Palette from Image - Rumuze'
        },
        ar: {
            title: `استخراج ألوان من صورة مجاناً | ${BRAND_NAME}`,
            description: 'استخرج الألوان الرئيسية لشعار أو صورة برموز HEX وRGB وHSL، وتحقق من تباين النص فوق كل لون. لا تُرفع صورتك أبداً. مجاني.',
            keywords: 'استخراج الألوان من صورة, لوحة ألوان من صورة, ألوان الشعار, رمز HEX للون, فاحص التباين',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'استخراج ألوان من صورة مجاناً - رموز'
        }
    },
    '/social-share-preview': {
        en: {
            title: `Free Social Share Preview and Open Graph Tags | ${BRAND_NAME}`,
            description: 'See how a link may look on WhatsApp, X, LinkedIn and Facebook, and copy the Open Graph and Twitter Card meta tags. Free, in your browser.',
            keywords: 'social share preview, Open Graph preview, og tags generator, WhatsApp link preview, Twitter card preview, LinkedIn preview',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free Social Share Preview - Rumuze'
        },
        ar: {
            title: `معاينة المشاركة الاجتماعية ووسوم Open Graph مجاناً | ${BRAND_NAME}`,
            description: 'شاهد كيف قد يظهر رابطك في واتساب وX ولينكدإن وفيسبوك، وانسخ وسوم Open Graph وTwitter Card. مجاني ويعمل في متصفحك.',
            keywords: 'معاينة المشاركة, وسوم Open Graph, معاينة رابط واتساب, بطاقة تويتر, معاينة لينكدإن',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'معاينة المشاركة الاجتماعية مجاناً - رموز'
        }
    },
    '/word-counter': {
        en: {
            title: `Free Word and Character Counter for Arabic and English | ${BRAND_NAME}`,
            description: 'Count words, characters, sentences and reading time, see the most used words, and check common length limits. Works for Arabic. Free, in your browser.',
            keywords: 'word counter, character counter, Arabic word counter, reading time calculator, keyword density checker, character limit checker',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free Word and Character Counter - Rumuze'
        },
        ar: {
            title: `عدّاد الكلمات والحروف مجاناً | ${BRAND_NAME}`,
            description: 'عدّ الكلمات والحروف والجمل ووقت القراءة، وشاهد أكثر الكلمات تكراراً، وراجع حدود الطول الشائعة. يدعم العربية. مجاني ويعمل في متصفحك.',
            keywords: 'عداد الكلمات, عداد الحروف, حساب عدد الكلمات, وقت القراءة, كثافة الكلمات المفتاحية, عدد الاحرف',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'عدّاد الكلمات والحروف مجاناً - رموز'
        }
    },
    '/robots-txt-sitemap-generator': {
        en: {
            title: `Free Robots.txt and Sitemap.xml Generator | ${BRAND_NAME}`,
            description: 'Build a robots.txt and a sitemap.xml, check the rules, and test whether a crawler may open a path. Free, and nothing you type leaves your browser.',
            keywords: 'robots.txt generator, sitemap generator, sitemap.xml generator, robots.txt tester, block AI crawlers robots.txt',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free Robots.txt and Sitemap Generator - Rumuze'
        },
        ar: {
            title: `مولّد robots.txt وخريطة الموقع sitemap.xml مجاناً | ${BRAND_NAME}`,
            description: 'ابنِ ملفي robots.txt وsitemap.xml، وراجع القواعد، واختبر هل يستطيع زاحف فتح مسار. مجاني ولا يغادر ما تكتبه متصفحك.',
            keywords: 'مولد robots.txt, مولد خريطة الموقع, sitemap.xml, اختبار robots.txt, حظر زواحف الذكاء الاصطناعي',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'مولّد robots.txt وخريطة الموقع مجاناً - رموز'
        }
    },
    '/invoice-generator': {
        en: {
            title: `Free Invoice Generator with VAT | ${BRAND_NAME}`,
            description: 'Make a clean invoice with VAT per line, then print it or save it as a PDF from your browser. Free, no sign-up, and nothing you type leaves your browser.',
            keywords: 'invoice generator, free invoice maker, invoice with VAT, invoice template, create invoice PDF online',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free Invoice Generator - Rumuze'
        },
        ar: {
            title: `مولّد فواتير مجاني بالضريبة | ${BRAND_NAME}`,
            description: 'اصنع فاتورة أنيقة بضريبة لكل بند، ثم اطبعها أو احفظها PDF من متصفحك. مجاني وبدون تسجيل، ولا يغادر ما تكتبه متصفحك.',
            keywords: 'مولد فواتير, انشاء فاتورة, فاتورة بالضريبة, نموذج فاتورة, فاتورة PDF مجانا',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'مولّد الفواتير مجاناً - رموز'
        }
    },
    '/json-formatter': {
        en: {
            title: `Free JSON Formatter and Validator | ${BRAND_NAME}`,
            description: 'Check JSON, find the exact line of a mistake, then format, minify or sort it. Free, no sign-up, and nothing you paste leaves your browser.',
            keywords: 'JSON formatter, JSON validator, JSON beautifier, minify JSON, JSON error line',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free JSON Formatter - Rumuze'
        },
        ar: {
            title: `منسّق JSON ومدقّقه مجاناً | ${BRAND_NAME}`,
            description: 'افحص JSON واعرف سطر الخطأ بدقة، ثم نسّقه أو ضغطه أو رتّب مفاتيحه. مجاني وبدون تسجيل، ولا يغادر ما تلصقه متصفحك.',
            keywords: 'منسق JSON, مدقق JSON, تنسيق JSON, ضغط JSON, فحص JSON',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'منسّق JSON مجاناً - رموز'
        }
        },
    '/favicon-generator': {
        en: {
            title: `Free Favicon Generator | ${BRAND_NAME}`,
            description: 'Make a favicon from letters, an emoji or a picture, with every size, favicon.ico and the code to paste. Free, and your picture never leaves your browser.',
            keywords: 'favicon generator, favicon.ico generator, apple touch icon, favicon from text, favicon from image',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free Favicon Generator - Rumuze'
        },
        ar: {
            title: `مولّد أيقونة الموقع Favicon مجاناً | ${BRAND_NAME}`,
            description: 'اصنع أيقونة الموقع من حروف أو إيموجي أو صورة، بكل الأحجام وملف favicon.ico والكود الجاهز. مجاني ولا تغادر صورتك متصفحك.',
            keywords: 'مولد favicon, ايقونة الموقع, favicon.ico, انشاء فافيكون, ايقونة التبويب',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'مولّد أيقونة الموقع مجاناً - رموز'
        }
        },
    '/css-unit-converter': {
        en: {
            title: `Free CSS Unit Converter and Fluid Type Calculator | ${BRAND_NAME}`,
            description: 'Convert px to rem, build a type scale, and write a clamp() size that grows smoothly with the screen. Free, and worked out in your browser.',
            keywords: 'px to rem, rem to px, css clamp generator, fluid typography calculator, type scale generator',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free CSS Unit Converter - Rumuze'
        },
        ar: {
            title: `محوّل وحدات CSS وحاسبة الخط المتجاوب مجاناً | ${BRAND_NAME}`,
            description: 'حوّل px إلى rem، وابنِ سلّم خطوط، واكتب حجماً بـ clamp() يكبر بسلاسة مع الشاشة. مجاني ويُحسب في متصفحك.',
            keywords: 'تحويل px الى rem, مولد clamp, خط متجاوب, سلم خطوط CSS, محول وحدات css',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'محوّل وحدات CSS مجاناً - رموز'
        }
        }
};

/**
 * Fallback metadata for undefined routes
 */
const FALLBACK_META = {
    en: {
        title: `${BRAND_NAME} | Software and Digital Marketing for Gulf and MENA Businesses`,
        description: 'Rumuze is a software and digital marketing company. We build platforms and mobile apps and run SEO, ads, and content for Gulf and MENA businesses.',
        keywords: 'software and digital marketing company, custom software, mobile apps, rumuze',
        image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
        imageAlt: 'Rumuze - Software Engineering'
    },
    ar: {
        title: `${BRAND_NAME} | برمجيات وتسويق رقمي لشركات الخليج والمنطقة`,
        description: 'رموز شركة برمجيات وتسويق رقمي: نبني منصات وتطبيقات موبايل وندير SEO والإعلانات والمحتوى لشركات الخليج والمنطقة.',
        keywords: 'شركة برمجيات وتسويق رقمي, برمجيات مخصصة, تطبيقات موبايل, رموز',
        image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
        imageAlt: 'رموز - هندسة البرمجيات'
    }
};

/**
 * Normalize path for metadata lookup
 * Handles English routes (/en/...) and trailing slashes
 */
function normalizePath(path) {
    if (!path) return '/';
    if (path === '/') return '/';
    if (path === '/en') return '/'; // Special case for the English home

    // Remove trailing slash
    let normalized = path.replace(/\/$/, '');

    // Remove /en prefix for lookup (but we might need it for the final URL)
    // The lookup key in META_CONFIG is always clean (e.g. '/services')
    const withoutPrefix = normalized.replace(/^\/en(?=\/|$)/, '') || '/';

    return withoutPrefix;
}

/**
 * Filter and format query parameters for canonical URLs
 * Only allows specific parameters that change page content significantly
 */
function getCanonicalQueryString(searchParams) {
    if (!searchParams) return '';

    const ALLOWED_PARAMS = ['page'];
    const params = new URLSearchParams(searchParams);
    const filteredParams = new URLSearchParams();

    ALLOWED_PARAMS.forEach(key => {
        if (params.has(key)) {
            filteredParams.set(key, params.get(key));
        }
    });

    const queryString = filteredParams.toString();
    return queryString ? `?${queryString}` : '';
}

/**
 * Get metadata for a specific route and language
 * 
 * @param {string} path - Current route path
 * @param {string} lang - Language code ('en' or 'ar')
 * @param {string} queryString - URL query string (optional, e.g. '?page=2')
 * @returns {Object} Metadata object with title, description, image, etc.
 */
export function getMetaForRoute(path, lang = 'ar', queryString = '') {
    const normalizedKey = normalizePath(path); // Key for config lookup (e.g. '/services')
    const language = lang === 'ar' ? 'ar' : 'en';



    // Special handling for root to avoid double slash if not needed, 
    // but normalizePath above handles logic.
    // Let's simplify:
    // 1. Strip trailing slash
    let cleanUrlPath = path === '/' ? '/' : path.replace(/\/$/, '');

    // 2. Add query params
    const canonicalQuery = getCanonicalQueryString(queryString);
    const fullCanonicalUrl = `${BASE_URL}${cleanUrlPath}${canonicalQuery}`;

    // Try exact match first
    if (META_CONFIG[normalizedKey]) {
        return {
            ...META_CONFIG[normalizedKey][language],
            url: fullCanonicalUrl,
            type: 'website'
        };
    }

    // Try partial matches for dynamic routes
    const matchingRoute = Object.keys(META_CONFIG).find(route => {
        if (route === '/') return false;
        return normalizedKey.startsWith(route);
    });

    if (matchingRoute) {
        return {
            ...META_CONFIG[matchingRoute][language],
            url: fullCanonicalUrl,
            type: 'website'
        };
    }

    // Fallback to default metadata
    return {
        ...FALLBACK_META[language],
        url: fullCanonicalUrl,
        type: 'website'
    };
}

/**
 * Validate that all required meta fields are present
 * Used in development to catch missing metadata
 * 
 * @param {Object} meta - Metadata object to validate
 * @returns {Array} Array of missing field names
 */
export function validateMetadata(meta) {
    const requiredFields = [
        'title',
        'description',
        'image',
        'url',
        'type'
    ];

    const missing = requiredFields.filter(field => !meta[field]);

    // Additional validation
    if (meta.description && (meta.description.length < 120 || meta.description.length > 160)) {
        console.warn(`[SEO] Description length (${meta.description.length}) should be 120-160 characters for optimal display`);
    }

    if (meta.image && !meta.image.startsWith('https://')) {
        console.warn('[SEO] OG image should use HTTPS for security');
    }

    return missing;
}


