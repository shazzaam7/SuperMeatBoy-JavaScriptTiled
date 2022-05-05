class StaticClass {
    constructor() {
        if (this instanceof StaticClass) {
            throw("Ovo je staticka klasa!");
        };
    };
    
    static meatboy;
}