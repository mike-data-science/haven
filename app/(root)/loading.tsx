import { Navbar } from "@/components/front/Navbar";
import { Footer } from "@/components/front/Footer";

export default function Loading() {
  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-screen">
      <Navbar />

      {/* Hero Section Skeleton */}
      <section className="relative z-[100] w-full flex flex-col items-center justify-center text-center pt-24 md:pt-32 pb-12 md:pb-16 bg-[#FAFAF8]">
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center mt-0 pointer-events-none opacity-80">
          <h1 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.5px] mb-5 drop-shadow-sm text-[#1A1A18] md:whitespace-nowrap">
            Find your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1E65FF] to-[#4388FF]">Haven.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#4A5568] max-w-2xl leading-[1.6] mb-6 font-medium md:whitespace-nowrap">
            Browse curated houses, condos, and apartments from agents who actually answer the phone.
          </p>

          {/* Classic Layout Single Pill Search Skeleton */}
          <div className="flex flex-col bg-white/95 backdrop-blur-xl p-1.5 rounded-[14px] lg:rounded-[9px] shadow-[0_40px_100px_-10px_rgba(11,61,145,0.3)] border border-white/80 w-full relative z-20">
            <div className="grid grid-cols-2 lg:flex lg:flex-row w-full items-stretch animate-pulse">
              <div className="flex-[0.8] px-1.5 sm:px-3 py-2 flex items-center border-b border-r lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-5 bg-slate-100 rounded"></div>
              </div>
              <div className="flex-[0.8] px-1.5 sm:px-3 py-2 flex items-center border-b lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-5 bg-slate-100 rounded"></div>
              </div>
              <div className="flex-[0.8] px-1.5 sm:px-3 py-2 flex items-center border-b border-r lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-5 bg-slate-100 rounded"></div>
              </div>
              <div className="flex-[0.8] px-1.5 sm:px-3 py-2 flex items-center border-b lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-5 bg-slate-100 rounded"></div>
              </div>
              <div className="col-span-2 lg:col-span-1 flex-[1.4] px-3 py-2 flex items-center border-b lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-5 bg-slate-100 rounded"></div>
              </div>
              <div className="col-span-2 lg:col-span-1 flex justify-center mt-2 lg:mt-0 p-1.5 lg:p-0">
                <div className="w-full lg:w-23 bg-[#1E65FF]/20 h-10 lg:h-full lg:ml-1.5 rounded-[9px] lg:rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types Skeleton */}
      <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-10 pb-6 md:pb-8 relative z-20 -mt-8 overflow-hidden">
        <div className="flex gap-5 md:gap-6 overflow-x-hidden pb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-none w-[320px] md:w-[360px] h-[200px] md:h-[240px] bg-white rounded-[24px] md:rounded-[32px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-[#E8E5DF]/60 animate-pulse flex flex-col justify-between">
              <div className="h-6 w-1/2 bg-slate-100 rounded"></div>
              <div className="mt-auto h-12 w-16 bg-slate-100 rounded"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Properties Skeleton */}
      <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="font-serif text-[clamp(28px,4vw,36px)] font-bold text-[#1A1A18] leading-[1.1] tracking-[-1px] mb-3">
              Popular Properties
            </h2>
            <p className="font-sans text-base text-[#6B7280]">
              Explore the most sought-after homes in Chișinău right now.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col bg-white rounded-[20px] overflow-hidden border border-[#E8E5DF] shadow-sm animate-pulse">
              <div className="relative aspect-[4/3] w-full bg-slate-200"></div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="h-6 w-3/4 bg-slate-200 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-slate-100 rounded mb-5"></div>
                <div className="flex gap-4 mt-auto pt-4 border-t border-[#E8E5DF]">
                  <div className="h-5 w-12 bg-slate-100 rounded"></div>
                  <div className="h-5 w-12 bg-slate-100 rounded"></div>
                  <div className="h-5 w-12 bg-slate-100 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AdvancedSearchPromo Skeleton */}
      <section className="w-full bg-gradient-to-br from-[#0B3D91] via-[#15469e] to-[#0A2E6E] text-white py-16 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 my-8 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center animate-pulse">
          <div className="h-8 sm:h-12 w-3/4 max-w-2xl bg-white/20 rounded-xl mb-4"></div>
          <div className="h-5 w-1/2 max-w-xl bg-white/10 rounded-lg mb-10"></div>
          <div className="w-full h-[280px] sm:h-[380px] md:h-[480px] lg:h-[560px] rounded-[20px] bg-white/10 border border-white/20"></div>
        </div>
      </section>

      {/* Features Skeleton */}
      <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-white">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-pulse">
          <div className="h-10 w-2/3 mx-auto bg-slate-200 rounded-xl mb-4"></div>
          <div className="h-6 w-3/4 mx-auto bg-slate-100 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-[32px] p-8 md:p-10 border border-slate-100 flex flex-col animate-pulse">
              <div className="w-16 h-16 rounded-2xl bg-slate-200 mb-8"></div>
              <div className="h-6 w-3/4 bg-slate-200 rounded mb-4"></div>
              <div className="h-4 w-full bg-slate-100 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-slate-100 rounded"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Agents Skeleton */}
      <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20 bg-[#FAFAF8]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="font-serif text-[clamp(28px,4vw,36px)] font-bold text-[#1A1A18] leading-[1.1] tracking-[-1px] mb-3">
              Meet our Real Estate Agents
            </h2>
            <p className="font-sans text-base text-[#6B7280] max-w-xl">
              Our experts in Chișinău are ready to help you find your dream home or sell your property at the best price.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="group relative bg-white rounded-[20px] overflow-hidden border border-[#E8E5DF] shadow-sm flex flex-col animate-pulse"
            >
              <div className="relative w-full h-72 bg-slate-200"></div>
              <div className="p-5 flex flex-col gap-3">
                <div className="h-5 w-2/3 bg-slate-200 rounded"></div>
                <div className="h-4 w-1/3 bg-slate-100 rounded"></div>
                <div className="h-11 w-full bg-slate-100 rounded-xl mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
