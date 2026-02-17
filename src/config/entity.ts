export type LanguageCode = 'en' | 'ar';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface Founder {
  name: string;
  jobTitle: LocalizedString;
  url: string;
}

export interface Headquarters {
  region: string;
  countries: string[];
}

export interface EntityConfig {
  id: string;
  name: string;
  alternateName: LocalizedString;
  founder: Founder;
  foundingYear: number;
  headquarters: Headquarters;
  contact: {
    email: string;
  };
  languages: LanguageCode[];
  categories: string[];
  sameAs: string[];
}

export const ENTITY: EntityConfig = {
  id: 'https://www.rumuze.com/#organization',
  name: 'Rumuze',
  alternateName: {
    en: 'Rumuze Technologies',
    ar: 'روموز للتقنيات',
  },
  founder: {
    name: 'Mohamed Ashraf',
    jobTitle: {
      en: 'Chief Architect & Founder',
      ar: 'المهندس الرئيسي والمؤسس',
    },
    url: 'https://www.rumuze.com/about',
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
};
