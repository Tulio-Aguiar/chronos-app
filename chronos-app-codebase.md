# Chronos App — Codebase Completo
**Stack:** React 19.2 · TypeScript · Vite 7 · CSS Modules · Lucide React
**Último commit:** `97c607f` — Homepage, Generic Components & TaskModel

---

## Estrutura do Projeto

```
src/
├── main.tsx
├── App.tsx
├── assets/styles/
│   ├── global.css
│   └── theme.css
├── models/
│   ├── TaskModel.ts
│   └── TaskStateModel.ts
├── templates/
│   └── MainTemplate/index.tsx
├── pages/
│   ├── Home/index.tsx
│   ├── Home/AboutPomodoro/index.tsx
│   ├── Home/NotFound/index.tsx
│   └── Menu/index.tsx
└── components/
    ├── Container/
    ├── CountDown/
    ├── Cycles/
    ├── DefaultButton/
    ├── DefaultInput/
    ├── Footer/
    ├── GenericHtml/
    ├── Heading/
    ├── Logo/
    ├── MainForm/
    ├── Menu/
    └── PomodoroConfig/
```

---

## Ponto de Entrada

### src/main.tsx
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### src/App.tsx
```tsx
import Home from "./pages/Home";
import './assets/styles/global.css';
import './assets/styles/theme.css'

export default function App() {
  return <Home />
}
```

---

## Estilos Globais

### src/assets/styles/global.css
```css
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html{
  font-size: 62.5%;
}

body{
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.6rem;
  background: var(--gray-900);
  color: var(--text-default);
}

.form{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2.4rem;
}

.formRow{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2.4rem;
}
```

### src/assets/styles/theme.css
```css
:root {
  --gray-100: #e6e9f0;
  --gray-200: #cdd3e1;
  --gray-300: #aab3cc;
  --gray-400: #555f7d;
  --gray-500: #454f6a;
  --gray-600: #363d56;
  --gray-700: #272f43;
  --gray-800: #181f2e;
  --gray-900: #0a0f1a;

  --primary-light: #4de7b7;
  --primary: #0da170;
  --primary-dark: #065f46;

  --link-color: #10b981;
  --link-hover: #0b8a60;

  --success: #22c55e;
  --warning: #eab308;
  --error: #991b1b;
  --info: #0ea5e9;

  --text-over-primary: #0a0f1a;
  --text-over-primary-dark: #e6e9f0;
  --text-over-primary-light: #0a0f1a;
  --text-over-success: #0a0f1a;
  --text-over-warning: #0a0f1a;
  --text-over-error: #e6e9f0;
  --text-over-info: #0a0f1a;

  --text-default: #e6e9f0;
  --text-muted: #aab3cc;

  --disabled: #555f7d;
  --text-disabled: #aab3cc;
}

:root[data-theme='light'] {
  --gray-100: #0a0f1a;
  --gray-200: #181f2e;
  --gray-300: #272f43;
  --gray-400: #363d56;
  --gray-500: #454f6a;
  --gray-600: #555f7d;
  --gray-700: #aab3cc;
  --gray-800: #cdd3e1;
  --gray-900: #e6e9f0;

  --text-default: #0a0f1a;
  --text-muted: #272f43;

  --link-color: #0b8a60;
  --link-hover: #065f46;
}
```

---

## Models (TypeScript)

### src/models/TaskStateModel.ts
```ts
import type { TaskModel } from "./TaskModel";

export type TaskStateModel = {
   tasks: TaskModel[];
   secondsRemaining: number;
   formattedSecondsRemaining: string;
   activeTask: TaskModel | null;
   currentCycle: number; // 1 a 8
   config:{
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
   };
};
```

### src/models/TaskModel.ts
```ts
import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completeDate: number | null;
  interruptDate: number | null;
  type: keyof TaskStateModel['config'];
};
```

---

## Template

### src/templates/MainTemplate/index.tsx
```tsx
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Logo from "../../components/Logo";
import Menu from "../../components/Menu";

type MainTemplateProps = {
    children: React.ReactNode;
}

export default function MainTemplate({ children }: MainTemplateProps) {
    return (
      <>
        <Container>
          <Logo/>
        </Container>
        <Container>
          <Menu/>
        </Container>
        {children}
        <Container>
            <Footer/>
        </Container>
      </>
    )
}
```

---

## Pages

