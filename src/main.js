import Pomo from "./pomo.js";
import YoutubePlayer from "./youtubePlayer.js";

class FocusController {
  constructor() {
    // eventually we can check for a spotify login and use that instead
    this.musicPlayer = new YoutubePlayer();
    this.pomo = new Pomo(this.musicPlayer);
  }
}

function main() {
  const app = new FocusController();
  window.app = app;
}

document.addEventListener("DOMContentLoaded", main);
