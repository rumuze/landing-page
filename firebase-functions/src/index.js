const { initializeApp } = require("firebase-admin/app");
const { FieldValue, getFirestore } = require("firebase-admin/firestore");
const { logger } = require("firebase-functions");
const { setGlobalOptions } = require("firebase-functions/v2");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

initializeApp();

setGlobalOptions({
  maxInstances: 20,
});

const db = getFirestore();

const serverTimestamp = () => FieldValue.serverTimestamp();

function sanitizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

async function getUserProfile(userId) {
  const normalizedUserId = sanitizeString(userId);

  if (!normalizedUserId) {
    return null;
  }

  const snapshot = await db.collection("users").doc(normalizedUserId).get();

  if (!snapshot.exists) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

function getAdminUid() {
  const candidates = [
    process.env.FIREBASE_ADMIN_UID,
    process.env.VITE_FIREBASE_ADMIN_UID,
    ...(process.env.VITE_FIREBASE_ADMIN_UIDS ?? "").split(","),
  ];

  return candidates.map(sanitizeString).find(Boolean) ?? null;
}

function createNotificationId({ messageId, targetUserId }) {
  return `msg_${sanitizeString(messageId)}_${sanitizeString(targetUserId)}`.slice(0, 240);
}

function isAlreadyExistsError(error) {
  return error?.code === 6 || error?.code === "already-exists";
}

if (!getAdminUid()) {
  logger.warn("FIREBASE_ADMIN_UID or VITE_FIREBASE_ADMIN_UID is not configured. User-originated chat messages cannot be routed to admin notifications.");
}

exports.createChatNotification = onDocumentCreated(
  {
    document: "threads/{threadId}/messages/{messageId}",
    retry: true,
  },
  async (event) => {
    const snapshot = event.data;

    if (!snapshot?.exists) {
      logger.warn("Skipping notification creation because the message snapshot is missing.", {
        threadId: event.params.threadId,
        messageId: event.params.messageId,
      });
      return;
    }

    const threadId = sanitizeString(event.params.threadId);
    const messageId = sanitizeString(event.params.messageId);
    const message = snapshot.data() ?? {};
    const senderRole = sanitizeString(message.senderRole);
    const senderId = sanitizeString(message.senderId) || null;

    const threadRef = db.collection("threads").doc(threadId);
    const threadSnapshot = await threadRef.get();

    if (!threadSnapshot.exists) {
      logger.error("Skipping notification creation because the thread does not exist.", {
        threadId,
        messageId,
        senderRole,
      });
      return;
    }

    const thread = threadSnapshot.data() ?? {};
    const threadUserId = sanitizeString(thread.userId) || null;
    const notificationType =
      senderRole === "admin" ? "reply" : senderRole === "user" ? "message" : null;

    if (!notificationType) {
      logger.warn("Skipping notification creation because senderRole is invalid.", {
        threadId,
        messageId,
        senderRole,
      });
      return;
    }

    if (senderRole === "admin" && !senderId) {
      logger.warn("Skipping notification creation because an admin message is missing senderId.", {
        threadId,
        messageId,
        senderRole,
      });
      return;
    }

    const senderProfile = senderId ? await getUserProfile(senderId) : null;

    if (senderId) {
      if (!senderProfile) {
        logger.warn("Skipping notification creation because the sender profile was not found.", {
          threadId,
          messageId,
          senderId,
          senderRole,
        });
        return;
      }

      const senderProfileRole = sanitizeString(senderProfile.role);

      if (senderRole === "admin" && senderProfileRole !== "admin") {
        logger.warn("Skipping notification creation because the sender is not an admin in Firestore.", {
          threadId,
          messageId,
          senderId,
          senderRole,
          senderProfileRole,
        });
        return;
      }

      if (
        senderRole === "user"
        && threadUserId
        && senderId !== threadUserId
      ) {
        logger.warn("Skipping notification creation because the sender does not own the thread.", {
          threadId,
          messageId,
          senderId,
          senderRole,
          threadUserId,
        });
        return;
      }
    }

    if (senderRole === "user" && threadUserId && !senderId) {
      logger.warn("Skipping notification creation because an authenticated thread message is missing senderId.", {
        threadId,
        messageId,
        senderRole,
        threadUserId,
      });
      return;
    }

    if (senderRole === "user" && !threadUserId && senderId) {
      logger.warn("Skipping notification creation because a guest thread message unexpectedly included senderId.", {
        threadId,
        messageId,
        senderId,
        senderRole,
      });
      return;
    }

    const targetUserId = senderRole === "admin" ? threadUserId : getAdminUid();
    const resolvedThreadId = threadId;

    console.log("[useNotifications] Routing debugging:", {
      threadId: resolvedThreadId,
      messageId,
      senderRole,
      senderId,
      threadUserId,
      targetUserId,
      notificationType
    });

    if (!targetUserId) {
      logger.warn("Skipping notification creation because no target user could be resolved.", {
        threadId,
        messageId,
        senderRole,
      });
      return;
    }

    if (senderId && senderId === targetUserId) {
      logger.info("Skipping self-notification for chat message.", {
        threadId,
        messageId,
        senderId,
        senderRole,
        targetUserId,
      });
      return;
    }

    const targetProfile = await getUserProfile(targetUserId);

    if (!targetProfile) {
      logger.warn("Skipping notification creation because the target profile was not found.", {
        threadId,
        messageId,
        senderRole,
        targetUserId,
      });
      return;
    }

    if (senderRole === "user" && sanitizeString(targetProfile.role) !== "admin") {
      logger.warn("Skipping notification creation because the configured admin target is not an admin in Firestore.", {
        threadId,
        messageId,
        senderRole,
        targetUserId,
        targetRole: sanitizeString(targetProfile.role),
      });
      return;
    }

    const notificationRef = db
      .collection("notifications")
      .doc(createNotificationId({ messageId, targetUserId }));

    try {
      await notificationRef.create({
        userId: targetUserId,
        type: notificationType,
        threadId,
        isRead: false,
        createdAt: serverTimestamp(),
      });

      logger.info("Created chat notification.", {
        notificationId: notificationRef.id,
        targetUserId,
        senderRole,
        threadId,
        messageId,
      });
    } catch (error) {
      if (isAlreadyExistsError(error)) {
        logger.info("Notification already exists for this message; skipping duplicate write.", {
          notificationId: notificationRef.id,
          targetUserId,
          senderRole,
          threadId,
          messageId,
        });
        return;
      }

      logger.error("Failed to create chat notification.", {
        threadId,
        messageId,
        senderRole,
        targetUserId,
        error: error?.message ?? String(error),
      });
      throw error;
    }
  },
);