### src/pages/Home/index.tsx
```tsx
import Container from "../../components/Container";
import CountDown from "../../components/CountDown";
import MainForm from "../../components/MainForm";
import MainTemplate from "../../templates/MainTemplate";

export default function Home() {
    return (
      <>
       <MainTemplate>
          <Container>
            <CountDown/>
          </Container>
          <Container>
            <MainForm/>
          </Container>
        </MainTemplate>
      </>
    )
}
```

### src/pages/Home/AboutPomodoro/index.tsx
```tsx
import Container from "../../../components/Container"
import GenericHtml from "../../../components/GenericHtml"
import Heading from "../../../components/Heading"
import MainTemplate from "../../../templates/MainTemplate"

export default function AboutPomodoro() {
    return (
      <>
        <MainTemplate>
          <Container>
            <GenericHtml>
              <Heading>A Técnica Pomodoro 🍅</Heading>
              <p>
                A Técnica Pomodoro é uma metodologia de produtividade criada por{' '}
                <strong>Francesco Cirillo</strong>, que consiste em dividir o
                trabalho em blocos de tempo (os famosos "Pomodoros") intercalados
                com pausas.
              </p>
              <h2>Como funciona o Pomodoro tradicional?</h2>
              <ul>
                <li><strong>1. Defina uma tarefa</strong> que você deseja realizar.</li>
                <li><strong>2. Trabalhe nela por 25 minutos</strong> sem interrupções.</li>
                <li><strong>3. Faça uma pausa curta de 5 minutos</strong>.</li>
                <li><strong>4. A cada 4 ciclos, faça uma pausa longa</strong> (15 a 30 minutos).</li>
              </ul>
              <h2>Mas no <strong>Chronos Pomodoro</strong> tem um diferencial 🚀</h2>
              <h3>⚙️ Personalização do tempo</h3>
              <p>Configure o tempo de foco, descanso curto e descanso longo na página de configurações.</p>
              <h3>🔁 Ciclos organizados em sequência</h3>
              <ul>
                <li>Ciclos <strong>ímpares</strong>: Trabalho (foco).</li>
                <li>Ciclos <strong>pares</strong>: Descanso curto.</li>
                <li>Ciclo <strong>8</strong>: Descanso longo especial.</li>
              </ul>
              <h3>🍅 Visualização dos ciclos</h3>
              <ul>
                <li>🟡 Amarelo: Ciclo de trabalho (foco).</li>
                <li>🟢 Verde: Descanso curto.</li>
                <li>🔵 Azul: Descanso longo (a cada 8 ciclos).</li>
              </ul>
            </GenericHtml>
          </Container>
        </MainTemplate>
      </>
    )
}
```

### src/pages/Home/NotFound/index.tsx
```tsx
import Container from "../../../components/Container"
import GenericHtml from "../../../components/GenericHtml"
import Heading from "../../../components/Heading"
import MainTemplate from "../../../templates/MainTemplate"

export default function NotFound() {
    return (
      <>
        <MainTemplate>
          <Container>
            <GenericHtml>
              <Heading>404 - Página não encontrada 🚀</Heading>
              <p>
                Opa! Parece que a página que você está tentando acessar não existe.
                Talvez ela tenha tirado férias ou se perdido entre dois buracos negros. 🌌
              </p>
              <p>
                Dá pra voltar para a <a href='/'>página principal</a> ou{' '}
                <a href='/history'>para o histórico</a>.
              </p>
            </GenericHtml>
          </Container>
        </MainTemplate>
      </>
    )
}
```

### src/pages/Menu/index.tsx
```tsx
import MainTemplate from "../../templates/MainTemplate";

export default function NotFound() {
    return (
      <>
       <MainTemplate>
        <h1>Page not found</h1>
       </MainTemplate>
      </>
    )
}
```

---

## Components

### src/components/Container/index.tsx
```tsx
import type { ReactNode } from "react"
import styles from "./styles.module.css"

type ContainerProps = {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <section>
            {children}
          </section>
        </div>
      </div>
    </>
  )
}
```

### src/components/Container/styles.module.css
```css
.container {
  max-width: 98rem;
  margin: 0 auto;
}

.content{
  margin: 3.2rem;
}
```

---

### src/components/CountDown/index.tsx
```tsx
import styles from "./styles.module.css";

export default function CountDown() {
  return (
    <>
     <div className={styles.container}>
       00:00
     </div>
    </>
  );
}
```

