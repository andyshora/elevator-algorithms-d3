'use strict';

var _SimulationJs = require('./Simulation.js');

var sim = new _SimulationJs.Simulation({
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
    maxSpeed: 0.5,
    mode: 'normal'
  },
  personOptions: {
    startTime: 9,
    finishTime: 18
  }
});

console.log('simulation', sim);

sim.runFor(10);