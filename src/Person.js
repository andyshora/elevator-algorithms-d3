import _ from 'lodash';
import {Chance} from 'chance';

class Person {
  constructor(options, n) {

    this._startTime = options.startTime;
    this._finishTime = options.finishTime;
    this._state = 'waiting'; // all people are initially waiting on ground floor
    this._currentFloor = 0;
    this._targetFloor = options.generateTargetFloor(n);
    console.log('this._targetFloor', this._targetFloor);

    this._mock = new Chance();
    this._name = this._mock.name();
    this._id = n;
  }

  setTarget() {}
  updateState(floorNum, state) {
    this._currentFloor = floorNum;
    this._state = state;

    if (this._state === 'resting') {
      console.log('clearing target floor', this._targetFloor, floorNum);
      this._targetFloor = null;
    }
  }

  // ------ GETTERS ------
  get startTime() {
    return this._startTime;
  }
  get finishTime() {
    return this._finishTime;
  }
  get state() {
    return this._state;
  }
  get currentFloor() {
    return this._currentFloor;
  }
  get targetFloor() {
    return this._targetFloor;
  }
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
}

export default { Person };
