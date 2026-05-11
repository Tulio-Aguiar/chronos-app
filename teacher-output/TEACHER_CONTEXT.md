# TEACHER_CONTEXT — chronos-app

## Metadados

| Campo | Valor |
|---|---|
| Modo | projeto completo |
| Projeto | chronos-app v0.0.0 |
| Framework | React |
| Linguagem | TypeScript |
| Bundler | Vite |
| Estado global | Context API / local |
| Módulos | ESM |
| Stack | React · TypeScript · Vite |

## Arquivos Analisados

- `src\adapters\showMessage.ts` (module, src)
- `src\App.tsx` (component, src)
- `src\assets\styles\global.css` (stylesheet, src)
- `src\assets\styles\theme.css` (stylesheet, src)
- `src\components\Container\index.tsx` (component, src)
- `src\components\Container\styles.module.css` (stylesheet, src)
- `src\components\CountDown\index.tsx` (component, src)
- `src\components\CountDown\styles.module.css` (stylesheet, src)
- `src\components\Cycles\index.tsx` (component, src)
- `src\components\Cycles\styles.module.css` (stylesheet, src)
- `src\components\DefaultButton\index.tsx` (component, src)
- `src\components\DefaultButton\styles.module.css` (stylesheet, src)
- `src\components\DefaultInput\index.tsx` (component, src)
- `src\components\DefaultInput\styles.module.css` (stylesheet, src)
- `src\components\Footer\index.tsx` (component, src)
- `src\components\Footer\styles.module.css` (stylesheet, src)
- `src\components\GenericHtml\index.tsx` (component, src)
- `src\components\GenericHtml\style.module.css` (stylesheet, src)
- `src\components\Heading\index.tsx` (component, src)
- `src\components\Heading\styles.module.css` (stylesheet, src)
- `src\components\Logo\index.tsx` (component, src)
- `src\components\Logo\styles.module.css` (stylesheet, src)
- `src\components\MainForm\index.tsx` (component, src)
- `src\components\Menu\index.tsx` (component, src)
- `src\components\Menu\styles.module.css` (stylesheet, src)
- `src\components\PomodoroConfig\index.tsx` (component, src)
- `src\components\PomodoroConfig\main.tsx` (component, src)
- `src\components\PomodoroConfig\styles.module.css` (stylesheet, src)
- `src\components\Tips\index.tsx` (component, src)
- `src\contexts\TaskContext\initialTaskState.ts` (module, src)
- `src\contexts\TaskContext\taskActions.ts` (module, src)
- `src\contexts\TaskContext\TaskContext.tsx` (context, src)
- `src\contexts\TaskContext\TaskContextProvider.tsx` (context, src)
- `src\contexts\TaskContext\taskReducer.ts` (reducer, src)
- `src\contexts\TaskContext\useTaskContext.ts` (hook, src)
- `src\main.tsx` (component, src)
- `src\models\TaskModel.ts` (module, src)
- `src\models\TaskStateModel.ts` (module, src)
- `src\pages\Home\AboutPomodoro\index.tsx` (component, src)
- `src\pages\Home\index.tsx` (component, src)
- `src\pages\Home\NotFound\index.tsx` (component, src)
- `src\pages\Menu\index.tsx` (component, src)
- `src\templates\MainTemplate\index.tsx` (component, src)
- `src\utils\formatSecondsToMinutes.ts` (module, src)
- `src\utils\getNextCycle.ts` (module, src)
- `src\utils\getNextCycleType.ts` (module, src)
- `src\utils\LoadBeep.ts` (module, src)
- `src\workers\timerWorker.js` (module, src)
- `src\workers\TimerWorkerManager.ts` (module, src)
- `eslint.config.js` (config, root)
- `index.html` (html, root)
- `vite.config.ts` (config, root)

## Análise por Arquivo

### `src\adapters\showMessage.ts`
- **Tipo:** module
- **Complexidade:** básica
- **Linhas:** 33
- **Origem:** src
- **Padrões detectados:** hasNamedExport
- **Imports externos:** react-toastify

**Conteúdo:**
```ts
import { toast } from "react-toastify";

type MessageType = "success" | "error" | "warning" | "info";

type ShowMessage = {
  (message: string, type: MessageType): void;
  dismiss: () => void;
};

export const showMessage: ShowMessage = Object.assign(
  (message: string, type: MessageType) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "info":
        toast.info(message);
        break;
    }
  },
  {
    dismiss: () => {
      toast.dismiss();
    },
  },
);

```

### `src\App.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 29
- **Origem:** src
- **Padrões detectados:** hasGeneric, hasDefaultExport
- **Exports:** App
- **Imports internos:** ./pages/Home, ./contexts/TaskContext/TaskContextProvider
- **Imports externos:** react-toastify

**Conteúdo:**
```tsx
import Home from "./pages/Home";

import "./assets/styles/global.css";
import "./assets/styles/theme.css";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import { Bounce, ToastContainer } from "react-toastify";

export default function App() {
  return (
    // Peça 2
    <TaskContextProvider>
      <Home />
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </TaskContextProvider>
  );
}

```

### `src\assets\styles\global.css`
- **Tipo:** stylesheet
- **Complexidade:** básica
- **Linhas:** 32
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
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
  font-size: 1.6rem; /* 16px*/
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

