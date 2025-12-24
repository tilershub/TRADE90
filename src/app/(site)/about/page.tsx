import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about TRADE90 and our educational approach to forex trading.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About TRADE90</h1>

      <p className="text-gray-700 mb-4">
        TRADE90 is an educational platform focused on forex trading fundamentals, risk management,
        trading psychology, and disciplined method-based learning.
      </p>

      <p className="text-gray-700 mb-4">
        Our goal is to help learners understand how markets work and develop disciplined habits.
        We do not provide financial advice, investment recommendations, or “guaranteed profit” systems.
      </p>

      <div className="bg-white border rounded-xl p-5">
        <h2 className="text-xl font-bold mb-2">Important Disclaimer</h2>
        <p className="text-gray-700">
          Trading involves risk and may not be suitable for everyone. Past performance does not guarantee
          future results. The content on this site is for educational and informational purposes only.
        </p>
      </div>
    </div>
  );
}
