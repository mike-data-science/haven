"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, XCircle, Eye, Edit } from "lucide-react";
import ImageCarousel from "@/components/front/ImageCarousel";

export default function MyPropertiesClient({ initialProperties }: { initialProperties: any[] }) {
  const [properties, setProperties] = useState(initialProperties);

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
        
        {properties.slice(0, 30).map((prop) => (
          <div key={prop.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col transition-shadow hover:shadow-md">
            <div className="relative aspect-[4/3] w-full bg-slate-100">
              <ImageCarousel 
                images={prop.images?.length > 0 ? prop.images.map((i: any) => i.url) : []} 
                alt={prop.title} 
              />
              
              {/* Status Badge */}
              <div className={`absolute top-[7px] left-[7px] px-[3px].5 py-[2px] text-white text-xs font-bold rounded-md flex items-center gap-[2px] shadow-sm ${
                prop.status === 'APPROVED' ? 'bg-green-500' :
                prop.status === 'REJECTED' ? 'bg-red-500' :
                'bg-amber-500'
              }`}>
                {prop.status === 'PENDING' && <Clock className="w-[7px] h-[7px]" />}
                {prop.status === 'APPROVED' && <CheckCircle2 className="w-[7px] h-[7px]" />}
                {prop.status === 'REJECTED' && <XCircle className="w-[7px] h-[7px]" />}
                {prop.status}
              </div>
            </div>
            
            <div className="p-[11px] flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-[2px]">
                <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{prop.title}</h3>
                <span className="font-semibold text-[var(--theme-accent)]">${(prop.price / 1000).toFixed(0)}k</span>
              </div>
              <p className="text-slate-500 text-xs mt-[2px]">{prop.city} • {prop.category?.name || 'Uncategorized'}</p>
              
              <div className="mt-[9px] pt-[9px] border-t border-slate-100 flex-1">
                <div className="text-xs text-slate-500 mt-[2px]">
                  Listed on {new Date(prop.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-[14px] flex items-center gap-[3px].5">
                <Link 
                  href={`/property/${prop.id}`}
                  className="flex-1 px-[7px] py-[3px].5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex justify-center items-center gap-[3px].5 transition-colors"
                >
                  <Eye className="w-[9px] h-[9px]" /> View
                </Link>
                <Link
                  href={`/dashboard/properties/${prop.id}/edit`}
                  className="px-[7px] py-[3px].5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex justify-center items-center transition-colors"
                  title="Edit Property"
                >
                  <Edit className="w-[9px] h-[9px]" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
