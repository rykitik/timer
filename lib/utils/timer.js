export default class Timer {
    constructor(duration, display) {
        this.duration = duration;
        this.display = display;
        this.startTime = null;
        this.timerInterval = null;
        this.remainingTime = this.duration;
        this.isCountdown = true;
        this.isRunning = false;
        this.pausedTime = 0;
    }

    updateDisplay() {
        const currentTime = Date.now();
        let elapsed = 0;

        if (this.isRunning) {
            elapsed = currentTime - this.startTime + this.pausedTime;
        }

        let diff = this.isCountdown ? this.remainingTime - Math.floor(elapsed / 1000) : Math.floor(elapsed / 1000);

        if (diff < 0 && this.isCountdown) {
            diff = 0;
        }

        let hours = Math.floor(diff / 3600);
        let minutes = Math.floor((diff % 3600) / 60);
        let seconds = diff % 60;

        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');

        this.display.textContent = `${hours}:${minutes}:${seconds}`;

        if (this.isRunning && diff <= 0) {
            this.stopTimer();
            this.saveStartTime({ start: Date.now(), isCountdown: this.isCountdown });
        }
    }

    saveStartTime(data) {
        localStorage.setItem('timerData', JSON.stringify(data));
    }

    startTimer() {
        if (!this.isRunning) {
            if (!this.startTime) {
                this.startTime = Date.now();
            } else {
                this.startTime = Date.now() - this.pausedTime;
                this.pausedTime = 0;
            }

            this.isRunning = true;

            this.updateDisplay();
            this.timerInterval = setInterval(() => {
                this.updateDisplay();
            }, 1000);

            window.addEventListener('beforeunload', () => {
                this.saveStartTime({ start: this.startTime, isCountdown: this.isCountdown });
            });
        }
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.isRunning = false;
            this.pausedTime += Date.now() - this.startTime;
            this.saveStartTime({ start: this.startTime, isCountdown: this.isCountdown });
        }
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.startTime = null;
        this.isRunning = false;
        this.pausedTime = 0;
        this.remainingTime = this.duration;
        this.updateDisplay();
        this.saveStartTime({ start: this.startTime, isCountdown: this.isCountdown });
    }

    setCountdownMode(countdown) {
        this.isCountdown = countdown;
        this.saveStartTime({ start: this.startTime, isCountdown: this.isCountdown });
    }
}
