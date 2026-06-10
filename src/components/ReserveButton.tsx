export default function ReserveButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-4 w-full bg-black text-white py-2 rounded-lg disabled:opacity-50"
    >
      Reserve
    </button>
  );
}