### `src\assets\styles\theme.css`
- **Tipo:** stylesheet
- **Complexidade:** básica
- **Linhas:** 105
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
```css
/*
🎨 Estrutura de cores do projeto

🔹 Cores Dinâmicas (mudam entre os temas claro/escuro)
   - Essas cores se adaptam ao tema escolhido pelo usuário.
   - Exemplo: `gray-900` será escuro no modo dark e claro no modo light.

🔸 Cores Fixas (não mudam entre os temas)
   - São usadas para botões, alertas e destaques.
   - Exemplo: `primary`, `success`, `error` sempre terão os mesmos tons.

📝 Estrutura:
   - Fundo geral: `gray-900` (dinâmico)
   - Cards/caixas: `gray-800` (dinâmico)
   - Bordas/separadores: `gray-700` ou `gray-600` (dinâmico)
   - Texto principal: `--text-default` (dinâmico)
   - Texto secundário/placeholders: `--text-muted` (dinâmico)
   - Hover/ativo: `gray-700` e `gray-600` ou conforme preferir (dinâmico)

🚨 Atenção aos comentários! Eles descrevem cada categoria de cores e sua função.
*/

:root {
  /* 🎭 Tons de Cinza (cores dinâmicas que mudam entre claro/escuro) */
  --gray-100: #e6e9f0; /* Cinza mais claro (usado para fundos no modo escuro) */
  --gray-200: #cdd3e1;
  --gray-300: #aab3cc;
  --gray-400: #555f7d;
  --gray-500: #454f6a;
  --gray-600: #363d56;

  --gray-700: #272f43; /* Bordas e separadores */
  --gray-800: #181f2e; /* Fundo de cartões e áreas destacadas */
  --gray-900: #0a0f1a; /* Fundo principal do site */

  /* 🌿 Cores Primárias (cores fixas - NÃO mudam com o tema) */
  --primary-light: #4de7b7; /* Usado para realces suaves */
  --primary: #0da170; /* Cor principal do projeto */
  --primary-dark: #065f46; /* Usado em hovers e elementos ativos */

  /* 🔗 Links */
  --link-color: #10b981; /* Cor padrão dos links */
  --link-hover: #0b8a60; /* Cor dos links ao passar o mouse */

  /* 🚦 Alertas (cores fixas, usadas para feedbacks visuais) */
  --success: #22c55e; /* Indica sucesso (verde) */
  --warning: #eab308; /* Indica alerta (amarelo) */
  --error: #991b1b; /* Indica erro (vermelho) */
  --info: #0ea5e9; /* Indica informação (azul) */

  /* 🎨 Texto sobre fundos coloridos (para garantir contraste) */
  --text-over-primary: #0a0f1a; /* Texto sobre fundo primário */
  --text-over-primary-dark: #e6e9f0; /* Texto sobre variação escura */
  --text-over-primary-light: #0a0f1a; /* Texto sobre variação clara */
  --text-over-success: #0a0f1a; /* Texto sobre fundo sucesso */
  --text-over-warning: #0a0f1a; /* Texto sobre fundo alerta */
  --text-over-error: #e6e9f0; /* Texto sobre fundo erro */
  --text-over-info: #0a0f1a; /* Texto sobre fundo informativo */

  /* 📝 Cores do Texto (dinâmicas) */
  --text-default: #e6e9f0; /* Cor padrão do texto */
  --text-muted: #aab3cc; /* Texto menos importante (placeholders, labels, etc.) */

  /* 🚫 Cores para botões e elementos desativados */
  --disabled: #555f7d; /* Cor de fundo de elementos desativados */
  --text-disabled: #aab3cc; /* Texto de botões ou inputs desativados */

  /* 🔔 Cores do Toastify (notificações) */
  --toastify-color-light: var(--text-default);
  --toastify-color-dark: var(--text-default);
  --toastify-color-info: var(--info);
  --toastify-color-success: var(--success);
  --toastify-color-warning: var(--warning);
  --toastify-color-error: var(--error);
  --toastify-text-color-light: #0a0f1a;
  --toastify-text-color-dark: #e6e9f0;
  --toastify-color-progress-light: var(--primary);
  --toastify-color-progress-dark: var(--primary);
}

/* 🌞 Modo Claro - Inverte algumas cores para manter o contraste */
:root[data-theme="light"] {
  /* Tons de Cinza Invertidos */
  --gray-100: #0a0f1a; /* Cinza mais escuro */
  --gray-200: #181f2e;
  --gray-300: #272f43;
  --gray-400: #363d56;
  --gray-500: #454f6a;
  --gray-600: #555f7d;
  --gray-700: #aab3cc;
  --gray-800: #cdd3e1;
  --gray-900: #e6e9f0; /* Fundo principal claro */
  /* 📝 Texto no modo claro */
  --text-default: #0a0f1a; /* Texto principal no modo claro */
  --text-muted: #272f43; /* Texto menos importante */

  /* 🔗 Links no modo claro */
  --link-color: #0b8a60;
  --link-hover: #065f46;

  /* 🔔 Toastify no modo claro */
  --toastify-text-color-light: #000;
  --toastify-text-color-dark: #000;
}

```

### `src\components\Container\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 20
- **Origem:** src
- **Padrões detectados:** hasImportType, hasPropsType, hasDefaultExport, hasCssModule
- **Exports:** Container
- **Imports internos:** ./styles.module.css
- **Imports externos:** react

**Conteúdo:**
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

### `src\components\Container\styles.module.css`
- **Tipo:** stylesheet
- **Complexidade:** básica
- **Linhas:** 14
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
```css
.container-fluid{
  
  max-width: auto;
}

.container {
  max-width: 98rem;
  margin: 0 auto;
}

.content{
  /* text-align: center; */
  margin: 3.2rem;
}
```

### `src\components\CountDown\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 11
- **Origem:** src
- **Padrões detectados:** hasDefaultExport, hasCssModule
- **Hooks utilizados:** useTaskContext
- **Exports:** CountDown
- **Imports internos:** ../../contexts/TaskContext/useTaskContext, ./styles.module.css

**Conteúdo:**
```tsx
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import styles from "./styles.module.css";

export default function CountDown() {
  const { state } = useTaskContext();

  return (
    <div className={styles.container}>{state.formattedSecondsRemaining}</div>
  );
}

```

### `src\components\CountDown\styles.module.css`
- **Tipo:** stylesheet
- **Complexidade:** básica
- **Linhas:** 7
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
```css
.container{
  font-size: clamp(8rem, 30vw, 16rem);
  font-weight: bold;
  text-align: center;
  line-height: 1.2;
  
}
```

### `src\components\Cycles\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 34
- **Origem:** src
- **Padrões detectados:** hasDefaultExport, hasCssModule
- **Hooks utilizados:** useTaskContext
- **Exports:** Cycles
- **Imports internos:** ../../contexts/TaskContext/useTaskContext, ../../utils/getNextCycle, ../../utils/getNextCycleType, ./styles.module.css

**Conteúdo:**
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

  return (
    <div className={styles.cycleDots}>
      {cycleStep.map((_, index) => {
        const nextCycle = getNextCycle(index);
        const nextCycleType = getNextCycleType(nextCycle);
        return (
          <span
            key={`cycle-${index}`}
            className={`${styles.cycleDot} ${styles[nextCycleType]}`}
            aria-label={`Indicador de ciclos de ${cycleDescriptionMap[nextCycleType]}`}
            title={`Indicador de ciclos de ${cycleDescriptionMap[nextCycleType]}`}
          ></span>
        );
      })}
    </div>
  );
}

```

### `src\components\Cycles\styles.module.css`
- **Tipo:** stylesheet
- **Complexidade:** básica
- **Linhas:** 33
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
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
    background: var(--primary);
    border-radius: 50%;
    
}

.workTime{
    background: var(--warning);

}

.shortBreakTime{
    background: var(--primary);
}

.longBreakTime{
    background: var(--info);
}
```

### `src\components\DefaultButton\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 17
- **Origem:** src
- **Padrões detectados:** hasPropsType, hasDefaultExport, hasCssModule
- **Exports:** DefaultButton
- **Imports internos:** ./styles.module.css

