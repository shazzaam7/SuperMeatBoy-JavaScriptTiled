/// <reference path="lib-01-tiled.js"/>

/**
 * Klasa: Display
 */
class Display {
  /**
   * @param  {HTMLCanvasElement} canvas - Canvas.
   */
  constructor(canvas) {

    this.buffer = document.createElement("canvas").getContext("2d");
    this.context = canvas.getContext("2d");

  }

  /**
   * Crta mapu napravljeno pomoću Tiled-a.
   * @param  {WorldMap} map - Mapa
   */
  drawMap(map) {

    for (let i = 0; i < map.layers.length; i++) {
      const layer = map.layers[i];
      if (layer.isSprite()) {
        map.sprites.forEach(s => {
          if (s.layer.visible) this.drawSprite(s);
        });
      }
      else {
        if (layer.visible)
          layer.drawLayer(this.buffer);
      }
    }

  };

  /**
   * Crta bilo koji objekt.
   */
  drawObject(image, source_x, source_y, destination_x, destination_y, width, height) {
    this.buffer.drawImage(image, source_x, source_y, width, height, Math.round(destination_x), Math.round(destination_y), width, height);
  }


  /**
   * Crta objekt.
   * @param  {Sprite} sprite - Pravokutnik s koordinatama i dim.
   */
  drawSprite(sprite) {

    let tile = sprite.myTile(2);
    if (sprite.frame_value != undefined) {
      tile = sprite.myTile(sprite.frame_value); //! Ovo sad radi
    }

    if (tile == undefined || tile == null) {
      this.buffer.fillStyle = "green";
      this.buffer.fillRect(Math.round(sprite.x), Math.round(sprite.y), sprite.width, sprite.height);
    }
    else {
      // koordinate na tilesetu
      // let posX = (tile.colX % sprite.layer.widthCols) * tile.width;
      // let posY = Math.trunc(tile.rowY / sprite.layer.widthCols) * tile.height;

      this.buffer.drawImage(tile.tileset.image, tile.sx, tile.sy, tile.width, tile.height, sprite.x, sprite.y, sprite.width, sprite.height);

      if (sprite.okvir) {
        this.buffer.beginPath();
        this.buffer.rect(sprite.x, sprite.y, sprite.width, sprite.height);
        this.buffer.stroke();
      }
    }
    // this.buffer.fillStyle = color2;
    // this.buffer.fillRect(Math.round(rectangle.x + 2), Math.round(rectangle.y + 2), rectangle.width - 4, rectangle.height - 4);

  };

  drawRect(x, y, w, h) {
    this.context.fillStyle = "green";
    this.context.fillRect(Math.round(x), Math.round(y), w, h);
  }

  /**
   * Prilagođava dimenziju canvasa vidljivom području na ekranu.
   * @param  {number} width - Širina na koju se mora prilagoditi.
   * @param  {number} height - Visina na koju se mora prilagoditi.
   * @param  {number} mapWidthPx - Širina mape u pikselima.
   * @param  {number} mapHeightPx - Visina mape u pikselima.
   */
  resize(width, height, mapWidthPx, mapHeightPx) {

    let newHeight, newWidth;

    let ratio = mapWidthPx / mapHeightPx;

    if (width / height < ratio) {
      newHeight = Math.floor(width / ratio);
      newWidth = width;
    }
    else {
      newWidth = Math.floor(height * ratio);
      newHeight = height;
    }

    let c = this.context.canvas;
    c.height = newHeight;
    c.width = newWidth;
    this.context.imageSmoothingEnabled = false;

  }

  /**
   * Crta image iz buffer.canvas na vidljivi canvas.
   */
  render() {

    this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0,
      this.context.canvas.width, this.context.canvas.height);
  }

  /**
   * Briše sadržaj iz buffera za crtanje.
   */
  clear() {
    this.buffer.clearRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

} //// Display
