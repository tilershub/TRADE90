"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("trade90_cookie_ok");
    if (!v) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[420px] bg-white border shadow-lg rounded-xl p-4 z-50">
      <div className="text-sm text-gray-700">
        We use cookies to improve experience and measure traffic. Ads may be served by third-party vendors (including Google).
      </div>
      <div className="flex gap-2 mt-3">
        <button
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-600"
          onClick={() => {
            localStorage.setItem("trade90_cookie_ok", "1");
            setShow(false);
          }}
        >
          Accept
        </button>
        <button className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50" onClick={() => setShow(false)}>
          Close
        </button>
      </div>
    </div>
  );
}
