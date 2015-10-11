import {Elevator} from './Elevator';
import {Person} from './Person';
import {Utils} from './Utils';

class Building {
  constructor(options, personOptions, elevatorOptions) {

    this._name = options.name;
    this._numFloors = options.numFloors;
    this._openingTime = options.openingTime;
    this._closingTime = options.closingTime;
    this._numElevators = options.numElevators;
    this._numPeople = options.numPeople;

    // contains elevators and people
    this._elevators = [];
    this._people = [];

    for (var i = 0; i < this._numElevators; i++) {
      this._elevators.push(new Elevator(elevatorOptions));
    }

    for (var i = 0; i < this._numPeople; i++) {
      this._people.push(new Person(personOptions));
    }
  }

  workElevators(t) {
    Utils.log('workElevators', t);

    // for each floor in the building
    for (let i = 0; i < this._numFloors; i++) {
      let people = this.getPeopleWaitingOnFloor(i);
      Utils.log(`getPeopleWaitingOnFloor(${i})`, people);

      // if there's people waiting on this floor
      if (people.length) {
        let elevators = this.getElevatorsOnFloor(i);
        Utils.log(`getElevatorsOnFloor(${i})`, elevators);
        for (let j = 0; j < elevators.length; j++) {
          // if elevator has room
          let room = elevators[j].room;

          // unload people from elevator
          let p;
          while (p = elevators[j].unloadPerson()) {
            Utils.log('unloading person', p);
            p.updateState(i, 'resting');
          }


          // load people into elevators
          let k = 0;
          while (elevators[j].hasRoom()) {
            Utils.log('loading person', people[k]);
            elevators[j].loadPerson(people[k]);
            people[k].updateState(i, 'travelling');
            k++;
          }

        }
      } else {
        Utils.log('nobody waiting on floor', i);
      }
    }
  }

  getPeopleWaitingOnFloor(n) {
    return _.filter(this._people, { currentFloor: n, state: 'waiting' });
  }

  getElevatorsOnFloor(n) {
    return _.filter(this._elevators, { currentFloor: n });
  }

  // ------ GETTERS ------
  get elevators() {
    return this._elevators;
  }

  get people() {
    return this._people;
  }

  get numPeople() {
    return this._numPeople;
  }

  get numPeople() {
    return this._numPeople;
  }

  get numFloors() {
    return this._numFloors;
  }

  get numElevators() {
    return this._numElevators;
  }

  get openingTime() {
    return this._openingTime;
  }

  get closingTime() {
    return this._closingTime;
  }

  get name() {
    return this._name;
  }

}

export default { Building };
