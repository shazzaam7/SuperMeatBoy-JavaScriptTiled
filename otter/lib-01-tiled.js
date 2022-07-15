/// <reference path="../otter/lib-00-GameSettings.js"/>

/**
 * Class: Tiled
 * - used for loading all maps from Tiled
 */
class Tiled {

  /** Static */
  static firstMapName = "";
  /** @type {string[]} List/Array of layers that can be loaded.*/
  static layerTypes = ["tilelayer"];

  /**
   * Checks if the type of Layer is allowed
   * @param  {string} type Type of the layer
   * @return {boolean}
   */
  static layerOk(type) {
    let i = this.layerTypes.indexOf(type);
    if (i < 0) return false;
    else return true;
  }

  /**
   * Static method. Load the data of every map
   * @param {JSON} tiledJsExport - JSON data from export
   * @return {Object.<string, WorldMap>} Returns an array/list of maps
   */
  static loadWorldMaps(tiledJsExport) {

    let worlds = {};

    for (const mapName in tiledJsExport) {
      if (Object.hasOwnProperty.call(tiledJsExport, mapName)) {
        const mapData = tiledJsExport[mapName];

        GameSettings.colorLog(mapName, "success");

        if (this.firstMapName == "") this.firstMapName = mapName;

        let world = new WorldMap(mapData, mapName);

        //* tilesets ---------------------

        let arrT = [];
        let T = mapData.tilesets;
        for (let i = 0; i < T.length; i++) {
          let tileset = new Tileset(T[i]);
          arrT.push(tileset);
        }
        world.tilesets = arrT;

        //* layers ---------------------

        let arrL = [];
        let L = mapData.layers;
        for (let i = 0; i < L.length; i++) {
          let layer = new Layer(L[i], world.tilewidth, world.tileheight, world.tilesets);

          //! If the layer is OK, load it
          if (this.layerOk(layer.type)) {
            arrL.push(layer); // Have to be together because of the order of drawing
            if (layer.isSprite()) {
              world.addSpriteLayer(layer);
              GameSettings.colorLog("Loaded sprite: " + layer.name, "info");
            }
          }
          //! If the layer is typeof objectgroup, it will be considered that it's a sprite
          else if (layer.type == "objectgroup") {
            let ol = new ObjectLayer(L[i], world.tilewidth, world.tileheight, world.tilesets);
            let ols = ol.layers();
            ols.forEach(ll => { world.addSpriteLayer(ll) });
            arrL = arrL.concat(ols);
          }
          // NOTE: Other types cannot be loaded
          else {
            console.warn("Can't load: " + layer.type);
          }
        }

        world.layers = arrL;


        //* sprites ---------------------

        // for (let i = 0; i < world.layers.length; i++) {
        //   const layer = world.layers[i];
        //   if (layer.isSprite()) {
        //     let sprite = new Sprite(0, 0, world.tilewidth, world.tileheight);
        //     // sprite.className = layer.customProperty("class");
        //     sprite.layer = layer;
        //     world.sprites.push(sprite);
        //   }
        // }

        worlds[mapName] = world;
      }
    }

    return worlds;
  }
}

/**
 * Class: WorldGeneral
 * Contains methods which are mutual in other classes
 */
class WorldGeneral {

  // constructor() { }

  /**
   * Method for collecting data for every property which shows in this
   * @param {Object.<string, Object>} data - JSON data which are defined in the constructor with this
   */
  collectData(data) {
    let t = this;
    for (const key in t) {
      if (Object.hasOwnProperty.call(data, key)) {
        const v = data[key];
        this[key] = v;
      }
    }
  }

}

/**
 * Class: WorldMap
 * Contains all data of Tiled maps which are used in this framework
 * @extends WorldGeneral
 */
