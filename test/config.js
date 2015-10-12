export default {
  simulationOptions: {
    tickFrequency: 1000
  },
  buildingOptions: {
    name: 'QB',
    numFloors: 4,
    openingTime: 9,
    closingTime: 18,
    numElevators: 1,
    numPeople: 20
  },
  elevatorOptions: {
    maxSpeed: 0.5,
    capacity: 8,
    mode: 'normal',
    numFloors: 4
  },
  personOptions: {
    startTime: 9,
    finishTime: 18,
    generateTargetFloor: (n) => { return Math.round(Math.random() * 1) + 1 }
  }
};
