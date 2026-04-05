import { useEffect, useRef, useState } from "react";
import { Mail, Send, UserRound } from "lucide-react";
import { useAuth } from "../context/auth-core";
import { useChat } from "../hooks/useChat";
import { sendMessage, updateThreadStatus, markThreadAsSeenByAdmin } from "../services/chatService";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ thread, locale }) => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { messages, isEmpty, isLoading, error } = useChat(thread?.id);
  const endOfMessagesRef = useRef(null);

  const scrollContainerRef = useRef(null);
  const isAtBottomRef = useRef(true);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isAtBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 50;
    isAtBottomRef.current = isAtBottom;
  };

  useEffect(() => {
    if (isAtBottomRef.current) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Mark as seen by admin when messages update AND user is viewing
  useEffect(() => {
    if (thread?.id && messages.length > 0 && user?.role === "admin") {
      const lastMessageIsFromUser = messages[messages.length - 1].senderRole === "user";
      if (lastMessageIsFromUser) {
        void markThreadAsSeenByAdmin({ threadId: thread.id });
      }
    }
  }, [thread?.id, messages, user?.role]);

  if (!thread) {
    return (
      <section className="flex h-full min-h-[32rem] items-center justify-center rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/78 p-8 text-center shadow-xl dark:shadow-[0_30px_100px_rgba(2,6,23,0.48)] backdrop-blur-2xl transition-colors duration-300">
        <div className="max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300 transition-colors duration-300">
            <Mail size={24} />
          </div>
          <h2 className="mt-5 text-2xl font-black text-slate-900 dark:text-white transition-colors duration-300">Select a conversation</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400 transition-colors duration-300">
            Pick any thread from the list to view chat history and send an instant reply.
          </p>
        </div>
      </section>
    );
  }

  const isSendDisabled = isUpdating || !text.trim() || thread.status === "closed";

  const handleSend = async () => {
    if (isSendDisabled || !user?.uid) return;

    try {
      setIsUpdating(true);
      await sendMessage({
        threadId: thread.id,
        senderId: user.uid,
        senderRole: "admin",
        text,
      });
      setText("");
    } catch (error) {
      console.error("Chat send failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleStatus = async () => {
    try {
      setIsUpdating(true);
      await updateThreadStatus({
        threadId: thread.id,
        status: thread.status === "open" ? "closed" : "open",
      });
    } catch (error) {
      console.error("Status toggle failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="relative flex h-full min-h-[32rem] flex-col overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/78 shadow-xl dark:shadow-[0_30px_100px_rgba(2,6,23,0.48)] backdrop-blur-2xl transition-colors duration-300">
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.06),transparent_64%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_64%)] pointer-events-none" />

      {/* Header */}
      <div className="relative border-b border-slate-200 dark:border-white/10 px-6 pb-5 pt-6 bg-slate-50/80 dark:bg-slate-900/50 backdrop-blur-sm transition-colors duration-300">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {thread.userPhoto ? (
               <img src={thread.userPhoto} alt={thread.userName} className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 object-cover bg-white dark:bg-transparent" referrerPolicy="no-referrer" />
            ) : (
               <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xl text-slate-500 dark:text-slate-300">
                 <UserRound size={24} />
               </div>
            )}
            <div className="min-w-0">
              <h2 className="truncate text-xl font-black text-slate-900 dark:text-white">
                {thread.userName || "Unknown sender"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{thread.userEmail}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] transition-colors duration-300 ${
                thread.status === "open"
                  ? "border-emerald-500/20 bg-emerald-100 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300"
                  : "border-slate-300/20 bg-slate-200 dark:bg-slate-400/10 text-slate-600 dark:text-slate-300"
              }`}
            >
              {thread.status}
            </span>
            {user?.role === "admin" && (
              <button
                type="button"
                onClick={handleToggleStatus}
                disabled={isUpdating}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors disabled:opacity-50"
              >
                Mark {thread.status === "open" ? "Closed" : "Open"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative flex-1 overflow-y-auto px-6 py-6 scroll-smooth"
      >
        {isLoading ? (
          <div className="flex justify-center p-4">
             <div className="animate-pulse flex space-x-2">
               <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
               <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
               <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
             </div>
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center px-4 py-10 text-center">
            <p className="max-w-md text-sm leading-6 text-rose-500 dark:text-rose-200">
              {error}
            </p>
          </div>
        ) : isEmpty ? (
          <div className="flex h-full items-center justify-center px-4 py-10 text-center">
            <p className="max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              No messages yet in this thread. The next message will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="space-y-4 flex flex-col">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} locale={locale} />
            ))}
            <div ref={endOfMessagesRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      {thread.status === "open" ? (
        <div className="relative border-t border-slate-200 dark:border-white/10 p-4 bg-slate-50/90 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-300">
          <div className="flex items-end gap-3">
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void handleSend();
                }
              }}
              placeholder="Type your message..."
              rows={text.split("\n").length > 2 ? 3 : 1}
              className="flex-1 resize-none rounded-2xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-950 px-4 py-3 text-sm leading-6 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-500/40 dark:focus:border-cyan-400/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 dark:focus:ring-cyan-400/40 transition-colors duration-300 shadow-sm dark:shadow-none"
            />
            <button
              type="button"
              disabled={isSendDisabled}
              onClick={() => {
                void handleSend();
              }}
              className="mb-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500 text-slate-950 transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 hover:bg-cyan-400"
            >
              <Send size={18} className="translate-x-[1px]" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] font-medium text-slate-500">
            Press Enter to send, Shift + Enter for new line.
          </p>
        </div>
      ) : (
        <div className="relative border-t border-slate-200 dark:border-white/10 p-4 bg-slate-50/90 dark:bg-slate-900/80 text-center transition-colors duration-300">
          <p className="text-sm text-slate-500 dark:text-slate-400">This thread is marked as closed.</p>
        </div>
      )}
    </section>
  );
};

export default ChatWindow;
