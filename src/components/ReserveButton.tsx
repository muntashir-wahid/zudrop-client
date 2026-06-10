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
      className={`mt-4 w-full bg-black text-white py-2 rounded-lg disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed`}
    >
      {isLoading ? "Reserving..." : "Reserve"}
    </button>
  );
}
