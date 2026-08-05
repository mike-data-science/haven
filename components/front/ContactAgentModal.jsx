"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export function getAgentMessengerLinks(agent = {}, propertyTitle = "") {
  const rawPhone = agent.phone || "+373 68 000 000";
  // Remove non-digit characters for direct URL links
  const digits = rawPhone.replace(/\D/g, "") || "37368000000";
  const agentName = agent.name || "Haven Agent";
  
  const textMessage = propertyTitle 
    ? `Hello ${agentName}, I am interested in "${propertyTitle}" on Haven Realty. Could you please provide more details?`
    : `Hello ${agentName}, I am interested in Haven Realty properties. Could you please assist me?`;

  const encodedText = encodeURIComponent(textMessage);

  return {
    whatsapp: `https://wa.me/${digits}?text=${encodedText}`,
    telegram: `https://t.me/+${digits}`,
    viber: `https://viber.click/${digits}`,
    viberDeepLink: `viber://chat?number=%2B${digits}`,
    call: `tel:+${digits}`,
    displayPhone: rawPhone
  };
}

export function ContactAgentModal({ isOpen, onClose, agent, propertyTitle }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted || typeof document === 'undefined') return null;

  const links = getAgentMessengerLinks(agent, propertyTitle);

  const modalContent = (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.3)] border border-slate-100 p-6 sm:p-7 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0B3D91] via-[#2B7FFF] to-[#7360F2]" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          title="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Agent Profile Header */}
        <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100">
          <div className="relative shrink-0">
            {agent?.image ? (
              <img 
                src={agent.image} 
                alt={agent.name || "Agent"} 
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/20 shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0B3D91] to-[#2B7FFF] text-white flex items-center justify-center font-serif font-bold text-2xl shadow-md">
                {(agent?.name || "A").charAt(0)}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center" title="Online now">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A1A18] truncate">
                {agent?.name || "Haven Advisor"}
              </h3>
              <span className="bg-blue-50 text-[#0B3D91] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
                ★ Verified
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-500 font-medium truncate mt-0.5">
              {agent?.role || "Real Estate Specialist"}
            </p>
            <p className="font-sans text-xs font-semibold text-[#0B3D91] mt-1">
              {links.displayPhone}
            </p>
          </div>
        </div>


        {/* Instant Messaging Buttons */}
        <div className="flex flex-col gap-3">
          {/* WhatsApp Button */}
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full p-3.5 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#1A1A18] hover:text-white border border-[#25D366]/30 hover:border-[#25D366] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer no-underline"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.655 1.436 5.168L2.167 21.833l4.802-1.249A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="font-sans text-sm font-bold m-0 leading-tight">Chat on WhatsApp</p>
                <p className="font-sans text-xs opacity-75 m-0 leading-tight">Instant reply • Popular</p>
              </div>
            </div>
            <span className="font-sans text-sm font-bold group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>

          {/* Telegram Button */}
          <a
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full p-3.5 rounded-2xl bg-[#0088CC]/10 hover:bg-[#0088CC] text-[#1A1A18] hover:text-white border border-[#0088CC]/30 hover:border-[#0088CC] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer no-underline"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0088CC] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="font-sans text-sm font-bold m-0 leading-tight">Chat on Telegram</p>
                <p className="font-sans text-xs opacity-75 m-0 leading-tight">Fast & secure message</p>
              </div>
            </div>
            <span className="font-sans text-sm font-bold group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>

          {/* Viber Button */}
          <a
            href={links.viber}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full p-3.5 rounded-2xl bg-[#7360F2]/10 hover:bg-[#7360F2] text-[#1A1A18] hover:text-white border border-[#7360F2]/30 hover:border-[#7360F2] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer no-underline"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7360F2] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.333 4.667C17.74 3.073 15.626 2 12.875 2c-5.74 0-10.4 4.542-10.4 10.146 0 2.292.833 4.396 2.188 6.042l-1.458 3.5c-.104.25-.042.541.145.729.146.146.354.208.563.167l3.75-.938c1.583.917 3.396 1.458 5.208 1.458 5.74 0 10.4-4.542 10.4-10.146 0-2.708-1.146-5.25-3.938-8.291zM17.5 16.5c-.313.792-1.75 1.542-2.52 1.583-.584.042-1.126-.146-2.584-.75-2.083-.854-3.833-2.458-4.916-4.354-.771-1.354-1.042-2.313-.938-3.021.083-.875.875-2.083 1.708-2.417.313-.125.667-.083.917.146.458.417 1.042 1.563 1.188 1.958.125.333.063.708-.167.979l-.542.667c.604 1.167 1.542 2.104 2.708 2.708l.667-.542c.271-.229.646-.292.979-.167.396.146 1.542.729 1.958 1.188.229.25.271.604.146.917z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="font-sans text-sm font-bold m-0 leading-tight">Chat on Viber</p>
                <p className="font-sans text-xs opacity-75 m-0 leading-tight">Moldova favorite • Call or chat</p>
              </div>
            </div>
            <span className="font-sans text-sm font-bold group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>

          {/* Direct Phone Call */}
          <a
            href={links.call}
            className="group flex items-center justify-between w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-[#0B3D91] border border-slate-200 transition-colors cursor-pointer no-underline mt-1"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 group-hover:bg-[#0B3D91] group-hover:text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <span className="font-sans text-xs font-semibold">
                Direct phone call ({links.displayPhone})
              </span>
            </div>
            <span className="font-sans text-xs font-bold text-slate-400 group-hover:text-[#0B3D91]">
              Call →
            </span>
          </a>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export function ContactAgentButton({ agent, propertyTitle = "", className, children, showQuickIcons = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full" onClick={(e) => e.stopPropagation()}>
      <button 
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className={className || "w-full bg-[#0B3D91] hover:bg-[#1e58bd] text-white font-sans text-sm font-medium py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center"}
      >
        {children || "Contact Agent"}
      </button>

      <ContactAgentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        agent={agent} 
        propertyTitle={propertyTitle}
      />
    </div>
  );
}
