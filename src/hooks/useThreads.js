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

    // 1. Reset state if no user
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
        const threadsRef = collection(db, 'threads');
        
        // 2. Index-Safe Query Selection
        let q;
        if (user.role === 'admin') {
          // Admin View: All threads, sorted by latest activity
          q = query(threadsRef, orderBy('updatedAt', 'desc'));
        } else {
          // User View: Own threads, sorted by latest activity
          // REQUIRES INDEX: userId (ASC) + updatedAt (DESC)
          q = query(
            threadsRef, 
            where('userId', '==', user.uid), 
            orderBy('updatedAt', 'desc')
          );
        }

        // 3. Real-time Subscription
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
            // Handle common index error with a helpful message
            const errorMessage = err.code === 'failed-precondition' 
              ? 'Required index missing. Please check console for the creation link.'
              : 'Failed to load threads list.';
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
          console.error('[useThreads] setup error:', err);
          dispatch({ type: 'ERROR', payload: 'Failed to initialize thread listener.' });
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
