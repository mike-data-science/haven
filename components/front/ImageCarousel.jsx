"use client";

import { useState } from 'react';

export default function ImageCarousel({ images, alt }) {
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

  const maxDots = Math.min(images.length, 7);
  
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
      <img src={images[currentIndex]} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/carousel:scale-105 block" />
      
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
