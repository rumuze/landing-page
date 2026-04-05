import { startTransition, useEffect, useReducer, useRef } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/auth-core';
import {
  buildThreadsQuery,
  mapThreadDocument,
  sortThreadsByLatest,
} from '../utils/messages';

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
  const userUid = user?.uid ?? null;
  const userRole = user?.role ?? null;
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
        const threadsQuery = buildThreadsQuery({
          user: { uid: userUid, role: userRole },
        });

        if (!threadsQuery) {
          dispatch({ type: 'RESET' });
          return;
        }

        const unsubscribe = onSnapshot(
          threadsQuery,
          (snapshot) => {
            if (!isMounted) return;
            const data = sortThreadsByLatest(snapshot.docs.map(mapThreadDocument));

            startTransition(() => {
              dispatch({ type: 'LOADED', payload: data });
            });
          },
          (err) => {
            if (!isMounted) return;
            console.error('[useThreads] onSnapshot error:', err);
            const errorMessage = err.code === 'failed-precondition' 
              ? 'Missing Firestore index on admin inbox query.'
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
  }, [userRole, userUid]);

  return {
    threads: state.threads,
    isEmpty: !state.isLoading && state.threads.length === 0 && !state.error,
    isLoading: state.isLoading,
    error: state.error,
  };
}
