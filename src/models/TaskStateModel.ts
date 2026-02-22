import type { TaskModel } from "./TaskModel";

//Estado estivesse em um componente que vai repassar esse estado para os componentes filhos

export type TaskStateModel = {
  tasks: TaskModel[]; // Precisa no histórico / MainForm
  secondsRemaining: number; //Countdown // Histórico, Mainform // Button
  formattedSecondsRemaining: string; //Título //Countdown //Histórico
  activeTask: TaskModel | null; // CounDown //Histórico //MainForm// Button
  currentCycle: number; // Home;
  config: {
    //MainForm
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};
