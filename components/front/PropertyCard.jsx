"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IconBed, IconBath, IconArea, IconLocation } from './Icons';
import { MapPin, BedDouble, Bath as BathIcon, Maximize2 } from 'lucide-react';
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

  let maxDots = 7;
  let startDot = 0;
  if (images.length > maxDots) {
    const half = Math.floor(maxDots / 2);
    startDot = Math.max(0, Math.min(currentIndex - half, images.length - maxDots));
  }
  
  const visibleDots = Array.from({ length: Math.min(images.length, maxDots) }).map((_, i) => startDot + i);

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
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {visibleDots.map((dotIndex, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${dotIndex === currentIndex ? 'bg-white' : 'bg-white/50'}`} 
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
  const locationFirstWord = listing.location ? listing.location.split(',').pop().trim() : "Centru";
  const streetAddress = listing.address ? listing.address.split(',')[0].trim() : "No street address provided";

  const cardContent = (
    <>
      <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
        <ImageCarousel images={images} alt={listing.title} />
        
        {/* Tag Badge */}
        {listing.tag && (
          <div className="absolute top-3 left-3 bg-[#1A1A18]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm z-30">
            {listing.tag}
          </div>
        )}
        
        {/* Location Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#1A1A18] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 z-30">
          <MapPin className="w-3 h-3 text-[#0B3D91]" />
          <span className="truncate max-w-[150px]">{locationFirstWord}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2.5 bg-white min-w-0 flex-grow justify-between">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-xl font-bold text-[#1A1A18]">
              {formatPrice(listing.price)}
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase truncate ml-2">
              {listing.type || "Residential"}
            </span>
          </div>

          <h3 className="font-serif text-base font-bold text-[#1A1A18] leading-snug overflow-hidden whitespace-nowrap max-w-[80%] m-0">
            {listing.title}
          </h3>
          <p className="font-sans text-xs text-slate-500 m-0 overflow-hidden whitespace-nowrap">
            {streetAddress}
          </p>
        </div>

        {/* Specs Row */}
        <div className="flex items-center gap-4 pt-2 border-t border-[#E8E5DF] text-xs font-semibold text-slate-600 mt-2">
          <div className="flex items-center gap-1">
            <BedDouble className="w-3.5 h-3.5 text-[#0B3D91]" />
            <span>{listing.beds} r.</span>
          </div>
          <div className="flex items-center gap-1">
            <BathIcon className="w-3.5 h-3.5 text-[#0B3D91]" />
            <span>{listing.baths} ba.</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5 text-[#0B3D91]" />
            <span>{listing.sqft?.toLocaleString()} m²</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
        className={`flex bg-white overflow-hidden border transition-all duration-300 cursor-pointer text-[#1A1A18]
        ${compact ? "rounded-[11px] flex-row h-28 items-stretch w-full" : "rounded-2xl flex-col h-full w-full"}
        ${selected ? "border-[#0B3D91] ring-2 ring-[#0B3D91] shadow-md" : "border-[#E8E5DF] hover:-translate-y-1 hover:shadow-xl hover:border-slate-300"}`}
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
                <h3 className="font-serif text-base font-semibold text-ink mb-1 overflow-hidden whitespace-nowrap max-w-[80%]">{listing.title}</h3>
                <p className="font-sans text-[10px] text-slate-500 mb-1 overflow-hidden whitespace-nowrap">
                  {streetAddress}
                </p>
                <p className="font-sans text-xs font-medium text-slate mb-1.5 flex items-center gap-1 overflow-hidden whitespace-nowrap">
                  <span className="text-[#2B7FFF] shrink-0"><IconLocation /></span>
                  <span className="truncate">{locationFirstWord}</span>
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
