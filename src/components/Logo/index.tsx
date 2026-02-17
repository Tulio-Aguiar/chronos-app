import styles from "./styles.module.css";
import { TimerIcon } from "lucide-react";


export default function Logo() {
  return (
    <>
      <div className={styles.logo}>
        <a className={styles.logoLink} href="http://">
        <TimerIcon />
        <span>Chronos</span>
        </a>
      </div>
    </>
  );
}