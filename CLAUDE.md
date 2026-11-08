# Chronos

Pomodoro timer app. Tasks cycle through focus sessions and breaks; history and settings persist in `localStorage` (no backend). UI copy is in Portuguese.

## Stack

React 19, TypeScript 5.9 (strict), Vite 7, React Router 7, CSS Modules, date-fns, lucide-react, react-toastify, ESLint 9.

## Scripts

- `npm run dev` – start the Vite dev server
- `npm run build` – type-check (`tsc -b`) and build for production
- `npm run lint` – run ESLint
- `npm run preview` – serve the production build

`npm run lint` and `npm run build` must pass before committing.

## Structure (`src/`)

- `adapters/` – thin wrappers around external libraries (e.g. `showMessage` over react-toastify)
- `assets/` – audio and global/theme CSS
- `components/` – reusable UI components, each with its own `styles.module.css`
- `contexts/TaskContext/` – context, provider, reducer, actions, initial state
- `models/` – shared TypeScript types
- `pages/` – route-level pages (Home, History, Settings, Menu)
- `routers/` – route definitions
- `templates/` – page layout wrappers
- `utils/` – pure helper functions
- `workers/` – Web Worker running the countdown, plus its manager

## Conventions

- TypeScript strict mode; avoid `any`.
- Styling with CSS Modules; theme tokens live in `assets/styles/theme.css`.
- App state lives in `TaskContext`, updated through `useReducer` and typed actions.
- Keep utilities in `utils/` pure and free of React or side effects.
- Access external libraries through adapters rather than importing them across components.
- Keep UI text in Portuguese; code, comments and commit messages in English (Conventional Commits).
