class Staticka {
    constructor() {
        if (this instanceof Staticka) {
            throw("Ovo je staticka klasa!");
        };
    };

    static meatboy;
}