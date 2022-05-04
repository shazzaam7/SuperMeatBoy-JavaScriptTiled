/**
 * Klasa: Engine
 */
class Engine {

  constructor(time_step, renderFunction, updateFunction) {

    this.accumulated_time = 0; // Amount of time that's accumulated since the last update.
    this.animationFrameRequest_ID = undefined; // reference to the AFR
    this.time = undefined; // The most recent timestamp of loop execution.
    this.time_step = time_step; // 1000/30 = 30 frames per second

    this.updated = false; // Whether or not the update function has been called since the last cycle.

    this.update = updateFunction; // The update function
    this.render = renderFunction; // The render function

    //arrow funkcija kako bi moglo raditi za event handler
    //! arrow
    this.handleRun = (time_step) => {
      this.runLoop(time_step);  //? this se odnosi na engine
    };

    this.START = false;

  } //// constructor

  /**
   * Game loop
   * @param  {number} time_stamp - Vrijeme ...?
   */
  runLoop(time_stamp) { // This is one cycle of the game loop

    this.accumulated_time += time_stamp - this.time;
    this.time = time_stamp;

    if (this.accumulated_time >= this.time_step * 3) {

      this.accumulated_time = this.time_step;

    }

    while (this.accumulated_time >= this.time_step) {

      this.accumulated_time -= this.time_step;

      this.update(time_stamp);

      this.updated = true; // If the game has updated, we need to draw it again.

    }

    /* This allows us to only draw when the game has updated. */
    if (this.updated) {

      this.updated = false;
      this.render(time_stamp);

    }

    if (this.START)
      this.animationFrameRequest_ID = window.requestAnimationFrame(this.handleRun);

  }; //// run

  /**
   * Pokreće engine (loop).
   */
  start() {

    this.START = true;

    this.accumulated_time = this.time_step;
    this.time = window.performance.now();

    this.animationFrameRequest_ID = window.requestAnimationFrame(this.handleRun);

  } //// start
  /**
   * Zaustavlja animation frame pomoću cancelAnimationFrame. Mora imati id od AFR.
   */
  stop() {
    this.START = false;
    window.cancelAnimationFrame(this.animationFrameRequest_ID);
  } //// stop

} //// Engine

