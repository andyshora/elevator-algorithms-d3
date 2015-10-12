'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Building = require('./Building');

var _Viz = require('./Viz');

var _Utils = require('./Utils');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Simulation = (function () {
  function Simulation(args) {
    _classCallCheck(this, Simulation);

    this._t = 0;
    this.tickTime = args.simulationOptions.tickTime;
    this.building = new _Building.Building(args.buildingOptions, args.personOptions, args.elevatorOptions);

    if (typeof window !== 'undefined') {
      this.viz = new _Viz.Viz(args.vizOptions);
    }
  }

  _createClass(Simulation, [{
    key: 'setDebug',
    value: function setDebug(val) {
      _Utils.Utils.setDebug(val);
    }
  }, {
    key: 'start',
    value: function start() {
      if (this.viz) {
        this.viz.animate();
      }
      // this.viz.addTestParticles();
    }

    // update viz
  }, {
    key: 'onElevatorStateChanged',
    value: function onElevatorStateChanged(data) {
      this.viz.onElevatorStateChanged(data);
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition(i) {
      this.viz.updateCubePosition(i);
    }
  }, {
    key: 'runFor',
    value: function runFor(i) {
      var _this = this;

      var j = 0;
      var interval = setInterval(function () {
        _this.tick();
        j++;
        if (j > i) {
          clearInterval(interval);
        }
      }, this.tickTime);
    }

    /**
     * Process 1 tick of the simulation
     * This can be called via a 'play' loop
     * or manually for testing purposes
     * @return {void}
     */
  }, {
    key: 'tick',
    value: function tick() {
      this.building.workElevators(this.currentTime);
      this._t++;
      this.viz.onTick({
        floors: this.building.getFloorData()
      });
    }
  }, {
    key: 'currentTime',
    get: function get() {
      return this._t;
    }
  }]);

  return Simulation;
})();

exports['default'] = { Simulation: Simulation };
module.exports = exports['default'];