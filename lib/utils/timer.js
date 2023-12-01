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

        const storedData = localStorage.getItem('timerData');
        if (storedData) {
            const data = JSON.parse(storedData);
            if (data.start !== null && !isNaN(data.start)) {
                this.startTime = data.start;
                this.isCountdown = data.isCountdown;
                const elapsed = Date.now() - this.startTime;
                this.remainingTime = this.isCountdown ? this.duration - Math.floor(elapsed / 1000) : Math.floor(elapsed / 1000);
                if (this.remainingTime <= 0) {
                    this.remainingTime = this.duration;
                    this.startTime = null;
                    this.isRunning = false;
                } else {
                    this.startTimer();
                }
            }
        } else {
            this.saveStartTime({ start: null, isCountdown: this.isCountdown });
        }
    }

    formatTimeToVariables(time) {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;

        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');

        return { hours, minutes, seconds };
    }

    updateDisplay() {
        const currentTime = Date.now();
        const elapsed = currentTime - this.startTime;
        let diff = this.isCountdown ? this.remainingTime - Math.floor(elapsed / 1000) : Math.floor(elapsed / 1000);

        const { hours, minutes, seconds } = this.formatTimeToVariables(Math.abs(diff));

        const displayTime = `${hours}:${minutes}:${seconds}`;
        this.display.textContent = displayTime;

        if (this.isCountdown && diff <= 0) {
            clearInterval(this.timerInterval);
            this.saveStartTime({ start: null, isCountdown: this.isCountdown });
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
                const currentTime = Date.now();
                const elapsedTime = currentTime - this.startTime;
                this.startTime = currentTime - elapsedTime;
                this.pausedTime = 0;
                if (this.isCountdown) {
                    this.remainingTime = this.duration - Math.floor(elapsedTime / 1000);
                } else {
                    this.remainingTime = Math.floor(elapsedTime / 1000);
                }
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
    
        const { hours, minutes, seconds } = this.formatTimeToVariables(this.remainingTime);
        const displayTime = `${hours}:${minutes}:${seconds}`;
        this.display.textContent = displayTime;
    
        this.saveStartTime({ start: null, isCountdown: this.isCountdown });
    }

    setCountdownMode(countdown) {
        this.isCountdown = countdown;
        this.saveStartTime({ start: this.startTime, isCountdown: this.isCountdown });
    }

    getElapsedTime() {
        if (this.isRunning) {
            const currentTimeStamp = Date.now();
            const elapsed = currentTimeStamp - this.startTime + this.pausedTime;
            return Math.floor(elapsed / 1000);
        } else {
            return this.isCountdown ? this.remainingTime : this.duration - this.remainingTime;
        }
    }

    getDisplayedTime() {
        if (this.isRunning) {
            const currentTimeStamp = Date.now();
            const elapsed = currentTimeStamp - this.startTime + this.pausedTime;
            let displayedTime = this.isCountdown ?
                this.remainingTime - Math.floor(elapsed / 1000) :
                Math.floor(elapsed / 1000);

            const { hours, minutes, seconds } = this.formatTimeToVariables(Math.abs(displayedTime));

            return `${hours}:${minutes}:${seconds}`;
        } else {
            return this.display.textContent;
        }
    }
}
