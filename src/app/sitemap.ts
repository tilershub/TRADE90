import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { supabaseServer } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sb = supabaseServer();
  const { data } = await sb.from("posts").select("slug, updated_at").eq("published", true);

  const staticRoutes = ["", "/about", "/contact", "/privacy", "/terms"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const postRoutes = (data ?? []).map((p: any) => ({
    url: `${SITE_URL}/post/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}
