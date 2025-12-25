import Link from "next/link";

type Props = {
  brokerName?: string;
  rating?: number; // out of 5
  trustScore?: number; // out of 100
  pros?: string[];
  cons?: string[];
  note?: string;
};

export default function BrokerReviewCard({
  brokerName = "Top Broker (Example)",
  rating = 4.6,
  trustScore = 88,
  pros = ["Low spreads on majors", "Fast withdrawals", "Strong regulation"],
  cons = ["Higher fees on some pairs"],
  note = "Always verify regulation for your country and read the risk disclosure before trading.",
}: Props) {
  return (
    <section className="bg-white rounded-2xl border shadow-sm p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-emerald-700 bg-emerald-50 inline-flex px-3 py-1 rounded-full border border-emerald-100">
            Broker Review
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-3">
            {brokerName}
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            Rating: <span className="font-semibold text-slate-900">{rating.toFixed(1)}/5</span> · Trust Score:{" "}
            <span className="font-semibold text-slate-900">{trustScore}/100</span>
          </p>
        </div>

        <div className="text-right">
          <Link
            href="/brokers"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm"
          >
            View All Brokers →
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4">
          <div className="font-semibold text-slate-900 mb-2">Pros</div>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-4">
          <div className="font-semibold text-slate-900 mb-2">Cons</div>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 text-xs text-gray-500">
        {note}
      </div>
    </section>
  );
}