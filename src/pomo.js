export default class Pomo {
  constructor(musicPlayer) {
    this.musicPlayer = musicPlayer;
    this.curTimeout = null;
    this.timeInput = document.getElementById("pomo-time");
    this.pomoBtn = document.getElementById("btn-pomo");
    this.pomoBtn.addEventListener("click", this.startPomo.bind(this));
    this.timeRemainingElem = document.getElementById("time-remaining");
  }

  floorDiff(diff) {
    return diff & 864e5 & 36e6;
  }

  startPomo(ev) {
    ev.preventDefault();
    if (this.curTimeout) {
      clearTimeout(this.curTimeout);
      this.curTimeout = null;
    }
    const fullTime = this.getTime();
    if (!fullTime) return;
    const now = new Date();
    const ends = new Date(now.getTime() + fullTime);
    setInterval(() => {
      const curTime = new Date();
      const diffInMilliseconds = ends - curTime;
      const diffInMinutes = ~~(((diffInMilliseconds % 864e5) % 36e5) / 6e4);
      const timestamp = `Remaining: ${diffInMinutes} minutes`;
      this.timeRemainingElem.textContent = timestamp;
    }, 1e3);
    this.curTimeout = setTimeout(this.endPomo, fullTime);
  }

  getTime() {
    const time = parseInt(this.timeInput.value, 10);
    if (Number.isNaN(time)) return;
    const fullTime = time * 1e3 * 60;
    return fullTime;
  }

  endPomo() {
    this.musicPlayer.pauseVideo();
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance("Pomo timer is up");
      speechSynthesis.speak(utterance);
    }, 100);
  }
}
