'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Utils = require('./Utils');

var _chance = require('chance');

var Elevator = (function () {
  function Elevator(options, n) {
    _classCallCheck(this, Elevator);

    this._state = 'waiting';
    this._currentFloor = 0;
    this._maxSpeed = options.maxSpeed;
    this._mode = options.mode;
    this._capacity = options.capacity;
    this._people = [];
    this._direction = 0;
    this._targetFloors = [];
    this._id = n;
    this._mock = new _chance.Chance();
    this._name = this._mock.first();
    this._numFloors = options.numFloors;
  }

  _createClass(Elevator, [{
    key: 'loadPassengers',
    value: function loadPassengers() {}
  }, {
    key: 'loadPassenger',
    value: function loadPassenger() {}
  }, {
    key: 'setMode',
    value: function setMode() {}
  }, {
    key: 'updateState',
    value: function updateState(state) {
      _Utils.Utils.log('Updating state to', state, this._people.length + ' people');
      this._state = state;
    }
  }, {
    key: 'travelOneTick',
    value: function travelOneTick() {

      if (this._currentFloor === 0 && this._people.length) {
        // at the bottom and people loaded
        this._direction = 1;
      } else if (this._currentFloor === this._numFloors) {
        // at the top
        this._direction = -1;
      } else if (this._currentFloor > 0 && !this._people.length) {
        // no people? go down
        this._direction = -1;
      }
      this._currentFloor += this._direction; // todo: use this._maxSpeed

      if (this._direction !== 0) {
        _Utils.Utils.log('***Elevator ' + this.name + ' (id:' + this.id + ') will now travel ' + (this.direction > 0 ? 'UP' : 'DOWN'));
      }
      _Utils.Utils.log('***Elevator ' + this.name + ' (id:' + this.id + ') is now at floor ' + this.currentFloor);
    }
  }, {
    key: 'setTargetFloors',
    value: function setTargetFloors(numFloors) {

      // for all the people in the elevator
      // traverse up floors and if someone wants to stop there, add it
      // then traverse down the floors (from the current floor) and add it
      var targetFloorsAbove = [];
      var targetFloorsBelow = [];

      // floors above
      for (var i = this._currentFloor; i <= numFloors; i++) {
        if (_lodash2['default'].find(this._people, { targetFloor: i })) {
          targetFloorsAbove.push(i);
        }
      }

      // floors below
      for (var i = this._currentFloor; i >= numFloors; i--) {
        if (_lodash2['default'].find(this._people, { targetFloor: i })) {
          targetFloorsBelow.push(i);
        }
      }

      this._targetFloors = targetFloorsAbove.concat(targetFloorsBelow);
      _Utils.Utils.log('*** Elevator ' + this.id + ' has set target floors ' + this._targetFloors.join(', '));
    }
  }, {
    key: 'loadPerson',
    value: function loadPerson(person) {
      this._people.push(person);
    }
  }, {
    key: 'unloadPerson',
    value: function unloadPerson() {
      var p = _lodash2['default'].last(this.getPeopleForFloor(this.currentFloor));
      if (typeof p === 'undefined') {
        return false;
      }
      this._people.pop();

      return p;
    }
  }, {
    key: 'getPeopleForFloor',
    value: function getPeopleForFloor(n) {
      return _lodash2['default'].filter(this._people, { targetFloor: n });
    }

    /**
     * Does the elevator have room for more people?
     * @return {Boolean} true if has room
     */
  }, {
    key: 'hasRoom',
    value: function hasRoom() {
      return this._people.length < this._capacity;
    }

    // ------ GETTERS ------
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    }
  }, {
    key: 'maxSpeed',
    get: function get() {
      return this._maxSpeed;
    }
  }, {
    key: 'currentFloor',
    get: function get() {
      return this._currentFloor;
    }
  }, {
    key: 'targetFloors',
    get: function get() {
      return this._targetFloors;
    }
  }, {
    key: 'numFloors',
    get: function get() {
      return this._numFloors;
    }
  }, {
    key: 'people',
    get: function get() {
      return this._people;
    }
  }, {
    key: 'direction',
    get: function get() {
      return this._direction;
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }]);

  return Elevator;
})();

exports['default'] = { Elevator: Elevator };
module.exports = exports['default'];