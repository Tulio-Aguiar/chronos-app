# Chronos App — Leitura Completa da Codebase

> Documento gerado em 09/03/2026. Contém a transcrição integral de todos os arquivos de código-fonte do projeto **Chronos App**, uma aplicação Pomodoro construída com React 19, TypeScript e Vite 7. Use este documento para solicitar melhorias, correções, refatorações ou novas features no Claude Web.

---

## Visão Geral do Projeto

**Stack:** React 19 · TypeScript 5.9 · Vite 7 · CSS Modules
**Gerenciador de estado:** Context API com `useState` (infraestrutura de `useReducer` preparada mas não ativada)
**Ícones:** lucide-react
**Roteamento:** ainda não implementado (páginas existem como componentes, mas não há router configurado)

---

## Estrutura de Arquivos

```
chronos-app/
├── index.html
├── vite.config.ts
├── tsconfig.app.json
├── package.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── assets/
│   │   └── styles/
│   │       ├── global.css
│   │       └── theme.css
│   ├── models/
│   │   ├── TaskModel.ts
│   │   └── TaskStateModel.ts
│   ├── contexts/
│   │   └── TaskContext/
│   │       ├── TaskContext.tsx
│   │       ├── TaskContextProvider.tsx
│   │       ├── initialTaskState.ts
│   │       ├── taskActions.ts
│   │       ├── taskReducer.ts
│   │       └── useTaskContext.ts
│   ├── utils/
│   │   ├── formatSecondsToMinutes.ts
│   │   ├── getNextCycle.ts
│   │   └── getNextCycleType.ts
│   ├── components/
│   │   ├── Container/
│   │   ├── CountDown/
│   │   ├── Cycles/
│   │   ├── DefaultButton/
│   │   ├── DefaultInput/
│   │   ├── Footer/
│   │   ├── GenericHtml/
│   │   ├── Heading/
│   │   ├── Logo/
│   │   ├── MainForm/
│   │   ├── Menu/
│   │   └── PomodoroConfig/
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── index.tsx
│   │   │   ├── AboutPomodoro/
│   │   │   └── NotFound/
│   │   └── Menu/
│   └── templates/
│       └── MainTemplate/
```

---

## Ponto de Entrada

### `index.html`

```html
<!doctype html>
<html lang="pt-BR" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="google" content="notranslate">
  <title>Chronos-app</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

### `src/main.tsx`

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

### `src/App.tsx`

```tsx
import Home from "./pages/Home";
import "./assets/styles/global.css";
import "./assets/styles/theme.css";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";

export default function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}
```

---

## Configuração

### `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
});
```

### `tsconfig.app.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### `package.json`

```json
{
  "name": "chronos-app",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --open chrome",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.563.0",
    "react": "^19.2.4",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react-swc": "^4.2.2",
    "typescript": "~5.9.3",
    "vite": "^7.3.1"
  }
}
```

---

## Estilos Globais

### `src/assets/styles/global.css`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.6rem;
  background: var(--gray-900);
  color: var(--text-default);
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2.4rem;
}

.formRow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2.4rem;
}
```

### `src/assets/styles/theme.css`

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
  --text-over-error: #e6e9f0;
  --text-default: #e6e9f0;
  --text-muted: #aab3cc;
  --disabled: #555f7d;
  --text-disabled: #aab3cc;
}

:root[data-theme='light'] {
  --gray-100: #0a0f1a;
  --gray-900: #e6e9f0;
  --text-default: #0a0f1a;
  --text-muted: #272f43;
  --link-color: #0b8a60;
  --link-hover: #065f46;
}
```

---

## Models (Tipos)

### `src/models/TaskModel.ts`

```ts
import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completeDate: number | null;
  interruptDate: number | null;
  type: keyof TaskStateModel["config"]; // "workTime" | "shortBreakTime" | "longBreakTime"
};
```

### `src/models/TaskStateModel.ts`

```ts
import type { TaskModel } from "./TaskModel";

export type TaskStateModel = {
  tasks: TaskModel[];
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  activeTask: TaskModel | null;
  currentCycle: number;
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};
```

---

## Context API

### `src/contexts/TaskContext/TaskContext.tsx`

```tsx
import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialTaskState } from "./initialTaskState";

type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const initialContextValue = {
  state: initialTaskState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
```

### `src/contexts/TaskContext/TaskContextProvider.tsx`

```tsx
import { useState } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialTaskState);

  // useReducer preparado mas comentado:
  // const [numero, dispatch] = useReducer((state, action) => {
  //   switch (action) {
  //     case "INCREMENT": return state + 1;
  //     case "DECREMENT": return state - 1;
  //     case "RESET": return 0;
  //     default: return state;
  //   }
  // }, 0);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
}
```

