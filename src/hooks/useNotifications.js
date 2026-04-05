import { useEffect, useReducer, useCallback, useRef } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  writeBatch,
  doc,
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

  useEffect(() => {
    const teardown = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };

    // 1. Validate User
    if (!user?.uid) {
      teardown();
      dispatch({ type: 'RESET' });
      return;
    }

    teardown();
    dispatch({ type: 'LOADING' });

    let isMounted = true;

    const setup = () => {
      try {
        const db = getDb();
        
        // 2. Index-Safe Query: User's notifications sorted by newest first
        // REQUIRES INDEX: userId (ASC) + createdAt (DESC)
        const q = query(
          collection(db, 'notifications'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        // 3. Real-time Subscription
        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            if (!isMounted) return;
            const data = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
              createdAt: docSnap.data().createdAt?.toDate?.() ?? new Date(),
            }));
            dispatch({ type: 'LOADED', payload: data });
          },
          (err) => {
            if (!isMounted) return;
            console.error('[useNotifications] onSnapshot error:', err);
            const errorMessage = err.code === 'failed-precondition'
              ? 'Notifications index missing. Check console.'
              : 'Failed to load notifications.';
            dispatch({ type: 'ERROR', payload: errorMessage });
          }
        );

        if (isMounted) {
          unsubscribeRef.current = unsubscribe;
        } else {
          unsubscribe();
        }
      } catch (err) {
        if (isMounted) {
          console.error('[useNotifications] setup error:', err);
          dispatch({ type: 'ERROR', payload: 'Failed to initialize notifications.' });
        }
      }
    };

    setup();

    return () => {
      isMounted = false;
      teardown();
    };
  }, [user?.uid]);

  /* ── Actions ────────────────────────────────────────────────── */

  const markAsRead = useCallback(async (notificationId) => {
    try {
      const db = getDb();
      await updateDoc(doc(db, 'notifications', notificationId), { isRead: true });
    } catch (err) {
      console.error('[useNotifications] markAsRead error:', err);
    }
  }, []);

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

  /* ── Derived ────────────────────────────────────────────────── */
  const unreadCount = state.notifications.filter((n) => !n.isRead).length;

  return {
    notifications: state.notifications,
    unreadCount,
    isLoading: state.isLoading,
    error: state.error,
    markAsRead,
    markAllAsRead,
  };
}
