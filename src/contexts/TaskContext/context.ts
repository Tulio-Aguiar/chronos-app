import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";

export type TaskContextValue = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const defaultValue: TaskContextValue = {
  state: {
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
  },
  setState: () => {},
};

export const TaskContext = createContext<TaskContextValue>(defaultValue);
