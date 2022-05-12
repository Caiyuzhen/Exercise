// You got this! 💫


// 💻 Work: 25 mins
// ☕️ Short break: 5 mins
// 🌯 Long break: 15 mins


const workButton = document.getElementById("work-btn")
const shortBreakButton = document.getElementById("short-break-btn")
const longBreakButton = document.getElementById("long-break-btn")
const resetButton = document.getElementById("reset")
const audio = new Audio('https://www.soundjay.com/nature/sounds/rain-07.mp3')

let timer = document.getElementById("time-display")
let timeout;
let mins;
let secs;
let currentSeconds;
let currentMinutes;


workButton.addEventListener("click", () => setTime(25));
shortBreakButton.addEventListener("click", () => setTime(5));
longBreakButton.addEventListener("click", () => setTime(15));
resetButton.addEventListener("click", reset)

function setTime(time) {
    mins = time;
    secs = mins * 60;
    workTimer(time);
    workTimer(time);
}

function workTimer(time) {
    currentMinutes = Math.floor(secs / 60);
    currentSeconds = secs % 60;

    if (currentSeconds <= 9) currentSeconds = "0" + currentSeconds;

    secs--;
    audio.play()
    audio.loop = true;
    timer.innerHTML = currentMinutes + ":" + currentSeconds;

    timeout = setTimeout(workTimer, 1000);

    if (currentMinutes == time) {
        clearTimeout(timeout)
        timer.innerHTML = "0:00"
        audio.pause()
        audio.currentTime = 0;
    }

}

function reset() {
    clearTimeout(timeout)
    timer.innerHTML = "0:00"
    audio.pause()
    audio.currentTime = 0;
}