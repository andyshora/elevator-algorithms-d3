class Simulation {

  constructor(args) {
    this.tickFrequency = args.simulationOptions.tickFrequency;

    this.building = new Building(args.buildingOptions, args.personOptions, args.elevatorOptions);
  }


}
