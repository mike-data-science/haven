"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center font-sans">
      <h1 className="text-6xl md:text-8xl font-black text-[#1A1A18] mb-2 tracking-tight">404</h1>
      <h2 className="text-xl md:text-2xl font-bold text-slate-600 mb-4">Page Not Found</h2>
      <p className="max-w-md text-sm md:text-base text-slate-500 mb-8 leading-relaxed">
        The page you are looking for does not exist or you do not have authorization to access it.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
        <Link
          href="/"
          className="flex w-full sm:w-auto items-center justify-center rounded-full bg-[#1A1A18] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-black"
        >
          Return Home
        </Link>
        <Link
          href="/dashboard"
          className="flex w-full sm:w-auto items-center justify-center rounded-full border border-[#E8E5DF] bg-white px-8 py-3 text-sm font-bold text-[#1A1A18] transition-all hover:bg-slate-50"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
