import Timer from './lib/utils/timer.js';

document.addEventListener('DOMContentLoaded', () => {
    const fiveMinutes = 5 * 60; // 5 минут в секундах
    const display = document.querySelector('#time');
    const startBtn = document.querySelector('#startTimerBtn');
    const stopBtn = document.querySelector('#stopTimerBtn');
    const resetBtn = document.querySelector('#resetTimerBtn');

    const timer = new Timer(fiveMinutes, display);
    timer.setCountdownMode(true)

    startBtn.addEventListener('click', () => {
        timer.startTimer();
    });

    stopBtn.addEventListener('click', () => {
        // Получение прошедшего времени
        // const endTime = timer.getElapsedTime();
        // const { hours, minutes, seconds } = timer.formatTimeToVariables(Math.abs(endTime)); 
        timer.stopTimer();
        // timer.getDisplayedTime() - получение отоброжаемого времени в виде строки
    });

    resetBtn.addEventListener('click', () => {
        timer.resetTimer();
    });
});