import { startTransition, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-core";
import { ACCOUNT_ROUTES, getLocalizedAccountRoute } from "../utils/accountRoutes";

const GOOGLE_LOGO_URL =
  "https://developers.google.com/identity/images/g-logo.png";

const BUTTON_CLASSNAME = [
  "group relative flex h-12 w-12 items-center justify-center rounded-full",
  "border border-slate-200/80 bg-white/92 text-slate-950",
  "shadow-[0_18px_38px_rgba(15,23,42,0.16)] backdrop-blur-2xl",
  "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(15,23,42,0.22)]",
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
    : t("auth.firebaseConfigMissing", "Firebase Google Auth is not configured yet.");

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
          <img
            src={GOOGLE_LOGO_URL}
            alt="Google"
            className="h-5 w-5"
            referrerPolicy="no-referrer"
          />
        )}
      </button>
    </div>
  );
};

export default GoogleLoginButton;
