import { startTransition, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-core";
import { ACCOUNT_ROUTES, getLocalizedAccountRoute } from "../utils/accountRoutes";

// Inline mark: no third-party request on every page load.
const GoogleMark = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5" role="img" aria-label="Google">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.2C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.2 5.5-4.7 7.2l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.6z" />
    <path fill="#FBBC05" d="M10.5 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.9-6.2C.9 16.4 0 20.100 0 24s.9 7.600 2.600 10.800l7.900-6.200z" />
    <path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.600-5.900c-2.100 1.400-4.900 2.300-8.300 2.300-6.300 0-11.600-4.100-13.500-9.900l-7.900 6.200C6.500 42.600 14.600 48 24 48z" />
  </svg>
);

const BUTTON_CLASSNAME = [
  "group relative flex h-12 w-12 items-center justify-center rounded-full",
  "border border-slate-200/80 bg-white/92 text-slate-950",
  "shadow-sm",
  "transition-colors duration-200 ease-out hover:bg-slate-50 dark:hover:bg-slate-900",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  "disabled:cursor-not-allowed disabled:opacity-70",
  "dark:border-white/10 dark:bg-slate-950/88 dark:text-white",
].join(" ");

const GoogleLoginButton = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isConfigured, loginWithGoogle } = useAuth();
  const [isWorking, setIsWorking] = useState(false);
  const isAr = i18n.language === "ar";
  const adminMessagesRoute = getLocalizedAccountRoute(
    isAr,
    ACCOUNT_ROUTES.adminMessages,
  );
  const tooltipLabel = isConfigured
    ? t("auth.continueWithGoogle", "Continue with Google")
    : t("auth.firebaseConfigMissing", "Google sign-in is not configured yet.");

  const handleGoogleLogin = async () => {
    if (!isConfigured || isWorking) {
      return;
    }

    try {
      setIsWorking(true);
      const nextUser = await loginWithGoogle();

      if (nextUser?.role === "admin") {
        startTransition(() => {
          navigate(adminMessagesRoute);
        });
      }
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <div className="group relative h-12 w-12">
      <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 dark:bg-white dark:text-slate-950">
        {tooltipLabel}
      </span>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={!isConfigured || isWorking}
        aria-label={tooltipLabel}
        title={tooltipLabel}
        className={BUTTON_CLASSNAME}
      >
        {isWorking ? (
          <LoaderCircle size={18} className="animate-spin" />
        ) : (
          <GoogleMark />
        )}
      </button>
    </div>
  );
};

export default GoogleLoginButton;
