export const MESSAGE_STATUSES = ["new", "seen", "replied"];
export const THREAD_STATUSES = ["open", "closed"];
export const CHAT_SENDER_ROLES = ["admin", "user"];
export const NOTIFICATION_TYPES = ["message", "reply"];

export const FIRESTORE_INDEX_REQUIREMENTS = Object.freeze({
  threadsByUserUpdatedAt: {
    collection: "threads",
    fields: ["userId (ASC)", "updatedAt (DESC)"],
    reason: "Required for user-scoped thread queries with latest activity ordering.",
  },
  notificationsByUserCreatedAt: {
    collection: "notifications",
    fields: ["userId (ASC)", "createdAt (DESC)"],
    reason: "Required for user-scoped notification queries with newest-first ordering.",
  },
});

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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const REQUEST_ID_PATTERN = /[^a-zA-Z0-9_-]/gu;

export const sanitizeLine = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

export const sanitizeMultiline = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\r\n/gu, "\n").trim();
};

export const normalizeEmail = (value) => sanitizeLine(value).toLowerCase();
export const normalizeOptionalId = (value) => sanitizeLine(value) || null;

export const normalizeMessageStatus = (status) =>
  MESSAGE_STATUSES.includes(status) ? status : "new";

export const normalizeThreadStatus = (status) =>
  THREAD_STATUSES.includes(status) ? status : "open";

export const getMessageStatusMeta = (status) =>
  MESSAGE_STATUS_META[normalizeMessageStatus(status)] ?? MESSAGE_STATUS_META.new;

export const getSessionDisplayName = (user) =>
  sanitizeLine(user?.displayName || user?.name || "");

export const getSessionPhoto = (user) => sanitizeLine(user?.photoURL || "");

export const createThreadRequestId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `thread_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};

export const normalizeThreadRequestId = (value) => {
  const sanitizedId = sanitizeLine(value).replace(REQUEST_ID_PATTERN, "");
  return sanitizedId.slice(0, 128) || null;
};

export const assertValidEmail = (value, label = "Email") => {
  if (!EMAIL_PATTERN.test(value)) {
    throw new Error(`${label} is invalid.`);
  }
};

export const assertNonEmptyValue = (value, message) => {
  if (!value) {
    throw new Error(message);
  }
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

const getMessageTime = (value) => getMessageDate(value)?.getTime() ?? 0;

export const createMessagePreview = (message, maxLength = 112) => {
  const plainMessage = sanitizeMultiline(message).replace(/\s+/gu, " ");

  if (plainMessage.length <= maxLength) {
    return plainMessage;
  }

  return `${plainMessage.slice(0, maxLength).trimEnd()}...`;
};

export const sortThreadsByLatest = (threads) =>
  [...threads].sort(
    (left, right) =>
      getMessageTime(right.updatedAt ?? right.createdAt) -
      getMessageTime(left.updatedAt ?? left.createdAt),
  );

export const sortMessagesByLatest = (messages) =>
  [...messages].sort(
    (left, right) => getMessageTime(right.createdAt) - getMessageTime(left.createdAt),
  );

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

  return [
    message.userName,
    message.userEmail,
    message.lastMessage,
    message.message,
    message.reply,
  ]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(normalizedQuery));
};

export const normalizeThread = (id, data = {}) => ({
  id,
  userId: typeof data.userId === "string" && data.userId ? data.userId : null,
  userName: typeof data.userName === "string" ? data.userName : "",
  userEmail: typeof data.userEmail === "string" ? data.userEmail : "",
  userPhoto: typeof data.userPhoto === "string" && data.userPhoto ? data.userPhoto : null,
  isGuest: Boolean(data.isGuest),
  status: normalizeThreadStatus(data.status),
  lastMessage: typeof data.lastMessage === "string" ? data.lastMessage : "",
  createdAt: data.createdAt ?? null,
  updatedAt: data.updatedAt ?? null,
});

export const normalizeChatMessage = (id, data = {}) => ({
  id,
  senderId: typeof data.senderId === "string" && data.senderId ? data.senderId : null,
  senderRole: CHAT_SENDER_ROLES.includes(data.senderRole) ? data.senderRole : "user",
  text: typeof data.text === "string" ? data.text : "",
  createdAt: getMessageDate(data.createdAt),
});

export const normalizeNotification = (id, data = {}) => ({
  id,
  userId: typeof data.userId === "string" && data.userId ? data.userId : null,
  type: NOTIFICATION_TYPES.includes(data.type) ? data.type : "message",
  isRead: Boolean(data.isRead),
  createdAt: getMessageDate(data.createdAt),
  threadId: typeof data.threadId === "string" ? data.threadId : null,
});

export const normalizeLegacyMessage = (id, data = {}) => ({
  id,
  userId: typeof data.userId === "string" && data.userId ? data.userId : null,
  userName: typeof data.userName === "string" ? data.userName : "",
  userEmail: typeof data.userEmail === "string" ? data.userEmail : "",
  userPhoto: typeof data.userPhoto === "string" && data.userPhoto ? data.userPhoto : null,
  message: typeof data.message === "string" ? data.message : "",
  reply: typeof data.reply === "string" ? data.reply : "",
  status: normalizeMessageStatus(data.status),
  createdAt: data.createdAt ?? null,
  repliedAt: data.repliedAt ?? null,
});
