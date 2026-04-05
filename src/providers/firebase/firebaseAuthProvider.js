import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  ensureFirebaseAuthReady,
  firebaseGoogleProvider,
  getFirebaseAuth,
} from "./firebaseApp";

export async function loginWithGooglePopup() {
  const auth = await ensureFirebaseAuthReady();
  const result = await signInWithPopup(auth, firebaseGoogleProvider);

  return {
    auth,
    result,
    user: result.user ?? auth.currentUser ?? null,
  };
}

export async function logoutAuthenticatedUser() {
  const auth = await ensureFirebaseAuthReady();
  await signOut(auth);
}

export async function updateAuthenticatedUserProfile(profile) {
  const auth = await ensureFirebaseAuthReady();

  if (!auth.currentUser) {
    throw new Error("No authenticated user found.");
  }

  await updateProfile(auth.currentUser, profile);
  return auth.currentUser;
}

export function subscribeToAuthState(callback) {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

export async function exchangeGoogleCredential(idToken) {
  const auth = await ensureFirebaseAuthReady();
  const credential = GoogleAuthProvider.credential(idToken);
  const result = await signInWithCredential(auth, credential);

  return {
    auth,
    result,
    user: result.user ?? auth.currentUser ?? null,
  };
}
