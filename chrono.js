const startBtn = document.querySelector("#start");
const pauseBtn = document.querySelector("#pause");
const resetBtn = document.querySelector("#reset");
const lapBtn = document.querySelector("#lap");
const timerDisplay = document.querySelector("#timer");
const lapList = document.querySelector("#lap-list");

let startTime,
  elapsedTime = 0,
  timerID,
  isPaused = true,
  lapNum = 1;

function startTimer() {
  if (isPaused) {
    startTime = Date.now();
    timerID = setInterval(updateTimer, 10);
    isPaused = false;
    startBtn.innerText = "Pause";
    lapBtn.style.display = "block";
  } else {
    clearInterval(timerID);
    elapsedTime += Date.now() - startTime;
    isPaused = true;
    startBtn.innerText = "Resume";
    lapBtn.style.display = "none";
  }
}

function updateTimer() {
  let time = Date.now() - startTime + elapsedTime;
  let minutes = Math.floor(time / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = time % 1000;

  // ajouter un 0 devant les minutes, les secondes et les millisecondes si leur valeur est inférieure à 10
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds = milliseconds < 10 ? "00" + milliseconds : milliseconds;
  milliseconds = milliseconds < 100 ? "0" + milliseconds : milliseconds;

  timerDisplay.innerText = `${minutes}:${seconds}:${milliseconds}`;
}

function resetTimer() {
  clearInterval(timerID);
  startTime = 0;
  elapsedTime = 0;
  timerDisplay.innerText = "00:00:00";
  isPaused = true;
  startBtn.innerText = "Start";
  lapBtn.style.display = "none";
  lapNum = 1;
  lapList.innerHTML = "";
}

function recordLap() {
  const lapTime = timerDisplay.innerText;
  const lapItem = document.createElement("li");
  lapItem.innerText = `Tour ${lapNum}: ${lapTime}`;
  lapList.appendChild(lapItem);
  lapNum++;
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);