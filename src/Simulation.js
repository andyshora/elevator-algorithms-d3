import {Building} from './Building';
import {Viz} from './Viz';
import {Utils} from './Utils';
import _ from 'lodash';

class Simulation {

  constructor(args) {
    this._t = 0;
    this.tickTime = args.simulationOptions.tickTime;
    this.building = new Building(args.buildingOptions, args.personOptions, args.elevatorOptions);

    if (typeof window !== 'undefined') {
      this.viz = new Viz(args.vizOptions);
    }
  }

  setDebug(val) {
    Utils.setDebug(val);
  }

  start() {
    if (this.viz) {
      this.viz.animate();

    }
    // this.viz.addTestParticles();
  }

  // update viz
  onElevatorStateChanged(data) {
    this.viz.onElevatorStateChanged(data);
  }

  updatePosition(i) {
    this.viz.updateCubePosition(i);
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
    this.viz.onTick({
      floors: this.building.getFloorData()
    });
  }

  get currentTime() {
    return this._t;
  }

}

export default { Simulation };
