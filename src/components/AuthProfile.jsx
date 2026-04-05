import {
  startTransition,
  useEffect,
  useState
} from "react";
import {
  ChevronDown,
  LoaderCircle,
  LogOut,
  Settings,
  UserCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-core";
import { ACCOUNT_ROUTES, getLocalizedAccountRoute } from "../utils/accountRoutes";

const GOOGLE_LOGO_URL =
  "https://developers.google.com/identity/images/g-logo.png";

const LOGGED_OUT_BUTTON_CLASSNAME = [
  "group relative flex h-12 items-center justify-center gap-3 overflow-hidden rounded-full",
  "border border-slate-200/80 bg-white/92 px-4 text-sm font-semibold text-slate-900",
  "shadow-[0_18px_38px_rgba(15,23,42,0.16)] backdrop-blur-2xl",
  "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(15,23,42,0.22)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  "disabled:cursor-not-allowed disabled:opacity-70",
  "dark:border-white/10 dark:bg-slate-950/88 dark:text-white",
].join(" ");

const MENU_ITEM_CLASSNAME = [
  "flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm",
  "text-slate-200 hover:bg-white/10 focus-visible:bg-white/10",
  "transition-all duration-200 ease-out focus-visible:outline-none",
].join(" ");

const AuthProfile = ({
  className = "",
  showTooltip = true,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isAr = i18n.language === "ar";
  const {
    user,
    error,
    isConfigured,
    loginWithGoogle,
    logout,
  } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  const handleGoogleLogin = async () => {
    if (!isConfigured || isWorking) {
      return;
    }

    try {
      setIsWorking(true);
      await loginWithGoogle();
    } catch {
      // Shared auth context handles the error surface.
    } finally {
      setIsWorking(false);
    }
  };

  const handleLogout = async () => {
    if (isWorking) {
      return;
    }

    try {
      setIsWorking(true);
      setIsMenuOpen(false);
      await logout();
    } catch {
      // Shared auth context handles the error surface.
    } finally {
      setIsWorking(false);
    }
  };

  const runMenuAction = (route) => {
    setIsMenuOpen(false);
    startTransition(() => {
      navigate(route);
    });
  };

  const profileLabel =
    user?.displayName || user?.email || t("auth.defaultUser", "User");
  const profileEmail = user?.email || t("auth.noEmail", "Signed in with Google");
  const avatarInitial = profileLabel.trim().slice(0, 1).toUpperCase();
  const tooltipLabel = t("auth.account", "Account");
  const profileRoute = getLocalizedAccountRoute(isAr, ACCOUNT_ROUTES.profile);
  const settingsRoute = getLocalizedAccountRoute(isAr, ACCOUNT_ROUTES.settings);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (
        !(event.target instanceof Element) ||
        !event.target.closest("[data-auth-profile-root]")
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  if (user) {
    return (
      <div
        data-auth-profile-root
        className={`group relative ${className}`.trim()}
      >
        {showTooltip ? (
          <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 dark:bg-white dark:text-slate-950">
            {tooltipLabel}
          </span>
        ) : null}

        <button
          type="button"
          aria-label={tooltipLabel}
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          title={tooltipLabel}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-slate-950/90 text-white shadow-[0_18px_38px_rgba(15,23,42,0.34)] backdrop-blur-xl transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:border-cyan/40 hover:shadow-[0_22px_46px_rgba(0,11,24,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent dark:border-white/10 dark:bg-slate-900/90"
        >
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={profileLabel}
              className="h-10 w-10 rounded-full border border-white/20 object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan/80 via-cyan to-sky-400 text-sm font-semibold text-slate-950">
              {avatarInitial}
            </span>
          )}

          <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.7)] dark:border-slate-900" />
        </button>

        <div
          role="menu"
          aria-label={tooltipLabel}
          className={`absolute bottom-full right-0 z-50 mb-3 w-64 origin-bottom-right rounded-2xl border border-white/10 bg-black/80 p-2 shadow-[0_24px_80px_rgba(2,6,23,0.58)] backdrop-blur-2xl transition-all duration-200 ease-out ${
            isMenuOpen
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-2 scale-95 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={profileLabel}
                  className="h-11 w-11 rounded-full border border-white/10 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan/80 via-cyan to-sky-400 text-sm font-semibold text-slate-950">
                  {avatarInitial}
                </span>
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {profileLabel}
                </p>
                <p className="truncate text-xs text-slate-400">{profileEmail}</p>
              </div>
            </div>
          </div>

          <div className="my-2 h-px bg-white/10" />

          <div className="space-y-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => runMenuAction(profileRoute)}
              className={MENU_ITEM_CLASSNAME}
            >
              <UserCircle2 size={16} className="text-slate-400" />
              <span>{t("auth.profile", "Profile")}</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => runMenuAction(settingsRoute)}
              className={MENU_ITEM_CLASSNAME}
            >
              <Settings size={16} className="text-slate-400" />
              <span>{t("auth.settings", "Settings")}</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className={`${MENU_ITEM_CLASSNAME} text-rose-200 hover:bg-rose-500/12 focus-visible:bg-rose-500/12`}
            >
              <LogOut size={16} className="text-rose-300" />
              <span>{t("auth.logout", "Logout")}</span>
            </button>
          </div>
        </div>

        {error ? (
          <p className="absolute bottom-full right-0 mb-16 w-64 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-xs leading-5 text-rose-100 shadow-[0_20px_60px_rgba(127,29,29,0.28)] backdrop-blur-xl">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div data-auth-profile-root className={`relative ${className}`.trim()}>
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={!isConfigured || isWorking}
        className={LOGGED_OUT_BUTTON_CLASSNAME}
        aria-label={t("auth.continueWithGoogle", "Continue with Google")}
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_62%)] opacity-80" />
        <img
          src={GOOGLE_LOGO_URL}
          alt="Google"
          className="relative h-5 w-5"
          referrerPolicy="no-referrer"
        />
        <span className="relative">
          {isWorking ? t("auth.signingIn", "Signing in...") : t("auth.continueWithGoogle", "Continue with Google")}
        </span>
        {isWorking ? (
          <LoaderCircle size={16} className="relative animate-spin text-slate-500 dark:text-slate-300" />
        ) : (
          <ChevronDown size={16} className="relative text-slate-400 dark:text-slate-500" />
        )}
      </button>

      {error ? (
        <p className="absolute bottom-full right-0 mb-3 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-xs leading-5 text-rose-100 shadow-[0_20px_60px_rgba(127,29,29,0.28)] backdrop-blur-xl">
          {error}
        </p>
      ) : null}

      {!isConfigured ? (
        <p className="absolute bottom-full right-0 mb-3 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-amber-300/20 bg-amber-500/10 px-4 py-3 text-xs leading-5 text-amber-100 shadow-[0_20px_60px_rgba(120,53,15,0.22)] backdrop-blur-xl">
          {t(
            "auth.firebaseConfigMissing",
            "Firebase Google Auth is not configured yet.",
          )}
        </p>
      ) : null}
    </div>
  );
};

export default AuthProfile;
