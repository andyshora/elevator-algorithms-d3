import {Elevator} from './Elevator';
import {Person} from './Person';

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
    // for each floor in the building
    for (let i = 0; i < this._numFloors.length; i++) {
      let people = this.getPeopleWaitingOnFloor(i);

      // if there's people waiting on this floor
      if (people.length) {
        let elevators = this.getElevatorsOnFloor(i);
        for (let j = 0; j < elevators.length; j++) {
          // if elevator has room
          let room = elevators[j].room;

          // unload people from elevator
          while (elevators[j].unloadPerson()) {
            var p = elevators[j].unloadPerson();
            p.updateState(i, 'resting');
          }


          // load people into elevators
          let k = 0;
          while (elevators[j].hasRoom()) {
            elevators[j].loadPerson(people[k]);
            people[k].updateState(i, 'travelling');
            k++;
          }

        }
      }
    }
  }

  getPeopleWaitingOnFloor(n) {

  }

  getElevatorsOnFloor(n) {

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
