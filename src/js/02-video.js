import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
//console
const iframe = document.querySelector('iframe');
const STORAGE_KEY = 'videoplayer-current-time';

const player = new Player(iframe);

setTimeToPlay();

player.on('timeupdate', throttle(onPlayerTimeUpdate, 1000));

function setTimeToPlay() {
  player.setCurrentTime(localStorage.getItem(STORAGE_KEY) || 0);
}

function onPlayerTimeUpdate() {
  player.getCurrentTime().then(setTimeOnUpdate);
}

function setTimeOnUpdate(seconds) {
  localStorage.setItem(STORAGE_KEY, seconds);
}
