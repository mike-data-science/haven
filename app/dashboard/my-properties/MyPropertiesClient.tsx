"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, XCircle, Eye, Edit, Trash2, MapPin, BedDouble, Bath as BathIcon, Maximize2 } from "lucide-react";
import ImageCarousel from "@/components/front/ImageCarousel";
import { useRouter } from "next/navigation";

export default function MyPropertiesClient({ 
  initialProperties, 
  totalPages = 1,
  currentPage = 1
}: { 
  initialProperties: any[],
  totalPages?: number,
  currentPage?: number
}) {
  const [properties, setProperties] = useState(initialProperties);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    setProperties(initialProperties);
  }, [initialProperties]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this property completely? This action cannot be undone.")) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error("Failed to delete property.");
      }
      setProperties((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("There was an error deleting the property.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
        {properties.length === 0 && (
          <div className="col-span-full py-[27px] text-center text-slate-500 bg-white rounded-xl border border-slate-200">
            You don't have any properties yet.
            <div className="mt-[9px]">
              <Link href="/dashboard/properties/new" className="px-[11px] py-[7px] rounded-3xl bg-[#0B3D91] text-white font-semibold transition-colors hover:bg-[#0B3D91]/90">
                List your first property
              </Link>
            </div>
          </div>
        )}
        
        {properties.map((prop) => {
          const streetAddress = prop.address ? prop.address.split(',')[0].trim() : "No street address provided";
          
          return (
          <div key={prop.id} className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-[#E8E5DF] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300">
            <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
              <ImageCarousel 
                images={prop.images?.length > 0 ? prop.images.map((i: any) => i.url) : []} 
                alt={prop.title} 
              />
              
              {/* Status Badge */}
              <div className={`absolute top-3 right-3 px-2 py-1 text-white text-[11px] font-bold rounded-md flex items-center gap-1 shadow-sm z-30 ${
                prop.status === 'APPROVED' ? 'bg-green-500' :
                prop.status === 'REJECTED' ? 'bg-red-500' :
                'bg-amber-500'
              }`}>
                {prop.status === 'PENDING' && <Clock className="w-3 h-3" />}
                {prop.status === 'APPROVED' && <CheckCircle2 className="w-3 h-3" />}
                {prop.status === 'REJECTED' && <XCircle className="w-3 h-3" />}
                {prop.status}
              </div>
              
              {/* Location Badge (Sector) */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#1A1A18] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 z-30">
                <MapPin className="w-3 h-3 text-[#0B3D91]" />
                <span className="truncate max-w-[150px]">{prop.city ? prop.city.split(',')[0].trim() : "Centru"}</span>
              </div>
            </div>
            
            <div className="p-4 flex flex-col gap-2.5 bg-white min-w-0 flex-grow justify-between">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-xl font-bold text-[#1A1A18]">
                    ${(prop.price / 1000).toFixed(0)}k
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase truncate ml-2">
                    {prop.category?.name || "Residential"}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-[#1A1A18] leading-snug overflow-hidden whitespace-nowrap max-w-[80%] m-0">
                  {prop.title}
                </h3>
                <p className="font-sans text-xs text-slate-500 m-0 overflow-hidden whitespace-nowrap">
                  {streetAddress}
                </p>
              </div>

              {/* Specs Row */}
              <div className="flex items-center gap-4 pt-2 border-t border-[#E8E5DF] text-xs font-semibold text-slate-600 mt-2">
                <div className="flex items-center gap-1">
                  <BedDouble className="w-3.5 h-3.5 text-[#0B3D91]" />
                  <span>{prop.rooms} r.</span>
                </div>
                <div className="flex items-center gap-1">
                  <BathIcon className="w-3.5 h-3.5 text-[#0B3D91]" />
                  <span>{prop.bathrooms} ba.</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-[#0B3D91]" />
                  <span>{prop.area?.toLocaleString()} m²</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Link 
                  href={`/property/${prop.id}`}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex justify-center items-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" /> View
                </Link>
                <Link
                  href={`/dashboard/properties/${prop.id}/edit`}
                  className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex justify-center items-center transition-colors"
                  title="Edit Property"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  disabled={deletingId === prop.id}
                  onClick={() => handleDelete(prop.id)}
                  className="px-3 py-2 border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-semibold rounded-lg flex justify-center items-center transition-colors disabled:opacity-50"
                  title="Delete Property"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )})}
      </div>
      
      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 py-4">
          <button
            onClick={() => router.push(`/dashboard/my-properties?page=${currentPage - 1}`)}
            disabled={currentPage <= 1}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1">
            {(() => {
              const maxVisiblePages = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
              let endPage = startPage + maxVisiblePages - 1;

              if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
              }

              const visiblePages = Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
              );

              return visiblePages.map((page) => (
                <button
                  key={page}
                  onClick={() => router.push(`/dashboard/my-properties?page=${page}`)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                    currentPage === page 
                      ? "bg-[#0B3D91] text-white" 
                      : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ));
            })()}
          </div>

          <button
            onClick={() => router.push(`/dashboard/my-properties?page=${currentPage + 1}`)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
