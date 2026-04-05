import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { getFirestoreDb } from "./firebaseApp";
import {
  CHAT_SENDER_ROLES,
  assertNonEmptyValue,
  assertValidEmail,
  getSessionDisplayName,
  getSessionPhoto,
  normalizeChatMessage,
  normalizeEmail,
  normalizeLegacyMessage,
  normalizeNotification,
  normalizeOptionalId,
  normalizeThread,
  normalizeThreadRequestId,
  sanitizeLine,
  sanitizeMultiline,
  sortMessagesByLatest,
  sortThreadsByLatest,
} from "../../models/chat";
import { createUserProfileDraft, getFallbackName, normalizeString } from "../../models/userProfile";

const mapThreadSnapshot = (snapshot) =>
  sortThreadsByLatest(snapshot.docs.map((threadDoc) => normalizeThread(threadDoc.id, threadDoc.data())));

const mapMessagesSnapshot = (snapshot) =>
  snapshot.docs.map((messageDoc) => normalizeChatMessage(messageDoc.id, messageDoc.data()));

const mapNotificationsSnapshot = (snapshot) =>
  snapshot.docs.map((notificationDoc) => normalizeNotification(notificationDoc.id, notificationDoc.data()));

const mapUsersSnapshot = (snapshot) =>
  snapshot.docs
    .map((docSnap) => ({
      uid: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate?.() ?? null,
      lastLoginAt: docSnap.data().lastLoginAt?.toDate?.() ?? null,
    }))
    .sort((a, b) => {
      const left = a.createdAt?.getTime?.() ?? 0;
      const right = b.createdAt?.getTime?.() ?? 0;
      return right - left;
    });

