"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Simulation = function Simulation(args) {
  _classCallCheck(this, Simulation);

  this.tickFrequency = args.simulationOptions.tickFrequency;

  this.building = new Building(args.buildingOptions, args.personOptions, args.elevatorOptions);
};