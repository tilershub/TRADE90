"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { CATEGORIES_FALLBACK } from "@/lib/constants";

type PostRow = any;

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminPostEditor() {
  const supabase = supabaseBrowser();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const postId = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [cats, setCats] = useState<string[]>(CATEGORIES_FALLBACK);

  const [post, setPost] = useState<PostRow | null>(null);

  // form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("TRADE90 Team");
  const [category, setCategory] = useState("Basics");

  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);

  const [featuredImage, setFeaturedImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  // SEO fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const seoTitleCount = metaTitle.length;
  const seoDescCount = metaDescription.length;

  const canSave = useMemo(() => {
    return title.trim().length > 0 && slug.trim().length > 0 && content.trim().length > 0;
  }, [title, slug, content]);

  async function loadCategories() {
    const { data } = await supabase.from("categories").select("name").order("name");
    const list = (data ?? []).map((x: any) => x.name as string);
    if (list.length) setCats(list);
  }

  async function loadPost() {
    if (!postId) return;
    setLoading(true);

    await loadCategories();

    const { data, error } = await supabase.from("posts").select("*").eq("id", postId).single();
    if (error || !data) {
      setLoading(false);
      return;
    }

    setPost(data);

    setTitle(data.title || "");
    setSlug(data.slug || "");
    setExcerpt(data.excerpt || "");
    setContent(data.content || "");
    setAuthor(data.author || "TRADE90 Team");
    setCategory(data.category || "Basics");

    setPublished(!!data.published);
    setFeatured(!!data.featured);

    setFeaturedImage(data.featured_image || "");

    setMetaTitle(data.meta_title || "");
    setMetaDescription(data.meta_description || "");
    setKeywords(data.keywords || "");

    setLoading(false);
  }

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  async function uploadImage(file: File) {
    // Validate type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    setUploading(true);

    try {
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${Math.random().toString(36).slice(2)}-${Date.now()}.${ext}`;

      const { error } = await supabase.storage.from("blog-images").upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (error) throw error;

      const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
      const publicUrl = data.publicUrl;

      setFeaturedImage(publicUrl);
    } catch (e) {
      console.error(e);
      alert("Upload failed. Check bucket name + policies (blog-images).");
    } finally {
      setUploading(false);
    }
  }

  async function handleImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    await uploadImage(f);
  }

  async function save() {
    if (!postId) return;
    if (!canSave) {
      alert("Please fill Title, Slug, and Content.");
      return;
    }

    setSaving(true);

    const now = new Date().toISOString();

    // If publishing now and no published_at, set it
    const publishedAt = published ? (post?.published_at ? post.published_at : now) : null;

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      author: author.trim() || "TRADE90 Team",
      category,
      published,
      featured,
      featured_image: featuredImage || null,
      meta_title: metaTitle.trim() || null,
      meta_description: metaDescription.trim() || null,
      keywords: keywords.trim() || null,
      published_at: publishedAt,
      updated_at: now,
    };

    const { error } = await supabase.from("posts").update(payload).eq("id", postId);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    // Reload to reflect latest state
    await loadPost();
    alert("Saved ✅");
  }

  async function deletePost() {
    if (!postId) return;
    const ok = confirm("Delete this post permanently?");
    if (!ok) return;

    setDeleting(true);
    const { error } = await supabase.from("posts").delete().eq("id", postId);
    setDeleting(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/posts");
  }

  function autoSlug() {
    const s = slugify(title);
    setSlug(s);
  }

  if (loading) {
    return <div className="p-6">Loading editor…</div>;
  }

  if (!post) {
    return (
      <div className="p-6">
        <div className="text-gray-700">Post not found.</div>
        <Link className="text-emerald-600 hover:underline" href="/admin/posts">
          ← Back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-2xl font-bold">Edit Post</div>
          <div className="text-sm text-gray-600">ID: {postId}</div>
        </div>

        <div className="flex gap-2">
          <Link className="px-4 py-2 rounded-lg border hover:bg-gray-50" href="/admin/posts">
            ← Back
          </Link>

          <Link className="px-4 py-2 rounded-lg border hover:bg-gray-50" href={`/post/${slug}`} target="_blank">
            View
          </Link>

          <button
            onClick={save}
            disabled={saving || uploading || !canSave}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>

          <button
            onClick={deletePost}
            disabled={deleting}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Main editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border rounded-xl p-5">
            <div className="font-semibold mb-4">Content</div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post title"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Slug</label>
                  <input
                    className="w-full border rounded-lg px-4 py-2 mt-1"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug"
                  />
                </div>
                <div className="flex items-end">
                  <button type="button" onClick={autoSlug} className="w-full px-4 py-2 rounded-lg border hover:bg-gray-50">
                    Auto-generate
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select
                    className="w-full border rounded-lg px-4 py-2 mt-1"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {cats.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="text-xs text-gray-500 mt-1">
                    Need a new category? Add it in{" "}
                    <Link className="text-emerald-600 hover:underline" href="/admin/categories">
                      Categories
                    </Link>
                    .
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Author</label>
                  <input
                    className="w-full border rounded-lg px-4 py-2 mt-1"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="TRADE90 Team"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Excerpt</label>
                <textarea
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short summary shown on cards and Google snippets (recommended)."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Content</label>
                <textarea
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                  rows={14}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article here..."
                />
                <div className="text-xs text-gray-500 mt-1">
                  Tip: For AdSense approval, aim for original educational content (800–1200 words).
                </div>
              </div>
            </div>
          </div>

          {/* SEO box */}
          <div className="bg-white border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">SEO Settings</div>
              <div className="text-xs text-gray-500">
                Title {seoTitleCount}/60 · Description {seoDescCount}/160
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Meta Title</label>
                <input
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Example: What Is Leverage in Forex? (Beginner Guide) – TRADE90"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="140–160 characters. Clear educational summary. No promises."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Keywords</label>
                <input
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="forex trading, leverage, risk management, trading psychology"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Publishing + Image */}
        <div className="space-y-6">
          <div className="bg-white border rounded-xl p-5">
            <div className="font-semibold mb-4">Publishing</div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                Publish (visible to public)
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                Featured (show on Home Featured section)
              </label>

              <div className="text-xs text-gray-500">Published posts appear on the website and in sitemap.</div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <div className="font-semibold mb-4">Featured Image</div>

            {featuredImage ? (
              <div className="space-y-3">
                <img src={featuredImage} alt="Featured" className="w-full h-48 object-cover rounded-lg border" />
                <div className="flex gap-2">
                  <label className="flex-1 px-4 py-2 rounded-lg border hover:bg-gray-50 cursor-pointer text-center">
                    {uploading ? "Uploading…" : "Replace"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImagePick}
                      disabled={uploading}
                    />
                  </label>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    onClick={() => setFeaturedImage("")}
                    disabled={uploading}
                  >
                    Remove
                  </button>
                </div>
                <div className="text-xs text-gray-500 break-all">{featuredImage}</div>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">🖼️</div>
                <div className="text-sm text-gray-700 mb-2">Upload an image (JPG/PNG/GIF, max 5MB)</div>
                <label className="inline-block px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer">
                  {uploading ? "Uploading…" : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImagePick}
                    disabled={uploading}
                  />
                </label>
              </div>
            )}
          </div>

          <div className="bg-white border rounded-xl p-5">
            <div className="font-semibold mb-2">AdSense checklist (quick)</div>
            <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
              <li>Publish 10–15 original posts</li>
              <li>Have About, Contact, Privacy, Terms</li>
              <li>No “guaranteed profit” claims</li>
              <li>Educational tone + risk disclaimer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
