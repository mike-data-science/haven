import { Navbar } from "@/components/front/Navbar";

export default function Loading() {
  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-[133.33vh] flex flex-col h-[133.33vh] overflow-hidden">
      <div className="shrink-0 h-[34px] md:h-[68px]">
        <Navbar />
      </div>
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-[9px] py-[7px] bg-white border-b border-line shrink-0">
        <span className="font-serif font-bold text-transparent bg-slate-200 rounded animate-pulse">Loading...</span>
        <button className="flex items-center gap-[3px].5 border border-line rounded-full px-[9px] py-[2px].5 text-[8px] font-bold shadow-sm opacity-50 cursor-not-allowed">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Filters
        </button>
      </div>

      <main className="flex-1 flex overflow-hidden w-full max-w-[900px] mx-auto relative">
        
        {/* Desktop Sidebar Skeleton */}
        <aside className="w-[158px] shrink-0 border-r border-line bg-white flex-col h-full overflow-y-auto hidden md:flex lg:flex">
          <div className="p-[14px] border-b border-line flex justify-between items-center shrink-0">
            <h2 className="font-serif text-[13px] font-semibold text-ink">Filter</h2>
            <div className="w-[20px] h-[20px] bg-slate-200 rounded-full animate-pulse"></div>
          </div>
          <div className="p-[14px] flex-grow flex flex-col gap-[18px] opacity-60 pointer-events-none">
            <div className="flex flex-col gap-[7px]">
              <label className="text-[7px] font-bold text-slate uppercase tracking-[1px]">Location</label>
              <select className="w-full border border-line rounded-[5px] px-[7px] py-[3px].5.5 text-[8px] bg-white outline-none focus:border-navy text-ink cursor-pointer">
                <option value="all">All Sectors</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-[7px]">
              <label className="text-[7px] font-bold text-slate uppercase tracking-[1px]">Type of place</label>
              {["All", "Apartment", "House", "Land", "Commercial"].map(t => (
                <label key={t} className="flex items-center gap-[3px].5.5 text-[8px] text-ink cursor-pointer">
                  <input type="checkbox" readOnly checked={t === "All"} className="w-[11px] h-[11px] accent-navy rounded-[2px]" /> {t}
                </label>
              ))}
            </div>

            <div className="flex flex-col gap-[7px]">
              <label className="text-[7px] font-bold text-slate uppercase tracking-[1px]">Rooms</label>
              <select className="w-full border border-line rounded-[5px] px-[7px] py-[3px].5.5 text-[8px] bg-white outline-none focus:border-navy text-ink cursor-pointer">
                <option value="all">Any</option>
              </select>
            </div>

            <div className="flex flex-col gap-[7px]">
              <label className="text-[7px] font-bold text-slate uppercase tracking-[1px]">Price Range (€)</label>
              <div className="grid grid-cols-2 gap-[7px]">
                <input placeholder="Min" type="number" readOnly className="w-full border border-line rounded-[5px] px-[7px] py-[3px].5 text-[8px] outline-none text-ink placeholder:text-slate/60 bg-slate-50" />
                <input placeholder="Max" type="number" readOnly className="w-full border border-line rounded-[5px] px-[7px] py-[3px].5 text-[8px] outline-none text-ink placeholder:text-slate/60 bg-slate-50" />
              </div>
            </div>

            <div className="flex flex-col gap-[7px]">
              <label className="text-[7px] font-bold text-slate uppercase tracking-[1px]">Size (sqft)</label>
              <div className="grid grid-cols-2 gap-[7px]">
                <input placeholder="Min" type="number" readOnly className="w-full border border-line rounded-[5px] px-[7px] py-[3px].5 text-[8px] outline-none text-ink placeholder:text-slate/60 bg-slate-50" />
                <input placeholder="Max" type="number" readOnly className="w-full border border-line rounded-[5px] px-[7px] py-[3px].5 text-[8px] outline-none text-ink placeholder:text-slate/60 bg-slate-50" />
              </div>
            </div>
          </div>
        </aside>

        {/* Center Column + Right Map */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          
          {/* Listings List/Grid Area */}
          <div className="flex flex-col bg-[#FAFAF8] md:border-r border-[#E8E5DF] relative z-10 w-full order-2 md:order-1 h-[60%] md:h-full md:w-[60%] lg:w-[65%]">
            
            {/* Desktop Top Bar */}
            <div className="hidden md:flex items-center justify-between gap-[9px] px-[14px] py-[9px] border-b border-[#E8E5DF] bg-white shrink-0">
              <div className="h-[14px] w-[72px] bg-slate-200 rounded animate-pulse"></div>
              <div className="h-[14px] w-[54px] bg-slate-200 rounded animate-pulse"></div>
            </div>

            {/* Properties Loading Spinner */}
            <div className="flex-1 flex items-center justify-center bg-[#FAFAF8]">
              <div className="flex flex-col items-center gap-[9px]">
                <div className="h-[27px] w-[27px] animate-spin rounded-full border-4 border-[#E8E5DF] border-t-[#0B3D91]" />
                <p className="font-sans text-[#6B7280]">Loading properties...</p>
              </div>
            </div>
          </div>
          
          {/* Right Map Skeleton */}
          <div className="w-full order-1 md:order-2 h-[40%] md:h-full md:w-[40%] lg:w-[35%] bg-slate-100 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-[9px]">
                <div className="h-[27px] w-[27px] animate-spin rounded-full border-4 border-slate-300 border-t-slate-500" />
                <p className="font-sans text-slate-500 font-medium text-xs">Loading map...</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
