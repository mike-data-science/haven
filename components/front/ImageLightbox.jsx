"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export function ImageLightbox({ images, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Lock body scroll when lightbox is open
    document.body.style.overflow = "hidden";
    
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage(e);
      if (e.key === "ArrowLeft") prevImage(e);
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!images || images.length === 0) return null;

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const lightboxContent = (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-3 md:p-6 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 md:top-5 md:right-5 text-white/70 hover:text-white p-1.5 z-50 bg-black/20 hover:bg-black/40 rounded-full transition-all cursor-pointer"
        aria-label="Close lightbox"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>

      <div className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center pointer-events-none">
        <img 
          src={images[currentIndex]} 
          alt={`Gallery image ${currentIndex + 1}`} 
          className="max-w-full max-h-[85vh] object-contain select-none pointer-events-auto rounded-[5px] shadow-2xl"
          draggable={false}
          onClick={(e) => e.stopPropagation()}
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-1.5 md:-left-9 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-50 bg-black/40 hover:bg-black/60 rounded-full transition-all pointer-events-auto shadow-lg cursor-pointer"
              aria-label="Previous image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-1.5 md:-right-9 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-50 bg-black/40 hover:bg-black/60 rounded-full transition-all pointer-events-auto shadow-lg cursor-pointer"
              aria-label="Next image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/90 font-sans text-sm sm:text-base bg-black/60 px-4 py-2 rounded-full font-medium tracking-wide">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );

  if (!mounted) return null;

  return createPortal(lightboxContent, document.body);
}
