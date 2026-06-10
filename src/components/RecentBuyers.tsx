import type { Purchase } from "../types/drop";

// components/RecentBuyers.tsx
export default function RecentBuyers({ buyers }: { buyers: Purchase[] }) {
  return (
    <div className="mt-3">
      <h4 className="text-xs font-semibold text-gray-500">Recent Buyers</h4>

      <div className="flex gap-2 mt-1 flex-wrap">
        {buyers?.map((b, i) => (
          <span
            key={`${b.username}-${b.purchasedAt}-${i}`}
            className="text-xs bg-gray-100 px-2 py-1 rounded capitalize"
          >
            {b.username.split("_").join(" ")}
          </span>
        ))}
      </div>
    </div>
  );
}
