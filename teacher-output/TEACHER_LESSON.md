# TEACHER_LESSON — Chronos Pomodoro App

> Projeto completo · React 19 · TypeScript 5.9 · Vite · Context API + useReducer · Web Worker

---

## Parte 1 — Contexto e Stack

### O que este projeto é

O Chronos Pomodoro é um timer Pomodoro com ciclos configuráveis. O domínio central é simples: o usuário cria uma tarefa, um contador regressivo é iniciado em background, e ao final do contador a tarefa é marcada como concluída. O ciclo avança automaticamente entre foco (`workTime`), pausa curta (`shortBreakTime`) e pausa longa (`longBreakTime`).

A complexidade real do projeto não está no domínio — está na infraestrutura técnica que resolve um problema específico: **contadores de tempo em abas do browser são throttled pelo mecanismo de `setTimeout` do thread principal quando a aba fica inativa**. A solução adotada é mover o `setTimeout` para um **Web Worker**, que roda em thread separada e não sofre throttling.

### Onde cada arquivo se encaixa

| Camada | Arquivos | Responsabilidade |
|---|---|---|
| Modelo de domínio | `models/TaskModel.ts`, `models/TaskStateModel.ts` | Contratos de tipo que definem as entidades e o shape do estado global |
| Estado global | `contexts/TaskContext/` (5 arquivos) | Context API + useReducer formando o state management da aplicação |
| Infraestrutura | `workers/timerWorker.js`, `workers/TimerWorkerManager.ts` | Web Worker para contagem em thread separada; Singleton para gerenciar a instância |
| Adaptador | `adapters/showMessage.ts` | Isola a dependência `react-toastify` atrás de uma interface própria |
| Utilitários | `utils/` (4 arquivos) | Funções puras sem efeitos colaterais |
| Componentes | `components/` | Rendering puro ou com estado local de UI |
| Páginas | `pages/` | Composição de componentes em rotas |
| Templates | `templates/MainTemplate/` | Layout estrutural reutilizável entre páginas |
| Estilos | `assets/styles/` | Tokens de design via CSS custom properties; reset global |
| Configuração | `vite.config.ts`, `eslint.config.js`, `index.html` | Bundler, linting e documento HTML raiz |

### Decisões de stack visíveis no código

**CSS custom properties como design tokens** (`theme.css`): em vez de usar um preprocessador ou CSS-in-JS, o projeto define todas as cores como variáveis CSS em `:root`. O tema claro é implementado em `:root[data-theme="light"]` simplesmente redefinindo os mesmos tokens com valores invertidos. O `data-theme` é escrito diretamente no `document.documentElement` via JavaScript — sem troca de classe, sem framework de tema.

**`@vitejs/plugin-react-swc`** (`vite.config.ts`): o plugin usa SWC (Rust) em vez de Babel para transformar JSX. A consequência prática é velocidade de build significativamente maior em projetos TypeScript + React.

**`font-size: 62.5%` em `html`** (`global.css`): técnica que faz `1rem = 10px`, permitindo escrever tamanhos legíveis como `1.6rem` (16px) sem fazer cálculos mentais.

**Web Worker instanciado via `new URL()` + `import.meta.url`** (`TimerWorkerManager.ts`): a sintaxe `new Worker(new URL("./timerWorker.js", import.meta.url))` é a forma que o Vite reconhece para fazer bundling do worker como um módulo separado. Sem isso, o Vite não inclui o arquivo worker no bundle.

---

## Parte 2 — Contratos de Tipo

### `TaskModel`

```ts
export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completeDate: number | null;
  interruptDate: number | null;
  type: keyof TaskStateModel["config"];
};
```

| Campo | Tipo | Razão da escolha |
|---|---|---|
| `id` | `string` | Gerado via `Date.now().toString()`. Poderia ser `number`, mas `string` é mais flexível para migrar para UUID no futuro sem quebrar a interface |
| `name` | `string` | Nome livre digitado pelo usuário. Sem restrição de tamanho no tipo — validação ocorre no handler |
| `duration` | `number` | Duração em **minutos** (não segundos). A conversão para segundos ocorre no reducer: `duration * 60` |
| `startDate` | `number` | Timestamp Unix em milissegundos via `Date.now()`. Usado pelo worker para calcular `endDate = startDate + secondsRemaining * 1000` |
| `completeDate` | `number \| null` | `null` enquanto ativa ou interrompida. Recebe `Date.now()` no case `COMPLETE_TASK` do reducer |
| `interruptDate` | `number \| null` | `null` enquanto ativa ou completada. Recebe `Date.now()` no case `INTERRUPT_TASK` |
| `type` | `keyof TaskStateModel["config"]` | Decisão arquitetural significativa: em vez de um union literal separado `"workTime" \| "shortBreakTime" \| "longBreakTime"`, o tipo é derivado das chaves do objeto `config` no estado. Se uma nova categoria de ciclo for adicionada a `config`, o tipo `TaskModel["type"]` é atualizado automaticamente. Acoplamento deliberado que garante coerência entre configuração e dados |

Se `type` fosse `any`, o TypeScript não poderia garantir que `state.config[task.type]` é válido — o acesso ao objeto de configuração se tornaria inseguro.

---

### `TaskStateModel`

