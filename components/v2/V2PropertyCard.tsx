"use client";

import React, { useState } from "react";
import { MoreHorizontal, ArrowUpRight, ChevronUp, ChevronDown } from "lucide-react";
export interface V2Property {
  id: number;
  title?: string;
  price?: number;
  imageUrl?: string;
  createdAt?: string | number | Date;
  rooms?: number;
  bathrooms?: number;
  area?: number;
  agentName?: string;
  agentAvatar?: string;
  status?: string;
  location?: string;
  latitude: number;
  longitude: number;
  [key: string]: any;
}

interface V2PropertyCardProps {
  property: V2Property;
}

export default function V2PropertyCard({ property }: V2PropertyCardProps) {
  type ExpandLevel = 0 | 1 | 2;
  const [level, setLevel] = useState<ExpandLevel>(1); // Default to level 1 (details shown)

  const imageUrl = property.imageUrl
    ? (property.imageUrl.startsWith("http") ? property.imageUrl : property.imageUrl)
    : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price ?? 0);

  const formattedDate = new Date(property.createdAt ?? Date.now()).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isLevel0 = level === 0;
  const isLevel1 = level === 1;
  const isLevel2 = level === 2;

  return (
    <>
      {/* Background overlay for Level 2 */}
      {isLevel2 && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] md:hidden" onClick={() => setLevel(1)} />
      )}
      
      <div 
        className={`
          flex-shrink-0 bg-black/40 backdrop-blur-3xl text-white shadow-2xl border border-white/20 flex flex-col transition-all duration-500 ease-in-out group overflow-hidden
          ${isLevel2 
            ? 'fixed inset-x-0 bottom-0 top-12 z-[2001] rounded-t-[32px] w-full md:relative md:w-[400px] md:h-auto md:top-auto md:bottom-auto md:inset-auto md:rounded-[28px]' 
            : 'w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] rounded-[28px] relative'
          }
        `}
      >
        {/* Scrollable container for Level 2, normal for 0/1 */}
        <div className={`flex flex-col w-full h-full ${isLevel2 ? 'overflow-y-auto hide-scrollbar' : ''}`}>
          
          {/* Image Header */}
          <div className={`relative w-full flex-shrink-0 overflow-hidden transition-all duration-500 ${isLevel2 ? 'h-[250px] md:h-[240px] rounded-t-[32px] md:rounded-t-[28px]' : 'h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] rounded-t-[28px] ' + (isLevel0 ? 'rounded-b-[28px]' : '')}`}>
            <img
              src={imageUrl}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay header on top of image */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
              <h2 className="text-base font-semibold tracking-tight text-white drop-shadow-md truncate pr-4">{property.title}</h2>
              <div className="flex gap-2">
                <button className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                  <ArrowUpRight size={14} className="text-white" />
                </button>
              </div>
            </div>

            {/* Quick info row overlay at bottom of image */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#E1F036] shadow-black drop-shadow-md">{formattedPrice}</span>
                <span className="text-xs text-gray-200">{property.rooms} Beds • {property.bathrooms} Baths • {property.area} m²</span>
              </div>
              
              <div className="flex flex-col gap-2">
                {isLevel2 && (
                   <button 
                     onClick={(e) => { e.stopPropagation(); setLevel(1); }}
                     className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-all shadow-lg border border-white/20"
                   >
                     <ChevronDown size={18} className="text-white" />
                   </button>
                )}
                {!isLevel2 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isLevel0) setLevel(1);
                      else if (isLevel1) setLevel(2);
                    }}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-all shadow-lg border border-white/20"
                  >
                    <ChevronUp size={18} className="text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Level 1 Info rows - Details */}
          <div className={`transition-all duration-500 ease-in-out flex-shrink-0 ${!isLevel0 ? 'opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="space-y-2.5 px-4 py-4 text-sm">
              {/* Agent info */}
              <div className="flex items-center gap-3 mb-4 bg-white/5 p-2 rounded-xl border border-white/10">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-white/30 flex-shrink-0">
                  {property.agentAvatar ? (
                    <img src={property.agentAvatar} alt={property.agentName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500 font-bold bg-gray-100">
                      {property.agentName?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Listed by</span>
                  <span className="text-sm font-medium text-white">{property.agentName}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                <span className="text-gray-400 text-xs">Listed Date</span>
                <span className="font-medium text-right text-xs">{formattedDate}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                <span className="text-gray-400 text-xs">Address</span>
                <span className="font-medium text-right text-xs truncate max-w-[140px]">{property.address}, {property.city}</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-gray-400 text-xs">Type</span>
                <span className="font-medium text-right text-xs text-[#E1F036]">{property.categoryName}</span>
              </div>
            </div>
          </div>

          {/* Level 2 - Deep Dive Content */}
          <div className={`transition-all duration-500 ease-in-out ${isLevel2 ? 'opacity-100 pb-20' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="px-4 py-2 space-y-6">
              
              {/* Description */}
              <div>
                <h3 className="text-[#E1F036] font-semibold text-sm mb-2">Description</h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Experience luxury living in this stunning {property.categoryName.toLowerCase()}. Featuring {property.rooms} spacious bedrooms and {property.bathrooms} elegant bathrooms across {property.area} square meters of living space. Located in the heart of {property.city}, this property offers unparalleled convenience and style.
                </p>
              </div>

              {/* Amenities Grid */}
              <div>
                <h3 className="text-[#E1F036] font-semibold text-sm mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-3 text-xs text-gray-200">
                  <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10"><span className="w-1.5 h-1.5 rounded-full bg-[#E1F036]"></span> Smart Home</div>
                  <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10"><span className="w-1.5 h-1.5 rounded-full bg-[#E1F036]"></span> Pool Access</div>
                  <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10"><span className="w-1.5 h-1.5 rounded-full bg-[#E1F036]"></span> 24/7 Security</div>
                  <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10"><span className="w-1.5 h-1.5 rounded-full bg-[#E1F036]"></span> Parking</div>
                </div>
              </div>
              
              {/* Additional Stats */}
              <div>
                <h3 className="text-[#E1F036] font-semibold text-sm mb-3">Property Details</h3>
                <div className="bg-white/5 rounded-xl border border-white/10 p-3 space-y-3 text-xs">
                   <div className="flex justify-between items-center"><span className="text-gray-400">Year Built</span> <span className="font-medium text-white">{property.yearBuilt}</span></div>
                   <div className="flex justify-between items-center"><span className="text-gray-400">Floor</span> <span className="font-medium text-white">{property.floor}</span></div>
                   <div className="flex justify-between items-center"><span className="text-gray-400">Price / m²</span> <span className="font-medium text-white">${Math.round((property.price ?? 0) / (property.area ?? 1)).toLocaleString()}</span></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
