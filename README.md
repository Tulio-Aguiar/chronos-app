# Chronos

A Pomodoro timer built with React 19, TypeScript and Vite. Name a task, start the timer, and Chronos walks you through the classic cycle of focus sessions and breaks while keeping a sortable history of everything you worked on.

## Features

- **Automatic cycle sequencing.** Each task is assigned its type from the position in an 8-step cycle: four focus sessions, three short breaks and one long break.
- **Drift-free countdown.** The timer runs in a dedicated Web Worker and derives the remaining time from the task's absolute end timestamp on every tick, so the count does not accumulate error. The remaining time is mirrored in the browser tab title and a sound plays when a task completes.
- **Task history.** A table of every task with duration, start date, type and status (completed, interrupted, in progress or abandoned), sortable by any column, with a confirmation dialog before clearing it.
- **Configurable durations.** Focus, short break and long break lengths are validated between 1 and 120 minutes.
- **Light and dark themes**, remembered between visits.
- **Local persistence.** Tasks, settings and cycle progress are stored in `localStorage`; there is no backend.
- **Routing.** Home, History, Settings, an explanatory page about the Pomodoro technique and a 404 page, using React Router 7.

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 19, CSS Modules |
| Language | TypeScript 5.9 (strict project references) |
| Build | Vite 7 with the SWC React plugin |
| Routing | React Router 7 |
| Feedback | React Toastify (wrapped in an adapter, including a confirm dialog) |
| Icons and dates | lucide-react, date-fns |
| Quality | ESLint 9 with typescript-eslint and the React Hooks rules |

## Architecture

State lives in a single `TaskContext` backed by `useReducer`. Actions are a TypeScript discriminated union (`START_TASK`, `COUNT_DOWN`, `COMPLETE_TASK`, `INTERRUPT_TASK`, `CHANGE_SETTINGS`, `RESET_STATE`), so the reducer is exhaustively typed and free of side effects. Side effects (persistence, audio, the worker) are kept in the context provider.

```
src/
├── adapters/        thin wrapper over the toast library (showMessage)
├── components/      presentational and form components, one folder each
├── contexts/        TaskContext: state, actions, reducer, provider, hook
├── models/          TaskModel and TaskStateModel types
├── pages/           Home, History, Settings, AboutPomodoro, NotFound
├── routers/         route table and scroll-to-top behaviour
├── templates/       shared page layout
├── utils/           pure helpers: cycle sequencing, status, sorting, formatting
└── workers/         TimerWorkerManager (singleton) and timerWorker.js
```

Design decisions worth noting:

- **The worker is the clock, React is the view.** The worker posts the remaining seconds each second; the provider only dispatches `COUNT_DOWN` and `COMPLETE_TASK`.
- **Pure utilities.** Cycle sequencing, task status and sorting are plain functions, which keeps them easy to unit test.
- **One adapter for notifications**, so the toast library can be swapped without touching components.

## Getting started

Requires Node.js 20.19+ or 22.12+ (a Vite 7 requirement).

```bash
git clone https://github.com/Tulio-Aguiar/chronos-app.git
cd chronos-app
npm install
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server (opens Chrome) |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Roadmap

- Unit tests for the reducer and cycle utilities (Vitest), end-to-end tests (Playwright)
- Interface translations (English and German)
- Public deployment

## License

No license has been declared yet; all rights reserved by the author.
