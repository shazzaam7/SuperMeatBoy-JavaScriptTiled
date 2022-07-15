/// <reference path="lib-01-tiled.js"/>

/**
 * Class: Game
 */
class Game {

  constructor() {

    // todo: World because map is already used
    /** @type {WorldMap} */
    this.activeWorldMap = null;
    this.worlds = {};

  }

  logSprites_ActiveMap() {

    if (this.activeWorldMap == null) throw "Mapa is not loaded";

    let s = this.activeWorldMap.sprites;
    for (let i = 0; i < s.length; i++) {
      const sprite = s[i];
      console.log(sprite);
    }

  }

  logLayers_ActiveMap() {
    let la = this.activeWorldMap.layers;
    for (let i = 0; i < la.length; i++) {
      const layer = la[i];
      console.log(`layer[${i}] -> ${layer.name}`);
      console.log(layer);
    }
  }

  /**
   * Updates active map/world
   */
  update() {

    // ako ne postoji
    if (this.activeWorldMap == null) throw "Mapa nije učitana!";

    this.activeWorldMap.update();

  };

  /**
   * Load data of every map
   * @param {JSON} tiledJsExport - JSON data from export
   */
  loadWorldMaps(tiledJsExport) {

    this.worlds = Tiled.loadWorldMaps(tiledJsExport);
    // let first = Tiled.firstMapName;
    // this.activeWorldMap = this.worlds[first];

  }

  /**
   * Checks if the map with that name is already loaded
   * @param {string} worldName - The name of the map
   * @returns {boolean} Returns true if it already exists or false if it doesn't
   */
  hasWorld(worldName) {
    return (this.worlds[worldName] != undefined);
  }

  /**
   * Sets active map/world which is currently drawing
   * @param {string} name - Naziv mape.
   */
  setActiveWorldMap(name) {
    if (this.hasWorld(name) == false) throw name + " doesn't exist!";

    if (this.activeWorldMap != null) {
      if (this.activeWorldMap.sprites.length > 0) {
        console.warn("Map has changed, watch out for sprites that stay on the old map:");
        console.log(this.activeWorldMap.sprites);
      }
    }
    this.activeWorldMap = this.worlds[name];
  }

  /**
   * Adds sprites s into a list/array of every sprite that is being drawn
   * @param {Sprite} s 
   */
  addSprite(s) {
    this.activeWorldMap.sprites.push(s);
  }

  /**
   * Delete every sprite from active map
   */
  clearSprites() {
    if (this.activeWorldMap != null)
      this.activeWorldMap.sprites = [];
  }

  /**
   * Returns Layer based on the name
   * @param  {string} name The name of the Layer
   * @return {Layer}
   */
  getSpriteLayer(name) {
    return this.activeWorldMap.spriteLayers[name];
  }

  /**
   * Returns Layer based on the name or null if it doesn't exist
   * @param {string} name The name of the layer
   * @returns {Layer}
   */
  getLayer(name) {
    let arr = this.activeWorldMap.layers;
    for (let i = 0; i < arr.length; i++) {
      const l = arr[i];
      if (l.name == name) return l;
    }

    return null;
  }

}

//! -------------------------------------------------

class GameWorldObject {
  /**
   * @param  {number} x - x coordinate
   * @param  {number} y - y coordinate
   * @param  {number} width - width
   * @param  {number} height - height
   */
  constructor(x, y, width, height) {

    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.x_old = x;
    this.y_old = y;

  }

};

class GameWorldObjectAnimator extends GameWorldObject {
  constructor(x, y, w, h) {

    super(x, y, w, h);


  }

  init(frame_set, delay) {
    this.count = 0;
    this.delay = (delay >= 1) ? delay : 1;
    this.frame_set = frame_set;
    this.frame_index = 0;
    this.frame_value = frame_set[0];
    this.mode = "pause";
  }

  animate() {

    switch (this.mode) {

      case "loop": this.loop(); break;
      case "pause": break;

    }

  }

  /**
   *  Changes active frameset based on direction and speed of the character
   * @param {Array} frame_set Array
   * @param {string} mode loop or pause
   * @param {number} delay between the change of the images/animation
   * @param {number} frame_index Index of the beginning frame. Default value is 0
   */
  changeFrameSet(frame_set, mode, delay = 10, frame_index = 0) {

    if (this.frame_set === frame_set) { return; }

    this.count = 0;
    this.delay = delay;
    this.frame_set = frame_set;
    this.frame_index = frame_index;
    this.frame_value = frame_set[frame_index];
    this.mode = mode;

  }

