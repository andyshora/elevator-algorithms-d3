import {Utils} from './Utils';

class D3Building {
  constructor(args) {
    console.log('D3Building constructor', args);
    this._options = args;
  }

  getElevatorYPosAtFloor(n) {
    var temp = this._options.numFloors - n;
    return temp * this._dimensions.floorHeight
  }

  init(selector) {
    let buildingGroup = selector.append('g');

    this._dimensions = {};
    this._dimensions.buildingHeight = this._options.sideLength; // allow buffer
    this._dimensions.floorHeight = Math.floor(this._dimensions.buildingHeight / this._options.numFloors);
    this._dimensions.floorWidth = this._options.numElevators > 4 ? this._dimensions.floorHeight * 2 : this._dimensions.floorHeight;
    this._dimensions.elevatorBuffer = 10;
    this._dimensions.elevatorWidth = Math.floor(
      (this._dimensions.floorWidth - ((this._options.numElevators + 1) * this._dimensions.elevatorBuffer)) /
        this._options.numElevators
      );

    this._floors = [];
    this._elevators = [];

    for (var i = this._options.numFloors - 1; i >= 0; i--) {
      // floor group
      this._floors.push(buildingGroup.append('g')
        .attr('transform', `translate(0, ${i * this._dimensions.floorHeight})`));
    }


    this._dimensions.startBuildingX = (this._dimensions.buildingHeight / 2) - (this._dimensions.floorWidth / 2);
    var labelWidth = this._dimensions.floorHeight < 100 ? 20 : 40;

    // draw floors
    for (var i = 0; i < this._floors.length; i++) {
      // draw floor block
      this._floors[i].append('rect')
        .attr('x', this._dimensions.startBuildingX)
        .attr('y', 0)
        .attr('width', this._dimensions.floorWidth)
        .attr('height', this._dimensions.floorHeight)
        .call(Utils.applyBoxStyle);

      // floor label
      var labelGroup = this._floors[i].append('g');

      labelGroup.append('rect')
        .attr('x', this._dimensions.startBuildingX + this._dimensions.floorWidth + 1)
        .attr('y', 0)
        .attr('width', labelWidth)
        .attr('height', labelWidth)
        .call(Utils.applyClearBoxStyle);

      labelGroup.append('text')
        .text(function() { return '' + i })
        .attr('x', this._dimensions.startBuildingX + this._dimensions.floorWidth + (labelWidth / 2))
        .attr('y', (labelWidth / 2))
        .attr('text-anchor', 'middle')
        .attr('font-size', `${labelWidth / 2}px`)
        .attr('font-size', `${labelWidth / 2}px`)
        .attr('dominant-baseline', 'central')
        .call(Utils.applyTextStyle);

    }



    // draw elevators
    for (let i = 0; i < this._options.numElevators; i++) {
      this._elevators.push(buildingGroup.append('g')
        .attr('transform', `translate(${this._dimensions.startBuildingX}, ${this.getElevatorYPosAtFloor(0)})`).attr('id', `elevator-${i}`));

      let elevatorXRelative = this._dimensions.elevatorBuffer + ((this._dimensions.elevatorWidth + this._dimensions.elevatorBuffer) * i);

      // long elevetor cable
      this._elevators[i].append('rect')
        .attr('x', elevatorXRelative + (this._dimensions.elevatorWidth / 2))
        .attr('y', -this._dimensions.buildingHeight)
        .attr('width', 1)
        .attr('height', this._dimensions.buildingHeight)
        .call(Utils.applyAltLineStyle);
    }

    for (let i = 0; i < this._elevators.length; i++) {

      let elevatorCableJoin = this._elevators[i].append('circle');
      let elevatorXRelative = this._dimensions.elevatorBuffer + ((this._dimensions.elevatorWidth + this._dimensions.elevatorBuffer) * i);



      let elevator = this._elevators[i].append('rect');
      elevator
        .attr('x', elevatorXRelative)
        .attr('y', -this._dimensions.floorHeight / 2)
        .attr('width', this._dimensions.elevatorWidth)
        .attr('height', this._dimensions.floorHeight / 2)
        .call(Utils.applyBoxStyle);

      elevatorCableJoin
        .attr('cx', elevatorXRelative + (this._dimensions.elevatorWidth / 2))
        .attr('cy', elevator.attr('y'))
        .attr('r', Math.min(this._dimensions.elevatorWidth / 4, 10))
        .call(Utils.applyBoxStyle);

    }

    this.animateElevators();
  }

  animateElevators() {
    for (let i = 0; i < this._elevators.length; i++) {
      this._elevators[i]
        .transition()
        .duration(2000)
        .attr('transform', `translate(${this._dimensions.startBuildingX}, ${this.getElevatorYPosAtFloor(this._options.numFloors - 1)})`)
        .transition()
        .duration(2000)
        .attr('transform', `translate(${this._dimensions.startBuildingX}, ${this.getElevatorYPosAtFloor(0)})`);
    }
  }

}

export default { D3Building };
