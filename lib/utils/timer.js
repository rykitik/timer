export default class Timer {
    constructor(duration, display) {
        this.duration = duration;
        this.display = display;
        this.start = Date.now();
        this.timerInterval = null;
        this.isCountdown = true;
    }

    updateDisplay() {
        const currentTime = Date.now();
        let diff = this.isCountdown ? this.duration - Math.floor((currentTime - this.start) / 1000) : Math.floor((currentTime - this.start) / 1000);

        let hours = Math.floor(diff / 3600);
        let minutes = Math.floor((diff % 3600) / 60);
        let seconds = diff % 60;

        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');

        this.display.textContent = `${hours}:${minutes}:${seconds}`;

        if (this.isCountdown && diff <= 0) {
            clearInterval(this.timerInterval);
            this.saveStartTime({ start: Date.now(), isCountdown: this.isCountdown });
        }
    }

    saveStartTime(data) {
        localStorage.setItem('timerData', JSON.stringify(data));
    }

    startTimer() {
        if (!this.timerInterval) {
            this.updateDisplay();
            this.timerInterval = setInterval(() => this.updateDisplay(), 1000);

            window.addEventListener('beforeunload', () => {
                this.saveStartTime({ start: this.start, isCountdown: this.isCountdown });
            });
        }
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.start = Date.now();
        this.saveStartTime({ start: this.start, isCountdown: this.isCountdown });
        this.updateDisplay();
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    setCountdownMode(countdown) {
        this.isCountdown = countdown;
        this.saveStartTime({ start: this.start, isCountdown: this.isCountdown });
    }
}