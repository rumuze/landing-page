import { startTransition, useEffect, useReducer } from "react";
import { getLegacyMessages } from "../services/chatService";

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
    let isActive = true;

    void getLegacyMessages({ mode, userId })
      .then((messages) => {
        if (!isActive) {
          return;
        }

        startTransition(() => {
          dispatch({
            type: "LOADED",
            payload: messages,
          });
        });
      })
      .catch((snapshotError) => {
        if (!isActive) {
          return;
        }

        dispatch({
          type: "ERROR",
          payload:
            snapshotError?.message ??
            "Unable to load legacy messages right now.",
        });
      });

    return () => {
      isActive = false;
    };
  }, [isEnabled, mode, userId]);

  return {
    messages: isEnabled ? state.messages : [],
    isLoading: isEnabled ? state.isLoading : false,
    error: isEnabled ? state.error : "",
  };
}
