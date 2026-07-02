import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-line">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-5 flex items-center justify-between gap-6">
        <Link href="/" className="font-serif font-bold text-2xl text-ink no-underline flex items-center gap-1.5 tracking-tight">
          <span className="text-navy">⌂</span> Haven
        </Link>
        <div className="hidden md:flex gap-9 text-base font-bold">
          <Link href="/listings" className="text-navy transition-colors">Properties</Link>
          <Link href="/agents" className="text-slate hover:text-navy transition-colors">Agents</Link>
          <Link href="/about" className="text-slate hover:text-navy transition-colors">About</Link>
          <Link href="/contact" className="text-slate hover:text-navy transition-colors">Contact</Link>
        </div>
        <button className="px-5 py-2.5 rounded-full bg-navy text-white font-bold text-sm hover:bg-blue transition-colors">Sign in</button>
      </div>
    </nav>
  );
}
