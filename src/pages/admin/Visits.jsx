import { useDeferredValue, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion as Motion } from "framer-motion";
import {
  Activity,
  Clock3,
  Fingerprint,
  Globe,
  Search,
  ShieldAlert,
  UserCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useVisits } from "../../hooks/useVisits";

const SOURCE_FILTERS = ["all", "direct", "campaign", "search", "social", "referral"];

const sourceBadgeClassNames = {
  direct: "border-slate-400/20 bg-slate-400/10 text-slate-200",
  campaign: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  search: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  social: "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200",
  referral: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  internal: "border-indigo-400/20 bg-indigo-400/10 text-indigo-200",
};

const formatDateTime = (value, locale) => {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    return "Pending";
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(value);
};

const buildVisitSearchIndex = (visit) =>
  [
    visit.pagePath,
    visit.pageTitle,
    visit.sourceLabel,
    visit.sourceType,
    visit.referrer,
    visit.referrerHost,
    visit.utmSource,
    visit.utmMedium,
    visit.utmCampaign,
    visit.accountLabel,
    visit.userEmail,
    visit.ipAddress,
    visit.sessionId,
    visit.visitorId,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const Visits = () => {
  const { i18n } = useTranslation();
  const { visits, isLoading, error } = useVisits();
  const [searchValue, setSearchValue] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const deferredSearch = useDeferredValue(searchValue.trim().toLowerCase());
  const locale = i18n.language === "ar" ? "ar-EG" : "en-US";

  const filteredVisits = useMemo(() => (
    visits.filter((visit) => {
      const matchesSource =
        sourceFilter === "all" || visit.sourceType === sourceFilter;

      if (!matchesSource) {
        return false;
      }

      if (!deferredSearch) {
        return true;
      }

      return buildVisitSearchIndex(visit).includes(deferredSearch);
    })
  ), [deferredSearch, sourceFilter, visits]);

  const uniqueVisitors = new Set(filteredVisits.map((visit) => visit.visitorId).filter(Boolean)).size;
  const linkedVisits = filteredVisits.filter((visit) => visit.isAuthenticated).length;
  const campaignVisits = filteredVisits.filter((visit) => visit.sourceType === "campaign").length;
  const directVisits = filteredVisits.filter((visit) => visit.sourceType === "direct").length;

  return (
    <>
      <Helmet>
        <title>Visit Analytics | Admin Rumuze</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen px-4 pb-24 pt-28 sm:px-6"
      >
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/82 px-6 py-7 shadow-[0_30px_100px_rgba(2,6,23,0.5)] backdrop-blur-2xl sm:px-8">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_62%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan/75">
                  Visit Intelligence
                </p>
                <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  Admin Visit Analytics
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                  Every page view is stored with server-side time, referrer, UTM attribution, IP, session fingerprint, and the authenticated account when one is available.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[1.5rem] border border-cyan-400/15 bg-cyan-400/10 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-100/75">
                    Visits
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">{filteredVisits.length}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                    Unique Visitors
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">{uniqueVisitors}</p>
                </div>
                <div className="rounded-[1.5rem] border border-emerald-400/15 bg-emerald-400/10 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-100/75">
                    Linked Accounts
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">{linkedVisits}</p>
                </div>
                <div className="rounded-[1.5rem] border border-amber-400/15 bg-amber-400/10 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-amber-100/75">
                    Campaign / Direct
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {campaignVisits} / {directVisits}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {error ? (
            <div className="flex items-start gap-3 rounded-[1.5rem] border border-rose-400/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 shadow-[0_20px_50px_rgba(127,29,29,0.18)]">
              <ShieldAlert size={18} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          ) : null}

          <section className="rounded-[2rem] border border-white/10 bg-slate-900/55 p-4 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <label className="relative block w-full max-w-xl">
                <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search by page, source, email, IP, referrer, or session"
                  className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/80 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-400/50"
                />
              </label>

              <div className="flex flex-wrap gap-2">
                {SOURCE_FILTERS.map((filterValue) => {
                  const isActive = filterValue === sourceFilter;

                  return (
                    <button
                      key={filterValue}
                      type="button"
                      onClick={() => setSourceFilter(filterValue)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                        isActive
                          ? "border-cyan-400/35 bg-cyan-400/12 text-cyan-100"
                          : "border-white/10 bg-white/5 text-slate-300"
                      }`}
                    >
                      {filterValue}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10">
              <div className="hidden grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.9fr)] gap-4 bg-slate-950/70 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 lg:grid">
                <div>Visit</div>
                <div>Source</div>
                <div>Account</div>
                <div>When</div>
              </div>

              {isLoading && visits.length === 0 ? (
                <div className="flex min-h-[360px] items-center justify-center bg-slate-950/45">
                  <LoadingSpinner />
                </div>
              ) : null}

              {!isLoading && filteredVisits.length === 0 ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 bg-slate-950/45 px-6 text-center">
                  <Activity size={32} className="text-slate-500" />
                  <h2 className="text-lg font-semibold text-white">No visits matched this filter</h2>
                  <p className="max-w-md text-sm text-slate-400">
                    Try a different source filter or search term. New page views will appear here in real time.
                  </p>
                </div>
              ) : null}

              <div className="divide-y divide-white/10">
                {filteredVisits.map((visit) => {
                  const sourceBadgeClassName =
                    sourceBadgeClassNames[visit.sourceType] ?? sourceBadgeClassNames.referral;

                  return (
                    <article
                      key={visit.id}
                      className="grid gap-4 bg-slate-950/45 px-5 py-4 transition hover:bg-slate-950/60 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.9fr)]"
                    >
                      <div className="min-w-0 space-y-2">
                        <div className="flex items-start gap-2">
                          <Globe size={16} className="mt-0.5 shrink-0 text-cyan-300" />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-white" title={visit.pageTitle}>
                              {visit.pageTitle}
                            </p>
                            <p className="truncate text-xs text-slate-400" title={visit.pagePath}>
                              {visit.pagePath || "/"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                          <span className="inline-flex items-center gap-1">
                            <Fingerprint size={12} />
                            {visit.sessionId || "No session"}
                          </span>
                          {visit.ipAddress ? <span>IP {visit.ipAddress}</span> : null}
                        </div>
                      </div>

                      <div className="min-w-0 space-y-2">
                        <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${sourceBadgeClassName}`}>
                          {visit.sourceType || "direct"}
                        </span>
                        <p className="truncate text-sm text-slate-200" title={visit.sourceLabel}>
                          {visit.sourceLabel || "Direct"}
                        </p>
                        <p className="truncate text-xs text-slate-400" title={visit.referrer || ""}>
                          {visit.referrer || "No referrer"}
                        </p>
                        {visit.utmCampaign ? (
                          <p className="truncate text-[11px] text-amber-200" title={visit.utmCampaign}>
                            Campaign: {visit.utmCampaign}
                          </p>
                        ) : null}
                      </div>

                      <div className="min-w-0 space-y-2">
                        <div className="flex items-start gap-2">
                          <UserCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-300" />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-white" title={visit.accountLabel}>
                              {visit.accountLabel}
                            </p>
                            <p className="truncate text-xs text-slate-400" title={visit.userEmail || ""}>
                              {visit.userEmail || "Guest session"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                          <span>{visit.isAuthenticated ? "Authenticated" : "Guest"}</span>
                          {visit.userRole ? <span>{visit.userRole}</span> : null}
                        </div>
                      </div>

                      <div className="min-w-0 space-y-2">
                        <div className="flex items-start gap-2">
                          <Clock3 size={16} className="mt-0.5 shrink-0 text-slate-300" />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white">
                              {formatDateTime(visit.visitedAt, locale)}
                            </p>
                            <p className="truncate text-xs text-slate-400">
                              {visit.timezone || visit.locale || "Unknown locale"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </Motion.div>
    </>
  );
};

export default Visits;
