import { useEffect, useReducer, useRef } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { getDb } from '../utils/firebaseClient';
import { useAuth } from '../context/auth-core';

const INITIAL_STATE = {
  messages: [],
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true, error: null };
    case 'LOADED':
      return { messages: action.payload, isLoading: false, error: null };
    case 'ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export function useChat(threadId) {
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

    if (!threadId) {
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
        const chatRef = collection(db, `threads/${threadId}/messages`);
        const q = query(chatRef, orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            if (!isMounted) return;
            const data = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
              createdAt: docSnap.data().createdAt?.toDate?.() ?? null,
            }));
            dispatch({ type: 'LOADED', payload: data });
          },
          (err) => {
            if (!isMounted) return;
            console.error('[useChat] onSnapshot error:', err);
            dispatch({ type: 'ERROR', payload: err.message ?? 'Failed to load chat messages.' });
          }
        );

        if (isMounted) {
          unsubscribeRef.current = unsubscribe;
        } else {
          unsubscribe();
        }
      } catch (err) {
        if (isMounted) {
          console.error('[useChat] setup error:', err);
          dispatch({ type: 'ERROR', payload: err.message ?? 'Failed to initialize chat listener.' });
        }
      }
    };

    setup();

    return () => {
      isMounted = false;
      teardown();
    };
  }, [threadId, user?.uid]);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
  };
}
