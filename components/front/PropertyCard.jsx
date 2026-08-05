"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IconBed, IconBath, IconArea, IconLocation } from './Icons';
import { formatPrice } from "@/lib/data";

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
            className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full shadow-md transition-all opacity-0 group-hover/carousel:opacity-100 z-20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full shadow-md transition-all opacity-0 group-hover/carousel:opacity-100 z-20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1.5 z-20">
          {visibleDots.map((dotIndex) => (
            <div 
              key={dotIndex} 
              className={`h-1 rounded-full transition-all duration-300 ${dotIndex === currentIndex ? 'w-4 bg-white shadow-sm' : 'w-4 bg-white/50 shadow-sm'}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * @param {Object} props
 * @param {Object} props.listing
 * @param {boolean} [props.compact=false]
 * @param {boolean} [props.selected=false]
 * @param {Function} [props.onSelect]
 * @param {Function} [props.onZoom]
 */
export function PropertyCard({ listing, compact = false, selected = false, onSelect, onZoom }) {
  const router = useRouter();
  const images = listing.gallery && listing.gallery.length > 0 ? listing.gallery : [listing.image].filter(Boolean);

  const cardContent = (
    <>
      <div className={`relative ${compact ? "h-28 w-36" : "h-48 sm:h-56 w-full"} shrink-0 overflow-hidden`}>
        <ImageCarousel images={images} alt={listing.title} />
        
        {/* Price Tag Overlay */}
        <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-md text-navy font-bold text-xs px-2.5 py-1.5 rounded-[6px] font-sans z-30 shadow-sm">
          {formatPrice(listing.price)}
        </span>
        
        {/* Status Badge */}
        {listing.status && (
          <span className={`absolute top-2 right-2 font-bold text-xs px-2 py-1 rounded-[6px] font-sans text-white z-30 shadow-sm ${
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
          <h3 className="font-serif text-lg font-semibold mb-1 text-ink truncate">{listing.title}</h3>
          <p className="font-sans text-slate text-sm font-medium mb-2 flex items-center gap-1.5 truncate">
            <span className="text-[#2B7FFF] shrink-0"><IconLocation /></span>
            <span className="truncate">{listing.location}</span>
          </p>
        </div>
        <div className="flex justify-between items-center pt-2.5 border-t border-line mt-2">
          <div className="flex gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 shrink-0 bg-slate-100 px-2 py-1.5 rounded-xl"><span className="text-navy flex-shrink-0"><IconBed /></span> {listing.beds}</span>
            <span className="flex items-center gap-1.5 shrink-0 bg-slate-100 px-2 py-1.5 rounded-xl"><span className="text-navy flex-shrink-0"><IconBath /></span> {listing.baths}</span>
            <span className="flex items-center gap-1.5 shrink-0 bg-slate-100 px-2 py-1.5 rounded-xl"><span className="text-navy flex-shrink-0"><IconArea /></span> {listing.sqft?.toLocaleString()} m²</span>
          </div>
          <Link 
            href={`/property/${listing.id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-bold text-[#0B3D91] hover:text-[#2B7FFF] bg-[#EAF2FF] px-3 py-1.5 rounded-[6px] transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div
        className={`flex bg-white rounded-[11px] overflow-hidden border transition-all duration-300 cursor-pointer text-ink
        ${compact ? "flex-row h-28 items-stretch w-full" : "flex-col h-full w-full"}
        ${selected ? "border-navy ring-2 ring-navy shadow-md" : "border-line hover:-translate-y-1 hover:shadow-xl hover:border-slate-300"}`}
      onClick={(e) => {
        if (onZoom) {
          onSelect?.(listing.id);
          onZoom(listing.id);
        } else {
          router.push(`/property/${listing.id}`);
        }
      }}
    >
      {compact ? (
         <>
           <div className="w-36 shrink-0 h-full relative overflow-hidden">
             <ImageCarousel images={images} alt={listing.title} />
             <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-md text-navy font-bold text-xs px-2 py-1 rounded-[4px] font-sans z-30 shadow-sm">
               {formatPrice(listing.price)}
             </span>
           </div>
           <div className="p-3 flex flex-col justify-between flex-grow min-w-0 bg-white">
             <div>
                <h3 className="font-serif text-base font-semibold text-ink mb-1 truncate">{listing.title}</h3>
                <p className="font-sans text-xs font-medium text-slate mb-1.5 flex items-center gap-1 truncate">
                  <span className="text-[#2B7FFF] shrink-0"><IconLocation /></span>
                  <span className="truncate">{listing.location}</span>
                </p>
              </div>
             <div className="flex justify-between items-center pt-2 border-t border-line mt-1.5">
               <div className="flex gap-3 text-xs text-slate-600">
                 <span className="flex items-center gap-1 shrink-0 bg-slate-100 px-2 py-1 rounded-lg"><span className="w-3 h-3 text-navy"><IconBed /></span> {listing.beds}</span>
                 <span className="flex items-center gap-1 shrink-0 bg-slate-100 px-2 py-1 rounded-lg"><span className="w-3 h-3 text-navy"><IconBath /></span> {listing.baths}</span>
                 <span className="flex items-center gap-1 shrink-0 bg-slate-100 px-2 py-1 rounded-lg"><span className="w-3 h-3 text-navy"><IconArea /></span> {listing.sqft?.toLocaleString()}</span>
               </div>
               <Link 
                 href={`/property/${listing.id}`}
                 onClick={(e) => e.stopPropagation()}
                 className="text-xs font-bold text-[#0B3D91] hover:text-[#2B7FFF] bg-[#EAF2FF] px-2.5 py-1 rounded-lg transition-colors"
               >
                 Details
               </Link>
             </div>
           </div>
         </>
      ) : cardContent}
    </div>
  );
}
