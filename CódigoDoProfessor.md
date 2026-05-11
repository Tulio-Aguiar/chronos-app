## Problemas com o TimerWorker

## TaskContextProvider

@@ -2,6 +2,7 @@ import { useEffect, useReducer } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';

type TaskContextProviderProps = {
children: React.ReactNode;
@@ -10,9 +11,26 @@ type TaskContextProviderProps = {
export function TaskContextProvider({ children }: TaskContextProviderProps) {
const [state, dispatch] = useReducer(taskReducer, initialTaskState);

const worker = TimerWorkerManager.getInstance();

worker.onmessage(e => {
const countDownSeconds = e.data;
console.log(countDownSeconds);

    if (countDownSeconds <= 0) {
      console.log('Worker COMPLETED');
      worker.terminate();
    }

});

useEffect(() => {
if (!state.activeTask) {
console.log('Worker terminado por falta de activeTask');
worker.terminate();
}

    worker.postMessage(state);

}, [worker, state]);

return (
<TaskContext.Provider value={{ state, dispatch }}>

## TimerWorker

let isRunning = false;

self.onmessage = function (event) {if (isRunning) return;

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
