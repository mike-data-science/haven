import { Navbar } from "@/components/front/Navbar";

export default function Loading() {
  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-screen">
      <Navbar />

      <main className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-5 pt-24 animate-pulse">
        {/* Gallery Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 mb-8">
          <div className="w-full h-64 md:h-96 bg-slate-200 rounded-[14px]"></div>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <div className="w-full h-32 md:h-46 bg-slate-200 rounded-[14px]"></div>
            <div className="w-full h-32 md:h-46 bg-slate-200 rounded-[14px]"></div>
            <div className="w-full h-32 md:h-46 bg-slate-200 rounded-[14px]"></div>
            <div className="w-full h-32 md:h-46 bg-slate-200 rounded-[14px]"></div>
          </div>
        </div>

        {/* Title and Price Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-[#E8E5DF] gap-4">
          <div className="flex flex-col gap-2 w-full max-w-xl">
            <div className="h-8 w-3/4 bg-slate-200 rounded-lg"></div>
            <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
          </div>
          <div className="h-10 w-44 bg-slate-200 rounded-xl"></div>
        </div>

        {/* Features & Description Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 py-8">
          <div className="flex flex-col gap-6">
            <div className="h-6 w-48 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-100 rounded"></div>
              <div className="h-4 w-11/12 bg-slate-100 rounded"></div>
              <div className="h-4 w-4/5 bg-slate-100 rounded"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-white border border-[#E8E5DF] rounded-[14px] p-4 flex flex-col justify-center gap-2">
                  <div className="h-3 w-12 bg-slate-100 rounded"></div>
                  <div className="h-4 w-20 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Agent Box Skeleton */}
          <div className="bg-white border border-[#E8E5DF] rounded-[24px] p-6 shadow-sm flex flex-col gap-4 h-fit">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-5 w-32 bg-slate-200 rounded"></div>
                <div className="h-4 w-24 bg-slate-100 rounded"></div>
              </div>
            </div>
            <div className="h-12 w-full bg-slate-200 rounded-xl mt-4"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
