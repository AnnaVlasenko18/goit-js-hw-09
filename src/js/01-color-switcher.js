const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let timerI = null;

startBtn.addEventListener('click', () => {
     startBtn.disabled = true;
     stopBtn.disabled = false;
     timerID = setInterval(() => {
     bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

stopBtn.addEventListener('click', () => {
     startBtn.disabled = false;
     stopBtn.disabled = true;
     clearInterval(timerID);
});

function getRandomHexColor() {
     return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

