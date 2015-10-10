class Building {
  constructor(options, personOptions, elevatorOptions) {

    for (var key in options) {
      this[key] = options[key];
    }

    this.elevators = [];
    this.people = [];

    for (var i = 0; i < this.numElevators; i++) {
      this.elevators.push(new Elevator(elevatorOptions));
    }

    for (var i = 0; i < this.numPeople; i++) {
      this.people.push(new Person(personOptions));
    }


  }


}
