"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Building = function Building(options, personOptions, elevatorOptions) {
  _classCallCheck(this, Building);

  for (var key in options) {
    this[key] = options[key];
  }

  this.elevators = [];
  this.people = [];

  for (var i = 0; i < this.numElevators; i++) {
    this.elevators.push(new Elevator(elevatorOptions));
  }

  for (var i = 0; i < this.numPeople; i++) {
    this.people.push(new Person(personOptions));
  }
};