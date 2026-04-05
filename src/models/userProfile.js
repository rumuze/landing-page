export const normalizeString = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

export const getFallbackName = (firebaseUser) => {
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

export const createUserProfileDraft = (firebaseUser, timestampFactory) => ({
  uid: firebaseUser.uid,
  email: normalizeString(firebaseUser.email),
  name: getFallbackName(firebaseUser),
  role: "user",
  createdAt: timestampFactory(),
  photoURL: normalizeString(firebaseUser.photoURL),
  lastLoginAt: timestampFactory(),
  messagesCount: 0,
});

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
