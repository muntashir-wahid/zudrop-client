import { useEffect, useState } from "react";
import type { Reservation } from "./DropCard";

export default function CountdownTimer({
  expiresAt,
  setReservation,
}: {
  expiresAt: string;
  setReservation: React.Dispatch<React.SetStateAction<Reservation | null>>;
}) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    const initialTimeLeft = Math.max(0, Math.floor(diff / 1000));

    return initialTimeLeft;
  });

  useEffect(() => {
    if (timeLeft === 0) {
      setReservation(null);
    }
  }, [timeLeft, setReservation]);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      setTimeLeft(Math.max(0, Math.floor(diff / 1000)));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="mb-3 text-sm font-semibold text-amber-700">
      Reservation expires in: {timeLeft}s
    </div>
  );
}
