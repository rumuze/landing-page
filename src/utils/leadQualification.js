export const LEAD_INTENTS = ["discovery", "audit", "build", "infrastructure"];

export const EMPTY_LEAD_FORM = {
  fullName: "",
  workEmail: "",
  whatsapp: "",
  serviceType: "build",
  engagementType: "build",
  companyName: "",
  description: "",
  role: "",
  website: "",
  companySize: "",
  market: "",
  primaryChallenge: "",
  timeline: "",
  systems: "",
  monthlyActivity: "",
};

const STEP1_REQUIRED_FIELDS = [
  "fullName",
  "workEmail",
  "engagementType",
];

export const INTENT_TO_ENGAGEMENT = {
  discovery: "build",
  audit: "audit",
  build: "build",
  infrastructure: "infrastructure",
};

export function resolveLeadIntent(intent) {
  return LEAD_INTENTS.includes(intent) ? intent : "discovery";
}

export function ensureUrlProtocol(value) {
  const trimmedValue = String(value || "").trim();

  if (!trimmedValue) {
    return "";
  }

  return /^https?:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`;
}

export function validateLeadQualification(formData) {
  const errors = {};

  if (!String(formData.fullName || "").trim()) {
    errors.fullName = "required";
  }

  const contactValue = String(formData.workEmail || formData.whatsapp || "").trim();
  if (!contactValue) {
    errors.workEmail = "required";
  } else if (contactValue.includes("@")) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(contactValue)) {
      errors.workEmail = "email";
    }
  } else {
    // Treat as phone / whatsapp - must have at least 7 digits
    const digitsOnly = contactValue.replace(/\D/g, "");
    if (digitsOnly.length < 7) {
      errors.workEmail = "email";
    }
  }

  const engagement = formData.engagementType || formData.serviceType;
  if (!String(engagement || "").trim()) {
    errors.engagementType = "required";
  }

  const website = String(formData.website || "").trim();
  if (website) {
    try {
      new URL(ensureUrlProtocol(website));
    } catch {
      errors.website = "url";
    }
  }

  return errors;
}

const labelize = (value) =>
  String(value || "")
    .replace(/-/gu, " ")
    .replace(/\b\w/gu, (character) => character.toUpperCase());

export function buildLeadThreadSubject({ intent, formData }) {
  const safeIntent = resolveLeadIntent(intent);
  const engagement = formData.engagementType
    ? labelize(formData.engagementType)
    : "Needs qualification";

  const companyOrName = formData.companyName || formData.fullName || "Direct Lead";
  return `Rumuze Intake | ${labelize(safeIntent)} | ${companyOrName} | ${engagement}`;
}

export function buildLeadThreadMessage({ intent, formData, source = "website-homepage" }) {
  const safeIntent = resolveLeadIntent(intent);
  const lines = [
    "Qualified commercial intake",
    "",
    `Intent: ${labelize(safeIntent)}`,
    `Source: ${source}`,
    "",
    "Company profile",
    `- Full name: ${formData.fullName}`,
    `- Work email: ${formData.workEmail}`,
    `- Company name: ${formData.companyName}`,
    `- Role: ${formData.role}`,
    `- Website: ${ensureUrlProtocol(formData.website)}`,
    `- Company size: ${labelize(formData.companySize)}`,
    `- Primary market: ${labelize(formData.market)}`,
    "",
    "Engagement request",
    `- Engagement type: ${labelize(formData.engagementType)}`,
    `- Primary challenge: ${labelize(formData.primaryChallenge)}`,
    `- Timeline: ${labelize(formData.timeline)}`,
    `- Monthly activity: ${formData.monthlyActivity ? labelize(formData.monthlyActivity) : "Not provided"}`,
    "",
    "System context",
    `- Systems currently used: ${formData.systems || "Not provided"}`,
    "",
    "Current bottleneck",
    formData.description || "Not provided",
  ];

  return lines.join("\n");
}
