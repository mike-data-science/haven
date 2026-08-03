"use client";

import Link from "next/link";
import { ShieldAlert, Home, Compass } from "lucide-react";

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6">
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-800 bg-[#18181b] shadow-2xl">
          <ShieldAlert className="h-10 w-10 text-[var(--theme-accent, #3b82f6)]" />
        </div>
      </div>

      <h1 className="mb-2 text-7xl font-black tracking-tight bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
        404
      </h1>

      <h2 className="mb-3 text-xl font-bold text-slate-100">
        Page Not Found or Restricted
      </h2>

      <p className="mb-8 max-w-md text-sm leading-relaxed text-slate-400">
        The page you are looking for does not exist or you do not have authorization to access it with your current account role.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-xl bg-[var(--theme-accent, #3b82f6)] px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:opacity-90 active:scale-95"
        >
          <Home className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
        <Link
          href="/dashboard/discover"
          className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#18181b] px-6 py-2.5 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
        >
          <Compass className="h-4 w-4" />
          <span>Discover Properties</span>
        </Link>
      </div>
    </div>
  );
}
