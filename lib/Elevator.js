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

    for (var key in options) {
      this[key] = options[key];
    }
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

    // ------ GETTERS ------
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
  }]);

  return Elevator;
})();

exports['default'] = { Elevator: Elevator };
module.exports = exports['default'];