import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import {
  ensureFirebaseAuthReady,
  getFirebaseAuth,
  getFirebaseSetupStatus,
} from "./firebaseClient";

const GOOGLE_IDENTITY_SCRIPT_URL = "https://accounts.google.com/gsi/client";
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "";

let googleIdentityScriptPromise = null;

const showAuthAlert = (message) => {
  if (typeof window !== "undefined") {
    window.alert(message);
  }
};

const decodeJwtPayload = (token) => {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const normalizedPayload = payload.replace(/-/gu, "+").replace(/_/gu, "/");
    const decodedPayload = atob(normalizedPayload);
    const utf8Payload = decodeURIComponent(
      Array.from(decodedPayload, (char) =>
        `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`,
      ).join(""),
    );

    return JSON.parse(utf8Payload);
  } catch (error) {
    console.warn("Unable to decode Google credential payload:", error);
    return null;
  }
};

const buildLocalGoogleUser = (idToken) => {
  const claims = decodeJwtPayload(idToken);

  if (!claims) {
    return null;
  }

  return {
    uid: claims.sub ?? claims.email ?? "google-identity-user",
    displayName: claims.name ?? null,
    email: claims.email ?? null,
    photoURL: claims.picture ?? null,
    emailVerified: Boolean(claims.email_verified),
    providerId: "google.com",
    isLocalOnly: true,
    claims,
  };
};

const createGoogleIdentityConfigError = (message) => {
  const error = new Error(message);
  error.code = "google-identity/configuration-invalid";
  return error;
};

const getGoogleIdentityIssues = () => {
  const issues = [];

  if (!googleClientId) {
    issues.push("Missing VITE_GOOGLE_CLIENT_ID.");
  } else if (!googleClientId.endsWith(".apps.googleusercontent.com")) {
    issues.push(
      'VITE_GOOGLE_CLIENT_ID must be a Google OAuth Web Client ID ending with ".apps.googleusercontent.com".',
    );
  }

  return issues;
};

const getGoogleConsoleChecklist = () => {
  const currentOrigin =
    typeof window === "undefined" ? null : window.location.origin;

  return [
    "Load the GIS script from https://accounts.google.com/gsi/client.",
    "Add the current origin to Google Cloud Console > APIs & Services > Credentials > Authorized JavaScript origins.",
    currentOrigin ? `Current origin: ${currentOrigin}.` : null,
  ].filter(Boolean);
};

const getGoogleAuthSetupMessage = () => {
  const googleIssues = getGoogleIdentityIssues();
  const firebaseStatus = getFirebaseSetupStatus();

  return [
    "Google Sign-In is not configured correctly. Review these items:",
    "",
    ...googleIssues.map((issue) => `- ${issue}`),
    ...getGoogleConsoleChecklist().map((item) => `- ${item}`),
    firebaseStatus.isConfigValid
      ? "- Firebase is ready. Google credentials will also create a Firebase session."
      : "- Firebase is optional. Configure it only if you want the Google JWT to create a persisted Firebase session.",
    ...(!firebaseStatus.isConfigValid
      ? firebaseStatus.issues.map((issue) => `- ${issue}`)
      : []),
  ].join("\n");
};

const getGoogleIdentityWindow = () => {
  const googleIdentity = window.google?.accounts?.id;

  if (!googleIdentity) {
    throw new Error("Google Identity Services did not finish loading.");
  }

  return googleIdentity;
};

export function getGoogleIdentitySetupStatus() {
  const issues = getGoogleIdentityIssues();

  return {
    isConfigValid: issues.length === 0,
    issues,
    clientId: googleClientId || null,
    consoleChecklist: getGoogleConsoleChecklist(),
    firebaseStatus: getFirebaseSetupStatus(),
  };
}

