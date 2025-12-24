import type { Metadata } from "next";
import "./globals.css";
import { BRAND, DEFAULT_DESC, DEFAULT_TITLE, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s – ${BRAND}` },
  description: DEFAULT_DESC,
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    url: SITE_URL,
    siteName: BRAND,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
