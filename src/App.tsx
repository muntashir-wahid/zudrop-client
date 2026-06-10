import { Toaster } from "react-hot-toast";
import "./App.css";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <main>
      <Dashboard />
      <Toaster />
    </main>
  );
}

export default App;
