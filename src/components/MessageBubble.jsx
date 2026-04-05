import { formatMessageTimestamp } from "../utils/messages";

const MessageBubble = ({ message, locale }) => {
  // Align admin to left, user to right
  const isAdmin = message.senderRole === "admin";
  
  return (
    <div className={`flex w-full ${isAdmin ? "justify-start" : "justify-end"}`}>
      <div 
        className={`max-w-[75%] rounded-2xl px-5 py-3 transition-colors duration-300 ${
          isAdmin 
            ? "bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-bl-none" 
            : "bg-cyan-100 dark:bg-cyan-600/20 border border-cyan-200 dark:border-cyan-400/20 text-cyan-900 dark:text-cyan-50 rounded-br-none"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-left">{message.text}</p>
        <div 
          className={`mt-2 text-[10px] uppercase font-semibold tracking-wider transition-colors duration-300 ${
            isAdmin ? "text-slate-500 text-left" : "text-cyan-600 dark:text-cyan-400/60 text-right"
          }`}
        >
          {message.createdAt ? formatMessageTimestamp(message.createdAt, locale) : "Just now"}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
