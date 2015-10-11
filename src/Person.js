class Person {
  constructor(options) {

    this._startTime = options.startTime;
    this._finishTime = options.finishTime;
    this._state = 'resting';
  }

  setTarget() {}

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

}

export default { Person };
