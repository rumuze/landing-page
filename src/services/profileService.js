import { getDataProvider } from "../providers";

export async function ensureUserProfile(firebaseUser) {
  return getDataProvider().ensureUserProfile({ firebaseUser });
}

export async function getUserProfile(uid) {
  return getDataProvider().getUserProfile({ uid });
}

export function subscribeToUserProfile(uid, next, onError) {
  return getDataProvider().subscribeToUserProfile({ uid }, next, onError);
}
