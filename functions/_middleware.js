export async function onRequest(context) {
    const { request, next } = context;
    const url = new URL(request.url);
    const path = url.pathname;

    // Language Detection
    const isAr = path.startsWith('/ar');
    const lang = isAr ? 'ar' : 'en';

    // Meta Data Configuration
    const getMetaData = (path, lang) => {
        const isAr = lang === 'ar';
        const siteName = isAr ? "روموز" : "Rumuze";

        const defaults = {
            en: {
                title: "Rumuze | Elite Technology & Digital Growth",
                description: "Decoding technology, scaling brands. Professional software development and data-driven marketing growth strategies.",
            },
            ar: {
                title: "رموز | التكنولوجيا النخبوية والنمو الرقمي",
                description: "فك رموز التكنولوجيا، وتوسيع نطاق العلامات التجارية. تطوير برمجيات احترافي واستراتيجيات نمو تسويقي قائمة على البيانات.",
            }
        };

        const pages = {
            services: {
                en: { title: "Services | Enterprise Software & Growth", description: "Bespoke engineering and high-performance marketing processes." },
                ar: { title: "الخدمات | برمجيات المؤسسات والنمو", description: "هندسة برمجية متخصصة وعمليات تسويقية فائقة الأداء." }
            },
            about: {
                en: { title: "About Us | The Bridge Between Code & Creative", description: "Learn about the Rumuze story and our founder's vision." },
                ar: { title: "عن الشركة | الجسر بين الرمز والإبداع", description: "تعرف على قصة رموز ورؤية مؤسسنا." }
            },
            blog: {
                en: { title: "Blog | Insights & Case Studies", description: "Technical deep-dives and strategic growth analysis from Rumuze." },
                ar: { title: "المدونة | الرؤى ودراسات الحالة", description: "تحليلات تقنية معمقة واستراتيجيات نمو مدروسة من رموز." }
            }
        };

        let pageKey = 'default';
        if (path.includes('/services')) pageKey = 'services';
        else if (path.includes('/about')) pageKey = 'about';
        else if (path.includes('/blog')) pageKey = 'blog';

        if (pageKey === 'default') return defaults[lang];
        return {
            title: `${pages[pageKey][lang].title} | ${siteName}`,
            description: pages[pageKey][lang].description
        };
    };

    const currentMeta = getMetaData(path, lang);
    const baseUrl = "https://rumuze.com";
    const ogImage = `${baseUrl}/rumuze.png`;
    const canonicalUrl = `${baseUrl}${path}`;

    const response = await next();

    // Only rewrite if it's an HTML response
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
        return response;
    }

    return new HTMLRewriter()
        .on("html", {
            element(e) {
                e.setAttribute("lang", lang);
                if (isAr) e.setAttribute("dir", "rtl");
            }
        })
        .on("title", {
            element(e) {
                e.setInnerContent(currentMeta.title);
            }
        })
        .on("head", {
            element(e) {
                const tags = [
                    `<meta name="description" content="${currentMeta.description}">`,
                    `<link rel="canonical" href="${canonicalUrl}">`,
                    `<link rel="alternate" hreflang="en" href="${baseUrl}${path.replace('/ar', '') || '/'}">`,
                    `<link rel="alternate" hreflang="ar" href="${baseUrl}/ar${path.replace('/ar', '') || ''}">`,
                    `<link rel="alternate" hreflang="x-default" href="${baseUrl}${path.replace('/ar', '') || '/'}">`,

                    // Open Graph
                    `<meta property="og:title" content="${currentMeta.title}">`,
                    `<meta property="og:description" content="${currentMeta.description}">`,
                    `<meta property="og:image" content="${ogImage}">`,
                    `<meta property="og:url" content="${canonicalUrl}">`,
                    `<meta property="og:type" content="website">`,
                    `<meta property="og:site_name" content="Rumuze">`,
                    `<meta property="og:locale" content="${isAr ? 'ar_EG' : 'en_US'}">`,

                    // Twitter
                    `<meta name="twitter:card" content="summary_large_image">`,
                    `<meta name="twitter:title" content="${currentMeta.title}">`,
                    `<meta name="twitter:description" content="${currentMeta.description}">`,
                    `<meta name="twitter:image" content="${ogImage}">`,
                    `<meta name="twitter:site" content="@rumuze">`
                ];

                e.append(tags.join('\n'), { html: true });
            }
        })
        .on('meta[name="description"]', { element(e) { e.remove(); } })
        .on('meta[property^="og:"]', { element(e) { e.remove(); } })
        .on('meta[name^="twitter:"]', { element(e) { e.remove(); } })
        .on('link[rel="canonical"]', { element(e) { e.remove(); } })
        .on('link[rel="alternate"]', { element(e) { e.remove(); } })
        .transform(response);
}
