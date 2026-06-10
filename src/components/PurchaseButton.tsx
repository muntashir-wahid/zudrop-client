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
      className="mt-3 w-full bg-green-600 text-white cursor-pointer py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      disabled={loading}
    >
      {loading ? "Processing..." : "Complete Purchase"}
    </button>
  );
}
