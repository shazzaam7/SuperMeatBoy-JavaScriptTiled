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

        GameSettings.output("Stopwatch: " + Stopwatch.sec + ":" + Stopwatch.ms, true);
    }
}

/**
 * Used to reset the Stopwatch
 */
function resetTimer() {
    Stopwatch.ms = 00;
    Stopwatch.sec = 00;
}

/**
 * Used to grade your time
 */
function score() {
    if (Stopwatch.sec != 00 && Stopwatch.ms != 00) {
        switch (StaticObject.Selected) {
            case "level1":
                switch (Stopwatch.sec) {
                    case 1:
                        if (Stopwatch.ms <= 50) {
                            GameSettings.output("Platinum Medal! GG");
                        } else {
                            GameSettings.output("Gold Medal! Not bad :)");
                        }
                        break;
                    case 2:
                        GameSettings.output("Gold Medal! Not bad :)");
                        break;
                    case 3:
                        if (Stopwatch.ms <= 50) {
                            GameSettings.output("Gold Medal! Not bad :)");
                        } else {
                            GameSettings.output("Silver Medal! You can do better! :|");
                        }
                        break;
                    case 4:
                        GameSettings.output("Silver Medal! You can do better! :|");
                        break;
                    case 5:
                        if (Stopwatch.ms <= 50) {
                            GameSettings.output("Silver Medal! You can do better! :|");
                        } else {
                            GameSettings.output("Bronze Medal :(");
                        }
                        break;
                    default:
                        GameSettings.output("Bronze Medal :(");
                        break;
                }
                break;
            case "level2":
                switch (Stopwatch.sec) {
                    case 1: case 2: case 3: case 4:
                        GameSettings.output("Platinum Medal! GG");
                        break;
                    case 5:
                        if (Stopwatch.ms <= 20) {
                            GameSettings.output("Platinum Medal! GG");
                        } else {
                            GameSettings.output("Gold Medal! Not bad :)");
                        }
                        break;
                    case 6:
                        if (Stopwatch.ms <= 50) {
                            GameSettings.output("Gold Medal! Not bad :)");
                        } else {
                            GameSettings.output("Silver Medal! You can do better! :|");
                        }
                        break;
                    case 7:
                        GameSettings.output("Silver Medal! You can do better! :|");
                        break;
                    case 8:
                        if (Stopwatch.ms <= 50) {
                            GameSettings.output("Silver Medal! You can do better! :|");
                        } else {
                            GameSettings.output("Bronze Medal :(");
                        }
                        break;
                    default:
                        GameSettings.output("Bronze Medal :(");
                        break;
                }
                break;
            case "level3":
                switch (Stopwatch.sec) {
                    case 1:
                        GameSettings.output("Platinum Medal! GG");
                        break;
                    case 2:
                        if (Stopwatch.ms <= 30) {
                            GameSettings.output("Platinum Medal! GG");
                        } else {
                            GameSettings.output("Gold Medal! Not bad :)");
                        }
                        break;
                    case 3:
                        GameSettings.output("Gold Medal! Not bad :)");
                        break;
                    case 4:
                        if (Stopwatch.ms <= 30) {
                            GameSettings.output("Gold Medal! Not bad :)");
                        } else {
                            GameSettings.output("Silver Medal! You can do better! :|");
                        }
                        break;
                    case 5:
                        GameSettings.output("Silver Medal! You can do better! :|");
                        break;
                    case 6:
                        if (Stopwatch.ms <= 30) {
                            GameSettings.output("Silver Medal! You can do better! :|");
                        } else {
                            GameSettings.output("Bronze Medal :(");
                        }
                        break;
                    default:
                        GameSettings.output("Bronze Medal :(");
                        break;
                }
                break;
            case "level4":
                switch (Stopwatch.sec) {
                    case 1: case 2: case 3: case 4:
                        GameSettings.output("Platinum Medal! GG");
                        break;
                    case 5:
                        if (Stopwatch.ms <= 30) {
                            GameSettings.output("Platinum Medal! GG");
                        } else {
                            GameSettings.output("Gold Medal! Not bad :)");
                        }
                        break;
                    case 6:
                        if (Stopwatch.ms <= 30) {
                            GameSettings.output("Gold Medal! Not bad :)");
                        } else {
                            GameSettings.output("Silver Medal! You can do better! :|");
                        }
                        break;
                    case 7:
                        GameSettings.output("Silver Medal! You can do better! :|");
                        break;
                    case 8:
                        if (Stopwatch.ms <= 30) {
                            GameSettings.output("Silver Medal! You can do better! :|");
                        } else {
                            GameSettings.output("Bronze Medal :(");
                        }
                        break;
                    default:
                        GameSettings.output("Bronze Medal :(");
                        break;
                }
                break;
            default:
                break;
        }
    }
}