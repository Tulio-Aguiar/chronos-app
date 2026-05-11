import type { TaskStateModel } from "../../models/TaskStateModel";
import { getNextCycle } from "../../utils/getNextCycle";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";
import type { TaskActionModel } from "./taskActions";
import { TaskActionTypes } from "./taskActions";
import { initialTaskState } from "./initialTaskState";

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;

      return {
        ...state,
        currentCycle: nextCycle,
        activeTask: newTask,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      // Interrompe a tarefa ativa (se existir) e zera o contador
      if (!state.activeTask) return state;

      const interruptedTaskId = state.activeTask.id;

      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((task) =>
          task.id === interruptedTaskId
            ? { ...task, interruptDate: Date.now() }
            : task,
        ),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((task) =>
          task.id === state.activeTask?.id
            ? { ...task, completeDate: Date.now() }
            : task,
        ),
      };
    }

    case TaskActionTypes.RESET_STATE: {
      return { ...initialTaskState };
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }
    case TaskActionTypes.CHANGE_SETTINGS: {
      return {
        ...state,
        config: { ...action.payload },
      };
    }
    default:
      // Sempre deve retornar o estado
      return state;
  }
}
