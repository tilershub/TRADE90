import { supabaseServer } from "@/lib/supabase/server";
import PostCard, { Post } from "@/components/PostCard";

export const revalidate = 60;

export default async function HomePage() {
  const sb = supabaseServer();

  const { data: featured } = await sb
    .from("posts")
    .select("id,title,slug,excerpt,category,featured_image,published_at,featured")
    .eq("published", true)
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(3);

  const { data: posts } = await sb
    .from("posts")
    .select("id,title,slug,excerpt,category,featured_image,published_at,featured")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(30);

  return (
    <div>
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-xl p-8 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">TRADE90 Forex Trading Blog</h1>
        <p className="text-gray-200 max-w-2xl">
          Learn technical analysis, risk management, and trading psychology. Educational content only — not financial advice.
        </p>
      </section>

      {(featured ?? []).length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Featured</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(featured as Post[]).map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(posts as Post[] | null)?.map((p) => (
            <PostCard key={p.id} post={p} />
          )) ?? null}
        </div>
      </section>
    </div>
  );
}
