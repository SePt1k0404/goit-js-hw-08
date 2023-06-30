import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(videoTimeUpdate, 1000));

player
  .setCurrentTime(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)))
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        player.setCurrentTime(0);
        break;
      default:
    }
  });

function videoTimeUpdate(data) {
  console.log(data.seconds);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data.seconds));
}
