/**
 * Person configuration for Rumuze's founder.
 *
 * Feeds the Person JSON-LD node and the About page. Only include facts that
 * can be evidenced (see docs/CLAIMS_REGISTRY.md): no years of experience,
 * credentials, or social profiles that have not been confirmed.
 *
 * Used by: buildPersonSchema
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Localized {
  en: string;
  ar: string;
}

interface LocalizedArray {
  en: string[];
  ar: string[];
}

export interface PersonConfig {
  /** Stable identifier matching StableIds.founder */
  id: string;
  name: string;
  role: Localized;
  description: Localized;
  /** Areas of professional expertise */
  expertise: LocalizedArray;
  /** URL to the profile page on rumuze.com */
  url: string;
  /** Confirmed public profiles only */
  sameAs: string[];
  /** Organization reference (stable @id) */
  worksFor: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const FOUNDER: PersonConfig = {
  id: "https://www.rumuze.com/#founder",
  name: "Mohamed Ashraf",
  role: {
    en: "Founder and Principal Engineer",
    ar: "المؤسس والمهندس الرئيسي",
  },
  description: {
    en: "Mohamed Ashraf is the founder and principal engineer of Rumuze, a software engineering company in Cairo. He designs and builds the company's platforms, including RumuzePMO, Rveta, and Rumuze Core, and leads architecture and engineering standards.",
    ar: "محمد أشرف هو مؤسس رموز ومهندسها الرئيسي، وهي شركة هندسة برمجيات في القاهرة. يصمم ويبني منصات الشركة، ومنها RumuzePMO وRveta وRumuze Core، ويقود المعمارية ومعايير الهندسة.",
  },
  expertise: {
    en: [
      "Modular software architecture",
      "Multi-tenant SaaS platforms",
      "Laravel and NestJS backends",
      "Flutter mobile apps",
      "Event-driven systems and webhooks",
      "Bilingual Arabic and English systems",
    ],
    ar: [
      "معمارية البرمجيات المعيارية",
      "منصات SaaS متعددة المستأجرين",
      "أنظمة Laravel وNestJS الخلفية",
      "تطبيقات Flutter",
      "الأنظمة القائمة على الأحداث وWebhooks",
      "الأنظمة ثنائية اللغة عربي وإنجليزي",
    ],
  },
  url: "https://www.rumuze.com/about",
  sameAs: ["https://github.com/elbayoumi"],
  worksFor: "https://www.rumuze.com/#organization",
};

/**
 * All people configs for future expansion (team members, advisors).
 * Currently contains the founder only.
 */
const PEOPLE: PersonConfig[] = [FOUNDER];