**Conteúdo:**
```tsx
import styles from './styles.module.css';

type DefaultButtonProps = {
    icon?: React.ReactNode;
    color?: 'green' | 'red';
} & React.ComponentProps<'button'>;

export default function DefaultButton ({icon, color='green', ...props}: DefaultButtonProps){
    return (
    <>
         
         <button className={`${styles.button} ${styles[color]}`} {...props} >
            {icon}
         </button>
    </>
    );
}
```

### `src\components\DefaultButton\styles.module.css`
- **Tipo:** stylesheet
- **Complexidade:** básica
- **Linhas:** 33
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
```css
.button{
    border: none;
    background: var(--primary);
    color:var(--text-over-primary);
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

.button:hover{
    filter: brightness(80%);
}

.green{
    background: var(--primary);
    color:var(--text-over-primary);
}
.red{
    background: var(--error);
    color:var(--text-over-error);
}

```

### `src\components\DefaultInput\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 15
- **Origem:** src
- **Padrões detectados:** hasPropsType, hasDefaultExport, hasCssModule
- **Exports:** DefaultInput
- **Imports internos:** ./styles.module.css

**Conteúdo:**
```tsx
import styles from './styles.module.css';

type DefaultInputProps = {
    id:string;
    labelText:string;
} & React.ComponentProps<'input'>;

export default function DefaultInput ({id, type, labelText,...rest}: DefaultInputProps){
    return (
    <>
         <label htmlFor={id}>{labelText}</label>
         <input className={styles.input} id={id} type={type} {...rest} placeholder='Digite Algo' />
    </>
    );
}
```

### `src\components\DefaultInput\styles.module.css`
- **Tipo:** stylesheet
- **Complexidade:** básica
- **Linhas:** 29
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
```css
.input{
    background: transparent;
    text-align: center;
    font-size: 1.8rem;
    padding: 0.8rem;
    color:var(--text-default);
    outline: none;
    border: 0.2rem solid transparent;
    border-bottom:0.2rem solid var(--primary);
    transition: all 0.3s ease-in-out;
}



.input:focus{
    border-radius: 0.8rem;
    border: .2rem solid var(--primary);
}

.input::placeholder{
    color:var(--gray-500);
    font-size: 1.4rem;
    font-style: italic;
}

.input:disabled{
    border-bottom: 0.2rem solid var(--disable);
    color:var(--text-muted);
}
```

### `src\components\Footer\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 16
- **Origem:** src
- **Padrões detectados:** hasDefaultExport, hasCssModule
- **Exports:** Footer
- **Imports internos:** ./styles.module.css

**Conteúdo:**
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

### `src\components\Footer\styles.module.css`
- **Tipo:** stylesheet
- **Complexidade:** básica
- **Linhas:** 23
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
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

### `src\components\GenericHtml\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 15
- **Origem:** src
- **Padrões detectados:** hasPropsType, hasDefaultExport, hasCssModule
- **Exports:** GenericHtml
- **Imports internos:** ./style.module.css

**Conteúdo:**
```tsx
import styles from "./style.module.css";

type GenericHtmlProps ={
    children:React.ReactNode;
}

export default function GenericHtml({children}:GenericHtmlProps){
    
    return(
        <div className={styles.genericHtml}>
            {children}
            </div>
        
    )
}   
```

### `src\components\GenericHtml\style.module.css`
- **Tipo:** stylesheet
- **Complexidade:** básica
- **Linhas:** 46
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
```css
.genericHtml h1 {
    font-size: 3.2rem;
    margin-bottom: 1.6rem;
  }
  
  .genericHtml h2 {
    font-size: 2.4rem;
    margin-bottom: 1.2rem;
  }
  
  .genericHtml h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
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
  
  .genericHtml a:hover {
    text-decoration: underline;
  }
  
  .genericHtml ul {
    padding-left: 2.4rem;
  }
  
  .genericHtml li {
    margin-bottom: 0.8rem;
  }
  
  .genericHtml img {
    max-width: 100%;
    height: auto;
    border-radius: 0.8rem;
    display: block;
    margin: 1.6rem 0;
  }
```

### `src\components\Heading\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 14
- **Origem:** src
- **Padrões detectados:** hasImportType, hasPropsType, hasDefaultExport, hasCssModule
- **Exports:** Heading
- **Imports internos:** ./styles.module.css
- **Imports externos:** react

**Conteúdo:**
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

### `src\components\Heading\styles.module.css`
- **Tipo:** stylesheet
- **Complexidade:** básica
- **Linhas:** 7
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
```css
.heading{
  /* margin: 3.2rem 0; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap:2.4rem;
}
```

### `src\components\Logo\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 16
- **Origem:** src
- **Padrões detectados:** hasDefaultExport, hasCssModule
- **Exports:** Logo
- **Imports internos:** ./styles.module.css
- **Imports externos:** lucide-react

**Conteúdo:**
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

### `src\components\Logo\styles.module.css`
- **Tipo:** stylesheet
- **Complexidade:** básica
- **Linhas:** 31
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
```css
.logo{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  padding-top:3.2rem;
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
  color:var(--primary);
  transition: all 0.1s ease-in-out;
}

.logoLink:hover{
  filter:brightness(80%);
  
}

.logo svg {
  width: 6.4rem;
  height: 6.4rem;
}
```

### `src\components\MainForm\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 101
- **Origem:** src
- **Padrões detectados:** hasUseRef, hasImportType, hasGeneric, hasDefaultExport
- **Hooks utilizados:** useRef, useTaskContext
- **Exports:** MainForm
- **Imports internos:** ../DefaultButton, ../DefaultInput, ../Cycles, ../../models/TaskModel, ../../contexts/TaskContext/useTaskContext, ../../utils/getNextCycle, ../../utils/getNextCycleType, ../../contexts/TaskContext/taskActions, ../Tips, ../../adapters/showMessage
- **Imports externos:** lucide-react, react

**Conteúdo:**
```tsx
import DefaultButton from "../DefaultButton";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import DefaultInput from "../DefaultInput";
import Cycles from "../Cycles";
import { useRef, type FormEvent } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import { showMessage } from "../../adapters/showMessage";

export default function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();
    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();
    if (!taskName) {
      showMessage("Digite um nome para a tarefa", "warning");
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

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    showMessage("Tarefa criada com sucesso", "success");
  } // ← fecha handleCreateNewTask

  function handleInterruptTask() {
    showMessage.dismiss();
    showMessage("Tarefa interrompida com sucesso", "success");
    dispatch({
      type: TaskActionTypes.INTERRUPT_TASK,
    });
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
        <Tips />
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
            key="Botão de Submit"
          />
        ) : (
          <DefaultButton
            aria-label="Interromper tarefa atual"
            title="Interromper Tarefa"
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            key="Não enviar nada"
          />
        )}
      </div>
    </form>
  );
}

```