### src/components/CountDown/styles.module.css
```css
.container{
  font-size: clamp(8rem, 30vw, 16rem);
  font-weight: bold;
  text-align: center;
  line-height: 1.2;
}
```

---

### src/components/Cycles/index.tsx
```tsx
import styles from './styles.module.css'

export default function Cycles(){
    return(
        <>
        <div className={styles.cycles}>
            <span>Ciclos:</span>
            <div className={styles.cycleDots}>
                <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.longBreakTime}`}></span>
            </div>
        </div>
        </>
    )
}
```

### src/components/Cycles/styles.module.css
```css
.cycles{
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    align-items: center;
    justify-content: center;
}

.cycleDots{
   display: flex;
   gap: .8rem;
}

.cycleDot{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
}

.workTime{ background: var(--warning); }
.shortBreakTime{ background: var(--primary); }
.longBreakTime{ background: var(--info); }
```

---

### src/components/DefaultButton/index.tsx
```tsx
import styles from './styles.module.css';

type DefaultButtonProps = {
    icon?: React.ReactNode;
    color?: 'green' | 'red';
} & React.ComponentProps<'button'>;

export default function DefaultButton ({ icon, color = 'green', ...props }: DefaultButtonProps){
    return (
    <>
         <button className={`${styles.button} ${styles[color]}`} {...props}>
            {icon}
         </button>
    </>
    );
}
```

### src/components/DefaultButton/styles.module.css
```css
.button{
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24rem;
    border-radius: .8rem;
    padding: .8rem;
    margin: 4.8rem 0;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
}

.button svg{
    width: 3.2rem;
    height: 3.2rem;
}

.button:hover{ filter: brightness(80%); }

.green{
    background: var(--primary);
    color: var(--text-over-primary);
}
.red{
    background: var(--error);
    color: var(--text-over-error);
}
```

---

### src/components/DefaultInput/index.tsx
```tsx
import styles from './styles.module.css';

type DefaultInputProps = {
    id: string;
    labelText: string;
} & React.ComponentProps<'input'>;

export default function DefaultInput ({ id, type, labelText, ...rest }: DefaultInputProps){
    return (
    <>
         <label htmlFor={id}>{labelText}</label>
         <input className={styles.input} id={id} type={type} {...rest} placeholder='Digite Algo' />
    </>
    );
}
```

### src/components/DefaultInput/styles.module.css
```css
.input{
    background: transparent;
    text-align: center;
    font-size: 1.8rem;
    padding: 0.8rem;
    color: var(--text-default);
    outline: none;
    border: 0.2rem solid transparent;
    border-bottom: 0.2rem solid var(--primary);
    transition: all 0.3s ease-in-out;
}

.input:focus{
    border-radius: 0.8rem;
    border: .2rem solid var(--primary);
}

.input::placeholder{
    color: var(--gray-500);
    font-size: 1.4rem;
    font-style: italic;
}

.input:disabled{
    border-bottom: 0.2rem solid var(--disabled);
    color: var(--text-muted);
}
```

---

### src/components/Footer/index.tsx
```tsx
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
```

### src/components/Footer/styles.module.css
```css
.footer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  gap: 1.6rem;
}

.footer a{
  text-decoration: none;
  color: var(--text-muted);
}

.footer a:hover{
  text-decoration: underline;
  color: var(--text-muted);
}
```

---

### src/components/GenericHtml/index.tsx
```tsx
import styles from "./style.module.css";

type GenericHtmlProps = {
    children: React.ReactNode;
}

export default function GenericHtml({ children }: GenericHtmlProps){
    return(
        <div className={styles.genericHtml}>
            {children}
        </div>
    )
}
```

### src/components/GenericHtml/style.module.css
```css
.genericHtml h1 { font-size: 3.2rem; margin-bottom: 1.6rem; }
.genericHtml h2 { font-size: 2.4rem; margin-bottom: 1.2rem; }
.genericHtml h3 { font-size: 2rem; margin-bottom: 1rem; }

.genericHtml p {
    font-size: 1.6rem;
    line-height: 1.6;
    margin-bottom: 1.6rem;
}

.genericHtml a {
    color: var(--link-color);
    text-decoration: none;
    font-weight: bold;
}

