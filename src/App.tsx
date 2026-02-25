import Home from "./pages/Home";

import "./assets/styles/global.css";
import "./assets/styles/theme.css";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";

export default function App() {
  return (
    // Peça 2
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}
