export default class Pomo {
  constructor(musicPlayer) {
    this.isRunning = false;
    this.musicPlayer = musicPlayer;
    this.curTimeout = null;
    this.timeInput = document.getElementById("pomo-time");
    this.pomoBtn = document.getElementById("btn-pomo");
    this.pomoEndBtn = document.getElementById("btn-pomo-end");
    this.pomoEndBtn.addEventListener("click", this.clearPomo.bind(this));
    this.pomoBtn.addEventListener("click", this.startPomo.bind(this));
    this.timeRemainingElem = document.getElementById("time-remaining");
  }

  clearPomo(ev) {
    ev?.preventDefault();
    clearTimeout(this.curTimeout);
    clearInterval(this.updateInterval);
    this.updateInterval = null;
    this.curTimeout = null;
    this.musicPlayer.pauseVideo();
    this.timeRemainingElem.textContent = "Pomo timer stopped";
    this.isRunning = false;
  }

  startPomo(ev) {
    ev.preventDefault();
    if (this.isRunning) {
      this.clearPomo();
    }
    const fullTime = this.getTime();
    if (!fullTime) return;
    const now = new Date();
    const ends = new Date(now.getTime() + fullTime);
    this.updateInterval = setInterval(() => {
      const curTime = new Date();
      const diffInMilliseconds = ends - curTime;
      const diffInMinutes = ~~(((diffInMilliseconds % 864e5) % 36e5) / 6e4);
      const timestamp = `Remaining: ${diffInMinutes} minutes`;
      this.timeRemainingElem.textContent = timestamp;
    }, 1e3);
    this.curTimeout = setTimeout(this.endPomo.bind(this), fullTime);
    this.isRunning = true;
  }

  getTime() {
    const time = parseInt(this.timeInput.value, 10);
    if (Number.isNaN(time)) return;
    const fullTime = time * 1e3 * 60;
    return fullTime;
  }

  endPomo() {
    this.clearPomo();
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance("Pomo timer is up");
      speechSynthesis.speak(utterance);
    }, 100);
  }
}
