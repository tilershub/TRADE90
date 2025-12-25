"use client";

import { useState } from "react";
import Link from "next/link";
import RightMenu from "@/components/RightMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          {/* Logo */}
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

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-4 text-sm">
            <Link className="hover:text-emerald-300" href="/brokers">Brokers</Link>
            <Link className="hover:text-emerald-300" href="/about">About</Link>
            <Link className="hover:text-emerald-300" href="/contact">Contact</Link>
            <Link className="hover:text-emerald-300" href="/privacy">Privacy</Link>
            <Link className="hover:text-emerald-300" href="/terms">Terms</Link>
          </nav>

          {/* Mobile hamburger (right side) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden px-3 py-2 rounded-lg border border-white/20 hover:bg-white/10"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Right slide menu */}
      <RightMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}