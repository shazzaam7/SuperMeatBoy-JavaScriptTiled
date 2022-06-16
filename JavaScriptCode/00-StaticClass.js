
/**
 * Static class used globally to add sprites into the game without new variables everytime it's needed
 */
class StaticObject {
    constructor() {
        if (this instanceof StaticObject) {
            throw("This is static class!");
        };
    };

    static StopwatchButton = document.getElementById("btnStopwatch");
    static SetupGame = document.getElementById("btnSetupGame");
    static Meatboy;
    static SpinningSaw = [];
    static Goal;
    static Wall = [];
    static Selected;
}