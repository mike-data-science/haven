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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.01 2.01c-5.5 0-9.99 4.49-9.99 9.99 0 1.95.56 3.78 1.53 5.31l-1.5 5.49 5.62-1.47c1.47.88 3.19 1.39 5.01 1.39 5.5 0 9.99-4.49 9.99-9.99s-4.49-9.99-9.99-9.99h-.67zm-.03 1.67c4.61 0 8.35 3.74 8.35 8.35s-3.74 8.35-8.35 8.35c-1.49 0-2.88-.39-4.1-.1l-3.32.87.89-3.23a8.307 8.307 0 0 1-1.72-5.11c0-4.61 3.74-8.35 8.35-8.35h.06zm-3.8 2.82c-.17 0-.39.06-.59.28-.2.22-.76.74-.76 1.8 0 1.06.78 2.09.89 2.23.11.15 1.51 2.37 3.69 3.28 1.48.62 1.92.57 2.3.52.37-.05 1.21-.49 1.38-.97.17-.48.17-.89.12-.97-.05-.08-.18-.13-.39-.23-.21-.11-1.21-.6-1.4-.67-.18-.07-.32-.11-.45.09-.13.2-.54.67-.66.8-.11.14-.23.15-.44.05-.21-.11-.87-.32-1.65-1.02-.61-.55-1.02-1.23-1.14-1.44-.11-.22-.01-.33.1-.44.09-.09.21-.24.32-.36.11-.12.15-.2.22-.34.07-.14.03-.27-.02-.37-.05-.11-.45-1.09-.62-1.49-.16-.39-.32-.34-.44-.34h-.39z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
