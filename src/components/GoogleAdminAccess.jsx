import { startTransition, useEffect, useEffectEvent, useRef, useState } from "react";
import {
  cancelGoogleOneTap,
  getCurrentGoogleUser,
  getGoogleIdentitySetupStatus,
  initializeGoogleIdentity,
  loginWithGoogleCredential,
  promptGoogleOneTap,
  renderGoogleSignInButton,
  subscribeToGoogleAuthUser,
} from "../utils/googleAuth";

const DEFAULT_STATUS_COPY =
  "Google will open the native account chooser with account selection and cancel support.";
const GOOGLE_LOGO_URL = "https://developers.google.com/identity/images/g-logo.png";
const GOOGLE_FAB_CLASSNAME = [
  "group",
  "relative",
  "flex h-12 w-12 items-center justify-center rounded-full",
  "border border-slate-200/80 bg-white text-slate-950",
  "shadow-[0_18px_38px_rgba(15,23,42,0.2)]",
  "backdrop-blur-xl transition duration-200 ease-out",
  "hover:scale-110 hover:shadow-[0_22px_46px_rgba(15,23,42,0.26)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  "dark:border-white/10 dark:bg-slate-50 dark:text-slate-950",
].join(" ");

const GoogleLoginButton = () => {
  const buttonRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [gisReady, setGisReady] = useState(false);
  const [isGoogleBoxOpen, setIsGoogleBoxOpen] = useState(true);
  const [statusMessage, setStatusMessage] = useState(DEFAULT_STATUS_COPY);
  const [errorMessage, setErrorMessage] = useState("");
  const setupStatus = getGoogleIdentitySetupStatus();

  const applySignedInUser = useEffectEvent((nextUser) => {
    startTransition(() => {
      setUser(nextUser ?? null);
    });
  });

  const handleCredentialResponse = useEffectEvent(async (response) => {
    try {
      setLoading(true);
      setErrorMessage("");
      setStatusMessage("Signing in with Google...");

      const session = await loginWithGoogleCredential(response?.credential);

      if (session?.user) {
        applySignedInUser(session.user);
        setStatusMessage("Signed in with Google Identity Services.");
        cancelGoogleOneTap();
      }
    } catch (error) {
      const message = error?.message ?? "Unable to continue with Google right now.";
      setErrorMessage(message);
      setStatusMessage(DEFAULT_STATUS_COPY);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = subscribeToGoogleAuthUser((nextUser) => {
      if (!isMounted) {
        return;
      }

      applySignedInUser(nextUser);
    });

    void getCurrentGoogleUser()
      .then((nextUser) => {
        if (!isMounted || !nextUser) {
          return;
        }

        applySignedInUser(nextUser);
      })
      .finally(() => {
        if (isMounted) {
          setInitializing(false);
        }
      });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const mountGoogleIdentity = async () => {
      if (!buttonRef.current) {
        return;
      }

      try {
        setErrorMessage("");
        await initializeGoogleIdentity(handleCredentialResponse);

        if (!isMounted || !buttonRef.current) {
          return;
        }

        renderGoogleSignInButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
        });
        setGisReady(true);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setGisReady(false);
        setErrorMessage(error?.message ?? "Unable to load Google Sign-In.");
      }
    };

    void mountGoogleIdentity();

    return () => {
      isMounted = false;
      cancelGoogleOneTap();
    };
  }, []);

  useEffect(() => {
    if (!gisReady) {
      return undefined;
    }

    if (user) {
      cancelGoogleOneTap();
      return undefined;
    }

    promptGoogleOneTap((notification) => {
      if (notification?.isNotDisplayed?.() || notification?.isSkippedMoment?.()) {
        setStatusMessage("Google One Tap is unavailable here, but the official Google button is ready below.");
        return;
      }

      if (notification?.isDismissedMoment?.()) {
        setStatusMessage("Google One Tap was dismissed. You can still use the official Google button.");
      }
    });

    return () => {
      cancelGoogleOneTap();
    };
  }, [gisReady, user]);

  const profileLabel = user?.displayName || user?.email || "Google user";
  const initials = profileLabel.slice(0, 1).toUpperCase();

  return (
    <div className="relative flex flex-col items-center">
      {isGoogleBoxOpen ? (
        <section className="pointer-events-auto absolute bottom-full right-0 mb-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/92 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.16)] backdrop-blur-2xl transition-all duration-300 ease-out dark:border-white/10 dark:bg-slate-950/85 dark:shadow-[0_24px_70px_rgba(2,6,23,0.6)]">
          <button
            type="button"
            onClick={() => setIsGoogleBoxOpen(false)}
            aria-label="Close Google sign-in widget"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/6 text-lg text-slate-500 transition hover:bg-slate-900/10 hover:text-slate-950 dark:bg-white/6 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
          >
            ×
          </button>

          <div className="mb-4 space-y-1 pr-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Google Identity Services
            </p>
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
              Official Google account chooser
            </h2>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              {statusMessage}
            </p>
          </div>

          {user ? (
            <div className="rounded-[24px] border border-slate-200 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={profileLabel}
                    className="h-12 w-12 rounded-full border border-white object-cover shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
                    {initials}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Signed In
                  </p>
                  <p className="truncate text-base font-semibold text-slate-950 dark:text-white">
                    {profileLabel}
                  </p>
                  {user.email ? (
                    <p className="truncate text-sm text-slate-600 dark:text-slate-300">
                      {user.email}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5">
                <div ref={buttonRef} className="min-h-[44px] w-full" />
              </div>

              {(loading || initializing) && !errorMessage ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Preparing Google Sign-In...
                </p>
              ) : null}
            </div>
          )}

          {!setupStatus.isConfigValid ? (
            <p className="mt-3 text-xs leading-5 text-amber-700 dark:text-amber-300">
              Add <code>VITE_GOOGLE_CLIENT_ID</code> to enable the native Google chooser.
            </p>
          ) : null}

          {errorMessage ? (
            <p className="mt-3 text-sm leading-6 text-rose-600 dark:text-rose-300">
              {errorMessage}
            </p>
          ) : null}
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsGoogleBoxOpen(true)}
        className={GOOGLE_FAB_CLASSNAME}
        aria-label="Open Google sign-in widget"
        aria-pressed={isGoogleBoxOpen}
      >
        <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 dark:bg-white dark:text-slate-950">
          {user ? "Google account" : "Sign in"}
        </span>
        <img
          src={GOOGLE_LOGO_URL}
          alt="Google"
          className="h-5 w-5"
          referrerPolicy="no-referrer"
        />
      </button>
    </div>
  );
};

export default GoogleLoginButton;
