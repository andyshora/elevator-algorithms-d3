import _ from 'lodash';
import {Utils} from './Utils';
import {Chance} from 'chance';

class Elevator {

  constructor(options, n) {
    this._state = 'waiting';
    this._currentFloor = 0;
    this._maxSpeed = options.maxSpeed;
    this._mode = options.mode;
    this._capacity = options.capacity;
    this._people = [];
    this._direction = 0;
    this._targetFloors = [];
    this._id = n;
    this._mock = new Chance();
    this._name = this._mock.first();
    this._numFloors = options.numFloors;
    this.onStateChange = options.onStateChange;
  }

  loadPassengers() {}
  loadPassenger() {}
  setMode() {}
  updateState(state) {
    Utils.log('Updating state to', state, this._people.length + ' people', this._people);
    this._state = state;
    this.onStateChange({
      id: this.id,
      state: this.state,
      floor: this.currentFloor,
      numPeople: this.people.length
    });
  }
  travelOneTick() {

    if (!this.targetFloors.length) {
      // no people? go down
      this._direction = -1;
    } else if (this._currentFloor === 0 && this._people.length) {
      // at the bottom and people loaded

      this._direction = 1;
    } else if (this._currentFloor === this._numFloors) {
      // at the top
      this._direction = -1;
    } else if (this._currentFloor > 0 && !this._people.length) {

    }
    this._currentFloor += this._direction; // todo: use this._maxSpeed

    if (this._direction !== 0) {
      Utils.log(`***Elevator ${this.name} (id:${this.id}) will now travel ${this.direction > 0 ? 'UP' : 'DOWN'}`);
    }
    Utils.log(`***Elevator ${this.name} (id:${this.id}) is now at floor ${this.currentFloor}`);
  }
  setTargetFloors(numFloors) {


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
    Utils.log(`*** Elevator ${this.id} has set target floors ${this._targetFloors.join(', ')}`);
  }
  loadPerson(person) {
    this._people.push(person);
  }

  unloadPerson() {
    var peopleForFloor = this.getPeopleForFloor(this.currentFloor);
    var p = _.last(peopleForFloor);
    Utils.log('Unloading person', p);
    if (typeof p === 'undefined') {
      Utils.log('returning');
      return false;
    }

    _.remove(this._people, (person) => { person.id === p.id });

    return p;
  }

  getPeopleForFloor(n) {
    return _.filter(this._people, { targetFloor: n });
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
  get numFloors() {
    return this._numFloors;
  }
  get people() {
    return this._people;
  }
  get direction() {
    return this._direction;
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
}

export default { Elevator };
