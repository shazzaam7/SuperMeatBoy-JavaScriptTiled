/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>

/** @type {Sensing} */
var SENSING = null;

/** @type {Display} */
var DISPLAY = null;

/** @type {Game} */
var GAME = null;

/** @type {Engine} */
var ENGINE = null;

//! sučelje
const btnStart = document.getElementById("btnStart");
const btnStop = document.getElementById("btnStop");
const btnMaps = document.getElementById("btnMaps");
const canvasGame = document.getElementById("game");

//////////////////
//? FUNCTIONS ////
//////////////////

/**
 * Prilagođava veličinu canvasa.
 * @param {Event} event 
 */
function resize_main(event) {

  // visina izbornika
  let top = document.getElementById("divIzbornik").offsetHeight + 10;
  //top += document.getElementById("taInfo").offsetHeight;
  top += document.getElementsByClassName("infowrapper")[0].offsetHeight;

  if (GAME.activeWorldMap == null) return;

  DISPLAY.resize(document.documentElement.clientWidth - top, document.documentElement.clientHeight - top,
    GAME.activeWorldMap.widthPx, GAME.activeWorldMap.heightPx);
  DISPLAY.render();

  let tw = DISPLAY.context.canvas.width / GAME.activeWorldMap.width;
  let th = DISPLAY.context.canvas.height / GAME.activeWorldMap.height;
  SENSING.ratioW = tw / GAME.activeWorldMap.tilewidth;
  SENSING.ratioH = th / GAME.activeWorldMap.tileheight;

};

/**
 * Osvježava sliku.
 */
function render_main() {

  if (GAME.activeWorldMap == null) return;

  DISPLAY.drawMap(GAME.activeWorldMap);

  DISPLAY.render();

};

window.addEventListener("load", setupEnv_main);
function setupEnv_main() {

  "use strict";

  ////////////////
  //? OBJECTS ////
  ////////////////

  SENSING = new Sensing();
  DISPLAY = new Display(canvasGame);
  GAME = new Game();
  ENGINE = new Engine(1000 / 30, render_main, update_main);

  ///////////////////
  //? INITIALIZE ////
  ///////////////////

  GAME.loadWorldMaps(TileMaps); // učitava iz TiledExporta

  if (GAME.activeWorldMap == null) {
    DISPLAY.buffer.canvas.height = 10;
    DISPLAY.buffer.canvas.width = 20;
  }
  else {
    DISPLAY.buffer.canvas.height = GAME.activeWorldMap.heightPx;
    DISPLAY.buffer.canvas.width = GAME.activeWorldMap.widthPx;
  }

  ////////////////
  //? EVENTS /////
  ////////////////

  window.addEventListener("keydown", SENSING.keyDownUp_eventHandler);
  window.addEventListener("keyup", SENSING.keyDownUp_eventHandler);
  window.addEventListener("resize", resize_main);

  btnStart.addEventListener("click", btnStart_click);
  btnStop.addEventListener("click", btnStop_click);
  btnMaps.addEventListener("click", GameSettings.ChangeMap);
  document.getElementById("showOutput").addEventListener("change", showOutput_change);

  // mouse
  canvasGame.addEventListener("mousedown", SENSING.mouseDown_eventHandler);
  canvasGame.addEventListener("mouseup", SENSING.mouseUp_eventHandler);

} //// setupEnv

/**
 * Promjena stanja likova - interakcije
 */
function update_main() {

  // interakcije u igri

  if (GAME.activeWorldMap.sprites.length == 0) {
    throw "Nema spriteova!";
  }

  if (SENSING.right.active) {
    GAME.activeWorldMap.sprites[0].moveRight();
  }
  if (SENSING.up.active) {
    //GAME.activeWorldMap.sprites[0].moveUp();
    GAME.activeWorldMap.sprites[0].jump(50);
    console.log(GAME.activeWorldMap.sprites[0].jumping);
  }
  if (SENSING.left.active) {
    GAME.activeWorldMap.sprites[0].moveLeft();
  }
  if (SENSING.down.active) {
    GAME.activeWorldMap.sprites[0].moveDown();
  }

  if (SENSING.stop.active) {
    ENGINE.stop();
  }

  GAME.update();

};