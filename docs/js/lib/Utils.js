'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Utils = (function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'log',
    value: function log(message) {
      if (typeof window === 'undefined') {
        return;
      }
      if (window.debug) {
        for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          objs[_key - 1] = arguments[_key];
        }

        if (objs.length) {
          console.log(message, objs);
        } else {
          console.log(message);
        }
      }
    }
  }, {
    key: 'setDebug',
    value: function setDebug(val) {
      if (typeof window === 'undefined') {
        return;
      }
      window.debug = val;
    }
  }, {
    key: 'applyBoxStyle',
    value: function applyBoxStyle(selector) {
      selector.style('stroke', '#ecf469').style('fill', '#000000');
    }
  }, {
    key: 'applyClearBoxStyle',
    value: function applyClearBoxStyle(selector) {
      selector.style('fill', '#000000');
    }
  }, {
    key: 'applyTextStyle',
    value: function applyTextStyle(selector) {
      selector.style('fill', '#ecf469');
    }
  }]);

  return Utils;
})();

exports['default'] = { Utils: Utils };
module.exports = exports['default'];