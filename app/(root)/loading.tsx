import { Navbar } from "@/components/front/Navbar";
import { Footer } from "@/components/front/Footer";

export default function Loading() {
  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-screen">
      <Navbar />
      
      <section className="relative z-30 w-full min-h-[281px] h-auto flex flex-col items-center justify-center text-center px-[11px] pt-[62px] pb-[27px] bg-gradient-to-b from-[#EAF2FF] from-40% to-[#FAFAF8]">
        <div className="relative z-10 w-full max-w-[675px] flex flex-col items-center mt-[0px] pointer-events-none opacity-80">
          <h1 className="font-serif text-[clamp(48px,7vw,84px)] font-bold text-[#1A1A18] leading-[1.05] tracking-[-1px] mb-[14px] drop-shadow-sm md:whitespace-nowrap">
            Find your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0B3D91] to-[#4388FF]">Haven.</span>
          </h1>
          <p className="font-sans text-[11px] text-[#4A5568] max-w-[506px] leading-[1.6] mb-[18px] font-medium md:whitespace-nowrap">
            Browse curated houses, condos, and apartments from agents who actually answer the phone.
          </p>

          <div className="flex flex-col bg-white p-[3px].5 rounded-[11px] lg:rounded-full shadow-2xl border border-[#E8E5DF] w-full max-w-[704px] relative z-20">
            <div className="grid grid-cols-2 lg:flex lg:flex-row w-full items-stretch animate-pulse">
              <div className="flex-[0.8] px-[3px].5 sm:px-[9px] py-[7px] flex items-center border-b border-r lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-[14px] bg-slate-100 rounded"></div>
              </div>
              <div className="flex-[0.8] px-[3px].5 sm:px-[9px] py-[7px] flex items-center border-b lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-[14px] bg-slate-100 rounded"></div>
              </div>
              <div className="flex-[0.8] px-[3px].5 sm:px-[9px] py-[7px] flex items-center border-b border-r lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-[14px] bg-slate-100 rounded"></div>
              </div>
              <div className="flex-[0.8] px-[3px].5 sm:px-[9px] py-[7px] flex items-center border-b lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-[14px] bg-slate-100 rounded"></div>
              </div>
              <div className="col-span-2 lg:col-span-1 flex-[1.4] px-[9px] py-[7px] flex items-center border-b lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-[14px] bg-slate-100 rounded"></div>
              </div>
              <div className="col-span-2 lg:col-span-1 flex justify-center mt-[7px] lg:mt-[0px] p-[3px].5 lg:p-[0px]">
                <div className="w-full lg:w-[68px] bg-slate-200 h-[29px] lg:h-full lg:ml-[3px].5 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[11px] pt-[27px] pb-[54px] bg-[#FAFAF8] w-full max-w-[788px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-[27px] gap-[14px]">
          <div>
            <h2 className="font-serif text-[24px] font-bold text-[#1A1A18] leading-[1.1] tracking-[-1px] mb-[9px]">
              Popular Properties
            </h2>
            <p className="font-sans text-[11px] text-[#6B7280]">
              Explore the most sought-after homes in Chișinău right now.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col bg-white rounded-3xl overflow-hidden border border-[#E8E5DF] shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="relative aspect-[4/3] w-full bg-slate-100 animate-pulse"></div>
              <div className="p-[14px] flex flex-col flex-grow">
                <div className="h-[14px] w-[7px]/4 bg-slate-200 rounded animate-pulse mb-[7px]"></div>
                <div className="h-[9px] w-[2px]/2 bg-slate-100 rounded animate-pulse mb-[14px]"></div>
                <div className="flex gap-[3px].5 mt-auto pt-[11px] border-t border-[#E8E5DF]">
                  <div className="h-[18px] w-9 bg-slate-100 rounded-xl animate-pulse"></div>
                  <div className="h-[18px] w-9 bg-slate-100 rounded-xl animate-pulse"></div>
                  <div className="h-[18px] w-9 bg-slate-100 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
