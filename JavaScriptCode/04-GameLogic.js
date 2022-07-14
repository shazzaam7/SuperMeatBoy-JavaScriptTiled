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

  cycleTimer(); //Might disable because performance can tank sometimes

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
    deathCounterRating();
    StaticObject.Meatboy.deathcounter = 0;
    score();
    resetTimer();
    btnStop_click();
    StaticObject.SetupGame.click();
    stopLevelAudio();
  };

  for (let i = 0; i < StaticObject.SpinningSaw.length; i++) {
    if (StaticObject.Meatboy.touching(StaticObject.SpinningSaw[i])) {
      StaticObject.Meatboy.deathcounter++;
      resetTimer();
      if (Audio.deathSound.currentTime > 0) {
        Audio.deathSound.pause();
        Audio.deathSound.currentTime = 0;
        Audio.deathSound.play();
      } else {
        Audio.deathSound.play();
      }
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

function deathCounterRating() {
  switch (StaticObject.Meatboy.deathcounter) {
    case 0:
      GameSettings.output("Deaths: " + StaticObject.Meatboy.deathcounter + " (You are a beast! GG)");
      break;
    case 1: case 2: case 3:
      GameSettings.output("Deaths: " + StaticObject.Meatboy.deathcounter + " (Okay, not bad at all, but there's still room for improvement!)");
      break;
    case 4: case 5: case 6:
      GameSettings.output("Deaths: " + StaticObject.Meatboy.deathcounter + " (You can do better, FOCUS!)");
      break;
    default:
      Audio.RatingDeath.play();
      GameSettings.output("Deaths: " + StaticObject.Meatboy.deathcounter + " (I'll leave Gordon Ramsay to tell you. ;( ))");
      break;
  }
}