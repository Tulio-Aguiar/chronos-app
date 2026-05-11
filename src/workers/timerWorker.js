let timeoutId = null;

self.onmessage = function (event) {
  const state = event.data;
  const { activeTask, secondsRemaining } = state || {};

  if (!activeTask || typeof secondsRemaining !== "number") return;

  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  const endDate = activeTask.startDate + secondsRemaining * 1000;

  function tick() {
    const now = Date.now();
    const countDownSeconds = Math.ceil((endDate - now) / 1000);

    self.postMessage(countDownSeconds);

    if (countDownSeconds <= 0) {
      timeoutId = null;
      return;
    }

    timeoutId = setTimeout(tick, 1000);
  }

  tick();
};
