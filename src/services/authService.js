import {
  loginWithGooglePopup,
  logoutAuthenticatedUser,
  subscribeToAuthState,
  updateAuthenticatedUserProfile,
} from "../providers/firebase/firebaseAuthProvider";
import {
  ensureFirebaseAuthReady,
  getFirebaseSetupStatus,
} from "../providers/firebase/firebaseApp";

export { ensureFirebaseAuthReady, getFirebaseSetupStatus };

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
