'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Elevator = (function () {
  function Elevator(options) {
    _classCallCheck(this, Elevator);

    this._state = 'resting';
    this._currentFloor = 0;
    this._maxSpeed = options.maxSpeed;
    this._mode = options.mode;
    this._capacity = options.capacity;
    this._people = [];
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
    key: 'travel',
    value: function travel() {}
  }, {
    key: 'setDirection',
    value: function setDirection() {}
  }, {
    key: 'setTarget',
    value: function setTarget() {}
  }, {
    key: 'loadPerson',
    value: function loadPerson(person) {
      this._people.push(person);
    }
  }, {
    key: 'unloadPerson',
    value: function unloadPerson() {
      var p = _.last(this._people);
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
    key: 'people',
    get: function get() {
      return this._people;
    }
  }]);

  return Elevator;
})();

exports['default'] = { Elevator: Elevator };
module.exports = exports['default'];