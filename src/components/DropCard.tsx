import type { Drop } from "../types/drop";
import { toast } from "react-hot-toast";
import ReserveButton from "./ReserveButton";
import StockIndicator from "./StockIndicator";
import useUserSession from "../hooks/useUserSession";
import { useState } from "react";
import api from "../lib/http/axios";
import CountdownTimer from "./CountdownTimer";
import PurchaseButton from "./PurchaseButton";

/*
{
    "id": "cmq85a0hc0006t3rsnnfe6mat",
    "dropId": "cmq81ug530003qrrsxl6f7ahb",
    "userId": "cmq852m0v0001t3rstzt971mr",
    "expiresAt": "2026-06-10T14:10:05.520Z",
    "status": "ACTIVE",
    "createdAt": "2026-06-10T14:09:05.520Z"
}

*/

export type Reservation = {
  id: string;
  dropId: string;
  userId: string;
  expiresAt: string;
  status: "ACTIVE" | "EXPIRED";
  createdAt: string;
};

const DropCard = ({ drop }: { drop: Drop }) => {
  const { username } = useUserSession();
  const [isReserving, setIsReserving] = useState(false);
  const [reservation, setReservation] = useState<Reservation | null>(null);

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
      setReservation(response.data);
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

      {reservation ? (
        <div className="mt-4 text-green-600 font-medium">
          <CountdownTimer
            expiresAt={reservation.expiresAt}
            setReservation={setReservation}
          />

          <PurchaseButton onClick={() => {}} loading={false} />
        </div>
      ) : (
        <ReserveButton
          onClick={handleReservation}
          disabled={drop.availableStock <= 0}
          isLoading={isReserving}
        />
      )}
    </div>
  );
};

export default DropCard;
