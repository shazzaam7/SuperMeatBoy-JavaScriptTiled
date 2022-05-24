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


//events
let nextLevel = new Event("nextLevel");

let btnSetupGame = document.getElementById("btnSetupGame");
let btnNext = document.getElementById("btnNext");
btnSetupGame.addEventListener("click", setup);
btnNext.addEventListener("nextLevel", next);

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
    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
      break;
  };

  render_main();
};

function next() {
  btnStop_click();
  StaticObject.Selected = "level2";
  setupLevel2();
  btnStart_click();
}

/* LEVELS */

function setuplevel1() {

  GAME.clearSprites();
  GAME.activeWorldMap.setCollisions("Floor");
  
  StaticObject.Meatboy = new MeatBoy(4*60, 18*60, GAME.getSpriteLayer("Meat"));
  GAME.addSprite(StaticObject.Meatboy);

  StaticObject.Goal = new Goal(GAME.getSpriteLayer("Bandage"));
  GAME.addSprite(StaticObject.Goal);

  for (let index1 = 0; index1 < 1; index1++) {
    let id = index1 + 1;
    StaticObject.SpinningSaw[index1] = new Enemy(GAME.getSpriteLayer("Saw" + id));
    GAME.addSprite(StaticObject.SpinningSaw[index1]);
  }

  for (let index = 0; index < 5; index++) {
    let i = index + 1;
    StaticObject.Wall[index] = new Wall(GAME.getSpriteLayer("W" + i));
    GAME.addSprite(StaticObject.Wall[index]);
  }

};

function setupLevel2() {

  GAME.clearSprites();

  alert("Novi Level!");

  GAME.activeWorldMap.setCollisions("Floor");
  
  StaticObject.Meatboy = new MeatBoy(12*60, 21*60, GAME.getSpriteLayer("Meat"));
  GAME.addSprite(StaticObject.Meatboy);

  StaticObject.Goal = new Goal(GAME.getSpriteLayer("Bandage"));
  GAME.addSprite(StaticObject.Goal);

  for (let index1 = 0; index1 < 3; index1++) {
    let id = index1 + 1;
    StaticObject.SpinningSaw[index1] = new Enemy(GAME.getSpriteLayer("Saw" + id));
    GAME.addSprite(StaticObject.SpinningSaw[index1]);
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
  
  StaticObject.Meatboy = new MeatBoy(12*60, 21*60, GAME.getSpriteLayer("Meat"));
  GAME.addSprite(StaticObject.Meatboy);

  StaticObject.Goal = new Goal(GAME.getSpriteLayer("Bandage"));
  GAME.addSprite(StaticObject.Goal);
};