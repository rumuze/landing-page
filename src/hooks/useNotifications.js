import { useEffect, useReducer, useCallback, useRef } from 'react';
import {
  collection,
  query,
  where,
  or,
  onSnapshot,
  updateDoc,
  writeBatch,
  doc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getDb } from '../utils/firebaseClient';
import { useAuth } from '../context/auth-core';

/* ─── state shape & reducer ────────────────────────────────────── */

const INITIAL_STATE = {
  notifications: [],
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
      return { notifications: action.payload, isLoading: false, error: null };

    case 'ERROR':
      return { ...state, isLoading: false, error: action.payload };

    case 'RESET':
      return INITIAL_STATE;

    default:
      return state;
  }
}

function getNotificationTime(value) {
  if (!value) return 0;
  if (value instanceof Date) return value.getTime();
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
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
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const unsubscribeRef = useRef(null);

  /* ── Firestore real-time listener ─────────────────────────── */
  useEffect(() => {
    // Clean up any previous listener before setting up a new one
    const teardown = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };

    if (!user?.uid) {
      teardown();
      dispatch({ type: 'RESET' });
      return teardown;
    }

    teardown();
    dispatch({ type: 'LOADING' });

    let isMounted = true;

    const setupListener = async () => {
      try {
        const db = getDb();
        // Admins see notifications targeted to them OR any 'message' notification (from users/guests)
        // Regular users only see notifications targeted to them (replies)
        const q = user.role === 'admin'
          ? query(
              collection(db, 'notifications'),
              or(
                where('userId', '==', user.uid),
                where('type', '==', 'message')
              )
            )
          : query(
              collection(db, 'notifications'),
              where('userId', '==', user.uid)
            );

        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            if (!isMounted) return;
            const data = snapshot.docs
              .map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt?.toDate?.() ?? new Date(),
              }))
              .sort((left, right) => getNotificationTime(right.createdAt) - getNotificationTime(left.createdAt));
            dispatch({ type: 'LOADED', payload: data });
          },
          (err) => {
            if (!isMounted) return;
            console.error('[useNotifications] onSnapshot error:', err);
            dispatch({ type: 'ERROR', payload: err.message ?? 'Failed to load notifications.' });
          }
        );

        if (isMounted) {
          unsubscribeRef.current = unsubscribe;
        } else {
          // Component unmounted before the promise resolved — clean up immediately
          unsubscribe();
        }
      } catch (setupError) {
        if (isMounted) {
          console.error('[useNotifications] setup error:', setupError);
          dispatch({
            type: 'ERROR',
            payload: setupError.message ?? 'Failed to set up notifications listener.',
          });
        }
      }
    };

    setupListener();

    return () => {
      isMounted = false;
      teardown();
    };
  }, [user?.uid, user?.role]);

  /* ── actions ──────────────────────────────────────────────── */

  /** Mark a single notification as read in Firestore. */
  const markAsRead = useCallback(async (notificationId) => {
    try {
      const db = getDb();
      await updateDoc(doc(db, 'notifications', notificationId), { isRead: true });
    } catch (err) {
      console.error('[useNotifications] markAsRead error:', err);
    }
  }, []);

  /** Batch-mark all unread notifications as read in one Firestore write. */
  const markAllAsRead = useCallback(async () => {
    const unread = state.notifications.filter((n) => !n.isRead);
    if (unread.length === 0) return;

    try {
      const db = getDb();
      const batch = writeBatch(db);
      unread.forEach((n) => {
        batch.update(doc(db, 'notifications', n.id), { isRead: true });
      });
      await batch.commit();
    } catch (err) {
      console.error('[useNotifications] markAllAsRead error:', err);
    }
  }, [state.notifications]);

  /**
   * createNotification — programmatically create a Firestore notification.
   *
   * @example
   * // Notify admin when a user sends a message
   * await createNotification({
   *   userId: adminUid,
   *   type: 'message',
   *   title: 'New message received',
   *   body: 'A user sent a message',
   *   link: '/messages/abc123',
   * });
   *
   * // Notify user when admin replies
   * await createNotification({
   *   userId: userUid,
   *   type: 'reply',
   *   title: 'You got a reply',
   *   body: 'Admin replied to your message',
   *   link: '/messages/abc123',
   * });
   */
  const createNotification = useCallback(
    async ({ userId, type, title, body, link = null }) => {
      try {
        const db = getDb();
        await addDoc(collection(db, 'notifications'), {
          userId,
          type, // 'message' | 'reply'
          title,
          body,
          isRead: false,
          link,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.error('[useNotifications] createNotification error:', err);
      }
    },
    []
  );

  /* ── derived ──────────────────────────────────────────────── */
  const unreadCount = state.notifications.filter((n) => !n.isRead).length;

  return {
    notifications: state.notifications,
    unreadCount,
    isLoading: state.isLoading,
    error: state.error,
    markAsRead,
    markAllAsRead,
    createNotification,
  };
}