class WorldMap extends WorldGeneral {
  /**
   * @param {JSON} data  - JSON data
   * @param {string} name - The name of the map
   */
  constructor(data, name) {

    super();

    // Properties which are found in Tiled export
    // Default values are set
    this.height = 0;
    this.width = 0;

    this.tileheight = 0;
    this.tilewidth = 0;

    /** @type {Array.<Layer>} */
    this.layers = [];
    /** @type {Array.<Tileset>} */
    this.tilesets = [];

    // Collect defined data which is found in data
    this.collectData(data);

    // The rest:

    this.name = name;

    /** @type {Sprite[]} */
    this.sprites = [];

    /** @type {Object.<string, Layer>} */
    this._spriteLayers = null;

    /** @type {number[]} */
    this.collision_map = [];

    /** @type {PlatformCollider} */
    this.collider = new PlatformCollider();

    this.gravity = 2;
    this.friction = 0.8;

  }

  /** @return {Object.<string, Layer>} */
  get spriteLayers() {
    return this._spriteLayers;
  }

  /**
   * Add Layer which represents the Sprite in array of spriteLayers
   * @param {Layer} layer - Sprite Layer
   */
  addSpriteLayer(layer) {
    if (this._spriteLayers == null) this._spriteLayers = {};
    if (this._spriteLayers[layer.name] == undefined)
      this._spriteLayers[layer.name] = layer;
    else throw layer.name + " postoji!";
  }

  /**
   * Refreshes the display of the map
   */
  update() {

    this.sprites.forEach(s => {
      //! provjerava sve sprite-ove
      if (s.visible) {
        s.updateAnimation();
        s.updatePosition(this.gravity, this.friction);
        this.collideWithPlatform(s);
      }
    });

  }

  /**
   * @return {number} Dimension in pixels (Width)
   */
  get widthPx() {
    return this.width * this.tilewidth;
  }

  /**
   * @return {number} Dimension in pixels (Height)
   */
  get heightPx() {
    return this.height * this.tileheight;
  }

  /**
   * Processes collision with platform
   * @param {Sprite} sprite Character
   */
  collideWithPlatform(sprite) {
    //Edges
    if (sprite.left < 0) { sprite.left = 0; sprite.velocity_x = 0; }
    //If jumping is not false here, then he can't jump from edges
    if (sprite.bottom > this.heightPx) { sprite.bottom = this.heightPx; sprite.velocity_y = 0; sprite.jumping = false; }
    // If you don't put -1 here, the character will get stuck
    if (sprite.right > this.widthPx - 1) { sprite.right = this.widthPx - 1; sprite.velocity_x = 0; }
    if (sprite.top < 0) { sprite.top = 0; sprite.velocity_y = 0; }

    //Collisions

    //Top-left
    let topi, lefti, bottomi, righti, cmi, v;
    topi = Math.floor(sprite.top / this.tileheight);
    lefti = Math.floor(sprite.left / this.tilewidth);
    cmi = topi * this.width + lefti;
    v = this.collision_map[cmi];
    this.collider.collide(v, sprite, lefti * this.tilewidth, topi * this.tileheight,
      this.tilewidth, this.tileheight);

    //Bottom-left
    bottomi = Math.floor(sprite.bottom / this.tileheight);
    lefti = Math.floor(sprite.left / this.tilewidth);
    cmi = bottomi * this.width + lefti;
    v = this.collision_map[cmi];
    this.collider.collide(v, sprite, lefti * this.tilewidth, bottomi * this.tileheight,
      this.tilewidth, this.tileheight);

    //Top-right
    topi = Math.floor(sprite.top / this.tileheight);
    righti = Math.floor(sprite.right / this.tilewidth);
    cmi = topi * this.width + righti;
    v = this.collision_map[cmi];
    this.collider.collide(v, sprite, righti * this.tilewidth, topi * this.tileheight,
      this.tilewidth, this.tileheight);

    //Bottom-right
    bottomi = Math.floor(sprite.bottom / this.tileheight);
    righti = Math.floor(sprite.right / this.tilewidth);
    cmi = bottomi * this.width + righti;
    v = this.collision_map[cmi];
    this.collider.collide(v, sprite, righti * this.tilewidth, bottomi * this.tileheight,
      this.tilewidth, this.tileheight);

  }

