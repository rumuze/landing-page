import { motion as Motion } from "framer-motion";
import { Inbox, Search, Sparkles } from "lucide-react";
import {
  createMessagePreview,
  formatMessageTimestamp,
  getMessageTime,
} from "../utils/messages";
import { useMemo } from "react";

const FILTER_OPTIONS = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "closed", label: "Closed" },
];

const ThreadList = ({
  threads,
  selectedId,
  onSelectThread,
  isLoading,
  filter,
  onFilterChange,
  searchValue,
  onSearchChange,
  locale,
  title = "Inbox",
  description = "Real-time chat threads with linked-user identity, guest support, and status tracking.",
}) => {
  // Sort threads by updatedAt DESC
  const sortedThreads = useMemo(() => {
    return [...threads].sort((a, b) => {
      const aTime = getMessageTime(a.updatedAt || a.createdAt);
      const bTime = getMessageTime(b.updatedAt || b.createdAt);
      return bTime - aTime;
    });
  }, [threads]);

  return (
    <section className="relative flex h-full min-h-[32rem] flex-col overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-950/78 shadow-xl dark:shadow-[0_30px_100px_rgba(2,6,23,0.48)] backdrop-blur-2xl transition-colors duration-300">
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_62%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_62%)] pointer-events-none" />

      <div className="relative border-b border-slate-200 dark:border-white/10 px-5 pb-5 pt-6 sm:px-6 transition-colors duration-300">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-400">
              {title}
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white transition-colors duration-300">Threads</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300 transition-colors duration-300">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.4rem] border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 p-2 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-300">
          <label className="sr-only" htmlFor="admin-message-search">
            Search threads
          </label>
          <div className="flex items-center gap-3 rounded-[1rem] bg-white dark:bg-slate-950/70 px-4 py-3 shadow-sm dark:shadow-none transition-colors duration-300">
            <Search size={16} className="text-slate-400 dark:text-slate-500" />
            <input
              id="admin-message-search"
              type="search"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by sender, email, or message"
              className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-colors duration-300"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((option) => {
            const isActive = option.id === filter;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onFilterChange(option.id)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                  isActive
                    ? "border-cyan-300/30 bg-cyan-600/10 dark:bg-cyan-400/12 text-cyan-700 dark:text-cyan-100 shadow-sm dark:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                    : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-100 dark:hover:border-white/20 dark:hover:bg-white/10"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto p-3 sm:p-4 scroll-smooth">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-[1.5rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 transition-colors duration-300"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="h-4 w-32 rounded-full bg-slate-200 dark:bg-white/10" />
                  <div className="h-4 w-16 rounded-full bg-slate-200 dark:bg-white/10" />
                </div>
                <div className="mt-3 h-3 w-40 rounded-full bg-slate-200 dark:bg-white/10" />
                <div className="mt-4 h-3 w-full rounded-full bg-slate-200 dark:bg-white/10" />
                <div className="mt-2 h-3 w-5/6 rounded-full bg-slate-200 dark:bg-white/10" />
              </div>
            ))}
          </div>
        ) : null}

        {!isLoading && sortedThreads.length === 0 ? (
          <div className="flex h-full min-h-[22rem] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-6 py-10 text-center transition-colors duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-600 dark:text-cyan-100">
              <Inbox size={26} />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">No threads found</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              Try another filter or search term, or wait for new messages.
            </p>
          </div>
        ) : null}

        {!isLoading && sortedThreads.length > 0 ? (
          <div className="space-y-3">
            {sortedThreads.map((thread, index) => {
              const isSelected = selectedId === thread.id;
              const aTime = getMessageTime(thread.updatedAt || thread.createdAt);
              const lastSeenTime = getMessageTime(thread.lastSeenByAdmin);
              const isUnread = thread.lastMessageSender === "user" && aTime > lastSeenTime;

              return (
                <Motion.button
                  key={thread.id}
                  type="button"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, delay: Math.min(index * 0.03, 0.18) }}
                  onClick={() => onSelectThread(thread.id)}
                  className={`group w-full rounded-[1.5rem] border p-4 text-left transition-all duration-200 relative ${
                    isSelected
                      ? "border-cyan-300/30 bg-cyan-50 dark:bg-cyan-400/10 shadow-md dark:shadow-[0_18px_45px_rgba(8,145,178,0.18)]"
                      : "border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/[0.04] hover:border-slate-300 hover:bg-slate-50 dark:hover:border-white/20 dark:hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {thread.userPhoto ? (
                            <img
                              src={thread.userPhoto}
                              alt={thread.userName || "Sender avatar"}
                              className="h-11 w-11 rounded-2xl border border-slate-200 dark:border-white/10 object-cover bg-white dark:bg-transparent"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                              {(thread.userName || "?").slice(0, 1).toUpperCase()}
                            </div>
                          )}
                          {isUnread && (
                            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-rose-500 border-2 border-slate-900"></div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                              {thread.userName || "Unknown sender"}
                            </p>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                                !thread.isGuest
                                  ? "border-emerald-500/20 bg-emerald-50 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-100"
                                  : "border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                              }`}
                            >
                              {!thread.isGuest ? "User" : "Guest"}
                            </span>
                          </div>

                          <p className="mt-1 truncate text-xs uppercase tracking-[0.2em] text-slate-400">
                            {thread.userEmail || "No email"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${
                        thread.status === "open"
                          ? "border-cyan-400/20 bg-cyan-50 dark:bg-cyan-400/12 text-cyan-700 dark:text-cyan-100"
                          : "border-slate-300/20 bg-slate-100 dark:bg-slate-400/12 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {thread.status}
                    </span>
                  </div>

                  <p className={`mt-4 text-sm leading-6 truncate transition-colors duration-300 ${isUnread ? "text-slate-900 dark:text-white font-medium" : "text-slate-500 dark:text-slate-400"}`}>
                    {createMessagePreview(thread.lastMessage)}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span>{formatMessageTimestamp(thread.updatedAt || thread.createdAt, locale)}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Sparkles size={13} className="text-cyan-400/60" />
                      {!thread.isGuest ? "Account-linked" : "Guest"}
                    </span>
                  </div>
                </Motion.button>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ThreadList;