### `src/contexts/TaskContext/initialTaskState.ts`

```ts
import type { TaskStateModel } from "../../models/TaskStateModel";

export const initialTaskState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: "00:00",
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};
```

### `src/contexts/TaskContext/taskActions.ts`

```ts
import type { TaskModel } from "../../models/TaskModel";

export const TaskActionTypes = {
  START_TASK: "START_TASK",
  INTERRUPT_TASK: "INTERRUPT_TASK",
  RESET_STATE: "RESET_STATE",
} as const;

export type TaskActionTypes =
  (typeof TaskActionTypes)[keyof typeof TaskActionTypes];

export type TaskActionsWithPayload =
  | { type: typeof TaskActionTypes.START_TASK; payload: TaskModel }
  | { type: typeof TaskActionTypes.INTERRUPT_TASK; payload: TaskModel };

export type TaskActionsWithoutPayload = {
  type: typeof TaskActionTypes.RESET_STATE;
};

export type TaskActionModel =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload;
```

### `src/contexts/TaskContext/taskReducer.ts`

```ts
import type { TaskStateModel } from "../../models/TaskStateModel";
import type { TaskActionModel } from "./taskActions";
import { TaskActionTypes } from "./taskActions";

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      return state; // não implementado
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return state; // não implementado
    }
    case TaskActionTypes.RESET_STATE: {
      return state; // não implementado
    }
  }
  return state;
}
```

### `src/contexts/TaskContext/useTaskContext.ts`

```ts
import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export function useTaskContext() {
  return useContext(TaskContext);
}
```

---

## Utilitários

### `src/utils/formatSecondsToMinutes.ts`

```ts
export function formatSecondsToMinutes(seconds: number) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsMod = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${secondsMod}`;
}
```

### `src/utils/getNextCycle.ts`

```ts
export function getNextCycle(currentCycle: number) {
  return currentCycle === 0 || currentCycle === 8 ? 1 : currentCycle + 1;
}
```

### `src/utils/getNextCycleType.ts`

```ts
import type { TaskModel } from "../models/TaskModel";

export function getNextCycleType(currentCycle: number): TaskModel["type"] {
  if (currentCycle % 8 === 0) return "longBreakTime";
  if (currentCycle % 2 === 0) return "shortBreakTime";
  return "workTime";
}
```

---

## Template

### `src/templates/MainTemplate/index.tsx`

```tsx
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Logo from "../../components/Logo";
import Menu from "../../components/Menu";

type MainTemplateProps = {
  children: React.ReactNode;
};

export default function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Container><Logo /></Container>
      <Container><Menu /></Container>
      {children}
      <Container><Footer /></Container>
    </>
  );
}
```

---

## Páginas

### `src/pages/Home/index.tsx`

```tsx
import Container from "../../components/Container";
import CountDown from "../../components/CountDown";
import MainForm from "../../components/MainForm";
import MainTemplate from "../../templates/MainTemplate";

export default function Home() {
  return (
    <>
      <MainTemplate>
        <Container><CountDown /></Container>
        <Container><MainForm /></Container>
      </MainTemplate>
    </>
  );
}
```

### `src/pages/Home/AboutPomodoro/index.tsx`

```tsx
import Container from "../../../components/Container";
import GenericHtml from "../../../components/GenericHtml";
import Heading from "../../../components/Heading";
import MainTemplate from "../../../templates/MainTemplate";

