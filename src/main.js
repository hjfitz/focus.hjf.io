document.addEventListener("DOMContentLoaded", main);

function main() {
  const inp = document.getElementById("yt-in");
  inp.addEventListener("keyup", setPlayingVideo);
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
    const player = new YT.Player("yt-in", {
      videoId: vidId,
      height: "390",
      width: "640",
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: (e) => e.target.playVideo(),
        onStateChange: (e) => {
          console.log(e);
          if (e.data === 0) {
            e.target.playVideo();
          }
        },
      },
    });
    console.log(player);
  } catch {
    console.log("fucky wucky");
  }
}
