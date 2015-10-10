import {Building} from './Building';

class Simulation {

  constructor(args) {
    this._t = 0;
    this.tickTime = args.simulationOptions.tickTime;
    this.building = new Building(args.buildingOptions, args.personOptions, args.elevatorOptions);
  }

  runFor(i) {
    let j = 0;
    let interval = setInterval(() => {
      this.tick();
      j++;
      if (j > i) {
        clearInterval(interval);
      }
    }, this.tickTime);
  }

  /**
   * Process 1 tick of the simulation
   * This can be called via a 'play' loop
   * or manually for testing purposes
   * @return {void}
   */
  tick() {
    this.building.workElevators(this.currentTime);
    this._t++;
  }

  get currentTime() {
    return this._t;
  }

}

export default { Simulation };
