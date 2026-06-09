import type { Drop } from "../types/drop";
import StockIndicator from "./StockIndicator";

const DropCard = ({ drop }: { drop: Drop }) => {
  return (
    <div className="border rounded-xl p-5 shadow-sm bg-white w-full max-w-md">
      <h2 className="text-xl font-semibold">{drop.name}</h2>
      <StockIndicator stock={drop.availableStock} />
    </div>
  );
};

export default DropCard;
