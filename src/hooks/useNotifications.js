import { startTransition, useCallback, useEffect, useReducer, useRef } from "react";
import { useAuth } from "../context/auth-core";
import {
  markNotificationAsRead,
  markNotificationsAsRead,
  subscribeToNotifications,
} from "../services/chatService";

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

  useEffect(() => {
    const teardown = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };

    // 1. Validate User
    if (!userUid) {
      teardown();
      dispatch({ type: 'RESET' });
      return;
    }

    teardown();
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
            const errorMessage = err.code === "failed-precondition"
              ? "Missing Firestore index: notifications requires userId (ASC) + createdAt (DESC)."
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
