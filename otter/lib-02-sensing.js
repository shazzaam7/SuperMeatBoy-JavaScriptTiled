class Sensing {

  constructor() {
    this.left = new ButtonInput();
    this.right = new ButtonInput();
    this.up = new ButtonInput();
    this.down = new ButtonInput();

    this.space = new ButtonInput();
    this.keyA = new ButtonInput();
    this.keyD = new ButtonInput();
    this.keyW = new ButtonInput();
    this.keyS = new ButtonInput();
    this.leftShift = new ButtonInput();
    this.stop = new ButtonInput();

    /** @type {MouseInput} */
    this.mouse = new MouseInput();

    /** Ratio of the new map */
    this.ratioW = 1;
    this.ratioH = 1;

  }

  /**
   * Event handler
   * @param {MouseEvent} event 
   */
  mouseDown_eventHandler = (event) => {

    this.mouse.x = event.offsetX;
    this.mouse.y = event.offsetY;
    this.mouse.down = true;

    this.mouse.resizeX = Math.round(this.mouse.x / this.ratioW);
    this.mouse.resizeY = Math.round(this.mouse.y / this.ratioH);

  }

  /**
  * Event handler
  * @param {MouseEvent} event 
  */
  mouseUp_eventHandler = (event) => {
    this.mouse.x = event.offsetX;
    this.mouse.y = event.offsetY;
    this.mouse.down = false;

    this.mouse.resizeX = Math.round(this.mouse.x / this.ratioW);
    this.mouse.resizeY = Math.round(this.mouse.y / this.ratioH);

  }

  //? arrow
  keyDownUp_eventHandler = (event) => {
    this.keyDownUp_arrows(event.type, event.keyCode);
  }

  keyDownUp_arrows = function (type, key_code) {

    var down = (type == "keydown") ? true : false;

    switch (key_code) {

      case 37:
        this.left.getInput(down);
        break;
      case 38:
        this.up.getInput(down);
        break;
      case 39:
        this.right.getInput(down);
        break;
      case 40:
        this.down.getInput(down);
        break;
      case 27: //escape
        this.stop.getInput(down);
        break;
      case 32:
        this.space.getInput(down);
        break;
      case 65:
        this.keyA.getInput(down);
        break;
      case 68: //d
        this.keyD.getInput(down);
        break;
      case 87: //w
        this.keyW.getInput(down);
        break;
      case 83: //s
        this.keyS.getInput(down);
        break;
      case 16:
        this.leftShift.getInput(down);
        break;
      default:
        console.log(key_code);
        break;

    }

  };

  /**
   * Resets the state of the button if it stays active when the game ends
   */
  reset() {
    for (const key in this) {
      if (Object.hasOwnProperty.call(this, key)) {
        const v = this[key];
        if (v.active != undefined) v.active = false;
        if (v.down != undefined) v.down = false;
      }
    }
  }

};

class ButtonInput {
  constructor() {
    this.active = this.down = false;
  }

  getInput(down) {

    if (this.down != down) this.active = down;
    this.down = down;

  }
};

class MouseInput {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.down = false;

    this.resizeX = 0;
    this.resizeY = 0;
  }
}