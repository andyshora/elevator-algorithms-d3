import _ from 'lodash';
import {Utils} from './Utils';

class Elevator {

  constructor(options) {
    this._state = 'waiting';
    this._currentFloor = 0;
    this._maxSpeed = options.maxSpeed;
    this._mode = options.mode;
    this._capacity = options.capacity;
    this._people = [];
    this._direction = 0;
    this._targetFloors = [];
  }

  loadPassengers() {}
  loadPassenger() {}
  setMode() {}
  updateState(state) {
    Utils.log('Updating state to', state, this._people.length + ' people');
    this._state = state;
  }
  setDirection() {

  }
  setTargetFloors(numFloors) {
    if (this._currentFloor === 0) {
      this._direction = 1;
    }

    // for all the people in the elevator
    // traverse up floors and if someone wants to stop there, add it
    // then traverse down the floors (from the current floor) and add it
    let targetFloorsAbove = [];
    let targetFloorsBelow = [];

    // floors above
    for (let i = this._currentFloor; i <= numFloors; i++) {
      if (_.find(this._people, { targetFloor: i })) {
        targetFloorsAbove.push(i);
      }
    }

    // floors below
    for (let i = this._currentFloor; i >= numFloors; i--) {
      if (_.find(this._people, { targetFloor: i })) {
        targetFloorsBelow.push(i);
      }
    }

    this._targetFloors = targetFloorsAbove.concat(targetFloorsBelow);
    Utils.log('targetFloors', this._targetFloors);
  }
  loadPerson(person) {
    this._people.push(person);
  }
  unloadPerson() {
    var p = _.last(this._people);
    if (typeof p === 'undefined') {
      return false;
    }
    this._people.pop();

    return p;
  }

  getPeopleTravellingToCurrentFloor() {
    var arr = [];
    for (let i = 0; i < this._people; i++) {
      arr.push(this._people[i]);
    }
    return arr;
  }
  /**
   * Does the elevator have room for more people?
   * @return {Boolean} true if has room
   */
  hasRoom() {
    return this._people.length < this._capacity;
  }

  // ------ GETTERS ------
  get state() {
    return this._state;
  }
  get maxSpeed() {
    return this._maxSpeed;
  }
  get currentFloor() {
    return this._currentFloor;
  }
  get targetFloors() {
    return this._targetFloors;
  }
  get people() {
    return this._people;
  }
  get direction() {
    return this._direction;
  }
}

export default { Elevator };
