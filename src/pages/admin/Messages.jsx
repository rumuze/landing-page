import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion as Motion } from "framer-motion";
import { AlertCircle, Inbox, MessageSquareMore, ShieldCheck } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import MessageDetail from "../../components/MessageDetail";
import MessageList from "../../components/MessageList";
import { useMessages } from "../../hooks/useMessages";
import { getDb } from "../../utils/firebaseClient";
import {
  matchesMessageSearch,
  normalizeMessageStatus,
  sendAdminReply,
} from "../../utils/messages";

const Messages = () => {
  const { i18n } = useTranslation();
  const [selectedId, setSelectedId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [isUpdating, setIsUpdating] = useState(false);
  const [actionError, setActionError] = useState("");
  const deferredSearch = useDeferredValue(searchValue);
  const locale = i18n.language === "ar" ? "ar-EG" : "en-US";

  const {
    messages,
    isLoading,
    error: subscriptionError,
  } = useMessages({ mode: "admin" });

  const filteredMessages = messages.filter((message) => {
    const matchesFilter = filter === "all" || message.status === filter;
    return matchesFilter && matchesMessageSearch(message, deferredSearch);
  });

  useEffect(() => {
    if (filteredMessages.length === 0) {
      if (selectedId !== null) {
        startTransition(() => {
          setSelectedId(null);
        });
      }

      return;
    }

    const selectedMessageStillVisible = filteredMessages.some(
      (message) => message.id === selectedId,
    );

    if (!selectedMessageStillVisible) {
      startTransition(() => {
        setSelectedId(filteredMessages[0].id);
      });
    }
  }, [filteredMessages, selectedId]);

  const selectedMessage =
    filteredMessages.find((message) => message.id === selectedId) ?? null;

  const newCount = messages.filter((message) => message.status === "new").length;
  const repliedCount = messages.filter(
    (message) => message.status === "replied",
  ).length;
  const linkedCount = messages.filter((message) => Boolean(message.userId)).length;
  const guestCount = Math.max(messages.length - linkedCount, 0);
  const error = actionError || subscriptionError;

  const updateMessage = async (messageId, payload) => {
    try {
      setIsUpdating(true);
      setActionError("");
      await updateDoc(doc(getDb(), "messages", messageId), payload);
    } catch (updateError) {
      setActionError(
        updateError?.message ?? "Unable to update the selected message.",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMarkSeen = async (messageId) => {
    await updateMessage(messageId, {
      status: normalizeMessageStatus("seen"),
    });
  };

  const handleSendReply = async (message, replyText) => {
    try {
      setIsUpdating(true);
      setActionError("");
      await sendAdminReply(message, replyText);
    } catch (replyError) {
      setActionError(replyError?.message ?? "Unable to send the reply.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Messages | Rumuze</title>
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
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan/75">
                  Secure Messaging Console
                </p>
                <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  Admin Message Center
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Public visitors can submit messages, authenticated users are
                  linked to their accounts, and admins can reply in-app with
                  Firestore-enforced access control.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                <div className="rounded-[1.5rem] border border-cyan-400/15 bg-cyan-400/10 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-100/75">
                    New
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">{newCount}</p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                    Linked Users
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {linkedCount}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                    Guests
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {guestCount}
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

            <div className="relative mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                <ShieldCheck size={14} className="text-emerald-300" />
                Firestore enforced
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                <Inbox size={14} className="text-cyan-200" />
                Real-time inbox
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                <MessageSquareMore size={14} className="text-cyan-200" />
                Reply workflow
              </span>
            </div>
          </section>

          {error ? (
            <div className="flex items-start gap-3 rounded-[1.5rem] border border-rose-400/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 shadow-[0_20px_50px_rgba(127,29,29,0.18)]">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          ) : null}

          <div className="grid gap-6 xl:grid-cols-[23rem_minmax(0,1fr)]">
            <MessageList
              messages={filteredMessages}
              selectedId={selectedId}
              onSelectMessage={(messageId) =>
                startTransition(() => {
                  setSelectedId(messageId);
                })
              }
              isLoading={isLoading}
              filter={filter}
              onFilterChange={(nextFilter) =>
                startTransition(() => {
                  setFilter(nextFilter);
                })
              }
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              newCount={newCount}
              linkedCount={linkedCount}
              locale={locale}
            />

            <MessageDetail
              key={selectedMessage?.id ?? "empty"}
              message={selectedMessage}
              isUpdating={isUpdating}
              locale={locale}
              onMarkSeen={handleMarkSeen}
              onSendReply={handleSendReply}
            />
          </div>
        </div>
      </Motion.div>
    </>
  );
};

export default Messages;
