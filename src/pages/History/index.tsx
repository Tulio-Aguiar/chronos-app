import { ArrowLeftIcon, TrashIcon } from "lucide-react";
import Container from "../../components/Container";
import DefaultButton from "../../components/DefaultButton";
import Heading from "../../components/Heading";
import MainTemplate from "../../templates/MainTemplate";

import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/FormatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

import RouterLink from "../../components/RouterLink";
import { showMessage } from "../../adapters/showMessage";

export default function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;
  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: "startDate",
        direction: "desc",
      };
    },
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSortTasksOptions((prevState) => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);
  useEffect(() => {
    document.title = "Histórico - Chronos";
  }, []);

  function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
    const newDirection = sortTasksOptions.direction === "desc" ? "asc" : "desc";
    setSortTasksOptions({
      tasks: sortTasks({
        tasks: state.tasks,
        direction: newDirection,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleRestoreHistory() {
    showMessage.dismiss();
    showMessage.confirm("Deseja restaurar o histórico?", (confirmation) => {
      if (confirmation) {
        dispatch({ type: TaskActionTypes.RESET_STATE });
      }
    });
  }

  return (
    <>
      <MainTemplate>
        <Container>
          <Heading>
            <span>History</span>
            {hasTasks && (
              <span className={styles.buttonContainer}>
                <DefaultButton
                  icon={<TrashIcon />}
                  color="red"
                  aria-label="Limpar histórico"
                  title="Limpar histórico"
                  onClick={handleRestoreHistory}
                />
              </span>
            )}
          </Heading>
        </Container>

        <Container>
          {hasTasks && (
            <div className={styles.responsiveTable}>
              <table>
                <thead>
                  <tr>
                    <th
                      onClick={() => handleSortTasks({ field: "name" })}
                      aria-label="Ordenar por nome"
                      className={styles.thSort}
                      title="Ordenar por nome"
                    >
                      Tarefa &#8597;
                    </th>
                    <th
                      onClick={() => handleSortTasks({ field: "duration" })}
                      aria-label="Ordenar por duração"
                      className={styles.thSort}
                      title="Ordenar por duração"
                    >
                      Duração &#8597;
                    </th>
                    <th
                      onClick={() => handleSortTasks({ field: "startDate" })}
                      aria-label="Ordenar por data"
                      className={styles.thSort}
                      title="Ordenar por data"
                    >
                      Data &#8597;
                    </th>
                    <th
                      onClick={() => handleSortTasks({ field: "completeDate" })}
                      aria-label="Ordenar por status"
                      className={styles.thSort}
                      title="Ordenar por status"
                    >
                      Status &#8597;
                    </th>
                    <th
                      onClick={() => handleSortTasks({ field: "type" })}
                      aria-label="Ordenar por tipo"
                      className={styles.thSort}
                      title="Ordenar por tipo"
                    >
                      Tipo &#8597;
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortTasksOptions.tasks.map((task) => {
                    const taskTypeDictionary = {
                      workTime: "Foco",
                      shortBreakTime: "Descanso Curto",
                      longBreakTime: "Descanso Longo",
                    };
                    return (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.duration} minutos</td>
                        <td>{formatDate(task.startDate)}</td>
                        <td>{getTaskStatus(task, state.activeTask)}</td>
                        <td>{taskTypeDictionary[task.type]}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td>Tarefa 1</td>
                    <td>25 minutos</td>
                    <td>2026-05-07</td>
                    <td>Completada</td>
                    <td>Trabalho</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {!hasTasks && (
            <div className={styles.noTasks}>
              <p>Nenhuma tarefa encontrada no histórico</p>
              <p>Comece a usar o Chronos para registrar suas tarefas</p>
              <RouterLink
                href="/"
                aria-label="Voltar para a página inicial"
                title="Voltar para a página inicial"
                className={styles.link}
              >
                <ArrowLeftIcon size={16} className={styles.linkIcon} /> Voltar
                para a página inicial
              </RouterLink>
            </div>
          )}
        </Container>
      </MainTemplate>
    </>
  );
}
