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

    //Selected level
    static Selected;

    //Buttons of the menu
    static StopwatchButton = document.getElementById("btnStopwatch");
    static SetupGame = document.getElementById("btnSetupGame");
    static StartGame = document.getElementById("btnStart");
    static StopGame = document.getElementById("btnStop");
    static MapsButton = document.getElementById("btnMaps");
    static canvasGame = document.getElementById("game");

    //Objects
    static Meatboy;
    static SpinningSaw = [];
    static Goal;
    static Wall = [];
}