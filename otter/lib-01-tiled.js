/// <reference path="../otter/lib-00-GameSettings.js"/>

/**
 * Klasa: Tiled
 * - služi za učitavanje svih mapa iz Tiled-a.
 */
class Tiled {

  /** Static */
  static firstMapName = "";
  /** @type {string[]} Popis layera koji se mogu učitati.*/
  static layerTypes = ["tilelayer"];

  /**
   * Provjerava je li layer dozvoljenog tipa.
   * @param  {string} type tip layer-a.
   * @return {boolean}
   */
  static layerOk(type) {
    let i = this.layerTypes.indexOf(type);
    if (i < 0) return false;
    else return true;
  }

  /**
   * Učitaj podatke o svim mapama. Statička metoda.
   * @param {JSON} tiledJsExport - JSON podaci iz exporta.
   * @return {Object.<string, WorldMap>} vraća popis mapa.
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

          //! ako je layerOk učitaj
          if (this.layerOk(layer.type)) {
            arrL.push(layer); // moraju biti svi skupa radi redoslijeda crtanja
            if (layer.isSprite()) {
              world.addSpriteLayer(layer);
              GameSettings.colorLog("Učitan sprite layer " + layer.name, "info");
            }
          }
          //! ako je layer tipa objectgoup, smatra se da je sprite
          else if (layer.type == "objectgroup") {
            let ol = new ObjectLayer(L[i], world.tilewidth, world.tileheight, world.tilesets);
            let ols = ol.layers();
            ols.forEach(ll => { world.addSpriteLayer(ll) });
            arrL = arrL.concat(ols);
          }
          // Napomena: ostale vrste ne može učitati
          else {
            console.warn("Ne mogu učitati: " + layer.type);
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
  } //// loadWorldMaps
} //// Tiled

/**
 * Klasa: WorldGeneral
 * 
 * Sadrži metode koje su zajedničke ostalim klasama.
 */
class WorldGeneral {

  // constructor() { }

  /**
   * Metoda za prikupljanje podataka za svako svojstvo koje se pojavljuje u this.
   * @param {Object.<string, Object>} data - Json podaci koji su definirani u konstruktoru s this.
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

} //// WorldGeneral

/**
 * Klasa: WorldMap
 * 
 * Sadrži sve podatke o Tiled mapi koji se koriste u ovom okviru.
 * @extends WorldGeneral
 */
class WorldMap extends WorldGeneral {
  /**
   * @param {JSON} data  - Json podaci.
   * @param {string} name - naziv mape.
   */
  constructor(data, name) {

    super();

    // svojstva koja se nalaze u Tiled export
    // postavljene su zadane vrijednosti
    this.height = 0;
    this.width = 0;

    this.tileheight = 0;
    this.tilewidth = 0;

    /** @type {Array.<Layer>} */
    this.layers = [];
    /** @type {Array.<Tileset>} */
    this.tilesets = [];

    // skupi podatke definirane gore, a nalaze se u data
    this.collectData(data);

    // ostalo:

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

  } //// constructor

  /** @return {Object.<string, Layer>} */
  get spriteLayers() {
    return this._spriteLayers;
  }

  /**
   * Dodaj Layer koji predstavlja Sprite u popis spriteLayers.
   * @param {Layer} layer - Sprite Layer
   */
  addSpriteLayer(layer) {
    if (this._spriteLayers == null) this._spriteLayers = {};
    if (this._spriteLayers[layer.name] == undefined)
      this._spriteLayers[layer.name] = layer;
    else throw layer.name + " postoji!";
  }

  /**
   * Osvježava prikaz mape.
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
   * @return {number} dimenzija u pikselima.
   */
  get widthPx() {
    return this.width * this.tilewidth;
  }

  /**
   * @return {number} dimenzija u pikselima.
   */
  get heightPx() {
    return this.height * this.tileheight;
  }

  /**
   * Obrađuje sudar s platformama.
   * @param {Sprite} sprite Lik.
   */
  collideWithPlatform(sprite) {
    //rubovi
    if (sprite.left < 0) { sprite.left = 0; sprite.velocity_x = 0; }
    //ako se ne stavi jumping na false ovdje, onda neće skakati s ruba
    if (sprite.bottom > this.heightPx) { sprite.bottom = this.heightPx; sprite.velocity_y = 0; sprite.jumping = false; }
    // zapinje za 1 px ako se ne stavi -1
    if (sprite.right > this.widthPx - 1) { sprite.right = this.widthPx - 1; sprite.velocity_x = 0; }
    if (sprite.top < 0) { sprite.top = 0; sprite.velocity_y = 0; }

    //kolizije

    //top-left
    let topi, lefti, bottomi, righti, cmi, v;
    topi = Math.floor(sprite.top / this.tileheight);
    lefti = Math.floor(sprite.left / this.tilewidth);
    cmi = topi * this.width + lefti;
    v = this.collision_map[cmi];
    this.collider.collide(v, sprite, lefti * this.tilewidth, topi * this.tileheight,
      this.tilewidth, this.tileheight);

    // bottom-left
    bottomi = Math.floor(sprite.bottom / this.tileheight);
    lefti = Math.floor(sprite.left / this.tilewidth);
    cmi = bottomi * this.width + lefti;
    v = this.collision_map[cmi];
    this.collider.collide(v, sprite, lefti * this.tilewidth, bottomi * this.tileheight,
      this.tilewidth, this.tileheight);

    // top-right
    topi = Math.floor(sprite.top / this.tileheight);
    righti = Math.floor(sprite.right / this.tilewidth);
    cmi = topi * this.width + righti;
    v = this.collision_map[cmi];
    this.collider.collide(v, sprite, righti * this.tilewidth, topi * this.tileheight,
      this.tilewidth, this.tileheight);

    // bottom-right
    bottomi = Math.floor(sprite.bottom / this.tileheight);
    righti = Math.floor(sprite.right / this.tilewidth);
    cmi = bottomi * this.width + righti;
    v = this.collision_map[cmi];
    this.collider.collide(v, sprite, righti * this.tilewidth, bottomi * this.tileheight,
      this.tilewidth, this.tileheight);

  }

