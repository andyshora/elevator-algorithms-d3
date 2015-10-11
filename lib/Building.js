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
      this._elevators.push(new _Elevator.Elevator(elevatorOptions, i));
    }

    for (var i = 0; i < this._numPeople; i++) {
      this._people.push(new _Person.Person(personOptions, i));
    }
  }

  _createClass(Building, [{
    key: 'workElevators',
    value: function workElevators(t) {
      _Utils.Utils.log('----------- begin tick ' + t + ' -------------');

      // elevators should travel on tick first
      for (var i = 0; i < this._elevators.length; i++) {
        this._elevators[i].travelOneTick();
      }

      // for each elevator
      // check if loading/unloading needs to be done
      for (var i = 0; i < this._elevators.length; i++) {
        var floor = this._elevators[i].currentFloor;

        // unload people from elevator if needed
        var p = undefined;
        var peopleForFloor = this._elevators[i].getPeopleForFloor(floor);

        if (peopleForFloor) {
          _Utils.Utils.log('Unloading elevator ' + i + ' at floor ' + floor, peopleForFloor);

          while (p = this._elevators[i].unloadPerson()) {
            _Utils.Utils.log('   ' + p.name + ' (id:' + p.id + ') got off');
            p.updateState(floor, 'resting');
          }
        }

        // do loading
        var peopleWaiting = this.getPeopleWaitingOnFloor(floor);

        if (peopleWaiting) {
          _Utils.Utils.log('There are ' + peopleWaiting.length + ' people waiting on floor ' + floor, peopleWaiting);
          var k = 0;
          while (this._elevators[i].hasRoom() && k < peopleWaiting.length) {
            _Utils.Utils.log('   ' + peopleWaiting[k].name + ' (id:' + peopleWaiting[k].id + ')');
            this._elevators[i].loadPerson(peopleWaiting[k]);
            peopleWaiting[k].updateState(floor, 'travelling');
            k++;
          }
        }

        this._elevators[i].updateState('starting');
      }

      // for each floor in the building
      /*for (let i = 0; i < this._numFloors; i++) {
        let people = this.getPeopleWaitingOnFloor(i);
        Utils.log(`There are ${people.length} people waiting on floor ${i}`, people);
         // if there's people waiting on this floor
        if (people.length) {
          let elevators = this.getElevatorsWaitingOnFloor(i);
          Utils.log(`There are ${elevators.length} elevators waiting on floor ${i}`, elevators);
          for (let j = 0; j < elevators.length; j++) {
              // unload people from elevator
            let p;
            Utils.log(`Unloading elevator ${j} at floor ${i}`);
             while (p = elevators[j].unloadPerson()) {
              Utils.log(`   ${p.name} (id:${p.id})`);
              p.updateState(i, 'resting');
            }
             // load people into elevators
            let k = 0;
            Utils.log(`Loading elevator ${j} at floor ${i}`);
             while (elevators[j].hasRoom() && (k < people.length)) {
              Utils.log(`   ${people[k].name} (id:${people[k].id})`);
              elevators[j].loadPerson(people[k]);
              people[k].updateState(i, 'travelling');
              k++;
            }
            if (!k) {
              Utils.log(`No elevators available on floor ${i}`);
            }
            elevators[j].updateState('starting');
           }
        } else {
          // Utils.log(`Nobody waiting on floor ${i}`);
        }
      }*/

      for (var i = 0; i < this._elevators.length; i++) {
        this._elevators[i].setTargetFloors(this._numFloors);
      }

      _Utils.Utils.log('----------- tick ' + t + ' over -------------');
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