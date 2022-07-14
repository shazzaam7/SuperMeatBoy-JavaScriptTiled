/// <reference path="lib-03-display.js"/>
/// <reference path="lib-04-engine.js"/>
/// <reference path="lib-06-main.js"/>

/**
 * Class: GameSettings
 * - Static Class for settings and functions.
 */
class GameSettings {
  /**
   * Change
   */
  static ChangeMap() {

    GameSettings.hideElement(this);

    DISPLAY.clear();

    let div = document.getElementById("divIzbornik");

    let sel = document.getElementById("selectMaps");
    if (sel != undefined)
      div.removeChild(sel); //ako postoji izbriši
    sel = document.createElement("select");
    sel.id = "selectMaps";
    let opt = document.createElement("option");
    opt.text = "Select level";
    opt.value = "";
    sel.appendChild(opt);
    div.appendChild(sel);

    for (const worldName in GAME.worlds) {
      if (Object.hasOwnProperty.call(GAME.worlds, worldName)) {
        // const w = GAME.worlds[worldName];
        opt = document.createElement("option");
        opt.text = worldName;
        opt.value = worldName;
        sel.appendChild(opt);
      }
    }
    sel.addEventListener("change", function () {
      if (this.value == "") return;

      let t = '<span class="emoji">&#128736;</span> Setup game: <b style="color: blue">x</b>';
      t = t.replace("x", this.value)
      document.getElementById("btnSetupGame").innerHTML = t;

      GAME.setActiveWorldMap(this.value);

      DISPLAY = new Display(document.querySelector("canvas"));
      DISPLAY.buffer.canvas.height = GAME.activeWorldMap.heightPx;
      DISPLAY.buffer.canvas.width = GAME.activeWorldMap.widthPx;

      resize_main();
      render_main();
      this.value = "";

    });
  } //// ChangeMap

  /**
   * Ispis tekstualne poruke na konzolu u različitim bojama.
   * @param {string} message Poruka koju ispisuje.
   * @param {string} color Vrsta poruke: 
   * - success: zelena
   * - info: plava
   * - error: crvena
   * - warning: narančasta
   */
  static colorLog(message, color) {

    color = color || "black";

    switch (color) {
      case "success":
        color = "Green";
        break;
      case "info":
        color = "DodgerBlue";
        break;
      case "error":
        color = "Red";
        break;
      case "warning":
        color = "Orange";
        break;
      default:
        color = color;
    }

    console.log("%c" + message, "color:" + color);
  } //// colorLog

  /**
   * Sakrij element.
   * @param {HTMLElement} element 
   */
  static hideElement(element) {
    element.style.display = "none";
  }

  /**
  * Sakrij element.
  * @param {HTMLElement} element 
  */
  static showElement(element) {
    element.style.display = "inline-block";
  }

  /**
  * @param  {string} text - Tekst koji se ispisuje.
  * @param  {boolean} reset - Hoće li se pobrisati postojeći (true/false).
  * Može se izostaviti.
  */
  static output(text, reset) {

    let info = document.getElementById("taInfo");

    if (reset) {
      info.innerHTML = text + "\n";
    } else {
      info.innerHTML += text + "\n";
    }

    resize_main();
  }

} //// GameSettings

//!----------- btnStart ----------------

/**
 * Event hanlder za btnStart.x
 */
function btnStart_click() {

  if (GAME.activeWorldMap == null) throw "Mapa nije učitana!";

  GameSettings.hideElement(StaticObject.StartGame);

  // ako postoji selectMaps, sakrij
  let selMaps = document.getElementById("selectMaps");
  if (selMaps)
    GameSettings.hideElement(selMaps);

  // provjeri veličinu
  resize_main();

  GameSettings.colorLog("Engine started", "success");
  ENGINE.start();
  
  GameSettings.output("Engine started", true);
}

//!----------- btnStop ----------------

/**
 * Event hanlder za btnStop.
 */
function btnStop_click() {

  ENGINE.stop();
  GameSettings.colorLog("Engine stopped", "warning");
  GameSettings.output("Engine stopped");
  SENSING.reset();

  if (GAME.activeWorldMap == null) throw "Mapa nije učitana!";

  GameSettings.showElement(StaticObject.StartGame);
  let selMaps = document.getElementById("selectMaps");

  if (selMaps)
    GameSettings.showElement(selMaps);

}

function showOutput_change(event) {
  resize_main();
}