const toDateOrNull = (value) => value?.toDate?.() ?? null;

const normalizeText = (value) =>
  typeof value === "string" ? value.trim() : "";

export function normalizeVisit(id, data = {}) {
  const pagePath = normalizeText(data.pagePath);
  const pageTitle = normalizeText(data.pageTitle);
  const sourceLabel = normalizeText(data.sourceLabel);
  const accountLabel =
    normalizeText(data.accountLabel) ||
    normalizeText(data.userName) ||
    normalizeText(data.userEmail) ||
    "Guest";

  return {
    id,
    eventType: normalizeText(data.eventType) || "page_view",
    sessionId: normalizeText(data.sessionId),
    visitorId: normalizeText(data.visitorId),
    pagePath,
    pageUrl: normalizeText(data.pageUrl),
    pageTitle: pageTitle || pagePath || "Untitled page",
    sourceType: normalizeText(data.sourceType) || "direct",
    sourceLabel: sourceLabel || "direct",
    referrer: normalizeText(data.referrer),
    referrerHost: normalizeText(data.referrerHost),
    utmSource: normalizeText(data.utmSource),
    utmMedium: normalizeText(data.utmMedium),
    utmCampaign: normalizeText(data.utmCampaign),
    ipAddress: normalizeText(data.ipAddress),
    userAgent: normalizeText(data.userAgent),
    userId: normalizeText(data.userId) || null,
    userEmail: normalizeText(data.userEmail) || null,
    userName: normalizeText(data.userName) || null,
    userRole: normalizeText(data.userRole) || "guest",
    accountId: normalizeText(data.accountId) || null,
    accountLabel,
    isAuthenticated: Boolean(data.isAuthenticated),
    locale: normalizeText(data.locale),
    language: normalizeText(data.language),
    timezone: normalizeText(data.timezone),
    visitedAt: toDateOrNull(data.visitedAt),
    clientOccurredAt: toDateOrNull(data.clientOccurredAt),
  };
}
