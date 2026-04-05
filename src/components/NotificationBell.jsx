import React, { useState, useCallback } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { useAuth } from '../context/auth-core';
import NotificationDropdown from './NotificationDropdown';

/**
 * NotificationBell
 *
 * Self-contained bell button with badge + dropdown.
 * Consumes useNotifications internally so it can be dropped
 * anywhere in the tree without prop-drilling.
 *
 * @param {Object}  props
 * @param {boolean} [props.isRtl=false]  – flips dropdown alignment for RTL layouts
 * @param {string}  [props.className=''] – extra classes for the wrapper
 */
const NotificationBell = ({ isRtl = false, className = '' }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Don't render the bell if the user isn't signed in
  if (!user) return null;

  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      {/* Bell trigger */}
      <button
        id="notification-bell-btn"
        onClick={handleToggle}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`
          relative flex items-center justify-center
          w-9 h-9 rounded-xl
          border transition-all duration-200
          ${isOpen
            ? 'border-cyan/50 bg-cyan/10 text-cyan shadow-[0_0_0_3px_rgba(0,229,255,0.12)]'
            : 'border-slate-200 dark:border-white/10 bg-transparent text-slate-600 dark:text-gray-300 hover:border-cyan/40 hover:text-cyan dark:hover:text-cyan hover:bg-cyan/5'
          }
        `}
      >
        <Bell
          size={17}
          strokeWidth={2}
          className={`
            transition-transform duration-300
            ${unreadCount > 0 ? 'animate-bell-jingle' : ''}
          `}
        />

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className="
              absolute -top-1.5 -right-1.5
              min-w-[18px] h-[18px] px-1
              flex items-center justify-center
              text-[10px] font-black leading-none
              bg-cyan text-slate-900
              rounded-full border-2 border-white dark:border-background
              shadow-sm
              animate-badge-pop
            "
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}

        {/* Active glow ring */}
        {isOpen && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-xl ring-2 ring-cyan/20 pointer-events-none"
          />
        )}
      </button>

      {/* Dropdown */}
      <NotificationDropdown
        isOpen={isOpen}
        onClose={handleClose}
        notifications={notifications}
        unreadCount={unreadCount}
        isLoading={isLoading}
        markAsRead={markAsRead}
        markAllAsRead={markAllAsRead}
        isRtl={isRtl}
      />
    </div>
  );
};

export default NotificationBell;
