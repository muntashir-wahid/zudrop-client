import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-slate-800">
      <Dashboard />
      <Toaster />
    </main>
  );
}

export default App;
