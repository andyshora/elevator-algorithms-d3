import {Building} from './Building';
import {D3Viz} from './D3Viz';
import {Utils} from './Utils';
import _ from 'lodash';

class Simulation {

  constructor(args) {
    console.log('Simulation constructor', args);
    this._t = 0;
    this.tickTime = args.simulationOptions.tickTime;
    this.building = new Building(args.buildingOptions, args.personOptions, args.elevatorOptions);

    if (typeof window !== 'undefined') {
      this.viz = new D3Viz(args);
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
    if (this.viz) {
      this.viz.onElevatorStateChanged(data);
    }
  }

  updatePosition(i) {
    if (this.viz) {
      this.viz.updateCubePosition(i);
    }
  }

  runFor(i) {
    let j = 0;
    let interval = setInterval(() => {
      this.tick();
      j++;
      if (j > i) {

        var waitTime = this.getAvgWaitTime();
        console.log('Avg wait time: ' + waitTime + ' ticks');
        clearInterval(interval);
      }
    }, this.tickTime);
  }

  getAvgWaitTime() {
    return this.building.getAvgWaitTime();
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

    if (this.viz) {
      this.viz.onTick({
        floors: this.building.getFloorData()
      });
    }

  }

  get currentTime() {
    return this._t;
  }

}

export default { Simulation };
