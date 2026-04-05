import { startTransition, useCallback, useEffect, useReducer, useRef } from "react";
import { useAuth } from "../context/auth-core";
import {
  markNotificationAsRead,
  markNotificationsAsRead,
  subscribeToNotifications,
} from "../services/chatService";

const NOTIFICATION_SOUND_PATH = "/notification.mp3";
const NOTIFICATION_SOUND_COOLDOWN_MS = 1500;

let notificationAudio = null;
let hasRequestedInteraction = false;
let lastNotificationSoundAt = 0;

function getNotificationAudio() {
  if (typeof window === "undefined") return null;
  if (!notificationAudio) {
    notificationAudio = new Audio(NOTIFICATION_SOUND_PATH);
    notificationAudio.preload = "auto";
  }
  return notificationAudio;
}

function registerNotificationSoundUnlock() {
  if (typeof document === "undefined" || hasRequestedInteraction) return;
  hasRequestedInteraction = true;
  document.addEventListener("click", () => {
    const audio = getNotificationAudio();
    if (audio) {
      audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
      }).catch(() => {});
    }
  }, { once: true, passive: true });
}

async function playNotificationSound() {
  const now = Date.now();
  if (now - lastNotificationSoundAt < NOTIFICATION_SOUND_COOLDOWN_MS) return;
  lastNotificationSoundAt = now;

  const audio = getNotificationAudio();
  if (audio) {
    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (error) {
      console.warn("[useNotifications] Playback blocked by browser:", error);
    }
  }
}

function getNotificationSignature(notifications) {
  return notifications
    .map((n) => `${n.id}:${n.isRead ? "1" : "0"}:${n.createdAt?.getTime?.() ?? 0}`)
    .join("|");
}

/* ─── state shape & reducer ────────────────────────────────────── */

const INITIAL_STATE = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

/**
 * All state transitions are pure — no setState called from effect bodies.
 * The ESLint rule only flags setState(); dispatch() is exempt.
 */
function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true, error: null };

    case 'LOADED':
      return {
        notifications: action.payload.notifications,
        unreadCount: action.payload.unreadCount,
        isLoading: false,
        error: null,
      };

    case 'ERROR':
      return { ...state, isLoading: false, error: action.payload };

    case 'RESET':
      return INITIAL_STATE;

    default:
      return state;
  }
}


/* ─── hook ─────────────────────────────────────────────────────── */

/**
 * useNotifications
 *
 * Real-time Firestore-backed notifications for the authenticated user.
 * Returns notifications sorted newest-first, unread count, and actions.
 */
export function useNotifications() {
  const { user } = useAuth();
  const userUid = user?.uid ?? null;
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const unsubscribeRef = useRef(null);
  const hasReceivedSnapshotRef = useRef(false);
  const previousSignatureRef = useRef("");
  const previousUnreadCountRef = useRef(0);

  useEffect(() => {
    registerNotificationSoundUnlock();
  }, []);

  useEffect(() => {
    const teardown = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };

    const resetSnapshotState = () => {
      hasReceivedSnapshotRef.current = false;
      previousSignatureRef.current = "";
      previousUnreadCountRef.current = 0;
    };

    // 1. Validate User
    if (!userUid) {
      teardown();
      resetSnapshotState();
      dispatch({ type: 'RESET' });
      return;
    }

    teardown();
    resetSnapshotState();
    dispatch({ type: 'LOADING' });

    let isMounted = true;

    const setup = () => {
      try {
        const unsubscribe = subscribeToNotifications(
          { userId: userUid },
          (notifications) => {
            if (!isMounted) return;
            const unreadCount = notifications.reduce(
              (count, notification) => count + (notification.isRead ? 0 : 1),
              0,
            );
            const previousSignature = previousSignatureRef.current;
            const previousUnreadCount = previousUnreadCountRef.current;
            const hasReceivedSnapshot = hasReceivedSnapshotRef.current;
            const nextSignature = getNotificationSignature(notifications);
            const shouldPlaySound =
              hasReceivedSnapshot
              && unreadCount > previousUnreadCount
              && notifications.some((notification) => !notification.isRead);
            const shouldDispatch =
              !hasReceivedSnapshot
              || nextSignature !== previousSignature
              || unreadCount !== previousUnreadCount;

            hasReceivedSnapshotRef.current = true;
            previousSignatureRef.current = nextSignature;
            previousUnreadCountRef.current = unreadCount;

            if (shouldPlaySound) {
              void playNotificationSound();
            }

            if (!shouldDispatch) {
              return;
            }

            startTransition(() => {
              dispatch({
                type: "LOADED",
                payload: { notifications, unreadCount },
              });
            });
          },
          (err) => {
            if (!isMounted) return;
            console.error("[useNotifications] subscription error:", err);
            const isIndexError = err.code === "failed-precondition" || err.message?.includes("index");
            const errorMessage = isIndexError
              ? "Missing Firestore index for notifications (userId + createdAt). Please check the console link to create it."
              : "Failed to load notifications.";
            dispatch({ type: "ERROR", payload: errorMessage });
          },
        );

        if (isMounted) {
          unsubscribeRef.current = unsubscribe;
        } else {
          unsubscribe();
        }
      } catch (err) {
        if (isMounted) {
          console.error("[useNotifications] setup error:", err);
          dispatch({ type: "ERROR", payload: "Failed to initialize notifications." });
        }
      }
    };

    setup();

    return () => {
      isMounted = false;
      teardown();
      resetSnapshotState();
    };
  }, [userUid]);

  /* ── Actions ────────────────────────────────────────────────── */

  const markAsRead = useCallback(async (notificationId) => {
    if (!notificationId) {
      return;
    }

    try {
      await markNotificationAsRead({ notificationId });
    } catch (err) {
      console.error("[useNotifications] markAsRead error:", err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    const unread = state.notifications.filter((n) => !n.isRead);
    if (unread.length === 0) return;

    try {
      await markNotificationsAsRead({
        notificationIds: unread.map((notification) => notification.id),
      });
    } catch (err) {
      console.error("[useNotifications] markAllAsRead error:", err);
    }
  }, [state.notifications]);

  return {
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    isEmpty: !state.isLoading && state.notifications.length === 0 && !state.error,
    isLoading: state.isLoading,
    error: state.error,
    markAsRead,
    markAllAsRead,
  };
}
