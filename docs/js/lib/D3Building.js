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
    key: 'getElevatorYPosAtFloor',
    value: function getElevatorYPosAtFloor(n) {
      var temp = this._options.numFloors - n;
      return temp * this._dimensions.floorHeight;
    }
  }, {
    key: 'init',
    value: function init(selector) {
      var buildingGroup = selector.append('g');

      this._dimensions = {};
      this._dimensions.buildingHeight = this._options.sideLength; // allow buffer
      this._dimensions.floorHeight = Math.floor(this._dimensions.buildingHeight / this._options.numFloors);
      this._dimensions.floorWidth = this._options.numElevators > 4 ? this._dimensions.floorHeight * 2 : this._dimensions.floorHeight;
      this._dimensions.elevatorBuffer = 10;
      this._dimensions.elevatorWidth = Math.floor((this._dimensions.floorWidth - (this._options.numElevators + 1) * this._dimensions.elevatorBuffer) / this._options.numElevators);

      this._floors = [];
      this._elevators = [];

      for (var i = this._options.numFloors - 1; i >= 0; i--) {
        // floor group
        this._floors.push(buildingGroup.append('g').attr('transform', 'translate(0, ' + i * this._dimensions.floorHeight + ')'));
      }

      this._dimensions.startBuildingX = this._dimensions.buildingHeight / 2 - this._dimensions.floorWidth / 2;
      var labelWidth = this._dimensions.floorHeight < 100 ? 20 : 40;

      // draw floors
      for (var i = 0; i < this._floors.length; i++) {
        // draw floor block
        this._floors[i].append('rect').attr('x', this._dimensions.startBuildingX).attr('y', 0).attr('width', this._dimensions.floorWidth).attr('height', this._dimensions.floorHeight).call(_Utils.Utils.applyBoxStyle);

        // floor label
        var labelGroup = this._floors[i].append('g');

        /*labelGroup.append('rect')
          .attr('x', this._dimensions.startBuildingX + this._dimensions.floorWidth + 1)
          .attr('y', 0)
          .attr('width', labelWidth)
          .attr('height', labelWidth)
          .call(Utils.applyBoxStyle);*/

        labelGroup.append('text').attr('id', 'floor-label-' + i).text(function () {
          return 'Floor ' + i;
        }).attr('x', this._dimensions.startBuildingX + this._dimensions.floorWidth + labelWidth / 2).attr('y', this._dimensions.floorHeight / 2 - labelWidth / 4).attr('font-size', '15px').attr('dominant-baseline', 'central').call(_Utils.Utils.applyTextStyle);
      }

      // draw elevators
      for (var _i = 0; _i < this._options.numElevators; _i++) {
        this._elevators.push(buildingGroup.append('g').attr('transform', 'translate(' + this._dimensions.startBuildingX + ', ' + this.getElevatorYPosAtFloor(0) + ')').attr('id', 'elevator-' + _i));

        var elevatorXRelative = this._dimensions.elevatorBuffer + (this._dimensions.elevatorWidth + this._dimensions.elevatorBuffer) * _i;

        // long elevetor cable
        this._elevators[_i].append('rect').attr('x', elevatorXRelative + this._dimensions.elevatorWidth / 2).attr('y', -this._dimensions.buildingHeight).attr('width', 1).attr('height', this._dimensions.buildingHeight).call(_Utils.Utils.applyAltLineStyle);
      }

      for (var _i2 = 0; _i2 < this._elevators.length; _i2++) {

        var elevatorCableJoin = this._elevators[_i2].append('circle');
        var elevatorXRelative = this._dimensions.elevatorBuffer + (this._dimensions.elevatorWidth + this._dimensions.elevatorBuffer) * _i2;

        var elevator = this._elevators[_i2].append('rect');
        elevator.attr('x', elevatorXRelative).attr('y', -this._dimensions.floorHeight / 2).attr('width', this._dimensions.elevatorWidth).attr('height', this._dimensions.floorHeight / 2).call(_Utils.Utils.applyBoxStyle);

        elevatorCableJoin.attr('cx', elevatorXRelative + this._dimensions.elevatorWidth / 2).attr('cy', elevator.attr('y')).attr('r', Math.min(this._dimensions.elevatorWidth / 4, 10)).call(_Utils.Utils.applyBoxStyle);
      }
    }
  }, {
    key: 'animateElevator',
    value: function animateElevator(i, targetFloorIndex) {
      console.log('animateElevator', i, targetFloorIndex);
      this._elevators[i].transition().duration(this._options.transitionDuration).attr('transform', 'translate(' + this._dimensions.startBuildingX + ', ' + this.getElevatorYPosAtFloor(targetFloorIndex) + ')');
    }

    // VIZ UPDATES
  }, {
    key: 'updateFloorLabel',
    value: function updateFloorLabel(i, str) {
      d3.select('#floor-label-' + i).text(function () {
        return 'Floor ' + i + ': ' + str;
      });
    }
  }]);

  return D3Building;
})();

exports['default'] = { D3Building: D3Building };
module.exports = exports['default'];