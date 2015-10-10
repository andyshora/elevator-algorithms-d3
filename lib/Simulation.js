'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Building = require('./Building');

var Simulation = (function () {
  function Simulation(args) {
    _classCallCheck(this, Simulation);

    console.log('Simulation constructor');
    this.tickFrequency = args.simulationOptions.tickFrequency;

    this.building = new _Building.Building(args.buildingOptions, args.personOptions, args.elevatorOptions);
  }

  /**
   * Process 1 tick of the simulation
   * This can be called via a 'play' loop
   * or manually for testing purposes
   * @return {void}
   */

  _createClass(Simulation, [{
    key: 'tick',
    value: function tick() {}
  }]);

  return Simulation;
})();

exports['default'] = { Simulation: Simulation };
module.exports = exports['default'];