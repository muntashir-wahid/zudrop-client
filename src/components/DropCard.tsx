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
    <article className="flex flex-col justify-between gap-4 rounded-[20px] border border-[#e5dfd6] bg-white p-5 shadow-[0_10px_24px_rgba(17,24,39,0.06)] transition-transform duration-150 hover:-translate-y-0.5 hover:border-[#d8d2c6] hover:shadow-[0_14px_30px_rgba(17,24,39,0.08)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold leading-6 tracking-tight text-slate-900">
            {drop.name}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {drop.description ?? "Limited drop available for a short time."}
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center rounded-full border border-[#e5dfd6] bg-[#f8f6f1] px-3 py-1.5 text-sm font-semibold text-slate-700">
          ${drop.price.toFixed(2)}
        </span>
      </div>

      <StockIndicator stock={drop.availableStock} />

      <RecentBuyers buyers={drop.purchases ?? []} />

      {reservation ? (
        <div>
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
    </article>
  );
};

export default DropCard;
