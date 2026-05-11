# PROJECT_CONTEXT — chronos-app

> Gerado por aruanda-reader. Use este arquivo como contexto de entrada para o Cursor Agent.
> O agente deve ler este arquivo e produzir `PROJECT_LESSON.md` com a documentação educacional.

---

## 1. Stack

| Campo | Valor |
|---|---|
| Framework | react |
| Linguagem | typescript |
| Bundler | vite |
| Módulos | ESM |
| react | ^19.2.4 |
| typescript | ~5.9.3 |
| vite | ^7.3.1 |
| Roteamento | none |
| Qualidade | eslint |

## 2. Configuração TypeScript

- **Strict mode:** desativado
- **noUnusedLocals:** inativo
- **noUnusedParameters:** inativo
- **Target:** não detectado
- **Path alias (@/):** não detectado no tsconfig

## 3. Estrutura de Pastas

**Camadas presentes:** types, components, pages, state, utils

**Camadas ausentes:** hooks, services, data

**CSS Modules:** sim

### types

- `src/models/TaskModel.ts`
- `src/models/TaskStateModel.ts`

### components

- `src/components/Container/index.tsx`
- `src/components/Container/styles.module.css`
- `src/components/CountDown/index.tsx`
- `src/components/CountDown/styles.module.css`
- `src/components/Cycles/index.tsx`
- `src/components/Cycles/styles.module.css`
- `src/components/DefaultButton/index.tsx`
- `src/components/DefaultButton/styles.module.css`
- `src/components/DefaultInput/index.tsx`
- `src/components/DefaultInput/styles.module.css`
- `src/components/Footer/index.tsx`
- `src/components/Footer/styles.module.css`
- `src/components/GenericHtml/index.tsx`
- `src/components/GenericHtml/style.module.css`
- `src/components/Heading/index.tsx`
- `src/components/Heading/styles.module.css`
- `src/components/Logo/index.tsx`
- `src/components/Logo/styles.module.css`
- `src/components/MainForm/index.tsx`
- `src/components/MainForm/style.module.css`
- `src/components/Menu/index.tsx`
- `src/components/Menu/styles.module.css`
- `src/components/PomodoroConfig/index.tsx`
- `src/components/PomodoroConfig/main.tsx`
- `src/components/PomodoroConfig/styles.module.css`
- `src/components/Tips/index.tsx`

### pages

- `src/pages/Home/AboutPomodoro/index.tsx`
- `src/pages/Home/index.tsx`
- `src/pages/Home/NotFound/index.tsx`
- `src/pages/Menu/index.tsx`

### state

- `src/contexts/TaskContext/initialTaskState.ts`
- `src/contexts/TaskContext/taskActions.ts`
- `src/contexts/TaskContext/TaskContext.tsx`
- `src/contexts/TaskContext/TaskContextProvider.tsx`
- `src/contexts/TaskContext/taskReducer.ts`
- `src/contexts/TaskContext/useTaskContext.ts`

### utils

- `src/utils/formatSecondsToMinutes.ts`
- `src/utils/getNextCycle.ts`
- `src/utils/getNextCycleType.ts`
- `src/utils/LoadBeep.ts`

## 4. Contratos de Tipo

- **import type em uso:** sim
- **any explícito:** não detectado

### Tipos definidos

**`src/contexts/TaskContext/taskActions.ts`**
- `TaskActionsWithPayload` (type)
- `TaskActionsWithoutPayload` (type)
- `TaskActionModel` (type)

**`src/models/TaskModel.ts`**
- `TaskModel` (type)

**`src/models/TaskStateModel.ts`**
- `TaskStateModel` (type)

## 5. Componentes

### `src/App.tsx`

- **Camada:** other
- **Props tipadas:** não detectado
- **React.FC:** não

### `src/components/Container/index.tsx`

- **Camada:** components
- **Props tipadas:** sim (type separado)
- **React.FC:** não

### `src/components/CountDown/index.tsx`

- **Camada:** components
- **Props tipadas:** não detectado
- **React.FC:** não
- **Hooks:** useTaskContext

### `src/components/Cycles/index.tsx`

- **Camada:** components
- **Props tipadas:** não detectado
- **React.FC:** não
- **Hooks:** useTaskContext

### `src/components/DefaultButton/index.tsx`

- **Camada:** components
- **Props tipadas:** sim (type separado)
- **React.FC:** não

### `src/components/DefaultInput/index.tsx`

- **Camada:** components
- **Props tipadas:** sim (type separado)
- **React.FC:** não

### `src/components/Footer/index.tsx`

