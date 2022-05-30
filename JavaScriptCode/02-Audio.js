class Audio {
    constructor() {
        if (this instanceof Audio) {
            throw("This is static class!");
        };
    };

    static levelTheme;
    static jumpSound;
    static deathSound;
};

function startLevelAudio() {
    if (Audio.levelTheme.paused == true) {
        Audio.levelTheme.play();
    };
};

function stopLevelAudio() {
    Audio.levelTheme.pause();
    Audio.levelTheme.currentTime = 0;
};

//Audio Instances
Audio.levelTheme = document.getElementById("levelTheme");
Audio.jumpSound = document.getElementById("jump");
Audio.deathSound = document.getElementById("death");
Audio.levelTheme.volume = 0.4;