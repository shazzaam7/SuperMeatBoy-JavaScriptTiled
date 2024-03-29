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
/// <reference path="05-Stopwatch.js"/>


//event listeners
window.addEventListener("keydown",
  function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  });

StaticObject.SetupGame.addEventListener("click", setup);
StaticObject.StartGame.addEventListener("click", startLevelAudio);
StaticObject.StopGame.addEventListener("click", stopLevelAudio);

function startTimer() {
  Stopwatch.startTimer = true;
}

function stopTimer() {
  Stopwatch.startTimer = false;
}

/**
 * Function to setup the levels of the game
 */
function setup() {

  GAME.clearSprites();
  StaticObject.SpinningSaw = [];
  StaticObject.Wall = [];
  StaticObject.Selected = GAME.activeWorldMap.name;
  resetTimer();
  GameSettings.output(StaticObject.Selected);
  setupLevel();
  if (StaticObject.Meatboy.deathcounter != 0) {
    StaticObject.Meatboy.deathcounter = 0;
  }

  render_main();
};

/**
 * Function to setup levels
 */
function setupLevel() {
  GAME.clearSprites();
  GAME.activeWorldMap.setCollisions("Floor");
  switch (StaticObject.Selected) {
    case "level1":
      StaticObject.Meatboy = new MeatBoy(4 * 60, 18 * 60, GAME.getSpriteLayer("Meat"));
      GAME.addSprite(StaticObject.Meatboy);

      StaticObject.Goal = new Goal(GAME.getSpriteLayer("Bandage"));
      GAME.addSprite(StaticObject.Goal);

      for (let index = 0; index < 1; index++) {
        let id = index + 1;
        StaticObject.SpinningSaw[index] = new Enemy(GAME.getSpriteLayer("Saw" + id));
        GAME.addSprite(StaticObject.SpinningSaw[index]);
      }

      for (let index = 0; index < 5; index++) {
        let i = index + 1;
        StaticObject.Wall[index] = new Wall(GAME.getSpriteLayer("W" + i));
        GAME.addSprite(StaticObject.Wall[index]);
      }
      break;
    case "level2":
      StaticObject.Meatboy = new MeatBoy(12 * 60, 21 * 60, GAME.getSpriteLayer("Meat"));
      GAME.addSprite(StaticObject.Meatboy);

      StaticObject.Goal = new Goal(GAME.getSpriteLayer("Bandage"));
      GAME.addSprite(StaticObject.Goal);

      for (let index = 0; index < 3; index++) {
        let id = index + 1;
        StaticObject.SpinningSaw[index] = new Enemy(GAME.getSpriteLayer("Saw" + id));
        GAME.addSprite(StaticObject.SpinningSaw[index]);
      }

      for (let index = 0; index < 5; index++) {
        let i = index + 1;
        StaticObject.Wall[index] = new Wall(GAME.getSpriteLayer("W" + i));
        GAME.addSprite(StaticObject.Wall[index]);
      }
      break;
    case "level3":
      GAME.clearSprites();
      GAME.activeWorldMap.setCollisions("Floor");

      StaticObject.Meatboy = new MeatBoy(3 * 60, 22 * 60, GAME.getSpriteLayer("Meat"));
      GAME.addSprite(StaticObject.Meatboy);

      StaticObject.Goal = new Goal(GAME.getSpriteLayer("Bandage"));
      GAME.addSprite(StaticObject.Goal);

      for (let index = 0; index < 5; index++) {
        let id = index + 1;
        StaticObject.SpinningSaw[index] = new Enemy(GAME.getSpriteLayer("Saw" + id));
        GAME.addSprite(StaticObject.SpinningSaw[index]);
      }

      for (let index = 0; index < 5; index++) {
        let i = index + 1;
        StaticObject.Wall[index] = new Wall(GAME.getSpriteLayer("W" + i));
        GAME.addSprite(StaticObject.Wall[index]);
      }
      break;
    case "level4":
      StaticObject.Meatboy = new MeatBoy(2 * 60, 22 * 60, GAME.getSpriteLayer("Meat"));
      GAME.addSprite(StaticObject.Meatboy);

      StaticObject.Goal = new Goal(GAME.getSpriteLayer("Bandage"));
      GAME.addSprite(StaticObject.Goal);

      for (let index = 0; index < 6; index++) {
        let i = index + 1;
        StaticObject.Wall[index] = new Wall(GAME.getSpriteLayer("W" + i));
        GAME.addSprite(StaticObject.Wall[index]);
      }

      for (let index = 0; index < 9; index++) {
        let id = index + 1;
        StaticObject.SpinningSaw[index] = new Enemy(GAME.getSpriteLayer("Saw" + id));
        GAME.addSprite(StaticObject.SpinningSaw[index]);
      }
      break;
    default:
      break;
  }
}