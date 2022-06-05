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


function controlTimer(flag) {
    if (flag == true) {
        Stopwatch.startTimer = true;
    } else {
        Stopwatch.startTimer = false;
    }
}

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

function resetTimer() {
    Stopwatch.ms = 00;
    Stopwatch.sec = 00;
}