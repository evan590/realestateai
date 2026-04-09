export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-slate-700 rounded animate-pulse ${className}`} />;
}

export function PropertyCardSkeleton() {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-700" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-slate-700 rounded w-2/3" />
        <div className="h-4 bg-slate-700 rounded w-1/2" />
        <div className="h-4 bg-slate-700 rounded w-3/4" />
        <div className="flex gap-2">
          <div className="h-5 bg-slate-700 rounded-full w-16" />
          <div className="h-5 bg-slate-700 rounded-full w-16" />
        </div>
      </div>
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`h-4 bg-slate-700 rounded animate-pulse ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  );
}
