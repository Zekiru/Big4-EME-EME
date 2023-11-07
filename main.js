const overlay = document.getElementById("overlay");
const vid = document.getElementById("mainVideo");
const source = document.getElementById("source");

const playbtn = document.getElementById("play");

const clipMain = ["TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4"];

const clipEnd = ["TestFolder/2023-11-06_21-39-13.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4"];

const title = ["Prologue", "Ryan", "Ali", "Ana", "Siso", "Ending", "True Ending"];

let progress = 0;
let chosen = 0;

function playVid() {
    vid.play();
    playbtn.setAttribute("hidden", "");
}

function pauseVid() {
    vid.pause();
    playbtn.removeAttribute("hidden");
}

function nextVid() {
    if (progress >= 5) {
        if (chosen == 0) {
            console.log("good ending");
            progress += 1;
        } else {
            console.log("bad ending");
        };
        vidLoader(clipEnd[chosen]);
        progress += 1;
        return;
    };

    vidLoader(clipMain[progress]);
    progress += 1;
}

function previousVid() {
    if (progress <= 0) return;
    progress -= 1;
    vidLoader(clipMain[progress]);
}

function progression() {
    document.getElementById("title").innerHTML = title[progress];
}


overlay.addEventListener("click", () => {
    if (progress > 5 && vid.ended) return;

    if (!source.hasAttribute("src")) {
        nextVid();
        return;
    };

    if (vid.paused) {
        playVid();
    } else {
        pauseVid();
    };
});


vid.addEventListener("ended", () => {
    if (progress > 5) return;
    nextVid();
});

function vidLoader(video) {
    source.setAttribute("src", video);
    vid.load();
    playVid();
    progression();
}

document.addEventListener('DOMContentLoaded', () => {
    progression();
});