  /**
   * Uzima pozicije platformi i sprema ih u niz.
   * @param {string} layerName Naziv layera u kojem su platforme.
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

} //// WorldMap

/**
 * Klasa: Layer
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

    //dodatno
    this.tilewidth = tilewidth;
    this.tileheight = tileheight;

    /** @type {Object.<number, Tile>}*/
    this.tiles = {};

    this.collectTiles(tilesets);

  } //// constructor

  /**
   * Provjerava sadrži li Layer u Tiled-u svojstvo class.
   * @returns {boolean}
   */
  isSprite() {
    return this.customProperty("class") != undefined;
  }

  /**
   * Skuplja informacije o Tile-ovima koji pripadaju Layer-u.
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
   * Vraća vrijednost stvojstva
   * @param  {string} name - Naziv svojstva.
   * @return Vrijednost svojstva ili undefined ako ne postoji.
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
   * Crta Layer.
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawLayer(ctx) {

    //GameSettings.colorLog("crtam layer " + this.name + " " + this.id, "info");

    for (let i = 0; i < this.data.length; i++) {
      const tileId = this.data[i];
      if (tileId == 0) continue;
      let tile = this.tiles[tileId];
      tile.x = (i % this.width) * tile.width;
      tile.y = Math.trunc(i / this.width) * tile.height;
      tile.drawTile(ctx);
    }
  }

} //// Layer

/**
 * Klasa: ObjectLayer
 * - ObjectLayer u Tiled-u je definiran drugačije.
 * - Koristi se za učitavanje informacija o objektima koji nemaju animacije.
 */
class ObjectLayer {
  /**
   * 
   * @param {Object} data Podaci iz Tiled-a
   * @param {Tileset[]} tilesets Niz tileset-ova
   */
  constructor(data, tw, th, tilesets) {

    this.name = data.name;
    this.type = data.type;
    this.objects = data.objects;
    this.tilesets = tilesets;
    this.tilewidth = tw;
    this.tileheight = th;

    this.properties = data.properties;
  } //// constructor

  /**
   * Vraća popis layera.
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

      // nađi tileset!!!
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
      // layers[obj.name] = layer;
      layer.name = obj.name;

      layer.properties = this.properties;
      layers.push(layer);
    }

    return layers;
  }
}

/**
 * Klasa: ObjectLayerItem
 * - Podaci koji se nalaze u objektima unutar ObjectLayer u Tiled-u.
 */
class ObjectLayerItem {
  constructor(data) {

    if (data.name == "") {
      GameSettings.colorLog("Ako ne upišete ime u Tiled-u, zapamtite da se layer zove prema ID-u koji je u Tiledu: " + data.id, "warning");
      console.warn(data);
      // throw "Morate upisati: name";
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
 * Klasa: Tileset
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

      /** @type {string} putanja do slike. */
      this.imageSrc = data.image;

      /** @type {Image} slika. */
      this.image = null;

      this.loadImage();
    }
  }

  /**
   * Učitava sliku.
   * - Učitavanje slika radi asinkrono.
   */
  loadImage() {
    let src = this.imageSrc;
    this.image = new Image();
    this.image.src = src;
    this.imageLoaded = false;
    this.image.addEventListener("load", () => {
      // nakon što se slika učita, postavlja info. da je učitana, kako bi mogli provjeriti
      this.imageLoaded = true;
    });
  }

  /**
   * Provjerava sadrži li Tileset Tile s unesenim ID-om.
   * @param {number} tileId id broj Tile-a
   * @returns {boolean} vraća true/false.
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

} //// Tileset

/**
 * Klasa: Tile
 */
class Tile {
  /**
   * @param {number} id ID Tile-a
   * @param {number} w širina Tile-a
   * @param {number} h visina Tile-a
   */
  constructor(id, w, h) {
    this.id = id;
    // this.layerIndex = layerIndex;
    // this.layerRow = r;
    // this.layerCol = c;
    //poz. na layeru
    this.x = 0;
    this.y = 0;

    this.width = w;
    this.height = h;

    /** @type {Tileset} Tileset kojem pripada */
    this.tileset = null;
  }

  /**
   * Indeks Tile-a u Tileset-u.
   * @return {number} Indeks u Tileset-u
   */
  get indexTs() {
    let i = this.id - this.tileset.firstgid;
    return i;
  }

  /**
   * @return {number} vraća redak Tileset-a u kojem se Tile nalazi
   */
  get tilesetRow() {
    let i = this.indexTs;
    return Math.trunc(i / this.tileset.columns);
  }

  /**
   * @return {number} vraća početnu poziciju (x koordinatu u pikselima) Tile-a na Tileset-u
   */
  get sx() {
    let tsCol = this.indexTs % this.tileset.columns;
    return tsCol * this.width;
  }

  /**
   * @return {number} vraća početnu poziciju (y koordinatu u pikselima) Tile-a na Tileset-u
   */
  get sy() {
    let tsRow = Math.trunc(this.indexTs / this.tileset.columns);
    return tsRow * this.height;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawTile(ctx) {
    // napomena: širina za crtanje se može razlikovati od širine sličice
    ctx.drawImage(this.tileset.image,
      this.sx, this.sy, this.width, this.height, // todo: početak i dimenzija na TS
      this.x, this.y, this.width, this.height); // na mapi
  }

} //// Tile

