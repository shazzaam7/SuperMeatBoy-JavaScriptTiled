//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

/**
 * Class used for all playable characters. Has pretty much everything that is needed main characters apart from their animations
 */
class PlayableCharacter extends Sprite {
  constructor(x, y, layer) {
    super(x, y, 60, 60 - 0.0001);

    this.frame_sets = {};
    this.layer = layer;
    this._deathcounter = 0;
    this.sprint = false;

    if (this.constructor == PlayableCharacter) {
      throw new Error("This is an Abstract Class!");
    }
  };

  get deathcounter() {
    return this._deathcounter;
  }

  set deathcounter(dc) {
    if (dc < 0) {
      this._deathcounter = 0;
    } else {
      this._deathcounter = dc;
    }
  }

  moveRight() {
    this.direction = 90;
    this.velocity_x += 3.5;
  };

  moveLeft() {
    this.direction = 270;
    this.velocity_x -= 3.5;
  };

  jump(h = 69) {

    if (!this.jumping) {

      this.jumping = true;
      this.velocity_y -= h;
      if (Audio.jumpSound.currentTime > 0) {
        Audio.jumpSound.pause();
        Audio.jumpSound.currentTime = 0;
        Audio.jumpSound.play();
      } else {
        Audio.jumpSound.play();
      }
    };
  };

  updatePosition(gravity, friction) {
    if (this.sprint) {
      super.updatePosition(gravity = 3.5, friction = 0.89);
    } else {
      super.updatePosition(gravity = 3.5, friction = 0.80);
    }
  };

  start(levelx, levely) {
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

/**
 * Class for the main character MeatBoy
 */
class MeatBoy extends PlayableCharacter {
  constructor(x, y, layer) {
    super(x, y, layer);
    this.frame_sets = {
      "up": [6],
      "walk-up": [6],
      "right": [6],
      "walk-right": [7, 8, 9, 10],
      "down": [6],
      "walk-down": [6],
      "left": [1],
      "walk-left": [2, 3, 4]
    };
    this.visible = true;
  };
};

/**
 * Class for goal. It's similar to Wall class.
 */
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

/**
 * Class for enemies
 */
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

    //Used for moving
    /*this.move = false;
    this.direction = 90;
    this.limit = 0;
    this._distance = 0;*/
  }

  /*get distance() {
    return this._distance;
  }

  set distance(p) {
    if (p >= this.limit) {
      this._distance = this.limit;
    } else {
      this._distance = p;
    }
  }*/ //Property/private
  /**
   * Might be used to make enemy like Spinning Saws move around the map
   */
  /*updatePosition() {
    if (this.move) {
      switch (this.direction) {
        case 0: //up
          this.y -= 5;
          this.distance += 5;
          break;
        case 90: //right
          this.x += 5;
          this.distance += 5;
          break;
        case 180: //down
          this.y += 5;
          this.distance += 5;
          break;
        case 270: //left
          this.x += 5;
          this.distance += 5;
          break;
        default:
          break;
      }
    }
  }*/
  updatePosition() {

  }

}

/**
 * Class specifically designed for invisible walls used for jumping while touching real visible walls
 */
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

  updatePosition() {

  };
}