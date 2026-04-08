import { startTransition, useEffect, useReducer, useRef } from "react";
import { useAuth } from "../context/auth-core";
import { subscribeToVisits } from "../services/visitService";

const INITIAL_STATE = {
  visits: [],
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, error: null };
    case "LOADED":
      return { visits: action.payload, isLoading: false, error: null };
    case "ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export function useVisits() {
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

    if (!user?.uid || user.role !== "admin") {
      teardown();
      dispatch({ type: "RESET" });
      return teardown;
    }

    teardown();
    dispatch({ type: "LOADING" });

    let isMounted = true;

    try {
      const unsubscribe = subscribeToVisits(
        (data) => {
          if (!isMounted) {
            return;
          }

          startTransition(() => {
            dispatch({ type: "LOADED", payload: data });
          });
        },
        (error) => {
          if (!isMounted) {
            return;
          }

          console.error("[useVisits] subscription error:", error);
          dispatch({
            type: "ERROR",
            payload: error?.message ?? "Failed to load visit analytics.",
          });
        },
      );

      unsubscribeRef.current = unsubscribe;
    } catch (error) {
      console.error("[useVisits] setup error:", error);
      dispatch({
        type: "ERROR",
        payload: error?.message ?? "Failed to initialize visit analytics.",
      });
    }

    return () => {
      isMounted = false;
      teardown();
    };
  }, [user?.role, user?.uid]);

  return {
    visits: state.visits,
    isLoading: state.isLoading,
    error: state.error,
  };
}
