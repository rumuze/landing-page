import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion as Motion } from 'framer-motion';
import { ShieldAlert, Users as UsersIcon, ShieldCheck, Mail, Database } from 'lucide-react';
import { useUsers } from '../../hooks/useUsers';
import UserRow from '../../components/UserRow';
import LoadingSpinner from '../../components/LoadingSpinner';

const Users = () => {
  const {
    users,
    isLoading,
    error,
    adminCount,
    userCount,
    promoteToAdmin,
    demoteToUser,
  } = useUsers();

  return (
    <>
      <Helmet>
        <title>User Management | Admin Rumuze</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen px-4 pb-24 pt-28 sm:px-6"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Header Section */}
          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/82 px-6 py-7 shadow-[0_30px_100px_rgba(2,6,23,0.5)] backdrop-blur-2xl sm:px-8">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(225,29,72,0.12),transparent_62%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-rose-400/75">
                  Access Control Center
                </p>
                <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  User Management
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Manage authenticated accounts, monitor user activity, and assign administrative privileges all protected via strict Firestore security rules.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[320px]">
                <div className="rounded-[1.5rem] border border-rose-400/15 bg-rose-400/10 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-rose-100/75">
                    Admins
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">{adminCount}</p>
                </div>

                <div className="rounded-[1.5rem] border border-cyan-400/15 bg-cyan-400/10 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-100/75">
                    Standard Users
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">{userCount}</p>
                </div>
              </div>
            </div>

            <div className="relative mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                <ShieldCheck size={14} className="text-rose-300" />
                Role-based Access
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                <Database size={14} className="text-cyan-200" />
                Live Firestore Stats
              </span>
            </div>
          </section>

          {/* Error State */}
          {error && (
            <div className="flex items-start gap-3 rounded-[1.5rem] border border-rose-400/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 shadow-[0_20px_50px_rgba(127,29,29,0.18)]">
              <ShieldAlert size={18} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* List Section */}
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/50 backdrop-blur-xl p-4 sm:p-6 overflow-hidden min-h-[400px]">
            {/* Headers (Desktop only) */}
            <div className="hidden md:grid md:grid-cols-7 gap-4 px-4 pb-4 border-b border-white/10 mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <div className="col-span-2">User</div>
              <div className="col-span-2">Email</div>
              <div className="col-span-1">Role</div>
              <div className="col-span-1">Activity</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Loading State */}
            {isLoading && users.length === 0 && (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
              </div>
            )}

            {/* Empty State */}
            {!isLoading && users.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/50 text-slate-400 mb-4">
                  <UsersIcon size={32} />
                </div>
                <h3 className="text-lg font-semibold text-white">No users found</h3>
                <p className="mt-2 max-w-sm text-sm text-slate-400">
                  There are currently no authenticated users in the database.
                </p>
              </div>
            )}

            {/* Users List */}
            <div className="flex flex-col gap-3">
              {users.map((user) => (
                <UserRow
                  key={user.uid}
                  user={user}
                  onPromote={promoteToAdmin}
                  onDemote={demoteToUser}
                />
              ))}
            </div>
          </div>
        </div>
      </Motion.div>
    </>
  );
};

export default Users;
