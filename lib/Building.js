'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Elevator = require('./Elevator');

var _Person = require('./Person');

var Building = (function () {
  function Building(options, personOptions, elevatorOptions) {
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
  }

  _createClass(Building, [{
    key: 'workElevators',
    value: function workElevators(t) {}
  }]);

  return Building;
})();

exports['default'] = { Building: Building };
module.exports = exports['default'];