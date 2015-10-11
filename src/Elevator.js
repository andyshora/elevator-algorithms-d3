class Elevator {

  constructor(options) {
    this._state = 'resting';
    this._currentFloor = 0;

    this._maxSpeed = options.maxSpeed;
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
  get maxSpeed() {
    return this._maxSpeed;
  }
  get currentFloor() {
    return this._currentFloor;
  }
}

export default { Elevator };
