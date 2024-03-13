let pagesInput = document.getElementById('pages');
let speedInput = document.getElementById('speed');
let timerDisplay = document.getElementById('timer');
let statusDisplay = document.getElementById('status');
let pages = parseInt(pagesInput.value);
let speed = parseInt(speedInput.value);
let timerInterval;
let totalTime = 0;
let startTime = 0;

function startReading() {
    pages = parseInt(pagesInput.value);
    speed = parseInt(speedInput.value);
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 1000);
    updateStatus();
}

function stopReading() {
    clearInterval(timerInterval);
    updateStatus();
}

function updateTime() {
    totalTime = Math.floor((Date.now() - startTime) / 1000);
    updateTimerDisplay();
    updateStatus();
}

function updateTimerDisplay() {
    let hours = Math.floor(totalTime / 3600);
    let minutes = Math.floor((totalTime % 3600) / 60);
    let seconds = totalTime % 60;
    timerDisplay.textContent = `Tempo de leitura: ${padLeft(hours)}:${padLeft(minutes)}:${padLeft(seconds)}`;
}

function padLeft(value) {
    return value < 10 ? '0' + value : value;
}

function updateStatus() {
    let pagesRead = Math.floor(totalTime * speed / 60);
    let remainingPages = pages - pagesRead;
    let hoursRemaining = Math.floor(remainingPages / speed);
    let minutesRemaining = Math.ceil((remainingPages % speed) / speed * 60);

    if (remainingPages <= 0) {
        clearInterval(timerInterval);
        statusDisplay.textContent = 'Você terminou de ler o livro!';
    } else {
        statusDisplay.textContent = `Páginas restantes: ${remainingPages}, Tempo restante: ${hoursRemaining} horas e ${minutesRemaining} minutos`;
    }
}