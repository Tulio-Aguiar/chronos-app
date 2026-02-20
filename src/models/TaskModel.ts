import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number; 
  completeDate: number | null; //Quando o timer chegar ao final, coloca-se o confliteDate;
  interruptDate: number| null  //Quando a Task for interrompida.
  type:keyof TaskStateModel['config'];

};  