/// <reference path="lib-01-tiled.js"/>

/**
 * Class: Display
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
   * Draws the map that was made using Tiled
   * @param  {WorldMap} map - The map
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
   * Draws any object
   */
  drawObject(image, source_x, source_y, destination_x, destination_y, width, height) {
    this.buffer.drawImage(image, source_x, source_y, width, height, Math.round(destination_x), Math.round(destination_y), width, height);
  }


  /**
   * Draws the Sprite
   * @param  {Sprite} sprite - Rectangle with coordinates & dimensions
   */
  drawSprite(sprite) {

    let tile = sprite.myTile(2);
    if (sprite.frame_value != undefined) {
      tile = sprite.myTile(sprite.frame_value); 
    }

    if (tile == undefined || tile == null) {
      this.buffer.fillStyle = "green";
      this.buffer.fillRect(Math.round(sprite.x), Math.round(sprite.y), sprite.width, sprite.height);
    }
    else {
      // Coordinates on the Tileset
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
   * Adjusts the dimension of the canvas to the visible area on the display
   * @param  {number} width - Width for adjusting
   * @param  {number} height - Height for adjusting
   * @param  {number} mapWidthPx - Width of the map in pixels
   * @param  {number} mapHeightPx - Height of the map in pixel
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
   * Draws the image from buffer.canvas on the visible canvas
   */
  render() {

    this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0,
      this.context.canvas.width, this.context.canvas.height);
  }

  /**
   * Delets the content from buffer for drawing
   */
  clear() {
    this.buffer.clearRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

} //// Display
