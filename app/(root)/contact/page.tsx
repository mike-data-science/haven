import { ContactForm } from "@/components/front/HomePage";
import { Navbar } from "@/components/front/Navbar";
import { Footer } from "@/components/front/Footer";

export const metadata = {
  title: 'Contact Us - Haven',
  description: 'Get in touch with Haven. We are here to help you find your dream property.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="bg-[#FAFAF8] min-h-screen pt-24 md:pt-32">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 text-center mb-12">
        <h1 className="font-serif text-[clamp(40px,6vw,64px)] font-bold text-[#1A1A18] tracking-tight leading-[1.1] mb-6">
          Contact Us
        </h1>
        <p className="font-sans text-lg md:text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
          Have a question or need assistance? Our dedicated team is ready to help you navigate the real estate market.
        </p>
      </div>
      
      <ContactForm />
    </div>
    <Footer />
    </>
  );
}
