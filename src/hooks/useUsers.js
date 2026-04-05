import { useEffect, useReducer, useCallback, useRef } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { getDb } from '../utils/firebaseClient';
import { useAuth } from '../context/auth-core';

/* ─── reducer ───────────────────────────────────────────────────── */

const INITIAL_STATE = { users: [], isLoading: false, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true, error: null };
    case 'LOADED':
      return { users: action.payload, isLoading: false, error: null };
    case 'ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

/* ─── hook ──────────────────────────────────────────────────────── */

/**
 * useUsers
 *
 * Admin-only real-time Firestore listener for the /users collection.
 * Returns all users sorted by createdAt descending, plus role update actions.
 */
export function useUsers() {
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

    // Only admins may subscribe
    if (!user?.uid || user.role !== 'admin') {
      teardown();
      dispatch({ type: 'RESET' });
      return teardown;
    }

    teardown();
    dispatch({ type: 'LOADING' });

    let isMounted = true;

    const setup = async () => {
      try {
        const db = getDb();
        const unsubscribe = onSnapshot(
          collection(db, 'users'),
          (snapshot) => {
            if (!isMounted) return;
            const data = snapshot.docs
              .map((docSnap) => ({
                uid: docSnap.id,
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt?.toDate?.() ?? null,
                lastLoginAt: docSnap.data().lastLoginAt?.toDate?.() ?? null,
              }))
              .sort((a, b) => {
                const ta = a.createdAt?.getTime() ?? 0;
                const tb = b.createdAt?.getTime() ?? 0;
                return tb - ta;
              });
            dispatch({ type: 'LOADED', payload: data });
          },
          (err) => {
            if (!isMounted) return;
            console.error('[useUsers] onSnapshot error:', err);
            dispatch({ type: 'ERROR', payload: err.message ?? 'Failed to load users.' });
          }
        );

        if (isMounted) {
          unsubscribeRef.current = unsubscribe;
        } else {
          unsubscribe();
        }
      } catch (err) {
        if (isMounted) {
          console.error('[useUsers] setup error:', err);
          dispatch({ type: 'ERROR', payload: err.message ?? 'Failed to set up users listener.' });
        }
      }
    };

    setup();

    return () => {
      isMounted = false;
      teardown();
    };
  }, [user?.uid, user?.role]);

  /** Promote a user to admin role */
  const promoteToAdmin = useCallback(async (uid) => {
    try {
      await updateDoc(doc(getDb(), 'users', uid), { role: 'admin' });
    } catch (err) {
      console.error('[useUsers] promoteToAdmin error:', err);
      throw err;
    }
  }, []);

  /** Demote a user to regular user role */
  const demoteToUser = useCallback(async (uid) => {
    try {
      await updateDoc(doc(getDb(), 'users', uid), { role: 'user' });
    } catch (err) {
      console.error('[useUsers] demoteToUser error:', err);
      throw err;
    }
  }, []);

  const adminCount = state.users.filter((u) => u.role === 'admin').length;
  const userCount = state.users.filter((u) => u.role === 'user').length;

  return {
    users: state.users,
    isLoading: state.isLoading,
    error: state.error,
    adminCount,
    userCount,
    promoteToAdmin,
    demoteToUser,
  };
}
