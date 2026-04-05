import {
  collection,
  doc,
  getDocs,
  getDoc,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { getDb } from "./firebaseClient";

export const MESSAGE_STATUSES = ["new", "seen", "replied"];
export const THREAD_STATUSES = ["open", "closed"];
export const CHAT_SENDER_ROLES = ["admin", "user"];

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
const normalizeOptionalId = (value) => sanitizeLine(value) || null;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const REQUEST_ID_PATTERN = /[^a-zA-Z0-9_-]/gu;

// Configure one or more admin notification recipients with
// VITE_FIREBASE_ADMIN_UID or VITE_FIREBASE_ADMIN_UIDS="uid-a,uid-b".
const adminNotificationUserIds = Array.from(
  new Set(
    [
      import.meta.env.VITE_FIREBASE_ADMIN_UID,
      ...(import.meta.env.VITE_FIREBASE_ADMIN_UIDS ?? "").split(","),
    ]
      .map((value) => sanitizeLine(value))
      .filter(Boolean),
  ),
);

const getMessageTime = (value) => getMessageDate(value)?.getTime() ?? 0;

const getSessionDisplayName = (user) =>
  sanitizeLine(user?.displayName || user?.name || "");

const getSessionPhoto = (user) => sanitizeLine(user?.photoURL || "");

export const normalizeMessageStatus = (status) =>
  MESSAGE_STATUSES.includes(status) ? status : "new";

export const normalizeThreadStatus = (status) =>
  THREAD_STATUSES.includes(status) ? status : "open";

export const getMessageStatusMeta = (status) =>
  MESSAGE_STATUS_META[normalizeMessageStatus(status)] ?? MESSAGE_STATUS_META.new;

export const getConfiguredAdminNotificationUserIds = () => [...adminNotificationUserIds];

export const getPrimaryAdminNotificationUserId = () =>
  adminNotificationUserIds[0] ?? null;

export const createThreadRequestId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `thread_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};

const normalizeThreadRequestId = (value) => {
  const sanitizedId = sanitizeLine(value).replace(REQUEST_ID_PATTERN, "");
  return sanitizedId.slice(0, 128) || null;
};

const assertValidEmail = (value, label = "Email") => {
  if (!EMAIL_PATTERN.test(value)) {
    throw new Error(`${label} is invalid.`);
  }
};

const assertNonEmptyValue = (value, message) => {
  if (!value) {
    throw new Error(message);
  }
};

const convertFirestoreTimestamp = (value) => getMessageDate(value);

export function buildThreadsQuery({ db = getDb(), user }) {
  if (!user?.uid) {
    return null;
  }

  const threadsRef = collection(db, "threads");

  if (user.role === "admin") {
    return query(threadsRef, orderBy("updatedAt", "desc"));
  }

  // Requires composite index:
  // threads => userId (ASC), updatedAt (DESC)
  return query(
    threadsRef,
    where("userId", "==", user.uid),
    orderBy("updatedAt", "desc"),
  );
}

export function buildMessagesQuery(threadId, db = getDb()) {
  const normalizedThreadId = sanitizeLine(threadId);

  if (!normalizedThreadId) {
    throw new Error("Missing threadId");
  }

  return query(
    collection(db, "threads", normalizedThreadId, "messages"),
    orderBy("createdAt", "asc"),
  );
}

export function buildNotificationsQuery(user, db = getDb()) {
  if (!user?.uid) {
    return null;
  }

  // Requires composite index:
  // notifications => userId (ASC), createdAt (DESC)
  return query(
    collection(db, "notifications"),
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc"),
  );
}

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
    message.lastMessage,
    message.message, // legacy
    message.reply,   // legacy
  ]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(normalizedQuery));
};

export const mapThreadDocument = (threadDoc) => {
  const data = threadDoc.data();

  return {
    id: threadDoc.id,
    userId: typeof data.userId === "string" && data.userId ? data.userId : null,
    userName: typeof data.userName === "string" ? data.userName : "",
    userEmail: typeof data.userEmail === "string" ? data.userEmail : "",
    userPhoto: typeof data.userPhoto === "string" && data.userPhoto ? data.userPhoto : null,
    isGuest: Boolean(data.isGuest),
    status: normalizeThreadStatus(data.status),
    lastMessage: typeof data.lastMessage === "string" ? data.lastMessage : "",
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  };
};

export const mapChatMessageDocument = (messageDoc) => {
  const data = messageDoc.data();

  return {
    id: messageDoc.id,
    senderId: typeof data.senderId === "string" && data.senderId ? data.senderId : null,
    senderRole: CHAT_SENDER_ROLES.includes(data.senderRole) ? data.senderRole : "user",
    text: typeof data.text === "string" ? data.text : "",
    createdAt: convertFirestoreTimestamp(data.createdAt),
  };
};

export const mapNotificationDocument = (notificationDoc) => {
  const data = notificationDoc.data();

  return {
    id: notificationDoc.id,
    userId: typeof data.userId === "string" && data.userId ? data.userId : null,
    type: typeof data.type === "string" ? data.type : "message",
    isRead: Boolean(data.isRead),
    createdAt: convertFirestoreTimestamp(data.createdAt),
    threadId: typeof data.threadId === "string" ? data.threadId : null,
  };
};

const createNotificationDocumentId = ({ threadId, userId, type }) =>
  `${type}_${threadId}_${userId}`;

export async function createThread(formData, user = null, options = {}) {
  const db = getDb();
  const normalizedName = getSessionDisplayName(user) || sanitizeLine(formData.name);
  const normalizedEmail = normalizeEmail(user?.email || formData.email);
  const normalizedMessage = sanitizeMultiline(formData.message);
  const clientRequestId = normalizeThreadRequestId(options.clientRequestId);
  const adminNotificationUserId =
    normalizeOptionalId(options.adminUid) ?? getPrimaryAdminNotificationUserId();

  assertNonEmptyValue(normalizedName, "Sender name is required.");
  assertNonEmptyValue(normalizedEmail, "A valid email is required.");
  assertValidEmail(normalizedEmail, "Email");
  assertNonEmptyValue(normalizedMessage, "Message body cannot be empty.");

  const threadRef = clientRequestId
    ? doc(db, "threads", clientRequestId)
    : doc(collection(db, "threads"));

  if (clientRequestId) {
    const existingThread = await getDoc(threadRef);

    if (existingThread.exists()) {
      return threadRef.id;
    }
  }

  const messageRef = doc(collection(db, "threads", threadRef.id, "messages"));
  const batch = writeBatch(db);

  const timestamp = serverTimestamp();

  batch.set(threadRef, {
    userId: user?.uid || null,
    userName: normalizedName,
    userEmail: normalizedEmail,
    userPhoto: getSessionPhoto(user) || null,
    isGuest: !user?.uid,
    status: "open",
    lastMessage: normalizedMessage,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  batch.set(messageRef, {
    senderId: user?.uid || null,
    senderRole: "user",
    text: normalizedMessage,
    createdAt: timestamp,
  });

  if (adminNotificationUserId) {
    const notificationRef = doc(
      db,
      "notifications",
      createNotificationDocumentId({
        threadId: threadRef.id,
        userId: adminNotificationUserId,
        type: "message",
      }),
    );

    batch.set(notificationRef, {
      userId: adminNotificationUserId,
      type: "message",
      isRead: false,
      createdAt: timestamp,
      threadId: threadRef.id,
    });
  }

  if (user?.uid) {
    const userRef = doc(db, "users", user.uid);
    batch.set(userRef, {
      messagesCount: increment(1),
    }, { merge: true });
  }

  await batch.commit();
  return threadRef.id;
}

export async function sendChatMessage({ threadId, senderId, senderRole, text, targetUserId }) {
  const normalizedThreadId = sanitizeLine(threadId);
  const normalizedSenderId = normalizeOptionalId(senderId);
  const normalizedRole = sanitizeLine(senderRole);
  const normalizedText = sanitizeMultiline(text);
  const explicitTargetUserId = normalizeOptionalId(targetUserId);

  if (!normalizedThreadId) {
    throw new Error("Thread ID is required.");
  }

  if (!CHAT_SENDER_ROLES.includes(normalizedRole)) {
    throw new Error("Invalid sender role.");
  }

  assertNonEmptyValue(normalizedText, "Message text cannot be empty.");
  assertNonEmptyValue(normalizedSenderId, "Sender ID is required.");

  const db = getDb();
  const threadRef = doc(db, "threads", normalizedThreadId);
  const threadSnapshot = await getDoc(threadRef);

  if (!threadSnapshot.exists()) {
    throw new Error("Thread does not exist.");
  }

  const thread = mapThreadDocument(threadSnapshot);

  if (normalizedRole === "user" && thread.userId !== normalizedSenderId) {
    throw new Error("This thread does not belong to the current user.");
  }

  const notificationUserId =
    normalizedRole === "admin"
      ? explicitTargetUserId ?? thread.userId
      : explicitTargetUserId ?? getPrimaryAdminNotificationUserId();

  const notificationType = normalizedRole === "admin" ? "reply" : "message";

  const batch = writeBatch(db);
  const timestamp = serverTimestamp();
  const messageRef = doc(collection(db, "threads", normalizedThreadId, "messages"));
  batch.set(messageRef, {
    senderId: normalizedSenderId,
    senderRole: normalizedRole,
    text: normalizedText,
    createdAt: timestamp,
  });

  batch.update(threadRef, {
    lastMessage: normalizedText,
    updatedAt: timestamp,
  });

  if (notificationUserId && notificationUserId !== normalizedSenderId) {
    const notificationRef = doc(
      db,
      "notifications",
      createNotificationDocumentId({
        threadId: normalizedThreadId,
        userId: notificationUserId,
        type: notificationType,
      }),
    );

    batch.set(notificationRef, {
      userId: notificationUserId,
      type: notificationType,
      isRead: false,
      createdAt: timestamp,
      threadId: normalizedThreadId,
    });
  }

  await batch.commit();
}

/**
 * MIGRATION SCRIPT
 * Run this function once from the Admin Panel or a cloud function to migrate
 * all legacy `messages` into the new `threads` + `threads/{id}/messages` architecture.
 * This function is idempotent in the sense that it uses the same ID for the thread 
 * if you want, but here we just process all docs and write new ones to `threads`.
 * Actually, to prevent duplicates, we can assign the thread ID = legacy message ID.
 */


export async function migrateMessagesToThreads() {
  const db = getDb();
  const legacyMessagesSnapshot = await getDocs(collection(db, "messages"));
  
  const batches = [];
  let currentBatch = writeBatch(db);
  let operationCount = 0;

  for (const docSnap of legacyMessagesSnapshot.docs) {
    const data = docSnap.data();
    
    // Check if it's already a thread format or already migrated. 
    // Usually legacy data has "message" field. Threads use "lastMessage" field natively handled.
    if (!data.message) continue;

    const threadId = docSnap.id;
    const threadRef = doc(db, "threads", threadId);
    
    currentBatch.set(threadRef, {
      userId: typeof data.userId === "string" ? data.userId : null,
      userName: data.userName || "Unknown",
      userEmail: data.userEmail || "",
      userPhoto: data.userPhoto || null,
      isGuest: !data.userId,
      status: data.status === "closed" ? "closed" : "open",
      lastMessage: data.reply || data.message || "",
      createdAt: data.createdAt || serverTimestamp(),
      updatedAt: data.repliedAt || data.createdAt || serverTimestamp(),
      migrated: true,
    }, { merge: true });

    operationCount++;

    // User's original message
    const firstMessageRef = doc(db, `threads/${threadId}/messages`, "msg_initial");
    currentBatch.set(firstMessageRef, {
      senderId: data.userId || null,
      senderRole: "user",
      text: data.message,
      createdAt: data.createdAt || serverTimestamp(),
    }, { merge: true });
    operationCount++;

    // Admin's reply if exists
    if (data.reply) {
      const replyRef = doc(db, `threads/${threadId}/messages`, "msg_reply");
      currentBatch.set(replyRef, {
        senderId: "ADMIN_MIGRATED",
        senderRole: "admin",
        text: data.reply,
        createdAt: data.repliedAt || serverTimestamp(),
      }, { merge: true });
      operationCount++;
    }

    // Firestore batch limit is 500 operations
    if (operationCount > 400) {
      batches.push(currentBatch.commit());
      currentBatch = writeBatch(db);
      operationCount = 0;
    }
  }

  if (operationCount > 0) {
    batches.push(currentBatch.commit());
  }

  await Promise.all(batches);
  console.log(`Migrated ${legacyMessagesSnapshot.docs.length} legacy messages to threads architecture.`);
}
