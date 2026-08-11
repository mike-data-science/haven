"use client";

import { useRouter } from "next/navigation";

interface V2PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
}

export default function V2Pagination({ currentPage, totalPages, totalCount, limit }: V2PaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(`/v2/listings?page=${page}&limit=${limit}`);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    router.push(`/v2/listings?page=1&limit=${newLimit}`);
  };

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount);

  return (
    <div className="border-t border-gray-100 p-4 flex items-center justify-between bg-white text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <span>Showing data</span>
        <select 
          className="border border-gray-200 rounded-md px-2 py-1 bg-transparent"
          value={limit}
          onChange={handleLimitChange}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div>
        Showing {totalCount === 0 ? 0 : startItem}-{endItem} from {totalCount} data
      </div>
      <div className="flex gap-1">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
        >
          &lt;
        </button>
        
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum = currentPage;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else {
            if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
          }

          return (
            <button 
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentPage === pageNum 
                  ? "bg-[#E1F036] text-black font-bold" 
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
