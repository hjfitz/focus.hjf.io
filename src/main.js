document.addEventListener("DOMContentLoaded", main);

function main() {
  const musicIn = document.getElementById("yt-in");
  const pomoStart = document.getElementById("btn-pomo");
  musicIn.addEventListener("keyup", setPlayingVideo);
  pomoStart.addEventListener("click", startPomo);
}

let curTimeout;
function startPomo(ev) {
  const timeInput = document.getElementById("pomo-time");
  ev.preventDefault();
  const time = parseInt(timeInput.value, 10);
  console.log(time, timeInput);
  if (Number.isNaN(time)) {
    return;
  }
  console.log("starting pomo");
  if (curTimeout) {
    clearTimeout(curTimeout);
    curTimeout = null;
  }
  const fullTime = time * 1e3 * 60;
  console.log("full time: ", { fullTime });
  curTimeout = setTimeout(() => {
    console.log("timer up");
    const utterance = new SpeechSynthesisUtterance("Pomo timer is up");
    speechSynthesis.speak(utterance);
  }, fullTime);
}

function startVideo(videoId) {
  const player = new YT.Player("yt-in", {
    videoId,
    height: "390",
    width: "640",
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: (e) => {
        e.target.playVideo(),
          setTimeout(() => {
            document
              .querySelectorAll("iframe")
              .forEach((frame) => (frame.style.display = "none"));
          }, 550);
      },
      onStateChange: (e) => {
        console.log(e);
        if (e.data === 0) {
          e.target.playVideo();
        }
      },
    },
  });
  console.log(player);
}

function setPlayingVideo(ev) {
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
    startVideo(vidId);
  } catch {
    console.log("fucky wucky");
  }
}
