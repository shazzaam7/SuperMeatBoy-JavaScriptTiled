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
    default:
      break;
  };
  
  GAME.update();
  
};

function characterControl() {

  cycleTimer();
  
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
    btnSetupGame.click();
    stopLevelAudio();
  };

  for (let i = 0; i < StaticObject.SpinningSaw.length; i++) {
    if (StaticObject.Meatboy.touching(StaticObject.SpinningSaw[i])) {
      resetTimer();
      Audio.deathSound.play();
    switch (GAME.activeWorldMap.name) {
      case "level1":
        StaticObject.Meatboy.start(4*60, 18*60);
        break;
      case "level2":
        StaticObject.Meatboy.start(12*60, 21*60);
        break;
      case "level3":
        StaticObject.Meatboy.start(3*60,22*60);
        break;
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