### `src\components\Menu\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 53
- **Origem:** src
- **Padrões detectados:** hasUseState, hasUseEffect, hasGeneric, hasCasting, hasDefaultExport, hasCssModule
- **Hooks utilizados:** useEffect, useState
- **Exports:** Menu
- **Imports internos:** ./styles.module.css
- **Imports externos:** lucide-react, react

**Conteúdo:**
```tsx
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
  }

  useEffect(() => {
   
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  },[theme]);
 
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

### `src\components\Menu\styles.module.css`
- **Tipo:** stylesheet
- **Complexidade:** básica
- **Linhas:** 29
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
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
  
  background:var(--primary);
  color:var(--text-over-primary);
  transition: all 0.1s ease-in-out;
  padding: 1.2rem;
  border-radius: 0.8rem;
}

.menuLink:hover{
  filter:brightness(80%);
  
}

.menu svg {
  width: 2.4rem;
  height: 2.4rem;
}
```

### `src\components\PomodoroConfig\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 45
- **Origem:** src
- **Padrões detectados:** hasUseState, hasUseEffect, hasGeneric, hasDefaultExport, hasCssModule
- **Hooks utilizados:** useEffect, useState
- **Exports:** PomodoroConfig
- **Imports internos:** ./styles.module.css
- **Imports externos:** react

**Conteúdo:**
```tsx
import { useEffect, useState } from "react";
import styles from './styles.module.css'

type WorkDuration = number;
type BreakDuration = number;
type InputEvent = React.ChangeEvent<HTMLInputElement>

export default function PomodoroConfig(){


const [workDuration, setWorkDuration] = useState<WorkDuration>(()=>{
    const stored = localStorage.getItem('workDuration');
    return stored ? Number(stored) : 25;
});

function handleWorkDuration (e:InputEvent){
    setWorkDuration(Number(e.target.value));
}

const [breakDuration, setBreakDuration] = useState<BreakDuration>(()=>{
    const stored = localStorage.getItem('breakDuration');
    return stored ? Number(stored):5;
})

function handleBreakDuration (e:InputEvent){
    setBreakDuration(Number(e.target.value));
}

useEffect(() => {
    localStorage.setItem('workDuration', String(workDuration));
    localStorage.setItem('breakDuration', String(breakDuration));
  }, [workDuration, breakDuration]);


    return(
        <>
            <div className={styles.pomodoroTest}>
                <input type="number" name="" id="" onChange={handleWorkDuration} value={workDuration} />
                <input type="number" name="" id="" onChange={handleBreakDuration} value={breakDuration} />

                <p>Trabalho:{workDuration} | Pausa:{breakDuration}</p>
            </div>
        </>
    )
}
```

### `src\components\PomodoroConfig\main.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 9
- **Origem:** src
- **Padrões detectados:** hasConsoleLog

**Conteúdo:**
```tsx
const user = {
  name: "Túlio Aguiar",
  age: 38,
  City: "Konstanz",
  Country: "Deutschland",
};

console.log(user);

```

### `src\components\PomodoroConfig\styles.module.css`
- **Tipo:** stylesheet
- **Complexidade:** básica
- **Linhas:** 11
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
```css
.pomodoroTest{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    background:var(--primary);
  color:var(--text-over-primary);
}


```

### `src\components\Tips\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 35
- **Origem:** src
- **Padrões detectados:** hasNamedExport
- **Hooks utilizados:** useTaskContext
- **Exports:** Tips
- **Imports internos:** ../../contexts/TaskContext/useTaskContext, ../../utils/getNextCycle, ../../utils/getNextCycleType

**Conteúdo:**
```tsx
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  const tipsForWhenActiveTask = {
    workTime: <span>Foque por {state.config.workTime} minutos</span>,
    shortBreakTime: (
      <span>Descanse por {state.config.shortBreakTime} minutos</span>
    ),
    longBreakTime: <span>Descanso longo{state.config.longBreakTime}</span>,
  };

  const tipsForWhenNotActiveTask = {
    workTime: (
      <span>Próximo intervalo é de {state.config.workTime} minutos</span>
    ),
    shortBreakTime: (
      <span>Próximo intervalo é de {state.config.shortBreakTime} minutos</span>
    ),
    longBreakTime: (
      <span>Próximo Intervalo é de {state.config.longBreakTime} minutos</span>
    ),
  };
  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForWhenNotActiveTask[nextCycleType]}
    </>
  );
}

```

### `src\contexts\TaskContext\initialTaskState.ts`
- **Tipo:** module
- **Complexidade:** básica
- **Linhas:** 15
- **Origem:** src
- **Padrões detectados:** hasImportType, hasNamedExport
- **Imports internos:** ../../models/TaskStateModel

**Conteúdo:**
```ts
import type { TaskStateModel } from "../../models/TaskStateModel";

export const initialTaskState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: "00:00",
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 1,
    shortBreakTime: 1,
    longBreakTime: 1,
  },
};

```

### `src\contexts\TaskContext\taskActions.ts`
- **Tipo:** module
- **Complexidade:** intermediária
- **Linhas:** 42
- **Origem:** src
- **Padrões detectados:** hasUseReducer, hasReducer, hasImportType, hasDiscriminatedUnion, hasAsConst, hasNamedExport
- **Hooks utilizados:** useReducer
- **Exports:** TaskActionTypes, TaskActionsWithPayload, TaskActionsWithoutPayload, TaskActionModel
- **Imports internos:** ../../models/TaskModel

**Conteúdo:**
```ts
// useReducer <- hook do React que recebe um reducer e um estado inicial
// reducer <- função que recebe o estado atual e uma ação, e retorna o novo estado
// state <- o estado atual
// action <- a ação disparada, geralmente é um objeto com type e (opcionalmente) payload
// type <- o tipo da ação, geralmente uma string (pode ser enum, constante, etc)
// payload <- os dados extras enviados junto com a action, se necessário para atualizar o estado

import type { TaskModel } from "../../models/TaskModel";

export const TaskActionTypes = {
  START_TASK: "START_TASK",
  INTERRUPT_TASK: "INTERRUPT_TASK",
  RESET_STATE: "RESET_STATE",
  COUNT_DOWN: "COUNT_DOWN",
  COMPLETE_TASK: "COMPLETE_TASK",
} as const;

export type TaskActionsWithPayload =
  | {
      type: typeof TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: typeof TaskActionTypes.COUNT_DOWN;
      payload: { secondsRemaining: number };
    };

export type TaskActionsWithoutPayload =
  | {
      type: typeof TaskActionTypes.RESET_STATE;
    }
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK;
    }
  | {
      type: typeof TaskActionTypes.COMPLETE_TASK;
    };

export type TaskActionModel =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload;

```

