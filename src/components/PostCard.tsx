import Link from "next/link";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  featured_image: string | null;
  published_at: string | null;
  featured?: boolean;
};

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border">
      {post.featured_image && (
        <img src={post.featured_image} alt={post.title} className="w-full h-44 object-cover" />
      )}
      <div className="p-5">
        <div className="inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs mb-3">
          {post.category}{post.featured ? " • Featured" : ""}
        </div>
        <div className="text-lg font-bold text-gray-900">{post.title}</div>
        {post.excerpt && <p className="text-gray-600 text-sm mt-2 line-clamp-3">{post.excerpt}</p>}
        <div className="text-xs text-gray-500 mt-4">{formatDate(post.published_at)}</div>
      </div>
    </Link>
  );
}