  /**
   * Loops animations
   */
  loop() {

    this.count++;

    while (this.count > this.delay) {

      this.count -= this.delay;

      this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;

      this.frame_value = this.frame_set[this.frame_index];

    }

  }

};

/**
 * Class: Sprite
 * - Presents character of the game
 */
class Sprite extends GameWorldObjectAnimator {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    super.init([1, 2, 3, 4], 10);

    this.jumping = true;
    this.velocity_x = 0;
    this.velocity_y = 0;

    /** @type {Layer} */
    this._layer = null;

    this.direction = 0;

    //Animations for every action
    this.frame_sets = null;

    this._visible = false;

    /** @type {boolean} Drawing of the border around the character aka Hitbox */
    this.okvir = false;

  }

  set visible(v) {
    this._visible = v;
    this.layer.visible = v;
  }

  get visible() {
    return this._visible;
  }

  set layer(la) {
    this._layer = la;
    if (this.frame_sets == undefined || this.frame_sets == null)
      throw "Animations are not defined! (frame_sets)";
    // this.frame_sets = GameSettings.frameSets[this.layer.name];
    this.visible = la.visible;
  }

  get layer() {
    return this._layer;
  }

  /**
   * Grabs the frameset
   * @param {string} key ID of the frameset
   * @returns {Array}
   */
  frameSets(key) {
    let v = this.frame_sets[key];
    if (v == undefined) throw `Ne postoji frameset [${key}] za ${this.layer.name}. Dodajte u GameSettings!`;

    return v;
  }

  /**
   * Refreshes the animations based on the direction and the speed of the character
   */
  updateAnimation() {
    
    if (this.direction == 0) {
      if (this.velocity_y < -0.1) this.changeFrameSet(this.frameSets("walk-up"), "loop", 5);
      else this.changeFrameSet(this.frameSets("up"), "pause");
    } // right direction

    else if (this.direction == 90) {
      // If the character is moving on x coordinate, rotate animations which are for walk-right
      if (this.velocity_x > 0.1) this.changeFrameSet(this.frameSets("walk-right"), "loop", 5);
      // If the character is standing still, then show default position for right
      else this.changeFrameSet(this.frameSets("right"), "pause");
    }
    else if (this.direction == 180) {
      if (this.velocity_y > 0.1) this.changeFrameSet(this.frameSets("walk-down"), "loop", 5);
      else this.changeFrameSet(this.frameSets("down"), "pause");
    }
    else if (this.direction == 270) {
      if (this.velocity_x < -0.1) this.changeFrameSet(this.frameSets("walk-left"), "loop", 5);
      else this.changeFrameSet(this.frameSets("left"), "pause");
    }

    this.animate();

  }

  /**
   * @param {number} - ID of the Tile
   * @return {Tile} Returns Tile
   */
  myTile(rbr) {
    let t = null;

    //let i = this.firstgid + rbr - 1;

    let i = this.layer.data[rbr - 1];

    t = this.layer.tiles[i];

    if (t == undefined) {
      for (const key in this.layer.tiles) {
        if (Object.hasOwnProperty.call(this.layer.tiles, key)) {
          t = this.layer.tiles[key];
          break;
        }
      }
    }

    return t;
  }

  moveRight() {
    this.direction = 90;
    this.velocity_x += 0.5;
  }

  moveLeft() {
    this.direction = 270;
    this.velocity_x -= 0.5;
  }

  moveUp() {
    this.direction = 0;
    this.velocity_y -= 0.5;
  }

  moveDown() {
    this.direction = 180;
    this.velocity_y += 0.5;
  }
  /**
   * Method for jumping
   * @param  {number} h How much the character jumps (in pixels). Default is 50
   */
  jump(h = 50) {

    if (!this.jumping) {

      this.jumping = true;
      this.velocity_y -= h;

    }
  }

  /**
   * Refreshes the position of the character
   * @param {number} gravity How fast is the character falling on the floor
   * @param {number} friction Percentage of slowing down
   */
  updatePosition(gravity = 0, friction = 0) {
    this.x_old = this.x;
    this.y_old = this.y;
    this.velocity_y += gravity;
    this.x += this.velocity_x;
    this.y += this.velocity_y;

    this.velocity_x *= friction;
    this.velocity_y *= friction;
  }

  /**
   * Checks if the character is touching something
   * @param {Sprite} sprite Character
   * @returns {boolean}
   */
  touching(sprite) {
    if (sprite.visible == false) return false;

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
  } 

  /**
   * Checks if the character was clicked
   * @param {MouseInput} m Mouse Input
   * @return {boolean}
   */
  clicked(m) {
    let x1 = this.x;
    let x2 = this.x + this.width;

    let y1 = this.y;
    let y2 = this.y + this.height;

    let clicked = (m.resizeX >= x1 && m.resizeX <= x2) && (m.resizeY >= y1 && m.resizeY <= y2);
    return clicked;
  }

  //Sides of the character
  get left() {
    return this.x;
  }
  set left(x) {
    this.x = x;
  }

  get bottom() {
    return this.y + this.height;
  }
  set bottom(y) {
    this.y = y - this.height;
  }

  get right() {
    return this.x + this.width;
  }
  set right(x) {
    this.x = x - this.width;
  }

  get top() {
    return this.y;
  }
  set top(y) {
    this.y = y;
  }

  get oldTop() { return this.y_old; }
  set oldTop(y) { this.y_old = y; }

  get oldBottom() { return this.y_old + this.height; }
  set oldBottom(y) { this.y_old = y - this.height; }

  get oldLeft() { return this.x_old; }
  set oldLeft(x) { this.x_old = x; }

  get oldRight() { return this.x_old + this.width; }
  set oldRight(x) { this.x_old = x - this.width; }

}
/**
 * Class: PlatformCollider
 * - Used for collisions with platforms
 */