```ts
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

| Campo | Tipo | Razão da escolha |
|---|---|---|
| `tasks` | `TaskModel[]` | Array acumulativo de todas as tarefas criadas na sessão. Serve como histórico. Nunca é truncado no estado atual |
| `secondsRemaining` | `number` | Segundos como número inteiro. Atualizado pelo worker via `COUNT_DOWN`. Necessário para que o worker possa calcular o `endDate` com precisão |
| `formattedSecondsRemaining` | `string` | Derivado de `secondsRemaining` via `formatSecondsToMinutes`. É um campo calculado persistido no estado — evita que cada componente precise fazer a formatação individualmente. Trade-off: duplicação de dado no estado em troca de zero cálculo nos consumidores |
| `activeTask` | `TaskModel \| null` | `null` = nenhuma tarefa em execução. Usado como boolean implícito em múltiplos componentes via `!!state.activeTask` e `!state.activeTask` |
| `currentCycle` | `number` | Contador de ciclos completados. Começa em `0` e incrementa a cada `START_TASK`. Resetado para `1` quando atinge `8` (lógica em `getNextCycle`) |
| `config` | `object` | Durações configuráveis em minutos para cada tipo de ciclo. As chaves deste objeto são a fonte de verdade para o tipo `TaskModel["type"]` |

---

### `TaskActionTypes` — `as const` e literal narrowing

```ts
export const TaskActionTypes = {
  START_TASK: "START_TASK",
  INTERRUPT_TASK: "INTERRUPT_TASK",
  RESET_STATE: "RESET_STATE",
  COUNT_DOWN: "COUNT_DOWN",
  COMPLETE_TASK: "COMPLETE_TASK",
} as const;
```

Sem `as const`, o TypeScript infere o tipo de cada propriedade como `string`. Com `as const`, cada propriedade tem o tipo literal de sua string: `TaskActionTypes.START_TASK` tem tipo `"START_TASK"`, não `string`.

Isso é pré-requisito para o discriminated union funcionar. Se `type` fosse `string`, o TypeScript não conseguiria fazer narrowing no `switch(action.type)` do reducer.

---

### `TaskActionsWithPayload`, `TaskActionsWithoutPayload`, `TaskActionModel` — Discriminated Union

```ts
export type TaskActionsWithPayload =
  | { type: typeof TaskActionTypes.START_TASK; payload: TaskModel }
  | { type: typeof TaskActionTypes.COUNT_DOWN; payload: { secondsRemaining: number } };

export type TaskActionsWithoutPayload =
  | { type: typeof TaskActionTypes.RESET_STATE }
  | { type: typeof TaskActionTypes.INTERRUPT_TASK }
  | { type: typeof TaskActionTypes.COMPLETE_TASK };

export type TaskActionModel =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload;
```

| Campo | Tipo | Razão da escolha |
|---|---|---|
| `type` (em cada variante) | `typeof TaskActionTypes.X` | Extrai o tipo literal da constante via `typeof`. Garante que o tipo da action é exatamente `"START_TASK"`, nunca `string` |
| `payload` (em `START_TASK`) | `TaskModel` | O objeto completo da nova tarefa construído no `handleCreateNewTask` antes do dispatch |
| `payload` (em `COUNT_DOWN`) | `{ secondsRemaining: number }` | Um objeto simples, não `TaskModel`. O worker só retorna o contador — não tem acesso à tarefa completa |
| Ausência de `payload` em `TaskActionsWithoutPayload` | — | O mecanismo de narrowing do TypeScript: quando o compilador entra no case `INTERRUPT_TASK`, sabe que o objeto action não tem campo `payload`, portanto acessar `action.payload` é um erro de compilação |

**Mecanismo de narrowing:** no reducer, ao entrar no `case TaskActionTypes.START_TASK`, o TypeScript restringe o tipo de `action` para `{ type: "START_TASK"; payload: TaskModel }`. Isso torna `action.payload` tipado como `TaskModel` dentro daquele bloco — sem cast, sem `any`.

---

### `TaskContextProps`

```tsx
type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
};
```

| Campo | Tipo | Razão da escolha |
|---|---|---|
| `state` | `TaskStateModel` | O estado completo da aplicação, gerenciado pelo reducer |
| `dispatch` | `React.Dispatch<TaskActionModel>` | O tipo utilitário `React.Dispatch<T>` é equivalente a `(action: T) => void`. Parametrizado com `TaskActionModel`, garante que apenas actions válidas podem ser despachadas — o TypeScript recusa qualquer objeto que não satisfaça o discriminated union |

---

### `ShowMessage` — callable com propriedades

```ts
type MessageType = "success" | "error" | "warning" | "info";

type ShowMessage = {
  (message: string, type: MessageType): void;
  dismiss: () => void;
};
```

| Campo | Tipo | Razão da escolha |
|---|---|---|
| `(message, type)` (call signature) | `(string, MessageType) => void` | Declara que o objeto é chamável diretamente: `showMessage("texto", "success")` |
| `dismiss` | `() => void` | Propriedade adicional no objeto função. Permite `showMessage.dismiss()` |
| `MessageType` | union literal | Os quatro tipos de toast disponíveis. Se fosse `string`, o switch no adaptador perderia exaustividade e o TypeScript não alertaria sobre tipos não tratados |

---

### Tipos de componentes com `React.ComponentProps`

```tsx
// DefaultButton
type DefaultButtonProps = {
  icon?: React.ReactNode;
  color?: 'green' | 'red';
} & React.ComponentProps<'button'>;

