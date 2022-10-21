document.querySelector('.player__play-btn').onclick = play;
document.querySelector('.player__speed-btn').onclick = speed;
document.querySelector('.player__volume-input').oninput = volume;
document.querySelector('.player__fullscreen-btn').onclick = fullscreen;
document.querySelector('.player__plustime-btn').onclick = plustime;
document.querySelector('.player__minustime-btn').onclick = minustime;

let video = document.querySelector('.player__video');
let display;
let progress = document.querySelector('.player__progress-bar');
let status = false;

video.ontimeupdate = progressUpdate;
progress.onmousedown = videoRewindDown;
progress.onmouseup = videoRewindUp;
progress.onclick = videoRewind;

const delay = 250;
let lastKeypressTime = 0;

video.onclick = () => {
  play()
  let thisKeypressTime = new Date();
  if (thisKeypressTime - lastKeypressTime <= delay) {
    fullscreen()
  }
  lastKeypressTime = new Date()
}

function play() {
  if (status) {
    video.pause();
    status = false
  } else {
    video.play();
    status = true
  }
}

function speed() {
  video.playbackRate = 2;
}

function volume() {
  let v = this.value;
  video.volume = v / 100;
  document.querySelector('.player__volume-procent').innerHTML = `${this.value}%`
}

function progressUpdate() {
  video.currentTime
  let fullTime = Math.round(video.duration);
  let realTime = Math.round(video.currentTime);
  progress.value = (100 * realTime) / fullTime

  // realTime update
  let secTimeReal = realTime % 60;
  let minTimeReal = Math.floor(realTime / 60);
  let hourTimeReal = Math.floor(realTime / 600);
  if (secTimeReal < 10) {
    document.querySelector('.player__progress-current-sec').innerHTML = `0${secTimeReal}`
  } else if (secTimeReal >= 10) {
    document.querySelector('.player__progress-current-sec').innerHTML = `${secTimeReal}`
  }
  if (minTimeReal < 10) {
    document.querySelector('.player__progress-current-min').innerHTML = `0${minTimeReal}`
  } else if (minTimeReal >= 10) {
    document.querySelector('.player__progress-current-min').innerHTML = `${minTimeReal}`
  }
  // fullTime update
  let secTimeFull = fullTime % 60;
  let minTimeFull = Math.floor(fullTime / 60);
  let hourTimeFull = Math.floor(fullTime / 600);
  if (secTimeFull < 10) {
    document.querySelector('.player__progress-duration-sec').innerHTML = `0${secTimeFull}`
  } else if (secTimeFull >= 10) {
    document.querySelector('.player__progress-duration-sec').innerHTML = `${secTimeFull}`
  }
  if (minTimeFull < 10) {
    document.querySelector('.player__progress-duration-min').innerHTML = `0${minTimeFull}`
  } else if (minTimeFull >= 10) {
    document.querySelector('.player__progress-duration-min').innerHTML = `${minTimeFull}`
  }
}

function videoRewindDown() {
  video.pause()
  status = false
}

function videoRewind() {
  video.surrentTime
  let width = this.offsetWidth;
  let offset = event.offsetX;
  this.value = (100 * offset) / width;
  video.currentTime = video.duration * (offset / width);
}

function videoRewindUp() {
  play()
}

function fullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

function plustime() {
  video.currentTime += 10
}

function minustime() {
  video.currentTime -= 10
}

