import DropCard from "../components/DropCard";
import { mockDrops } from "../mocks/drops";

const Dashboard = () => {
  const data = mockDrops;

  return (
    <div className="p-6 grid gap-4 md:grid-cols-2">
      {data.map((drop) => (
        <DropCard key={drop.id} drop={drop} />
      ))}
    </div>
  );
};

export default Dashboard;
