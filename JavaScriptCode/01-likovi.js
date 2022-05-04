//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion


class IgriviLik extends Sprite {
    constructor(x, y, layer) {
        super(x, y, 60, 60);

        this.frame_sets = {
            "up": [6],
            "walk-up": [6],
            "right": [6],
            "walk-right": [7,8,9,10],
            "down": [6],
            "walk-down": [6],
            "left": [1],
            "walk-left": [2,3,4]
        };
        this.layer = layer;
        this.visible = true;
        this.okvir = true;
    }

    moveLeft() {
        this.direction = 270;
        this.velocity_x -= 2;
    } 
    
    moveRight() {
        this.direction = 90;
        this.velocity_x += 2;
    }
};