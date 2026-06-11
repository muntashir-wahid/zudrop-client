import type { Purchase } from "../types/drop";

// components/RecentBuyers.tsx
export default function RecentBuyers({ buyers }: { buyers: Purchase[] }) {
  return (
    <div>
      <h4 className="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-slate-500">
        Recent buyers
      </h4>

      <div className="flex flex-wrap gap-2">
        {buyers?.map((b, i) => (
          <span
            key={`${b.username}-${b.purchasedAt}-${i}`}
            className="inline-flex items-center rounded-full border border-[#e5dfd6] bg-[#f8f6f1] px-2.5 py-1 text-xs text-slate-700 capitalize"
          >
            {b.username.split("_").join(" ")}
          </span>
        ))}
      </div>
    </div>
  );
}
