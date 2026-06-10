export default function PurchaseButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex min-h-[42px] w-full items-center justify-center rounded-xl border border-transparent bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-55"
      disabled={loading}
    >
      {loading ? "Processing..." : "Complete Purchase"}
    </button>
  );
}
