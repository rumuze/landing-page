export type LanguageCode = 'en' | 'ar';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface StableIds {
  organization: string;
  website: string;
  brand: string;
  founder: string;
}

export interface Founder {
  name: string;
  jobTitle: LocalizedString;
  url: string;
  sameAs: string[];
}

export interface Headquarters {
  region: string;
  countries: string[];
}

export interface ContactDetails {
  email: string;
  website: string;
  location: LocalizedString;
}

export interface PublicProfiles {
  linkedIn?: string;
  github?: string;
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
    en: 'We build the software your business runs on.',
    ar: 'نبني البرمجيات التي تعتمد عليها شركتك.',
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
    linkedIn: 'https://www.linkedin.com/company/rumuze',
    github: 'https://github.com/rumuze',
    website: 'https://www.rumuze.com',
  },
  languages: ['en', 'ar'],
  categories: [
    'Custom Software Development',
    'Mobile App Development',
    'SaaS Platform Development',
  ],
  sameAs: [
    'https://www.linkedin.com/company/rumuze',
    'https://github.com/rumuze',
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
