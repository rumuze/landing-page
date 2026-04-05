import { useEffect, useRef, useState } from "react";
import { Mail, Send, UserRound } from "lucide-react";
import { formatMessageTimestamp } from "../utils/messages";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../context/auth-core";

const MessageDetail = ({ thread, isUpdating, locale, onToggleStatus, onSendMessage }) => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const { messages, isEmpty, isLoading, error } = useChat(thread?.id);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!thread) {
    return (
      <section className="flex h-full min-h-[32rem] items-center justify-center rounded-[2rem] border border-white/10 bg-slate-950/78 p-8 text-center shadow-[0_30px_100px_rgba(2,6,23,0.48)] backdrop-blur-2xl">
        <div className="max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300">
            <Mail size={24} />
          </div>
          <h2 className="mt-5 text-2xl font-black text-white">Select a conversation</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Pick any thread from the list to view chat history and send an instant reply.
          </p>
        </div>
      </section>
    );
  }

  const isSendDisabled = isUpdating || !text.trim();

  const handleSend = async () => {
    if (isSendDisabled) return;

    try {
      await onSendMessage(thread, text);
      setText("");
    } catch (error) {
      console.error("Chat send failed:", error);
    }
  };

  return (
    <section className="relative flex h-full min-h-[32rem] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/78 shadow-[0_30px_100px_rgba(2,6,23,0.48)] backdrop-blur-2xl">
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_64%)]" />

      {/* Header */}
      <div className="relative border-b border-white/10 px-6 pb-5 pt-6 bg-slate-900/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {thread.userPhoto ? (
               <img src={thread.userPhoto} alt={thread.userName} className="w-12 h-12 rounded-full border border-white/10" />
            ) : (
               <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-xl text-slate-300">
                 <UserRound size={24} />
               </div>
            )}
            <div className="min-w-0">
              <h2 className="truncate text-xl font-black text-white">
                {thread.userName || "Unknown sender"}
              </h2>
              <p className="text-sm text-slate-400">{thread.userEmail}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] ${
                thread.status === "open"
                  ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                  : "border-slate-400/20 bg-slate-400/10 text-slate-300"
              }`}
            >
              {thread.status}
            </span>
            {user?.role === "admin" && (
              <button
                type="button"
                onClick={() => onToggleStatus(thread)}
                disabled={isUpdating}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
              >
                Mark {thread.status === "open" ? "Closed" : "Open"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="relative flex-1 overflow-y-auto px-6 py-6 scroll-smooth">
        {isLoading ? (
          <div className="flex justify-center p-4">
             <div className="animate-pulse flex space-x-2">
               <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
               <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
               <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
             </div>
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center px-4 py-10 text-center">
            <p className="max-w-md text-sm leading-6 text-rose-200">
              {error}
            </p>
          </div>
        ) : isEmpty ? (
          <div className="flex h-full items-center justify-center px-4 py-10 text-center">
            <p className="max-w-md text-sm leading-6 text-slate-400">
              No messages yet in this thread. The next message will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="space-y-4 flex flex-col">
            {messages.map((msg) => {
              const isAdmin = msg.senderRole === "admin";
              return (
                <div key={msg.id} className={`flex w-full ${isAdmin ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                    isAdmin 
                      ? "bg-cyan-600/20 border border-cyan-400/20 text-cyan-50 rounded-br-none" 
                      : "bg-slate-800/50 border border-white/10 text-slate-200 rounded-bl-none"
                  }`}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                    <div className={`mt-2 text-[10px] uppercase font-semibold tracking-wider ${isAdmin ? "text-cyan-400/60 text-right" : "text-slate-500 text-left"}`}>
                      {msg.createdAt ? formatMessageTimestamp(msg.createdAt, locale) : "Just now"}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={endOfMessagesRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      {thread.status === "open" ? (
        <div className="relative border-t border-white/10 p-4 bg-slate-900/80">
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
              className="flex-1 resize-none rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-6 text-white placeholder:text-slate-500 focus:border-cyan-400/40 focus:outline-none focus:ring-1 focus:ring-cyan-400/40"
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
        <div className="relative border-t border-white/10 p-4 bg-slate-900/80 text-center">
          <p className="text-sm text-slate-400">This thread is marked as closed.</p>
        </div>
      )}
    </section>
  );
};

export default MessageDetail;
