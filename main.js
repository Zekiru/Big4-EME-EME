const overlay = document.getElementById("overlay");
const vid = document.getElementById("mainVideo");
const source = document.getElementById("source");

const playbtn = document.getElementById("play");
const navigation = document.getElementById("navigation");
const forwardbtn = document.getElementById("forward");
const backbtn = document.getElementById("back");

const decisionoverlay = document.getElementById("decision-overlay");
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");

const clipMain = [
    "TestFolder/maxverstappen.mp4",
    "TestFolder/maxverstappen.mp4",
    "TestFolder/maxverstappen.mp4",
    "TestFolder/maxverstappen.mp4",
    "TestFolder/maxverstappen.mp4"
];

const clipEnd = [
    "TestFolder/2023-11-06_21-39-13.mp4",
    "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4",
    "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4",
    "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4",
    "TestFolder/maxverstappen.mp4", "TestFolder/maxverstappen.mp4"
];

const title = ["Prologue", "Ryan", "Ali", "Ana", "Siso", "Ending", "True Ending"];

const options = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"]
];


let playback = false;
let navHover = false;
let decoverHover = false;

let decisionprompt = false;

let progress = 0;
let decision = 0;

let decisionarray = [0, 0, 0, 0];


function toggleDecision(status) {
    if (progress <= 0) return;

    if (status) {
        pauseVid();
        playbtn.setAttribute("hidden", "");
        // forwardbtn.setAttribute("disabled", "");
        choice1.removeAttribute("hidden");
        choice2.removeAttribute("hidden");
        decisionprompt = false;

        choice1.innerHTML = options[progress-1][0];
        choice2.innerHTML = options[progress-1][1];
    } else {
        // forwardbtn.removeAttribute("disabled");
        choice1.setAttribute("hidden", "");
        choice2.setAttribute("hidden", "");
    }
}

function decisionInit(prime) {
    switch(progress) {
        case 1:
            decision = 1;
            break;
        case 2:
            decision = 3;
            break;
        case 3:
            decision = 5;
            break;
        case 4:
            decision = 7;
            break;
        default:
            break;
    };

    if (!prime) {
        decision += 1;
    };

    decisionarray[progress - 1] = decision;
}

choice1.addEventListener("click", () => {
    decisionInit(true);
    toggleDecision(false);
    nextVid();
});

choice2.addEventListener("click", () => {
    decisionInit(false);
    toggleDecision(false);
    nextVid();
});

function playVid() {
    vid.play();
    playbtn.setAttribute("hidden", "");
}

function pauseVid() {
    vid.pause();
    playbtn.removeAttribute("hidden");
}

function nextVid() {
    if (decisionprompt) {
        toggleDecision(true);
        return;
    } else {
        // console.log(decisionarray);
        progress += 1;
        toggleDecision(false);
    };

    if (progress >= 5) {
        if (decision == 0) {
            console.log("Ending: 1/9");
            progress += 1;
        } else {
            console.log("Ending: " + (decision + 1) + "/9");
        };
        vidLoader(clipEnd[decision]);
        toggleDecision(false);
        navigation.setAttribute("hidden", "");
        return;
    };
    decisionprompt = true;
    vidLoader(clipMain[progress]);
    backbtn.removeAttribute("disabled");
}

function previousVid() {
    if (progress <= 1 && decisionprompt) backbtn.setAttribute("disabled", "");
    if (progress <= 0) return;
    if (decisionprompt) {
        progress -= 1;
        source.setAttribute("src", clipMain[progress]);
        vid.load();
        if (progress  == 0) vid.play();
        progression();
        toggleDecision(true);
        decisionprompt = false;
        if (progress != 1) decision = decisionarray[progress - 2]
        else decision = 0;
        return;
    } else {
        // console.log(decisionarray);
        toggleDecision(false);
        decisionprompt = true;
    };
    vidLoader(clipMain[progress]);
}

function progression() {
    document.getElementById("title").innerHTML = title[progress];
}

function vidLoader(video) {
    source.setAttribute("src", video);
    vid.load();
    playVid();
    progression();
}


vid.addEventListener("ended", () => {
    if (progress >= 5) return;
    nextVid();
});


overlay.addEventListener("click", () => {
    if (!vid.paused) playback = true;
    if (progress >= 5 && vid.ended || !playback || navHover || decoverHover) return;

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

decisionoverlay.addEventListener("mouseenter", () => {
    decoverHover = true;
});

decisionoverlay.addEventListener("mouseleave", () => {
    decoverHover = false;
});


backbtn.addEventListener("click", () => {
    previousVid();
});

forwardbtn.addEventListener("click", () => {
    nextVid();
});

document.addEventListener('DOMContentLoaded', () => {
    progression();
});