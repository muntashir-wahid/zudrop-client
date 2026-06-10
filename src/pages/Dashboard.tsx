import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import DropCard from "../components/DropCard";
import useDrops from "../hooks/useDrops";

const Dashboard = () => {
  const { drops, isLoading, lastUpdatedAt, socketStatus } = useDrops();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Live drops</h1>
          <p className="text-sm text-slate-500">
            Stock updates sync automatically while you browse.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${
              socketStatus === "live"
                ? "bg-emerald-50 text-emerald-700"
                : socketStatus === "reconnecting"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-slate-100 text-slate-600"
            }`}
          >
            {socketStatus === "live" ? (
              <Wifi className="h-3.5 w-3.5" />
            ) : socketStatus === "reconnecting" ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <WifiOff className="h-3.5 w-3.5" />
            )}
            {socketStatus === "live"
              ? "Live"
              : socketStatus === "reconnecting"
                ? "Reconnecting"
                : "Offline"}
          </span>

          {lastUpdatedAt ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
              Updated just now
            </span>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {drops.map((drop) => (
          <DropCard key={drop.id} drop={drop} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
