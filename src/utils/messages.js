import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
  increment,
} from "firebase/firestore";
import { getDb } from "./firebaseClient";

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

const sanitizeMultiline = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\r\n/gu, "\n").trim();
};

const normalizeEmail = (value) => sanitizeLine(value).toLowerCase();

const getMessageTime = (value) => getMessageDate(value)?.getTime() ?? 0;

const getSessionDisplayName = (user) =>
  sanitizeLine(user?.displayName || user?.name || "");

const getSessionPhoto = (user) => sanitizeLine(user?.photoURL || "");

export const normalizeMessageStatus = (status) =>
  MESSAGE_STATUSES.includes(status) ? status : "new";

export const getMessageStatusMeta = (status) =>
  MESSAGE_STATUS_META[normalizeMessageStatus(status)] ?? MESSAGE_STATUS_META.new;

export const createMessagePreview = (message, maxLength = 112) => {
  const plainMessage = sanitizeMultiline(message).replace(/\s+/gu, " ");

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

export const sortMessagesByLatest = (messages) =>
  [...messages].sort((left, right) => getMessageTime(right.createdAt) - getMessageTime(left.createdAt));

export const matchesMessageSearch = (message, query) => {
  const normalizedQuery = sanitizeLine(query).toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [
    message.userName,
    message.userEmail,
    message.message,
    message.reply,
  ]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(normalizedQuery));
};

export const mapMessageDocument = (messageDoc) => {
  const data = messageDoc.data();

  return {
    id: messageDoc.id,
    userId: typeof data.userId === "string" && data.userId ? data.userId : null,
    userName: typeof data.userName === "string" ? data.userName : "",
    userEmail: typeof data.userEmail === "string" ? data.userEmail : "",
    userPhoto: typeof data.userPhoto === "string" && data.userPhoto ? data.userPhoto : null,
    message: typeof data.message === "string" ? data.message : "",
    reply: typeof data.reply === "string" && data.reply ? data.reply : null,
    status: normalizeMessageStatus(data.status),
    createdAt: data.createdAt ?? null,
    repliedAt: data.repliedAt ?? null,
  };
};

export const buildMessageCreatePayload = ({
  user,
  name,
  email,
  message,
  subject,
  company,
}) => {
  const normalizedName = getSessionDisplayName(user) || sanitizeLine(name);
  const normalizedEmail = normalizeEmail(user?.email || email);
  const normalizedMessage = sanitizeMultiline(message);
  const normalizedSubject = sanitizeLine(subject);
  const normalizedCompany = sanitizeLine(company);
  const normalizedPhoto = getSessionPhoto(user);
  const segments = [];

  if (!normalizedName) {
    throw new Error("Sender name is required.");
  }

  if (!normalizedEmail) {
    throw new Error("Sender email is required.");
  }

  if (!normalizedMessage) {
    throw new Error("Message body is required.");
  }

  if (normalizedSubject) {
    segments.push(`Subject: ${normalizedSubject}`);
  }

  if (normalizedCompany) {
    segments.push(`Company: ${normalizedCompany}`);
  }

  segments.push(normalizedMessage);

  return {
    userId: user?.uid ?? null,
    userName: normalizedName,
    userEmail: normalizedEmail,
    userPhoto: normalizedPhoto || null,
    message: segments.join("\n\n"),
    reply: null,
    status: "new",
    repliedAt: null,
  };
};

export async function createMessage(formData, user = null) {
  const db = getDb();
  const batch = writeBatch(db);

  const messageDocRef = doc(collection(db, "messages"));
  batch.set(messageDocRef, {
    ...buildMessageCreatePayload({
      ...formData,
      user,
    }),
    createdAt: serverTimestamp(),
  });

  if (user?.uid) {
    const userRef = doc(db, "users", user.uid);
    batch.update(userRef, {
      messagesCount: increment(1)
    });
  }

  await batch.commit();
}

export async function sendAdminReply(message, replyText) {
  const normalizedReply = sanitizeMultiline(replyText);

  if (!message?.id) {
    throw new Error("A message must be selected before sending a reply.");
  }

  if (!normalizedReply) {
    throw new Error("Reply text is required.");
  }

  const db = getDb();
  const batch = writeBatch(db);

  batch.update(doc(db, "messages", message.id), {
    reply: normalizedReply,
    status: "replied",
    repliedAt: serverTimestamp(),
  });

  if (message.userId) {
    batch.set(doc(collection(db, "notifications")), {
      userId: message.userId,
      type: "reply",
      title: "New reply received",
      body: "Admin replied to your message",
      isRead: false,
      link: "/my-messages",
      createdAt: serverTimestamp(),
    });
  }

  await batch.commit();
}