// DefaultInput
type DefaultInputProps = {
  id: string;
  labelText: string;
} & React.ComponentProps<'input'>;
```

O operador `&` intersecta dois tipos. `React.ComponentProps<'button'>` produz um tipo com todos os atributos HTML do `<button>` mais os event handlers do React. O resultado é que `DefaultButton` aceita `onClick`, `disabled`, `type`, `aria-label` etc. sem precisar declarar cada um explicitamente.

A prop `color` com `'green' | 'red'` é usada como seletor de classe CSS: `styles[color]` acessa dinamicamente a classe do CSS Module. O TypeScript garante que apenas valores com classes correspondentes são passados.

---

## Parte 3 — Anatomia linha por linha

### `showMessage` — Object.assign para callable com métodos

```ts
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

> `Object.assign(target, source)` copia as propriedades enumeráveis de `source` para `target` e retorna `target`. Aqui, `target` é a função principal e `source` é o objeto `{ dismiss }`. O resultado é uma função que também tem a propriedade `dismiss`. Isso implementa o padrão de callable-with-properties, que é a única forma de ter `showMessage("texto", "success")` e `showMessage.dismiss()` no mesmo identificador. A anotação de tipo `ShowMessage` no lado esquerdo garante que o TypeScript valide que o resultado satisfaz o contrato declarado. O switch sem `default` é exaustivo porque `MessageType` é um union literal com exatamente os quatro cases cobertos — o compilador sabe disso.

---

### `formatSecondsToMinutes` — função pura de formatação

```ts
export function formatSecondsToMinutes(seconds: number) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsMod = String(seconds % 60).padStart(2, "0");

  return `${minutes}:${secondsMod}`;
}
```

> `Math.floor(seconds / 60)` trunca a divisão para obter os minutos inteiros. `seconds % 60` obtém o resto da divisão por 60, que são os segundos restantes após extrair os minutos completos. `padStart(2, "0")` garante dois dígitos com zero à esquerda quando o número é menor que 10. O resultado é sempre no formato `"MM:SS"`. Para `90` segundos: `Math.floor(90/60) = 1`, `90 % 60 = 30`, resultado `"01:30"`. Esta função não tem dependências externas, não produz efeitos colaterais e é determinística — candidata natural a testes unitários.

---

### `getNextCycle` — lógica de ciclo com reset

```ts
export function getNextCycle(currentCycle: number) {
  return currentCycle === 0 || currentCycle === 8 ? 1 : currentCycle + 1;
}
```

> Dois casos de reset: `0` (estado inicial, nenhum ciclo foi completado) e `8` (ciclo longo completado, recomeça do 1). Em qualquer outro caso, incrementa. O ciclo `0` nunca aparece como `currentCycle` em exibição — existe apenas como estado inicial antes da primeira tarefa. O ciclo `8` é o ciclo de pausa longa — após completá-lo, `getNextCycle(8)` retorna `1`, reiniciando o contador.

---

### `getNextCycleType` — mapeamento de número para tipo

```ts
export function getNextCycleType(currentCycle: number): TaskModel["type"] {
  if (currentCycle % 8 === 0) return "longBreakTime";
  if (currentCycle % 2 === 0) return "shortBreakTime";
  return "workTime";
}
```

> A lógica de negócio está na ordem das condições: `% 8 === 0` é verificada primeiro porque o ciclo 8 é par — se verificasse `% 2 === 0` primeiro, o ciclo 8 seria classificado como `shortBreakTime` em vez de `longBreakTime`. Ciclos pares (2, 4, 6) são `shortBreakTime`. Ciclos ímpares (1, 3, 5, 7) caem no `return "workTime"` implícito. O tipo de retorno `: TaskModel["type"]` é o mesmo utilizado em `TaskModel`, garantindo coerência sem duplicar a union literal.

---

### `loadBeep` — closure que retorna função de play

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

> `loadBeep()` instancia o `Audio` e chama `audio.load()` imediatamente — isso faz o browser iniciar o download do arquivo de áudio sem reproduzi-lo. O benefício é que quando o play for chamado (ao final do countdown), o áudio já está em cache, sem latência de rede. A função retorna uma closure que captura `audio` no seu escopo. A closure redefine `audio.currentTime = 0` antes de chamar `play()` — isso permite reproduzir o som múltiplas vezes sem precisar criar um novo `Audio`. `audio.play()` retorna uma Promise que é rejeitada se o browser bloquear a reprodução automática (política de autoplay). O `.catch` evita que a rejeição não tratada quebre a aplicação.

---

### `timerWorker.js` — contagem regressiva em thread separada

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

> `isRunning` é a variável de guarda que impede múltiplos loops paralelos. Se o Provider enviar múltiplas mensagens (o que acontece porque `useEffect` dispara sempre que `state` muda), apenas o primeiro `onmessage` inicia o loop — os subsequentes retornam imediatamente.
>
> `endDate = activeTask.startDate + secondsRemaining * 1000`: calcula o timestamp absoluto de quando o timer deve terminar. Essa abordagem é mais robusta que decrementar um contador por `1` a cada segundo, porque o worker sincroniza com o relógio real a cada tick — desvios acumulados de `setTimeout` são corrigidos automaticamente.
>
> `Math.ceil` no cálculo inicial e `Math.floor` dentro de `tick()`: no início, arredonda para cima para garantir que o primeiro valor exibido não seja menor que o esperado. A cada tick seguinte, arredonda para baixo — garante que o contador chegue a `0` sem exibir negativos.
>
> `setTimeout(tick, 1000)` ao invés de `setInterval`: a escolha por `setTimeout` recursivo em vez de `setInterval` evita que ticks se acumulem se a função demorar mais de 1 segundo. Com `setInterval`, se um tick demorar 1100ms, o próximo é disparado imediatamente após, podendo criar dois ticks em rápida sucessão.
>
> O worker não tem acesso ao DOM, ao `window` nem ao `localStorage`. Tem acesso ao `self` (o contexto global do worker), ao `setTimeout` e ao `postMessage`.

