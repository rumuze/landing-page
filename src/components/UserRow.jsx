import React, { useState } from 'react';
import { User, Shield, MessageSquare, MoreVertical, LogOut, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserRow = ({ user, onPromote, onDemote }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const isAdmin = user.role === 'admin';

  const toggleModal = () => setIsOpen((prev) => !prev);

  const handleRoleChange = async () => {
    setIsUpdating(true);
    try {
      if (isAdmin) {
        await onDemote(user.uid);
      } else {
        await onPromote(user.uid);
      }
    } finally {
      setIsUpdating(false);
      setIsOpen(false);
    }
  };

  const handleViewMessages = () => {
    // Navigating to messages with a pre-filled search or filter logic if implemented
    navigate(`/admin/messages?search=${encodeURIComponent(user.email)}`);
  };

  const formatLastLogin = (date) => {
    if (!date) return 'Never login';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  const activityLabel = user.lastVisitAt ? 'Last visit' : 'Last login';
  const activityValue = user.lastVisitAt || user.lastLoginAt;

  return (
    <div className="group relative flex flex-col md:grid md:grid-cols-7 gap-4 md:items-center rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-cyan-400/20 hover:bg-white/[0.04]">
      {/* Avatar & Name */}
      <div className="col-span-2 flex items-center gap-3">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.name}
            className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-800">
            <User size={18} className="text-slate-400" />
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-200" title={user.name}>
            {user.name}
          </p>
          <p className="truncate text-xs text-slate-500 md:hidden" title={user.email}>
            {user.email}
          </p>
        </div>
      </div>

      {/* Email (Hidden on mobile) */}
      <div className="col-span-2 hidden md:block min-w-0">
        <p className="truncate text-sm text-slate-400" title={user.email}>
          {user.email}
        </p>
      </div>

      {/* Role */}
      <div className="col-span-1 flex items-center">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
            isAdmin
              ? 'border-rose-400/20 bg-rose-400/10 text-rose-300'
              : 'border-slate-400/20 bg-slate-400/10 text-slate-300'
          }`}
        >
          {isAdmin ? <Shield size={12} /> : <User size={12} />}
          {isAdmin ? 'Admin' : 'User'}
        </span>
      </div>

      {/* Stats */}
      <div className="col-span-1 flex flex-col items-start gap-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <MessageSquare size={14} />
          <span>{user.messagesCount || 0}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <LogOut size={14} className="rotate-180" />
          <span>{activityLabel}: {formatLastLogin(activityValue)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="absolute right-4 top-4 md:static md:col-span-1 md:flex md:justify-end">
        <div className="relative">
          <button
            onClick={toggleModal}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <MoreVertical size={16} className="text-slate-400" />
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-xl border border-white/10 bg-slate-900 shadow-xl overflow-hidden backdrop-blur-xl">
                <button
                  onClick={handleRoleChange}
                  disabled={isUpdating}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                  {isUpdating ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : isAdmin ? (
                    <User size={16} />
                  ) : (
                    <Shield size={16} />
                  )}
                  {isAdmin ? 'Demote to User' : 'Promote to Admin'}
                </button>
                <div className="h-px bg-white/10" />
                <button
                  onClick={handleViewMessages}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-cyan-300 hover:bg-cyan-400/10 transition-colors"
                >
                  <MessageSquare size={16} />
                  View Messages
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRow;
