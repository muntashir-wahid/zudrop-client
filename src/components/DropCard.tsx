import type { Drop } from "../types/drop";
import { toast } from "react-hot-toast";
import ReserveButton from "./ReserveButton";
import StockIndicator from "./StockIndicator";
import useUserSession from "../hooks/useUserSession";
import { useState } from "react";
import api from "../lib/http/axios";

const DropCard = ({ drop }: { drop: Drop }) => {
  const { username } = useUserSession();
  const [isReserving, setIsReserving] = useState(false);
  const [isReserved, setIsReserved] = useState(false);

  const handleReservation = async () => {
    if (drop.availableStock <= 0) {
      toast.error("Reservation failed. Please try again.");
      return;
    }

    const payload = {
      dropId: drop.id,
      username,
    };
    setIsReserving(true);
    try {
      const response = await api.post(
        `/drops/${drop.id}/reservations`,
        payload,
      );
      setIsReserved(true);
      toast.success("Reservation successful for next 60 seconds!");
      console.log("Reservation response:", response.data);
    } catch (error) {
      toast.error(
        (error as Error).message || "Reservation failed. Please try again.",
      );
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <div className="border rounded-xl p-5 shadow-sm bg-white w-full max-w-md">
      <h2 className="text-xl font-semibold">{drop.name}</h2>
      <StockIndicator stock={drop.availableStock} />

      <ReserveButton
        disabled={drop.availableStock <= 0}
        isLoading={isReserving}
        onClick={handleReservation}
      />
    </div>
  );
};

export default DropCard;
