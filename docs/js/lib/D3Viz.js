'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _D3Building = require('./D3Building');

var _Utils = require('./Utils');

var D3Viz = (function () {
  function D3Viz(args) {
    _classCallCheck(this, D3Viz);

    console.log('D3Viz', args);

    this.applyPolyfills();

    this._sideLength = window.innerHeight - 50;
    args.vizOptions.sideLength = args.buildingOptions.sideLength = this._sideLength;

    this._d3Container = d3.select(args.vizOptions.selector);
    this._d3Building = new _D3Building.D3Building(args.buildingOptions);

    this.init();
  }

  _createClass(D3Viz, [{
    key: 'applyPolyfills',
    value: function applyPolyfills() {
      window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */callback, /* DOMElement */element) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();
    }
  }, {
    key: 'init',
    value: function init() {

      // base svg element
      this._svgContainer = this._d3Container.append('svg').attr('width', this._sideLength).attr('height', this._sideLength);

      // viz background
      this._svgContainer.append('rect').attr('x', 0).attr('y', 0).attr('width', this._sideLength).attr('height', this._sideLength);
      this._d3Building.init(this._svgContainer);
    }
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'animate',
    value: function animate() {

      requestAnimationFrame(this.animate.bind(this));

      // move stuff

      this.render();
    }
  }]);

  return D3Viz;
})();

exports['default'] = { D3Viz: D3Viz };
module.exports = exports['default'];