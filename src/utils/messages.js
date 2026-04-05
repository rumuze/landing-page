import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
  increment,
  getDocs,
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
    status: data.status === "closed" ? "closed" : "open",
    lastMessage: typeof data.lastMessage === "string" ? data.lastMessage : "",
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  };
};

export async function createThread(formData, user = null, adminUid = "ADMIN_UID_PLACEHOLDER") {
  const db = getDb();
  
  // 1. Validate Inputs
  const normalizedName = getSessionDisplayName(user) || sanitizeLine(formData.name);
  const normalizedEmail = normalizeEmail(user?.email || formData.email);
  const normalizedMessage = sanitizeMultiline(formData.message);
  
  if (!normalizedName) throw new Error("Sender name is required.");
  if (!normalizedEmail) throw new Error("A valid email is required.");
  if (!normalizedMessage) throw new Error("Message body cannot be empty.");

  const batch = writeBatch(db);

  // 2. Prepare References
  const threadRef = doc(collection(db, "threads"));
  const messageRef = doc(collection(db, `threads/${threadRef.id}/messages`));
  const notificationRef = doc(collection(db, "notifications"));

  const timestamp = serverTimestamp();

  // 3. Set Thread
  batch.set(threadRef, {
    userId: user?.uid || null,
    userName: normalizedName,
    userEmail: normalizedEmail,
    userPhoto: getSessionPhoto(user) || null,
    isGuest: !user,
    status: "open",
    lastMessage: normalizedMessage,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  // 4. Set Initial Message
  batch.set(messageRef, {
    senderId: user?.uid || null,
    senderRole: "user",
    text: normalizedMessage,
    createdAt: timestamp,
  });

  // 5. Create Admin Notification
  batch.set(notificationRef, {
    userId: adminUid,
    type: "message",
    isRead: false,
    createdAt: timestamp,
    threadId: threadRef.id,
  });

  // 6. Update User Profile if authenticated
  if (user?.uid) {
    const userRef = doc(db, "users", user.uid);
    batch.update(userRef, {
      messagesCount: increment(1),
      lastMessageAt: timestamp,
    });
  }

  await batch.commit();
  return threadRef.id;
}

export async function sendChatMessage({ threadId, senderId, senderRole, text, targetUserId }) {
  // 1. Validate Inputs
  if (!threadId) throw new Error("Thread ID is required.");
  if (!senderRole || !["admin", "user"].includes(senderRole)) {
    throw new Error("Invalid sender role.");
  }
  const normalizedText = sanitizeMultiline(text);
  if (!normalizedText) throw new Error("Message text cannot be empty.");

  const db = getDb();
  const batch = writeBatch(db);
  const timestamp = serverTimestamp();

  // 2. Add Message
  const messageRef = doc(collection(db, `threads/${threadId}/messages`));
  batch.set(messageRef, {
    senderId: senderId || null,
    senderRole,
    text: normalizedText,
    createdAt: timestamp,
  });

  // 3. Update Thread Metadata
  const threadRef = doc(db, "threads", threadId);
  batch.update(threadRef, {
    lastMessage: normalizedText,
    updatedAt: timestamp,
  });

  // 4. Create Notification for Receiver
  if (targetUserId) {
    const notificationRef = doc(collection(db, "notifications"));
    batch.set(notificationRef, {
      userId: targetUserId,
      type: senderRole === "admin" ? "reply" : "message",
      isRead: false,
      createdAt: timestamp,
      threadId,
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
