import styles from "./styles.module.css";





export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <a href="">Entenda como funciona a técnica Pomodoro</a>
        <a href="">Chronos Pomodoro &copy; {new Date().getFullYear()} Feito com ódio!</a>
    </footer>
    </>
  );
}