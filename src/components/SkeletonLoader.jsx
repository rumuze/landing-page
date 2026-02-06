import React from 'react';

const SkeletonLoader = ({ type = "text", className = "" }) => {
  return (
    <div className={`relative overflow-hidden bg-slate-200 dark:bg-white/5 rounded-lg ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/5 to-transparent"></div>
    </div>
  );
};

export const CardSkeleton = () => (
    <div className="p-0 rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 h-full flex flex-col">
        <div className="aspect-[4/3] w-full relative">
             <SkeletonLoader className="w-full h-full rounded-none" />
        </div>
        <div className="p-8 space-y-4 flex-1">
             <SkeletonLoader className="h-4 w-24 rounded-full" />
             <SkeletonLoader className="h-8 w-3/4 rounded-lg" />
             <SkeletonLoader className="h-4 w-full rounded-lg" />
             <SkeletonLoader className="h-4 w-2/3 rounded-lg" />
        </div>
    </div>
);

export const ArticleSkeleton = () => (
    <div className="p-0 rounded-[2rem] overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 h-full flex flex-col">
        <div className="h-64 relative">
             <SkeletonLoader className="w-full h-full rounded-none" />
        </div>
        <div className="p-8 space-y-6 flex-1">
             <div className="flex gap-4">
                <SkeletonLoader className="h-4 w-20 rounded-full" />
                <SkeletonLoader className="h-4 w-20 rounded-full" />
             </div>
             <SkeletonLoader className="h-8 w-full rounded-lg" />
             <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                     <SkeletonLoader className="w-8 h-8 rounded-full" />
                     <SkeletonLoader className="h-4 w-24 rounded-full" />
                 </div>
                 <SkeletonLoader className="h-5 w-5 rounded-full" />
             </div>
        </div>
    </div>
);

export default SkeletonLoader;