export async function loadGoogleIdentityScript() {
  if (typeof window === "undefined") {
    return null;
  }

  if (window.google?.accounts?.id) {
    return window.google;
  }

  if (googleIdentityScriptPromise) {
    return googleIdentityScriptPromise;
  }

  googleIdentityScriptPromise = new Promise((resolve, reject) => {
    const resolveWhenReady = () => {
      if (window.google?.accounts?.id) {
        resolve(window.google);
        return;
      }

      reject(new Error("Google Identity Services loaded without the accounts.id API."));
    };

    const existingScript = document.querySelector(
      `script[src="${GOOGLE_IDENTITY_SCRIPT_URL}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener("load", resolveWhenReady, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google Identity Services.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = GOOGLE_IDENTITY_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = resolveWhenReady;
    script.onerror = () =>
      reject(new Error("Failed to load Google Identity Services."));
    document.head.append(script);
  }).catch((error) => {
    googleIdentityScriptPromise = null;
    throw error;
  });

  return googleIdentityScriptPromise;
}

export async function initializeGoogleIdentity(callback) {
  const setupStatus = getGoogleIdentitySetupStatus();

  if (!setupStatus.isConfigValid) {
    throw createGoogleIdentityConfigError(getGoogleAuthSetupMessage());
  }

  await loadGoogleIdentityScript();

  const googleIdentity = getGoogleIdentityWindow();

  googleIdentity.initialize({
    client_id: googleClientId,
    callback,
    auto_select: false,
    context: "signin",
    itp_support: true,
    use_fedcm_for_prompt: true,
  });

  return googleIdentity;
}

export function renderGoogleSignInButton(element, options = {}) {
  if (!element || typeof window === "undefined") {
    return;
  }

  const googleIdentity = getGoogleIdentityWindow();
  const buttonWidth = Math.max(
    240,
    Math.min(360, Math.round(element.getBoundingClientRect().width || 320)),
  );

  element.replaceChildren();

  googleIdentity.renderButton(element, {
    theme: "outline",
    size: "large",
    type: "standard",
    text: "continue_with",
    shape: "pill",
    logo_alignment: "left",
    width: buttonWidth,
    ...options,
  });
}

export function promptGoogleOneTap(callback) {
  if (typeof window === "undefined" || !window.google?.accounts?.id) {
    return;
  }

  window.google.accounts.id.prompt(callback);
}

export function cancelGoogleOneTap() {
  if (typeof window === "undefined" || !window.google?.accounts?.id) {
    return;
  }

  window.google.accounts.id.cancel();
}

export async function loginWithGoogleCredential(idToken) {
  if (!idToken) {
    throw new Error("Google did not return a credential.");
  }

  console.log("Google JWT:", idToken);

  const firebaseStatus = getFirebaseSetupStatus();

  if (!firebaseStatus.isConfigValid) {
    return {
      user: buildLocalGoogleUser(idToken),
      credential: idToken,
      provider: "google-identity",
    };
  }

  try {
    const auth = await ensureFirebaseAuthReady();
    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);

    return {
      user: result.user ?? auth.currentUser ?? buildLocalGoogleUser(idToken),
      credential: idToken,
      provider: "firebase",
    };
  } catch (error) {
    const errorCode = error?.code ?? "auth/unknown";
    const errorMessage = error?.message ?? "Unknown Google credential error";

    console.error("Google credential exchange failed:", errorCode, errorMessage);

    if (
      errorCode === "auth/internal-error" ||
      errorCode === "auth/operation-not-allowed" ||
      errorCode === "auth/unauthorized-domain" ||
      errorCode === "auth/configuration-invalid"
    ) {
      showAuthAlert(getGoogleAuthSetupMessage());
    }

    throw error;
  }
}

export async function getCurrentGoogleUser() {
  try {
    const firebaseStatus = getFirebaseSetupStatus();

    if (!firebaseStatus.isConfigValid) {
      return null;
    }

    const auth = await ensureFirebaseAuthReady();
    return auth.currentUser ?? null;
  } catch (error) {
    console.error("Unable to restore Firebase auth user:", error);
    return null;
  }
}

export function subscribeToGoogleAuthUser(callback) {
  const firebaseStatus = getFirebaseSetupStatus();

  if (!firebaseStatus.isConfigValid) {
    return () => {};
  }

  try {
    return onAuthStateChanged(getFirebaseAuth(), callback);
  } catch (error) {
    console.error("Google auth listener setup failed:", error);
    callback(null);
    return () => {};
  }
}
