document.addEventListener("DOMContentLoaded", main);

function main() {
  const inp = document.getElementById("yt-in");
  inp.addEventListener("keyup", setPlayingVideo);
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