export default function AboutPomodoro() {
  return (
    <>
      <MainTemplate>
        <Container>
          <GenericHtml>
            <Heading>A Técnica Pomodoro 🍅</Heading>
            <p>
              A Técnica Pomodoro é uma metodologia de produtividade criada por{" "}
              <strong>Francesco Cirillo</strong>, que consiste em dividir o
              trabalho em blocos de tempo intercalados com pausas.
            </p>
            <img src="https://placehold.co/1920x1080" alt="" />
            <h2>Como funciona o Pomodoro tradicional?</h2>
            <ul>
              <li><strong>1. Defina uma tarefa</strong> que você deseja realizar.</li>
              <li><strong>2. Trabalhe nela por 25 minutos</strong> sem interrupções.</li>
              <li><strong>3. Faça uma pausa curta de 5 minutos</strong>.</li>
              <li><strong>4. A cada 4 ciclos, faça uma pausa longa</strong> (15 a 30 min).</li>
            </ul>
            <h2>No <strong>Chronos Pomodoro</strong> tem um diferencial 🚀</h2>
            <h3>⚙️ Personalização do tempo</h3>
            <p>Acesse a <a href="/settings">página de configurações</a> e ajuste os minutos.</p>
            <h3>🔁 Ciclos organizados em sequência</h3>
            <ul>
              <li>Ciclos <strong>ímpares</strong>: Trabalho (foco).</li>
              <li>Ciclos <strong>pares</strong>: Descanso curto.</li>
              <li>Ciclo <strong>8</strong>: Descanso longo especial.</li>
            </ul>
            <h3>🍅 Visualização dos ciclos</h3>
            <ul>
              <li>🟡 Amarelo: workTime.</li>
              <li>🟢 Verde: shortBreakTime.</li>
              <li>🔵 Azul: longBreakTime.</li>
            </ul>
            <h3>📊 Histórico automático</h3>
            <p>Tarefas e ciclos ficam salvos no <a href="/history">histórico</a>.</p>
            <p><a href="/">Voltar para a página inicial</a> 🍅🚀</p>
          </GenericHtml>
        </Container>
      </MainTemplate>
    </>
  );
}
```

### `src/pages/Home/NotFound/index.tsx`

```tsx
import Container from "../../../components/Container";
import GenericHtml from "../../../components/GenericHtml";
import Heading from "../../../components/Heading";
import MainTemplate from "../../../templates/MainTemplate";

export default function NotFound() {
  return (
    <>
      <MainTemplate>
        <Container>
          <GenericHtml>
            <Heading>404 - Página não encontrada 🚀</Heading>
            <p>
              Opa! Parece que a página que você está tentando acessar não existe.
              Você pode voltar para a <a href="/">página principal</a> ou{" "}
              <a href="/history">para o histórico</a>.
            </p>
          </GenericHtml>
        </Container>
      </MainTemplate>
    </>
  );
}
```

### `src/pages/Menu/index.tsx`

```tsx
import MainTemplate from "../../templates/MainTemplate";

// Nota: componente placeholder — exporta NotFound por engano
export default function NotFound() {
  return (
    <>
      <MainTemplate>
        <h1>Page not found</h1>
        <p>Lorem ipsum...</p>
      </MainTemplate>
    </>
  );
}
```

---

## Componentes

### `src/components/Container/index.tsx`

```tsx
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type ContainerProps = { children: ReactNode };

export default function Container({ children }: ContainerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section>{children}</section>
      </div>
    </div>
  );
}
```

```css
/* Container/styles.module.css */
.container { max-width: 98rem; margin: 0 auto; }
.content   { margin: 3.2rem; }
```

---

### `src/components/CountDown/index.tsx`

```tsx
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import styles from "./styles.module.css";

export default function CountDown() {
  const { state } = useTaskContext();
  return <div className={styles.container}>{state.formattedSecondsRemaining}</div>;
}
```

```css
/* CountDown/styles.module.css */
.container {
  font-size: clamp(8rem, 30vw, 16rem);
  font-weight: bold;
  text-align: center;
  line-height: 1.2;
}
```

---

### `src/components/Cycles/index.tsx`

```tsx
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

  console.log(cycleStep); // ← remover em produção

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
          />
        );
      })}
    </div>
  );
}
```

```css
/* Cycles/styles.module.css */
.cycleDots  { display: flex; gap: .8rem; }
.cycleDot   { width: 2rem; height: 2rem; border-radius: 50%; background: var(--primary); }
.workTime       { background: var(--warning); }
.shortBreakTime { background: var(--primary); }
.longBreakTime  { background: var(--info); }
```

---

### `src/components/DefaultButton/index.tsx`

```tsx
import styles from './styles.module.css';

type DefaultButtonProps = {
  icon?: React.ReactNode;
  color?: 'green' | 'red';
} & React.ComponentProps<'button'>;

