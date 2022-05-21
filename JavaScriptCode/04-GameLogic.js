//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

/// <reference path="01-Characters.js"/>
/// <reference path="02-Audio.js"/>
/// <reference path="03-Settings.js"/>

function update_main() {
  
  switch (GAME.activeWorldMap.name) {
    case "level1":
      characterControl();
      break;
    case "level2":
      characterControl();
      break;
    /*case "level3":
      characterControl();
      break;*/
    default:
      break;
  };
  
  GAME.update();
  
};

function characterControl() {
  
  if (SENSING.left.active) {
    StaticObject.Meatboy.moveLeft();
  };

  if (SENSING.right.active) {
    StaticObject.Meatboy.moveRight();
  };

  if (SENSING.up.active) {
    StaticObject.Meatboy.jump();
  };

  if (StaticObject.Meatboy.touching(StaticObject.Goal)) {
    btnNext.dispatchEvent(nextLevel);
  };

  for (let index1 = 0; index1 < StaticObject.SpinningSaw.length; index1++) {
    if (StaticObject.Meatboy.touching(StaticObject.SpinningSaw[index1])) {
      Audio.deathSound.play();
    switch (GAME.activeWorldMap.name) {
      case "level1":
        StaticObject.Meatboy.start(4*60, 18*60);
        break;
      case "level2":
        StaticObject.Meatboy.start(12*60, 21*60);
      default:
        break;
      };
    };
  };

  for (let index2 = 0; index2 < StaticObject.Wall.length; index2++) {
    if (StaticObject.Meatboy.touching(StaticObject.Wall[index2])) {
      if (SENSING.up.active) {
        StaticObject.Meatboy.jumping = true;
      } else {
        StaticObject.Meatboy.jumping = false;
      }
    }
  }
};

function characterControl2() {
  
  if (SENSING.left.active) {
    StaticObject.Meatboy.moveLeft();
  };

  if (SENSING.right.active) {
    StaticObject.Meatboy.moveRight();
  };

  if (SENSING.up.active) {
    StaticObject.Meatboy.jump();
  };

  if (StaticObject.Meatboy.touching(StaticObject.Goal)) {
    console.log("Touching");
  };

  for (let index = 0; index < StaticObject.SpinningSaw.length; index++) {
    if (StaticObject.Meatboy.touching(StaticObject.SpinningSaw[index])) {
      Audio.deathSound.play();
    switch (GAME.activeWorldMap.name) {
      case "level1":
        StaticObject.Meatboy.start(4*60, 18*60);
        break;
      case "level2":
        StaticObject.Meatboy.start(12*60, 21*60);
      default:
        break;
      };
    };
  };
  for (let index = 0; index < StaticObject.Wall.length; index++) {
    if (StaticObject.Meatboy.touching(StaticObject.Wall[index])) {
      if (SENSING.up.active) {
        StaticObject.Meatboy.jumping = true;
      } else {
        StaticObject.Meatboy.jumping = false;
      };
    };
  };
};