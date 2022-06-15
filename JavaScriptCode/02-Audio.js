/**
 * Static Audio class that hold every variable needed for Audio sounds 
 */

class Audio {
    constructor() {
        if (this instanceof Audio) {
            throw ("This is static class!");
        };
    };

    static levelTheme = document.getElementById("levelTheme");
    static jumpSound = document.getElementById("jump");
    static deathSound = document.getElementById("death");
    static bossTheme = document.getElementById("bossTheme");
};

/**
 * Used to start level audio
 */
function startLevelAudio() {
    if (StaticObject.Selected != "level4") {
        if (Audio.levelTheme.paused == true) {
            Audio.levelTheme.play();
        }
    } else {
        if (Audio.bossTheme.paused == true) {
            Audio.bossTheme.play();
        }
    }
};

/**
 * Used to stop level audio
 */
function stopLevelAudio() {
    if (StaticObject.Selected != "level4") {
        Audio.levelTheme.pause();
        Audio.levelTheme.currentTime = 0;
    } else {
        Audio.bossTheme.pause();
        Audio.bossTheme.currentTime = 0;
    }
};

//Customize audio level
Audio.levelTheme.volume = 0.2;
Audio.bossTheme.volume = 0.2;
Audio.jumpSound.volume = 0.5;
Audio.deathSound.volume = 0.5;