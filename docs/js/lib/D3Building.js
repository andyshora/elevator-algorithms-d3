'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Utils = require('./Utils');

var D3Building = (function () {
  function D3Building(args) {
    _classCallCheck(this, D3Building);

    console.log('D3Building constructor', args);
    this._options = args;
  }

  _createClass(D3Building, [{
    key: 'init',
    value: function init(selector) {
      var buildingGroup = selector.append('g');

      this._dimensions = {};
      this._dimensions.buildingHeight = this._options.sideLength; // allow buffer
      this._dimensions.floorHeight = Math.floor(this._dimensions.buildingHeight / this._options.numFloors);
      this._dimensions.elevatorBuffer = 10;
      this._dimensions.elevatorWidth = Math.floor((this._dimensions.floorHeight - (this._options.numElevators + 1) * this._dimensions.elevatorBuffer) / this._options.numElevators);

      this._floors = [];
      this._elevators = [];

      for (var i = this._options.numFloors - 1; i >= 0; i--) {
        // floor group
        this._floors.push(buildingGroup.append('g').attr('transform', 'translate(0, ' + i * this._dimensions.floorHeight + ')'));
      }

      var startBuildingX = this._dimensions.buildingHeight / 2 - this._dimensions.floorHeight / 2;
      var labelWidth = this._dimensions.floorHeight < 100 ? 20 : 40;

      // draw floors
      for (var i = 0; i < this._floors.length; i++) {
        // draw floor block
        this._floors[i].append('rect').attr('x', startBuildingX).attr('y', 0).attr('width', this._dimensions.floorHeight).attr('height', this._dimensions.floorHeight).call(_Utils.Utils.applyBoxStyle);

        // floor label
        var labelGroup = this._floors[i].append('g');

        labelGroup.append('rect').attr('x', startBuildingX + this._dimensions.floorHeight + 1).attr('y', 0).attr('width', labelWidth).attr('height', labelWidth).call(_Utils.Utils.applyClearBoxStyle);

        labelGroup.append('text').text(function () {
          return '' + i;
        }).attr('x', startBuildingX + this._dimensions.floorHeight + labelWidth / 2).attr('y', labelWidth / 2).attr('text-anchor', 'middle').attr('font-size', labelWidth / 2 + 'px').attr('font-size', labelWidth / 2 + 'px').attr('dominant-baseline', 'central').call(_Utils.Utils.applyTextStyle);
      }

      // draw elevators
      for (var i = 0; i < this._options.numElevators; i++) {
        this._elevators.push(buildingGroup.append('g').attr('transform', 'translate(0, ' + this._options.numFloors * this._dimensions.floorHeight + ')').attr('id', 'elevator-' + i));
      }

      for (var i = 0; i < this._elevators.length; i++) {
        var elevatorGroup = this._elevators[i].append('rect');
        elevatorGroup.attr('x', startBuildingX + this._dimensions.elevatorBuffer + (this._dimensions.elevatorWidth + this._dimensions.elevatorBuffer) * i).attr('y', -this._dimensions.floorHeight / 2).attr('width', this._dimensions.elevatorWidth).attr('height', this._dimensions.floorHeight / 2).call(_Utils.Utils.applyBoxStyle);
      }
    }
  }]);

  return D3Building;
})();

exports['default'] = { D3Building: D3Building };
module.exports = exports['default'];