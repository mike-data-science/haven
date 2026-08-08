import React from "react";
import prisma from "@/lib/db";
import V2Navbar from "@/components/v2/V2Navbar";
import { Search, Filter, Mail, Phone, MapPin, MoreVertical, ShieldCheck, Star } from "lucide-react";

export const revalidate = 0;

export default async function V2OwnersPage() {
  // Fetch users who have at least one property
  const owners = await prisma.user.findMany({
    where: {
      properties: {
        some: { isDeleted: false }
      }
    },
    include: {
      _count: {
        select: { properties: { where: { isDeleted: false } } }
      }
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sora relative">
      {/* Navbar overlay */}
      <div className="h-28">
        <V2Navbar />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-12">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-gray-500 text-sm mb-1">Owner Management</p>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Registered Owners</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search owners..." 
                className="pl-9 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-blue-500 w-64 shadow-sm"
              />
            </div>
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        {/* Owners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {owners.map((owner) => (
            <div key={owner.id} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
              <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                <MoreVertical size={18} />
              </button>
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                  {owner.avatarUrl ? (
                    <img src={owner.avatarUrl} alt={owner.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold bg-gradient-to-br from-gray-100 to-gray-200 text-xl">
                      {owner.name?.charAt(0) || "O"}
                    </div>
                  )}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-1.5">
                    {owner.name}
                    {owner.role === "AGENT" && <ShieldCheck size={16} className="text-blue-500" />}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">{owner.title || "Property Owner"}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  <span className="truncate">{owner.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone size={16} className="text-gray-400" />
                  <span>{owner.phone || "No phone provided"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin size={16} className="text-gray-400" />
                  <span>Moldova</span>
                </div>
              </div>

              <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Total Properties</p>
                  <p className="text-xl font-bold text-gray-900">{owner._count.properties}</p>
                </div>
                <button className="bg-[#E1F036] text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-[#d4e329] transition-colors shadow-sm">
                  View Profile
                </button>
              </div>
            </div>
          ))}

          {owners.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500">
              No owners found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
