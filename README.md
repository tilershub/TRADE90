# TRADE90 Next.js Blog (SEO + AdSense Ready)

Tech:
- Next.js (App Router) + Tailwind
- Supabase (Posts table + Categories table + Storage bucket `blog-images`)
- Netlify deploy (build: `npm run build`)

## Environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://tradeninety.com
NEXT_PUBLIC_SUPABASE_URL=https://owfmkipjebsybmmzkpmm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY

# Optional after AdSense approval
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
```

Add the same variables in Netlify Site Settings → Environment Variables.

## Supabase requirements

- `posts` table with: title, slug, content, excerpt, author, category, published, featured_image, published_at, created_at, updated_at
- Additional columns supported: meta_title, meta_description, keywords, featured (boolean)
- `categories` table with `name`
- Storage bucket: `blog-images` (public) with policies for public read and authenticated upload/delete

## Admin

- `/admin` login
- `/admin/posts` list + create draft
- `/admin/posts/edit/:id` editor (publish, featured, image upload, SEO fields)
- `/admin/categories` category manager

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Netlify

- Build command: `npm run build`
- Node: 20
- Environment variables set (see above)