export const firebaseProvider = {
  async createThread({ formData, user = null, options = {} }) {
    const db = getFirestoreDb();
    const normalizedName = getSessionDisplayName(user) || sanitizeLine(formData.name);
    const normalizedEmail = normalizeEmail(user?.email || formData.email);
    const normalizedMessage = sanitizeMultiline(formData.message);
    const clientRequestId = normalizeThreadRequestId(options.clientRequestId);

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

    await batch.commit();
    return threadRef.id;
  },

  async sendMessage({ threadId, senderId, senderRole, text }) {
    const normalizedThreadId = sanitizeLine(threadId);
    const normalizedSenderId = normalizeOptionalId(senderId);
    const normalizedRole = sanitizeLine(senderRole);
    const normalizedText = sanitizeMultiline(text);
    if (!normalizedThreadId) {
      throw new Error("Thread ID is required.");
    }

    if (!CHAT_SENDER_ROLES.includes(normalizedRole)) {
      throw new Error("Invalid sender role.");
    }

    assertNonEmptyValue(normalizedText, "Message text cannot be empty.");
    assertNonEmptyValue(normalizedSenderId, "Sender ID is required.");

    const db = getFirestoreDb();
    const threadRef = doc(db, "threads", normalizedThreadId);
    const senderProfileRef = doc(db, "users", normalizedSenderId);
    const [threadSnapshot, senderProfileSnapshot] = await Promise.all([
      getDoc(threadRef),
      getDoc(senderProfileRef),
    ]);

    if (!threadSnapshot.exists()) {
      throw new Error("Thread does not exist.");
    }

    if (!senderProfileSnapshot.exists()) {
      throw new Error("Sender profile could not be verified.");
    }

    const thread = normalizeThread(threadSnapshot.id, threadSnapshot.data());
    const senderProfile = senderProfileSnapshot.data() ?? {};

    if (normalizedRole === "admin" && normalizeString(senderProfile.role) !== "admin") {
      throw new Error("Only admins can send admin replies.");
    }

    if (normalizedRole === "user" && thread.userId !== normalizedSenderId) {
      throw new Error("This thread does not belong to the current user.");
    }

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

    await batch.commit();
  },

  subscribeToThreads({ user }, onData, onError) {
    if (!user?.uid) {
      onData([]);
      return () => {};
    }

    const threadsRef = collection(getFirestoreDb(), "threads");
    const threadsQuery =
      user.role === "admin"
        ? query(threadsRef, orderBy("updatedAt", "desc"))
        : query(threadsRef, where("userId", "==", user.uid));

    return onSnapshot(
      threadsQuery,
      (snapshot) => onData(mapThreadSnapshot(snapshot)),
      onError,
    );
  },

  subscribeToMessages({ threadId }, onData, onError) {
    const normalizedThreadId = sanitizeLine(threadId);

    if (!normalizedThreadId) {
      onData([]);
      return () => {};
    }

    return onSnapshot(
      query(
        collection(getFirestoreDb(), "threads", normalizedThreadId, "messages"),
        orderBy("createdAt", "asc"),
      ),
      (snapshot) => onData(mapMessagesSnapshot(snapshot)),
      onError,
    );
  },

  subscribeToNotifications({ userId }, onData, onError) {
    if (!userId) {
      onData([]);
      return () => {};
    }

    return onSnapshot(
      query(
        collection(getFirestoreDb(), "notifications"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
      ),
      (snapshot) => onData(mapNotificationsSnapshot(snapshot)),
      onError,
    );
  },

  async updateThreadStatus({ threadId, status }) {
    await updateDoc(doc(getFirestoreDb(), "threads", threadId), {
      status,
      updatedAt: serverTimestamp(),
    });
  },

  async markNotificationAsRead({ notificationId }) {
    await updateDoc(doc(getFirestoreDb(), "notifications", notificationId), { isRead: true });
  },

  async markNotificationsAsRead({ notificationIds }) {
    const ids = notificationIds.filter(Boolean);

    if (ids.length === 0) {
      return;
    }

    const db = getFirestoreDb();
    const batch = writeBatch(db);

    ids.forEach((notificationId) => {
      batch.update(doc(db, "notifications", notificationId), { isRead: true });
    });

    await batch.commit();
  },

  subscribeToUsers(_params, onData, onError) {
    return onSnapshot(
      collection(getFirestoreDb(), "users"),
      (snapshot) => onData(mapUsersSnapshot(snapshot)),
      onError,
    );
  },

  async updateUserRole({ uid, role }) {
    await updateDoc(doc(getFirestoreDb(), "users", uid), { role });
  },

  async ensureUserProfile({ firebaseUser }) {
    if (!firebaseUser?.uid) {
      return null;
    }

    const db = getFirestoreDb();
    const userRef = doc(db, "users", firebaseUser.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      await setDoc(userRef, createUserProfileDraft(firebaseUser, serverTimestamp));
      return userRef;
    }

    const profile = snapshot.data();
    const nextEmail = normalizeString(firebaseUser.email);
    const nextName = getFallbackName(firebaseUser);
    const nextPhotoURL = normalizeString(firebaseUser.photoURL);
    const updates = { lastLoginAt: serverTimestamp() };

    if ((profile.email ?? "") !== nextEmail) {
      updates.email = nextEmail;
    }

    if ((profile.name ?? "") !== nextName) {
      updates.name = nextName;
    }

    if ((profile.photoURL ?? "") !== nextPhotoURL) {
      updates.photoURL = nextPhotoURL;
    }

    if (!profile.uid) {
      updates.uid = firebaseUser.uid;
    }

    if (Object.keys(updates).length > 0) {
      await setDoc(userRef, updates, { merge: true });
    }

    return userRef;
  },

  async getUserProfile({ uid }) {
    if (!uid) {
      return null;
    }

    const snapshot = await getDoc(doc(getFirestoreDb(), "users", uid));
    return snapshot.exists() ? snapshot.data() : null;
  },

  subscribeToUserProfile({ uid }, next, onError) {
    if (!uid) {
      return () => {};
    }

    return onSnapshot(
      doc(getFirestoreDb(), "users", uid),
      (snapshot) => next(snapshot.exists() ? snapshot.data() : null),
      onError,
    );
  },

  async getLegacyMessages({ mode = "user", userId = null }) {
    const messagesRef = collection(getFirestoreDb(), "messages");
    const messagesQuery =
      mode === "admin"
        ? query(messagesRef, orderBy("createdAt", "desc"))
        : query(messagesRef, where("userId", "==", userId));

    const snapshot = await getDocs(messagesQuery);
    const messages = snapshot.docs.map((messageDoc) =>
      normalizeLegacyMessage(messageDoc.id, messageDoc.data()),
    );

    return mode === "admin" ? messages : sortMessagesByLatest(messages);
  },
};
