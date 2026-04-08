export const LEAD_INTENTS = ["discovery", "audit", "build", "infrastructure"];

export const EMPTY_LEAD_FORM = {
  fullName: "",
  workEmail: "",
  companyName: "",
  role: "",
  website: "",
  companySize: "",
  market: "",
  engagementType: "",
  primaryChallenge: "",
  timeline: "",
  systems: "",
  monthlyActivity: "",
  description: "",
};

const REQUIRED_FIELDS = [
  "fullName",
  "workEmail",
  "companyName",
  "role",
  "website",
  "companySize",
  "market",
  "engagementType",
  "primaryChallenge",
  "timeline",
];

export const INTENT_TO_ENGAGEMENT = {
  discovery: "",
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

  REQUIRED_FIELDS.forEach((fieldName) => {
    if (!String(formData[fieldName] || "").trim()) {
      errors[fieldName] = "required";
    }
  });

  const email = String(formData.workEmail || "").trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) {
    errors.workEmail = "email";
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

  return `Rumuze Intake | ${labelize(safeIntent)} | ${formData.companyName} | ${engagement}`;
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
