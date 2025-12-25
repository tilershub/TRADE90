"use client";

import Link from "next/link";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RightMenu({ open, onClose }: Props) {
  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Right slide panel */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="p-5 border-b flex items-center justify-between">
          <div className="font-bold text-slate-900">TRADE90</div>
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="p-5 space-y-2">
          <Link onClick={onClose} className="block py-2 text-gray-800 hover:text-emerald-600" href="/">
            Home
          </Link>
          <Link onClick={onClose} className="block py-2 text-gray-800 hover:text-emerald-600" href="/brokers">
            Broker Reviews
          </Link>
          <Link onClick={onClose} className="block py-2 text-gray-800 hover:text-emerald-600" href="/about">
            About
          </Link>
          <Link onClick={onClose} className="block py-2 text-gray-800 hover:text-emerald-600" href="/contact">
            Contact
          </Link>
          <Link onClick={onClose} className="block py-2 text-gray-800 hover:text-emerald-600" href="/privacy">
            Privacy Policy
          </Link>
          <Link onClick={onClose} className="block py-2 text-gray-800 hover:text-emerald-600" href="/terms">
            Terms / Risk Disclaimer
          </Link>
        </nav>
      </aside>
    </>
  );
}