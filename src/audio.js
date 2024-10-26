
//declare the audio
const audioX = new Audio( 'src/assets/img/background-sound.mp3' );
var triggerPlayButton = false;
var audioNotPermissible = false;
var userMediaCalled = false;

function LoadAudio (scene)
{     navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {  audio: true },
        function onSuccess(stream) {
            // go play
            triggerPlayButton = true;
            audioNotPermissible = true;
            userMediaCalled = true;
        },
        function onError(error) {
           triggerPlayButton = true;
          audioNotPermissible = false;
          userMediaCalled = true;
        }
      )
    } else {
      
    }
}