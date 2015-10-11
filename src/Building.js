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
