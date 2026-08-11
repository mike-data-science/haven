import React from "react";
import prisma from "@/lib/db";
import V2Navbar from "@/components/v2/V2Navbar";
import Image from "next/image";
import { MoreHorizontal, Download, Filter, Printer, Edit, Trash2 } from "lucide-react";

import V2Pagination from "@/components/v2/V2Pagination";

export const revalidate = 0; // Dynamic route

export default async function V2ListingsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const sp = await searchParams;
  const page = typeof sp.page === 'string' ? parseInt(sp.page, 10) || 1 : 1;
  const limit = typeof sp.limit === 'string' ? parseInt(sp.limit, 10) || 10 : 10;
  const skip = (page - 1) * limit;

  const [properties, totalCount] = await Promise.all([
    prisma.property.findMany({
      where: { isDeleted: false },
      include: {
        user: true,
        category: true,
        images: { orderBy: { order: "asc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.property.count({
      where: { isDeleted: false }
    })
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sora relative">
      {/* Navbar overlay */}
      <div className="h-28">
        <V2Navbar />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-12">
        {/* Header Section */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-gray-500 text-sm mb-1">Property Detail Management</p>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Detailed Property Insights</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Filter size={16} />
              Sort By
            </button>
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              Show All Properties
            </button>
            <button className="flex items-center gap-2 bg-[#E1F036] px-5 py-2 rounded-full text-sm font-bold text-black hover:bg-[#d4e329] transition-colors shadow-sm">
              <Printer size={16} />
              Print Report
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#2D2D2D] text-gray-100 text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4 rounded-tl-[24px]">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-[#E1F036] focus:ring-[#E1F036]" />
                      Property ID
                    </div>
                  </th>
                  <th className="px-6 py-4">Agent / Owner</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Listed Date</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 rounded-tr-[24px] text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {properties.map((property) => {
                  // Mock rent/sell based on price (since we don't have a field for it)
                  const listingType = property.price > 50000 ? "Sell" : "Rent";
                  
                  // Status badge styling
                  let statusColors = "";
                  switch (property.status) {
                    case "APPROVED":
                      statusColors = "bg-[#A7A9F5] text-white"; // Periwinkle from design
                      break;
                    case "PENDING":
                      statusColors = "bg-[#E1F036] text-black"; // Lime yellow
                      break;
                    case "REJECTED":
                      statusColors = "bg-[#FF9B70] text-white"; // Coral/Orange
                      break;
                    default:
                      statusColors = "bg-gray-300 text-gray-800";
                  }

                  return (
                    <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-600">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          #{property.id.toString().padStart(6, '0')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100 flex-shrink-0">
                            {property.user?.avatarUrl ? (
                              <img src={property.user.avatarUrl} alt={property.user.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold bg-gray-100">
                                {property.user?.name?.charAt(0) || "U"}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">{property.user?.name || "Unknown"}</span>
                            <span className="text-xs text-gray-500">{property.user?.email || "No email"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 font-medium">{listingType}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(property.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-medium">
                        ${property.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${statusColors}`}>
                          {property.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                            <Printer size={14} />
                          </button>
                          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                            <Edit size={14} />
                          </button>
                          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <V2Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            totalCount={totalCount} 
            limit={limit} 
          />
        </div>
      </div>
    </div>
  );
}
