import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDb } from "./firebaseClient";

const normalizeString = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const getFallbackName = (firebaseUser) => {
  const displayName = normalizeString(firebaseUser?.displayName);

  if (displayName) {
    return displayName;
  }

  const email = normalizeString(firebaseUser?.email);

  if (email.includes("@")) {
    return email.split("@")[0];
  }

  return "User";
};

export const normalizeUserRole = (role) =>
  role === "admin" ? "admin" : "user";

export const buildUserProfileDraft = (firebaseUser) => ({
  uid: firebaseUser.uid,
  email: normalizeString(firebaseUser.email),
  name: getFallbackName(firebaseUser),
  role: "user",
  createdAt: serverTimestamp(),
  photoURL: normalizeString(firebaseUser.photoURL),
});

export async function ensureUserProfile(firebaseUser) {
  if (!firebaseUser?.uid) {
    return null;
  }

  const userRef = doc(getDb(), "users", firebaseUser.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, buildUserProfileDraft(firebaseUser));
    return userRef;
  }

  const profile = snapshot.data();
  const nextEmail = normalizeString(firebaseUser.email);
  const nextName = getFallbackName(firebaseUser);
  const nextPhotoURL = normalizeString(firebaseUser.photoURL);
  const updates = {};

  if ((profile.email ?? "") !== nextEmail) {
    updates.email = nextEmail;
  }

  if ((profile.name ?? "") !== nextName) {
    updates.name = nextName;
  }

  if ((profile.photoURL ?? "") !== nextPhotoURL) {
    updates.photoURL = nextPhotoURL;
  }

  if (!profile.uid) {
    updates.uid = firebaseUser.uid;
  }

  if (Object.keys(updates).length > 0) {
    await setDoc(userRef, updates, { merge: true });
  }

  return userRef;
}

export async function getUserProfile(uid) {
  if (!uid) {
    return null;
  }

  const snapshot = await getDoc(doc(getDb(), "users", uid));
  return snapshot.exists() ? snapshot.data() : null;
}

export function subscribeToUserProfile(uid, next, onError) {
  if (!uid) {
    return () => {};
  }

  return onSnapshot(doc(getDb(), "users", uid), (snapshot) => {
    next(snapshot.exists() ? snapshot.data() : null);
  }, onError);
}

export function buildSessionUser(firebaseUser, profile) {
  if (!firebaseUser) {
    return null;
  }

  const name = normalizeString(profile?.name) || getFallbackName(firebaseUser);
  const email = normalizeString(profile?.email) || normalizeString(firebaseUser.email) || null;
  const photoURL =
    normalizeString(profile?.photoURL) ||
    normalizeString(firebaseUser.photoURL) ||
    null;

  return {
    uid: firebaseUser.uid,
    displayName: name,
    name,
    email,
    photoURL,
    role: normalizeUserRole(profile?.role),
    profileCreatedAt: profile?.createdAt ?? null,
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
}