### `src\contexts\TaskContext\TaskContext.tsx`
- **Tipo:** context
- **Complexidade:** intermediária
- **Linhas:** 17
- **Origem:** src
- **Padrões detectados:** hasContext, hasImportType, hasGeneric, hasPropsType, hasNamedExport
- **Exports:** TaskContext
- **Imports internos:** ../../models/TaskStateModel, ./initialTaskState, ./taskActions
- **Imports externos:** react

**Conteúdo:**
```tsx
import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialTaskState } from "./initialTaskState";
import type { TaskActionModel } from "./taskActions";

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
};

const initialContextValue = {
  state: initialTaskState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);

```

### `src\contexts\TaskContext\TaskContextProvider.tsx`
- **Tipo:** context
- **Complexidade:** intermediária
- **Linhas:** 68
- **Origem:** src
- **Padrões detectados:** hasUseEffect, hasUseReducer, hasUseRef, hasConsoleLog, hasPropsType, hasNamedExport
- **Hooks utilizados:** useEffect, useReducer, useRef
- **Exports:** TaskContextProvider
- **Imports internos:** ./initialTaskState, ./TaskContext, ./taskReducer, ../../workers/TimerWorkerManager, ./taskActions, ../../utils/LoadBeep
- **Imports externos:** react

**Conteúdo:**
```tsx
import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/LoadBeep";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const worker = TimerWorkerManager.getInstance();

  useEffect(() => {
    worker.onmessage((e) => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }

        dispatch({
          type: TaskActionTypes.COMPLETE_TASK,
        });
        worker.terminate();
        return;
      }

      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    });
  }, [worker]);

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
      return;
    }

    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      console.log("Carregando Áudio...");
      playBeepRef.current = loadBeep();
    } else {
      console.log("Destruindo Áudio...");
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

```

### `src\contexts\TaskContext\taskReducer.ts`
- **Tipo:** reducer
- **Complexidade:** básica
- **Linhas:** 76
- **Origem:** src
- **Padrões detectados:** hasReducer, hasImportType, hasNamedExport
- **Imports internos:** ../../models/TaskStateModel, ../../utils/getNextCycle, ../../utils/formatSecondsToMinutes, ./taskActions, ./taskActions, ./initialTaskState

**Conteúdo:**
```ts
import type { TaskStateModel } from "../../models/TaskStateModel";
import { getNextCycle } from "../../utils/getNextCycle";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";
import type { TaskActionModel } from "./taskActions";
import { TaskActionTypes } from "./taskActions";
import { initialTaskState } from "./initialTaskState";

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;

      return {
        ...state,
        currentCycle: nextCycle,
        activeTask: newTask,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      // Interrompe a tarefa ativa (se existir) e zera o contador
      if (!state.activeTask) return state;

      const interruptedTaskId = state.activeTask.id;

      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((task) =>
          task.id === interruptedTaskId
            ? { ...task, interruptDate: Date.now() }
            : task,
        ),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((task) =>
          task.id === state.activeTask?.id
            ? { ...task, completeDate: Date.now() }
            : task,
        ),
      };
    }

    case TaskActionTypes.RESET_STATE: {
      return initialTaskState;
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }
    default:
      // Sempre deve retornar o estado
      return state;
  }
}

```

### `src\contexts\TaskContext\useTaskContext.ts`
- **Tipo:** hook
- **Complexidade:** intermediária
- **Linhas:** 7
- **Origem:** src
- **Padrões detectados:** hasUseContext, hasCustomHook, hasNamedExport
- **Hooks utilizados:** useContext, useTaskContext
- **Imports internos:** ./TaskContext
- **Imports externos:** react

**Conteúdo:**
```ts
import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export function useTaskContext() {
  return useContext(TaskContext);
}

```

### `src\main.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 11
- **Origem:** src
- **Padrões detectados:** hasGeneric
- **Imports internos:** ./App.tsx
- **Imports externos:** react, react-dom/client

**Conteúdo:**
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

### `src\models\TaskModel.ts`
- **Tipo:** module
- **Complexidade:** básica
- **Linhas:** 12
- **Origem:** src
- **Padrões detectados:** hasImportType, hasNamedExport
- **Exports:** TaskModel
- **Imports internos:** ./TaskStateModel

**Conteúdo:**
```ts
import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completeDate: number | null; //Quando o timer chegar ao final, coloca-se o confliteDate;
  interruptDate: number | null; //Quando a Task for interrompida.
  type: keyof TaskStateModel["config"]; //Work, shortBreak, longBreak
};

```

### `src\models\TaskStateModel.ts`
- **Tipo:** module
- **Complexidade:** básica
- **Linhas:** 18
- **Origem:** src
- **Padrões detectados:** hasImportType, hasNamedExport
- **Exports:** TaskStateModel
- **Imports internos:** ./TaskModel

**Conteúdo:**
```ts
import type { TaskModel } from "./TaskModel";

//Estado estivesse em um componente que vai repassar esse estado para os componentes filhos

export type TaskStateModel = {
  tasks: TaskModel[]; // Precisa no histórico / MainForm
  secondsRemaining: number; //Countdown // Histórico, Mainform // Button
  formattedSecondsRemaining: string; //Título //Countdown //Histórico
  activeTask: TaskModel | null; // CounDown //Histórico //MainForm// Button
  currentCycle: number; // Home;
  config: {
    //MainForm
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};

```

### `src\pages\Home\AboutPomodoro\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 128
- **Origem:** src
- **Padrões detectados:** hasGeneric, hasDefaultExport
- **Exports:** AboutPomodoro
- **Imports internos:** ../../../components/Container, ../../../components/GenericHtml, ../../../components/Heading, ../../../templates/MainTemplate

