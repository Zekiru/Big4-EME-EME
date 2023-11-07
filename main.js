let vid = document.getElementById("mainVideo");
let playbtn = document.getElementById("play");

function playVid() {
    vid.play();
    playbtn.setAttribute("hidden", "");
}

function pauseVid() {
    vid.pause();
}

document.addEventListener('DOMContentLoaded', () => {
    // playVid();
});