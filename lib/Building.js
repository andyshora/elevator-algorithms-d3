'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Elevator = require('./Elevator');

var _Person = require('./Person');

var Building = function Building(options, personOptions, elevatorOptions) {
  _classCallCheck(this, Building);

  for (var key in options) {
    this[key] = options[key];
  }

  this.elevators = [];
  this.people = [];

  for (var i = 0; i < this.numElevators; i++) {
    this.elevators.push(new _Elevator.Elevator(elevatorOptions));
  }

  for (var i = 0; i < this.numPeople; i++) {
    this.people.push(new _Person.Person(personOptions));
  }
};

exports['default'] = { Building: Building };
module.exports = exports['default'];