**Conteúdo:**
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
            com pausas. O objetivo é manter o foco total por um período curto e
            garantir descansos para evitar o cansaço mental.
          </p>

          <img src='https://placehold.co/1920x1080' alt='' />

          <h2>Como funciona o Pomodoro tradicional?</h2>
          <ul>
            <li>
              <strong>1. Defina uma tarefa</strong> que você deseja realizar.
            </li>
            <li>
              <strong>2. Trabalhe nela por 25 minutos</strong> sem interrupções.
            </li>
            <li>
              <strong>3. Faça uma pausa curta de 5 minutos</strong>.
            </li>
            <li>
              <strong>4. A cada 4 ciclos, faça uma pausa longa</strong>{' '}
              (geralmente 15 a 30 minutos).
            </li>
          </ul>

          <h2>
            Mas no <strong>Chronos Pomodoro</strong> tem um diferencial 🚀
          </h2>

          <p>
            Nosso app segue o conceito original, mas com algumas melhorias e
            personalizações pra deixar o processo ainda mais eficiente:
          </p>

          <h3>⚙️ Personalização do tempo</h3>
          <p>
            Você pode configurar o tempo de foco, descanso curto e descanso
            longo do jeito que quiser! Basta acessar a{' '}
            <a href='/settings'>página de configurações</a> e ajustar os minutos
            como preferir.
          </p>

          <h3>🔁 Ciclos organizados em sequência</h3>
          <p>
            A cada ciclo completado, uma nova task é adicionada automaticamente
            ao seu histórico, e o app já sugere o próximo ciclo (foco ou
            descanso).
          </p>
          <p>
            <strong>Nosso padrão:</strong>
          </p>
          <ul>
            <li>
              Ciclos <strong>ímpares</strong>: Trabalho (foco).
            </li>
            <li>
              Ciclos <strong>pares</strong>: Descanso curto.
            </li>
            <li>
              Ciclo <strong>8</strong>: Descanso longo especial, pra resetar o
              ciclo completo.
            </li>
          </ul>

          <h3>🍅 Visualização dos ciclos</h3>
          <p>
            Logo abaixo do cronômetro, você verá bolinhas coloridas
            representando os ciclos:
          </p>
          <ul>
            <li>🟡 Amarelo: Ciclo de trabalho (foco).</li>
            <li>🟢 Verde: Descanso curto.</li>
            <li>🔵 Azul: Descanso longo (aparece a cada 8 ciclos).</li>
          </ul>

          <p>
            Assim, você sempre sabe em que parte do processo está e o que vem a
            seguir. Não precisa mais anotar no papel ou ficar calculando de
            cabeça!
          </p>

          <h3>📊 Histórico automático</h3>
          <p>
            Todas as suas tarefas e ciclos concluídos ficam salvos no{' '}
            <a href='/history'>histórico</a>, com status de completas ou
            interrompidas. Assim, você consegue acompanhar sua evolução ao longo
            do tempo.
          </p>

          <h2>Por que usar o Chronos Pomodoro?</h2>
          <ul>
            <li>✅ Organize seu foco com clareza.</li>
            <li>✅ Trabalhe e descanse na medida certa.</li>
            <li>✅ Personalize seus próprios ciclos e tempos.</li>
            <li>✅ Acompanhe seu histórico automaticamente.</li>
          </ul>

          <p>
            <strong>Pronto pra focar?</strong> Bora lá{' '}
            <a href='/'>voltar para a página inicial</a> e iniciar seus
            Pomodoros! 🍅🚀
          </p>

          <p>
            <em>"Foco total, sem pressa, sem pausa, só vai!"</em> 💪🧘‍♂️
          </p>
        </GenericHtml>
      </Container>
    </MainTemplate>
    </>
    )
  } 
```

### `src\pages\Home\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 22
- **Origem:** src
- **Padrões detectados:** hasGeneric, hasDefaultExport
- **Exports:** Home
- **Imports internos:** ../../components/Container, ../../components/CountDown, ../../components/MainForm, ../../templates/MainTemplate

**Conteúdo:**
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
          <CountDown />
        </Container>

        <Container>
          <MainForm />
        </Container>
      </MainTemplate>
    </>
  );
}

```

### `src\pages\Home\NotFound\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 40
- **Origem:** src
- **Padrões detectados:** hasGeneric, hasDefaultExport
- **Exports:** NotFound
- **Imports internos:** ../../../components/Container, ../../../components/GenericHtml, ../../../components/Heading, ../../../templates/MainTemplate

**Conteúdo:**
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
            Talvez ela tenha tirado férias, resolvido explorar o universo ou se
            perdido em algum lugar entre dois buracos negros. 🌌
          </p>
          <p>
            Mas calma, você não está perdido no espaço (ainda). Dá pra voltar em
            segurança para a <a href='/'>página principal</a> ou{' '}
            <a href='/history'>para o histórico</a> — ou pode ficar por aqui e
            fingir que achou uma página secreta que só os exploradores mais
            legais conseguem acessar. 🧭✨
          </p>
          <p>
            Se você acha que essa página deveria existir (ou se quiser bater um
            papo sobre viagem no tempo e buracos de minhoca), é só entrar em
            contato. Caso contrário, use o menu para voltar ao mundo real.
          </p>
          <p>
            Enquanto isso, fica aqui uma reflexão: "Se uma página não existe na
            internet, será que ela existiu de verdade?" 🤔💭
          </p>
        </GenericHtml>
      </Container>
    </MainTemplate>
    </>
    )
  } 
```

### `src\pages\Menu\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 22
- **Origem:** src
- **Padrões detectados:** hasGeneric, hasDefaultExport
- **Exports:** NotFound
- **Imports internos:** ../../templates/MainTemplate

**Conteúdo:**
```tsx

import MainTemplate from "../../templates/MainTemplate";




export default function NotFound() {

    return (
      <>
       <MainTemplate>
        <h1>Page not found</h1>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit commodi eos quibusdam, voluptates repellat qui, omnis porro distinctio tempore ullam magni, maxime quod. Deleniti dolorem enim molestias at, placeat quas.
     Atque, quam distinctio molestiae error laudantium dolorem quos in laboriosam odit voluptates fuga velit at doloremque praesentium debitis blanditiis magni optio mollitia fugiat. Pariatur, recusandae at? Corrupti iure pariatur earum.
     Aspernatur aliquid at omnis odio hic ipsa inventore? Sunt error aspernatur cupiditate unde, assumenda distinctio mollitia libero obcaecati, quas odit, nisi doloremque ipsa recusandae labore minus veniam sequi accusamus laborum?
     Illo ducimus dignissimos aspernatur saepe laborum soluta praesentium voluptatem voluptas temporibus eum, reprehenderit porro accusantium rem ratione asperiores incidunt sit! Vero quia, cupiditate nisi dolorem nihil quas omnis inventore architecto.</p> 
    </MainTemplate>
      </>
    )
  } 


```

### `src\templates\MainTemplate\index.tsx`
- **Tipo:** component
- **Complexidade:** básica
- **Linhas:** 30
- **Origem:** src
- **Padrões detectados:** hasGeneric, hasPropsType, hasDefaultExport
- **Exports:** MainTemplate
- **Imports internos:** ../../components/Container, ../../components/Footer, ../../components/Logo, ../../components/Menu