---

### `TimerWorkerManager` — Singleton Pattern

```ts
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

> O construtor `private` impede que `new TimerWorkerManager()` seja chamado fora da classe. A única forma de obter uma instância é via `getInstance()`. A variável `instance` vive no escopo do módulo (não dentro da classe), o que garante que ela persiste enquanto o módulo estiver carregado.
>
> `new Worker(new URL("./timerWorker.js", import.meta.url))`: o Vite analisa essa construção específica em tempo de build e inclui `timerWorker.js` no bundle como um chunk separado com uma URL estável. Sem essa sintaxe, o worker não seria encontrado em produção.
>
> `terminate()` chama `this.worker.terminate()` (mata o thread do worker) e depois `instance = null` (permite que `getInstance()` crie um novo worker na próxima chamada). Isso é necessário porque um worker terminado não pode ser reiniciado — precisa ser recriado.
>
> A interface exposta (`postMessage`, `onmessage`, `terminate`) é intencionalmente minimal — os consumidores não têm acesso direto ao `Worker` subjacente.

---

### `taskReducer` — caso a caso

```ts
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
```

> `START_TASK`: o narrowing do TypeScript garante que `action.payload` é `TaskModel` aqui. O reducer calcula `nextCycle` (incrementa ou reseta o contador de ciclos) e converte duração em minutos para segundos. O spread `...state` copia todos os campos existentes, depois os campos declarados explicitamente sobrescrevem os campos do spread. `tasks: [...state.tasks, newTask]` cria um novo array — nunca muta o existente, o que é regra de imutabilidade do reducer.

```ts
    case TaskActionTypes.INTERRUPT_TASK: {
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
```

> `INTERRUPT_TASK`: o early return `if (!state.activeTask) return state` é uma guarda — se não há tarefa ativa, o estado não muda. O id é capturado antes de `activeTask` ser zerado no retorno. O `map` percorre o array e cria um novo objeto apenas para a tarefa interrompida (spread + `interruptDate`); para todas as outras, retorna a referência original. Isso é imutável e eficiente.

```ts
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
```

> `COMPLETE_TASK`: usa optional chaining `state.activeTask?.id` porque o TypeScript, dentro do case, ainda considera que `activeTask` pode ser `null` (o reducer não tem como saber que `COMPLETE_TASK` só é disparado quando há tarefa ativa). O `?.id` retorna `undefined` se `activeTask` for `null`, fazendo o `map` não modificar nenhuma tarefa — comportamento seguro.

```ts
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }
    case TaskActionTypes.RESET_STATE: {
      return initialTaskState;
    }
    default:
      return state;
  }
}
```

> `COUNT_DOWN`: atualiza apenas os campos relacionados ao timer. Todos os outros campos do estado são preservados via spread. O `formattedSecondsRemaining` é sempre recalculado junto com `secondsRemaining` — os dois nunca ficam dessincronizados.
>
> `RESET_STATE`: retorna o objeto `initialTaskState` diretamente, voltando ao estado zero.
>
> `default: return state`: é obrigatório em reducers TypeScript com `useReducer`. Sem ele, o compilador não consegue garantir que a função sempre retorna `TaskStateModel`.

---

### `TaskContext` — criação do contexto com valor inicial

```tsx
const initialContextValue = {
  state: initialTaskState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
```

> `createContext<T>` exige um valor inicial que é usado quando o componente consumidor está fora de qualquer `Provider`. O `dispatch: () => {}` é uma função vazia — um no-op. Sem esse valor, o TypeScript exigiria `createContext<TaskContextProps | undefined>(undefined)`, forçando verificação de `null` em todos os consumidores. A abordagem com valor padrão é mais ergonômica, mas tem um custo: se um componente consumir o contexto fora do Provider, nenhum erro é lançado — o dispatch simplesmente não faz nada, silenciosamente.

---

### `TaskContextProvider` — orquestração central

```tsx
export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const worker = TimerWorkerManager.getInstance();
```

> `useReducer(taskReducer, initialTaskState)` inicializa o estado com `initialTaskState` e conecta o reducer. `dispatch` é a função estável (não muda entre renders) que o Provider expõe via contexto. `playBeepRef` usa `ReturnType<typeof loadBeep>` — extrai o tipo de retorno de `loadBeep` sem importar o tipo manualmente. O valor é `null` enquanto não há tarefa ativa. `TimerWorkerManager.getInstance()` retorna a instância singleton — se não existir, cria uma.

```tsx
  useEffect(() => {
    worker.onmessage((e) => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }

        dispatch({ type: TaskActionTypes.COMPLETE_TASK });
        worker.terminate();
        return;
      }

      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    });
  }, [worker]);
```

> Este `useEffect` registra o handler de mensagens do worker. Dependência `[worker]` — o handler é registrado uma vez quando o `worker` é criado. Quando o worker envia `countDownSeconds <= 0`, o beep é tocado (se o ref não for null), `COMPLETE_TASK` é despachado e o worker é terminado. Para qualquer valor positivo, despacha `COUNT_DOWN` com o número de segundos restantes.
>
> O `playBeepRef.current = null` após chamar o beep é uma limpeza explícita — evita reproduzir o som mais de uma vez mesmo se o worker enviar múltiplas mensagens com valor zero.

```tsx
  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
      return;
    }

    worker.postMessage(state);
  }, [worker, state]);
