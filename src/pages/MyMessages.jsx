import { Helmet } from "react-helmet-async";
import { motion as Motion } from "framer-motion";
import { BellRing, Inbox, MessageSquareText, SendHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/auth-core";
import { useMessages } from "../hooks/useMessages";
import {
  createMessagePreview,
  formatMessageTimestamp,
  getMessageStatusMeta,
} from "../utils/messages";

const MyMessages = () => {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const locale = i18n.language === "ar" ? "ar-EG" : "en-US";
  const isAr = i18n.language === "ar";
  const contactRoute = isAr ? "/ar/contact" : "/contact";

  const { messages, isLoading, error } = useMessages({
    userId: user?.uid ?? null,
  });

  const repliedCount = messages.filter((message) => message.reply).length;
  const pendingCount = Math.max(messages.length - repliedCount, 0);

  return (
    <>
      <Helmet>
        <title>{isAr ? "رسائلي | Rumuze" : "My Messages | Rumuze"}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen px-4 pb-24 pt-32 sm:px-6"
      >
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/82 px-6 py-7 shadow-[0_30px_100px_rgba(2,6,23,0.5)] backdrop-blur-2xl sm:px-8">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_62%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-200/75">
                  Personal Inbox
                </p>
                <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  My Messages
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Every signed-in message is linked to your account. When an
                  admin replies, you will see it here in real time and receive a
                  notification.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                    Total
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {messages.length}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-amber-400/15 bg-amber-400/10 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-amber-100/75">
                    Waiting
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {pendingCount}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-emerald-400/15 bg-emerald-400/10 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-100/75">
                    Replied
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {repliedCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
              <BellRing size={14} className="text-cyan" />
              Notifications enabled for replies
            </div>
          </section>

          {error ? (
            <div className="rounded-[1.5rem] border border-rose-400/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-[2rem] border border-white/10 bg-slate-950/72 p-6"
                >
                  <div className="h-4 w-32 rounded-full bg-white/10" />
                  <div className="mt-4 h-3 w-full rounded-full bg-white/10" />
                  <div className="mt-2 h-3 w-5/6 rounded-full bg-white/10" />
                  <div className="mt-6 h-24 rounded-[1.5rem] bg-white/10" />
                </div>
              ))}
            </div>
          ) : null}

          {!isLoading && messages.length === 0 ? (
            <section className="rounded-[2rem] border border-dashed border-white/10 bg-slate-950/72 px-6 py-12 text-center shadow-[0_30px_100px_rgba(2,6,23,0.36)] backdrop-blur-2xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-100">
                <Inbox size={26} />
              </div>
              <h2 className="mt-5 text-2xl font-black text-white">
                No messages yet
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">
                Send your first message from the contact page while signed in,
                and every future admin reply will appear here automatically.
              </p>
              <Link
                to={contactRoute}
                className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 px-5 text-sm font-semibold text-cyan transition-all duration-200 hover:bg-cyan/15"
              >
                Send a Message
              </Link>
            </section>
          ) : null}

          {!isLoading && messages.length > 0 ? (
            <div className="grid gap-4">
              {messages.map((message, index) => {
                const statusMeta = getMessageStatusMeta(message.status);

                return (
                  <Motion.article
                    key={message.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, delay: Math.min(index * 0.04, 0.16) }}
                    className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/74 shadow-[0_24px_70px_rgba(2,6,23,0.4)] backdrop-blur-2xl"
                  >
                    <div className="border-b border-white/10 px-6 py-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                            Sent {formatMessageTimestamp(message.createdAt, locale)}
                          </p>
                          <h2 className="mt-2 text-xl font-black text-white">
                            {createMessagePreview(message.message, 64)}
                          </h2>
                        </div>

                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] ${statusMeta.badgeClassName}`}
                        >
                          {statusMeta.label}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-5 px-6 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                      <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
                        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                          <MessageSquareText size={14} className="text-cyan" />
                          Your message
                        </div>
                        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-200">
                          {message.message}
                        </p>
                      </div>

                      <div
                        className={`rounded-[1.5rem] border p-5 ${
                          message.reply
                            ? "border-emerald-400/15 bg-emerald-400/10"
                            : "border-white/10 bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                          <SendHorizontal
                            size={14}
                            className={message.reply ? "text-emerald-200" : "text-slate-400"}
                          />
                          Admin reply
                        </div>

                        {message.reply ? (
                          <>
                            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-emerald-50">
                              {message.reply}
                            </p>
                            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-emerald-200/80">
                              Received {formatMessageTimestamp(message.repliedAt, locale)}
                            </p>
                          </>
                        ) : (
                          <p className="mt-4 text-sm leading-7 text-slate-400">
                            No reply yet. We will notify you here as soon as an
                            admin responds.
                          </p>
                        )}
                      </div>
                    </div>
                  </Motion.article>
                );
              })}
            </div>
          ) : null}
        </div>
      </Motion.div>
    </>
  );
};

export default MyMessages;
