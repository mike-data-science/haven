export default function Loading() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 bg-slate-200 rounded-lg"></div>
          <div className="h-4 w-64 bg-slate-100 rounded"></div>
        </div>
        <div className="h-10 w-32 bg-slate-200 rounded-xl"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-slate-100 rounded"></div>
              <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
            </div>
            <div className="h-7 w-24 bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Main Content Card Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col gap-4 mt-2">
        <div className="h-6 w-40 bg-slate-200 rounded mb-2"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
                <div className="flex flex-col gap-1.5">
                  <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  <div className="h-3 w-20 bg-slate-100 rounded"></div>
                </div>
              </div>
              <div className="h-6 w-20 bg-slate-100 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
