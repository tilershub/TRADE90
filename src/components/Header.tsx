import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center bg-slate-900">
            <div className="text-center leading-none">
              <div className="text-white text-[10px] font-bold">TRADE</div>
              <div className="text-emerald-400 text-[10px] font-bold">90</div>
            </div>
          </div>
          <div>
            <div className="text-xl font-bold">TRADE90</div>
            <div className="text-emerald-400 text-xs">Master Forex Trading</div>
          </div>
        </Link>

        <nav className="hidden md:flex gap-4 text-sm">
          <Link className="hover:text-emerald-300" href="/about">About</Link>
          <Link className="hover:text-emerald-300" href="/contact">Contact</Link>
          <Link className="hover:text-emerald-300" href="/privacy">Privacy</Link>
          <Link className="hover:text-emerald-300" href="/terms">Terms</Link>
        </nav>
      </div>
    </header>
  );
}
