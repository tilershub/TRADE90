import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact TRADE90 for inquiries about forex trading education content.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>

      <p className="text-gray-700 mb-4">
        For questions about our educational content, partnerships, or general inquiries, you can reach us via email:
      </p>

      <div className="bg-white border rounded-xl p-5">
        <div className="text-sm text-gray-500">Email</div>
        <div className="text-lg font-semibold">support@tradeninety.com</div>
        <div className="text-xs text-gray-500 mt-2">Please allow 24–72 hours for a response.</div>
      </div>
    </div>
  );
}
