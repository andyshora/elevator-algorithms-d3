class Elevator {

  constructor(options) {
    this._state = 'resting';
    this._currentFloor = 0;

    for (var key in options) {
      this[key] = options[key];
    }
  }

  loadPassengers() {}
  loadPassenger() {}
  setMode() {}
  travel() {}
  setDirection() {}
  setTarget() {}

  // ------ GETTERS ------
  get state() {
    return this._state;
  }
  get currentFloor() {
    return this._currentFloor;
  }
}

export default { Elevator };