export default function DefaultButton({ icon, color = 'green', ...props }: DefaultButtonProps) {
  return (
    <button className={`${styles.button} ${styles[color]}`} {...props}>
      {icon}
    </button>
  );
}
```

```css
/* DefaultButton/styles.module.css */
.button {
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
.button svg   { width: 3.2rem; height: 3.2rem; }
.button:hover { filter: brightness(80%); }
.green { background: var(--primary); color: var(--text-over-primary); }
.red   { background: var(--error);   color: var(--text-over-error); }
```

---

### `src/components/DefaultInput/index.tsx`

```tsx
import styles from './styles.module.css';

type DefaultInputProps = {
  id: string;
  labelText: string;
} & React.ComponentProps<'input'>;

export default function DefaultInput({ id, type, labelText, ...rest }: DefaultInputProps) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input className={styles.input} id={id} type={type} {...rest} placeholder="Digite Algo" />
    </>
  );
}
```

```css
/* DefaultInput/styles.module.css */
.input {
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
.input:focus       { border-radius: 0.8rem; border: .2rem solid var(--primary); }
.input::placeholder { color: var(--gray-500); font-size: 1.4rem; font-style: italic; }
.input:disabled    { border-bottom: 0.2rem solid var(--disable); color: var(--text-muted); }
```

---

### `src/components/Footer/index.tsx`

```tsx
import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="">Entenda como funciona a técnica Pomodoro</a>
      <a href="">Chronos Pomodoro &copy; {new Date().getFullYear()} Feito com ódio!</a>
    </footer>
  );
}
```

```css
/* Footer/styles.module.css */
.footer { display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 1.4rem; gap: 1.6rem; }
.footer a        { text-decoration: none; color: var(--text-muted); }
.footer a:hover  { text-decoration: underline; }
```

---

### `src/components/GenericHtml/index.tsx`

```tsx
import styles from "./style.module.css";

type GenericHtmlProps = { children: React.ReactNode };

export default function GenericHtml({ children }: GenericHtmlProps) {
  return <div className={styles.genericHtml}>{children}</div>;
}
```

```css
/* GenericHtml/style.module.css */
.genericHtml h1 { font-size: 3.2rem; margin-bottom: 1.6rem; }
.genericHtml h2 { font-size: 2.4rem; margin-bottom: 1.2rem; }
.genericHtml h3 { font-size: 2rem;   margin-bottom: 1rem; }
.genericHtml p  { font-size: 1.6rem; line-height: 1.6; margin-bottom: 1.6rem; }
.genericHtml a  { color: var(--link-color); text-decoration: none; font-weight: bold; }
.genericHtml a:hover { text-decoration: underline; }
.genericHtml ul { padding-left: 2.4rem; }
.genericHtml li { margin-bottom: 0.8rem; }
.genericHtml img { max-width: 100%; height: auto; border-radius: 0.8rem; display: block; margin: 1.6rem 0; }
```

---

### `src/components/Heading/index.tsx`

```tsx
import styles from "./styles.module.css";
import type { ReactNode } from "react";

type HeadingProps = { children: ReactNode };

