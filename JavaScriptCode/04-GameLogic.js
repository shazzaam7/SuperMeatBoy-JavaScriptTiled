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
/// <reference path="05-Stopwatch.js"/>

function update_main() {
  switch (GAME.activeWorldMap.name) {
    case "level1":
      characterControl();
      break;
    case "level2":
      characterControl();
      break;
    case "level3":
      characterControl();
      break;
    case "level4":
      characterControl();
      sawMovement();
      break;
    default:
      break;
  };

  GAME.update();

};

/**
 * Universal function that holds everything about character movement and interactions with other objects
 */
function characterControl() {

  //Disabled until performance issues are fixed which are caused by the frameworks own internal timer. Might need to implement it into the framework itself
  //cycleTimer();

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
    Stopwatch.startTimer = false;
    resetTimer();
    btnStop_click();
    StaticObject.SetupGame.click();
    stopLevelAudio();
  };

  for (let i = 0; i < StaticObject.SpinningSaw.length; i++) {
    if (StaticObject.Meatboy.touching(StaticObject.SpinningSaw[i])) {
      resetTimer();
      Audio.deathSound.play();
      switch (GAME.activeWorldMap.name) {
        case "level1":
          StaticObject.Meatboy.start(4 * 60, 18 * 60);
          break;
        case "level2":
          StaticObject.Meatboy.start(12 * 60, 21 * 60);
          break;
        case "level3":
          StaticObject.Meatboy.start(3 * 60, 22 * 60);
          break;
        case "level4":
          StaticObject.Meatboy.start(2 * 60, 22 * 60);
        default:
          break;
      };
    };
  };

  for (let i = 0; i < StaticObject.Wall.length; i++) {
    if (StaticObject.Meatboy.touching(StaticObject.Wall[i])) {
      if (SENSING.up.active) {
        StaticObject.Meatboy.jumping = true;
      } else {
        StaticObject.Meatboy.jumping = false;
      };
    };
  };
};

function sawMovement() {
  if (SENSING.keyD.active) {
    StaticObject.SpinningSaw[2].move = true;
    StaticObject.SpinningSaw[2].limit = 300;
    if (StaticObject.SpinningSaw[2].distance == StaticObject.SpinningSaw[2].limit) {
      if (StaticObject.SpinningSaw[2].direction == 90) {
        StaticObject.SpinningSaw[2].direction == 180;
        StaticObject.SpinningSaw[2].distance = 0;
      } else if (StaticObject.SpinningSaw[2].direction == 180) {
        StaticObject.SpinningSaw[2].direction == 90;
        StaticObject.SpinningSaw[2].distance = 0;
      }
    }
  }
}