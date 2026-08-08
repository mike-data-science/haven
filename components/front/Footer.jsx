"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ContactAgentModal, getAgentMessengerLinks } from './ContactAgentModal';
import { useFontTheme } from '../shared/FontProvider';

export function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultAgent = {
    name: "Haven Support Team",
    role: "Senior Real Estate Advisors",
    phone: "+373 68 000 000"
  };

  const links = getAgentMessengerLinks(defaultAgent);

  return (
    <footer className="w-full relative overflow-hidden mt-20 font-sans bg-[#0B3D91] text-white">

      {/* Main Footer Content */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Column 1: Brand Info (2 spans) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link href="/" className="font-serif text-2xl font-bold flex items-center no-underline group mb-4 text-white">
                <span><span className="text-blue-300">Haven</span> Realty</span>
              </Link>
              <p className="font-sans text-sm leading-relaxed max-w-sm mb-6 text-blue-100/80">
                Moldova's premier real estate platform. We curate verified residential and commercial properties with transparent pricing and dedicated agents who actually answer your call.
              </p>
            </div>

            <div className="flex flex-col gap-2 text-xs sm:text-sm font-medium text-blue-100">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>bd. Ștefan cel Mare și Sfânt 105, Chișinău, Moldova</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>{links.displayPhone} (24/7 Agent Support)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>contact@havenrealty.md</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-base font-bold uppercase tracking-wider mb-2 text-white">
              Explore
            </h4>
            <Link href="/listings?transaction=buy" className="font-sans text-sm transition-colors no-underline text-blue-100/80 hover:text-white">
              Buy a Property
            </Link>
            <Link href="/listings?transaction=rent" className="font-sans text-sm transition-colors no-underline text-blue-100/80 hover:text-white">
              Rent an Apartment
            </Link>
            <Link href="/listings?transaction=sell" className="font-sans text-sm transition-colors no-underline text-blue-100/80 hover:text-white">
              Sell Your Home
            </Link>
            <Link href="/agents" className="font-sans text-sm transition-colors no-underline text-blue-100/80 hover:text-white">
              Meet Our Agents
            </Link>
            <Link href="/about" className="font-sans text-sm transition-colors no-underline text-blue-100/80 hover:text-white">
              About Haven
            </Link>
            <Link href="/contact" className="font-sans text-sm transition-colors no-underline text-blue-100/80 hover:text-white">
              Contact Office
            </Link>
          </div>

          {/* Column 3: Chișinău Sectors */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-base font-bold uppercase tracking-wider mb-2 text-white">
              Chișinău Sectors
            </h4>
            <Link href="/listings?region=centru" className="font-sans text-sm transition-colors no-underline text-blue-100/80 hover:text-white">
              Centru
            </Link>
            <Link href="/listings?region=botanica" className="font-sans text-sm transition-colors no-underline text-blue-100/80 hover:text-white">
              Botanica
            </Link>
            <Link href="/listings?region=buiucani" className="font-sans text-sm transition-colors no-underline text-blue-100/80 hover:text-white">
              Buiucani
            </Link>
            <Link href="/listings?region=ciocana" className="font-sans text-sm transition-colors no-underline text-blue-100/80 hover:text-white">
              Ciocana
            </Link>
            <Link href="/listings?region=riscani" className="font-sans text-sm transition-colors no-underline text-blue-100/80 hover:text-white">
              Rîșcani
            </Link>
            <Link href="/listings?region=telecentru" className="font-sans text-sm transition-colors no-underline text-blue-100/80 hover:text-white">
              Telecentru
            </Link>
          </div>

          {/* Column 4: Contact Agents Box */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-base font-bold uppercase tracking-wider mb-2 text-white">
              Contact Agent
            </h4>
            <p className="font-sans text-xs mb-2 leading-relaxed text-blue-100/80">
              Prefer speaking with an agent directly? Choose a platform below:
            </p>

            {/* App Icon Buttons Row */}
            <div className="flex items-center gap-3">
              <a
                href={links.viber}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on Viber"
                aria-label="Chat on Viber"
                className="flex-1 flex items-center justify-center h-12 rounded-xl bg-white hover:bg-[#7360F2] text-slate-700 hover:text-white border border-slate-200/80 hover:border-[#7360F2] transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-[#7360F2]/30 hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M19.333 4.667C17.74 3.073 15.626 2 12.875 2c-5.74 0-10.4 4.542-10.4 10.146 0 2.292.833 4.396 2.188 6.042l-1.458 3.5c-.104.25-.042.541.145.729.146.146.354.208.563.167l3.75-.938c1.583.917 3.396 1.458 5.208 1.458 5.74 0 10.4-4.542 10.4-10.146 0-2.708-1.146-5.25-3.938-8.291zM17.5 16.5c-.313.792-1.75 1.542-2.52 1.583-.584.042-1.126-.146-2.584-.75-2.083-.854-3.833-2.458-4.916-4.354-.771-1.354-1.042-2.313-.938-3.021.083-.875.875-2.083 1.708-2.417.313-.125.667-.083.917.146.458.417 1.042 1.563 1.188 1.958.125.333.063.708-.167.979l-.542.667c.604 1.167 1.542 2.104 2.708 2.708l.667-.542c.271-.229.646-.292.979-.167.396.146 1.542.729 1.958 1.188.229.25.271.604.146.917z" />
                </svg>
              </a>

              <a
                href={links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on Telegram"
                aria-label="Chat on Telegram"
                className="flex-1 flex items-center justify-center h-12 rounded-xl bg-white hover:bg-[#0088CC] text-slate-700 hover:text-white border border-slate-200/80 hover:border-[#0088CC] transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-[#0088CC]/30 hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </a>

              <a
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
                className="flex-1 flex items-center justify-center h-12 rounded-xl bg-white hover:bg-[#25D366] text-slate-700 hover:text-white border border-slate-200/80 hover:border-[#25D366] transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.655 1.436 5.168L2.167 21.833l4.802-1.249A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-white/20 text-blue-200">
          <p className="font-medium m-0">
            &copy; {new Date().getFullYear()} Haven Realty SRL. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors no-underline hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors no-underline hover:text-white">
              Terms of Service
            </Link>
            <Link href="/cookies" className="transition-colors no-underline hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      <ContactAgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        agent={defaultAgent}
      />
    </footer>
  );
}
