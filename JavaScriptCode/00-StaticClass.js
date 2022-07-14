/**
 * Static class used globally to add sprites into the game without new variables everytime it's needed
 * Also holds all of the buttons
 */
class StaticObject {
    constructor() {
        if (this instanceof StaticObject) {
            throw("This is static class!");
        };
    };

    static Selected;

    //Buttons
    static StopwatchButton = document.getElementById("btnStopwatch");
    static SetupGame = document.getElementById("btnSetupGame");
    static StartGame = document.getElementById("btnStart");
    static StopGame = document.getElementById("btnStop");

    //Objects
    static Meatboy;
    static SpinningSaw = [];
    static Goal;
    static Wall = [];
}