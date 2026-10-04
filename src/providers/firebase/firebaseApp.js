import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getToken, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { firebaseConfig, firebaseSetupIssues, getFirebaseSetupStatus } from "./firebaseSetup";

export { firebaseConfig, getFirebaseSetupStatus };

let appInstance = null;
let authInstance = null;
let dbInstance = null;
let authPersistencePromise = null;

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

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
let appCheckInstance = null;

// App Check proves that requests to Firestore and the visit endpoint come from
// this site and not from a script. It only starts when a reCAPTCHA v3 site key
// is configured, so builds without one behave as before.
function startAppCheck(app) {
  if (appCheckInstance || !recaptchaSiteKey || typeof window === "undefined") {
    return;
  }

  if (import.meta.env.DEV) {
    // Local development: register the token printed in the console in the
    // Firebase Console (App Check, Apps, Manage debug tokens).
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  try {
    appCheckInstance = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(recaptchaSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } catch (error) {
    console.warn("Firebase App Check could not start:", error);
  }
}

/** A current App Check token, or null when App Check is off or unavailable. */
export async function getAppCheckToken() {
  if (!appCheckInstance) {
    return null;
  }

  try {
    const { token } = await getToken(appCheckInstance, false);
    return token || null;
  } catch {
    return null;
  }
}

function getFirebaseApp() {
  assertFirebaseSetup();

  if (!appInstance) {
    appInstance = getApps().length ? getApp() : initializeApp(firebaseConfig);
    startAppCheck(appInstance);
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
