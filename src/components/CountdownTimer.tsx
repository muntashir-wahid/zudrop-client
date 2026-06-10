import { useEffect, useState } from "react";

export default function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    return Math.max(0, Math.floor(diff / 1000));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      setTimeLeft(Math.max(0, Math.floor(diff / 1000)));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="text-sm text-orange-600 font-medium">
      Reservation expires in: {timeLeft}s
    </div>
  );
}
