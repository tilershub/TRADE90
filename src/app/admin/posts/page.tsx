"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { CATEGORIES_FALLBACK } from "@/lib/constants";

type PostRow = any;

export default function AdminPosts() {
  const supabase = supabaseBrowser();
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [cats, setCats] = useState<string[]>(CATEGORIES_FALLBACK);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const { data: catRows } = await supabase.from("categories").select("name").order("name");
    const catList = (catRows ?? []).map((c: any) => c.name as string);
    if (catList.length) setCats(catList);

    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const count = useMemo(() => posts.length, [posts]);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  async function createDraft() {
    const now = new Date().toISOString();
    const title = "New Post";
    const slug = `new-post-${Date.now()}`;
    await supabase.from("posts").insert({
      title,
      slug,
      content: "Write your article here...",
      excerpt: "Short excerpt...",
      author: "TRADE90 Team",
      category: cats[0] || "Basics",
      published: false,
      featured: false,
      created_at: now,
      updated_at: now,
    });
    await load();
  }

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-2xl font-bold">TRADE90 Admin</div>
          <div className="text-sm text-gray-600">Posts ({count})</div>
        </div>
        <div className="flex gap-2">
          <Link className="px-4 py-2 rounded-lg border hover:bg-gray-50" href="/admin/categories">
            Categories
          </Link>
          <button onClick={createDraft} className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600">
            + New Draft
          </button>
          <button onClick={logout} className="px-4 py-2 rounded-lg border hover:bg-gray-50">
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-3 p-4 text-xs font-semibold text-gray-500 bg-gray-50">
          <div className="col-span-5">Title</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Featured</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {posts.map((p) => (
          <div key={p.id} className="grid grid-cols-12 gap-3 p-4 border-t items-center">
            <div className="col-span-5">
              <div className="font-semibold">{p.title}</div>
              <div className="text-xs text-gray-500">{p.slug}</div>
            </div>
            <div className="col-span-2 text-sm">{p.category}</div>
            <div className="col-span-2 text-sm">{p.published ? "Published" : "Draft"}</div>
            <div className="col-span-1 text-sm">{p.featured ? "Yes" : "No"}</div>
            <div className="col-span-2 text-right">
              <Link className="text-emerald-600 hover:underline" href={`/admin/posts/edit/${p.id}`}>
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
