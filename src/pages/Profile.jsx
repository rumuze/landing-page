import React from "react";
import { Helmet } from "react-helmet-async";
import { motion as Motion } from "framer-motion";
import { CalendarDays, Edit3, Mail, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-core";
import { ACCOUNT_ROUTES, getLocalizedAccountRoute } from "../utils/accountRoutes";

const formatJoinDate = (creationTime, language) => {
  if (!creationTime) {
    return null;
  }

  const date = new Date(creationTime);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(language === "ar" ? "ar-EG" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const Profile = () => {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const isAr = i18n.language === "ar";
  const joinDate = formatJoinDate(user?.metadata?.creationTime, i18n.language);
  const displayName = user?.displayName || user?.email || (isAr ? "المستخدم" : "User");
  const avatarInitial = displayName.trim().slice(0, 1).toUpperCase();
  const settingsRoute = getLocalizedAccountRoute(isAr, ACCOUNT_ROUTES.settings);
  const role = user?.role ?? null;

  return (
    <>
      <Helmet>
        <title>{isAr ? "الملف الشخصي | Rumuze" : "Profile | Rumuze"}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen px-4 pb-24 pt-32 sm:px-6"
      >
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/78 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.5)] backdrop-blur-2xl sm:p-8">
            <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.22),transparent_70%)]" />

            <div className="relative flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div className={`flex flex-col gap-5 ${isAr ? "sm:items-end" : "sm:items-start"}`}>
                <div className="flex items-center gap-5">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={displayName}
                      className="h-24 w-24 rounded-full border border-white/15 object-cover shadow-[0_10px_30px_rgba(15,23,42,0.25)]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-cyan via-sky-400 to-cyan text-3xl font-semibold text-slate-950 shadow-[0_10px_30px_rgba(0,229,255,0.25)]">
                      {avatarInitial}
                    </div>
                  )}

                  <div className={isAr ? "text-right" : "text-left"}>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan/80">
                      {isAr ? "الحساب" : "Account"}
                    </p>
                    <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                      {displayName}
                    </h1>
                    <p className="mt-2 text-sm text-slate-300">{user?.email}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-3 text-slate-200">
                      <Mail size={16} className="text-cyan" />
                      <span className="text-sm font-medium">
                        {user?.email || (isAr ? "غير متوفر" : "Unavailable")}
                      </span>
                    </div>
                  </div>

                  {joinDate ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="flex items-center gap-3 text-slate-200">
                        <CalendarDays size={16} className="text-cyan" />
                        <span className="text-sm font-medium">
                          {isAr ? `منذ ${joinDate}` : `Joined ${joinDate}`}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {role ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:col-span-2">
                      <div className="flex items-center gap-3 text-slate-200">
                        <ShieldCheck size={16} className="text-emerald-400" />
                        <span className="text-sm font-medium">
                          {isAr ? `الدور: ${role}` : `Role: ${role}`}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <Link
                to={settingsRoute}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/8 px-5 text-sm font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/12"
              >
                <Edit3 size={16} />
                <span>{isAr ? "تعديل الملف" : "Edit Profile"}</span>
              </Link>
            </div>
          </div>
        </div>
      </Motion.div>
    </>
  );
};

export default Profile;
