export function Footer() {
  return (
    <footer className="w-full bg-[#1A1A18] text-white/80 py-8 text-center border-t border-white/10 mt-16">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-sm sm:text-base font-medium">&copy; {new Date().getFullYear()} Haven Realty. All rights reserved.</p>
      </div>
    </footer>
  );
}
