// Placeholder shown while a lazily loaded page downloads.
const RouteSkeleton = () => (
  <div className="surface-page min-h-screen p-8 space-y-8 animate-pulse">
    <div className="h-20 w-full rounded-2xl bg-slate-200/80 dark:bg-white/5"></div>
    <div className="h-[500px] w-full rounded-3xl bg-slate-200/70 dark:bg-white/5"></div>
    <div className="grid grid-cols-3 gap-8">
      <div className="h-64 rounded-2xl bg-slate-200/70 dark:bg-white/5"></div>
      <div className="h-64 rounded-2xl bg-slate-200/70 dark:bg-white/5"></div>
      <div className="h-64 rounded-2xl bg-slate-200/70 dark:bg-white/5"></div>
    </div>
  </div>
);

export default RouteSkeleton;
