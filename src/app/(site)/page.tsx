import { supabaseServer } from "@/lib/supabase/server";
import PostCard, { Post } from "@/components/PostCard";
import BrokerReviewCard from "@/components/BrokerReviewCard";

export const revalidate = 60;

export default async function HomePage() {
  const sb = await supabaseServer();

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
      {/* ✅ Replaced hero warning card with Broker Review Card */}
      <BrokerReviewCard
        brokerName="Best Broker for Beginners (Example)"
        rating={4.7}
        trustScore={90}
        pros={["Low spreads on majors", "Fast withdrawals", "Beginner-friendly platforms"]}
        cons={["Not available in some regions"]}
      />

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