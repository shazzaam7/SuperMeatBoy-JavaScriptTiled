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


//events

let btnSetupGame = document.getElementById("btnSetupGame");
btnSetupGame.addEventListener("click", setup);
btnStart.addEventListener("click", startLevelAudio);
btnStop.addEventListener("click", stopLevelAudio);

function setup() {

  GAME.clearSprites();

  StaticObject.Selected = GAME.activeWorldMap.name;
  GameSettings.output(StaticObject.Selected);

  switch (StaticObject.Selected) {
    case "level1":
      setuplevel1();
      break;
    
    case "level2":
      setupLevel2();
      break;
    
    case "level3":
      setupLevel3();
    default:
      break;
  };

  render_main();
};

/* LEVELS */

function setuplevel1() {

  GAME.clearSprites();
  GAME.activeWorldMap.setCollisions("Floor");
  
  StaticObject.Meatboy = new MeatBoy(4*60, 18*60, GAME.getSpriteLayer("Meat"));
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

};

function setupLevel2() {

  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("Floor");
  
  StaticObject.Meatboy = new MeatBoy(12*60, 21*60, GAME.getSpriteLayer("Meat"));
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
};

function setupLevel3() {

  GAME.clearSprites();
  GAME.activeWorldMap.setCollisions("Floor");
  
  StaticObject.Meatboy = new MeatBoy(3*60, 22*60, GAME.getSpriteLayer("Meat"));
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
};