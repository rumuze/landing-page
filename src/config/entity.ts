export type LanguageCode = 'en' | 'ar';

interface LocalizedString {
  en: string;
  ar: string;
}

interface StableIds {
  organization: string;
  website: string;
  brand: string;
  founder: string;
}

interface Founder {
  name: string;
  jobTitle: LocalizedString;
  url: string;
  sameAs: string[];
}

interface Headquarters {
  region: string;
  countries: string[];
}

interface ContactDetails {
  email: string;
  website: string;
  location: LocalizedString;
}

interface PublicProfiles {
  linkedIn?: string;
  github?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  x?: string;
  website?: string;
}

export interface EntityConfig {
  id: string;
  name: string;
  alternateName: LocalizedString;
  slogan: LocalizedString;
  brand: {
    id: string;
    name: string;
  };
  stableIds: StableIds;
  founder: Founder;
  foundingYear: number;
  headquarters: Headquarters;
  contact: ContactDetails;
  publicProfiles: PublicProfiles;
  languages: LanguageCode[];
  categories: string[];
  sameAs: string[];
  industryFocus: string[];
  targetAudience: string[];
  technologyStack: string[];
}

export const ENTITY: EntityConfig = {
  id: 'https://www.rumuze.com/#organization',
  name: 'Rumuze',
  alternateName: {
    en: 'Rumuze',
    ar: 'رموز',
  },
  slogan: {
    en: 'We build your software, and the marketing that grows it.',
    ar: 'نبني برمجياتك، والتسويق الذي ينمّيها.',
  },
  brand: {
    id: 'https://www.rumuze.com/#brand',
    name: 'Rumuze',
  },
  stableIds: {
    organization: 'https://www.rumuze.com/#organization',
    website: 'https://www.rumuze.com/#website',
    brand: 'https://www.rumuze.com/#brand',
    founder: 'https://www.rumuze.com/#founder',
  },
  founder: {
    name: 'Mohamed Ashraf',
    jobTitle: {
      en: 'Founder',
      ar: 'المؤسس',
    },
    url: 'https://www.rumuze.com/about',
    sameAs: ['https://github.com/elbayoumi'],
  },
  foundingYear: 2026,
  headquarters: {
    region: 'MENA',
    countries: [
      'United Arab Emirates',
      'Saudi Arabia',
      'Egypt',
      'Qatar',
    ],
  },
  contact: {
    email: 'connect@rumuze.com',
    website: 'https://www.rumuze.com',
    location: {
      en: 'Obour City, Cairo, Egypt',
      ar: 'مدينة العبور، القاهرة، مصر',
    },
  },
  publicProfiles: {
    linkedIn: 'https://www.linkedin.com/company/rumuze-%D8%B1%D9%85%D9%88%D8%B2',
    github: 'https://github.com/rumuze',
    facebook: 'https://www.facebook.com/rumuze/',
    instagram: 'https://www.instagram.com/rumuze_flow/',
    tiktok: 'https://www.tiktok.com/@rumuze_flow',
    youtube: 'https://www.youtube.com/@Rumuze',
    x: 'https://x.com/Rumuzeflow',
    website: 'https://www.rumuze.com',
  },
  languages: ['en', 'ar'],
  categories: [
    'Custom Software Development',
    'Mobile App Development',
    'SaaS Platform Development',
    'Digital Marketing',
    'Search Engine Optimization',
    'Paid Advertising Management',
  ],
  sameAs: [
    'https://www.linkedin.com/company/rumuze-%D8%B1%D9%85%D9%88%D8%B2',
    'https://github.com/rumuze',
    'https://www.facebook.com/rumuze/',
    'https://www.instagram.com/rumuze_flow/',
    'https://www.tiktok.com/@rumuze_flow',
    'https://www.youtube.com/@Rumuze',
    'https://x.com/Rumuzeflow',
  ],
  // Domains of the products Rumuze has built (see docs/CLAIMS_REGISTRY.md).
  industryFocus: [
    'Business operations software (ERP, CRM, HR)',
    'Delivery and field operations',
    'Integration and event-driven platforms',
  ],
  targetAudience: [
    'Small and mid-sized businesses',
    'Product teams',
    'Companies building or inheriting a software platform',
  ],
  technologyStack: [
    'Laravel',
    'NestJS',
    'Next.js',
    'React',
    'Flutter',
    'PostgreSQL',
    'MySQL',
    'Redis',
    'Docker',
    'Arabic and English bilingual systems',
  ],
};
