import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-lg font-bold mb-2">TRADE90</div>
            <p className="text-gray-400 text-sm">
              Educational content only — not financial advice. Trading involves risk of loss.
            </p>
          </div>

          <div>
            <div className="font-bold mb-3">Quick Links</div>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link className="hover:text-white" href="/about">About</Link></li>
              <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-white" href="/privacy">Privacy Policy</Link></li>
              <li><Link className="hover:text-white" href="/terms">Terms & Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-bold mb-3">Connect</div>
            <p className="text-gray-400 text-sm">tradeninety.com</p>
            <p className="text-gray-400 text-sm">Email: support@tradeninety.com</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} TRADE90. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
