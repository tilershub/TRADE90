import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Adsense from "@/components/Adsense";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10 flex-1">{children}</main>
      <Footer />
      <CookieConsent />
      <Adsense />
    </div>
  );
}
