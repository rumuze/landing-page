import { buildOrganizationSchema } from '../src/seo/buildOrganizationSchema.ts';
import { buildWebSiteSchema } from '../src/seo/buildWebSiteSchema.ts';
import { buildServiceSchemas } from '../src/seo/buildServiceSchema.ts';
import { buildFAQSchema } from '../src/seo/buildFAQSchema.ts';
import { localeToBCP47 } from '../src/utils/localeToBCP47.ts';
import { StableIds, SiteConfig } from '../src/config/site.ts';
import { blogPosts } from '../src/data/blogPosts.js';

global.window = {
    location: {
        origin: 'https://rumuze.com'
    }
};

const baseUrl = SiteConfig.baseUrl;

function generateTestGraph(path, lang = 'en') {
    const currentPath = path;
    const metaTitle = `Test Title for ${path}`;
    const metaDescription = `Test Description for ${path}`;
    const metaImage = `${baseUrl}/og-test.png`;

    const pageNode = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${baseUrl}${currentPath}#webpage`,
        url: `${baseUrl}${currentPath}`,
        name: metaTitle,
        description: metaDescription,
        inLanguage: localeToBCP47(lang),
        isPartOf: { '@id': StableIds.website },
        about: { '@id': StableIds.organization },
        primaryImageOfPage: { '@type': 'ImageObject', url: metaImage }
    };

    const core = [buildOrganizationSchema(lang), buildWebSiteSchema(lang)];
    let nodes = [...core, pageNode];

    if (path === '/services' || path === '/') {
        nodes = nodes.concat(buildServiceSchemas(lang), buildFAQSchema(lang));
    }

    return {
        '@context': 'https://schema.org',
        '@graph': nodes
    };
}

const post = blogPosts[0];
const path = `/blog/${post.slug}`;

console.log("--- Testing Blog Post JSON-LD ---");
const jsonLd = generateTestGraph(path, 'en');
console.log(JSON.stringify(jsonLd, null, 2));

console.log("\n--- Testing Homepage JSON-LD ---");
const homeJsonLd = generateTestGraph('/', 'en');
console.log(JSON.stringify(homeJsonLd, null, 2));
