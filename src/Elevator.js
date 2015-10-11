class Elevator {

  constructor(options) {
    this._state = 'resting';
    this._currentFloor = 0;
    this._maxSpeed = options.maxSpeed;
    this._mode = options.mode;
    this._capacity = options.capacity;
    this._people = [];
  }

  loadPassengers() {}
  loadPassenger() {}
  setMode() {}
  travel() {}
  setDirection() {}
  setTarget() {}
  loadPerson(person) {

    // todo - update person state
  }
  unloadPerson() {
    var personUnloaded = false;
    return personUnloaded;
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
  get people() {
    return this._people;
  }
}

export default { Elevator };
