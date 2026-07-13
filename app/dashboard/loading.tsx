export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-[9px]">
        <div className="h-[23px] w-[23px] animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
        <p className="text-xs font-medium text-slate-500">Loading dashboard...</p>
      </div>
    </div>
  );
}
