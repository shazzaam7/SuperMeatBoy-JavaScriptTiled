/**
 * Static class for stopwatch
 */
class Stopwatch {
    constructor() {
        if (this instanceof Stopwatch) {
            throw ("This is static class");
        }
    }
    static ms = 00;
    static sec = 00;
    static startTimer = false;
}

/**
 * Used to control timer of the stopwatch 
 */
function controlTimer(flag) {
    if (flag == true) {
        Stopwatch.startTimer = true;
    } else {
        Stopwatch.startTimer = false;
    }
}

/**
 * Used to count time, but because of the framework it causes performance issues
 */
function cycleTimer() {
    if (Stopwatch.startTimer == true) {
        Stopwatch.ms += 2;
        if (Stopwatch.ms == 60) {
            Stopwatch.sec++;
            Stopwatch.ms = 0;
        }

        GameSettings.output(Stopwatch.sec + ":" + Stopwatch.ms, true);
    }
}

/**
 * Used to reset the Stopwatch
 */
function resetTimer() {
    Stopwatch.ms = 00;
    Stopwatch.sec = 00;
}