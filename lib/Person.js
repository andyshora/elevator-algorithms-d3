'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chance = require('chance');

var Person = (function () {
  function Person(options, n) {
    _classCallCheck(this, Person);

    this._startTime = options.startTime;
    this._finishTime = options.finishTime;
    this._state = 'waiting'; // all people are initially waiting on ground floor
    this._currentFloor = 0;
    this._targetFloor = 2;

    this._mock = new _chance.Chance();
    this._name = this._mock.name();
    this._id = n;
  }

  _createClass(Person, [{
    key: 'setTarget',
    value: function setTarget() {}
  }, {
    key: 'updateState',
    value: function updateState(floorNum, state) {
      this._currentFloor = floorNum;
      this._state = state;
    }

    // ------ GETTERS ------
  }, {
    key: 'startTime',
    get: function get() {
      return this._startTime;
    }
  }, {
    key: 'finishTime',
    get: function get() {
      return this._finishTime;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    }
  }, {
    key: 'currentFloor',
    get: function get() {
      return this._currentFloor;
    }
  }, {
    key: 'targetFloor',
    get: function get() {
      return this._targetFloor;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }]);

  return Person;
})();

exports['default'] = { Person: Person };
module.exports = exports['default'];