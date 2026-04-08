import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-core";
import { trackVisit } from "../services/visitService";

const VISITOR_ID_KEY = "rumuze.visit.visitorId";
const SESSION_ID_KEY = "rumuze.visit.sessionId";
const PAGE_VIEW_PREFIX = "rumuze.visit.pageView";
const IDENTIFY_PREFIX = "rumuze.visit.identify";

const isBrowser = typeof window !== "undefined";

const safeStorageGet = (storage, key) => {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

const safeStorageSet = (storage, key, value) => {
  try {
    storage.setItem(key, value);
  } catch {
    return null;
  }
};

const createId = (prefix) =>
  `${prefix}_${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;

const getOrCreateStorageId = (storage, key, prefix) => {
  const existing = safeStorageGet(storage, key);

  if (existing) {
    return existing;
  }

  const nextId = createId(prefix);
  safeStorageSet(storage, key, nextId);
  return nextId;
};

const buildPageLoadKey = () =>
  `${Math.round(globalThis.performance?.timeOrigin ?? Date.now())}`;

const buildVisitPayload = ({ eventType, eventId, location }) => {
  const url = new URL(window.location.href);

  return {
    eventType,
    eventId,
    visitorId: getOrCreateStorageId(window.localStorage, VISITOR_ID_KEY, "visitor"),
    sessionId: getOrCreateStorageId(window.sessionStorage, SESSION_ID_KEY, "session"),
    pageLoadId: buildPageLoadKey(),
    pagePath: `${location.pathname}${location.search}${location.hash}`,
    pageUrl: url.toString(),
    pageTitle: document.title ?? "",
    referrer: document.referrer ?? "",
    locale: document.documentElement.lang ?? "",
    language: navigator.language ?? "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
    platform: navigator.userAgentData?.platform ?? navigator.platform ?? "",
    screenWidth: window.screen?.width ?? null,
    screenHeight: window.screen?.height ?? null,
    viewportWidth: window.innerWidth ?? null,
    viewportHeight: window.innerHeight ?? null,
    clientOccurredAt: new Date().toISOString(),
  };
};

const getPageViewDedupKey = (location) =>
  [
    PAGE_VIEW_PREFIX,
    buildPageLoadKey(),
    location.key,
    location.pathname,
    location.search,
    location.hash,
  ].join(":");

const getIdentifyDedupKey = (sessionId, userId) =>
  [IDENTIFY_PREFIX, sessionId, userId].join(":");

const sendVisit = async (payload) => {
  try {
    await trackVisit(payload);
  } catch (error) {
    console.warn("[VisitTracker] tracking failed:", error);
  }
};

const VisitTracker = () => {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isBrowser || isLoading) {
      return;
    }

    const dedupKey = getPageViewDedupKey(location);

    if (safeStorageGet(window.sessionStorage, dedupKey)) {
      return;
    }

    const payload = buildVisitPayload({
      eventType: "page_view",
      eventId: createId("visit"),
      location,
    });

    safeStorageSet(window.sessionStorage, dedupKey, payload.eventId);
    void sendVisit(payload);
  }, [isLoading, location]);

  useEffect(() => {
    if (!isBrowser || isLoading || !user?.uid) {
      return;
    }

    const sessionId = getOrCreateStorageId(window.sessionStorage, SESSION_ID_KEY, "session");
    const dedupKey = getIdentifyDedupKey(sessionId, user.uid);

    if (safeStorageGet(window.sessionStorage, dedupKey)) {
      return;
    }

    const payload = buildVisitPayload({
      eventType: "identify",
      eventId: createId("identify"),
      location,
    });

    safeStorageSet(window.sessionStorage, dedupKey, payload.eventId);
    void sendVisit(payload);
  }, [isLoading, location, user?.uid]);

  return null;
};

export default VisitTracker;
