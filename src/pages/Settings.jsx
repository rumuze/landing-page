import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion as Motion } from "framer-motion";
import { LoaderCircle, LogOut, Save, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-core";
import { getLocalizedAccountRoute } from "../utils/accountRoutes";

const Settings = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout, updateUserProfile } = useAuth();
  const isAr = i18n.language === "ar";
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setDisplayName(user?.displayName ?? "");
    setPhotoURL(user?.photoURL ?? "");
  }, [user?.displayName, user?.photoURL]);

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setFeedback("");
      await updateUserProfile({ displayName, photoURL });
      setFeedback(isAr ? "تم تحديث بيانات الحساب." : "Your account details were updated.");
    } catch (error) {
      setFeedback(error?.message ?? (isAr ? "تعذر حفظ التغييرات." : "Unable to save your changes."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate(getLocalizedAccountRoute(isAr, "/"));
    } finally {
      setIsLoggingOut(false);
    }
  };

  const previewLabel =
    displayName.trim() || user?.email || (isAr ? "المستخدم" : "User");
  const previewInitial = previewLabel.slice(0, 1).toUpperCase();

  return (
    <>
      <Helmet>
        <title>{isAr ? "الإعدادات | Rumuze" : "Settings | Rumuze"}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen px-4 pb-24 pt-32 sm:px-6"
      >
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/78 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.5)] backdrop-blur-2xl sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan/80">
                  {isAr ? "الإعدادات" : "Settings"}
                </p>
                <h1 className="mt-2 text-3xl font-black text-white">
                  {isAr ? "إدارة الحساب" : "Manage your account"}
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                  {isAr
                    ? "حدث بياناتك الأساسية واحتفظ بتجربة دخول نظيفة ومتسقة عبر الموقع."
                    : "Update your account details and keep your authenticated experience clean and consistent across the site."}
                </p>
              </div>

              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-200">
                {isAr ? "متصل الآن" : "Online now"}
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/78 p-5 backdrop-blur-2xl sm:p-6">
              <div className="mb-5 flex items-center gap-3 text-white">
                <Sparkles size={16} className="text-cyan" />
                <h2 className="text-lg font-semibold">
                  {isAr ? "إعدادات الحساب" : "Account settings"}
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-[120px_minmax(0,1fr)] md:items-start">
                <div className="flex items-center justify-center">
                  {photoURL ? (
                    <img
                      src={photoURL}
                      alt={previewLabel}
                      className="h-24 w-24 rounded-full border border-white/15 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-cyan via-sky-400 to-cyan text-3xl font-semibold text-slate-950">
                      {previewInitial}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      {isAr ? "الاسم" : "Display name"}
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(event) => setDisplayName(event.target.value)}
                      placeholder={isAr ? "اكتب اسمك" : "Enter your name"}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan/50 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      {isAr ? "رابط الصورة الشخصية" : "Avatar URL"}
                    </label>
                    <input
                      type="url"
                      value={photoURL}
                      onChange={(event) => setPhotoURL(event.target.value)}
                      placeholder={
                        isAr
                          ? "https://example.com/avatar.jpg"
                          : "https://example.com/avatar.jpg"
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan/50 focus:outline-none"
                    />
                    <p className="text-xs leading-5 text-slate-400">
                      {isAr
                        ? "يمكنك تركه فارغًا وسيتم استخدام الحرف الأول من اسمك."
                        : "Leave this empty and we’ll fall back to your initial."}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/78 p-5 backdrop-blur-2xl sm:p-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-white">
                  {isAr ? "الأمان" : "Security"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {isAr
                    ? "إدارة الجلسة الحالية. يمكن إضافة مزودي دخول وإعدادات أمان متقدمة لاحقًا."
                    : "Manage the current session. More providers and security controls can be added later."}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-slate-950 transition-all duration-200 ease-out hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSaving ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  <span>{isAr ? "حفظ التغييرات" : "Save changes"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-5 text-sm font-semibold text-rose-100 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoggingOut ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    <LogOut size={16} />
                  )}
                  <span>{isAr ? "تسجيل الخروج" : "Logout"}</span>
                </button>
              </div>

              {feedback ? (
                <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  {feedback}
                </p>
              ) : null}
            </section>
          </form>
        </div>
      </Motion.div>
    </>
  );
};

export default Settings;
