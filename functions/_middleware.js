export async function onRequest(context) {
    const { request, next } = context;
    const url = new URL(request.url);
    const path = url.pathname;

    // STRICT Language Detection Logic
    const isAr = path.startsWith('/ar');
    const lang = isAr ? 'ar' : 'en';

    // Meta Data Configuration
    const meta = {
        en: {
            title: "Rumuze | Elite Technology & Digital Growth",
            description: "Decoding technology, scaling brands. Professional software development and data-driven marketing growth strategies for modern enterprises.",
            ogTitle: "Rumuze | Elite Technology & Digital Growth",
            ogDescription: "Decoding technology, scaling brands. Professional software development and data-driven marketing growth strategies for modern enterprises.",
            twitterTitle: "Rumuze | Elite Technology & Digital Growth",
            twitterDescription: "Decoding technology, scaling brands. Professional software development and data-driven marketing growth strategies for modern enterprises.",
        },
        ar: {
            title: "رموز | التكنولوجيا النخبوية والنمو الرقمي",
            description: "فك رموز التكنولوجيا، وتوسيع نطاق العلامات التجارية. تطوير برمجيات احترافي واستراتيجيات نمو تسويقي قائمة على البيانات للمؤسسات الحديثة.",
            ogTitle: "رموز | التكنولوجيا النخبوية والنمو الرقمي",
            ogDescription: "فك رموز التكنولوجيا، وتوسيع نطاق العلامات التجارية. تطوير برمجيات احترافي واستراتيجيات نمو تسويقي قائمة على البيانات للمؤسسات الحديثة.",
            twitterTitle: "رموز | التكنولوجيا النخبوية والنمو الرقمي",
            twitterDescription: "فك رموز التكنولوجيا، وتوسيع نطاق العلامات التجارية. تطوير برمجيات احترافي واستراتيجيات نمو تسويقي قائمة على البيانات للمؤسسات الحديثة.",
        }
    };

    const currentMeta = meta[lang];
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
                // Remove existing relevant meta tags to avoid duplicates
                // Note: HTMLRewriter processes sequentially, so we append the new ones.
                // It's cleaner to remove the placeholders in index.html, but we'll add these anyway.

                const tags = [
                    `<meta name="description" content="${currentMeta.description}">`,
                    `<link rel="canonical" href="${canonicalUrl}">`,
                    `<link rel="alternate" hreflang="en" href="${baseUrl}/">`,
                    `<link rel="alternate" hreflang="ar" href="${baseUrl}/ar">`,
                    `<link rel="alternate" hreflang="x-default" href="${baseUrl}/">`,

                    // Open Graph
                    `<meta property="og:title" content="${currentMeta.ogTitle}">`,
                    `<meta property="og:description" content="${currentMeta.ogDescription}">`,
                    `<meta property="og:image" content="${ogImage}">`,
                    `<meta property="og:url" content="${canonicalUrl}">`,
                    `<meta property="og:type" content="website">`,
                    `<meta property="og:site_name" content="Rumuze">`,
                    `<meta property="og:locale" content="${isAr ? 'ar_EG' : 'en_US'}">`,

                    // Twitter
                    `<meta name="twitter:card" content="summary_large_image">`,
                    `<meta name="twitter:title" content="${currentMeta.twitterTitle}">`,
                    `<meta name="twitter:description" content="${currentMeta.twitterDescription}">`,
                    `<meta name="twitter:image" content="${ogImage}">`,
                    `<meta name="twitter:site" content="@rumuze">`
                ];

                e.append(tags.join('\n'), { html: true });
            }
        })
        // Remove tags that we are replacing to ensure no duplicates
        .on('meta[name="description"]', { element(e) { e.remove(); } })
        .on('meta[property^="og:"]', { element(e) { e.remove(); } })
        .on('meta[name^="twitter:"]', { element(e) { e.remove(); } })
        .on('link[rel="canonical"]', { element(e) { e.remove(); } })
        .on('link[rel="alternate"]', { element(e) { e.remove(); } })
        .transform(response);
}
