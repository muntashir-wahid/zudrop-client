interface IReserveButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function ReserveButton({
  onClick,
  disabled,
  isLoading,
}: IReserveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="inline-flex min-h-[42px] w-full items-center justify-center rounded-xl border border-transparent bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-55"
    >
      {isLoading ? "Reserving..." : "Reserve"}
    </button>
  );
}
