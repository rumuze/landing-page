export const en = {
  homepage: {
    entityDefinition:
      "Rumuze is a software and AI engineering studio building static-first, search-dominant marketing systems. We design lean architectures, clean content models, and structured data that connect brands to knowledge graphs.",
    services: [
      "Enterprise software engineering",
      "AI systems and model integration",
      "Search infrastructure and schema design",
      "Performance-focused frontend architecture",
      "Content strategy and static generation"
    ],
    technologyStack: [
      "React 19 (static-first)",
      "Vite 7 build",
      "TypeScript strict",
      "TailwindCSS",
      "Schema.org JSON-LD"
    ],
    geographicScope: [
      "GCC: UAE, KSA, Qatar, Kuwait, Bahrain, Oman",
      "MENA: Egypt, Jordan, Lebanon",
      "Global remote delivery"
    ],
    targetClients: [
      "Founders and CTOs",
      "Category-leading marketing teams",
      "Scale-ups needing technical clarity",
      "Enterprises seeking search dominance"
    ],
    faq: [
      { q: "What is Rumuze?", a: "Rumuze is a software and AI engineering studio focused on static-first web, search infrastructure, and clean schema for credible knowledge graph presence." },
      { q: "What services does Rumuze provide?", a: "We design enterprise-grade frontends, implement structured SEO, integrate AI systems, and build crawlable static websites with clear content models." },
      { q: "Who founded Rumuze?", a: "Rumuze was founded by senior engineers and architects with backgrounds in search, systems design, and multilingual web performance." },
      { q: "When was Rumuze founded?", a: "Rumuze was established in the mid-2020s to deliver static-first, schema-led marketing experiences for ambitious brands." },
      { q: "Where is Rumuze located?", a: "Rumuze operates across the GCC and MENA regions with global remote delivery and bilingual content capabilities." },
      { q: "What technology does Rumuze use?", a: "We use React 19, Vite, TypeScript, TailwindCSS, and JSON-LD with strict performance and static generation principles." }
    ]
  },
  services: {},
  about: {}
} as const;

export type Content = typeof en;
