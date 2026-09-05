export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.rumuze.com/#organization",
  "name": "رموز",
  "alternateName": ["Rumuze", "رمرز", "Rumuze Agency"],
  "url": "https://www.rumuze.com",
  "logo": "https://www.rumuze.com/rumuze-symbol-112.webp",
  "sameAs": [
    "https://www.linkedin.com/company/rumuze",
    "https://x.com/rumuze",
    "https://github.com/rumuze"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+20-100-006-1409",
    "contactType": "sales",
    "availableLanguage": ["Arabic", "English"]
  },
  "areaServed": ["SA", "AE", "EG", "KW", "QA", "BH", "OM"],
  "description": "رموز شركة هندسة برمجيات ومنصات SaaS تبني أنظمة إيرادات وبنية تحتية رقمية للمؤسسات في منطقة الخليج والشرق الأوسط.",
  "foundingDate": "2026",
  "founder": {
    "@type": "Person",
    "name": "Mohamed Ashraf"
  }
};

export default organizationSchema;
