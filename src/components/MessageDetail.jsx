import { useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  CheckCheck,
  CornerUpRight,
  Mail,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  formatMessageTimestamp,
  getMessageStatusMeta,
} from "../utils/messages";

const actionButtonClassName =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-55";

const MessageDetail = ({
  message,
  isUpdating,
  locale,
  onMarkSeen,
  onSendReply,
}) => {
  const [replyText, setReplyText] = useState(message?.reply ?? "");

  if (!message) {
    return (
      <section className="flex h-full min-h-[32rem] items-center justify-center rounded-[2rem] border border-white/10 bg-slate-950/78 p-8 text-center shadow-[0_30px_100px_rgba(2,6,23,0.48)] backdrop-blur-2xl">
        <div className="max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300">
            <Mail size={24} />
          </div>
          <h2 className="mt-5 text-2xl font-black text-white">
            Select a message
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Pick any conversation from the inbox to inspect the full payload,
            review sender identity, and send an in-app reply.
          </p>
        </div>
      </section>
    );
  }

  const statusMeta = getMessageStatusMeta(message.status);
  const hasReply = Boolean(message.reply);
  const isReplyDisabled = isUpdating || hasReply || !replyText.trim();

  return (
    <section className="relative flex h-full min-h-[32rem] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/78 shadow-[0_30px_100px_rgba(2,6,23,0.48)] backdrop-blur-2xl">
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_64%)]" />

      <div className="relative border-b border-white/10 px-6 pb-5 pt-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300/75">
              Message Detail
            </p>
            <h2 className="mt-2 truncate text-2xl font-black text-white">
              {message.userName || "Unknown sender"}
            </h2>
            <p className="mt-2 text-sm text-slate-300">{message.userEmail}</p>
          </div>

          <span
            className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] ${statusMeta.badgeClassName}`}
          >
            {statusMeta.label}
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
              Received
            </p>
            <p className="mt-2 text-sm font-medium text-white">
              {formatMessageTimestamp(message.createdAt, locale)}
            </p>
          </div>

          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
              Sender
            </p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-white">
              <UserRound size={15} className="text-cyan" />
              {message.userId ? "Authenticated user" : "Guest visitor"}
            </p>
          </div>

          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
              Security
            </p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-emerald-200">
              <ShieldCheck size={15} className="text-emerald-300" />
              Firestore-enforced
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
              Full message
            </p>
            <Motion.pre
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-200"
            >
              {message.message}
            </Motion.pre>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  Admin reply
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {message.userId
                    ? "Sending a reply updates the message and creates a notification for the signed-in user."
                    : "Guests can receive the reply inside the admin record, but no user notification is created."}
                </p>
              </div>

              {message.repliedAt ? (
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-100">
                  Sent {formatMessageTimestamp(message.repliedAt, locale)}
                </span>
              ) : null}
            </div>

            <textarea
              value={replyText}
              onChange={(event) => setReplyText(event.target.value)}
              placeholder="Write a clear, production-ready reply..."
              disabled={hasReply}
              rows={7}
              className="mt-5 w-full resize-none rounded-[1.4rem] border border-white/10 bg-slate-950/70 px-4 py-4 text-sm leading-7 text-white placeholder:text-slate-500 focus:border-cyan/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
            />

            {hasReply ? (
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-emerald-200/80">
                Reply already delivered
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-6 py-5">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={isUpdating || message.status !== "new"}
            onClick={() => onMarkSeen(message.id)}
            className={`${actionButtonClassName} border-cyan-400/20 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/15`}
          >
            <CheckCheck size={16} />
            Mark as seen
          </button>

          <button
            type="button"
            disabled={isReplyDisabled}
            onClick={() => onSendReply(message, replyText)}
            className={`${actionButtonClassName} border-emerald-400/20 bg-emerald-400/10 text-emerald-100 hover:bg-emerald-400/15`}
          >
            <Send size={16} />
            Send reply
          </button>

          <a
            href={`mailto:${message.userEmail}`}
            className={`${actionButtonClassName} border-white/10 bg-transparent text-slate-200 hover:border-white/20 hover:bg-white/5`}
          >
            <CornerUpRight size={16} />
            Open email
          </a>
        </div>
      </div>
    </section>
  );
};

export default MessageDetail;
