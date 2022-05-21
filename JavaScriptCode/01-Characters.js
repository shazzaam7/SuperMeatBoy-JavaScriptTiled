//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

class PlayableCharacter extends Sprite {
    constructor(x, y, layer) {
        super(x, y, 60, 60);

        this.frame_sets = {};
        this.layer = layer;
    };
    moveRight() {
        this.direction = 90;
        this.velocity_x += 3.5;
    };
    
    moveLeft() {
        this.direction = 270;
        this.velocity_x -= 3.5;
    };
    
    moveUp() {
        this.direction = 0;
        this.velocity_y -= 2.5;
    };
    
    moveDown() {
        this.direction = 180;
        this.velocity_y += 2.5;
    };
    
    jump(h = 69) {

      if (!this.jumping) {
    
        this.jumping = true;
        this.velocity_y -= h;
        Audio.jumpSound.play();
      };
    };

    updatePosition(gravity, friction) {
      super.updatePosition(gravity = 3.5, friction = 0.86);
    };

    start(levelx,levely) {
      this.x = levelx;
      this.y = levely;
    };

    touching(sprite) {
      if (sprite.visible == false) {
        if (sprite instanceof Wall) {
          return true;
        } else {
          return false;
        }
      }
  
      let a = {
        left: this.x,
        right: this.x + this.width,
        top: this.y,
        bottom: this.y + this.height
      };
  
      let b = {
        left: sprite.x,
        right: sprite.x + sprite.width,
        top: sprite.y,
        bottom: sprite.y + sprite.height
      };
  
      let result = a.left <= b.right &&
        b.left <= a.right &&
        a.top <= b.bottom &&
        b.top <= a.bottom;
      return result;
    };
};

class MeatBoy extends PlayableCharacter {
    constructor(x,y,layer) {
        super(x,y,layer);
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
        this.visible = true;
    };
};

class Goal extends Sprite {
  constructor(layer) {
    super(layer.x, layer.y, layer.width, layer.height);
    this.frame_sets = {
      "down": [1],
      "walk-down": [1],
      "left": [1],
      "walk-left": [1],
      "right": [1],
      "walk-right": [1],
      "up": [1],
      "walk-up": [1]
    }

    this.layer = layer;
    this.visible = true;
  }

  updatePosition() {

  };
};

class Enemy extends Sprite {
  constructor(layer) {
    super(layer.x, layer.y, layer.width, layer.height);
    this.frame_sets = {
      "down": [1],
      "walk-down": [1],
      "left": [1],
      "walk-left": [1],
      "right": [1],
      "walk-right": [1],
      "up": [1],
      "walk-up": [1]
    }

    this.layer = layer;
    this.visible = true;
  }
  updatePosition() {
    super.updatePosition();
  }
}

class Wall extends Sprite {
  constructor(layer) {
    super(layer.x, layer.y, layer.width, layer.height);
    this.frame_sets = {
      "down": [1],
      "walk-down": [1],
      "left": [1],
      "walk-left": [1],
      "right": [1],
      "walk-right": [1],
      "up": [1],
      "walk-up": [1]
    }

    this.layer = layer;
    this.visible = true;
  }
}