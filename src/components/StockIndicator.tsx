const StockIndicator = ({ stock }: { stock: number }) => {
  return (
    <div className="mt-2 text-sm">
      <span className="font-medium">Stock:</span>{" "}
      <span className={stock > 0 ? "text-green-600" : "text-red-600"}>
        {stock}
      </span>
    </div>
  );
};

export default StockIndicator;