**Conteúdo:**
```tsx

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Logo from "../../components/Logo";
import Menu from "../../components/Menu";

type MainTemplateProps ={
    children:React.ReactNode;
}

export default function MainTemplate({children}:MainTemplateProps) {

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

### `src\utils\formatSecondsToMinutes.ts`
- **Tipo:** module
- **Complexidade:** básica
- **Linhas:** 7
- **Origem:** src
- **Padrões detectados:** hasNamedExport

**Conteúdo:**
```ts
export function formatSecondsToMinutes(seconds: number) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsMod = String(seconds % 60).padStart(2, "0");

  return `${minutes}:${secondsMod}`;
}

```

### `src\utils\getNextCycle.ts`
- **Tipo:** module
- **Complexidade:** básica
- **Linhas:** 4
- **Origem:** src
- **Padrões detectados:** hasNamedExport

**Conteúdo:**
```ts
export function getNextCycle(currentCycle: number) {
  return currentCycle === 0 || currentCycle === 8 ? 1 : currentCycle + 1;
}

```

### `src\utils\getNextCycleType.ts`
- **Tipo:** module
- **Complexidade:** básica
- **Linhas:** 8
- **Origem:** src
- **Padrões detectados:** hasImportType, hasNamedExport
- **Imports internos:** ../models/TaskModel

**Conteúdo:**
```ts
import type { TaskModel } from "../models/TaskModel";

export function getNextCycleType(currentCycle: number): TaskModel["type"] {
  if (currentCycle % 8 === 0) return "longBreakTime";
  if (currentCycle % 2 === 0) return "shortBreakTime";
  return "workTime";
}

```

### `src\utils\LoadBeep.ts`
- **Tipo:** module
- **Complexidade:** básica
- **Linhas:** 13
- **Origem:** src
- **Padrões detectados:** hasNamedExport
- **Imports internos:** ../assets/audios/gravitational_beep.mp3

**Conteúdo:**
```ts
import beepSound from "../assets/audios/gravitational_beep.mp3";

export function loadBeep() {
  const audio = new Audio(beepSound);
  audio.load();
  return () => {
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.error("Error playing beep:", error);
    });
  };
}

```

### `src\workers\timerWorker.js`
- **Tipo:** module
- **Complexidade:** básica
- **Linhas:** 26
- **Origem:** src
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
```js
let isRunning = false;

self.onmessage = function (event) {
  if (isRunning) return;

  isRunning = true;

  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  const endDate = activeTask.startDate + secondsRemaining * 1000;
  const now = Date.now();
  let countDownSeconds = Math.ceil((endDate - now) / 1000);

  function tick() {
    self.postMessage(countDownSeconds);

    const now = Date.now();
    countDownSeconds = Math.floor((endDate - now) / 1000);

    setTimeout(tick, 1000);
  }

  tick();
};

```

### `src\workers\TimerWorkerManager.ts`
- **Tipo:** module
- **Complexidade:** básica
- **Linhas:** 33
- **Origem:** src
- **Padrões detectados:** hasImportType, hasNamedExport
- **Exports:** TimerWorkerManager
- **Imports internos:** ../models/TaskStateModel

**Conteúdo:**
```ts
import type { TaskStateModel } from "../models/TaskStateModel";

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL("./timerWorker.js", import.meta.url));
  }

  static getInstance() {
    if (!instance) {
      instance = new TimerWorkerManager();
    }

    return instance;
  }

  postMessage(message: TaskStateModel) {
    this.worker.postMessage(message);
  }

  onmessage(cb: (e: MessageEvent) => void) {
    this.worker.onmessage = cb;
  }

  terminate() {
    this.worker.terminate();
    instance = null;
  }
}

```

### `eslint.config.js`
- **Tipo:** config
- **Complexidade:** básica
- **Linhas:** 24
- **Origem:** root
- **Padrões detectados:** hasDefaultExport
- **Imports externos:** @eslint/js, globals, eslint-plugin-react-hooks, eslint-plugin-react-refresh, typescript-eslint, eslint/config

**Conteúdo:**
```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

```

### `index.html`
- **Tipo:** html
- **Complexidade:** básica
- **Linhas:** 34
- **Origem:** root
- **Padrões detectados:** nenhum padrão especial detectado

**Conteúdo:**
```html
<!doctype html>
<html lang="pt-BR" data-theme="dark">
  <head>
    <meta charset="UTF-8" />

    <link
      rel="icon"
      type="image/png"
      href="/images/favicon/favicon-96x96.png"
      sizes="96x96"
    />

    <link rel="icon" type="image/svg+xml" href="/images/favicon/favicon.svg" />
    <link rel="icon" type="image/png" href="/images/favicon/favicon.png" />

    <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/images/favicon/apple-touch-icon.png"
    />
    <link rel="manifest" href="/images/favicon/site.webmanifest" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="google" content="notranslate" />

    <title>Chronos-Pomodoro</title>
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

### `vite.config.ts`
- **Tipo:** config
- **Complexidade:** básica
- **Linhas:** 8
- **Origem:** root
- **Padrões detectados:** hasDefaultExport
- **Imports externos:** vite, @vitejs/plugin-react-swc

**Conteúdo:**
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});

