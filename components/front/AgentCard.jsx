"use client";

import React, { useState } from 'react';

export default function AgentCard({ agent: a }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div 
      className="relative w-full max-w-[280px] mx-auto aspect-[3/4] sm:w-56 sm:h-72 rounded-3xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      onClick={() => setIsActive(!isActive)}
    >
      {a.image ? (
        <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      ) : (
        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-serif text-4xl">
          {a.name?.charAt(0) || "A"}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="absolute bottom-4 left-0 w-full flex flex-col items-center z-10">
        <h3 className={`font-serif text-xl font-bold text-white mb-1 drop-shadow-md transition-transform duration-300 ${isActive ? '-translate-y-10' : 'group-hover:-translate-y-10'}`}>{a.name}</h3>
        
        {/* Contact Icons - Reveal on Hover or Tap */}
        <div className={`flex items-center gap-3 transition-all duration-300 absolute bottom-0 left-1/2 -translate-x-1/2 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
          {/* Viber */}
          <a href={`viber://chat?number=${a.phone || ''}`} onClick={(e) => e.stopPropagation()} className="w-9 h-9 rounded-full bg-[#7360F2]/10 flex items-center justify-center text-[#7360F2] hover:bg-[#7360F2] hover:text-white transition-colors" title="Viber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
          
          {/* Telegram */}
          <a href={`https://t.me/${a.telegram || 'haven_agent'}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-9 h-9 rounded-full bg-[#2AABEE]/10 flex items-center justify-center text-[#2AABEE] hover:bg-[#2AABEE] hover:text-white transition-colors" title="Telegram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
          </a>
          
          {/* WhatsApp */}
          <a href={`https://wa.me/${a.phone || ''}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors" title="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2C6.502 2 2.023 6.479 2.023 11.989c0 1.761.464 3.481 1.346 5l-1.41 5.148 5.267-1.382c1.46.804 3.11 1.228 4.787 1.228h.004c5.51 0 9.989-4.479 9.989-9.989C22.006 6.479 17.522 2 12.012 2zm5.412 14.391c-.227.643-1.325 1.233-1.815 1.353-.453.111-1.041.196-3.239-.714-2.817-1.161-4.606-4.041-4.743-4.223-.137-.183-1.134-1.509-1.134-2.879 0-1.37.712-2.046.963-2.316.251-.271.55-.339.734-.339.183 0 .367.004.527.012.164.008.384-.061.6.46.229.551.782 1.908.851 2.046.069.138.115.298.023.481-.092.183-.138.298-.275.459-.138.161-.289.344-.413.481-.137.151-.286.315-.126.591.161.275.717 1.183 1.543 1.92 1.068.951 1.961 1.246 2.236 1.383.275.138.436.115.596-.069.16-.183.687-.798.871-1.073.183-.275.367-.229.619-.138.252.092 1.594.752 1.869.889.275.138.459.206.527.321.069.115.069.664-.158 1.307z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
