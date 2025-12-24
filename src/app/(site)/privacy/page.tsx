import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "TRADE90 Privacy Policy: how we collect, use, and protect user information.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="text-gray-700 mb-4">
        This Privacy Policy explains how TRADE90 (“we”, “our”, “us”) collects, uses, and protects information when you use this website.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>Basic analytics data (such as pages visited, device type, and approximate location) to improve site performance.</li>
        <li>Information you provide voluntarily (for example, if you contact us by email).</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-2">Cookies</h2>
      <p className="text-gray-700 mb-4">
        We may use cookies to understand traffic and improve user experience. Cookies may also be used to serve advertising and measure ad performance.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Advertising (Google AdSense)</h2>
      <p className="text-gray-700 mb-4">
        When advertising is enabled, third-party vendors (including Google) may use cookies to serve ads based on your prior visits to this website or other websites.
        Google’s use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the internet.
      </p>
      <p className="text-gray-700 mb-4">
        Users may opt out of personalized advertising by visiting Google’s Ads Settings. You can also manage cookies in your browser settings.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Data Security</h2>
      <p className="text-gray-700 mb-4">
        We take reasonable steps to protect information, but no method of transmission over the internet is 100% secure.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Contact</h2>
      <p className="text-gray-700">
        If you have any questions about this Privacy Policy, contact: <span className="font-semibold">support@tradeninety.com</span>
      </p>
    </div>
  );
}