- **Camada:** components
- **Props tipadas:** não detectado
- **React.FC:** não

### `src/components/GenericHtml/index.tsx`

- **Camada:** components
- **Props tipadas:** sim (type separado)
- **React.FC:** não

### `src/components/Heading/index.tsx`

- **Camada:** components
- **Props tipadas:** sim (type separado)
- **React.FC:** não

### `src/components/Logo/index.tsx`

- **Camada:** components
- **Props tipadas:** não detectado
- **React.FC:** não

### `src/components/MainForm/index.tsx`

- **Camada:** components
- **Props tipadas:** não detectado
- **React.FC:** não
- **Hooks:** useRef, useTaskContext

### `src/components/Menu/index.tsx`

- **Camada:** components
- **Props tipadas:** não detectado
- **React.FC:** não
- **Hooks:** useState, useEffect

### `src/components/PomodoroConfig/index.tsx`

- **Camada:** components
- **Props tipadas:** não detectado
- **React.FC:** não
- **Hooks:** useState, useEffect

### `src/components/PomodoroConfig/main.tsx`

- **Camada:** components
- **Props tipadas:** não detectado
- **React.FC:** não

### `src/components/Tips/index.tsx`

- **Camada:** components
- **Props tipadas:** não detectado
- **React.FC:** não
- **Hooks:** useTaskContext

### `src/contexts/TaskContext/TaskContext.tsx`

- **Camada:** state
- **Props tipadas:** sim (type separado)
- **React.FC:** não

### `src/contexts/TaskContext/TaskContextProvider.tsx`

- **Camada:** state
- **Props tipadas:** sim (type separado)
- **React.FC:** não
- **Hooks:** useEffect, useRef, useReducer

### `src/main.tsx`

- **Camada:** other
- **Props tipadas:** não detectado
- **React.FC:** não

### `src/pages/Home/AboutPomodoro/index.tsx`

- **Camada:** pages
- **Props tipadas:** não detectado
- **React.FC:** não

### `src/pages/Home/index.tsx`

- **Camada:** pages
- **Props tipadas:** não detectado
- **React.FC:** não

### `src/pages/Home/NotFound/index.tsx`

- **Camada:** pages
- **Props tipadas:** não detectado
- **React.FC:** não

### `src/pages/Menu/index.tsx`

- **Camada:** pages
- **Props tipadas:** não detectado
- **React.FC:** não

### `src/templates/MainTemplate/index.tsx`

- **Camada:** layouts
- **Props tipadas:** sim (type separado)
- **React.FC:** não

## 6. Gerenciamento de Estado

- **Estratégia detectada:** context-api
- **Context API:** sim
- **useReducer:** sim
- **Arquivos de contexto:**
  - `src/contexts/TaskContext/TaskContext.tsx`
- **Arquivos com reducer:**
  - `src/contexts/TaskContext/taskActions.ts`
  - `src/contexts/TaskContext/TaskContextProvider.tsx`
  - `src/contexts/TaskContext/taskReducer.ts`

## 7. Estilização

- **CSS Modules:** sim
- **Tailwind:** não

## 8. Padrões Técnicos

- **import type:** em uso
- **Path alias @/:** não detectado
- **Caminhos relativos (../):** detectado — avaliar migração para @/
- **forwardRef:** não
- **useMemo / useCallback:** não
- **Lazy loading:** não
- **Formulários controlados:** não detectado
- **React Hook Form:** não

## 9. Pontos de Atenção

### Baixa prioridade

- **[console-log]** `src/components/PomodoroConfig/main.tsx`
- **[console-log]** `src/contexts/TaskContext/TaskContextProvider.tsx`

---

## Instrução para o Cursor Agent

Leia as seções acima e produza `PROJECT_LESSON.md` com a seguinte estrutura:

1. **Stack e decisões de configuração** — o que as escolhas de stack revelam sobre o projeto
2. **Arquitetura de pastas** — o que a estrutura implica sobre separação de responsabilidades
3. **Contratos de tipo** — cada tipo explicado com a lógica por trás da escolha
4. **Componentes** — cada componente como caso de estudo: props, renderização, padrões
5. **Gerenciamento de estado** — estratégia adotada, por que funciona ou não neste projeto
6. **Utilitários e funções puras** — lógica extraída do JSX, testabilidade
7. **Pontos de atenção** — dívida técnica identificada, com explicação do impacto
8. **Exercícios derivados** — três exercícios nos níveis básico, médio e avançado

Use as melhores práticas de React 19 e TypeScript strict mode de 2026 como referência.
O público é um desenvolvedor em formação acelerada. Sem didatização. Densidade técnica.
