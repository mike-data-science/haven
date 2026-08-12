import { Features } from "@/components/front/HomePage";
import { Navbar } from "@/components/front/Navbar";
import { Footer } from "@/components/front/Footer";

export const metadata = {
  title: 'About Us - Haven',
  description: 'Learn more about Haven, the premium real estate platform.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="bg-[#FAFAF8] min-h-screen pt-24 md:pt-32">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 text-center mb-16">
        <h1 className="font-serif text-[clamp(40px,6vw,64px)] font-bold text-[#1A1A18] tracking-tight leading-[1.1] mb-6">
          About Haven
        </h1>
        <p className="font-sans text-lg md:text-xl text-[#6B7280] max-w-3xl mx-auto leading-relaxed">
          We are redefining the real estate experience by combining cutting-edge technology with unparalleled service, ensuring that finding your next property is seamless and transparent.
        </p>
      </div>
      
      {/* Reusing the Features component from the Fintaxy redesign */}
      <Features />
      
      <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24">
        <div className="w-full bg-white rounded-[40px] p-8 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
          <div className="flex-1">
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1A18] tracking-tight leading-[1.1] mb-6">
              Our Mission
            </h2>
            <p className="font-sans text-[#6B7280] text-base md:text-lg leading-relaxed mb-6">
              To empower individuals and businesses with the tools, insights, and expert guidance they need to navigate the real estate market confidently. We believe in transparency, innovation, and long-term relationships.
            </p>
            <ul className="flex flex-col gap-4 font-sans text-[#1A1A18] font-medium">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1E65FF]">✓</div>
                Client-First Approach
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1E65FF]">✓</div>
                Data-Driven Insights
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1E65FF]">✓</div>
                Premium Support
              </li>
            </ul>
          </div>
          <div className="flex-1 relative w-full h-[400px] bg-[#F0F4F8] rounded-[32px] overflow-hidden flex items-center justify-center">
            <span className="font-serif font-bold text-6xl text-slate-200">Haven</span>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
