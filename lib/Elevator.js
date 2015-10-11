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

var Elevator = (function () {
  function Elevator(options) {
    _classCallCheck(this, Elevator);

    this._state = 'waiting';
    this._currentFloor = 0;
    this._maxSpeed = options.maxSpeed;
    this._mode = options.mode;
    this._capacity = options.capacity;
    this._people = [];
    this._direction = 0;
    this._targetFloors = [];
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
    key: 'setDirection',
    value: function setDirection() {}
  }, {
    key: 'setTargetFloors',
    value: function setTargetFloors(numFloors) {
      if (this._currentFloor === 0) {
        this._direction = 1;
      }

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
      _Utils.Utils.log('targetFloors', this._targetFloors);
    }
  }, {
    key: 'loadPerson',
    value: function loadPerson(person) {
      this._people.push(person);
    }
  }, {
    key: 'unloadPerson',
    value: function unloadPerson() {
      var p = _lodash2['default'].last(this._people);
      if (typeof p === 'undefined') {
        return false;
      }
      this._people.pop();

      return p;
    }
  }, {
    key: 'getPeopleTravellingToCurrentFloor',
    value: function getPeopleTravellingToCurrentFloor() {
      var arr = [];
      for (var i = 0; i < this._people; i++) {
        arr.push(this._people[i]);
      }
      return arr;
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
    key: 'people',
    get: function get() {
      return this._people;
    }
  }, {
    key: 'direction',
    get: function get() {
      return this._direction;
    }
  }]);

  return Elevator;
})();

exports['default'] = { Elevator: Elevator };
module.exports = exports['default'];