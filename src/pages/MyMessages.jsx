import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion as Motion } from "framer-motion";
import { BellRing, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/auth-core";
import { useThreads } from "../hooks/useThreads";
import { sendChatMessage, matchesMessageSearch } from "../utils/messages";
import MessageList from "../components/MessageList";
import MessageDetail from "../components/MessageDetail";

const MyMessages = () => {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const locale = i18n.language === "ar" ? "ar-EG" : "en-US";
  const isAr = i18n.language === "ar";
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState(searchParams.get("threadId"));
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [isUpdating, setIsUpdating] = useState(false);
  const [actionError, setActionError] = useState("");
  const deferredSearch = useDeferredValue(searchValue);

  const { threads, isLoading, error: subscriptionError } = useThreads();

  const filteredThreads = threads.filter((thread) => {
    const matchesFilter = filter === "all" || thread.status === filter;
    return matchesFilter && matchesMessageSearch(thread, deferredSearch);
  });

  useEffect(() => {
    if (filteredThreads.length === 0) {
      if (selectedId !== null) startTransition(() => setSelectedId(null));
      return;
    }

    const threadIdFromUrl = searchParams.get("threadId");
    const selectedThreadStillVisible = filteredThreads.some((t) => t.id === selectedId);

    if (threadIdFromUrl && filteredThreads.some(t => t.id === threadIdFromUrl)) {
      if (selectedId !== threadIdFromUrl) {
        setSelectedId(threadIdFromUrl);
      }
    } else if (!selectedThreadStillVisible) {
      startTransition(() => setSelectedId(filteredThreads[0].id));
    }
  }, [filteredThreads, selectedId, searchParams]);

  const selectedThread = filteredThreads.find((t) => t.id === selectedId) ?? null;

  const openCount = threads.filter((t) => t.status === "open").length;
  const closedCount = threads.filter((t) => t.status === "closed").length;
  const error = actionError || subscriptionError;

  const handleSendReply = async (thread, replyText) => {
    try {
      setIsUpdating(true);
      setActionError("");
      await sendChatMessage({
        threadId: thread.id,
        senderId: user.uid,
        senderRole: "user",
        text: replyText,
        targetUserId: "ADMIN_UID_PLACEHOLDER",
      });
    } catch (err) {
      setActionError(err?.message ?? "Unable to send message.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleStatus = async () => {
    // Only admins can toggle status. user does not do this, but the prop must be passed.
  };

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
        <div className="mx-auto max-w-7xl space-y-6">
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
                  Every signed-in message is linked to your account. You can chat directly with admins in real time below.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Total Threads</p>
                  <p className="mt-2 text-2xl font-black text-white">{threads.length}</p>
                </div>
                <div className="rounded-[1.5rem] border border-cyan-400/15 bg-cyan-400/10 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-100/75">Open</p>
                  <p className="mt-2 text-2xl font-black text-white">{openCount}</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-400/15 bg-slate-400/10 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-300/75">Closed</p>
                  <p className="mt-2 text-2xl font-black text-white">{closedCount}</p>
                </div>
              </div>
            </div>

            <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
              <BellRing size={14} className="text-emerald-300" />
              Live chat notifications enabled
            </div>
          </section>

          {error ? (
            <div className="flex items-start gap-3 rounded-[1.5rem] border border-rose-400/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 shadow-[0_20px_50px_rgba(127,29,29,0.18)]">
              <ShieldAlert size={18} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          ) : null}

          {threads.length > 0 || isLoading ? (
            <div className="grid gap-6 xl:grid-cols-[23rem_minmax(0,1fr)]">
              <MessageList
                messages={filteredThreads}
                selectedId={selectedId}
                onSelectMessage={(id) => startTransition(() => {
                  setSelectedId(id);
                  setSearchParams({ threadId: id });
                })}
                isLoading={isLoading}
                filter={filter}
                onFilterChange={(f) => startTransition(() => setFilter(f))}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                newCount={openCount}
                linkedCount={threads.length}
                locale={locale}
                title="My Inbox"
                description="Your active support conversations."
              />
              <MessageDetail
                key={selectedThread?.id ?? "empty"}
                thread={selectedThread}
                isUpdating={isUpdating}
                locale={locale}
                onToggleStatus={handleToggleStatus}
                onSendReply={handleSendReply}
              />
            </div>
          ) : (
            <section className="rounded-[2rem] border border-dashed border-white/10 bg-slate-950/72 px-6 py-12 text-center shadow-[0_30px_100px_rgba(2,6,23,0.36)] backdrop-blur-2xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-100">
                <BellRing size={26} />
              </div>
              <h2 className="mt-5 text-2xl font-black text-white">No messages yet</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">
                Send your first message from the contact page while signed in,
                and every future admin chat trace will appear here efficiently.
              </p>
              <Link
                to={isAr ? "/ar/contact" : "/contact"}
                className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 px-5 text-sm font-semibold text-cyan transition-all duration-200 hover:bg-cyan/15"
              >
                Send a Message
              </Link>
            </section>
          )}
        </div>
      </Motion.div>
    </>
  );
};

export default MyMessages;