.genericHtml a:hover { text-decoration: underline; }
.genericHtml ul { padding-left: 2.4rem; }
.genericHtml li { margin-bottom: 0.8rem; }

.genericHtml img {
    max-width: 100%;
    height: auto;
    border-radius: 0.8rem;
    display: block;
    margin: 1.6rem 0;
}
```

---

### src/components/Heading/index.tsx
```tsx
import styles from "./styles.module.css";
import type { ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
};

export default function Heading({ children }: HeadingProps) {
  return (
    <>
      <h1 className={styles.heading}>{children}</h1>
    </>
  );
}
```

### src/components/Heading/styles.module.css
```css
.heading{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
}
```

---

### src/components/Logo/index.tsx
```tsx
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
```

### src/components/Logo/styles.module.css
```css
.logo{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  padding-top: 3.2rem;
}

.logoLink{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  flex-direction: column;
  font-size: 4.2rem;
  text-decoration: none;
  font-weight: bold;
  color: var(--primary);
  transition: all 0.1s ease-in-out;
}

.logoLink:hover{ filter: brightness(80%); }

.logo svg {
  width: 6.4rem;
  height: 6.4rem;
}
```

---

### src/components/MainForm/index.tsx
```tsx
import DefaultButton from "../DefaultButton";
import { PlayCircleIcon } from "lucide-react";
import DefaultInput from "../DefaultInput";
import Cycles from "../Cycles";

export default function MainForm(){
    return(
        <>
          <form className="form" action="">
            <div className="formRow">
              <DefaultInput labelText='Task' title="Title" id='input' type='text'/>
            </div>
            <div className="formRow">
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="formRow">
              <Cycles/>
            </div>
            <div className="formRow">
              <DefaultButton icon={<PlayCircleIcon/>} color="green" />
            </div>
          </form>
        </>
    )
}
```

---

### src/components/Menu/index.tsx
```tsx
import styles from "./styles.module.css";
import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

type AvailableTheme = 'dark' | 'light';
type MouseEventType = React.MouseEvent<HTMLAnchorElement, MouseEvent>;

export default function Menu() {

  const [theme, setTheme] = useState<AvailableTheme>(() => {
    const storageTheme = localStorage.getItem('theme') as AvailableTheme || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon/>,
    light: <MoonIcon/>
  }

  function handleThemeChange(e: MouseEventType) {
    e.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === "dark" ? 'light' : 'dark';
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

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
```

### src/components/Menu/styles.module.css
```css
.menu{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
}

.menuLink{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: var(--text-over-primary);
  transition: all 0.1s ease-in-out;
  padding: 1.2rem;
  border-radius: 0.8rem;
}

.menuLink:hover{ filter: brightness(80%); }

.menu svg {
  width: 2.4rem;
  height: 2.4rem;
}
```

---

### src/components/PomodoroConfig/index.tsx
> Componente criado como exercício de fixação — não faz parte do curso.

```tsx
import { useEffect, useState } from "react";
import styles from './styles.module.css'

type WorkDuration = number;
type BreakDuration = number;
type InputEvent = React.ChangeEvent<HTMLInputElement>

export default function PomodoroConfig(){

  const [workDuration, setWorkDuration] = useState<WorkDuration>(() => {
    const stored = localStorage.getItem('workDuration');
    return stored ? Number(stored) : 25;
  });

  function handleWorkDuration(e: InputEvent){
    setWorkDuration(Number(e.target.value));
  }

  const [breakDuration, setBreakDuration] = useState<BreakDuration>(() => {
    const stored = localStorage.getItem('breakDuration');
    return stored ? Number(stored) : 5;
  });

  function handleBreakDuration(e: InputEvent){
    setBreakDuration(Number(e.target.value));
  }

  useEffect(() => {
    localStorage.setItem('workDuration', String(workDuration));
    localStorage.setItem('breakDuration', String(breakDuration));
  }, [workDuration, breakDuration]);

  return(
    <>
      <div className={styles.pomodoroTest}>
        <input type="number" onChange={handleWorkDuration} value={workDuration} />
        <input type="number" onChange={handleBreakDuration} value={breakDuration} />
        <p>Trabalho: {workDuration}min | Pausa: {breakDuration}min</p>
      </div>
    </>
  )
}
```

### src/components/PomodoroConfig/styles.module.css
```css
.pomodoroTest{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    background: var(--primary);
    color: var(--text-over-primary);
}
```
