/// <reference path="lib-01-tiled.js"/>

/**
 * Klasa: Game
 */
class Game {

  constructor() {

    // todo: world jer je Map rezervirana!
    /** @type {WorldMap} */
    this.activeWorldMap = null;
    this.worlds = {};

  }

  logSprites_ActiveMap() {

    if (this.activeWorldMap == null) throw "Mapa nije učitana";

    let s = this.activeWorldMap.sprites;
    for (let i = 0; i < s.length; i++) {
      const sprite = s[i];
      console.log(sprite);
    }

  } ////logSprites

  logLayers_ActiveMap() {
    let la = this.activeWorldMap.layers;
    for (let i = 0; i < la.length; i++) {
      const layer = la[i];
      console.log(`layer[${i}] -> ${layer.name}`);
      console.log(layer);
    }
  } //// logLayers

  /**
   * Poziva update aktivne mape/world-a.
   */
  update() {

    // ako ne postoji
    if (this.activeWorldMap == null) throw "Mapa nije učitana!";

    this.activeWorldMap.update();

  };

  /**
   * Učitaj podatke o svim mapama
   * @param {JSON} tiledJsExport - JSON podaci iz exporta.
   */
  loadWorldMaps(tiledJsExport) {

    this.worlds = Tiled.loadWorldMaps(tiledJsExport);
    // let prva = Tiled.firstMapName;
    // this.activeWorldMap = this.worlds[prva];

  } //// loadWorldMaps

  /**
   * Provjerava je li mapa s tim imenom već učitana.
   * @param {string} worldName - Naziv mape.
   * @returns {boolean} vraća true ako već postoji, ili false ako je nema.
   */
  hasWorld(worldName) {
    return (this.worlds[worldName] != undefined);
  }

  /**
   * Postavlja aktivnu mapu/svijet koji se trenutno crta.
   * @param {string} name - Naziv mape.
   */
  setActiveWorldMap(name) {
    if (this.hasWorld(name) == false) throw name + " ne postoji!";

    if (this.activeWorldMap != null) {
      if (this.activeWorldMap.sprites.length > 0) {
        console.warn("Promijenjena je mapa, pazite na sprites koji ostaju u staroj mapi:");
        console.log(this.activeWorldMap.sprites);
      }
    }
    this.activeWorldMap = this.worlds[name];
  }

  /**
   * Dodaje sprite s u popis svih koji se crtaju.
   * @param {Sprite} s 
   */
  addSprite(s) {
    this.activeWorldMap.sprites.push(s);
  }

  /**
   * Pobriši sve sprite-ove iz aktivne mape.
   */
  clearSprites() {
    if (this.activeWorldMap != null)
      this.activeWorldMap.sprites = [];
  }

  /**
   * Vraća layer prema nazivu.
   * @param  {string} name naziv Layer-a
   * @return {Layer}
   */
  getSpriteLayer(name) {
    return this.activeWorldMap.spriteLayers[name];
  }

