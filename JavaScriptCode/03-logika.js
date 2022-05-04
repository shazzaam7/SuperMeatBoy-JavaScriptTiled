//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

/// <reference path="01-likovi.js"/>
/// <reference path="02-postavke.js"/>

function update_main() {
  
  switch (GAME.activeWorldMap.name) {
    case "level1":
      level1();
      break;
  
    default:
      break;
  }
  
  GAME.update();
  
};

function level1() {
  
  if (SENSING.left.active) {
    Staticka.meatboy.moveLeft();
  }

  if (SENSING.right.active) {
    Staticka.meatboy.moveRight();
  }

  if (SENSING.up.active) {
    Staticka.meatboy.jump();
  }
};