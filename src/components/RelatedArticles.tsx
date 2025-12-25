import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";

export default async function RelatedArticles({ current }: { current: { id: string; category: string } }) {
  const sb = await supabaseServer();
  const { data } = await sb
    .from("posts")
    .select("title, slug, excerpt, category")
    .eq("published", true)
    .eq("category", current.category)
    .neq("id", current.id)
    .order("published_at", { ascending: false })
    .limit(4);

  const posts = data ?? [];
  if (!posts.length) return null;

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {posts.map((p: any) => (
          <Link key={p.slug} href={`/post/${p.slug}`} className="bg-white border rounded-xl p-4 hover:shadow-md transition">
            <div className="text-xs inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded mb-2">
              {p.category}
            </div>
            <div className="font-semibold text-gray-900">{p.title}</div>
            <div className="text-sm text-gray-600 mt-1 line-clamp-2">{p.excerpt}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
