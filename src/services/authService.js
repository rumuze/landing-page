import {
  exchangeGoogleCredential,
  loginWithGooglePopup,
  logoutAuthenticatedUser,
  subscribeToAuthState,
  updateAuthenticatedUserProfile,
} from "../providers/firebase/firebaseAuthProvider";
import {
  ensureFirebaseAuthReady,
  getFirebaseAuth,
  getFirebaseSetupStatus,
  logFirebaseAuthChecklist,
} from "../providers/firebase/firebaseApp";

export {
  ensureFirebaseAuthReady,
  getFirebaseAuth,
  getFirebaseSetupStatus,
  logFirebaseAuthChecklist,
};

export async function loginWithGoogle() {
  return loginWithGooglePopup();
}

export async function logout() {
  return logoutAuthenticatedUser();
}

export async function updateUserProfile(profile) {
  return updateAuthenticatedUserProfile(profile);
}

export function subscribeToAuthenticatedUser(callback) {
  return subscribeToAuthState(callback);
}

export async function signInWithGoogleCredentialToken(idToken) {
  return exchangeGoogleCredential(idToken);
}
