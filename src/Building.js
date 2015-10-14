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
      this._elevators.push(new Elevator(elevatorOptions, i));
    }

    for (var i = 0; i < this._numPeople; i++) {
      this._people.push(new Person(personOptions, i));
    }

    // Utils.log('setup people', this._people);
  }

  getFloorData() {

    var arr = [];
    for (var i = 0; i < this.numFloors; i++) {
      arr.push(_.filter(this._people, { currentFloor: i }));
    }
    return arr;
  }

  getAvgWaitTime() {
    var total = 0;
    for (let i = 0; i < this._people.length; i++) {
      total += this._people[i].waitTime;
    }
    return total / this._people.length;
  }

  workElevators(t) {
    Utils.log(`----------- begin tick ${t} -------------`);



    // for each elevator
    // check if loading/unloading needs to be done
    for (let i = 0; i < this._elevators.length; i++) {
      let floor = this._elevators[i].currentFloor;

      // unload people from elevator if needed
      let p;
      let peopleForFloor = this._elevators[i].getPeopleForFloor(floor);

      if (peopleForFloor) {
        Utils.log(`Unloading elevator ${i} at floor ${floor}`, peopleForFloor);

        while (p = this._elevators[i].unloadPerson()) {
          Utils.log(`   ${p.name} (id:${p.id}) got off. Wait time: ${p.waitTime}`);
          p.updateState(floor, 'resting');
        }
      }

      // do loading
      let peopleWaiting = this.getPeopleWaitingOnFloor(floor);

      if (peopleWaiting) {
        Utils.log(`There are ${peopleWaiting.length} people waiting on floor ${floor}`, peopleWaiting);
        let k = 0;
        while (this._elevators[i].hasRoom() && (k < peopleWaiting.length)) {
          Utils.log(`   ${peopleWaiting[k].name} (id:${peopleWaiting[k].id})`);
          this._elevators[i].loadPerson(peopleWaiting[k]);
          peopleWaiting[k].updateState(floor, 'travelling');
          k++;
        }
        // inc wait time for all others
        var peopleWaitingOnAllFloors = this.getPeopleWaitingOnAllFloors();
        for (var n = 0; n < peopleWaitingOnAllFloors.length; n++) {
          peopleWaitingOnAllFloors[n].incWaitTime();
        }
      }

      this._elevators[i].updateState('open');

    }

    for (let i = 0; i < this._elevators.length; i++) {
      this._elevators[i].updateState('closed');
      this._elevators[i].setTargetFloors(this._numFloors);
    }

    // elevators should travel one tick
    for (let i = 0; i < this._elevators.length; i++) {
      this._elevators[i].updateState('starting');
      this._elevators[i].travelOneTick();
      this._elevators[i].updateState('stopping');
    }

    Utils.log(`----------- tick ${t} over -------------`);
  }

  getPeopleWaitingOnFloor(n) {
    return _.filter(this._people, { currentFloor: n, state: 'waiting' });
  }

  getPeopleWaitingOnAllFloors() {
    return _.filter(this._people, { state: 'waiting' });
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
