document.addEventListener("DOMContentLoaded", main);

class FocusController {
  constructor() {
    this.musicPlayer = new MusicPlayer();
    this.pomo = new Pomo(this.musicPlayer);
  }
}

class MusicPlayer {
  constructor() {
    this.setPlayingVideo = this.setPlayingVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.ytPlayer = null;
    this.addEventListeners();
  }

  addEventListeners() {
    const musicIn = document.getElementById("yt-in");
    const pauseButton = document.getElementById("pause-video");
    const playButton = document.getElementById("play-video");
    const allMusicLinks = document.querySelectorAll("[data-video-id]");
    musicIn.addEventListener("keyup", this.setPlayingVideo);
    pauseButton.addEventListener("click", this.pauseVideo);
    playButton.addEventListener("click", this.playVideo);
    allMusicLinks.forEach((soundtrack) => {
      const trackId = soundtrack.dataset.videoId;
      soundtrack.addEventListener("click", () => this.startVideo(trackId));
    });
  }

  playVideo() {
    if (!this.ytPlayer) return;
    this.ytPlayer.playVideo();
  }

  pauseVideo() {
    if (this.ytPlayer === null) return;
    this.ytPlayer.pauseVideo();
  }

  setPlayingVideo(ev) {
    ev.preventDefault();
    if (ev.key !== "Enter") return;
    const vid = ev.target.value;
    try {
      const url = new URL(vid);
      const vidId = url.searchParams.get("v");
      if (!vidId) {
        console.log("not found");
        return;
      }
      this.startVideo(vidId);
    } catch (err) {
      console.error(err);
      console.log("fucky wucky");
    } finally {
      ev.target.value = "";
      ev.target.blur();
    }
  }

  startVideo(videoId) {
    this.ytPlayer = new YT.Player("yt-repeat", {
      videoId,
      playerVars: {
        autoplay: 1,
        playsinline: 1,
        loop: 1,
      },
      events: {
        onStateChange: (e) => {
          if (e.data !== 0) return;
          e.target.playVideo();
        },
      },
    });
  }
}

class Pomo {
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
    this.musicPlayer?.ytPlayer?.pauseVideo();
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance("Pomo timer is up");
      speechSynthesis.speak(utterance);
    }, 100);
  }
}

function main() {
  const app = new FocusController();
  window.app = app;
}
