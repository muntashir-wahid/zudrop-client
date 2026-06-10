import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import DropCard from "../components/DropCard";
import useDrops from "../hooks/useDrops";

const Dashboard = () => {
  const { drops, isLoading, lastUpdatedAt, socketStatus } = useDrops();
  const socketStateLabel =
    socketStatus === "live"
      ? "Live"
      : socketStatus === "reconnecting"
        ? "Reconnecting"
        : "Offline";

  if (isLoading) {
    return (
      <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))] py-6 sm:py-8">
        <div className="rounded-[20px] border border-[#e5dfd6] bg-white px-5 py-8 text-center text-sm text-slate-500 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">
          Loading drops…
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))] py-6 sm:py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#e5dfd6] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            ZuDrop
          </p>
          <h1 className="text-[clamp(1.4rem,2vw,1.9rem)] font-bold tracking-tight text-slate-900">
            Live drops
          </h1>
          <p className="mt-2 max-w-[56ch] text-sm leading-6 text-slate-500 sm:text-[0.96rem]">
            Stock updates sync automatically while you browse.
          </p>
        </div>

        <div className="flex flex-wrap justify-start gap-2 sm:justify-end">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${
              socketStatus === "live"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : socketStatus === "reconnecting"
                  ? "border-amber-200 bg-amber-50 text-amber-700"
                  : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            {socketStatus === "live" ? (
              <Wifi className="h-3.5 w-3.5" />
            ) : socketStatus === "reconnecting" ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <WifiOff className="h-3.5 w-3.5" />
            )}
            {socketStateLabel}
          </span>

          {lastUpdatedAt ? (
            <span className="inline-flex items-center rounded-full border border-[#e5dfd6] bg-[#f8f6f1] px-3 py-2 text-xs font-medium text-slate-500">
              Updated just now
            </span>
          ) : null}
        </div>
      </div>

      {drops.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {drops.map((drop) => (
            <DropCard key={drop.id} drop={drop} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-[20px] border border-[#e5dfd6] bg-white px-5 py-8 text-center shadow-[0_10px_24px_rgba(17,24,39,0.06)]">
          <p className="mb-2 text-base font-semibold text-slate-900">
            No drops right now
          </p>
          <p className="mx-auto max-w-lg text-sm leading-6 text-slate-500">
            When the server sends a new drop, it will appear here automatically.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
