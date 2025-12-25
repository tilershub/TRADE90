import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/constants";
import RelatedArticles from "@/components/RelatedArticles";

export const revalidate = 60;

// ✅ Next 15 PageProps expects params as a Promise
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const sb = supabaseServer();
  const { data } = await sb
    .from("posts")
    .select("title, excerpt, meta_title, meta_description, featured_image, slug, published")
    .eq("slug", slug)
    .single();

  if (!data || !data.published) return { title: "Not found" };

  const title = data.meta_title || data.title;
  const description = data.meta_description || data.excerpt || "";
  const image = data.featured_image || "/og-image.jpg";

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/post/${data.slug}` },
    openGraph: { title, description, type: "article", images: [{ url: image }] },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  const sb = supabaseServer();
  const { data: post } = await sb.from("posts").select("*").eq("slug", slug).single();

  if (!post || !post.published) return <div className="text-gray-600">Post not found.</div>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author || "TRADE90" },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    image: post.featured_image ? [post.featured_image] : undefined,
    mainEntityOfPage: `${SITE_URL}/post/${post.slug}`,
  };

  return (
    <article className="max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-80 object-cover rounded-xl mb-6"
        />
      )}

      <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm mb-4">
        {post.category}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
      {post.excerpt && <p className="text-gray-600 mb-8">{post.excerpt}</p>}

      <div className="prose max-w-none whitespace-pre-wrap text-gray-800">{post.content}</div>

      <RelatedArticles current={{ id: post.id, category: post.category }} />
    </article>
  );
}