export default function Heading({ children }: HeadingProps) {
  return <h1 className={styles.heading}>{children}</h1>;
}
```

```css
/* Heading/styles.module.css */
.heading { display: flex; align-items: center; justify-content: center; gap: 2.4rem; }
```

---

### `src/components/Logo/index.tsx`

```tsx
import styles from "./styles.module.css";
import { TimerIcon } from "lucide-react";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <a className={styles.logoLink} href="/">
        <TimerIcon />
        <span>Chronos</span>
      </a>
    </div>
  );
}
```

```css
/* Logo/styles.module.css */
.logo     { display: flex; align-items: center; justify-content: center; gap: 2.4rem; padding-top: 3.2rem; }
.logoLink { display: flex; align-items: center; justify-content: center; gap: 0.4rem; flex-direction: column; font-size: 4.2rem; text-decoration: none; font-weight: bold; color: var(--primary); transition: all 0.1s ease-in-out; }
.logoLink:hover { filter: brightness(80%); }
.logo svg { width: 6.4rem; height: 6.4rem; }
```

---

### `src/components/MainForm/index.tsx`

```tsx
import DefaultButton from "../DefaultButton";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import DefaultInput from "../DefaultInput";
import Cycles from "../Cycles";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export default function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();
    if (!taskName) {
      alert("Digite um nome para a tarefa");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration * 60;

    setState((prevState) => ({
      ...prevState,
      config: { ...prevState.config },
      activeTask: newTask,
      currentCycle: nextCycle,
      secondsRemaining,
      formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
      tasks: [...prevState.tasks, newTask],
    }));
  }

  function handleInterruptTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
      tasks: prevState.tasks.map((task) => {
        if (prevState.activeTask && prevState.activeTask.id === task.id) {
          return { ...task, interruptDate: Date.now() };
        }
        return task;
      }),
    }));
  }

  return (
    <form onSubmit={handleCreateNewTask} className="form">
      <div className="formRow">
        <DefaultInput
          labelText="Task"
          title="Title"
          id="input"
          type="text"
          placeholder="Digite Algo"
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>
      <div className="formRow">
        <p>Próximo Intervalo é de 25 minutos</p>
      </div>
      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}
      <div className="formRow">
        {!state.activeTask ? (
          <DefaultButton
            type="submit"
            icon={<PlayCircleIcon />}
            color="green"
            aria-label="Iniciar Nova Tarefa"
            title="Iniciar Nova Tarefa"
          />
        ) : (
          <DefaultButton
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            aria-label="Interromper tarefa atual"
            title="Interromper Tarefa"
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}
```

---

### `src/components/Menu/index.tsx`

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
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(e: MouseEventType) {
    e.preventDefault();
    setTheme(prevTheme => prevTheme === "dark" ? 'light' : 'dark');
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
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
  );
}
```

```css
/* Menu/styles.module.css */
.menu { display: flex; align-items: center; justify-content: center; gap: 1.6rem; }
.menuLink { display: inline-flex; align-items: center; justify-content: center; background: var(--primary); color: var(--text-over-primary); transition: all 0.1s ease-in-out; padding: 1.2rem; border-radius: 0.8rem; }
.menuLink:hover { filter: brightness(80%); }
.menu svg { width: 2.4rem; height: 2.4rem; }
```

---

### `src/components/PomodoroConfig/index.tsx`

```tsx
import { useEffect, useState } from "react";
import styles from './styles.module.css';

type WorkDuration = number;
type BreakDuration = number;
type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function PomodoroConfig() {
  const [workDuration, setWorkDuration] = useState<WorkDuration>(() => {
    const stored = localStorage.getItem('workDuration');
    return stored ? Number(stored) : 25;
  });

  const [breakDuration, setBreakDuration] = useState<BreakDuration>(() => {
    const stored = localStorage.getItem('breakDuration');
    return stored ? Number(stored) : 5;
  });

  function handleWorkDuration(e: InputEvent) {
    setWorkDuration(Number(e.target.value));
  }

  function handleBreakDuration(e: InputEvent) {
    setBreakDuration(Number(e.target.value));
  }

  useEffect(() => {
    localStorage.setItem('workDuration', String(workDuration));
    localStorage.setItem('breakDuration', String(breakDuration));
  }, [workDuration, breakDuration]);

  return (
    <div className={styles.pomodoroTest}>
      <input type="number" onChange={handleWorkDuration} value={workDuration} />
      <input type="number" onChange={handleBreakDuration} value={breakDuration} />
      <p>Trabalho: {workDuration} | Pausa: {breakDuration}</p>
    </div>
  );
}
```

```css
/* PomodoroConfig/styles.module.css */
.pomodoroTest {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  background: var(--primary);
  color: var(--text-over-primary);
}
```

---

## Estado Atual e Pontos de Atenção

### O que está funcionando

- Criação de tarefas via `MainForm` com nome e ciclo calculado automaticamente.
- Interrupção de tarefas com marcação de `interruptDate` no histórico interno.
- Exibição do valor formatado do contador via `CountDown` (leitura direta do contexto).
- Visualização dos ciclos via `Cycles` com bolinhas coloridas por tipo.
- Toggle de tema dark/light com persistência em `localStorage`.
- Sistema de design coeso via CSS custom properties em `theme.css`.

### O que ainda não está implementado

- **Decremento do contador** — nenhum `setInterval` existe. O `CountDown` apenas lê `formattedSecondsRemaining`; o timer nunca corre.
- **Conclusão de tarefa** — `completeDate` em `TaskModel` nunca recebe valor.
- **`useReducer`** — infraestrutura criada (`taskActions.ts`, `taskReducer.ts`), mas o `TaskContextProvider` usa `useState`. Os `case`s do reducer devolvem `state` sem mutação.
- **Roteamento** — `react-router-dom` não está instalado. Páginas `AboutPomodoro`, `NotFound` e `PomodoroConfig` existem mas não são renderizadas por rota.
- **Integração do `PomodoroConfig` com o `TaskContext`** — valores de duração persistidos em `localStorage` local não alimentam `state.config`.
- **Histórico de tarefas** — nenhuma página ou componente de histórico existe.
- **`Logo` com href correto** — o link aponta para `"http://"` (string vazia de protocolo).
- **Texto hardcoded no `MainForm`** — "Próximo Intervalo é de 25 minutos" não reflete o valor real do próximo ciclo calculado.
- **`console.log`** ativo em `Cycles/index.tsx` — precisa ser removido antes de produção.
- **Typo em `aria-label`** no `Cycles` — "Indicaddor" com duplo 'd'.
- **`src/pages/Menu/index.tsx`** exporta um componente nomeado `NotFound` — provável resquício ou erro de nomenclatura.

---

*Documento gerado automaticamente a partir da leitura da codebase do projeto Chronos App — 09/03/2026.*

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
