export default class MusicPlayer {
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
    if (this.ytPlayer) {
      this.ytPlayer.loadVideoById(videoId);
      return;
    }
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
