import Home from "./pages/Home";

import "./assets/styles/global.css";
import "./assets/styles/theme.css";
import { TaskContextProvider } from "./contexts/TaskContext";

export default function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}
