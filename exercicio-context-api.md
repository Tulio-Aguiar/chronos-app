# Exercício — Context API
### Ambiente: CodeSandbox · Tema: UserPreferencesContext

---

## Onde abrir

Acesse o template oficial React + TypeScript:
**https://codesandbox.io/p/sandbox/react-ts**

Ao abrir, você verá um projeto React limpo com TypeScript. É aqui que vamos trabalhar.

---

## O que vamos construir

Um mini-app de **Preferências do Usuário** com:

- Um contexto que guarda `{ userName, language }`
- Um `UserPreferencesProvider` que envolve o app
- Um hook `useUserPreferences()` para consumir o contexto
- Um componente `Greeting` que lê o contexto e exibe uma saudação
- Um componente `UserForm` que lê e **modifica** o contexto

### Por que esse exercício?

O espelho com o Chronos é direto:

| Chronos                  | Este exercício              |
|--------------------------|-----------------------------|
| `TaskStateModel`         | `UserPreferencesModel`      |
| `TaskContextProvider`    | `UserPreferencesProvider`   |
| `useTaskContext()`       | `useUserPreferences()`      |
| `CountDown` (lê estado)  | `Greeting` (lê estado)      |
| `MainForm` (muda estado) | `UserForm` (muda estado)    |

A estrutura é idêntica. O conteúdo é mais simples.

---

## Estrutura de arquivos a criar

```
src/
├── App.tsx                          ← já existe, você vai modificar
├── models/
│   └── UserPreferencesModel.ts      ← Passo 1
├── contexts/
│   └── UserPreferencesContext.tsx   ← Passo 2
└── components/
    ├── Greeting.tsx                 ← Passo 3
    └── UserForm.tsx                 ← Passo 4
```

---

## Passo 1 — O modelo

Crie o arquivo `src/models/UserPreferencesModel.ts`:

```ts
export type UserPreferencesModel = {
  userName: string;
  language: 'pt' | 'en';
};
```

Esse tipo define o formato do estado que vai trafegar no contexto.
É o equivalente ao `TaskStateModel` do Chronos.

**Checkpoint:** o arquivo existe e exporta o tipo sem erros TypeScript.

---

## Passo 2 — O contexto (o arquivo mais importante)

Crie `src/contexts/UserPreferencesContext.tsx`.

### 2a — Imports e estado inicial

```tsx
import { createContext, useContext, useState } from 'react';
import type { UserPreferencesModel } from '../models/UserPreferencesModel';

const initialState: UserPreferencesModel = {
  userName: 'Visitante',
  language: 'pt',
};
```

### 2b — O tipo do valor do contexto

```tsx
type UserPreferencesContextProps = {
  state: UserPreferencesModel;
  setState: React.Dispatch<React.SetStateAction<UserPreferencesModel>>;
};
```

### 2c — O valor inicial do contexto (fallback)

```tsx
const initialContextValue: UserPreferencesContextProps = {
  state: initialState,
  setState: () => {},
};
```

### 2d — Criação do contexto

```tsx
export const UserPreferencesContext = createContext<UserPreferencesContextProps>(
  initialContextValue
);
```

### 2e — O Provider com useState real

Aqui está a diferença em relação ao Chronos nesse estágio:
neste exercício, vamos colocar o `useState` **dentro** do Provider desde já,
para que o estado seja reativo.

```tsx
type UserPreferencesProviderProps = {
  children: React.ReactNode;
};

export function UserPreferencesProvider({ children }: UserPreferencesProviderProps) {
  const [state, setState] = useState<UserPreferencesModel>(initialState);

  return (
    <UserPreferencesContext.Provider value={{ state, setState }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
```

### 2f — O hook customizado

```tsx
export function useUserPreferences() {
  return useContext(UserPreferencesContext);
}
```

**Checkpoint:** o arquivo exporta `UserPreferencesProvider` e `useUserPreferences` sem erros.

---

## Passo 3 — O componente que lê o contexto

Crie `src/components/Greeting.tsx`:

