const overlay = document.getElementById("overlay");
const vid = document.getElementById("mainVideo");
const source = document.getElementById("source");

const playbtn = document.getElementById("play");
const navigation = document.getElementById("navigation");
const forwardbtn = document.getElementById("forward");
const backbtn = document.getElementById("back");

const clipMain = ["TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4"];

const clipEnd = ["TestFolder/2023-11-06_21-39-13.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4"];

const title = ["Prologue", "Ryan", "Ali", "Ana", "Siso", "Ending", "True Ending"];

let playback = false;
let navHover = false;
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
    if (progress >= 4) {
        console.log("hello");
        if (chosen == 0) {
            console.log("good ending");
            progress += 2;
        } else {
            console.log("bad ending");
        };
        vidLoader(clipEnd[chosen]);
        navigation.setAttribute("hidden", "");
        return;
    };
    progress += 1;
    vidLoader(clipMain[progress]);
}

function previousVid() {
    if (progress <= 0) return;
    progress -= 1;
    vidLoader(clipMain[progress]);
}

function progression() {
    document.getElementById("title").innerHTML = title[progress];
}


forwardbtn.addEventListener("mouseenter", () => {
    navHover = true;
});

forwardbtn.addEventListener("mouseleave", () => {
    navHover = false;
});

backbtn.addEventListener("mouseenter", () => {
    navHover = true;
});

backbtn.addEventListener("mouseleave", () => {
    navHover = false;
});

playbtn.addEventListener("mouseenter", () => {
    playback = true;
});

playbtn.addEventListener("mouseleave", () => {
    playback = false;
});


backbtn.addEventListener("click", () => {
    previousVid();
    if(progress <= 0) backbtn.setAttribute("disabled", "");
});

forwardbtn.addEventListener("click", () => {
    nextVid();
    backbtn.removeAttribute("disabled");
});

overlay.addEventListener("click", () => {
    if (!vid.paused) playback = true;
    if (progress > 5 && vid.ended || !playback || navHover) return;

    if (!source.hasAttribute("src")) {
        vidLoader(clipMain[progress]);
        return;
    };

    if (vid.paused) {
        playVid();
    } else {
        pauseVid();
    };
    playback = false;
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