var sim = new Simulation({
  simulationOptions: {
    tickFrequency: 1000
  },
  buildingOptions: {
    name: 'QB',
    numFloors: 4,
    openingTime: 9,
    closingTime: 18,
    numElevators: 1,
    numPeople: 20
  },
  elevatorOptions: {
    maxSpeed: 0.5
  },
  personOptions: {
    startTime: 9,
    finishTime: 18
  }
});

console.log('sim', sim);
