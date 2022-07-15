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

    let div = document.getElementById("divMainMenu");

    let sel = document.getElementById("selectMaps");
    if (sel != undefined) {
      div.removeChild(sel);
    } // If it exists, delete it because it's not needed anymore
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
   * Prints message in colours
   * @param {string} message Printed Message
   * @param {string} color Type of message 
   * - success: green
   * - info: blue
   * - error: red
   * - warning: orange
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
  }

  /**
   * Hide element
   * @param {HTMLElement} element 
   */
  static hideElement(element) {
    element.style.display = "none";
  }

  /**
  * Hide element
  * @param {HTMLElement} element 
  */
  static showElement(element) {
    element.style.display = "inline-block";
  }

  /**
  * @param  {string} text - Message which will be printed
  * @param  {boolean} reset - Will it delete already printed messages?
  * Can be left out
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

}

//!----------- btnStart ----------------

/**
 * Event for Start button
 */
function btnStart_click() {

  if (GAME.activeWorldMap == null) throw "Mapa nije učitana!";

  GameSettings.hideElement(StaticObject.StartGame);

  // If Select Maps exists, hide it
  let selMaps = document.getElementById("selectMaps");
  if (selMaps)
    GameSettings.hideElement(selMaps);

  // Check the size
  resize_main();

  GameSettings.colorLog("Engine started", "success");
  ENGINE.start();
  
  GameSettings.output("Engine started", true);
}

//!----------- btnStop ----------------

/**
 * Event for Stop button
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