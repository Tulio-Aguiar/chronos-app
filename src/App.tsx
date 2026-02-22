import { useState } from "react";
import Home from "./pages/Home";

import "./assets/styles/global.css";
import "./assets/styles/theme.css";
import type { TaskStateModel } from "./models/TaskStateModel";
import TaskContext from "./contexts/TaskContext";

const initialState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: "00:00",
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};

export default function App() {
  const [state, setState] = useState(initialState);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      <Home />
    </TaskContext.Provider>
  );
}
