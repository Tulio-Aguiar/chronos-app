import { useContext } from "react";
import TaskContext from "../../contexts/TaskContext";
import styles from "./styles.module.css";

export default function CountDown() {
  const { state } = useContext(TaskContext);
  console.log(state);
  return (
    <>
      <div className={styles.container}>00:00</div>
    </>
  );
}