```

> Este `useEffect` sincroniza o estado com o worker. Toda vez que `state` muda, o estado atual é enviado ao worker. O worker, por sua vez, usa `isRunning` para ignorar mensagens duplicadas após o primeiro recebimento. Quando `activeTask` é `null` (tarefa interrompida ou completada), termina o worker imediatamente.

```tsx
  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      console.log("Carregando Áudio...");
      playBeepRef.current = loadBeep();
    } else {
      console.log("Destruindo Áudio...");
      playBeepRef.current = null;
    }
  }, [state.activeTask]);
```

> Este `useEffect` gerencia o ciclo de vida do áudio. Dependência `[state.activeTask]` — executa apenas quando `activeTask` muda. Quando uma tarefa torna-se ativa, `loadBeep()` é chamado (pre-carrega o áudio) e a função de play é armazenada no ref. Quando não há tarefa ativa, limpa o ref.

```tsx
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
```

> O Provider expõe o objeto `{ state, dispatch }`. O `state` é o estado atual do reducer — atualizado a cada dispatch. O `dispatch` é estável entre renders (garantia do `useReducer`). Qualquer componente que chame `useTaskContext()` abaixo deste Provider na árvore recebe acesso a esses dois valores.

---

### `Menu` — gerenciamento de tema com localStorage

```tsx
const [theme, setTheme] = useState<AvailableTheme>(() => {
  const storageTheme = localStorage.getItem('theme') as AvailableTheme || 'dark';
  return storageTheme;
});
```

> A função passada ao `useState` é chamada de **lazy initializer** — executada apenas uma vez, na montagem do componente. Isso é necessário porque `localStorage.getItem` é uma leitura síncrona de I/O; chamá-la a cada render seria desnecessário. O `as AvailableTheme` é um type casting: `localStorage.getItem` retorna `string | null`, mas o código força o tipo para `AvailableTheme`. O `|| 'dark'` trata o caso `null` (chave inexistente).

```tsx
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}, [theme]);
```

> O efeito sincroniza duas fontes externas ao React: o atributo `data-theme` no `<html>` (que o CSS usa como seletor) e o `localStorage` (que persiste a preferência). A dependência `[theme]` garante que o efeito só executa quando o tema muda — não a cada render.

```tsx
const nextThemeIcon = {
  dark: <SunIcon />,
  light: <MoonIcon />,
}
```

> Objeto de lookup: em vez de um ternário `theme === 'dark' ? <SunIcon /> : <MoonIcon />`, o mapeamento torna o código mais extensível e legível. O TypeScript infere o tipo do objeto como `{ dark: JSX.Element; light: JSX.Element }` — o acesso `nextThemeIcon[theme]` é seguro porque `theme: AvailableTheme` e as chaves cobrem exatamente os dois valores possíveis.

---

### `Cycles` — geração de indicadores visuais

```tsx
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
```

> `Array.from({ length: state.currentCycle })` cria um array de `currentCycle` posições com valores `undefined`. O array não é usado pelos seus valores (`_` é convenção para parâmetro ignorado) — apenas pelo `index`. Para cada posição, `getNextCycle(index)` e `getNextCycleType(nextCycle)` determinam que tipo de ciclo aquela bolinha representa. A classe CSS é selecionada dinamicamente: `styles[nextCycleType]` acessa a classe `.workTime`, `.shortBreakTime` ou `.longBreakTime` do CSS Module. A propriedade `key` usa `cycle-${index}` — o prefixo `cycle-` evita colisões com outros elementos que possam usar index como key.

---

### `MainForm` — coordenação de formulário e estado

```tsx
const taskNameInput = useRef<HTMLInputElement>(null);
```

> `useRef<HTMLInputElement>(null)` cria uma referência ao input DOM. Diferente de `useState`, atualizar um ref não causa re-render. O tipo genérico `<HTMLInputElement>` garante que `.current` seja tipado com todos os atributos e métodos de um `<input>` — `.value`, `.focus()`, `.disabled` etc.

```tsx
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
}
```

> `event.preventDefault()` impede o comportamento padrão do formulário (navegação de página). `showMessage.dismiss()` limpa toasts anteriores antes de mostrar novos. A verificação `taskNameInput.current === null` é um early return — TypeScript sabe que após esse ponto, `.current` não é `null`. `taskNameInput.current.value.trim()` lê o valor do input DOM diretamente (uncontrolled input via ref). O objeto `newTask` satisfaz `TaskModel` completamente — `completeDate` e `interruptDate` começam como `null`.

---

## Parte 4 — Fluxo de dados e estado

### Diagrama do fluxo principal

```
Usuário digita nome e clica em "Iniciar"
        │
        ▼
handleCreateNewTask (MainForm)
        │ dispatch({ type: START_TASK, payload: newTask })
        ▼
taskReducer (START_TASK case)
        │ retorna novo TaskStateModel com activeTask, currentCycle, secondsRemaining
        ▼
TaskContext.Provider (state atualizado)
        │
        ├──▶ CountDown re-renderiza com state.formattedSecondsRemaining
        ├──▶ MainForm re-renderiza (botão muda para "Interromper")
        │
        ▼
useEffect [state] no TaskContextProvider
        │ worker.postMessage(state)
        ▼
