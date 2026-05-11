import DefaultButton from "../DefaultButton";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import DefaultInput from "../DefaultInput";
import Cycles from "../Cycles";
import { useRef, type FormEvent } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import { showMessage } from "../../adapters/showMessage";

export default function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || "";

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();
    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();
    if (!taskName) {
      showMessage.warning("Digite um nome para a tarefa");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    showMessage.success("Tarefa criada com sucesso");
  } // ← fecha handleCreateNewTask

  function handleInterruptTask() {
    showMessage.dismiss();
    showMessage.success("Tarefa interrompida com sucesso");
    dispatch({
      type: TaskActionTypes.INTERRUPT_TASK,
    });
  }

  return (
    <form onSubmit={handleCreateNewTask} className="form">
      <div className="formRow">
        <DefaultInput
          labelText="Task"
          title="Title"
          id="input"
          type="text"
          placeholder="Digite Algo"
          ref={taskNameInput}
          defaultValue={lastTaskName}
          disabled={!!state.activeTask}
        />
      </div>

      <div className="formRow">
        <Tips />
      </div>
      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}
      <div className="formRow">
        {!state.activeTask ? (
          <DefaultButton
            type="submit"
            icon={<PlayCircleIcon />}
            color="green"
            aria-label="Iniciar Nova Tarefa"
            title="Iniciar Nova Tarefa"
            key="Botão de Submit"
          />
        ) : (
          <DefaultButton
            aria-label="Interromper tarefa atual"
            title="Interromper Tarefa"
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            key="Não enviar nada"
          />
        )}
      </div>
    </form>
  );
}
