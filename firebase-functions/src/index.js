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

function isAlreadyExistsError(error) {
  return error?.code === 6 || error?.code === "already-exists";
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

    let targetUserIds = [];
    if (senderRole === "admin") {
      if (threadUserId) targetUserIds.push(threadUserId);
    } else if (senderRole === "user") {
      const adminDocs = await db.collection("users").where("role", "==", "admin").get();
      targetUserIds = adminDocs.docs.map(doc => doc.id);
    }

    const resolvedThreadId = threadId;

    console.log("[useNotifications] Routing debugging:", {
      threadId: resolvedThreadId,
      messageId,
      senderRole,
      senderId,
      threadUserId,
      targetUserIds,
      notificationType
    });

    if (targetUserIds.length === 0) {
      logger.warn("Skipping notification creation because no target users could be resolved.", {
        threadId,
        messageId,
        senderRole,
      });
      return;
    }

    for (const targetUserId of targetUserIds) {
      if (senderId && senderId === targetUserId) {
        logger.info("Skipping self-notification for chat message.", {
          threadId,
          messageId,
          senderId,
          senderRole,
          targetUserId,
        });
        continue;
      }

      const targetProfile = await getUserProfile(targetUserId);

      if (!targetProfile) {
        logger.warn("Skipping notification creation because the target profile was not found.", {
          threadId,
          messageId,
          senderRole,
          targetUserId,
        });
        continue;
      }

      if (senderRole === "user" && sanitizeString(targetProfile.role) !== "admin") {
        logger.warn("Skipping notification creation because the target is not an admin in Firestore.", {
          threadId,
          messageId,
          senderRole,
          targetUserId,
          targetRole: sanitizeString(targetProfile.role),
        });
        continue;
      }

      const notificationRef = db
        .collection("notifications")
        .doc(`msg_${sanitizeString(messageId)}_${sanitizeString(targetUserId)}`.slice(0, 240));

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
          continue;
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
    }
  },
);
