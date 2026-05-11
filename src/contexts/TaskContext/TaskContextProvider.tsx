import { useEffect, useMemo, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/LoadBeep";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storedState = localStorage.getItem("taskState");
    return storedState ? JSON.parse(storedState) : initialTaskState;
  });
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const workerRef = useRef<TimerWorkerManager | null>(null);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const { tasks, activeTask, currentCycle, config } = state;

  const stateToPersist = useMemo(
    () => ({
      tasks,
      activeTask,
      currentCycle,
      config,
    }),
    [tasks, activeTask, currentCycle, config],
  );

  useEffect(() => {
    localStorage.setItem("taskState", JSON.stringify(stateToPersist));
  }, [stateToPersist]);

  useEffect(() => {
    const handleWorkerMessage = (e: MessageEvent) => {
      const countDownSeconds = e.data as number;

      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }

        dispatch({
          type: TaskActionTypes.COMPLETE_TASK,
        });
        workerRef.current?.terminate();
        workerRef.current = null;
        return;
      }

      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    };

    if (!state.activeTask) {
      workerRef.current?.terminate();
      workerRef.current = null;
      return;
    }

    const worker = workerRef.current ?? TimerWorkerManager.getInstance();
    workerRef.current = worker;
    // Após terminate(), getInstance() cria um Worker novo — o onmessage precisa ser registrado de novo.
    worker.onmessage(handleWorkerMessage);
    // Só sincronizar com o worker quando a tarefa ativa muda. Incluir secondsRemaining aqui reenvia
    // postMessage a cada tick, o worker reinicia o tick na hora e o contador “dispara”.
    worker.postMessage({
      activeTask: state.activeTask,
      secondsRemaining: state.secondsRemaining,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- secondsRemaining só importa na troca de activeTask; reenviar a cada tick quebra o intervalo de 1s do worker.
  }, [state.activeTask]);

  useEffect(() => {
    if (!state.activeTask) return;
    document.title = `${state.formattedSecondsRemaining}º Ciclo - Chronos`;
  }, [state.activeTask, state.formattedSecondsRemaining]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      console.log("Carregando Áudio...");
      playBeepRef.current = loadBeep();
    } else {
      console.log("Destruindo Áudio...");
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
