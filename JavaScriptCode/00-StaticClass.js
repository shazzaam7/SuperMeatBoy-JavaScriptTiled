class StaticObject {
    constructor() {
        if (this instanceof StaticObject) {
            throw("This is static class!");
        };
    };
    
    static Meatboy;
    static SpinningSaw;
    static Goal;
    static Wall = [];
    static Selected;
}