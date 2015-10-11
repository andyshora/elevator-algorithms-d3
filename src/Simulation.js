import {Building} from './Building';
import {Viz} from './Viz';

class Simulation {

  constructor(args) {
    this._t = 0;
    this.tickTime = args.simulationOptions.tickTime;
    this.building = new Building(args.buildingOptions, args.personOptions, args.elevatorOptions);

    if (typeof window !== 'undefined') {
      // this.viz = new Viz();
    }
  }

  start() {
    if (this.viz) {
      this.viz.animate();

    }
    // this.viz.addTestParticles();
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
