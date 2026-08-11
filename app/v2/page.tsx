"use client";

import { useState } from "react";
import V2Navbar from "@/components/v2/V2Navbar";

export default function V2LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sora selection:bg-[#E1F036] selection:text-black">
      <V2Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
}
