export const MESSAGE_STATUSES = ["new", "seen", "replied"];

export const MESSAGE_STATUS_META = {
  new: {
    label: "New",
    badgeClassName:
      "border-cyan-400/20 bg-cyan-400/12 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.18)]",
  },
  seen: {
    label: "Seen",
    badgeClassName:
      "border-amber-300/20 bg-amber-400/12 text-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.12)]",
  },
  replied: {
    label: "Replied",
    badgeClassName:
      "border-emerald-300/20 bg-emerald-400/12 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.12)]",
  },
};

const sanitizeLine = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

export const normalizeMessageStatus = (status) =>
  MESSAGE_STATUSES.includes(status) ? status : "new";

export const getMessageStatusMeta = (status) =>
  MESSAGE_STATUS_META[normalizeMessageStatus(status)] ?? MESSAGE_STATUS_META.new;

export const createMessagePreview = (message, maxLength = 112) => {
  const plainMessage = sanitizeLine(message).replace(/\s+/gu, " ");

  if (plainMessage.length <= maxLength) {
    return plainMessage;
  }

  return `${plainMessage.slice(0, maxLength).trimEnd()}...`;
};

export const getMessageDate = (value) => {
  if (!value) {
    return null;
  }

  if (typeof value.toDate === "function") {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
};

export const formatMessageTimestamp = (value, locale = "en-US") => {
  const date = getMessageDate(value);

  if (!date) {
    return "Pending timestamp";
  }

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

export const matchesMessageSearch = (message, query) => {
  const normalizedQuery = sanitizeLine(query).toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [message.name, message.email, message.message]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(normalizedQuery));
};

export const buildPublicMessagePayload = ({
  name,
  email,
  message,
  subject,
  company,
}) => {
  const normalizedName = sanitizeLine(name);
  const normalizedEmail = sanitizeLine(email).toLowerCase();
  const normalizedMessage = sanitizeLine(message);
  const normalizedSubject = sanitizeLine(subject);
  const normalizedCompany = sanitizeLine(company);
  const segments = [];

  if (normalizedSubject) {
    segments.push(`Subject: ${normalizedSubject}`);
  }

  if (normalizedCompany) {
    segments.push(`Company: ${normalizedCompany}`);
  }

  if (normalizedMessage) {
    segments.push(normalizedMessage);
  }

  return {
    name: normalizedName,
    email: normalizedEmail,
    message: segments.join("\n\n"),
    status: "new",
    assignedTo: null,
  };
};
