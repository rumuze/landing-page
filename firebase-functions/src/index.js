const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { FieldValue, Timestamp, getFirestore } = require("firebase-admin/firestore");
const { logger } = require("firebase-functions");
const { setGlobalOptions } = require("firebase-functions/v2");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");

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

function sanitizeOptionalString(value, maxLength = 2048) {
  const normalizedValue = sanitizeString(value);
  return normalizedValue ? normalizedValue.slice(0, maxLength) : "";
}

function sanitizeEnum(value, allowedValues, fallbackValue) {
  const normalizedValue = sanitizeString(value);
  return allowedValues.includes(normalizedValue) ? normalizedValue : fallbackValue;
}

function sanitizeNumber(value) {
  return Number.isFinite(value) ? value : null;
}

function getHeader(request, headerName) {
  if (typeof request.get === "function") {
    return request.get(headerName) || "";
  }

  return request.headers?.[headerName] || "";
}

function parseUrl(value) {
  const normalizedValue = sanitizeOptionalString(value, 4096);

  if (!normalizedValue) {
    return null;
  }

  try {
    return new URL(normalizedValue);
  } catch {
    return null;
  }
}

function parseClientTimestamp(value) {
  const normalizedValue = sanitizeOptionalString(value, 128);

  if (!normalizedValue) {
    return null;
  }

  const parsedDate = new Date(normalizedValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return Timestamp.fromDate(parsedDate);
}

function getIpAddress(request) {
  const forwardedFor = sanitizeOptionalString(getHeader(request, "x-forwarded-for"), 512);

  if (!forwardedFor) {
    return "";
  }

  return forwardedFor.split(",")[0].trim();
}

function matchesHost(hostname, patterns) {
  return patterns.some((pattern) => hostname === pattern || hostname.endsWith(`.${pattern}`));
}

function buildSourceDetails(pageUrl, rawReferrer) {
  const pageHost = pageUrl?.hostname ?? "";
  const explicitReferrer = parseUrl(rawReferrer);
  const utmSource = sanitizeOptionalString(pageUrl?.searchParams.get("utm_source"), 128);
  const utmMedium = sanitizeOptionalString(pageUrl?.searchParams.get("utm_medium"), 128);
  const utmCampaign = sanitizeOptionalString(pageUrl?.searchParams.get("utm_campaign"), 256);
  const utmTerm = sanitizeOptionalString(pageUrl?.searchParams.get("utm_term"), 128);
  const utmContent = sanitizeOptionalString(pageUrl?.searchParams.get("utm_content"), 256);
  const gclid = sanitizeOptionalString(pageUrl?.searchParams.get("gclid"), 256);
  const fbclid = sanitizeOptionalString(pageUrl?.searchParams.get("fbclid"), 256);
  const msclkid = sanitizeOptionalString(pageUrl?.searchParams.get("msclkid"), 256);
  const referrerHost = explicitReferrer?.hostname ?? "";

  const searchHosts = ["google.com", "bing.com", "duckduckgo.com", "search.yahoo.com", "yandex.com", "baidu.com"];
  const socialHosts = ["facebook.com", "instagram.com", "linkedin.com", "twitter.com", "x.com", "t.co", "reddit.com", "t.me", "whatsapp.com"];

  let sourceType = "direct";

  if (utmSource || utmMedium || utmCampaign || gclid || fbclid || msclkid) {
    sourceType = "campaign";
  } else if (!referrerHost) {
    sourceType = "direct";
  } else if (pageHost && referrerHost === pageHost) {
    sourceType = "internal";
  } else if (matchesHost(referrerHost, searchHosts)) {
    sourceType = "search";
  } else if (matchesHost(referrerHost, socialHosts)) {
    sourceType = "social";
  } else {
    sourceType = "referral";
  }

  return {
    referrer: explicitReferrer?.toString() ?? "",
    referrerHost,
    sourceType,
    sourceLabel: utmSource || referrerHost || "direct",
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    gclid,
    fbclid,
    msclkid,
  };
}

async function resolveAuthenticatedVisitUser(request) {
  const authorizationHeader = sanitizeOptionalString(getHeader(request, "authorization"), 4096);

  if (!authorizationHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authorizationHeader.slice(7).trim();

  if (!token) {
    return null;
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    const profile = await getUserProfile(decodedToken.uid);
    const userEmail = sanitizeString(profile?.email) || sanitizeString(decodedToken.email);
    const userName = sanitizeString(profile?.name) || sanitizeString(decodedToken.name) || userEmail || decodedToken.uid;
    const userRole = sanitizeString(profile?.role) || "user";

    return {
      userId: decodedToken.uid,
      userEmail,
      userName,
      userRole,
      accountId: decodedToken.uid,
      accountLabel: userName || userEmail || decodedToken.uid,
      isAuthenticated: true,
    };
  } catch (error) {
    logger.warn("Visit tracking auth verification failed.", {
      error: error?.message ?? String(error),
    });
    return null;
  }
}

function buildGuestUserFields() {
  return {
    userId: null,
    userEmail: null,
    userName: null,
    userRole: "guest",
    accountId: null,
    accountLabel: "Guest",
    isAuthenticated: false,
  };
}

async function updateSessionVisitLinks(sessionId, userFields) {
  if (!sessionId || !userFields?.userId) {
    return;
  }

  const visitsSnapshot = await db
    .collection("visits")
    .where("sessionId", "==", sessionId)
    .get();

  if (visitsSnapshot.empty) {
    return;
  }

  const batch = db.batch();
  let hasChanges = false;

  visitsSnapshot.docs.forEach((visitDoc) => {
    const visitData = visitDoc.data() ?? {};

    if (visitData.isAuthenticated || visitData.userId) {
      return;
    }

    batch.update(visitDoc.ref, userFields);
    hasChanges = true;
  });

  if (!hasChanges) {
    return;
  }

  await batch.commit();
}

async function updateUserVisitSummary(userFields, visitRecord) {
  if (!userFields?.userId || !visitRecord) {
    return;
  }

  await db.collection("users").doc(userFields.userId).set({
    lastVisitAt: serverTimestamp(),
    lastVisitPath: visitRecord.pagePath,
    lastVisitSourceLabel: visitRecord.sourceLabel,
    lastVisitSourceType: visitRecord.sourceType,
    lastVisitSessionId: visitRecord.sessionId,
    lastVisitIp: visitRecord.ipAddress,
  }, { merge: true });
}

function applyCors(response) {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.set("Access-Control-Max-Age", "3600");
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

exports.trackVisit = onRequest(
  {
    timeoutSeconds: 15,
    memory: "256MiB",
  },
  async (request, response) => {
    applyCors(response);

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed." });
      return;
    }

    const body = request.body && typeof request.body === "object" ? request.body : {};
    const eventType = sanitizeEnum(body.eventType, ["page_view", "identify"], "page_view");
    const eventId = sanitizeOptionalString(body.eventId, 200);
    const sessionId = sanitizeOptionalString(body.sessionId, 200);
    const visitorId = sanitizeOptionalString(body.visitorId, 200);
    const pagePath = sanitizeOptionalString(body.pagePath, 2048);
    const pageTitle = sanitizeOptionalString(body.pageTitle, 512);
    const pageUrl = parseUrl(body.pageUrl);

    if (!sessionId || !visitorId) {
      response.status(400).json({ error: "sessionId and visitorId are required." });
      return;
    }

    if (!pageUrl || !pagePath) {
      response.status(400).json({ error: "pageUrl and pagePath are required." });
      return;
    }

    const userFields = (await resolveAuthenticatedVisitUser(request)) || buildGuestUserFields();
    const sourceDetails = buildSourceDetails(
      pageUrl,
      sanitizeOptionalString(body.referrer, 2048),
    );
    const ipAddress = getIpAddress(request);

    const visitRecord = {
      eventType: "page_view",
      eventId: eventId || db.collection("visits").doc().id,
      sessionId,
      visitorId,
      pageLoadId: sanitizeOptionalString(body.pageLoadId, 128),
      pagePath,
      pageUrl: pageUrl.toString(),
      pageTitle,
      locale: sanitizeOptionalString(body.locale, 32),
      language: sanitizeOptionalString(body.language, 32),
      timezone: sanitizeOptionalString(body.timezone, 128),
      platform: sanitizeOptionalString(body.platform, 128),
      screenWidth: sanitizeNumber(body.screenWidth),
      screenHeight: sanitizeNumber(body.screenHeight),
      viewportWidth: sanitizeNumber(body.viewportWidth),
      viewportHeight: sanitizeNumber(body.viewportHeight),
      clientOccurredAt: parseClientTimestamp(body.clientOccurredAt),
      ipAddress,
      userAgent: sanitizeOptionalString(getHeader(request, "user-agent"), 2048),
      requestOrigin: sanitizeOptionalString(getHeader(request, "origin"), 1024),
      requestReferer: sanitizeOptionalString(getHeader(request, "referer"), 2048),
      visitedAt: serverTimestamp(),
      ...sourceDetails,
      ...userFields,
    };

    const sessionRef = db.collection("visitSessions").doc(sessionId);
    const sessionSnapshot = await sessionRef.get();
    const sessionPayload = {
      visitorId,
      lastSeenAt: serverTimestamp(),
      lastPagePath: pagePath,
      lastPageUrl: pageUrl.toString(),
      lastSourceLabel: sourceDetails.sourceLabel,
      lastSourceType: sourceDetails.sourceType,
      lastIpAddress: ipAddress,
      lastUserAgent: visitRecord.userAgent,
      ...userFields,
    };

    if (!sessionSnapshot.exists) {
      sessionPayload.firstSeenAt = serverTimestamp();
      sessionPayload.firstPagePath = pagePath;
      sessionPayload.firstPageUrl = pageUrl.toString();
      sessionPayload.pageViews = 0;
    }

    if (eventType === "page_view") {
      sessionPayload.pageViews = FieldValue.increment(1);
    }

    await sessionRef.set(sessionPayload, { merge: true });

    if (eventType === "identify") {
      if (userFields.userId) {
        await updateSessionVisitLinks(sessionId, userFields);
      }

      response.status(200).json({ ok: true, linked: Boolean(userFields.userId) });
      return;
    }

    const visitRef = db.collection("visits").doc(visitRecord.eventId);

    try {
      await visitRef.create(visitRecord);
    } catch (error) {
      if (isAlreadyExistsError(error)) {
        response.status(200).json({ ok: true, duplicate: true });
        return;
      }

      logger.error("Failed to persist visit record.", {
        eventId: visitRecord.eventId,
        error: error?.message ?? String(error),
      });
      response.status(500).json({ error: "Failed to persist visit record." });
      return;
    }

    if (userFields.userId) {
      await updateUserVisitSummary(userFields, visitRecord);
    }

    response.status(201).json({
      ok: true,
      visitId: visitRef.id,
    });
  },
);
