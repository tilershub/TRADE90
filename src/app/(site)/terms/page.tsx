import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Disclaimer",
  description: "TRADE90 Terms of Service and Risk Disclaimer for educational forex content.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Terms & Risk Disclaimer</h1>

      <p className="text-gray-700 mb-4">
        By accessing and using this website, you agree to the terms below. If you do not agree, please discontinue use.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Educational Purpose Only</h2>
      <p className="text-gray-700 mb-4">
        All content on TRADE90 is provided for educational and informational purposes only. Nothing on this website should be considered financial advice,
        investment advice, or a recommendation to buy or sell any financial instrument.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Risk Warning</h2>
      <p className="text-gray-700 mb-4">
        Trading foreign exchange (forex), CFDs, and other leveraged products involves significant risk and may not be suitable for all investors.
        You may lose some or all of your capital. Past performance does not guarantee future results.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">No Guarantees</h2>
      <p className="text-gray-700 mb-4">
        We do not guarantee results, profits, or performance. Any examples shown are for educational illustration only.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">External Links</h2>
      <p className="text-gray-700 mb-4">
        This website may contain links to third-party websites. We do not control or endorse third-party content and are not responsible for their policies.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Contact</h2>
      <p className="text-gray-700">
        Questions? Contact: <span className="font-semibold">support@tradeninety.com</span>
      </p>
    </div>
  );
}
