'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _SimulationJs = require('./Simulation.js');

var _SimulationJs2 = _interopRequireDefault(_SimulationJs);

var sim = new _SimulationJs2['default']({
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

console.log('sim x', sim);