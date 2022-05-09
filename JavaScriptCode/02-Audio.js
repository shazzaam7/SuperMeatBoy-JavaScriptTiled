class Audio {
    constructor() {
        if (this instanceof Audio) {
            throw("This is static class!");
        };
    };

    static levelTheme;
    static jumpSound;
}

function startLevelAudio() {
    Audio.levelTheme.play();
}

function stopLevelAudio() {
    Audio.levelTheme.pause();
    Audio.levelTheme.currentTime = 0;
}

//Audio Instances
Audio.levelTheme = document.getElementById("levelTheme");
Audio.jumpSound = document.getElementById("jump");

//eventListener
btnStart.addEventListener("click", startLevelAudio);
btnStop.addEventListener("click", stopLevelAudio);