  /**
   * Takes the position of the platforms and saves them in array
   * @param {string} layerName The name of the layer in which are the platforms
   */
  setCollisions(layerName) {
    this.collision_map = [];

    let arr = this.layers;
    for (let i = 0; i < arr.length; i++) {
      const l = arr[i];
      if (l.name == layerName) {
        this.collision_map = l.data;
      }
    }
  }

}

/**
 * Class: Layer
 */
class Layer extends WorldGeneral {
  /**
   * @param  {object} data
   * @param  {number} tilewidth
   * @param  {number} tileheight
   * @param  {Array.<Tileset>} tilesets
   */
  constructor(data, tilewidth, tileheight, tilesets) {

    super();

    this.id = 0;
    this.name = "";
    this.type = "";

    this.height = 0;
    this.width = 0;

    /** @type {number[]} */
    this.data = [];
    /** @type {Object[]} */
    this.properties = [];
    /** @type {boolean} */
    this.visible = false;

    this.collectData(data);

    //Extra
    this.tilewidth = tilewidth;
    this.tileheight = tileheight;

    /** @type {Object.<number, Tile>}*/
    this.tiles = {};

    this.collectTiles(tilesets);

  }

  /**
   * Checks if the Layer in Tiled contains property class
   * @returns {boolean}
   */
  isSprite() {
    return this.customProperty("class") != undefined;
  }

  /**
   * Collects information of Tiles which belong to the Layer
   * @param {Array.<Tileset>} tilesets ts
   */
  collectTiles(tilesets) {

    let ids = this.data;
    for (let i = 0; i < ids.length; i++) {
      if (ids[i] > 0) {
        this.tiles[ids[i]] = new Tile(ids[i], this.tilewidth, this.tileheight);
      }
    }

    for (const tileId in this.tiles) {
      if (Object.hasOwnProperty.call(this.tiles, tileId)) {
        const tile = this.tiles[tileId];

        for (let i = 0; i < tilesets.length; i++) {
          const ts = tilesets[i];
          if (ts.containsTile(tile.id)) {
            tile.tileset = ts;
          }
        }

      }
    }

  }

  /**
   * Returns the value of the property
   * @param  {string} name - The name of the property
   * @return Value of the property or undefined if it doesn't exist
   */
  customProperty(name) {
    let props = this.properties;
    if (props == undefined) return undefined;
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      if (prop.name === name) {
        return prop.value;
      }
    }

    return undefined;
  }

  /**
   * Draws the Layer
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawLayer(ctx) {
    for (let i = 0; i < this.data.length; i++) {
      const tileId = this.data[i];
      if (tileId == 0) continue;
      let tile = this.tiles[tileId];
      tile.x = (i % this.width) * tile.width;
      tile.y = Math.trunc(i / this.width) * tile.height;
      tile.drawTile(ctx);
    }
  }

}

/**
 * Class: ObjectLayer
 * - ObjectLayer in Tiled is defined differently
 * - Used to load info of objects who don't have animations
 */
class ObjectLayer {
  /**
   * 
   * @param {Object} data Data from Tiled
   * @param {Tileset[]} tilesets Array of tilesets
   */
  constructor(data, tw, th, tilesets) {

    this.name = data.name;
    this.type = data.type;
    this.objects = data.objects;
    this.tilesets = tilesets;
    this.tilewidth = tw;
    this.tileheight = th;

    this.properties = data.properties;
  }

