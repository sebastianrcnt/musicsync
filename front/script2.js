const socket = new WebSocket("ws://localhost:3000/");

socket.onopen = (event) => {
  console.log("open");
};



var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api?orogin=http://localhost:3001";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: "gdZLi9oWNZg",
    events: {
      onReady: onPlayerReady,
    },
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
  console.log("start!!");
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

// player state 1: play 2: stop 3:


function stopVideo() {
  player.stopVideo();
}

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data)
    player.seekTo(data.time)

    switch (data.type) {
        case 'play':
            player.playVideo()
            break;
        case 'pause':
            player.pauseVideo()
            break;
        case 'stop':
            player.stopVideo()
    }
};
