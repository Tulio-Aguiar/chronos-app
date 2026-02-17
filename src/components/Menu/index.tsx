import styles from "./styles.module.css";
import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from "lucide-react";


export default function Menu() {
  return (
    <>
      <nav className={styles.menu}>
        <a className={styles.menuLink} href="http://">
        <HouseIcon />
        </a>

        <a className={styles.menuLink} href="http://">
        <HistoryIcon />
        </a>

        <a className={styles.menuLink} href="http://">
        <SettingsIcon />
        </a>

        <a className={styles.menuLink} href="http://">
        <SunIcon />
        </a>
      </nav>
    </>
  );
}