class PlatformCollider {

  constructor() { }

  /**
   * Checks if the character can stay on the tile
   * @param {number} value Ordinal number in the map of collisions
   * @param {Sprite} sprite Character or an item of the game
   * @param {number} tile_x x coordinate of the tile which we are checking
   * @param {number} tile_y y coordinate of the tile which we are checking
   * @param {number} tile_w Width of the tile
   * @param {number} tile_h Height of the tile
   * @returns 
   */
  collide(value, sprite, tile_x, tile_y, tile_w, tile_h) {

    if (value == 0) return;

    if (value == undefined) {
      //Touches the rock bottom  
      return;
    }

    if (this.collidePlatformBottom(sprite, tile_y + tile_h)) return;
    if (this.collidePlatformTop(sprite, tile_y)) return;
    if (this.collidePlatformLeft(sprite, tile_x)) return;
    if (this.collidePlatformRight(sprite, tile_x + tile_w)) return;

  }

  /**
   * Doesn't allow passage if the character is coming from the rock bottom
   * @param {Sprite} sprite Character
   * @param {number} tile_bottom y coordinate of the rock bottom
   * @returns {boolean}
   */
  collidePlatformBottom(sprite, tile_bottom) {

    if (sprite.top < tile_bottom && sprite.oldTop >= tile_bottom) {

      sprite.top = tile_bottom;
      sprite.velocity_y = 0;
      return true;

    } return false;

  }

  /**
   * Doesn't allow passage if the character is coming from the left side of the platform
   * @param {Sprite} sprite Character
   * @param {number} tile_left x coordinate of the left side of the platform
   * @returns {boolean}
   */
  collidePlatformLeft(sprite, tile_left) {

    if (sprite.right > tile_left && sprite.oldRight <= tile_left) {

      sprite.right = tile_left - 0.01;
      sprite.velocity_x = 0;
      return true;

    } return false;

  }

  /**
   * Doesn't allow passage if the character is coming from the right side of the platform
   * @param {Sprite} sprite Character
   * @param {number} tile_right x coordinate of the right side of the platform
   * @returns {boolean}
   */
  collidePlatformRight(sprite, tile_right) {

    if (sprite.left < tile_right && sprite.oldLeft >= tile_right) {

      sprite.left = tile_right;
      sprite.velocity_x = 0;
      return true;

    } return false;

  }


  /**
  * Doesn't allow passage if the character is coming from the top side of the platform
  * @param {Sprite} sprite Character
  * @param {number} tile_top y coordinate of the top side of the platform
  * @returns {boolean}
  */
  collidePlatformTop(sprite, tile_top) {

    if (sprite.bottom > tile_top && sprite.oldBottom <= tile_top) {

      sprite.bottom = tile_top - 0.01;
      sprite.velocity_y = 0;
      sprite.jumping = false;
      return true;

    } return false;

  }

};

