import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import styles from "./styles.module.css";

export default function Cycles() {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.currentCycle });

  const cycleDescriptionMap = {
    workTime: "Foco de trabalho",
    shortBreakTime: "Intervalo de pausa curto",
    longBreakTime: "Intervalo de pausa longo",
  };

  console.log(cycleStep);
  return (
    <div className={styles.cycleDots}>
      {cycleStep.map((_, index) => {
        const nextCycle = getNextCycle(index);
        const nextCycleType = getNextCycleType(nextCycle);
        return (
          <span
            key={`cycle-${index}`}
            className={`${styles.cycleDot} ${styles[nextCycleType]}`}
            aria-label={`Indicaddor de ciclos de ${cycleDescriptionMap[nextCycleType]}`}
            title={`Indicaddor de ciclos de ${cycleDescriptionMap[nextCycleType]}`}
          ></span>
        );
      })}
    </div>
  );
}
