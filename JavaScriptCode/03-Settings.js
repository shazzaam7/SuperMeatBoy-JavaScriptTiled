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

let btnSetupGame = document.getElementById("btnSetupGame");
btnSetupGame.addEventListener("click", setup);

function setup() {

  GAME.clearSprites();

  let odabrana = GAME.activeWorldMap.name;
  GameSettings.output(odabrana);

  switch (odabrana) {
    case "level1":
      setuplevel1();
      break;

    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
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

  StaticObject.SpinningSaw = new Enemy(GAME.getSpriteLayer("Saw"));
  GAME.addSprite(StaticObject.SpinningSaw);
};