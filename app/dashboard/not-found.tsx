"use client";

import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center font-sans">
      <h1 className="text-6xl md:text-8xl font-black text-[#1A1A18] mb-2 tracking-tight">404</h1>
      
      <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-4">
        Page Not Found
      </h2>

      <p className="mb-8 max-w-md text-sm md:text-base leading-relaxed text-slate-500">
        The page you are looking for does not exist or you do not have authorization to access it with your current account role.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
        <Link
          href="/dashboard"
          className="flex w-full sm:w-auto items-center justify-center rounded-full bg-[#1A1A18] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-black"
        >
          Back to Dashboard
        </Link>
        <Link
          href="/dashboard/discover"
          className="flex w-full sm:w-auto items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-bold text-[#1A1A18] transition-all hover:bg-slate-50"
        >
          Discover Properties
        </Link>
      </div>
    </div>
  );
}
