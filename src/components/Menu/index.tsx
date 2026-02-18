import styles from "./styles.module.css";
import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

type AvailableTheme = 'dark' | 'light';
type MouseEventType = React.MouseEvent<HTMLAnchorElement, MouseEvent>; //Tipagem que eu fiz, não estava no curso

export default function Menu() {

  const [theme, setTheme] = useState<AvailableTheme>(() => {
    const storageTheme = localStorage.getItem('theme') as AvailableTheme || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    dark:<SunIcon/>,
    light:<MoonIcon/>
  }

  function handleThemeChange(e:MouseEventType) {
    e.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === "dark" ? 'light' : 'dark';
      return nextTheme;
    });

    // document.documentElement.setAttribute('data-theme', theme)
  }

  useEffect(() => {
    console.log('Theme mudou para', theme, Date.now());
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  })
 
  return (
    <>
      <nav className={styles.menu}>
        <a className={styles.menuLink} href="#" aria-label="Home" title="Home">
        <HouseIcon />
        </a>

        <a className={styles.menuLink} href="#" aria-label="History" title="History">
        <HistoryIcon />
        </a>

        <a className={styles.menuLink} href="#" aria-label="Settings" title="Settings">
        <SettingsIcon />
        </a>

        <a className={styles.menuLink} href="#" aria-label="Theme" title="Theme"
         onClick={handleThemeChange}>
        {nextThemeIcon[theme]}
        </a>
      </nav>
    </>
  );
}