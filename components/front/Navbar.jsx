import Link from 'next/link';

// export function Navbar() {
//   return (
//     <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-line">
//       <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-5 flex items-center justify-between gap-6">
//         <Link href="/" className="font-serif font-bold text-2xl text-ink no-underline flex items-center gap-1.5 tracking-tight">
//           <span className="text-navy">⌂</span> Haven
//         </Link>
//         <div className="hidden md:flex gap-9 text-base font-bold">
//           <Link href="/listings" className="text-navy transition-colors">Properties</Link>
//           <Link href="/agents" className="text-slate hover:text-navy transition-colors">Agents</Link>
//           <Link href="/about" className="text-slate hover:text-navy transition-colors">About</Link>
//           <Link href="/contact" className="text-slate hover:text-navy transition-colors">Contact</Link>
//         </div>
//         <button className="px-5 py-2.5 rounded-full bg-navy text-white font-bold text-sm hover:bg-blue transition-colors">Sign in</button>
//       </div>
//     </nav>
//   );
// }

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 py-6 px-10">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 border border-line shadow-sm">
        <Link href="/" className="font-serif text-[28px] font-bold tracking-[-0.5px] text-ink flex items-center gap-1.5 no-underline">
          <span className="text-navy">⌂</span> Haven
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/listings" className="font-sans text-[15px] font-bold text-navy transition-colors hover:text-navy">Properties</Link>
          <Link href="/agents" className="font-sans text-[15px] font-bold text-slate transition-colors hover:text-navy">Agents</Link>
          <Link href="/about" className="font-sans text-[15px] font-bold text-slate transition-colors hover:text-navy">About</Link>
          <Link href="/contact" className="font-sans text-[15px] font-bold text-slate transition-colors hover:text-navy">Contact</Link>
        </div>
        <button className="bg-navy text-white font-sans text-[14px] font-bold py-[11px] px-6 rounded-[10px] cursor-pointer transition-transform hover:-translate-y-[2px] shadow-sm">Sign in</button>
      </div>
    </nav>
  );
}


