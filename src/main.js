import Pomo from "./pomo.class.js";
import MusicPlayer from "./musicPlayer.class.js";

class FocusController {
  constructor() {
    this.musicPlayer = new MusicPlayer();
    this.pomo = new Pomo(this.musicPlayer);
  }
}

function main() {
  const app = new FocusController();
  window.app = app;
}

document.addEventListener("DOMContentLoaded", main);
