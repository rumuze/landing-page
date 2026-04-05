import { motion as Motion } from "framer-motion";
import { Inbox, Search, Sparkles } from "lucide-react";
import {
  createMessagePreview,
  formatMessageTimestamp,
  getMessageStatusMeta,
} from "../utils/messages";

const FILTER_OPTIONS = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "seen", label: "Seen" },
  { id: "replied", label: "Replied" },
];

const MessageList = ({
  messages,
  selectedId,
  onSelectMessage,
  isLoading,
  filter,
  onFilterChange,
  searchValue,
  onSearchChange,
  newCount,
  linkedCount,
  locale,
}) => (
  <section className="relative flex h-full min-h-[32rem] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/78 shadow-[0_30px_100px_rgba(2,6,23,0.48)] backdrop-blur-2xl">
    <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_62%)]" />

    <div className="relative border-b border-white/10 px-5 pb-5 pt-6 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan/70">
            Admin Inbox
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">Messages</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-300">
            Real-time Firestore inbox with linked-user identity, guest support,
            and reply visibility tracking.
          </p>
        </div>

        <div className="space-y-2 text-right">
          <div className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100">
            {newCount} new
          </div>
          <div className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-100">
            {linkedCount} linked
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-white/5 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <label className="sr-only" htmlFor="admin-message-search">
          Search messages
        </label>
        <div className="flex items-center gap-3 rounded-[1rem] bg-slate-950/70 px-4 py-3">
          <Search size={16} className="text-slate-500" />
          <input
            id="admin-message-search"
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by sender, email, message, or reply"
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
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
                  ? "border-cyan-300/30 bg-cyan-400/12 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>

    <div className="relative flex-1 overflow-y-auto p-3 sm:p-4">
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="h-4 w-32 rounded-full bg-white/10" />
                <div className="h-4 w-16 rounded-full bg-white/10" />
              </div>
              <div className="mt-3 h-3 w-40 rounded-full bg-white/10" />
              <div className="mt-4 h-3 w-full rounded-full bg-white/10" />
              <div className="mt-2 h-3 w-5/6 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      ) : null}

      {!isLoading && messages.length === 0 ? (
        <div className="flex h-full min-h-[22rem] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-white/10 bg-white/[0.03] px-6 py-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-100">
            <Inbox size={26} />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-white">No messages found</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
            Try another filter or search term, or wait for the next public form
            submission to land here.
          </p>
        </div>
      ) : null}

      {!isLoading && messages.length > 0 ? (
        <div className="space-y-3">
          {messages.map((message, index) => {
            const statusMeta = getMessageStatusMeta(message.status);
            const isSelected = selectedId === message.id;

            return (
              <Motion.button
                key={message.id}
                type="button"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, delay: Math.min(index * 0.03, 0.18) }}
                onClick={() => onSelectMessage(message.id)}
                className={`group w-full rounded-[1.5rem] border p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-cyan-300/30 bg-cyan-400/10 shadow-[0_18px_45px_rgba(8,145,178,0.18)]"
                    : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      {message.userPhoto ? (
                        <img
                          src={message.userPhoto}
                          alt={message.userName || "Sender avatar"}
                          className="h-11 w-11 rounded-2xl border border-white/10 object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-cyan">
                          {(message.userName || "?").slice(0, 1).toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <p className="truncate text-sm font-semibold text-white">
                            {message.userName || "Unknown sender"}
                          </p>
                          <span
                            className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                              message.userId
                                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                                : "border-white/10 bg-white/5 text-slate-300"
                            }`}
                          >
                            {message.userId ? "User" : "Guest"}
                          </span>
                          {message.status === "new" ? (
                            <span className="h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
                          ) : null}
                        </div>

                        <p className="mt-1 truncate text-xs uppercase tracking-[0.2em] text-slate-500">
                          {message.userEmail || "No email"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${statusMeta.badgeClassName}`}
                  >
                    {statusMeta.label}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {createMessagePreview(message.message)}
                </p>

                {message.reply ? (
                  <div className="mt-4 rounded-[1rem] border border-emerald-400/15 bg-emerald-400/10 px-3 py-2 text-xs leading-5 text-emerald-50">
                    <span className="font-semibold uppercase tracking-[0.18em] text-emerald-200">
                      Reply
                    </span>
                    <p className="mt-1 text-emerald-50/90">
                      {createMessagePreview(message.reply, 88)}
                    </p>
                  </div>
                ) : null}

                <div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500">
                  <span>{formatMessageTimestamp(message.createdAt, locale)}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles size={13} className="text-cyan/80" />
                    {message.userId ? "Account-linked" : "Guest submission"}
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

export default MessageList;
