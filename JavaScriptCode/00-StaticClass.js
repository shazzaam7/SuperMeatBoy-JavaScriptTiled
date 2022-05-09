class StaticObject {
    constructor() {
        if (this instanceof StaticObject) {
            throw("This is static class!");
        };
    };
    
    static Meatboy;
    static Goal;
}