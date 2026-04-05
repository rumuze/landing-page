import { startTransition, useEffect, useState } from "react";
import { signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "./auth-core";
import {
  ensureFirebaseAuthReady,
  getFirebaseSetupStatus,
  googleProvider,
} from "../utils/firebaseClient";
import {
  getCurrentGoogleUser,
  subscribeToGoogleAuthUser,
} from "../utils/googleAuth";

const serializeUser = (firebaseUser) => {
  if (!firebaseUser) {
    return null;
  }

  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName ?? null,
    email: firebaseUser.email ?? null,
    photoURL: firebaseUser.photoURL ?? null,
    emailVerified: Boolean(firebaseUser.emailVerified),
    providerData:
      firebaseUser.providerData?.map((provider) => ({
        providerId: provider.providerId ?? null,
        uid: provider.uid ?? null,
        displayName: provider.displayName ?? null,
        email: provider.email ?? null,
        photoURL: provider.photoURL ?? null,
      })) ?? [],
    metadata: firebaseUser.metadata
      ? {
          creationTime: firebaseUser.metadata.creationTime ?? null,
          lastSignInTime: firebaseUser.metadata.lastSignInTime ?? null,
        }
      : null,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const setupStatus = getFirebaseSetupStatus();

  useEffect(() => {
    let isMounted = true;

    const applyUser = (nextUser) => {
      if (!isMounted) {
        return;
      }

      startTransition(() => {
        setUser(serializeUser(nextUser));
      });
    };

    const unsubscribe = subscribeToGoogleAuthUser((nextUser) => {
      applyUser(nextUser);
      if (isMounted) {
        setIsLoading(false);
      }
    });

    void getCurrentGoogleUser()
      .then((nextUser) => {
        applyUser(nextUser);
      })
      .catch((authError) => {
        if (isMounted) {
          setError(authError?.message ?? "Unable to restore your session.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    if (!setupStatus.isConfigValid) {
      const configError = "Firebase Google Auth is not configured yet.";
      setError(configError);
      throw new Error(configError);
    }

    try {
      setError("");
      const auth = await ensureFirebaseAuthReady();
      const result = await signInWithPopup(auth, googleProvider);
      const nextUser = serializeUser(result.user ?? auth.currentUser);

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

      if (setupStatus.isConfigValid) {
        const auth = await ensureFirebaseAuthReady();
        await signOut(auth);
      }

      setUser(null);
    } catch (authError) {
      setError(authError?.message ?? "Unable to sign out right now.");
      throw authError;
    }
  };

  const updateUserProfile = async ({ displayName, photoURL }) => {
    if (!setupStatus.isConfigValid) {
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

    const nextUser = serializeUser(auth.currentUser);
    setUser(nextUser);
    setError("");
    return nextUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        error,
        isConfigured: setupStatus.isConfigValid,
        loginWithGoogle,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