timerWorker.js (thread separada)
        │ tick() a cada ~1s via setTimeout
        │ self.postMessage(countDownSeconds)
        ▼
worker.onmessage no TaskContextProvider
        │
        ├── countDownSeconds > 0:
        │   dispatch({ type: COUNT_DOWN, payload: { secondsRemaining } })
        │   taskReducer atualiza secondsRemaining e formattedSecondsRemaining
        │   CountDown re-renderiza
        │
        └── countDownSeconds <= 0:
            playBeepRef.current()  → toca o áudio
            dispatch({ type: COMPLETE_TASK })
            worker.terminate()
            taskReducer zera activeTask, secondsRemaining
```

### Tabela de actions — estado antes e depois

| Action | `activeTask` antes | `activeTask` depois | `currentCycle` antes | `currentCycle` depois | `secondsRemaining` antes | `secondsRemaining` depois |
|---|---|---|---|---|---|---|
| `START_TASK` | `null` | `TaskModel` | N | N+1 (ou 1 se era 8) | qualquer | `duration * 60` |
| `COUNT_DOWN` | `TaskModel` | `TaskModel` (inalterado) | N | N (inalterado) | X | X-Y (valor do worker) |
| `COMPLETE_TASK` | `TaskModel` | `null` | N | N (inalterado) | > 0 | `0` |
| `INTERRUPT_TASK` | `TaskModel` | `null` | N | N (inalterado) | > 0 | `0` |
| `RESET_STATE` | qualquer | `null` | qualquer | `0` | qualquer | `0` |

### Por que `useReducer` + `Context` em vez de `useState` + prop drilling

**Prop drilling** seria passar `state` e `dispatch` como props de `App` → `Home` → `CountDown`, `MainForm`, `Cycles`. Com 3 níveis e múltiplos consumidores, o código de passagem de props cresce quadraticamente com o número de componentes.

**`useState` múltiplos** tornaria difícil coordenar transições: ao iniciar uma tarefa, precisaria atualizar `activeTask`, `currentCycle`, `secondsRemaining`, `tasks` e `formattedSecondsRemaining` em sincronia. Com `useState`, cada chamada a `setX` agenda um re-render separado — React agrupa em batch no React 18+, mas a lógica fica espalhada.

**`useReducer`** centraliza todas as transições de estado em um único lugar (o reducer), torna as transições explícitas e nomeadas (action types), e facilita debugging — o estado anterior e o novo estado são visíveis para cada action. `Context` resolve o problema de distribuição do estado sem prop drilling.

---

## Parte 5 — Relação entre arquivos

### Grafo de dependências das camadas principais

```
main.tsx
  └── App.tsx
        ├── TaskContextProvider.tsx ←── TaskContext.tsx
        │         ├── taskReducer.ts ←── taskActions.ts
        │         │         └── TaskStateModel.ts ←── TaskModel.ts
        │         ├── initialTaskState.ts ←── TaskStateModel.ts
        │         ├── TimerWorkerManager.ts ←── timerWorker.js
        │         └── LoadBeep.ts
        └── Home (page)
              ├── CountDown ←── useTaskContext.ts ←── TaskContext.tsx
              └── MainForm  ←── useTaskContext.ts
                    ├── Cycles ←── getNextCycle, getNextCycleType
                    ├── Tips   ←── getNextCycle, getNextCycleType
                    ├── taskActions.ts
                    └── showMessage.ts
```

### Contratos entre camadas

**`models/` → `contexts/`:** os modelos definem os contratos de tipo que o contexto implementa. `TaskStateModel` é o tipo do estado do reducer; `TaskModel` é o tipo do payload de `START_TASK`. Os modelos não importam nada do contexto — a dependência é unidirecional.

**`contexts/taskActions.ts` → `contexts/taskReducer.ts`:** o reducer importa tanto `TaskActionTypes` (constante) quanto `TaskActionModel` (tipo). O discriminated union em `taskActions.ts` é o que permite ao reducer fazer narrowing seguro em cada case. São dois arquivos separados por intenção: `taskActions.ts` é o contrato público das actions; `taskReducer.ts` é a implementação que responde a elas.

**`utils/` → múltiplos consumidores:** `getNextCycle` e `getNextCycleType` são importados em `MainForm`, `Cycles`, `Tips` e `taskReducer`. Funções puras sem estado — qualquer componente pode importar diretamente sem acoplamento.

**`workers/TimerWorkerManager.ts` → `contexts/TaskContextProvider.tsx`:** o Provider é o único consumidor do `TimerWorkerManager`. A classe Singleton encapsula toda a complexidade do Worker — o Provider apenas chama `postMessage`, `onmessage` e `terminate`.

**`adapters/showMessage.ts` → `MainForm`:** o adaptador isola `react-toastify` atrás de uma interface própria. Se a biblioteca de toast for trocada, apenas `showMessage.ts` precisa ser alterado — `MainForm` não sabe que `react-toastify` existe.

### Dependência circular detectada: `TaskModel` ↔ `TaskStateModel`

`TaskModel.ts` importa `TaskStateModel` para derivar `type`:
```ts
type: keyof TaskStateModel["config"];
```

`TaskStateModel.ts` importa `TaskModel` para o campo `tasks`:
```ts
tasks: TaskModel[];
activeTask: TaskModel | null;
```

Esta é uma **dependência circular entre dois módulos de tipo**. TypeScript resolve isso corretamente porque ambos usam `import type` — importações de tipo são apagadas em runtime, então não existe dependência de módulo em runtime. O bundler não enfrenta problemas. A dependência circular existe apenas no nível de tipo — ela é aceitável aqui porque as duas entidades são genuinamente co-dependentes no domínio: um estado de tarefa contém tarefas, e uma tarefa referencia o tipo das configurações do estado.

---

## Parte Final — Auditoria e Exercícios

### Auditoria

---

**`RC002` — Componente sem arrow function detectado** *(🔵 Baixo)*

Afeta: `App`, `Container`, `CountDown`, `Cycles`, `DefaultButton`, `DefaultInput`, `Footer`, `GenericHtml`, `Heading`, `Logo`, `MainForm`, `Menu`, `PomodoroConfig`, `Tips`, e todas as páginas e templates.

```tsx
// código atual — function declaration
export default function MainForm() {
  // ...
}
```

Problema: o Protocolo Aruanda padroniza arrow functions para manter consistência na base de código. Function declarations e arrow functions são equivalentes para componentes React em termos de comportamento — a diferença é de convenção e consistência. Em bases de código com múltiplos colaboradores, inconsistência de estilo aumenta a carga cognitiva na leitura.

```tsx
// versão corrigida — arrow function
const MainForm = () => {
  // ...
};

