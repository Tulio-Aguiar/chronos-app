import styles from "./styles.module.css";
import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import RouterLink from "../RouterLink";

type AvailableTheme = "dark" | "light";
type MouseEventType = React.MouseEvent<HTMLAnchorElement, MouseEvent>; //Tipagem que eu fiz, não estava no curso

export default function Menu() {
  const [theme, setTheme] = useState<AvailableTheme>(() => {
    const storageTheme =
      (localStorage.getItem("theme") as AvailableTheme) || "dark";
    return storageTheme;
  });
  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(e: MouseEventType) {
    e.preventDefault();
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" ? "light" : "dark";
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <nav className={styles.menu}>
        <RouterLink
          className={styles.menuLink}
          href="/"
          aria-label="Home"
          title="Home"
        >
          <HouseIcon />
        </RouterLink>
        <RouterLink
          className={styles.menuLink}
          href="/history"
          aria-label="History"
          title="History"
        >
          <HistoryIcon />
        </RouterLink>
        <RouterLink
          className={styles.menuLink}
          href="/settings"
          aria-label="Settings"
          title="Settings"
        >
          <SettingsIcon />
        </RouterLink>
        <RouterLink
          className={styles.menuLink}
          href="/theme"
          aria-label="Theme"
          title="Theme"
          onClick={handleThemeChange}
        >
          {nextThemeIcon[theme]}
        </RouterLink>
      </nav>
    </>
  );
}
