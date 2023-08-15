const countdownDisplay = document.getElementById('countdown');
countdownDisplay.innerHTML = '';
let interval;
let timerData;
let runningCount = null;
window.Main.on('start-countdown', (timerValue) => {
  if (runningCount !== null || runningCount > 0) {
    countdown(timerData);
    return;
  }
  timerData = isNaN(timerValue) ? 10 : timerValue;
  console.log({ timerValue });
  clearInterval(interval);
  countdown(timerData);
});

window.Main.on('stop-countdown', () => {
  clearInterval(interval);
  countdownDisplay.textContent = formatTimeToDisplay(timerData);
});

window.Main.on('pause-countdown', () => {
  console.log('Pausing countdown');
  clearInterval(interval);
});

window.Main.on('resume-countdown', () => {
  countdown(timerData);
});

function countdown(totalSeconds) {
  runningCount = totalSeconds;
  clearInterval(interval);

  countdownDisplay.textContent = formatTimeToDisplay(runningCount);
  interval = setInterval(() => {
    runningCount--;
    console.log({ totalSecondss: runningCount });

    const formattedTime = formatTimeToDisplay(runningCount);
    console.log(`Time remaining: ${formattedTime}`);
    countdownDisplay.textContent = formattedTime;
    if (runningCount <= 0) {
      clearInterval(interval);
      console.log('Time has elapsed!');
      countdownDisplay.textContent = '00:00';
      runningCount = null;
    }
  }, 1000);
}

const formatTimeToDisplay = (time) => {
  return (
    Math.floor(parseInt(time / 60))
      .toString()
      .padStart(2, '0') +
    ':' +
    parseInt(time % 60)
      .toString()
      .padStart(2, '0')
  );
};
