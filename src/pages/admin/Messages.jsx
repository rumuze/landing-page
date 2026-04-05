import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion as Motion } from "framer-motion";
import { AlertCircle, Inbox, MessageSquareMore, ShieldCheck } from "lucide-react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import MessageDetail from "../../components/MessageDetail";
import MessageList from "../../components/MessageList";
import { useThreads } from "../../hooks/useThreads";
import { getDb } from "../../utils/firebaseClient";
import {
  matchesMessageSearch,
  sendChatMessage,
} from "../../utils/messages";
import { useAuth } from "../../context/auth-core";

const Messages = () => {
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState(searchParams.get("threadId"));
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [isUpdating, setIsUpdating] = useState(false);
  const [actionError, setActionError] = useState("");
  const deferredSearch = useDeferredValue(searchValue);
  const locale = i18n.language === "ar" ? "ar-EG" : "en-US";

  const {
    threads,
    isLoading,
    error: subscriptionError,
  } = useThreads();

  const filteredThreads = threads.filter((thread) => {
    const matchesFilter = filter === "all" || thread.status === filter;
    return matchesFilter && matchesMessageSearch(thread, deferredSearch); // Ensure matchesSearch checks thread fields
  });

  useEffect(() => {
    if (filteredThreads.length === 0) {
      if (selectedId !== null) {
        startTransition(() => {
          setSelectedId(null);
        });
      }
      return;
    }

    const threadIdFromUrl = searchParams.get("threadId");
    const selectedThreadStillVisible = filteredThreads.some(
      (thread) => thread.id === selectedId,
    );

    if (threadIdFromUrl && filteredThreads.some(t => t.id === threadIdFromUrl)) {
      if (selectedId !== threadIdFromUrl) {
        setSelectedId(threadIdFromUrl);
      }
    } else if (!selectedThreadStillVisible) {
      startTransition(() => {
        setSelectedId(filteredThreads[0].id);
      });
    }
  }, [filteredThreads, selectedId, searchParams]);

  const selectedThread =
    filteredThreads.find((thread) => thread.id === selectedId) ?? null;

  const openCount = threads.filter((thread) => thread.status === "open").length;
  const closedCount = threads.filter((thread) => thread.status === "closed").length;
  const linkedCount = threads.filter((thread) => Boolean(thread.userId)).length;
  const guestCount = Math.max(threads.length - linkedCount, 0);
  const error = actionError || subscriptionError;

  const updateThread = async (threadId, payload) => {
    try {
      setIsUpdating(true);
      setActionError("");
      await updateDoc(doc(getDb(), "threads", threadId), payload);
    } catch (updateError) {
      setActionError(
        updateError?.message ?? "Unable to update the selected thread.",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleStatus = async (thread) => {
    await updateThread(thread.id, {
      status: thread.status === "open" ? "closed" : "open",
      updatedAt: serverTimestamp(),
    });
  };

  const handleSendReply = async (thread, replyText) => {
    try {
      if (!user?.uid) {
        throw new Error("Authenticated admin session is required.");
      }

      setIsUpdating(true);
      setActionError("");
      await sendChatMessage({
        threadId: thread.id,
        senderId: user.uid,
        senderRole: "admin",
        text: replyText,
        targetUserId: thread.userId,
      });
      return true;
    } catch (replyError) {
      setActionError(replyError?.message ?? "Unable to send the reply.");
      throw replyError;
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
                <div className="rounded-[1.5rem] border border-emerald-400/15 bg-emerald-400/10 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-100/75">
                    Open
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">{openCount}</p>
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

                <div className="rounded-[1.5rem] border border-slate-400/15 bg-slate-400/10 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-300/75">
                    Closed
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {closedCount}
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
              messages={filteredThreads}
              selectedId={selectedId}
              onSelectMessage={(threadId) =>
                startTransition(() => {
                  setSelectedId(threadId);
                  setSearchParams({ threadId });
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
              newCount={openCount}
              linkedCount={linkedCount}
              locale={locale}
            />

            <MessageDetail
              key={selectedThread?.id ?? "empty"}
              thread={selectedThread}
              isUpdating={isUpdating}
              locale={locale}
              onToggleStatus={handleToggleStatus}
              onSendMessage={handleSendReply}
            />
          </div>
        </div>
      </Motion.div>
    </>
  );
};

export default Messages;
