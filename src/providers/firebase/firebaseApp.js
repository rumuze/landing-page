import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredFirebaseConfig = {
  VITE_FIREBASE_API_KEY: firebaseConfig.apiKey,
  VITE_FIREBASE_AUTH_DOMAIN: firebaseConfig.authDomain,
  VITE_FIREBASE_PROJECT_ID: firebaseConfig.projectId,
  VITE_FIREBASE_APP_ID: firebaseConfig.appId,
};

const missingFirebaseConfigKeys = Object.entries(requiredFirebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

const authDomain = firebaseConfig.authDomain ?? "";
const authDomainProjectId = authDomain.endsWith(".firebaseapp.com")
  ? authDomain.replace(/\.firebaseapp\.com$/u, "")
  : null;

const firebaseSetupIssues = [];

if (missingFirebaseConfigKeys.length > 0) {
  firebaseSetupIssues.push(
    `Missing Firebase env keys: ${missingFirebaseConfigKeys.join(", ")}`,
  );
}

if (authDomain && !authDomain.endsWith(".firebaseapp.com")) {
  firebaseSetupIssues.push(
    `VITE_FIREBASE_AUTH_DOMAIN must use the Firebase hosting domain format (<project-id>.firebaseapp.com). Received "${authDomain}".`,
  );
}

if (
  authDomainProjectId &&
  firebaseConfig.projectId &&
  authDomainProjectId !== firebaseConfig.projectId
) {
  firebaseSetupIssues.push(
    `VITE_FIREBASE_AUTH_DOMAIN (${authDomain}) must match VITE_FIREBASE_PROJECT_ID (${firebaseConfig.projectId}).`,
  );
}

const firebaseConsoleChecklist = [
  "Enable Google in Firebase Console > Authentication > Sign-in method.",
  "Select a project support email for the Google provider.",
  "Add localhost and 127.0.0.1 to Firebase Console > Authentication > Settings > Authorized domains.",
  `Keep authDomain set to ${firebaseConfig.projectId || "<project-id>"}.firebaseapp.com.`,
];

let appInstance = null;
let authInstance = null;
let dbInstance = null;
let authPersistencePromise = null;
let hasLoggedConsoleChecklist = false;

const createFirebaseConfigError = () => {
  const error = new Error(firebaseSetupIssues.join(" "));
  error.code = "auth/configuration-invalid";
  return error;
};

const assertFirebaseSetup = () => {
  if (firebaseSetupIssues.length > 0) {
    throw createFirebaseConfigError();
  }
};

export function getFirebaseSetupStatus() {
  return {
    isConfigValid: firebaseSetupIssues.length === 0,
    issues: [...firebaseSetupIssues],
    consoleChecklist: [...firebaseConsoleChecklist],
    configSummary: {
      authDomain: firebaseConfig.authDomain ?? null,
      projectId: firebaseConfig.projectId ?? null,
    },
  };
}

export function logFirebaseAuthChecklist() {
  if (hasLoggedConsoleChecklist || typeof window === "undefined") {
    return;
  }

  hasLoggedConsoleChecklist = true;

  console.info(
    "[Firebase Auth] Popup prerequisites:",
    ...firebaseConsoleChecklist,
  );
}

export function getFirebaseApp() {
  assertFirebaseSetup();

  if (!appInstance) {
    appInstance = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }

  return appInstance;
}

export function getFirestoreDb() {
  if (!dbInstance) {
    dbInstance = getFirestore(getFirebaseApp());
  }

  return dbInstance;
}

export function getFirebaseAuth() {
  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp());
    authInstance.useDeviceLanguage();
    authPersistencePromise = setPersistence(authInstance, browserLocalPersistence)
      .catch((error) => {
        console.warn("Firebase auth persistence setup failed:", error);
      });
  }

  return authInstance;
}

export async function ensureFirebaseAuthReady() {
  const auth = getFirebaseAuth();

  if (authPersistencePromise) {
    await authPersistencePromise;
  }

  return auth;
}

export const firebaseGoogleProvider = new GoogleAuthProvider();

firebaseGoogleProvider.addScope("email");
firebaseGoogleProvider.addScope("profile");
firebaseGoogleProvider.setCustomParameters({
  prompt: "select_account",
});
