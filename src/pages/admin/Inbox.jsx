import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ThreadList from "../../components/ThreadList";
import ChatWindow from "../../components/ChatWindow";
import { useThreads } from "../../hooks/useThreads";
import { matchesMessageSearch } from "../../utils/messages";

const Inbox = () => {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState(searchParams.get("thread"));
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("all");
  const deferredSearch = useDeferredValue(searchValue);
  const locale = i18n.language === "ar" ? "ar-EG" : "en-US";

  const {
    threads,
    isLoading,
  } = useThreads();

  const filteredThreads = threads.filter((thread) => {
    const matchesFilter = filter === "all" || thread.status === filter;
    return matchesFilter && matchesMessageSearch(thread, deferredSearch);
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

    const threadIdFromUrl = searchParams.get("thread");
    const selectedThreadStillVisible = filteredThreads.some(
      (thread) => thread.id === selectedId,
    );

    if (threadIdFromUrl && filteredThreads.some(t => t.id === threadIdFromUrl)) {
      if (selectedId !== threadIdFromUrl) {
        startTransition(() => {
          setSelectedId(threadIdFromUrl);
        });
      }
    } else if (!selectedThreadStillVisible) {
      startTransition(() => {
        setSelectedId(filteredThreads[0].id);
        setSearchParams({ thread: filteredThreads[0].id }, { replace: true });
      });
    }
  }, [filteredThreads, selectedId, searchParams, setSearchParams]);

  const selectedThread = filteredThreads.find((thread) => thread.id === selectedId) ?? null;

  const handleSelectThread = (threadId) => {
    startTransition(() => {
      setSelectedId(threadId);
      setSearchParams({ thread: threadId });
    });
  };

  return (
    <>
      <Helmet>
        <title>Admin Inbox | Rumuze</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen px-4 pb-24 pt-28 sm:px-6"
      >
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="grid gap-6 xl:grid-cols-[23rem_minmax(0,1fr)]">
            <ThreadList
              threads={filteredThreads}
              selectedId={selectedId}
              onSelectThread={handleSelectThread}
              isLoading={isLoading}
              filter={filter}
              onFilterChange={(nextFilter) => startTransition(() => setFilter(nextFilter))}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              locale={locale}
              title="Inbox"
              description="Real-time Admin Support Console."
            />

            <ChatWindow
              key={selectedThread?.id ?? "empty"}
              thread={selectedThread}
              locale={locale}
            />
          </div>
        </div>
      </Motion.div>
    </>
  );
};

export default Inbox;
