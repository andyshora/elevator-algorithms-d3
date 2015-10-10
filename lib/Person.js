"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function Person(options) {
  _classCallCheck(this, Person);

  for (var key in options) {
    this[key] = options[key];
  }
};

exports["default"] = { Person: Person };
module.exports = exports["default"];