```


## Auditoria de Código

### src\App.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |
| 🟡 Médio | `RC003` | Props sem tipo explícito detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.
- **🟡 Médio** `RC003` — Props sem tipo explícito detectado
  > Todo componente deve ter um `type [Nome]Props = { ... }` declarado. Props sem tipo desativam a checagem do compilador para toda a interface do componente.

### src\components\Container\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.

### src\components\CountDown\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |
| 🟡 Médio | `RC003` | Props sem tipo explícito detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.
- **🟡 Médio** `RC003` — Props sem tipo explícito detectado
  > Todo componente deve ter um `type [Nome]Props = { ... }` declarado. Props sem tipo desativam a checagem do compilador para toda a interface do componente.

### src\components\Cycles\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |
| 🟡 Médio | `RC003` | Props sem tipo explícito detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.
- **🟡 Médio** `RC003` — Props sem tipo explícito detectado
  > Todo componente deve ter um `type [Nome]Props = { ... }` declarado. Props sem tipo desativam a checagem do compilador para toda a interface do componente.

### src\components\DefaultButton\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.

### src\components\DefaultInput\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.

### src\components\Footer\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |
| 🟡 Médio | `RC003` | Props sem tipo explícito detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.
- **🟡 Médio** `RC003` — Props sem tipo explícito detectado
  > Todo componente deve ter um `type [Nome]Props = { ... }` declarado. Props sem tipo desativam a checagem do compilador para toda a interface do componente.

### src\components\GenericHtml\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.

### src\components\Heading\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.

### src\components\Logo\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |
| 🟡 Médio | `RC003` | Props sem tipo explícito detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.
- **🟡 Médio** `RC003` — Props sem tipo explícito detectado
  > Todo componente deve ter um `type [Nome]Props = { ... }` declarado. Props sem tipo desativam a checagem do compilador para toda a interface do componente.

### src\components\MainForm\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |
| 🟡 Médio | `RC003` | Props sem tipo explícito detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.
- **🟡 Médio** `RC003` — Props sem tipo explícito detectado
  > Todo componente deve ter um `type [Nome]Props = { ... }` declarado. Props sem tipo desativam a checagem do compilador para toda a interface do componente.

### src\components\Menu\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `TS004` | Type casting com `as` detectado |
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |
| 🟡 Médio | `RC003` | Props sem tipo explícito detectado |

**Detalhes:**
- **🔵 Baixo** `TS004` — Type casting com `as` detectado
  > Casting suprime inferência do compilador. Válido em integrações com APIs externas sem tipagem; problemático em código de domínio próprio.
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.
- **🟡 Médio** `RC003` — Props sem tipo explícito detectado
  > Todo componente deve ter um `type [Nome]Props = { ... }` declarado. Props sem tipo desativam a checagem do compilador para toda a interface do componente.

### src\components\PomodoroConfig\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |
| 🟡 Médio | `RC003` | Props sem tipo explícito detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.
- **🟡 Médio** `RC003` — Props sem tipo explícito detectado
  > Todo componente deve ter um `type [Nome]Props = { ... }` declarado. Props sem tipo desativam a checagem do compilador para toda a interface do componente.

### src\components\PomodoroConfig\main.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🟡 Médio | `RC005` | `console.log` detectado em componente/hook |

**Detalhes:**
- **🟡 Médio** `RC005` — `console.log` detectado em componente/hook
  > Logs de debug não devem ir para produção. Remova ou substitua por uma estratégia de logging estruturado.

### src\components\Tips\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |
| 🟡 Médio | `RC003` | Props sem tipo explícito detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.
- **🟡 Médio** `RC003` — Props sem tipo explícito detectado
  > Todo componente deve ter um `type [Nome]Props = { ... }` declarado. Props sem tipo desativam a checagem do compilador para toda a interface do componente.

### src\contexts\TaskContext\taskActions.ts
| Severidade | Código | Mensagem |
|---|---|---|
| ⚪ Info | `TS005` | `as const` utilizado |

**Detalhes:**
- **⚪ Info** `TS005` — `as const` utilizado
  > Decisão consciente para literal type narrowing. Padrão correto em mocks e dados estáticos.

### src\contexts\TaskContext\TaskContextProvider.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🟡 Médio | `RC005` | `console.log` detectado em componente/hook |

**Detalhes:**
- **🟡 Médio** `RC005` — `console.log` detectado em componente/hook
  > Logs de debug não devem ir para produção. Remova ou substitua por uma estratégia de logging estruturado.

### src\contexts\TaskContext\useTaskContext.ts
| Severidade | Código | Mensagem |
|---|---|---|
| 🟡 Médio | `TS002` | Arquivo .ts com imports internos sem `import type` |

**Detalhes:**
- **🟡 Médio** `TS002` — Arquivo .ts com imports internos sem `import type`
  > Para importações de tipo puro, `import type` garante que o módulo não é incluído no bundle de runtime. Verifique se há importações que deveriam usar essa diretiva.

### src\pages\Home\AboutPomodoro\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |
| 🟡 Médio | `RC003` | Props sem tipo explícito detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.
- **🟡 Médio** `RC003` — Props sem tipo explícito detectado
  > Todo componente deve ter um `type [Nome]Props = { ... }` declarado. Props sem tipo desativam a checagem do compilador para toda a interface do componente.

### src\pages\Home\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |
| 🟡 Médio | `RC003` | Props sem tipo explícito detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.
- **🟡 Médio** `RC003` — Props sem tipo explícito detectado
  > Todo componente deve ter um `type [Nome]Props = { ... }` declarado. Props sem tipo desativam a checagem do compilador para toda a interface do componente.

### src\pages\Home\NotFound\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |
| 🟡 Médio | `RC003` | Props sem tipo explícito detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.
- **🟡 Médio** `RC003` — Props sem tipo explícito detectado
  > Todo componente deve ter um `type [Nome]Props = { ... }` declarado. Props sem tipo desativam a checagem do compilador para toda a interface do componente.

### src\pages\Menu\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |
| 🟡 Médio | `RC003` | Props sem tipo explícito detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.
- **🟡 Médio** `RC003` — Props sem tipo explícito detectado
  > Todo componente deve ter um `type [Nome]Props = { ... }` declarado. Props sem tipo desativam a checagem do compilador para toda a interface do componente.

### src\templates\MainTemplate\index.tsx
| Severidade | Código | Mensagem |
|---|---|---|
| 🔵 Baixo | `RC002` | Componente sem arrow function detectado |

**Detalhes:**
- **🔵 Baixo** `RC002` — Componente sem arrow function detectado
  > O padrão do Protocolo Aruanda é arrow function para todos os componentes. Componentes `function` são válidos, mas inconsistentes com o restante da base.

### src\utils\LoadBeep.ts
| Severidade | Código | Mensagem |
|---|---|---|
| 🟡 Médio | `TS002` | Arquivo .ts com imports internos sem `import type` |

**Detalhes:**
- **🟡 Médio** `TS002` — Arquivo .ts com imports internos sem `import type`
  > Para importações de tipo puro, `import type` garante que o módulo não é incluído no bundle de runtime. Verifique se há importações que deveriam usar essa diretiva.


## Instrução de Produção para o Cursor Agent

Você recebeu este arquivo como contexto estruturado. Leia **TEACHER_LESSON.md** (instrução completa em templates/).

**Modo de operação:** project
**Complexidade detectada:** básica, intermediária
**Tipos de arquivo:** module, component, stylesheet, context, reducer, hook, config, html

**Seções obrigatórias nesta aula:**
- ## Parte 1 — Contexto e Stack
- ## Parte 2 — Contratos de Tipo
- ## Parte 3 — Anatomia linha por linha
- ## Parte 4 — Fluxo de dados e estado
- ## Parte Final — Auditoria e Exercícios

**Regras de produção:**
- Escreva em Português (Brasil)
- Toda explicação de código deve ser linha por linha ou bloco por bloco, nunca resumida
- A seção de auditoria deve transformar cada ponto detectado em material pedagógico
- Exercícios: obrigatoriamente três — Básico, Médio e Avançado — com critério de aceitação explícito
- Não invente referências a outros arquivos que não estejam neste contexto
- Não use React.FC, não use any, não use caminhos relativos com ../ nos exemplos

Produza o arquivo `teacher-output/TEACHER_LESSON.md` na raiz do projeto analisado.
