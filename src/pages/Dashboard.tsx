import { useEffect, useState } from "react";

import api from "../lib/http/axios";
import type { Drop } from "../types/drop";
import DropCard from "../components/DropCard";

const Dashboard = () => {
  const [data, setData] = useState<Drop[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get("/drops")
      .then((response) => {
        const drops = response.data as Drop[];
        setData(drops);
      })
      .catch((error) => {
        console.error("Error fetching drops:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 grid gap-4 md:grid-cols-2">
      {data.map((drop) => (
        <DropCard key={drop.id} drop={drop} />
      ))}
    </div>
  );
};

export default Dashboard;
