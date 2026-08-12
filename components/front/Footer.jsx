"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
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
    <footer className="w-full relative overflow-hidden mt-10 md:mt-20 font-sans bg-[#1E65FF] text-white">

      {/* Main Footer Content */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-10 lg:gap-8">
          
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
                <MapPin size={16} className="text-blue-400 shrink-0" />
                <span>bd. Ștefan cel Mare și Sfânt 105, Chișinău, Moldova</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-blue-400 shrink-0" />
                <span>{links.displayPhone} (24/7 Agent Support)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-blue-400 shrink-0" />
                <span>contact@havenrealty.md</span>
              </div>
            </div>
          </div>

          {/* Columns 2 & 3 Grouped for mobile 2-column layout */}
          <div className="grid grid-cols-2 gap-4 md:col-span-2 lg:contents">
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
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                  <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.693 6.698.623 9.82c-.06 3.11-.13 8.95 5.5 10.541v2.42s-.038.97.602 1.17c.79.25 1.24-.499 1.99-1.299l1.4-1.58c3.85.32 6.8-.419 7.14-.529.78-.25 5.181-.811 5.901-6.652.74-6.031-.36-9.831-2.34-11.551l-.01-.002c-.6-.55-3-2.3-8.37-2.32 0 0-.396-.025-1.038-.016zm.427 4.297a.299.299 0 0 0-.3.299.3.3 0 0 0 .3.3 5.631 5.631 0 0 1 4.03 1.59c1.09 1.06 1.621 2.48 1.641 4.34a.3.3 0 0 0 .3.3v-.009a.3.3 0 0 0 .3-.3 6.451 6.451 0 0 0-1.81-4.76c-1.19-1.16-2.692-1.76-4.462-1.76zm-3.954.69a.955.955 0 0 0-.615.12h-.012c-.41.24-.788.54-1.148.94-.27.32-.421.639-.461.949a1.24 1.24 0 0 0 .05.541l.02.01a13.722 13.722 0 0 0 1.2 2.6 15.383 15.383 0 0 0 2.32 3.171l.03.04.04.03.03.03.03.03a15.603 15.603 0 0 0 3.18 2.33c1.32.72 2.122 1.06 2.602 1.2v.01c.14.04.268.06.398.06a1.84 1.84 0 0 0 1.102-.472c.39-.35.7-.738.93-1.148v-.01c.23-.43.15-.841-.18-1.121a13.632 13.632 0 0 0-2.15-1.54c-.51-.28-1.03-.11-1.24.17l-.45.569c-.23.28-.65.24-.65.24l-.012.01c-3.12-.8-3.95-3.959-3.95-3.959s-.04-.43.25-.65l.56-.45c.27-.22.46-.74.17-1.25a13.522 13.522 0 0 0-1.54-2.15.843.843 0 0 0-.504-.3zm4.473.89a.3.3 0 0 0 .002.6 3.78 3.78 0 0 1 2.65 1.15 3.5 3.5 0 0 1 .9 2.57.3.3 0 0 0 .3.299l.01.012a.3.3 0 0 0 .3-.301c.03-1.19-.34-2.19-1.07-2.99-.73-.8-1.75-1.25-3.05-1.34a.3.3 0 0 0-.042 0zm.49 1.619a.305.305 0 0 0-.018.611c.99.05 1.47.55 1.53 1.58a.3.3 0 0 0 .3.29h.01a.3.3 0 0 0 .29-.32c-.07-1.34-.8-2.091-2.1-2.161a.305.305 0 0 0-.012 0z"/>
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
                  <path d="M12.012 2C6.502 2 2.023 6.479 2.023 11.989c0 1.761.464 3.481 1.346 5l-1.41 5.148 5.267-1.382c1.46.804 3.11 1.228 4.787 1.228h.004c5.51 0 9.989-4.479 9.989-9.989C22.006 6.479 17.522 2 12.012 2zm5.412 14.391c-.227.643-1.325 1.233-1.815 1.353-.453.111-1.041.196-3.239-.714-2.817-1.161-4.606-4.041-4.743-4.223-.137-.183-1.134-1.509-1.134-2.879 0-1.37.712-2.046.963-2.316.251-.271.55-.339.734-.339.183 0 .367.004.527.012.164.008.384-.061.6.46.229.551.782 1.908.851 2.046.069.138.115.298.023.481-.092.183-.138.298-.275.459-.138.161-.289.344-.413.481-.137.151-.286.315-.126.591.161.275.717 1.183 1.543 1.92 1.068.951 1.961 1.246 2.236 1.383.275.138.436.115.596-.069.16-.183.687-.798.871-1.073.183-.275.367-.229.619-.138.252.092 1.594.752 1.869.889.275.138.459.206.527.321.069.115.069.664-.158 1.307z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-white/20 text-blue-200">
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
