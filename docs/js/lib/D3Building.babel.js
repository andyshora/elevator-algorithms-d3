import {Utils} from './Utils';

class D3Building {
  constructor(args) {
    console.log('D3Building constructor', args);
    this._options = args;
  }

  init(selector) {
    let buildingGroup = selector.append('g');

    this._dimensions = {};
    this._dimensions.buildingHeight = this._options.sideLength; // allow buffer
    this._dimensions.floorHeight = Math.floor(this._dimensions.buildingHeight / this._options.numFloors);
    console.log('building height', this._dimensions.buildingHeight);
    console.log('floor height', this._dimensions.floorHeight);

    this._floors = [];

    for (var i = this._options.numFloors - 1; i >= 0; i--) {
      // floor group
      this._floors.push(buildingGroup.append('g')
        .attr('transform', `translate(0, ${i * this._dimensions.floorHeight})`));
    }


    var startBuildingX = (this._dimensions.buildingHeight / 2) - (this._dimensions.floorHeight / 2);
    var labelWidth = this._dimensions.floorHeight < 100 ? 20 : 40;

    // draw floors
    for (var i = 0; i < this._floors.length; i++) {
      // draw floor block
      this._floors[i].append('rect')
        .attr('x', startBuildingX)
        .attr('y', 0)
        .attr('width', this._dimensions.floorHeight)
        .attr('height', this._dimensions.floorHeight)
        .call(Utils.applyBoxStyle);

      // floor label
      var labelGroup = this._floors[i].append('g');

      labelGroup.append('rect')
        .attr('x', startBuildingX + this._dimensions.floorHeight + 1)
        .attr('y', 0)
        .attr('width', labelWidth)
        .attr('height', labelWidth)
        .call(Utils.applyClearBoxStyle);

      labelGroup.append('text')
        .text(function() { return '' + i })
        .attr('x', startBuildingX + this._dimensions.floorHeight + (labelWidth / 2))
        .attr('y', (labelWidth / 2))
        .attr('text-anchor', 'middle')
        .attr('font-size', `${labelWidth / 2}px`)
        .attr('font-size', `${labelWidth / 2}px`)
        .attr('dominant-baseline', 'central')
        .call(Utils.applyTextStyle);

    }


  }

}

export default { D3Building };
