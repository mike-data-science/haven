"use client";

import React from "react";
import { MoreHorizontal, ArrowUpRight } from "lucide-react";
import type { V2Property } from "@/app/v2/page";

interface V2PropertyCardProps {
  property: V2Property;
}

export default function V2PropertyCard({ property }: V2PropertyCardProps) {
  const imageUrl = property.imageUrl
    ? (property.imageUrl.startsWith("http") ? property.imageUrl : property.imageUrl)
    : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  const formattedDate = new Date(property.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] flex-shrink-0 bg-white/5 backdrop-blur-2xl text-white rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/20 flex flex-col overflow-hidden transition-all duration-300 group">
      {/* Image first - always visible */}
      <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] flex-shrink-0">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay header on top of image */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
          <h2 className="text-base font-semibold tracking-tight">{property.title}</h2>
          <div className="flex gap-2">
            <button className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
              <MoreHorizontal size={14} />
            </button>
            <button className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
        {/* Agent overlay floating on top right of the image container */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20 shadow-lg">
          <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden border border-white/30 flex-shrink-0">
            {property.agentAvatar ? (
              <img src={property.agentAvatar} alt={property.agentName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-500 font-bold bg-gray-100">
                {property.agentName?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <span className="text-[10px] font-medium text-white">{property.agentName}</span>
        </div>
      </div>

      {/* Info rows - revealed on scroll */}
      <div className="space-y-2.5 px-4 py-4 text-sm">
        <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
          <span className="text-gray-400 text-xs">Listed Date</span>
          <span className="font-medium text-right text-xs">{formattedDate}</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
          <span className="text-gray-400 text-xs">Price</span>
          <span className="font-medium text-right text-xs">{formattedPrice}</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
          <span className="text-gray-400 text-xs">Address</span>
          <span className="font-medium text-right text-xs truncate max-w-[140px]">{property.address}, {property.city}</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
          <span className="text-gray-400 text-xs">Rooms</span>
          <span className="font-medium text-right text-xs">{property.rooms} Beds, {property.bathrooms} Baths</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
          <span className="text-gray-400 text-xs">Area</span>
          <span className="font-medium text-right text-xs">{property.area} m²</span>
        </div>
        <div className="flex justify-between items-center pb-1">
          <span className="text-gray-400 text-xs">Type</span>
          <span className="font-medium text-right text-xs text-[#E1F036]">{property.categoryName}</span>
        </div>
      </div>
    </div>
  );
}
