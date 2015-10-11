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
  }

  workElevators(t) {
    Utils.log(`----------- begin tick ${t} -------------`);

    // elevators should travel on tick first
    for (let i = 0; i < this._elevators.length; i++) {
      this._elevators[i].travelOneTick();
    }

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
          Utils.log(`   ${p.name} (id:${p.id}) got off`);
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
      }

      this._elevators[i].updateState('starting');


    }

    // for each floor in the building
    /*for (let i = 0; i < this._numFloors; i++) {
      let people = this.getPeopleWaitingOnFloor(i);
      Utils.log(`There are ${people.length} people waiting on floor ${i}`, people);

      // if there's people waiting on this floor
      if (people.length) {
        let elevators = this.getElevatorsWaitingOnFloor(i);
        Utils.log(`There are ${elevators.length} elevators waiting on floor ${i}`, elevators);
        for (let j = 0; j < elevators.length; j++) {


          // unload people from elevator
          let p;
          Utils.log(`Unloading elevator ${j} at floor ${i}`);

          while (p = elevators[j].unloadPerson()) {
            Utils.log(`   ${p.name} (id:${p.id})`);
            p.updateState(i, 'resting');
          }

          // load people into elevators
          let k = 0;
          Utils.log(`Loading elevator ${j} at floor ${i}`);

          while (elevators[j].hasRoom() && (k < people.length)) {
            Utils.log(`   ${people[k].name} (id:${people[k].id})`);
            elevators[j].loadPerson(people[k]);
            people[k].updateState(i, 'travelling');
            k++;
          }
          if (!k) {
            Utils.log(`No elevators available on floor ${i}`);
          }
          elevators[j].updateState('starting');

        }
      } else {
        // Utils.log(`Nobody waiting on floor ${i}`);
      }
    }*/

    for (let i = 0; i < this._elevators.length; i++) {
      this._elevators[i].setTargetFloors(this._numFloors);
    }

    Utils.log(`----------- tick ${t} over -------------`);
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
