const socket = new WebSocket("ws://localhost:3000/");

socket.onopen = (event) => {
  console.log("open");
};

socket.onmessage = (event) => {
  // targetInput.value = event.data;
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
      onStateChange: onPlayerStateChange,
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

function onPlayerStateChange(event) {
  console.log("player state changed to ", event.data);
  const playerState = event.data;

  if (playerState === 1) {
    socket.send(JSON.stringify({
      type: "play",
      time: player.getCurrentTime()
    }))
  } else if (playerState == 2) {
    socket.send(JSON.stringify({
      type: "pause",
      time: player.getCurrentTime()
    }))
  } else if (playerState == 0) {
    socket.send(JSON.stringify({
      type: "stop",
      time: player.getCurrentTime()
    }))
  }
}

function stopVideo() {
  player.stopVideo();
}

/*

받았을 경우에는 seekTo
재생 시 -> getCurrentTime() 해서 일시정지 보내주기
일시정지 시 -> getCurrentTime() 해서 일시정지 보내주기

비디오가 플레이되었을때에는 

player state will change
{
  playerState: 1,
  
}
*/
