import { startTransition, useEffect, useReducer, useRef } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { buildMessagesQuery, mapChatMessageDocument } from '../utils/messages';

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
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    const teardown = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };

    // 1. Validate threadId
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
        const chatQuery = buildMessagesQuery(threadId);

        const unsubscribe = onSnapshot(
          chatQuery,
          (snapshot) => {
            if (!isMounted) return;
            const data = snapshot.docs.map(mapChatMessageDocument);

            startTransition(() => {
              dispatch({ type: 'LOADED', payload: data });
            });
          },
          (err) => {
            if (!isMounted) return;
            console.error('[useChat] onSnapshot error:', err);
            dispatch({ type: 'ERROR', payload: 'Failed to load chat messages.' });
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
          dispatch({ type: 'ERROR', payload: 'Failed to initialize chat listener.' });
        }
      }
    };

    setup();

    return () => {
      isMounted = false;
      teardown();
    };
  }, [threadId]);

  return {
    messages: state.messages,
    isEmpty: !state.isLoading && state.messages.length === 0 && !state.error,
    isLoading: state.isLoading,
    error: state.error,
  };
}
