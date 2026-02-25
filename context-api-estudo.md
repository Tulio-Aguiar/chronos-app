# Context API — Do Problema à Solução
### Baseado nos commits do Chronos App

---

## Parte 1 — O problema que o Context veio resolver

Antes de entender o Context API, é preciso entender o que o incomodava.

No commit **"Props Drilling"**, o estado da aplicação nasceu em `App.tsx`:

```tsx
// App.tsx
const [state, setState] = useState(initialState);
return <Home state={state} setState={setState} />;
```

`Home` recebia `state` e `setState` como props. Mas `Home` não usava esse estado — ela só o repassava para seus filhos:

```tsx
// Home/index.tsx
export default function Home(props: HomeProps) {
  return (
    <MainTemplate>
      <CountDown {...props} />   // repassa tudo
      <MainForm {...props} />    // repassa tudo
    </MainTemplate>
  );
}
```

`CountDown` e `MainForm` aí sim usavam o estado. Mas para chegar até eles, o estado tinha que passar por `Home` — um intermediário que não precisava do dado, só o carregava.

Isso é **Props Drilling**: perfurar a árvore de componentes passando props manualmente por cada nível, mesmo pelos níveis que não precisam desses dados.

### Por que isso dói?

Imagine que o app crescesse. A página de histórico também precisa de `state`. As configurações também. O botão de parar o timer também. Cada um desses componentes pode estar 3, 4, 5 níveis abaixo na árvore. Todos os componentes intermediários precisariam receber e repassar `state` e `setState` — sem nunca usar.

O código ficaria frágil: qualquer mudança no tipo do estado obrigaria atualizações em todos os arquivos da cadeia, mesmo nos que não têm nada a ver com o estado.

---

## Parte 2 — O que é o Context API

Context API é um mecanismo do React que cria um **canal direto de comunicação** entre um componente pai e qualquer descendente, independente da profundidade.

Em vez de passar dados de mão em mão pela árvore, você:

1. **Cria um contexto** — define o formato do dado que vai trafegar
2. **Cria um Provider** — o componente que envolve a árvore e fornece o dado
3. **Consome onde precisar** — qualquer componente filho acessa o dado diretamente, sem intermediários

Visualizando a diferença:

```
PROPS DRILLING:
App → Home → CountDown ✅ (usa)
App → Home → MainForm ✅ (usa)
        ↑
      Home ❌ (não usa, só repassa)

CONTEXT API:
App (Provider — disponibiliza o estado)
 ├── Home (não recebe nada)
 │    ├── CountDown → useTaskContext() ✅ (acessa direto)
 │    └── MainForm  → useTaskContext() ✅ (acessa direto)
```

---

## Parte 3 — As três peças do Context API

### Peça 1: `createContext`

```tsx
export const TaskContext = createContext<TaskContextProps>(initialContextValue);
```

`createContext` cria o "canal". Ele recebe dois argumentos:

- **O tipo genérico** `<TaskContextProps>` — define o formato do que vai trafegar no canal (TypeScript)
- **O valor inicial** `initialContextValue` — o valor padrão, usado quando um componente tenta consumir o contexto mas não tem um Provider acima dele na árvore

O `TaskContext` criado aqui é o objeto que conecta Provider e consumidores. É a "tomada na parede" — quem quiser energia se conecta nela.

---

### Peça 2: O Provider

```tsx
export function TaskContextProvider({ children }: TaskContextProviderProps) {
  return (
    <TaskContext.Provider value={{ ...initialContextValue }}>
      {children}
    </TaskContext.Provider>
  );
}
```

O `Provider` é o componente que **disponibiliza o dado** para toda a árvore abaixo dele. Ele funciona como um "gerador de energia" conectado à tomada.

- `TaskContext.Provider` é o componente interno do React que faz a magia acontecer
- `value` é o dado que ele disponibiliza — qualquer componente dentro da árvore pode acessar esse `value`
- `{children}` são todos os componentes filhos que vivem dentro do Provider

Em `App.tsx`:

```tsx
export default function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}
```

`Home` e todos os seus descendentes agora vivem dentro do Provider. Qualquer um deles pode acessar o `value` do contexto.

---

### Peça 3: `useContext` / `useTaskContext`

```tsx
export function useTaskContext() {
  return useContext(TaskContext);
}
```

`useContext` é o hook que **lê o dado** do contexto mais próximo acima na árvore. Ele recebe o `TaskContext` (a "tomada") e retorna o `value` que o Provider está disponibilizando.

O professor criou `useTaskContext` como um wrapper — uma função que encapsula o `useContext(TaskContext)` para que os componentes não precisem saber qual contexto estão usando. É uma camada de abstração: os componentes chamam `useTaskContext()` e recebem o dado.

