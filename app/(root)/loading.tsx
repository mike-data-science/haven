import { Navbar } from "@/components/front/Navbar";
import { Footer } from "@/components/front/Footer";

export default function Loading() {
  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-screen">
      <Navbar />
      
      <section className="relative z-30 w-full min-h-[700px] h-auto flex flex-col items-center justify-center text-center px-5 pt-[140px] pb-16 bg-gradient-to-b from-[#EAF2FF] from-40% to-[#FAFAF8]">
        <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center mt-[40px] pointer-events-none opacity-80">
          <p className="font-sans text-[12px] font-bold uppercase tracking-[1.5px] text-[#2B7FFF] mb-4 bg-white/60 px-3 py-1 rounded-full border border-[#2B7FFF]/20 backdrop-blur-sm">
            142 new listings this week
          </p>
          <h1 className="font-serif text-[clamp(42px,5vw,64px)] font-bold text-[#1A1A18] leading-[1.1] tracking-[-1.5px] mb-6">
            Find the home that
            <br />
            finds you.
          </h1>
          <p className="font-sans text-[18px] text-[#6B7280] max-w-[500px] leading-[1.5] mb-10">
            Browse curated houses, condos, and apartments from agents who
            actually answer the phone.
          </p>

          <div className="flex flex-col bg-white p-2 rounded-[20px] lg:rounded-full shadow-2xl border border-[#E8E5DF] w-full max-w-[1250px] relative z-20">
            <div className="grid grid-cols-2 lg:flex lg:flex-row w-full items-stretch animate-pulse">
              <div className="flex-[0.8] px-2 sm:px-4 py-3 flex items-center border-b border-r lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-6 bg-slate-100 rounded"></div>
              </div>
              <div className="flex-[0.8] px-2 sm:px-4 py-3 flex items-center border-b lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-6 bg-slate-100 rounded"></div>
              </div>
              <div className="flex-[0.8] px-2 sm:px-4 py-3 flex items-center border-b border-r lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-6 bg-slate-100 rounded"></div>
              </div>
              <div className="flex-[0.8] px-2 sm:px-4 py-3 flex items-center border-b lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-6 bg-slate-100 rounded"></div>
              </div>
              <div className="col-span-2 lg:col-span-1 flex-[1.4] px-4 py-3 flex items-center border-b lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-6 bg-slate-100 rounded"></div>
              </div>
              <div className="col-span-2 lg:col-span-1 flex justify-center mt-3 lg:mt-0 p-2 lg:p-0">
                <div className="w-full lg:w-[120px] bg-slate-200 h-[52px] lg:h-full lg:ml-2 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 bg-[#FAFAF8] w-full max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-serif text-[42px] font-bold text-[#1A1A18] leading-[1.1] tracking-[-1px] mb-4">
              Popular Properties
            </h2>
            <p className="font-sans text-[18px] text-[#6B7280]">
              Explore the most sought-after homes in Chișinău right now.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col bg-white rounded-3xl overflow-hidden border border-[#E8E5DF] shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="relative aspect-[4/3] w-full bg-slate-100 animate-pulse"></div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse mb-3"></div>
                <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse mb-6"></div>
                <div className="flex gap-2 mt-auto pt-5 border-t border-[#E8E5DF]">
                  <div className="h-8 w-16 bg-slate-100 rounded-xl animate-pulse"></div>
                  <div className="h-8 w-16 bg-slate-100 rounded-xl animate-pulse"></div>
                  <div className="h-8 w-16 bg-slate-100 rounded-xl animate-pulse"></div>
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
