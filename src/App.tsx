import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-slate-800">
      <main>
        <Dashboard />
      </main>

      <footer className="mx-auto container pb-6 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e5dfd6] pt-4 text-xs text-slate-500">
          <span>ZuDrop</span>
          <span>Live stock updates in real time</span>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}

export default App;