  /**
   * Returns an array of layers
   * @return {Layers[]}
   */
  layers() {

    let layers = [];

    for (let i = 0; i < this.objects.length; i++) {
      const objData = this.objects[i];
      let obj = new ObjectLayerItem(objData);
      let layer = new Layer(this, this.tilewidth, this.tileheight); //! tw, th
      layer.data = [obj.gid];

      let t = new Tile(obj.gid, this.tilewidth, this.tileheight);

      // Find tileset
      for (let j = 0; j < this.tilesets.length; j++) {
        const ts = this.tilesets[j];
        if (ts.containsTile(t.id)) {
          t.tileset = ts;
          break;
        }
      }

      layer.tiles[obj.gid] = t;
      layer.width = obj.width;
      layer.height = obj.height;
      layer.x = obj.x;
      layer.y = obj.y;
      layer.name = obj.name;

      layer.properties = this.properties;
      layers.push(layer);
    }

    return layers;
  }
}

/**
 * Class: ObjectLayerItem
 * - Data which is found in objects under ObjectLayer in Tiled
 */
class ObjectLayerItem {
  constructor(data) {

    if (data.name == "") {
      GameSettings.colorLog("If you don't write the name in Tiled, remember that the layer's name is based off it's ID in Tiled: " + data.id, "warning");
      console.warn(data);
      this.name = data.id;
    }
    else this.name = data.name;


    this.gid = data.gid;

    this.width = data.width;
    this.height = data.height;

    this.x = data.x;
    this.y = data.y;

    this.visible = data.visible;
  }
}

/**
 * Class: Tileset
 * @extends {WorldGeneral}
 */
class Tileset extends WorldGeneral {

  /**
   * @param {JSON} data 
   */
  constructor(data) {

    super();

    this.tilewidth = 0;
    this.tileheight = 0;

    this.columns = 0;

    this.firstgid = 0;
    this.tilecount = 0;

    this.image = "";
    this.name = "";

    if (data != undefined) {
      this.collectData(data);

      /** @type {string} Path to the image */
      this.imageSrc = data.image;

      /** @type {Image} Image */
      this.image = null;

      this.loadImage();
    }
  }

  /**
   * Loads the image
   * - Loading images works asynchronously
   */
  loadImage() {
    let src = this.imageSrc;
    this.image = new Image();
    this.image.src = src;
    this.imageLoaded = false;
    this.image.addEventListener("load", () => {
      // When the image loads, set info that it's loaded so we can check
      this.imageLoaded = true;
    });
  }

  /**
   * Checks the Tile of the Tileset with inserted ID
   * @param {number} tileId ID of the Tile
   * @returns {boolean} Returns true/false
   */
  containsTile(tileId) {
    let start = this.firstgid;
    let end = start + this.tilecount - 1;
    if (tileId >= start && tileId <= end) {
      return true;
    }
    else {
      return false;
    }

  }

}

/**
 * Class: Tile
 */
class Tile {
  /**
   * @param {number} id ID of the Tile
   * @param {number} w Width of the Tile
   * @param {number} h Height of the Tile
   */
  constructor(id, w, h) {
    this.id = id;
    //Position
    this.x = 0;
    this.y = 0;

    this.width = w;
    this.height = h;

    /** @type {Tileset} Which tileset it belongs to */
    this.tileset = null;
  }

  /**
   * Index of the Tile in the Tileset
   * @return {number} Index in Tileset
   */
  get indexTs() {
    let i = this.id - this.tileset.firstgid;
    return i;
  }

  /**
   * @return {number} Returns a row of the Tileset in which the Tile is
   */
  get tilesetRow() {
    let i = this.indexTs;
    return Math.trunc(i / this.tileset.columns);
  }

  /**
   * @return {number} Returns initial position (x axis) of the Tile on Tileset
   */
  get sx() {
    let tsCol = this.indexTs % this.tileset.columns;
    return tsCol * this.width;
  }

  /**
   * @return {number} Returns initial position (y axis) of the Tile on Tileset
   */
  get sy() {
    let tsRow = Math.trunc(this.indexTs / this.tileset.columns);
    return tsRow * this.height;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawTile(ctx) {
    // NOTE: Size for drawing can be different from size of the image
    ctx.drawImage(this.tileset.image,
      this.sx, this.sy, this.width, this.height, // todo: Initial coordinates & dimension on Tileset
      this.x, this.y, this.width, this.height); // On display
  }

}