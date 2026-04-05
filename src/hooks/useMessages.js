import { startTransition, useEffect, useReducer } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getDb } from "../utils/firebaseClient";
import { mapMessageDocument, sortMessagesByLatest } from "../utils/messages";

const INITIAL_STATE = {
  messages: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "LOADED":
      return {
        messages: action.payload,
        isLoading: false,
        error: "",
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function useMessages({ mode = "user", userId = null } = {}) {
  const isEnabled = mode === "admin" || Boolean(userId);
  const [state, dispatch] = useReducer(reducer, {
    ...INITIAL_STATE,
    isLoading: isEnabled,
  });

  useEffect(() => {
    if (!isEnabled) {
      return () => {};
    }

    dispatch({ type: "LOADING" });

    const messagesRef = collection(getDb(), "messages");
    const messagesQuery =
      mode === "admin"
        ? query(messagesRef, orderBy("createdAt", "desc"))
        : query(messagesRef, where("userId", "==", userId));

    return onSnapshot(
      messagesQuery,
      (snapshot) => {
        const nextMessages = snapshot.docs.map(mapMessageDocument);
        const sortedMessages =
          mode === "admin" ? nextMessages : sortMessagesByLatest(nextMessages);

        startTransition(() => {
          dispatch({
            type: "LOADED",
            payload: sortedMessages,
          });
        });
      },
      (snapshotError) => {
        dispatch({
          type: "ERROR",
          payload:
            snapshotError?.message ??
            "Unable to subscribe to Firestore messages right now.",
        });
      },
    );
  }, [isEnabled, mode, userId]);

  return {
    messages: isEnabled ? state.messages : [],
    isLoading: isEnabled ? state.isLoading : false,
    error: isEnabled ? state.error : "",
  };
}
