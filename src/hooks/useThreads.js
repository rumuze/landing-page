import { useEffect, useReducer, useRef } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { getDb } from '../utils/firebaseClient';
import { useAuth } from '../context/auth-core';

const INITIAL_STATE = {
  threads: [],
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true, error: null };
    case 'LOADED':
      return { threads: action.payload, isLoading: false, error: null };
    case 'ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export function useThreads() {
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

    teardown();
    dispatch({ type: 'LOADING' });

    let isMounted = true;

    const setup = () => {
      try {
        const db = getDb();
        const threadsRef = collection(db, 'threads');
        
        let q;
        if (user?.role === 'admin') {
          // Admin sees all threads
          q = query(threadsRef, orderBy('updatedAt', 'desc'));
        } else if (user?.uid) {
          // Regular user sees only their threads
          q = query(threadsRef, where('userId', '==', user.uid), orderBy('updatedAt', 'desc'));
        } else {
          // Guests or logged out users cannot use useThreads easily unless we store thread IDs locally.
          // For now, return empty. Guests rely on single thread views if they have the ID.
          dispatch({ type: 'LOADED', payload: [] });
          return;
        }

        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            if (!isMounted) return;
            const data = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
              createdAt: docSnap.data().createdAt?.toDate?.() ?? null,
              updatedAt: docSnap.data().updatedAt?.toDate?.() ?? null,
            }));
            dispatch({ type: 'LOADED', payload: data });
          },
          (err) => {
            if (!isMounted) return;
            console.error('[useThreads] onSnapshot error:', err);
            dispatch({ type: 'ERROR', payload: err.message ?? 'Failed to load threads.' });
          }
        );

        if (isMounted) {
          unsubscribeRef.current = unsubscribe;
        } else {
          unsubscribe();
        }
      } catch (err) {
        if (isMounted) {
          console.error('[useThreads] setup error:', err);
          dispatch({ type: 'ERROR', payload: err.message ?? 'Failed to initialize threads listener.' });
        }
      }
    };

    setup();

    return () => {
      isMounted = false;
      teardown();
    };
  }, [user?.uid, user?.role]);

  return {
    threads: state.threads,
    isLoading: state.isLoading,
    error: state.error,
  };
}
