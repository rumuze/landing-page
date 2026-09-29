// Static Organization node for the homepage. Keep in sync with the JSON-LD in
// index.html; facts here must match docs/CLAIMS_REGISTRY.md.
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "SoftwareCompany"],
  "@id": "https://www.rumuze.com/#organization",
  "name": "Rumuze",
  "alternateName": ["رموز"],
  "url": "https://www.rumuze.com",
  "logo": "https://www.rumuze.com/rumuze-symbol-112.webp",
  "sameAs": [
    "https://www.linkedin.com/company/rumuze-%D8%B1%D9%85%D9%88%D8%B2",
    "https://x.com/rumuze",
    "https://github.com/rumuze",
    "https://www.facebook.com/rumuze/",
    "https://www.instagram.com/rumuze_flow/",
    "https://www.tiktok.com/@rumuze_flow"
  ],
  "knowsAbout": [
    "Custom software development",
    "SaaS platforms",
    "Laravel",
    "NestJS",
    "Next.js",
    "Flutter",
    "Arabic and English bilingual systems",
    "API and webhook integration"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Obour City, Cairo",
    "addressCountry": "EG"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+20-100-006-1409",
    "email": "connect@rumuze.com",
    "contactType": "sales",
    "availableLanguage": ["Arabic", "English"]
  },
  "areaServed": ["SA", "AE", "EG", "KW", "QA", "BH", "OM"],
  "description": "Rumuze is a software engineering company building custom platforms, mobile apps, and backend systems for businesses in Saudi Arabia, the UAE, and the wider MENA region, in Arabic and English.",
  "foundingDate": "2026",
  "founder": {
    "@type": "Person",
    "name": "Mohamed Ashraf"
  }
};

export default organizationSchema;
