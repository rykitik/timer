function startTimer(duration, display) {
    let timerData = loadTimerData();

    let start = timerData.start || Date.now();
    let isCountdown = timerData.isCountdown !== undefined ? timerData.isCountdown : true;
    let timerInterval;

    function loadTimerData() {
        try {
            let data = localStorage.getItem('timerData');
            return JSON.parse(data) || {};
        } catch (error) {
            console.error('Error parsing timer data:', error);
            return {};
        }
    }

    function updateDisplay() {
        let currentTime = Date.now();
        let diff = isCountdown ? duration - Math.floor((currentTime - start) / 1000) : Math.floor((currentTime - start) / 1000);

        let hours = Math.floor(diff / 3600);
        let minutes = Math.floor((diff % 3600) / 60);
        let seconds = diff % 60;

        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');

        display.textContent = hours + ':' + minutes + ':' + seconds;

        if (diff <= 0) {
            clearInterval(timerInterval);
            saveStartTime({ start: Date.now(), isCountdown });
        }
    }

    function saveStartTime(data) {
        localStorage.setItem('timerData', JSON.stringify(data));
    }

    function resetTimer() {
        clearInterval(timerInterval);
        start = Date.now();
        saveStartTime({ start, isCountdown });
        updateDisplay();
        timerInterval = setInterval(updateDisplay, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function setCountdownMode(countdown) {
        isCountdown = countdown;
        saveStartTime({ start, isCountdown });
    }

    updateDisplay();
    timerInterval = setInterval(updateDisplay, 1000);

    window.addEventListener('beforeunload', function () {
        saveStartTime({ start, isCountdown });
    });

    return {
        reset: resetTimer,
        stop: stopTimer,
        setCountdown: setCountdownMode
    };
}

window.onload = function () {
    const fiveMinutes = 5 * 1; // Переводим минуты в секунды
    const display = document.querySelector('#time');
    const timer = startTimer(fiveMinutes, display);

    // Пример использования функций:
    // timer.reset(); // Обнуление времени
    // timer.stop(); // Остановка таймера
    // timer.setCountdown(false); // Установка режима секундомера
};
