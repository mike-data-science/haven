"use client";

import Link from 'next/link';
import { useState } from 'react';
import { IconBed, IconBath, IconArea } from './Icons';
import { formatPrice } from '../../lib/data';

function ImageCarousel({ images, alt }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  if (!images || images.length === 0) {
    return <div className="w-full h-full bg-slate-200 block" />;
  }

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  let maxDots = 5;
  if (images.length > 5) {
    maxDots = Math.min(images.length, 7);
  }
  
  let startDot = 0;
  if (images.length > maxDots) {
    const half = Math.floor(maxDots / 2);
    startDot = Math.max(0, Math.min(currentIndex - half, images.length - maxDots));
  }
  
  const visibleDots = Array.from({ length: maxDots }).map((_, i) => startDot + i);

  return (
    <div 
      className="relative w-full h-full overflow-hidden group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={images[currentIndex]} alt={alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover/carousel:scale-105 block" />
      
      {images.length > 1 && isHovered && (
        <>
          <button 
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover/carousel:opacity-100 z-20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover/carousel:opacity-100 z-20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-20">
          {visibleDots.map((dotIndex) => (
            <div 
              key={dotIndex} 
              className={`h-[3px] rounded-full transition-all duration-300 ${dotIndex === currentIndex ? 'w-5 bg-white shadow-sm' : 'w-5 bg-white/50 shadow-sm'}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function PropertyCard({ listing, compact = false, selected = false, onSelect }) {
  const images = listing.gallery && listing.gallery.length > 0 ? listing.gallery : [listing.image].filter(Boolean);

  const cardContent = (
    <>
      <div className={`relative ${compact ? "h-[124px]" : "h-[200px]"} shrink-0 w-full`}>
        <ImageCarousel images={images} alt={listing.title} />
        
        {/* Price Tag Overlay */}
        <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm text-gold font-bold text-[13px] px-[11px] py-[5px] rounded-[8px] font-sans z-30">
          {formatPrice(listing.price)}
        </span>
        
        {/* Status Badge */}
        {listing.status && (
          <span className={`absolute top-2.5 right-2.5 font-bold text-[10px] px-2 py-1 rounded-[6px] font-sans text-white z-30 ${
            listing.status === 'APPROVED' ? 'bg-green-500' :
            listing.status === 'PENDING' ? 'bg-amber-500' :
            listing.status === 'REJECTED' ? 'bg-red-500' :
            'bg-slate-500'
          }`}>
            {listing.status}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow bg-white min-w-0">
        <div>
          <h3 className="font-serif text-[16px] font-semibold mb-1 text-ink truncate">{listing.title}</h3>
          <p className="text-slate text-[13px] mb-2 truncate">{listing.location}</p>
        </div>
        <div className="flex gap-2 text-[12px] text-slate-600 pt-3 border-t border-line mt-2">
          <span className="flex items-center gap-1.5 shrink-0 bg-slate-100 px-2.5 py-1.5 rounded-xl"><span className="text-navy flex-shrink-0"><IconBed /></span> {listing.beds}</span>
          <span className="flex items-center gap-1.5 shrink-0 bg-slate-100 px-2.5 py-1.5 rounded-xl"><span className="text-navy flex-shrink-0"><IconBath /></span> {listing.baths}</span>
          <span className="flex items-center gap-1.5 shrink-0 bg-slate-100 px-2.5 py-1.5 rounded-xl"><span className="text-navy flex-shrink-0"><IconArea /></span> {listing.sqft?.toLocaleString()} m²</span>
        </div>
      </div>
    </>
  );

  return (
    <Link
      href={`/property/${listing.id}`}
      className={`flex bg-white rounded-[16px] overflow-hidden border transition-all duration-200 cursor-pointer no-underline text-ink
        ${compact ? "flex-row h-auto items-stretch" : "flex-col h-full"}
        ${selected ? "border-navy ring-1 ring-navy shadow-[0_0_0_1px_#0B3D91]" : "border-line hover:-translate-y-[3px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)]"}`}
      onClick={(e) => {
        if (onSelect) {
          e.preventDefault();
          onSelect(listing.id);
        }
      }}
    >
      {compact ? (
         <>
           <div className="w-[110px] shrink-0 h-full relative">
             <ImageCarousel images={images} alt={listing.title} />
             <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm text-gold font-bold text-[11px] px-2 py-1 rounded-[6px] font-sans z-30">
               {formatPrice(listing.price)}
             </span>
           </div>
           <div className="p-3 flex flex-col justify-between flex-grow min-w-0 bg-white">
             <div>
               <h3 className="font-serif text-[15px] font-semibold text-ink mb-1 truncate">{listing.title}</h3>
               <p className="font-sans text-[12px] text-slate mb-2 truncate">{listing.location}</p>
             </div>
             <div className="flex gap-1.5 text-[11px] text-slate-600 pt-2 border-t border-line mt-2">
               <span className="flex items-center gap-1 shrink-0 bg-slate-100 px-2 py-1 rounded-lg"><span className="w-3 h-3 text-navy"><IconBed /></span> {listing.beds}</span>
               <span className="flex items-center gap-1 shrink-0 bg-slate-100 px-2 py-1 rounded-lg"><span className="w-3 h-3 text-navy"><IconBath /></span> {listing.baths}</span>
               <span className="flex items-center gap-1 shrink-0 bg-slate-100 px-2 py-1 rounded-lg"><span className="w-3 h-3 text-navy"><IconArea /></span> {listing.sqft?.toLocaleString()}</span>
             </div>
           </div>
         </>
      ) : cardContent}
    </Link>
  );
}
