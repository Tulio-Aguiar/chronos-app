## Problemas com o TimerWorker

## TaskContextProvider

import { useEffect, useReducer } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager.ts";

type TaskContextProviderProps = {
children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
const [state, dispatch] = useReducer(taskReducer, initialTaskState);

const worker = TimerWorkerManager.getInstance();

worker.onmessage((e) => {
const countDownSeconds = e.data;
console.log(countDownSeconds);

    if (countDownSeconds <= 0) {
      console.log("Worker COMPLETED");
      worker.terminate();
    }

});

useEffect(() => {
if (!state.activeTask) {
console.log("Terminando worker");
worker.terminate();
}
worker.postMessage(state);
}, [worker, state]);

return (
<TaskContext.Provider value={{ state, dispatch }}>
{children}
</TaskContext.Provider>
);
}

## TimerWorkerManager

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

postMessage(message: string | object) {
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

## TimerWorker

let isRunning = false;

self.onmessage = function (event) {
if (isRunning) return;

isRunning = true;

const state = event.data;
const { activeTask, secondsRemaining } = state;

const endDate = activeTask.startDate + secondsRemaining \* 1000;
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
