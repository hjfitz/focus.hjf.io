import Pomo from "./pomo.js";
import MusicPlayer from "./youtubePlayer.js";

function main() {
    const musicInput = document.getElementById("yt-in");
    const pauseButton = document.getElementById("pause-video");
    const playButton = document.getElementById("play-video");
    const musicList = document.querySelectorAll("[data-video-id]");

	const musicPlayer = new MusicPlayer({
		musicInput,
		pauseButton,
		playButton,
		musicList,
	})

	new Pomo(musicPlayer)
}

document.addEventListener("DOMContentLoaded", main);
