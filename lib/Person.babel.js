class Person {
  constructor(options) {

    this._startTime = options.startTime;
    this._finishTime = options.finishTime;
    this._name = options.name;
    this._state = 'waiting'; // all people are initially waiting on ground floor
    this._currentFloor = 0;
  }

  setTarget() {}
  updateState(floorNum, state) {
    this._currentFloor = floorNum;
    this._state = state;
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
  get name() {
    return this._name;
  }

}

export default { Person };
