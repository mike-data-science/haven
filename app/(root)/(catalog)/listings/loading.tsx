import { Navbar } from "@/components/front/Navbar";

export default function Loading() {
  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-screen flex flex-col overflow-hidden">
      <div className="shrink-0">
        <Navbar />
      </div>
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#E8E5DF] shrink-0 mt-16">
        <span className="font-serif font-bold text-slate-400 animate-pulse">Loading properties...</span>
        <button className="flex items-center gap-1.5 border border-[#E8E5DF] rounded-full px-4 py-1.5 text-xs font-bold shadow-sm opacity-50 cursor-not-allowed">
          Filters
        </button>
      </div>

      <main className="flex-1 flex overflow-hidden w-full max-w-[1400px] mx-auto relative pt-16 md:pt-20">
        {/* Desktop Sidebar Skeleton */}
        <aside className="w-64 sm:w-72 shrink-0 border-r border-[#E8E5DF] bg-white flex-col h-full overflow-y-auto hidden md:flex">
          <div className="p-5 border-b border-[#E8E5DF] flex justify-between items-center shrink-0">
            <h2 className="font-serif text-lg font-semibold text-[#1A1A18]">Filter</h2>
            <div className="w-6 h-6 bg-slate-200 rounded-full animate-pulse"></div>
          </div>
          <div className="p-5 flex-grow flex flex-col gap-6 animate-pulse">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-20 bg-slate-200 rounded"></div>
              <div className="h-9 w-full bg-slate-100 rounded-lg"></div>
            </div>
            
            <div className="flex flex-col gap-2.5">
              <div className="h-3 w-24 bg-slate-200 rounded"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-200 rounded"></div>
                  <div className="h-3 w-20 bg-slate-100 rounded"></div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-3 w-16 bg-slate-200 rounded"></div>
              <div className="h-9 w-full bg-slate-100 rounded-lg"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-3 w-28 bg-slate-200 rounded"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-9 w-full bg-slate-100 rounded-lg"></div>
                <div className="h-9 w-full bg-slate-100 rounded-lg"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Column + Right Map */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {/* Listings List Area */}
          <div className="flex flex-col bg-[#FAFAF8] md:border-r border-[#E8E5DF] relative z-10 w-full order-2 md:order-1 h-[60%] md:h-full md:w-[60%] lg:w-[65%]">
            {/* Desktop Top Bar */}
            <div className="hidden md:flex items-center justify-between gap-4 px-6 py-4 border-b border-[#E8E5DF] bg-white shrink-0">
              <div className="h-5 w-48 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-8 w-36 bg-slate-100 rounded-lg animate-pulse"></div>
            </div>

            {/* Properties Loading Cards & Spinner */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col bg-white rounded-[20px] overflow-hidden border border-[#E8E5DF] shadow-sm animate-pulse">
                    <div className="relative aspect-[4/3] w-full bg-slate-200"></div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="h-5 w-3/4 bg-slate-200 rounded mb-2"></div>
                      <div className="h-4 w-1/2 bg-slate-100 rounded mb-4"></div>
                      <div className="flex gap-3 mt-auto pt-3 border-t border-[#E8E5DF]">
                        <div className="h-4 w-10 bg-slate-100 rounded"></div>
                        <div className="h-4 w-10 bg-slate-100 rounded"></div>
                        <div className="h-4 w-10 bg-slate-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Map Skeleton */}
          <div className="w-full order-1 md:order-2 h-[40%] md:h-full md:w-[40%] lg:w-[35%] bg-slate-100 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-[#0B3D91]" />
                <p className="font-sans text-slate-500 font-medium text-sm">Loading map...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
