const countdownDisplay = document.getElementById('countdown');
countdownDisplay.innerHTML = '';
let interval;
let timerData;
window.Main.on('start-countdown', (timerValue) => {
  timerData = isNaN(timerValue) ? 10 : timerValue;
  console.log({ timerValue });
  clearInterval(interval);
  countdown(timerData);
});

window.Main.on('stop-countdown', () => {
  clearInterval(interval);
  countdownDisplay.textContent = '00:00';
});

window.Main.on('pause-countdown', () => {
  console.log('Pausing countdown');
  clearInterval(interval);
});

window.Main.on('resume-countdown', () => {
  countdown(timerData);
});

function countdown(totalSeconds) {
  countdownDisplay.textContent =
    Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0') +
    ':' +
    (totalSeconds % 60).toString().padStart(2, '0');
  interval = setInterval(() => {
    totalSeconds--;
    console.log({ totalSeconds });
    const remainingMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    const formattedTime = `${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
    console.log(`Time remaining: ${formattedTime}`);
    countdownDisplay.textContent = formattedTime;
    if (totalSeconds <= 0) {
      clearInterval(interval);
      console.log('Time has elapsed!');
      countdownDisplay.textContent = '00:00';
    }
  }, 1000);
}
