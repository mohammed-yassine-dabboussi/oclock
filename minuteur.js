const startTimer = document.getElementById("start-timer");
const timeInput = document.getElementById("time-input");
const timerOutput = document.getElementById("timer-output");
const stopTimer = document.getElementById("stop-timer");
const stopAlarm = document.getElementById("stop-alarm");

let alarmTime, isAlarmSet,
ringtone = new Audio("./files/ringtone.mp3");


let countdown;


function startCountdown(minutes) {
    clearInterval(countdown);
    let remainingTime = minutes * 60;
    countdown = setInterval(function() {
        if (remainingTime <= 0) {
            // Ajouter un son de minuteur
            ringtone.play();
            clearInterval(countdown);
            timerOutput.innerHTML = "Temps est écoulé.!";
            stopAlarm.removeAttribute("disabled");
            return;
        }
        timerOutput.innerHTML = formatTime(remainingTime);
        remainingTime--;
    }, 1000);
    
    stopTimer.removeAttribute("disabled");
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    return minutes + ":" + remainingSeconds;
}

startTimer.addEventListener("click", function() {
    let time = timeInput.value;
    if (time) {
        startCountdown(time);
    }
});



stopTimer.addEventListener("click", function() {
    clearInterval(countdown);
    timerOutput.innerHTML = "00:00";
    stopTimer.setAttribute("disabled", true);
    stopAlarm.setAttribute("disabled", true);
    ringtone.pause();
    ringtone.currentTime = 0;
});

stopAlarm.addEventListener("click", function() {
    ringtone.pause();
    ringtone.currentTime = 0;
    stopAlarm.setAttribute("disabled", true);
});