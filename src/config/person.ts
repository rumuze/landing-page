/**
 * Person Configuration — Rumuze Founder & Key People
 *
 * Centralized person data for schema generation, about pages,
 * and AI entity recognition. All content is bilingual (EN + AR).
 *
 * Schema compatibility: Person (schema.org)
 * Used by: buildPersonSchema, AboutPage, CaseStudiesPage
 */

import type { LanguageCode } from "./entity";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Localized {
  en: string;
  ar: string;
}

export interface LocalizedArray {
  en: string[];
  ar: string[];
}

export interface PersonConfig {
  /** Stable identifier matching StableIds.founder */
  id: string;
  /** Full legal name */
  name: string;
  /** Job title in both languages */
  role: Localized;
  /** Professional description / bio */
  description: Localized;
  /** Areas of professional expertise */
  expertise: LocalizedArray;
  /** Formal credentials and certifications */
  credentials: LocalizedArray;
  /** URL to profile page on rumuze.com */
  url: string;
  /** LinkedIn profile URL */
  linkedIn: string;
  /** Additional social/professional links */
  sameAs: string[];
  /** Organization reference (stable @id) */
  worksFor: string;
  /** Profile image URL */
  image: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const FOUNDER: PersonConfig = {
  id: "https://www.rumuze.com/#founder",
  name: "Mohamed Ashraf",
  role: {
    en: "Chief Architect & Founder",
    ar: "المهندس الرئيسي والمؤسس",
  },
  description: {
    en: "Mohamed Ashraf is the founder and chief architect of Rumuze, an enterprise software engineering company specializing in multi-tenant SaaS platforms, ERP systems, and digital marketing infrastructure. With over 6 years of experience building scalable systems for mid-to-large organizations across MENA, he leads architecture decisions, technology strategy, and engineering standards at Rumuze.",
    ar: "محمد أشرف هو المؤسس والمهندس الرئيسي لشركة روموز، وهي شركة هندسة برمجيات مؤسسية متخصصة في منصات SaaS متعددة المستأجرين وأنظمة ERP والبنية التحتية للتسويق الرقمي. بخبرة تزيد عن 6 سنوات في بناء أنظمة قابلة للتوسع للمؤسسات المتوسطة والكبيرة في منطقة الشرق الأوسط وشمال أفريقيا، يقود قرارات البنية المعمارية واستراتيجية التقنية ومعايير الهندسة في روموز.",
  },
  expertise: {
    en: [
      "Enterprise Software Architecture",
      "Multi-Tenant SaaS Platform Design",
      "ERP/CRM System Engineering",
      "Digital Marketing Infrastructure",
      "Microservices & API-First Design",
      "Cloud-Native Deployment (AWS, Kubernetes)",
      "Performance Marketing & SEO Strategy",
      "Bilingual System Design (RTL/LTR)",
    ],
    ar: [
      "بنية البرمجيات المؤسسية",
      "تصميم منصات SaaS متعددة المستأجرين",
      "هندسة أنظمة ERP/CRM",
      "البنية التحتية للتسويق الرقمي",
      "ميكروسيرفيس وتصميم API أولاً",
      "النشر السحابي الأصلي (AWS، Kubernetes)",
      "التسويق الأدائي واستراتيجية SEO",
      "تصميم الأنظمة ثنائية اللغة (RTL/LTR)",
    ],
  },
  credentials: {
    en: [
      "Full-Stack Software Engineer",
      "Enterprise Systems Architect",
      "Digital Marketing Strategist",
      "Cloud Infrastructure Specialist",
    ],
    ar: [
      "مهندس برمجيات متكامل",
      "مهندس أنظمة مؤسسية",
      "استراتيجي تسويق رقمي",
      "متخصص بنية سحابية",
    ],
  },
  url: "https://www.rumuze.com/about",
  linkedIn: "https://www.linkedin.com/in/ashraf-mohamed",
  sameAs: [
    "https://www.linkedin.com/in/ashraf-mohamed",
    "https://twitter.com/ashraf_arch",
    "https://github.com/ashraf-mohamed",
  ],
  worksFor: "https://www.rumuze.com/#organization",
  image: "https://www.rumuze.com/founder.jpg",
};

/**
 * All people configs for future expansion (team members, advisors).
 * Currently contains founder only.
 */
export const PEOPLE: PersonConfig[] = [FOUNDER];
