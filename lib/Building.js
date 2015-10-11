'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Elevator = require('./Elevator');

var _Person = require('./Person');

var _Utils = require('./Utils');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Building = (function () {
  function Building(options, personOptions, elevatorOptions) {
    _classCallCheck(this, Building);

    this._name = options.name;
    this._numFloors = options.numFloors;
    this._openingTime = options.openingTime;
    this._closingTime = options.closingTime;
    this._numElevators = options.numElevators;
    this._numPeople = options.numPeople;

    // contains elevators and people
    this._elevators = [];
    this._people = [];

    for (var i = 0; i < this._numElevators; i++) {
      this._elevators.push(new _Elevator.Elevator(elevatorOptions));
    }

    for (var i = 0; i < this._numPeople; i++) {
      this._people.push(new _Person.Person(personOptions, i));
    }
  }

  _createClass(Building, [{
    key: 'workElevators',
    value: function workElevators(t) {
      _Utils.Utils.log('workElevators', t);

      // for each floor in the building
      for (var i = 0; i < this._numFloors; i++) {
        var people = this.getPeopleWaitingOnFloor(i);
        _Utils.Utils.log('getPeopleWaitingOnFloor(' + i + ')', people);

        // if there's people waiting on this floor
        if (people.length) {
          var elevators = this.getElevatorsWaitingOnFloor(i);
          _Utils.Utils.log('getElevatorsWaitingOnFloor(' + i + ')', elevators);
          for (var j = 0; j < elevators.length; j++) {
            // if elevator has room
            var room = elevators[j].room;

            // unload people from elevator
            var p = undefined;
            while (p = elevators[j].unloadPerson()) {
              _Utils.Utils.log('unloading person', p);
              p.updateState(i, 'resting');
            }

            // load people into elevators
            var k = 0;
            while (elevators[j].hasRoom() && k < people.length) {
              _Utils.Utils.log('loading person', people[k]);
              elevators[j].loadPerson(people[k]);
              people[k].updateState(i, 'travelling');
              k++;
            }
            if (!k) {
              _Utils.Utils.log('No elevators available on floor ', i);
            }
            elevators[j].updateState('starting');
          }
        } else {
          _Utils.Utils.log('nobody waiting on floor', i);
        }
      }

      for (var i = 0; i < this._elevators.length; i++) {
        this._elevators[i].setTargetFloors(this._numFloors);
      }

      _Utils.Utils.log('----------- tick over -------------');
    }
  }, {
    key: 'getPeopleWaitingOnFloor',
    value: function getPeopleWaitingOnFloor(n) {
      return _lodash2['default'].filter(this._people, { currentFloor: n, state: 'waiting' });
    }
  }, {
    key: 'getElevatorsWaitingOnFloor',
    value: function getElevatorsWaitingOnFloor(n) {
      return _lodash2['default'].reject(_lodash2['default'].filter(this._elevators, { currentFloor: n, state: 'waiting' }), function (e) {
        return (/starting|stopping/g.test(e.state)
        );
      });
    }

    // ------ GETTERS ------
  }, {
    key: 'elevators',
    get: function get() {
      return this._elevators;
    }
  }, {
    key: 'people',
    get: function get() {
      return this._people;
    }
  }, {
    key: 'numPeople',
    get: function get() {
      return this._numPeople;
    }
  }, {
    key: 'numFloors',
    get: function get() {
      return this._numFloors;
    }
  }, {
    key: 'numElevators',
    get: function get() {
      return this._numElevators;
    }
  }, {
    key: 'openingTime',
    get: function get() {
      return this._openingTime;
    }
  }, {
    key: 'closingTime',
    get: function get() {
      return this._closingTime;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }]);

  return Building;
})();

exports['default'] = { Building: Building };
module.exports = exports['default'];