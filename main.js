let overlay = document.getElementById("overlay");
let vid = document.getElementById("mainVideo");
let source = document.getElementById("source");

let playbtn = document.getElementById("play");

let progress = 0;
let chosen = 0;

let clipMain = ["TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4"];

let clipEnd = ["TestFolder/2023-11-06_21-39-13.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4"];

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
    document.getElementById("counter").innerHTML = progress;
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