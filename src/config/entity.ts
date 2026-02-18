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
  contact: {
    email: string;
  };
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
    en: 'Rumuze Technologies',
    ar: 'روموز للتقنيات',
  },
  slogan: {
    en: 'Complexity Decoded. Potential Unleashed.',
    ar: 'فك شفرة التعقيد.. إطلاق العنان للمستقبل',
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
      en: 'Chief Architect & Founder',
      ar: 'المهندس الرئيسي والمؤسس',
    },
    url: 'https://www.rumuze.com/about',
    sameAs: [
      'https://www.linkedin.com/in/ashraf-mohamed',
      'https://twitter.com/ashraf_arch',
      'https://github.com/ashraf-mohamed',
    ],
  },
  foundingYear: 2020,
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
    email: 'contact@rumuze.com', // placeholder
  },
  languages: ['en', 'ar'],
  categories: [
    'Enterprise Software Development',
    'Web Development Company',
    'Digital Marketing Technology Provider',
  ],
  sameAs: [
    'https://www.linkedin.com/company/rumuze',
    'https://twitter.com/rumuze',
    'https://github.com/rumuze',
  ],
  industryFocus: [
    'Fintech',
    'Retail',
    'Logistics',
    'Healthcare Technology',
    'Real Estate Technology',
  ],
  targetAudience: [
    'Mid-sized enterprises',
    'Large organizations',
    'Digital transformation programs',
    'Technology leaders',
  ],
  technologyStack: [
    'React',
    'Next.js',
    'Node.js',
    'Laravel',
    'PostgreSQL',
    'Redis',
    'MongoDB',
    'AWS',
    'Docker',
    'Kubernetes',
  ],
};
