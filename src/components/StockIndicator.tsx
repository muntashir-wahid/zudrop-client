const StockIndicator = ({ stock }: { stock: number }) => {
  return (
    <div className="flex items-center justify-between gap-3 pt-1">
      <span className="text-[0.82rem] font-semibold uppercase tracking-[0.06em] text-slate-500">
        Available stock
      </span>
      <span
        className={`inline-flex min-w-12 items-center justify-center rounded-full border px-3 py-1.5 text-sm font-bold ${
          stock > 0
            ? "border-[#e5dfd6] bg-[#f8f6f1] text-slate-700"
            : "border-rose-200 bg-rose-50 text-rose-700"
        }`}
      >
        {stock}
      </span>
    </div>
  );
};

export default StockIndicator;