export default MainForm;
```

Nota: a separação entre a declaração e o `export default` é necessária porque `export default` não funciona diretamente com `const` declarado inline da mesma forma. Alternativa: `export default function` permanece válido para default exports — a inconsistência só é relevante quando o time escolheu arrow functions como padrão.

---

**`RC003` — Props sem tipo explícito detectado** *(🟡 Médio)*

Afeta: `App`, `CountDown`, `Cycles`, `Footer`, `Logo`, `MainForm`, `Menu`, e outros.

```tsx
// código atual — sem tipo de props declarado
export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* ... */}
    </footer>
  );
}
```

Problema: componentes sem filhos não precisam de tipo de props se não recebem nenhuma. O problema `RC003` é tecnicamente impreciso para componentes sem props — não há interface a tipar. A regra é relevante quando há props implícitas ou quando o componente deveria receber props mas as aceita sem validação.

Para componentes que realmente não recebem props (como `Footer`, `CountDown`, `Logo`), a ausência de tipo é correta — não há props para tipar. Para componentes como `MainForm` que têm handlers internos mas nenhuma prop externa, o mesmo se aplica.

```tsx
// versão corrigida para componente sem props — nenhuma mudança necessária
const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* ... */}
    </footer>
  );
};

export default Footer;
```

Se o componente for estendido no futuro para aceitar props, o tipo deve ser adicionado:

```tsx
type FooterProps = {
  copyrightName?: string;
};

const Footer = ({ copyrightName = "Chronos Pomodoro" }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <a href="">{copyrightName} &copy; {new Date().getFullYear()}</a>
    </footer>
  );
};
```

---

**`RC005` — `console.log` detectado em componente/hook** *(🟡 Médio)*

Afeta: `TaskContextProvider.tsx` (dois logs) e `PomodoroConfig/main.tsx`.

```tsx
// TaskContextProvider.tsx
useEffect(() => {
  if (state.activeTask && playBeepRef.current === null) {
    console.log("Carregando Áudio...");
    playBeepRef.current = loadBeep();
  } else {
    console.log("Destruindo Áudio...");
    playBeepRef.current = null;
  }
}, [state.activeTask]);
```

Problema: logs de debug expostos em produção. Em aplicações React em produção, `console.log` é visível nas DevTools de qualquer usuário, o que é uma má prática. Em aplicações mais complexas, logs excessivos dificultam o debugging — o sinal/ruído piora.

```tsx
// versão corrigida — remova os logs de debug
useEffect(() => {
  if (state.activeTask && playBeepRef.current === null) {
    playBeepRef.current = loadBeep();
  } else {
    playBeepRef.current = null;
  }
}, [state.activeTask]);
```

Para `PomodoroConfig/main.tsx`: o arquivo contém apenas um objeto e um `console.log` — é um arquivo de rascunho que não deveria estar no diretório `components`.

```tsx
// PomodoroConfig/main.tsx — arquivo inteiro deve ser removido
const user = {
  name: "Túlio Aguiar",
  age: 38,
  City: "Konstanz",
  Country: "Deutschland",
};

console.log(user);
```

Correção: deletar o arquivo.

---

**`TS002` — Arquivo .ts com imports internos sem `import type`** *(🟡 Médio)*

Afeta: `useTaskContext.ts`, `LoadBeep.ts`.

```ts
// useTaskContext.ts — código atual
import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export function useTaskContext() {
  return useContext(TaskContext);
}
```

Problema: `TaskContext` é um valor (o objeto criado por `createContext`), não apenas um tipo — o import regular aqui é tecnicamente correto e necessário, pois `useContext(TaskContext)` precisa do valor em runtime. O lint `TS002` seria incorreto neste caso específico — `import type` quebraria o código porque `TaskContext` é um valor usado em runtime.

```ts
// versão corrigida — import regular é o correto aqui
import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export const useTaskContext = () => useContext(TaskContext);
```

Para `LoadBeep.ts`: o import é de um arquivo `.mp3` (asset), não de um tipo — `import type` não se aplica a assets.

---

**`TS004` — Type casting com `as` detectado** *(🔵 Baixo)*

Afeta: `Menu/index.tsx`.

```tsx
// código atual
const storageTheme = localStorage.getItem('theme') as AvailableTheme || 'dark';
```

Problema: `localStorage.getItem` retorna `string | null`. O cast `as AvailableTheme` suprime o compilador — se alguém salvar um valor inválido no localStorage (ex: `"system"`), o TypeScript não detecta, mas em runtime o componente usaria um tema inválido.

```tsx
// versão corrigida — validação explícita
const isAvailableTheme = (value: string | null): value is AvailableTheme =>
  value === 'dark' || value === 'light';