```tsx
import { useUserPreferences } from '../contexts/UserPreferencesContext';

export function Greeting() {
  const { state } = useUserPreferences();

  const messages = {
    pt: `Olá, ${state.userName}!`,
    en: `Hello, ${state.userName}!`,
  };

  return <h1>{messages[state.language]}</h1>;
}
```

`Greeting` não recebe nenhuma prop. Ele acessa o estado diretamente pelo hook.
Mude o `userName` ou o `language` via `UserForm` — este componente atualiza automaticamente.

**Checkpoint:** o componente renderiza "Olá, Visitante!" sem erros.

---

## Passo 4 — O componente que modifica o contexto

Crie `src/components/UserForm.tsx`:

```tsx
import { useUserPreferences } from '../contexts/UserPreferencesContext';

export function UserForm() {
  const { state, setState } = useUserPreferences();

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState(prev => ({ ...prev, userName: e.target.value }));
  }

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setState(prev => ({
      ...prev,
      language: e.target.value as 'pt' | 'en',
    }));
  }

  return (
    <div>
      <label>
        Nome:
        <input type="text" value={state.userName} onChange={handleNameChange} />
      </label>

      <label>
        Idioma:
        <select value={state.language} onChange={handleLanguageChange}>
          <option value="pt">Português</option>
          <option value="en">English</option>
        </select>
      </label>
    </div>
  );
}
```

**Atenção ao `setState` aqui:**
`setState(prev => ({ ...prev, userName: e.target.value }))` usa o spread
para preservar os outros campos do estado. Se omitir o spread, o estado perde
o campo `language` ao atualizar o `userName`.

**Checkpoint:** digitar no input altera o texto em `Greeting` em tempo real.

---

## Passo 5 — Montar o App

Abra `src/App.tsx` e substitua pelo conteúdo abaixo:

```tsx
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';
import { Greeting } from './components/Greeting';
import { UserForm } from './components/UserForm';

export default function App() {
  return (
    <UserPreferencesProvider>
      <Greeting />
      <UserForm />
    </UserPreferencesProvider>
  );
}
```

**Checkpoint final:** ao digitar um nome no input, o `<h1>` em `Greeting` atualiza em tempo real. Ao mudar o idioma, a saudação muda entre "Olá" e "Hello" — sem que `App` saiba nada sobre o estado, e sem passar nenhuma prop entre os componentes.

---

## O que observar durante o exercício

**Observe que `App` não tem `useState`.** O estado vive dentro do `UserPreferencesProvider`. `App` só decide quem vai dentro do Provider.

**Observe que `Greeting` e `UserForm` não recebem props.** Ambos acessam o mesmo objeto de estado via `useUserPreferences()`. Quando `UserForm` chama `setState`, `Greeting` re-renderiza automaticamente porque está consumindo o mesmo contexto.

**Observe o spread no `setState`.** `prev => ({ ...prev, userName: valor })` é o padrão para atualizar um campo sem perder os outros. É o mesmo padrão do `MainForm` no Chronos.

---

## Sites para praticar Context API além do CodeSandbox

**React Docs oficiais — react.dev**
`https://react.dev/learn/passing-data-deeply-with-context`
A documentação oficial tem sandboxes interativos embutidos. Você edita o código diretamente na página e vê o resultado. É a referência mais confiável.

**StackBlitz**
`https://stackblitz.com/edit/vitejs-vite-react-ts`
Stack idêntica ao Chronos: Vite + React + TypeScript. Mais próximo do ambiente real de desenvolvimento.

**Scrimba**
`https://scrimba.com/learn/learnreact`
Cursos interativos onde você edita o código dentro do vídeo. Tem módulo específico de hooks e Context API.

---

## Diferença entre este exercício e o Chronos

No Chronos, o `useState` ainda não está dentro do `TaskContextProvider`.
O `value` do Provider usa `initialContextValue` com um `setState` vazio — o estado ainda não é reativo via contexto.

Neste exercício, o `useState` já está dentro do Provider desde o Passo 2e.
Isso torna o contexto completamente funcional: `setState` atualiza o estado real, e todos os consumidores re-renderizam.

Essa é a etapa que o curso do Chronos ainda vai implementar nas próximas aulas.
Ao terminar este exercício, você já terá praticado o que vem a seguir.
