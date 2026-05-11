import type { TaskModel } from "../models/TaskModel";

let instance: TimerWorkerManager | null = null;

export type TimerWorkerInput = {
  activeTask: TaskModel;
  secondsRemaining: number;
};

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

  postMessage(message: TimerWorkerInput) {
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