const [theme, setTheme] = useState<AvailableTheme>(() => {
  const stored = localStorage.getItem('theme');
  return isAvailableTheme(stored) ? stored : 'dark';
});
```

O type guard `value is AvailableTheme` é uma forma de narrowing explícito: após `isAvailableTheme(stored)` retornar `true`, o TypeScript sabe que `stored` é `AvailableTheme` — sem cast.

---

**`TS005` — `as const` utilizado** *(⚪ Info)*

Afeta: `taskActions.ts`.

```ts
export const TaskActionTypes = {
  START_TASK: "START_TASK",
  // ...
} as const;
```

Decisão consciente e correta. `as const` é o mecanismo que transforma os valores de string em tipos literais, habilitando o discriminated union e o narrowing no reducer. Não há correção necessária — é o padrão correto para constantes usadas como discriminators de union.

---

**Ponto de atenção: `Logo` com href inválido** *(não catalogado, arquitetural)*

```tsx
<a className={styles.logoLink} href="http://">
```

O `href="http://"` não é uma URL válida — ao clicar, pode causar comportamento inesperado dependendo do browser. Sem sistema de roteamento implementado (o projeto não usa React Router), todos os links de navegação usam `href="#"` ou URLs relativas que não existem ainda. Este é um indicador de que o projeto ainda não implementou roteamento client-side.

---

**Ponto de atenção: `PomodoroConfig` desconectado do estado global** *(arquitetural)*

`PomodoroConfig/index.tsx` gerencia `workDuration` e `breakDuration` em `useState` local e persiste no `localStorage`. Porém, `initialTaskState` define `config` com valores fixos:

```ts
config: {
  workTime: 1,
  shortBreakTime: 1,
  longBreakTime: 1,
},
```

O componente `PomodoroConfig` não despacha nenhuma action para atualizar `state.config`. Os valores salvos no `localStorage` por `PomodoroConfig` nunca são lidos pelo `initialTaskState`. Há uma funcionalidade de configuração implementada mas desconectada do estado que determina a duração das tarefas.

---

### Exercícios

---

**Básico — Adicionar `export named` ao `useTaskContext` e converter para arrow function**

Refatore `src/contexts/TaskContext/useTaskContext.ts` para seguir o padrão de arrow function do Protocolo Aruanda. O hook deve manter o mesmo comportamento, mas ser declarado como `const` em vez de `function`.

Critério de aceitação:
- O hook é declarado como `export const useTaskContext = () => ...`
- Não usa `React.FC`, não usa `any`
- O TypeScript não aponta erros após a mudança
- Todos os componentes que importam `useTaskContext` continuam funcionando sem alteração

---

**Médio — Conectar `PomodoroConfig` ao estado global**

O componente `PomodoroConfig` salva durações no `localStorage`, mas esses valores nunca chegam ao estado gerenciado pelo reducer. Implemente a conexão.

Etapas necessárias:
1. Adicionar uma nova action `UPDATE_CONFIG` em `taskActions.ts` com payload `{ workTime: number; shortBreakTime: number; longBreakTime: number }`
2. Implementar o case correspondente no `taskReducer.ts`
3. Ler os valores do `localStorage` no `initialTaskState.ts` como estado inicial de `config`
4. Fazer `PomodoroConfig` usar `dispatch` em vez de `useState` local para atualizar as durações

Critério de aceitação:
- `taskActions.ts` exporta `UPDATE_CONFIG` no `TaskActionTypes` e no discriminated union
- O reducer retorna o estado correto para `UPDATE_CONFIG`
- `initialTaskState` lê `localStorage` para inicializar `config` (com fallback para os valores padrão)
- `PomodoroConfig` usa `useTaskContext()` e despacha `UPDATE_CONFIG`
- Alterar os inputs de `PomodoroConfig` reflete na duração das tarefas criadas em `MainForm`

---

**Avançado — Implementar type guard para `localStorage` e validação de estado persistido**

O projeto salva tema no `localStorage` (em `Menu`) e configurações (em `PomodoroConfig`). Ambas as leituras usam `as` casting ou conversão direta sem validar se o valor armazenado é válido.

Implemente uma solução de leitura segura de `localStorage` reutilizável.

Requisitos:
- Criar `src/utils/getStoredValue.ts` com uma função genérica que aceita uma chave, um type guard, e um valor default
- A função deve retornar o valor tipado se o type guard passar, ou o default caso contrário
- Substituir todos os usos de `localStorage.getItem` no projeto por esta função
- Nenhum `as` casting relacionado a `localStorage` deve permanecer

Critério de aceitação aberto — decisões a justificar:
- Qual assinatura de tipo faz mais sentido para a função utilitária?
- O type guard deve ser passado como parâmetro ou inferido automaticamente via Zod/validação?
- Como tratar valores `null` (chave inexistente) vs valores com formato inválido?
- Onde a função deve viver na estrutura do projeto (`utils/` ou `adapters/`)?
- A solução é extensível para serialização de objetos complexos (ex: `config` completo como JSON)?