Em `CountDown`:

```tsx
export default function CountDown() {
  const taskContext = useTaskContext();
  console.log(taskContext); // { state: {...}, setState: fn }
  return <div className={styles.container}>00:00</div>;
}
```

`CountDown` agora acessa o estado **diretamente**, sem receber nenhuma prop. `Home` não sabe que `CountDown` precisa do estado — e não precisa saber.

---

## Parte 4 — O arquivo `TaskContext/index.tsx` inteiro, explicado linha a linha

```tsx
// 1. Imports necessários do React
import { createContext, useContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
```

`createContext` cria o canal. `useContext` lê o canal. `TaskStateModel` é o tipo do estado — importado como `type` porque é só uma definição TypeScript, sem existência em runtime.

---

```tsx
// 2. O estado inicial da aplicação
const initialState: TaskStateModel = {
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

O estado inicial saiu do `App.tsx` e entrou no arquivo de contexto. Faz sentido: quem gerencia o estado é o contexto, então o valor inicial também fica aqui.

---

```tsx
// 3. O tipo do valor que o contexto vai disponibilizar
type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};
```

Define o formato do `value` do Provider. Qualquer componente que chamar `useTaskContext()` vai receber um objeto com `state` e `setState`.

`React.Dispatch<React.SetStateAction<TaskStateModel>>` é o tipo exato do `setState` retornado pelo `useState`. É verboso, mas preciso.

---

```tsx
// 4. O valor padrão do contexto (fallback)
const initialContextValue = {
  state: initialState,
  setState: () => {},
};
```

Esse é o valor que o contexto assume quando não há Provider acima. O `setState: () => {}` é uma função vazia — um placeholder que não faz nada. Na prática, sempre haverá um Provider (em `App.tsx`), então esse fallback raramente é usado.

---

```tsx
// 5. A criação do contexto
export const TaskContext = createContext<TaskContextProps>(initialContextValue);
```

O canal é criado aqui. O generic `<TaskContextProps>` garante que TypeScript valide tudo que trafega nele.

---

```tsx
// 6. O componente Provider
export function TaskContextProvider({ children }: TaskContextProviderProps) {
  return (
    <TaskContext.Provider value={{ ...initialContextValue }}>
      {children}
    </TaskContext.Provider>
  );
}
```

O Provider envolve os filhos e disponibiliza o `value`. O spread `{ ...initialContextValue }` passa `state` e `setState` para o contexto.

**Atenção importante:** nesse estágio do curso, o `useState` ainda não foi movido para dentro do `TaskContextProvider`. O `value` do Provider usa `initialContextValue` diretamente — o que significa que `setState` ainda é a função vazia `() => {}`. O estado não é reativo ainda. Essa é uma etapa de construção — o `useState` dentro do Provider vem numa aula próxima.

---

```tsx
// 7. O hook customizado
export function useTaskContext() {
  return useContext(TaskContext);
}
```

Uma conveniência. Em vez de importar `useContext` e `TaskContext` em cada componente que precisar do estado, basta importar `useTaskContext` — um único import, sem precisar conhecer os detalhes de implementação do contexto.

---

## Parte 5 — O fluxo completo, do topo até o componente

```
1. App.tsx
   └── <TaskContextProvider>  ← Provider envolve tudo
         └── <Home />          ← Home não recebe nada

2. Home/index.tsx
   └── <CountDown />           ← sem props
   └── <MainForm />            ← sem props

3. CountDown/index.tsx
   const taskContext = useTaskContext()
   ↑
   useTaskContext() chama useContext(TaskContext)
   ↑
   useContext sobe a árvore até encontrar o Provider mais próximo
   ↑
   encontra TaskContextProvider em App.tsx
   ↑
   retorna o value: { state, setState }
```

Cada componente que chamar `useTaskContext()` recebe o mesmo objeto `{ state, setState }` — sem que nenhum componente intermediário precise carregar esses dados.

---

## Resumo das três regras do Context API

**Regra 1:** Tudo que quiser usar o contexto precisa estar **dentro** do Provider na árvore de componentes.

**Regra 2:** O `value` do Provider é o único dado que os consumidores recebem — coloque nele tudo que os filhos precisarão acessar.

**Regra 3:** O hook customizado (`useTaskContext`) é apenas uma conveniência — por baixo é sempre `useContext(TaskContext)`.

---

## O que vem a seguir

O `useState` ainda está fora do Provider. O próximo passo natural é mover o `useState(initialState)` para dentro do `TaskContextProvider`, e passar o `state` real e o `setState` real no `value` do Provider. Com isso, o contexto passa a ser verdadeiramente reativo — qualquer chamada a `setState` em qualquer componente atualiza o estado e re-renderiza todos os consumidores automaticamente.
