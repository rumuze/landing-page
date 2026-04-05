import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellOff, CheckCheck, MessageCircle, Reply, Clock } from 'lucide-react';

/* ─── helpers ──────────────────────────────────────────────────── */

function formatRelativeTime(date) {
  if (!date) return '';
  const now = Date.now();
  const diff = now - (date instanceof Date ? date.getTime() : new Date(date).getTime());
  const s = Math.floor(diff / 1000);
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return date instanceof Date
    ? date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : '';
}

const TYPE_CONFIG = {
  message: {
    label: 'Message',
    Icon: MessageCircle,
    colorClass: 'text-cyan',
    bgClass: 'bg-cyan/10 dark:bg-cyan/10',
    dotClass: 'bg-cyan',
  },
  reply: {
    label: 'Reply',
    Icon: Reply,
    colorClass: 'text-purple-400',
    bgClass: 'bg-purple-400/10 dark:bg-purple-400/10',
    dotClass: 'bg-purple-400',
  },
  default: {
    label: 'Alert',
    Icon: Clock,
    colorClass: 'text-amber-400',
    bgClass: 'bg-amber-400/10',
    dotClass: 'bg-amber-400',
  },
};

function getTypeConfig(type) {
  return TYPE_CONFIG[type] ?? TYPE_CONFIG.default;
}

/* ─── skeleton ─────────────────────────────────────────────────── */

function NotificationSkeleton() {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5 animate-pulse">
      <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-white/10 flex-shrink-0" />
      <div className="flex-1 space-y-2 pt-0.5">
        <div className="h-3.5 bg-slate-200 dark:bg-white/10 rounded w-2/3" />
        <div className="h-3 bg-slate-200 dark:bg-white/10 rounded w-full" />
        <div className="h-3 bg-slate-200 dark:bg-white/10 rounded w-1/3" />
      </div>
    </div>
  );
}

/* ─── single row ───────────────────────────────────────────────── */

function NotificationRow({ notification, onAction }) {
  const config = getTypeConfig(notification.type);
  const { Icon } = config;

  return (
    <button
      onClick={() => onAction(notification)}
      className={`
        w-full text-left flex items-start gap-3 px-4 py-3.5
        border-b border-slate-100 dark:border-white/5 last:border-0
        transition-all duration-200 group relative
        ${notification.isRead
          ? 'opacity-60 hover:opacity-100 hover:bg-slate-50 dark:hover:bg-white/[0.03]'
          : 'bg-cyan/[0.03] dark:bg-cyan/[0.04] hover:bg-cyan/[0.06] dark:hover:bg-cyan/[0.07]'
        }
      `}
      aria-label={`${notification.isRead ? '' : 'Unread: '}${notification.title}`}
    >
      {/* Unread indicator stripe */}
      {!notification.isRead && (
        <span
          className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-full bg-cyan"
          aria-hidden="true"
        />
      )}

      {/* Icon badge */}
      <div
        className={`
          flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
          ${config.bgClass}
        `}
        aria-hidden="true"
      >
        <Icon size={16} className={config.colorClass} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-sm leading-snug truncate ${
              notification.isRead
                ? 'font-medium text-slate-600 dark:text-gray-300'
                : 'font-semibold text-slate-900 dark:text-white'
            }`}
          >
            {notification.title}
          </p>
          <span
            className={`
              flex-shrink-0 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md
              ${config.bgClass} ${config.colorClass}
            `}
          >
            {config.label}
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
          {notification.body}
        </p>

        <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-1.5 font-medium">
          {formatRelativeTime(notification.createdAt)}
        </p>
      </div>
    </button>
  );
}

/* ─── empty state ──────────────────────────────────────────────── */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
        <BellOff size={22} className="text-slate-400 dark:text-gray-500" />
      </div>
      <p className="text-sm font-semibold text-slate-700 dark:text-gray-300">
        All caught up
      </p>
      <p className="text-xs text-slate-400 dark:text-gray-500 mt-1 max-w-[200px]">
        You don&apos;t have any notifications yet.
      </p>
    </div>
  );
}

/* ─── main component ───────────────────────────────────────────── */

/**
 * NotificationDropdown
 *
 * @param {Object}   props
 * @param {boolean}  props.isOpen
 * @param {Function} props.onClose
 * @param {Array}    props.notifications
 * @param {number}   props.unreadCount
 * @param {boolean}  props.isLoading
 * @param {Function} props.markAsRead
 * @param {Function} props.markAllAsRead
 * @param {boolean}  [props.isRtl=false]
 */
const NotificationDropdown = ({
  isOpen,
  onClose,
  notifications,
  unreadCount,
  isLoading,
  markAsRead,
  markAllAsRead,
  isRtl = false,
}) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  /* Close on outside click */
  const handleOutsideClick = useCallback(
    (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    },
    [onClose]
  );

  /* Close on Escape */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleOutsideClick, handleKeyDown]);

  /* Handle clicking a notification row */
  const handleAction = useCallback(
    async (notification) => {
      if (!notification.isRead) {
        await markAsRead(notification.id);
      }
      onClose();
      if (notification.link) {
        navigate(notification.link);
      }
    },
    [markAsRead, onClose, navigate]
  );

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      role="dialog"
      aria-label="Notifications"
      aria-modal="true"
      className={`
        absolute top-full mt-3 w-[360px] max-w-[calc(100vw-2rem)]
        bg-white dark:bg-[#0a1628]
        border border-slate-200/80 dark:border-white/[0.08]
        rounded-2xl shadow-2xl shadow-slate-900/10 dark:shadow-black/40
        overflow-hidden z-[70]
        ${isRtl ? 'left-0' : 'right-0'}
        animate-notif-drop
      `}
      style={{
        /* subtle backdrop blur for premium feel */
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      {/* ── header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="text-[10px] font-bold bg-cyan text-slate-900 rounded-full px-1.5 py-0.5 leading-none">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-gray-400 hover:text-cyan dark:hover:text-cyan transition-colors py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
            aria-label="Mark all as read"
          >
            <CheckCheck size={13} />
            Mark all read
          </button>
        )}
      </div>

      {/* ── body ───────────────────────────────────────────── */}
      <div
        className="overflow-y-auto max-h-[420px] no-scrollbar"
        role="list"
        aria-label="Notification list"
      >
        {isLoading ? (
          <>
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
          </>
        ) : notifications.length === 0 ? (
          <EmptyState />
        ) : (
          notifications.map((n) => (
            <div key={n.id} role="listitem">
              <NotificationRow notification={n} onAction={handleAction} />
            </div>
          ))
        )}
      </div>

      {/* ── footer ─────────────────────────────────────────── */}
      {notifications.length > 0 && (
        <div className="px-4 py-3 border-t border-slate-100 dark:border-white/[0.06]">
          <p className="text-center text-[11px] text-slate-400 dark:text-gray-500">
            {notifications.length} notification{notifications.length !== 1 ? 's' : ''} total
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
