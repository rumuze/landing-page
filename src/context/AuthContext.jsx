import { startTransition, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./auth-core";
import {
  ensureFirebaseAuthReady,
  getFirebaseSetupStatus,
  googleProvider,
} from "../utils/firebaseClient";
import {
  buildSessionUser,
  ensureUserProfile,
  getUserProfile,
  subscribeToUserProfile,
} from "../utils/userProfiles";

export const AuthProvider = ({ children }) => {
  const setupStatus = getFirebaseSetupStatus();
  const isConfigured = setupStatus.isConfigValid;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(isConfigured);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    let unsubscribeAuth = () => {};
    let unsubscribeProfile = () => {};

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
      return () => {
        isMounted = false;
      };
    }

    void ensureFirebaseAuthReady()
      .then((auth) => {
        if (!isMounted) {
          return;
        }

        unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
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

    return () => {
      isMounted = false;
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
      const auth = await ensureFirebaseAuthReady();
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user ?? auth.currentUser;

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
        const auth = await ensureFirebaseAuthReady();
        await signOut(auth);
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

    const auth = await ensureFirebaseAuthReady();

    if (!auth.currentUser) {
      throw new Error("No authenticated user found.");
    }

    await updateProfile(auth.currentUser, {
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
