export default class MusicPlayer {
  constructor(elements, state) {
	  this.state = state
	this.elements = elements
    this.setPlayingVideo = this.setPlayingVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.ytPlayer = null;
    this.addEventListeners();
  }

  addEventListeners() {
    this.elements.musicInput.addEventListener("keyup", this.setPlayingVideo);
    this.elements.pauseButton.addEventListener("click", this.pauseVideo);
    this.elements.playButton.addEventListener("click", this.playVideo);
    this.elements.musicList.forEach((soundtrack) => {
      const trackId = soundtrack.dataset.videoId;
      soundtrack.addEventListener("click", () => this.startVideo(trackId, soundtrack.textContent));
    });
  }

  playVideo() {
    if (!this.ytPlayer) return;
	this.state.setPlaying(true)
    this.ytPlayer.playVideo();
  }

  pauseVideo() {
    if (this.ytPlayer === null) return;
	  this.state.setPlaying(false)
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

  startVideo(videoId, videoTitle) {
	  this.state.setTrack(videoTitle)
	  this.state.setPlaying(true)
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
