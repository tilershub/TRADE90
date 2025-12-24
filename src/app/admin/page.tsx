"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function AdminLogin() {
  const supabase = supabaseBrowser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = "/admin/posts";
    });
  }, [supabase]);

  async function login() {
    setErr("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setErr(error.message);
    else window.location.href = "/admin/posts";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-full border-4 border-gray-200 flex items-center justify-center bg-slate-900">
            <div className="text-center leading-none">
              <div className="text-white font-bold text-sm">TRADE</div>
              <div className="text-emerald-400 font-bold text-sm">90</div>
            </div>
          </div>
          <div className="mt-3 font-bold text-xl">Admin Login</div>
          <div className="text-gray-500 text-sm">Manage posts and categories</div>
        </div>

        <div className="space-y-3">
          <input
            className="w-full border rounded-lg px-4 py-2"
            placeholder="admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border rounded-lg px-4 py-2"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? login() : null)}
          />
          {err && <div className="text-sm bg-red-50 text-red-700 p-2 rounded">{err}</div>}
          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
