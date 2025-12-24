"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { CATEGORIES_FALLBACK } from "@/lib/constants";

export default function AdminCategories() {
  const supabase = supabaseBrowser();
  const [cats, setCats] = useState<string[]>(CATEGORIES_FALLBACK);
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    const { data } = await supabase.from("categories").select("name").order("name");
    const list = (data ?? []).map((x: any) => x.name as string);
    if (list.length) setCats(list);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addCategory() {
    setErr("");
    const v = name.trim();
    if (!v) return;

    const { error } = await supabase.from("categories").insert({ name: v });
    if (error) setErr(error.message);
    else {
      setName("");
      await load();
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="text-2xl font-bold">Categories</div>
        <Link className="px-4 py-2 rounded-lg border hover:bg-gray-50" href="/admin/posts">
          ← Back
        </Link>
      </div>

      <div className="bg-white border rounded-xl p-5">
        <div className="font-semibold mb-3">Add new category</div>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-lg px-4 py-2"
            placeholder="e.g. Market News"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={addCategory} className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600">
            Add
          </button>
        </div>
        {err && <div className="text-sm bg-red-50 text-red-700 p-2 rounded mt-3">{err}</div>}

        <div className="mt-6">
          <div className="font-semibold mb-2">Existing</div>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {cats.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
