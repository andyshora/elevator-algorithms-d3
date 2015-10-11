import {Elevator} from './Elevator';
import {Person} from './Person';
import {Utils} from './Utils';
import _ from 'lodash';

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
      this._people.push(new Person(personOptions, i));
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
        let elevators = this.getElevatorsWaitingOnFloor(i);
        Utils.log(`getElevatorsWaitingOnFloor(${i})`, elevators);
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
          while (elevators[j].hasRoom() && (k < people.length)) {
            Utils.log('loading person', people[k]);
            elevators[j].loadPerson(people[k]);
            people[k].updateState(i, 'travelling');
            k++;
          }
          if (!k) {
            Utils.log('No elevators available on floor ', i);
          }
          elevators[j].updateState('starting');

        }
      } else {
        Utils.log('nobody waiting on floor', i);
      }
    }

    for (let i = 0; i < this._elevators.length; i++) {
      this._elevators[i].setTargetFloors(this._numFloors);
    }

    Utils.log('----------- tick over -------------');
  }

  getPeopleWaitingOnFloor(n) {
    return _.filter(this._people, { currentFloor: n, state: 'waiting' });
  }

  getElevatorsWaitingOnFloor(n) {
    return _.reject(
      _.filter(this._elevators, { currentFloor: n, state: 'waiting' }),
      (e) => {
        return /starting|stopping/g.test(e.state);
      });
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
