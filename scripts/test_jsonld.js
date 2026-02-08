import { getStructuredData } from '../src/utils/MetaConfig.js';
import { blogPosts } from '../src/data/blogPosts.js';

// Mock window/location if needed by MetaConfig, though it seems pure mostly.
// checking MetaConfig dependencies... 
// It uses `window.location.origin` in BASE_URL if not hardcoded. 
// Let's mock it.
global.window = {
    location: {
        origin: 'https://rumuze.com'
    }
};

const post = blogPosts[0];
const path = `/blog/${post.slug}`;

console.log("--- Testing Blog Post JSON-LD ---");
const jsonLd = getStructuredData(path, 'en');
console.log(JSON.stringify(jsonLd, null, 2));

console.log("\n--- Testing Manifesto JSON-LD ---");
const manifestoJsonLd = getStructuredData('/manifesto', 'en');
console.log(JSON.stringify(manifestoJsonLd, null, 2));
