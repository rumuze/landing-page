import { startTransition, useEffect, useState } from "react";
import { AuthContext } from "./auth-core";
import { getFirebaseSetupStatus } from "../providers/firebase/firebaseSetup";
import { buildSessionUser } from "../models/userProfile";

// The Firebase SDK is large and public pages do not need it to render, so it
// is loaded after the page has settled (or sooner when a visitor signs in).
const loadFirebaseAuth = () =>
  Promise.all([import("../services/authService"), import("../utils/userProfiles")]).then(
    ([authService, profiles]) => ({ authService, ...profiles }),
  );

const whenIdle = (callback) => {
  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(callback, { timeout: 3000 });
    return () => window.cancelIdleCallback(handle);
  }
  const handle = window.setTimeout(callback, 1500);
  return () => window.clearTimeout(handle);
};

// Anonymous visitors on public pages do not need Firebase until they do
// something that uses it. Returning users (a saved session) and account pages
// start it straight away.
const ACCOUNT_PATH = /^(\/ar)?\/(profile|settings|my-messages|admin)(\/|$)/u;
const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"];
const DEFERRED_START_MS = 8000;

const needsFirebaseNow = () => {
  if (ACCOUNT_PATH.test(window.location.pathname)) {
    return true;
  }

  try {
    return Object.keys(window.localStorage).some((key) => key.startsWith("firebase:authUser:"));
  } catch {
    return true;
  }
};

const whenInteractedOrLate = (callback) => {
  let done = false;
  const run = () => {
    if (!done) {
      done = true;
      cleanup();
      callback();
    }
  };
  const timer = window.setTimeout(run, DEFERRED_START_MS);
  const cleanup = () => {
    window.clearTimeout(timer);
    INTERACTION_EVENTS.forEach((name) => window.removeEventListener(name, run));
  };
  INTERACTION_EVENTS.forEach((name) => window.addEventListener(name, run, { once: true, passive: true }));
  return cleanup;
};

export const AuthProvider = ({ children }) => {
  const setupStatus = getFirebaseSetupStatus();
  const isConfigured = setupStatus.isConfigValid;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    let unsubscribeAuth = () => {};
    let unsubscribeProfile = () => {};
    let cancelIdle = () => {};

    const applyUser = (firebaseUser, profile) => {
      if (!isMounted) {
        return;
      }

      startTransition(() => {
        setUser(buildSessionUser(firebaseUser, profile));
      });
    };

    const handleProfileError = (profileError) => {
      if (!isMounted) {
        return;
      }

      setError(profileError?.message ?? "Unable to load your account profile.");
      setIsLoading(false);
    };

    if (!isConfigured) {
      setIsLoading(false);
      return () => {
        isMounted = false;
      };
    }

    const start = () => void loadFirebaseAuth()
      .then(async (firebase) => {
        await firebase.authService.ensureFirebaseAuthReady();
        return firebase;
      })
      .then(({ authService, ensureUserProfile, subscribeToUserProfile }) => {
        if (!isMounted) {
          return;
        }

        unsubscribeAuth = authService.subscribeToAuthenticatedUser((firebaseUser) => {
          unsubscribeProfile();
          unsubscribeProfile = () => {};

          if (!firebaseUser) {
            setUser(null);
            setError("");
            setIsLoading(false);
            return;
          }

          setIsLoading(true);

          void ensureUserProfile(firebaseUser)
            .then((userRef) => {
              if (!isMounted || !userRef) {
                return;
              }

              unsubscribeProfile = subscribeToUserProfile(
                firebaseUser.uid,
                (profile) => {
                  applyUser(firebaseUser, profile);

                  if (isMounted) {
                    setError("");
                    setIsLoading(false);
                  }
                },
                handleProfileError,
              );
            })
            .catch((authError) => {
              if (!isMounted) {
                return;
              }

              setError(authError?.message ?? "Unable to prepare your account.");
              applyUser(firebaseUser, null);
              setIsLoading(false);
            });
        });
      })
      .catch((authError) => {
        if (!isMounted) {
          return;
        }

        setError(authError?.message ?? "Unable to restore your session.");
        setIsLoading(false);
      });

    if (needsFirebaseNow()) {
      cancelIdle = whenIdle(start);
    } else {
      // No saved session: nothing to restore, so the page is ready as anonymous.
      setIsLoading(false);
      cancelIdle = whenInteractedOrLate(() => {
        cancelIdle = whenIdle(start);
      });
    }

    return () => {
      isMounted = false;
      cancelIdle();
      unsubscribeProfile();
      unsubscribeAuth();
    };
  }, [isConfigured]);

  const loginWithGoogle = async () => {
    if (!isConfigured) {
      const configError = "Firebase Google Auth is not configured yet.";
      setError(configError);
      throw new Error(configError);
    }

    try {
      setError("");
      const { authService, ensureUserProfile, getUserProfile } = await loadFirebaseAuth();
      const { user: firebaseUser } = await authService.loginWithGoogle();

      await ensureUserProfile(firebaseUser);
      const profile = await getUserProfile(firebaseUser.uid);

      const nextUser = buildSessionUser(firebaseUser, profile);
      setUser(nextUser);
      return nextUser;
    } catch (authError) {
      const errorCode = authError?.code ?? "auth/unknown";

      if (
        errorCode === "auth/popup-closed-by-user" ||
        errorCode === "auth/cancelled-popup-request"
      ) {
        return null;
      }

      setError(authError?.message ?? "Unable to sign in right now.");
      throw authError;
    }
  };

  const logout = async () => {
    try {
      setError("");

      if (isConfigured) {
        const { authService } = await loadFirebaseAuth();
        await authService.logout();
      }

      setUser(null);
      setIsLoading(false);
    } catch (authError) {
      setError(authError?.message ?? "Unable to sign out right now.");
      throw authError;
    }
  };

  const updateUserProfile = async ({ displayName, photoURL }) => {
    if (!isConfigured) {
      const configError = "Firebase Google Auth is not configured yet.";
      setError(configError);
      throw new Error(configError);
    }

    const { authService, ensureUserProfile, getUserProfile } = await loadFirebaseAuth();
    const auth = await authService.ensureFirebaseAuthReady();

    if (!auth.currentUser) {
      throw new Error("No authenticated user found.");
    }

    await authService.updateUserProfile({
      displayName: displayName?.trim() || null,
      photoURL: photoURL?.trim() || null,
    });

    await ensureUserProfile(auth.currentUser);
    const profile = await getUserProfile(auth.currentUser.uid);

    const nextUser = buildSessionUser(auth.currentUser, profile);
    setUser(nextUser);
    setError("");
    return nextUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === "admin",
        setUser,
        isLoading,
        loading: isLoading,
        error,
        isConfigured,
        loginWithGoogle,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