  /**
   * Vraća Layer prema nazivu ili null ako ga nema.
   * @param {string} name Naziv layer-a
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

} //// Game


//! -------------------------------------------------

class GameWorldObject {
  /**
   * @param  {number} x - x koordinata.
   * @param  {number} y - y koordinata.
   * @param  {number} width - širina.
   * @param  {number} height - visina.
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
   * Mijenja aktivni frameset ovisno o smjeru i brzini lika.
   * @param {Array} frame_set niz
   * @param {string} mode moguće vrijednosti su "loop" ili "pause"
   * @param {number} delay razmak između izmjene sličica
   * @param {number} frame_index indeks početnog. Zadana vrijednost je 0.
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
   * Vrti animacije.
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
 * Klasa: Sprite
 * - Predstavlja lika igre.
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

    //animacije za svaku akciju
    this.frame_sets = null;

    this._visible = false;

    /** @type {boolean} crtanje okvira oko lika */
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
      throw "Animacije nisu definirane! (frame_sets)";
    // this.frame_sets = GameSettings.frameSets[this.layer.name];
    this.visible = la.visible;
  }

  get layer() {
    return this._layer;
  }

  /**
   * Dohvaća frameset.
   * @param {string} key ID frameset-a
   * @returns {Array}
   */
  frameSets(key) {
    let v = this.frame_sets[key];
    if (v == undefined) throw `Ne postoji frameset [${key}] za ${this.layer.name}. Dodajte u GameSettings!`;

    return v;
  }

  /**
   * Osvježava animacije ovisno o smjeru i brzini lika.
   */
  updateAnimation() {
    
    if (this.direction == 0) {
      if (this.velocity_y < -0.1) this.changeFrameSet(this.frameSets("walk-up"), "loop", 5);
      else this.changeFrameSet(this.frameSets("up"), "pause");
    }
    // ako je lik okrenut desno
    else if (this.direction == 90) {
      // ako ima brzinu po x, onda rotiraj animacije koje postoje za walk-right
      if (this.velocity_x > 0.1) this.changeFrameSet(this.frameSets("walk-right"), "loop", 5);
      // ako stoji, onda prikaži zadani položaj za desno
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

  } //// updateAnimation

  /**
   * @param {number} - tileId
   * @return {Tile} vraća tile
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
   * Metoda za skakanje.
   * @param  {number} h broj točkica koliko skače, zadano je 50.
   */
  jump(h = 50) {

    if (!this.jumping) {

      this.jumping = true;
      this.velocity_y -= h;

    }
  }

  /**
   * Osvježava položaj lika.
   * @param {number} gravity koliko brzo pada na pod
   * @param {number} friction postotak smanjivanja brzine
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
   * Provjerava dira li lika.
   * @param {Sprite} sprite lik
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

    // samo lijevo i desno ne radi
    // let result = a.left <= b.right && b.left <= a.right;

    return result;
  } //// touching

  /**
   * Provjerava je li lik kliknut.
   * @param {MouseInput} m mouse input
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

  //#region Strane lika
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
  //#endregion


} //// Sprite
/**
 * Klasa: PlatformCollider
 * - koristi se za kolizije s platformama
 */
class PlatformCollider {

  constructor() { }

  /**
   * Provjerava može li stati na tile.
   * @param {number} value redni broj u mapi kolizija
   * @param {Sprite} sprite lik ili predmet igre
   * @param {number} tile_x x koordinata tile-a kojeg provjeravamo
   * @param {number} tile_y y koordinata tile-a kojeg provjeravamo
   * @param {number} tile_w širina tile-a
   * @param {number} tile_h visina tile-a
   * @returns 
   */
  collide(value, sprite, tile_x, tile_y, tile_w, tile_h) {

    if (value == 0) return;

    if (value == undefined) {
      //dira dno      
      return;
    }

    if (this.collidePlatformBottom(sprite, tile_y + tile_h)) return;
    if (this.collidePlatformTop(sprite, tile_y)) return;
    if (this.collidePlatformLeft(sprite, tile_x)) return;
    if (this.collidePlatformRight(sprite, tile_x + tile_w)) return;

  }

  /**
   * Ne dozvoljava prolaz ako lik dolazi od dna platforme.
   * @param {Sprite} sprite Lik
   * @param {number} tile_bottom y koorinata dna
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
   * Ne dozvoljava prolaz ako lik dolazi s lijeva od platforme.
   * @param {Sprite} sprite Lik
   * @param {number} tile_left x koorinata lijeve strane platforme
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
   * Ne dozvoljava prolaz ako lik dolazi s desna od platforme.
   * @param {Sprite} sprite Lik
   * @param {number} tile_right x koorinata desne strane platforme
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
  * Ne dozvoljava prolaz ako lik dolazi na vrh platforme.
  * @param {Sprite} sprite Lik
  * @param {number} tile_top y koorinata vrha platforme
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

