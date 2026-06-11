import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import api from "./lib/http/axios";

function App() {
  const [isServerActive, setIsServerActive] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get("health")
      .then((data) => {
        const isActive = data.status === 200;
        setIsServerActive(isActive);
      })
      .catch(() => {
        setIsServerActive(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f1ea] px-4">
        <div className="max-w-lg rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">
            Server is Starting Up
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            This application's backend is hosted on Render. If the server has
            been inactive, it may take a short time to restart and become
            available.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Render was chosen because the backend requires a long-running
            Node.js server and real-time connections, which are better suited to
            Render than Vercel's serverless environment.
          </p>

          <p className="mt-3 text-sm text-slate-600">
            Please wait a moment and refresh the page.
          </p>
        </div>
      </div>
    );
  }

  if (isServerActive === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f1ea] text-slate-800">
        <p className="text-lg">
          Server is currently unavailable. Please try again later.
        </p>
      </div>
    );
  }

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
