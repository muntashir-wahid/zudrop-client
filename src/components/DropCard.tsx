import type { Drop } from "../types/drop";
import { toast } from "react-hot-toast";
import ReserveButton from "./ReserveButton";
import StockIndicator from "./StockIndicator";
import useUserSession from "../hooks/useUserSession";
import { useState } from "react";
import api from "../lib/http/axios";
import CountdownTimer from "./CountdownTimer";
import PurchaseButton from "./PurchaseButton";
import RecentBuyers from "./RecentBuyers";

export type Reservation = {
  id: string;
  dropId: string;
  userId: string;
  expiresAt: string;
  status: "ACTIVE" | "EXPIRED";
  createdAt: string;
};

const normalizeReservation = (
  payload: Reservation | { data?: Reservation },
): Reservation | null => {
  const wrappedPayload = payload as { data?: Reservation };
  if (wrappedPayload.data) {
    return wrappedPayload.data;
  }

  return payload as Reservation;
};

const DropCard = ({ drop }: { drop: Drop }) => {
  const { username } = useUserSession();
  const [isReserving, setIsReserving] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
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
      setReservation(normalizeReservation(response.data));
      toast.success("Reservation successful for next 60 seconds!");
    } catch (error) {
      toast.error(
        (error as Error).message || "Reservation failed. Please try again.",
      );
    } finally {
      setIsReserving(false);
    }
  };

  const handlePurchase = async () => {
    if (!reservation) {
      toast.error("No active reservation found.");
      return;
    }

    setIsPurchasing(true);
    try {
      await api.post("/purchases", {
        dropId: drop.id,
        username,
      });
      toast.success("Purchase successful!");
      setReservation(null); // Clear reservation after purchase
    } catch (error) {
      toast.error(
        (error as Error).message || "Purchase failed. Please try again.",
      );
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="border rounded-xl p-5 shadow-sm bg-white w-full max-w-md flex flex-col justify-around">
      <h2 className="text-xl font-semibold">{drop.name}</h2>
      <StockIndicator stock={drop.availableStock} />

      <RecentBuyers buyers={drop.purchases ?? []} />

      {reservation ? (
        <div className="mt-4 text-green-600 font-medium">
          <CountdownTimer
            expiresAt={reservation.expiresAt}
            setReservation={setReservation}
          />

          <PurchaseButton onClick={handlePurchase} loading={isPurchasing} />
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
