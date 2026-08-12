"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IconBed, IconBath, IconArea, IconLocation } from './Icons';
import { MapPin, BedDouble, Bath as BathIcon, Maximize2, MoreHorizontal, ArrowUpRight } from 'lucide-react';
import { formatPrice } from "@/lib/data";

function ImageCarousel({ images, alt, indicator = 'dots' }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    >
      <img src={images[currentIndex]} alt={alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover/carousel:scale-105 block" />
      
      {images.length > 1 && (
        <>
          <button 
            onClick={prevImage}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full shadow-md transition-all opacity-100 md:opacity-0 group-hover/carousel:opacity-100 z-20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full shadow-md transition-all opacity-100 md:opacity-0 group-hover/carousel:opacity-100 z-20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {visibleDots.map((dotIndex, i) => (
            <div 
              key={i} 
              className={`transition-colors duration-300 ${indicator === 'lines' ? 'w-3.5 h-1 rounded-full' : 'w-1.5 h-1.5 rounded-full'} ${dotIndex === currentIndex ? 'bg-white' : 'bg-white/50'}`} 
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
 * @param {boolean} [props.showOverlay=false]
 * @param {string} [props.theme="light"]
 */
export function PropertyCard({ listing, compact = false, selected = false, showOverlay = false, onSelect, onZoom, theme = "light" }) {
  const router = useRouter();

  const images = listing.gallery && listing.gallery.length > 0 ? listing.gallery : [listing.image].filter(Boolean);
  const locationFirstWord = listing.location ? listing.location.split(',').pop().trim() : "Centru";
  const streetAddress = listing.address ? listing.address.split(',')[0].trim() : "No street address provided";

  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isRent = listing.tag?.toLowerCase().includes('rent') || listing.type?.toLowerCase() === 'rent';
  const priceValue = listing.price || 0;
  
  const formattedFullPrice = `${priceValue.toLocaleString('en-US').replace(/,/g, '.')}€`;
  const pricePerSqM = listing.sqft ? Math.round(priceValue / listing.sqft) : 0;
  const formattedPerSqM = `${pricePerSqM.toLocaleString('en-US').replace(/,/g, '.')}€/m²`;
  const isApartment = listing.type?.toLowerCase() === 'apartment' || listing.type?.toLowerCase() === 'apartament' || listing.type?.toLowerCase() === 'apartments';
  
  let displayType = listing.type;
  if (isApartment) {
    displayType = 'Apartament';
  } else if (listing.type?.toLowerCase() === 'house' || listing.type?.toLowerCase() === 'casa') {
    displayType = 'Casă';
  }

  const LayersIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="6" width="16" height="4.5" rx="1" />
      <rect x="4" y="14" width="16" height="4.5" rx="1" />
    </svg>
  );

  const variant3CardContent = (
    <>
      {/* Image Area */}
      <div className="relative w-full h-48 sm:h-56 shrink-0 bg-slate-200 overflow-hidden">
        <ImageCarousel images={images} alt={listing.title} indicator="lines" />
        
        {/* Tag Badge */}
        {listing.tag && (
          <div className="absolute top-3 left-3 bg-[#1A1A18]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm z-30 uppercase tracking-wider pointer-events-none">
            {listing.tag}
          </div>
        )}

        {/* Selected Overlay Button */}
        {showOverlay && (
          <div className="absolute inset-0 z-20 flex items-center justify-center transition-all animate-in fade-in duration-300 pointer-events-none">
            <Link 
              href={`/property/${listing.id}`}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1E65FF]/90 backdrop-blur-md text-white font-bold px-5 py-2.5 rounded-full shadow-2xl hover:bg-[#1455E1] hover:scale-105 transition-all flex items-center gap-2 pointer-events-auto"
            >
              <span>View Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className={`p-5 flex flex-col min-w-0 flex-grow justify-between ${theme === 'dark' ? 'bg-[#1A1A18]' : 'bg-white'}`}>
        <div>
          <div className="flex items-center gap-4 text-[13px] font-medium text-slate-600 mb-1.5">
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-[#1E65FF]" />
              <span>{listing.beds}-cam.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BathIcon className="w-3.5 h-3.5 text-[#1E65FF]" />
              <span>{listing.baths} ba.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#1E65FF]" />
              <span>{listing.sqft?.toLocaleString()} m²</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-1.5 min-w-0">
            <h3 className={`font-sans text-[17px] font-bold leading-[1.3] truncate ${theme === 'dark' ? 'text-white' : 'text-[#1A1A18]'}`}>
              {displayType}
            </h3>
            {isApartment && listing.floor !== undefined && listing.floor !== null && (
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-600 whitespace-nowrap shrink-0">
                <LayersIcon className="w-4 h-4 text-[#1E65FF]" />
                <span>{listing.floor}/{listing.totalFloors || 9} etaj</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
             <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#1E65FF]" />
             <span className="font-sans text-[13px] font-medium truncate">{locationFirstWord}, Chișinău</span>
          </div>
        </div>

        <div className={`w-full h-px my-2.5 ${theme === 'dark' ? 'bg-slate-800' : 'bg-[#E8E5DF]/50'}`} />
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            <span className={`font-serif text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-[#1A1A18]'}`}>
              {isRent ? `${formattedFullPrice}/lun.` : formattedFullPrice}
            </span>
          </div>
          {!isRent && (
            <span className="text-[13px] font-medium text-slate-400">
              {formattedPerSqM}
            </span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div
        className={`flex overflow-hidden border transition-all duration-300 cursor-pointer 
        ${theme === 'dark' ? 'bg-[#27272A] border-slate-700 text-white' : 'bg-white border-[#E8E5DF] text-[#1A1A18]'}
        ${compact ? "rounded-[11px] flex-row h-[140px] sm:h-[150px] items-stretch w-full" : "rounded-2xl flex-col h-full w-full"}
        ${selected ? "border-[var(--theme-accent)] ring-2 ring-[var(--theme-accent)] shadow-[var(--theme-accent)]/20" : `hover:-translate-y-1 hover:shadow-xl ${theme === 'dark' ? 'hover:border-slate-500' : 'hover:border-slate-300'}`}`}
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
           <div className="w-[120px] sm:w-[150px] shrink-0 h-full relative overflow-hidden bg-slate-200">
             <ImageCarousel images={images} alt={listing.title} indicator="none" />
             {/* Tag Badge */}
             {listing.tag && (
               <div className="absolute top-2 left-2 bg-[#1A1A18]/90 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm z-30 uppercase tracking-wider pointer-events-none">
                 {listing.tag}
               </div>
             )}

             {/* Selected Overlay Button */}
             {showOverlay && (
               <div className="absolute inset-0 z-20 flex items-center justify-center transition-all animate-in fade-in duration-300 pointer-events-none">
                 <Link 
                   href={`/property/${listing.id}`}
                   onClick={(e) => e.stopPropagation()}
                   className="bg-[#1E65FF]/90 backdrop-blur-md text-white font-bold px-3 py-1.5 rounded-full shadow-2xl hover:bg-[#1455E1] hover:scale-105 transition-all flex items-center gap-1.5 text-[11px] sm:text-xs pointer-events-auto"
                 >
                   <span>View</span>
                   <ArrowUpRight className="w-3.5 h-3.5" />
                 </Link>
               </div>
             )}
           </div>
           
           <div className={`p-2 sm:p-3 lg:p-4 flex flex-col justify-between flex-grow min-w-0 ${theme === 'dark' ? 'bg-[#27272A]' : 'bg-white'}`}>
             <div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-0.5 sm:gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className={`font-sans text-[15px] sm:text-[16px] font-bold leading-tight truncate ${theme === 'dark' ? 'text-white' : 'text-[#1A1A18]'}`}>
                      {displayType}
                    </h3>
                    {isApartment && listing.floor !== undefined && listing.floor !== null && (
                      <div className="flex items-center gap-1 text-[12px] font-semibold text-slate-600 whitespace-nowrap shrink-0">
                        <LayersIcon className="w-3.5 h-3.5 text-[#1E65FF]" />
                        <span>{listing.floor}/{listing.totalFloors || 9} etaj</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start sm:items-end shrink-0">
                    <span className={`font-serif text-[14px] sm:text-[16px] font-bold whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-[#1A1A18]'}`}>
                      {isRent ? `${formattedFullPrice}/lun.` : formattedFullPrice}
                    </span>
                  </div>
                </div>

                <div className={`w-full h-px my-2 sm:my-3 ${theme === 'dark' ? 'bg-slate-800' : 'bg-[#E8E5DF]/50'}`} />
                <div className="flex items-center gap-1 text-slate-500 mb-1 sm:mb-2">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 text-[#1E65FF]" />
                  <span className="font-sans text-[11px] sm:text-xs font-medium truncate">{streetAddress}, {locationFirstWord}</span>
                </div>
              </div>

             <div className="flex justify-between items-center pt-2 sm:pt-3 mt-auto gap-2">
               <div className="flex gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-slate-600 min-w-0 overflow-hidden">
                 <div className="flex items-center gap-1 whitespace-nowrap">
                   <BedDouble className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1E65FF] shrink-0" />
                   <span>{listing.beds} <span className="hidden xl:inline">cam.</span></span>
                 </div>
                 <div className="flex items-center gap-1 whitespace-nowrap">
                   <BathIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1E65FF] shrink-0" />
                   <span>{listing.baths} <span className="hidden xl:inline">ba.</span></span>
                 </div>
                 <div className="flex items-center gap-1 whitespace-nowrap">
                   <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1E65FF] shrink-0" />
                   <span>{listing.sqft?.toLocaleString()} <span className="hidden lg:inline">m²</span></span>
                 </div>
               </div>
             </div>
           </div>
         </>
      ) : (
        variant3CardContent
      )}
    </div>
  );
}
