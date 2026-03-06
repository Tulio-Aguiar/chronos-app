import DefaultButton from "../DefaultButton";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import DefaultInput from "../DefaultInput";
import Cycles from "../Cycles";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export default function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();
    if (!taskName) {
      alert("Digite um nome para a tarefa");
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

    const secondsRemaining = newTask.duration * 60;

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask], // ✅ corrigido
      };
    });
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    setState((prevState) => {
      return {
        ...prevState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: prevState.tasks.map((task) => {
          if (prevState.activeTask && prevState.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
        // ✅ removido newTask: null
      };
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
          disabled={!!state.activeTask}
        />
      </div>
      <div className="formRow">
        <p>Próximo Intervalo é de 25 minutos</p>
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
