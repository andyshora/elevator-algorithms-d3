"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Elevator = function Elevator(options) {
  _classCallCheck(this, Elevator);

  for (var key in options) {
    this[key] = options[key];
  }
};