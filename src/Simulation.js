import {Building} from './Building';

class Simulation {

  constructor(args) {
    this.tickFrequency = args.simulationOptions.tickFrequency;

    this.building = new Building(args.buildingOptions, args.personOptions, args.elevatorOptions);
  }

  /**
   * Process 1 tick of the simulation
   * This can be called via a 'play' loop
   * or manually for testing purposes
   * @return {void}
   */
  tick() {}


}

export default { Simulation };
