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

//////////////////
//? FUNCTIONS ////
//////////////////

/**
 * Adjusts the size of the canvas
 * @param {Event} event 
 */
function resize_main(event) {

  // Height of the menu
  let top = document.getElementById("divMainMenu").offsetHeight + 10;
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
 * Refreshes the image
 */
function render_main() {

  if (GAME.activeWorldMap == null) return;
  
  if (StaticObject.StopwatchButton.checked) {
    StaticObject.StartGame.addEventListener("click", startTimer);
    StaticObject.StopGame.addEventListener("click", stopTimer);
    document.getElementById("taInfo").removeAttribute("hidden");
  } else {
    StaticObject.StartGame.removeEventListener("click", startTimer);
    StaticObject.StopGame.removeEventListener("click", stopTimer);
    document.getElementById("taInfo").setAttribute("hidden", true);
  }

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
  DISPLAY = new Display(StaticObject.canvasGame);
  GAME = new Game();
  ENGINE = new Engine(1000 / 30, render_main, update_main);

  ///////////////////
  //? INITIALIZE ////
  ///////////////////

  GAME.loadWorldMaps(TileMaps); // Loades from TileExport

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

  StaticObject.StartGame.addEventListener("click", btnStart_click);
  StaticObject.StopGame.addEventListener("click", btnStop_click);
  StaticObject.MapsButton.addEventListener("click", GameSettings.ChangeMap);

  // mouse
  StaticObject.canvasGame.addEventListener("mousedown", SENSING.mouseDown_eventHandler);
  StaticObject.canvasGame.addEventListener("mouseup", SENSING.mouseUp_eventHandler);

}